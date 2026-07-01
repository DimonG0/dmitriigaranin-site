const COOKIE_NAME = "dg_archive_session";
const DEFAULT_SESSION_DAYS = 7;
const FILE_PREFIX = "private-archive/files/";
const MANIFEST_KEY = "private-archive/manifest.json";
const MAX_UPLOAD_BYTES = 250 * 1024 * 1024;

const encoder = new TextEncoder();
const decoder = new TextDecoder();

export function json(data, init = {}) {
  const status = typeof init === "number" ? init : init.status || 200;
  const headers = new Headers(typeof init === "number" ? undefined : init.headers);

  headers.set("content-type", "application/json; charset=utf-8");
  headers.set("cache-control", "no-store");
  headers.set("x-content-type-options", "nosniff");

  return new Response(JSON.stringify(data), { status, headers });
}

export function methodNotAllowed() {
  return json({ error: "method_not_allowed" }, 405);
}

export function unauthorized() {
  return json({ error: "unauthorized" }, 401);
}

export function forbidden() {
  return json({ error: "forbidden" }, 403);
}

export function storageNotConfigured() {
  return json({ error: "archive_storage_not_configured" }, 503);
}

export async function parseJsonBody(request) {
  try {
    return await request.json();
  } catch {
    return {};
  }
}

export function isLocalRequest(request) {
  const url = new URL(request.url);
  return url.hostname === "localhost" || url.hostname === "127.0.0.1" || url.hostname === "::1";
}

export function getSessionSecret(env, request) {
  if (env.ARCHIVE_SESSION_SECRET) return env.ARCHIVE_SESSION_SECRET;
  if (isLocalRequest(request)) return "local-development-secret-for-dg-private-archive-only";
  return "";
}

export function getSessionMaxAge(env) {
  const days = Number(env.ARCHIVE_SESSION_DAYS || DEFAULT_SESSION_DAYS);
  const safeDays = Number.isFinite(days) && days > 0 ? Math.min(days, 30) : DEFAULT_SESSION_DAYS;
  return Math.round(safeDays * 24 * 60 * 60);
}

export function getAccessCodes(env, request) {
  const viewerCodes = [
    env.ARCHIVE_ACCESS_CODE,
    ...(env.ARCHIVE_ACCESS_CODES || "").split(/[,\n]/),
  ]
    .map((value) => String(value || "").trim())
    .filter(Boolean);

  const adminCode = String(env.ARCHIVE_ADMIN_CODE || "").trim();

  if (isLocalRequest(request) && viewerCodes.length === 0 && !adminCode) {
    return {
      viewerCodes: ["dev-view"],
      adminCode: "dev-admin",
    };
  }

  return {
    viewerCodes: [...new Set(viewerCodes)],
    adminCode,
  };
}

export function authConfigReady(env, request) {
  const secret = getSessionSecret(env, request);
  const { viewerCodes, adminCode } = getAccessCodes(env, request);
  return Boolean(secret && (viewerCodes.length > 0 || adminCode));
}

export function hasArchiveBucket(env) {
  return Boolean(env.ARCHIVE_BUCKET && typeof env.ARCHIVE_BUCKET.get === "function");
}

export function verifyAccessCode(env, request, code) {
  const submitted = String(code || "").trim();
  const { viewerCodes, adminCode } = getAccessCodes(env, request);

  if (!submitted) return null;
  if (adminCode && timingSafeEqual(submitted, adminCode)) return "admin";
  if (viewerCodes.some((candidate) => timingSafeEqual(submitted, candidate))) return "viewer";

  return null;
}

export async function createSessionCookie(role, env, request) {
  const maxAge = getSessionMaxAge(env);
  const expiresAt = Date.now() + maxAge * 1000;
  const payload = toBase64UrlString(JSON.stringify({ role, expiresAt }));
  const signature = await sign(payload, getSessionSecret(env, request));
  const secure = new URL(request.url).protocol === "https:" ? "; Secure" : "";

  return {
    cookie: `${COOKIE_NAME}=${payload}.${signature}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${maxAge}${secure}`,
    expiresAt: new Date(expiresAt).toISOString(),
  };
}

export function clearSessionCookie(request) {
  const secure = new URL(request.url).protocol === "https:" ? "; Secure" : "";
  return `${COOKIE_NAME}=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0${secure}`;
}

export async function readSession(request, env) {
  const token = parseCookies(request.headers.get("cookie") || "")[COOKIE_NAME];
  const secret = getSessionSecret(env, request);

  if (!token || !secret) return null;

  const [payload, signature] = token.split(".");
  if (!payload || !signature) return null;

  const expectedSignature = await sign(payload, secret);
  if (!timingSafeEqual(signature, expectedSignature)) return null;

  try {
    const parsed = JSON.parse(fromBase64UrlString(payload));
    const role = parsed.role === "admin" ? "admin" : parsed.role === "viewer" ? "viewer" : null;
    const expiresAt = Number(parsed.expiresAt);

    if (!role || !Number.isFinite(expiresAt) || expiresAt <= Date.now()) return null;

    return {
      authenticated: true,
      role,
      expiresAt: new Date(expiresAt).toISOString(),
    };
  } catch {
    return null;
  }
}

export async function requireSession(request, env, requiredRole = "viewer") {
  const session = await readSession(request, env);

  if (!session) return { response: unauthorized() };
  if (requiredRole === "admin" && session.role !== "admin") return { response: forbidden() };

  return { session };
}

export async function readArchiveManifest(env) {
  if (!hasArchiveBucket(env)) throw new Error("archive_storage_not_configured");

  const object = await env.ARCHIVE_BUCKET.get(MANIFEST_KEY);
  if (!object) return { version: 1, updatedAt: null, items: [] };

  try {
    const manifest = JSON.parse(await object.text());
    const items = Array.isArray(manifest.items) ? manifest.items.map(normalizeItem).filter(Boolean) : [];

    return {
      version: 1,
      updatedAt: manifest.updatedAt || null,
      items: items.sort((a, b) => String(b.uploadedAt).localeCompare(String(a.uploadedAt))),
    };
  } catch {
    return { version: 1, updatedAt: null, items: [] };
  }
}

export async function writeArchiveManifest(env, items) {
  if (!hasArchiveBucket(env)) throw new Error("archive_storage_not_configured");

  const manifest = {
    version: 1,
    updatedAt: new Date().toISOString(),
    items: items.map(normalizeItem).filter(Boolean),
  };

  await env.ARCHIVE_BUCKET.put(MANIFEST_KEY, JSON.stringify(manifest, null, 2), {
    httpMetadata: {
      contentType: "application/json; charset=utf-8",
    },
  });

  return manifest;
}

export function publicArchiveItem(item) {
  return {
    id: item.id,
    title: item.title,
    description: item.description,
    category: item.category,
    filename: item.filename,
    contentType: item.contentType,
    size: item.size,
    uploadedAt: item.uploadedAt,
    downloadUrl: `/api/archive/download?id=${encodeURIComponent(item.id)}`,
  };
}

export function createArchiveItem(file, formData) {
  const id = crypto.randomUUID();
  const filename = sanitizeFileName(file.name || "archive-file");
  const now = new Date().toISOString();

  return {
    id,
    key: `${FILE_PREFIX}${id}-${filename}`,
    filename,
    title: sanitizeText(formData.get("title"), 120) || filename,
    description: sanitizeText(formData.get("description"), 300),
    category: sanitizeText(formData.get("category"), 60) || "archive",
    contentType: sanitizeText(file.type, 100) || "application/octet-stream",
    size: file.size || 0,
    uploadedAt: now,
  };
}

export function validateUploadFile(file) {
  if (!file || typeof file !== "object" || typeof file.stream !== "function") {
    return "missing_file";
  }

  if (file.size > MAX_UPLOAD_BYTES) {
    return "file_too_large";
  }

  return null;
}

export function attachmentHeader(filename) {
  const safeName = sanitizeFileName(filename || "archive-file");
  return `attachment; filename="${safeName.replace(/"/g, "")}"`;
}

function normalizeItem(item) {
  if (!item || typeof item !== "object") return null;

  const id = sanitizeText(item.id, 80);
  const key = sanitizeText(item.key, 260);
  const filename = sanitizeFileName(item.filename || "archive-file");

  if (!id || !key) return null;

  return {
    id,
    key,
    filename,
    title: sanitizeText(item.title, 120) || filename,
    description: sanitizeText(item.description, 300),
    category: sanitizeText(item.category, 60) || "archive",
    contentType: sanitizeText(item.contentType, 100) || "application/octet-stream",
    size: Number.isFinite(Number(item.size)) ? Number(item.size) : 0,
    uploadedAt: sanitizeText(item.uploadedAt, 40) || new Date().toISOString(),
  };
}

function parseCookies(cookieHeader) {
  return cookieHeader.split(";").reduce((cookies, part) => {
    const [rawName, ...rawValue] = part.trim().split("=");
    if (!rawName) return cookies;

    cookies[rawName] = rawValue.join("=");
    return cookies;
  }, {});
}

async function sign(value, secret) {
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const signature = await crypto.subtle.sign("HMAC", key, encoder.encode(value));

  return toBase64UrlBytes(new Uint8Array(signature));
}

function timingSafeEqual(left, right) {
  const leftBytes = encoder.encode(String(left || ""));
  const rightBytes = encoder.encode(String(right || ""));

  if (leftBytes.length === 0 || rightBytes.length === 0) return false;

  let diff = leftBytes.length ^ rightBytes.length;
  const maxLength = Math.max(leftBytes.length, rightBytes.length);

  for (let index = 0; index < maxLength; index += 1) {
    diff |= leftBytes[index % leftBytes.length] ^ rightBytes[index % rightBytes.length];
  }

  return diff === 0;
}

function toBase64UrlString(value) {
  return toBase64UrlBytes(encoder.encode(value));
}

function fromBase64UrlString(value) {
  const normalized = value.replace(/-/g, "+").replace(/_/g, "/");
  const padded = normalized + "=".repeat((4 - (normalized.length % 4)) % 4);
  const binary = atob(padded);
  const bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0));

  return decoder.decode(bytes);
}

function toBase64UrlBytes(bytes) {
  let binary = "";
  const chunkSize = 0x8000;

  for (let index = 0; index < bytes.length; index += chunkSize) {
    binary += String.fromCharCode(...bytes.subarray(index, index + chunkSize));
  }

  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}

function sanitizeText(value, maxLength) {
  return String(value || "").trim().replace(/\s+/g, " ").slice(0, maxLength);
}

function sanitizeFileName(value) {
  const cleaned = sanitizeText(value, 180)
    .normalize("NFKD")
    .replace(/[^\w.() -]/g, "-")
    .replace(/-+/g, "-")
    .replace(/^[. -]+|[. -]+$/g, "");

  return cleaned.slice(0, 140) || "archive-file";
}

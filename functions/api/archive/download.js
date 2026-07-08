import {
  applySecurityHeaders,
  attachmentHeader,
  json,
  methodNotAllowed,
  readArchiveManifest,
  requireSession,
  storageNotConfigured,
} from "./_shared.js";

export async function onRequestGet({ request, env }) {
  const auth = await requireSession(request, env);
  if (auth.response) return auth.response;

  const url = new URL(request.url);
  const id = String(url.searchParams.get("id") || "").trim();

  if (!id) {
    return json({ error: "missing_item_id" }, 400);
  }

  try {
    const manifest = await readArchiveManifest(env);
    const item = manifest.items.find((candidate) => candidate.id === id);

    if (!item) {
      return json({ error: "not_found" }, 404);
    }

    const object = await env.ARCHIVE_BUCKET.get(item.key);

    if (!object) {
      return json({ error: "file_missing" }, 404);
    }

    const headers = new Headers();
    headers.set("content-type", object.httpMetadata?.contentType || item.contentType);
    headers.set("content-disposition", attachmentHeader(item.filename));
    headers.set("cache-control", "private, no-store");
    headers.set("content-length", String(object.size || item.size || 0));
    applySecurityHeaders(headers);

    return new Response(object.body, { headers });
  } catch {
    return storageNotConfigured();
  }
}

export const onRequestPost = methodNotAllowed;
export const onRequestDelete = methodNotAllowed;

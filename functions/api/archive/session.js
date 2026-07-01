import { authConfigReady, hasArchiveBucket, json, methodNotAllowed, readSession } from "./_shared.js";

export async function onRequestGet({ request, env }) {
  const session = await readSession(request, env);

  return json({
    authenticated: Boolean(session),
    role: session?.role || null,
    expiresAt: session?.expiresAt || null,
    configured: authConfigReady(env, request),
    storageConfigured: hasArchiveBucket(env),
  });
}

export const onRequestPost = methodNotAllowed;
export const onRequestDelete = methodNotAllowed;

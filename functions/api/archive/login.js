import {
  authConfigReady,
  createSessionCookie,
  json,
  methodNotAllowed,
  parseJsonBody,
  verifyAccessCode,
} from "./_shared.js";

export async function onRequestPost({ request, env }) {
  if (!authConfigReady(env, request)) {
    return json({ error: "archive_not_configured" }, 503);
  }

  const body = await parseJsonBody(request);
  const role = verifyAccessCode(env, request, body.code);

  if (!role) {
    return json({ error: "invalid_code" }, 401);
  }

  const session = await createSessionCookie(role, env, request);

  return json(
    {
      authenticated: true,
      role,
      expiresAt: session.expiresAt,
    },
    {
      headers: {
        "set-cookie": session.cookie,
      },
    },
  );
}

export const onRequestGet = methodNotAllowed;
export const onRequestDelete = methodNotAllowed;

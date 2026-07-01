import { clearSessionCookie, json, methodNotAllowed } from "./_shared.js";

export async function onRequestPost({ request }) {
  return json(
    {
      authenticated: false,
    },
    {
      headers: {
        "set-cookie": clearSessionCookie(request),
      },
    },
  );
}

export const onRequestGet = methodNotAllowed;
export const onRequestDelete = methodNotAllowed;

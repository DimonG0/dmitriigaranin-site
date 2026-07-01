import {
  attachmentHeader,
  createArchiveItem,
  json,
  methodNotAllowed,
  parseJsonBody,
  publicArchiveItem,
  readArchiveManifest,
  requireSession,
  storageNotConfigured,
  validateUploadFile,
  writeArchiveManifest,
} from "./_shared.js";

export async function onRequestGet({ request, env }) {
  const auth = await requireSession(request, env);
  if (auth.response) return auth.response;

  try {
    const manifest = await readArchiveManifest(env);
    return json({ items: manifest.items.map(publicArchiveItem) });
  } catch {
    return storageNotConfigured();
  }
}

export async function onRequestPost({ request, env }) {
  const auth = await requireSession(request, env, "admin");
  if (auth.response) return auth.response;

  let formData;

  try {
    formData = await request.formData();
  } catch {
    return json({ error: "invalid_form_data" }, 400);
  }

  const file = formData.get("file");
  const uploadError = validateUploadFile(file);

  if (uploadError) {
    return json({ error: uploadError }, uploadError === "file_too_large" ? 413 : 400);
  }

  try {
    const manifest = await readArchiveManifest(env);
    const item = createArchiveItem(file, formData);

    await env.ARCHIVE_BUCKET.put(item.key, file.stream(), {
      httpMetadata: {
        contentType: item.contentType,
        contentDisposition: attachmentHeader(item.filename),
      },
    });

    const nextItems = [item, ...manifest.items];
    await writeArchiveManifest(env, nextItems);

    return json({ item: publicArchiveItem(item) }, 201);
  } catch {
    return storageNotConfigured();
  }
}

export async function onRequestDelete({ request, env }) {
  const auth = await requireSession(request, env, "admin");
  if (auth.response) return auth.response;

  const url = new URL(request.url);
  const body = await parseJsonBody(request);
  const id = String(url.searchParams.get("id") || body.id || "").trim();

  if (!id) {
    return json({ error: "missing_item_id" }, 400);
  }

  try {
    const manifest = await readArchiveManifest(env);
    const item = manifest.items.find((candidate) => candidate.id === id);

    if (!item) {
      return json({ error: "not_found" }, 404);
    }

    await env.ARCHIVE_BUCKET.delete(item.key);
    await writeArchiveManifest(
      env,
      manifest.items.filter((candidate) => candidate.id !== id),
    );

    return json({ deleted: true, id });
  } catch {
    return storageNotConfigured();
  }
}

export const onRequestPut = methodNotAllowed;

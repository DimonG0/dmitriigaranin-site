export async function onRequest(context: any) {
  const { request, next } = context;
  const url = new URL(request.url);

  // нормализуем путь
  const path = url.pathname.replace(/\/+$/, "");

  // если уже на языковой странице — не трогаем
  const isLangRegion = /^\/(ru|en)\/(eu|us)$/.test(path);
  if (isLangRegion) return next();

  // редиректим только корень сайта
  if (path !== "") return next();

  // ботов не редиректим (важно для SEO)
  const ua = request.headers.get("user-agent") || "";
  const isBot = /bot|crawler|spider|slurp|bingpreview|facebookexternalhit/i.test(ua);
  if (isBot) return next();

  // определяем страну
  const country =
    request.headers.get("cf-ipcountry") ||
    (context.request?.cf?.country ?? "");

  // логика: US/CA -> EN/US, иначе -> RU/EU
  const to =
    country === "US" || country === "CA"
      ? "/en/us"
      : "/ru/eu";

  return Response.redirect(`${url.origin}${to}`, 302);
}

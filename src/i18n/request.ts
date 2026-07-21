import { cookies } from "next/headers";
import { getRequestConfig } from "next-intl/server";

export const locales = ["en", "hi"] as const;
export const defaultLocale = "en" as const;
export type Locale = (typeof locales)[number];

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const candidate = (locales as readonly string[]).includes(requested ?? "")
    ? (requested as Locale)
    : defaultLocale;

  const store = await cookies();
  const cookieLocale = store.get("rb_locale")?.value;
  const locale: Locale = (locales as readonly string[]).includes(
    cookieLocale ?? "",
  )
    ? (cookieLocale as Locale)
    : candidate;

  const messages = (await import(`../../messages/${locale}.json`)).default;
  return { locale, messages };
});

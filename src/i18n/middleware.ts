import createMiddleware from "next-intl/middleware";
import { locales, defaultLocale } from "./request";

export default createMiddleware({
  locales: [...locales],
  defaultLocale,
  localePrefix: "as-needed",
});

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};

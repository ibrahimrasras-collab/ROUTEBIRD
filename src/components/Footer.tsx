"use client";

import { useTranslations } from "next-intl";
import { BrandMark } from "./BrandMark";

export function Footer({ locale }: { locale: string }) {
  const t = useTranslations("footer");

  const productLinks = [
    { label: t("cols.product.links.0.label"), href: "/#how" },
    { label: t("cols.product.links.1.label"), href: "/#features" },
    { label: t("cols.product.links.2.label"), href: "/#pricing" },
    { label: t("cols.product.links.3.label"), href: "/#waitlist" },
  ];

  const companyLinks = [
    { label: t("cols.company.links.0.label"), href: "/#faq" },
    { label: t("cols.company.links.1.label"), href: "/#problem" },
    { label: t("cols.company.links.2.label"), href: "/#market" },
    { label: t("cols.company.links.3.label"), href: "mailto:hello@routebird.app" },
  ];

  return (
    <footer className="border-t border-divider bg-surface-offset">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-[1.5fr_1fr_1fr] gap-10">
          <div>
            <a
              href={`/${locale}`}
              className="flex items-center gap-2 font-display font-bold text-lg text-text no-underline mb-3"
              aria-label="Routebird home"
            >
              <BrandMark className="w-7 h-7 text-primary" />
              Routebird
            </a>
            <p className="text-sm text-text-muted leading-relaxed max-w-sm">
              {t("tag")}
            </p>
            <span className="mt-3 inline-flex items-center gap-1.5 text-xs text-text-faint">
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              {t("loc")}
            </span>
          </div>

          <div>
            <h4 className="font-display font-bold text-sm text-text mb-3">
              {t("cols.product.title")}
            </h4>
            <ul className="space-y-2">
              {productLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-text-muted hover:text-text transition-colors no-underline"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display font-bold text-sm text-text mb-3">
              {t("cols.company.title")}
            </h4>
            <ul className="space-y-2">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-text-muted hover:text-text transition-colors no-underline"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-divider">
          <p className="text-xs text-text-faint leading-relaxed">
            {t("small")}
          </p>
          <div className="mt-4 flex items-center gap-4">
            {[
              {
                label: "X",
                href: "#",
                icon: (
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                ),
              },
              {
                label: "Instagram",
                href: "#",
                icon: (
                  <>
                    <rect x="2" y="2" width="20" height="20" rx="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <path d="M17.5 6.5h.01" />
                  </>
                ),
              },
              {
                label: "LinkedIn",
                href: "#",
                icon: (
                  <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z" />
                ),
              },
              {
                label: "Email",
                href: "mailto:hello@routebird.app",
                icon: (
                  <>
                    <rect x="2" y="4" width="20" height="16" rx="2" />
                    <path d="m22 7-10 6L2 7" />
                  </>
                ),
              },
            ].map((social) => (
              <a
                key={social.label}
                href={social.href}
                aria-label={`Routebird on ${social.label}`}
                className="text-text-faint hover:text-text transition-colors"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  {social.icon}
                </svg>
              </a>
            ))}
          </div>
          <p className="mt-4 text-xs text-text-faint">
            {t("copyright")}
          </p>
        </div>
      </div>
    </footer>
  );
}

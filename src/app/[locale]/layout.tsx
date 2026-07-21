import type { Metadata } from "next";
import { NextIntlClientProvider, useMessages } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/request";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { ThemeProvider } from "@/components/ThemeProvider";

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: Locale }>;
};

export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "hi" }];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const messages = await getMessages({ locale });
  const meta = messages.metadata as { title: string; description: string };
  return {
    title: meta.title,
    description: meta.description,
    metadataBase: new URL("https://routebird.app"),
    openGraph: {
      title: meta.title,
      description: meta.description,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: meta.title,
      description: meta.description,
    },
    icons: {
      icon: "/icon-192.svg",
    },
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      <ThemeProvider>
        <a href="#main" className="sr-only">
          Skip to content
        </a>
        <Nav locale={locale} />
        <main id="main">{children}</main>
        <Footer locale={locale} />
      </ThemeProvider>
    </NextIntlClientProvider>
  );
}

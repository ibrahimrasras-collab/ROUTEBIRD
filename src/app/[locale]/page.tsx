"use client";

import { useTranslations } from "next-intl";
import { RevealOnScroll } from "@/components/RevealOnScroll";
import { WaitlistForm } from "@/components/WaitlistForm";
import { BrandMark } from "@/components/BrandMark";

function CheckIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2 4 6v6c0 5 3.5 8 8 10 4.5-2 8-5 8-10V6l-8-4z" />
      <path d="M12 8v4" />
      <path d="M12 16h.01" />
    </svg>
  );
}

function DollarIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 1v22" />
      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
    </svg>
  );
}

function BoxIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 16V8a2 2 0 0 0-1-1.7l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.7l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
      <path d="m3.3 7 8.7 5 8.7-5" />
      <path d="M12 22V12" />
    </svg>
  );
}

function GradIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
      <path d="M6 12v5c3 3 9 3 12 0v-5" />
    </svg>
  );
}

const problemIcons = [ShieldIcon, DollarIcon, BoxIcon, GradIcon];

const featureIconPaths = [
  // Visa-aware search
  <>
    <path d="M4 24c6-1.2 10.5-4.5 14-10 1.4-2.2 2.8-3.6 4.6-3.6" />
    <path d="M18 10.4 23 6.5 21.4 12" />
    <circle cx="23" cy="6.8" r="1.2" fill="currentColor" stroke="none" />
    <path d="M4 24h24" opacity="0.3" strokeDasharray="2 3" />
    <path d="M16 24v-4M10 24v-2M22 24v-3" opacity="0.5" />
  </>,
  // Pricing
  <>
    <circle cx="16" cy="16" r="11" />
    <path d="M16 9v7l4.5 2.5" />
    <path d="M5 16h2M25 16h2M16 5v2M16 25v2" opacity="0.6" />
  </>,
  // Bilingual
  <>
    <path d="M5 11h22M5 11V8a3 3 0 0 1 3-3h16a3 3 0 0 1 3 3v3" />
    <path d="M5 11v13a3 3 0 0 0 3 3h16a3 3 0 0 0 3-3V11" />
    <path d="M11 16h4M11 20h6" opacity="0.7" />
    <circle cx="22" cy="18" r="2.5" opacity="0.7" />
  </>,
  // Student
  <>
    <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
    <path d="M6 12v5c3 3 9 3 12 0v-5" />
    <path d="M27 14v6M22 17h8M24 17v3" opacity="0.7" />
  </>,
  // Insurance
  <>
    <path d="M12 2 4 6v6c0 5 3.5 8 8 10 4.5-2 8-5 8-10V6l-8-4z" />
    <path d="m9 12 2 2 4-4" />
    <rect x="20" y="18" width="9" height="11" rx="2" opacity="0.6" />
    <path d="M22 21h5M24.5 25h.01" opacity="0.6" />
  </>,
  // Community
  <>
    <circle cx="11" cy="11" r="4" />
    <circle cx="21" cy="21" r="4" />
    <path d="M14 14l4 4" opacity="0.6" />
    <path d="M5 5h2M25 27h2" opacity="0.4" />
  </>,
];

export default function LandingPage() {
  const tNav = useTranslations("nav");
  const tHero = useTranslations("hero");
  const tProblem = useTranslations("problem");
  const tFeatures = useTranslations("features");
  const tHow = useTranslations("how");
  const tStats = useTranslations("stats");
  const tPricing = useTranslations("pricing");
  const tFaq = useTranslations("faq");
  const tFinalCta = useTranslations("finalCta");
  const tFooter = useTranslations("footer");

  return (
    <>
      {/* ============ HERO ============ */}
      <section className="section relative overflow-hidden" id="top">
        <div
          className="absolute inset-0 opacity-30 pointer-events-none"
          aria-hidden="true"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 50% -10%, var(--color-primary-soft), transparent)",
          }}
        />
        <div className="container container--wide relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <RevealOnScroll>
                <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary-soft text-primary text-xs font-semibold mb-6">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                  {tHero("pill")}
                </span>
              </RevealOnScroll>

              <RevealOnScroll delay={80}>
                <h1
                  className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight tracking-tight mb-5"
                  dangerouslySetInnerHTML={{
                    __html: tHero("title")
                      .replace("{em}", '<em className="text-primary not-italic">')
                      .replace("{/em}", "</em>"),
                  }}
                />
              </RevealOnScroll>

              <RevealOnScroll delay={160}>
                <p className="text-text-muted text-base lg:text-lg leading-relaxed mb-6 max-w-xl">
                  {tHero("sub")}
                </p>
              </RevealOnScroll>

              <RevealOnScroll delay={200}>
                <div className="flex flex-wrap gap-x-5 gap-y-2 mb-8">
                  {tHero.raw("trust").map((item: string) => (
                    <span key={item} className="flex items-center gap-1.5 text-sm text-text-muted">
                      <CheckIcon />
                      {item}
                    </span>
                  ))}
                </div>
              </RevealOnScroll>

              <RevealOnScroll delay={240}>
                <WaitlistForm />
              </RevealOnScroll>
            </div>

            {/* Hero visual: search card mockup */}
            <RevealOnScroll delay={300} className="hidden lg:block">
              <div className="relative">
                {/* Floating badges */}
                <div className="absolute -top-4 -left-4 z-10 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-success-soft text-success text-xs font-semibold shadow-sm">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2 4 6v6c0 5 3.5 8 8 10 4.5-2 8-5 8-10V6l-8-4z" />
                    <path d="m9 12 2 2 4-4" />
                  </svg>
                  Visa-eligible
                </div>
                <div className="absolute -top-4 right-8 z-10 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-accent-soft text-accent text-xs font-semibold shadow-sm">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 1v22" />
                    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                  </svg>
                  All-in price
                </div>

                {/* Search card */}
                <div className="rounded-2xl border border-border bg-surface shadow-lg overflow-hidden">
                  <div className="flex items-center justify-between px-5 py-3 border-b border-divider">
                    <div className="flex gap-1">
                      <span className="px-3 py-1 rounded-lg bg-primary-soft text-primary text-xs font-semibold">Flights</span>
                      <span className="px-3 py-1 rounded-lg text-text-faint text-xs font-medium">Hotels</span>
                      <span className="px-3 py-1 rounded-lg text-text-faint text-xs font-medium">Bundles</span>
                    </div>
                  </div>

                  <div className="px-5 py-3 flex items-center gap-2 text-xs text-text-muted border-b border-divider">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 4v16c0 1 .5 2 2 2h14V2H6C4.5 2 4 3 4 4z" />
                      <path d="M4 18h14" />
                    </svg>
                    <span className="font-medium">Passport</span>
                    <span>IN India</span>
                  </div>

                  <div className="grid grid-cols-2 gap-px bg-divider">
                    <div className="bg-surface px-5 py-3">
                      <div className="text-xs text-text-faint mb-0.5">From</div>
                      <div className="text-sm font-semibold text-text">Melbourne MEL</div>
                    </div>
                    <div className="bg-surface px-5 py-3">
                      <div className="text-xs text-text-faint mb-0.5">To</div>
                      <div className="text-sm font-semibold text-text">Delhi DEL</div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-px bg-divider">
                    <div className="bg-surface px-5 py-3">
                      <div className="text-xs text-text-faint mb-0.5">Depart</div>
                      <div className="text-sm font-semibold text-text">12 Dec</div>
                    </div>
                    <div className="bg-surface px-5 py-3">
                      <div className="text-xs text-text-faint mb-0.5">Return</div>
                      <div className="text-sm font-semibold text-text">28 Jan</div>
                    </div>
                  </div>

                  <div className="px-5 py-4">
                    <button type="button" className="w-full py-2.5 rounded-xl bg-primary text-text-inverse text-sm font-semibold">
                      Search visa-eligible fares
                    </button>
                  </div>

                  {/* Fare results */}
                  <div className="border-t border-divider">
                    <div className="flex items-center justify-between px-5 py-2 text-xs text-text-faint">
                      <span>Visa-eligible &middot; cheapest first</span>
                      <span>All-in</span>
                    </div>

                    <div className="flex items-center justify-between px-5 py-3 border-t border-divider hover:bg-surface-offset transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-primary-soft flex items-center justify-center text-primary">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.8 19.2 16 11l3.5-3.5a2.12 2.12 0 0 0-3-3L13 8 4.8 6.2a1 1 0 0 0-.6 1.9l6.3 2.1-2 3-2.5-.5a1 1 0 0 0-.9 1.7l2 1.4 1.4 2a1 1 0 0 0 1.7-.9l-.5-2.5 3-2 2.1 6.3a1 1 0 0 0 1.9-.6z" /></svg>
                        </div>
                        <div>
                          <div className="text-sm font-semibold text-text">MEL &rarr; KUL &rarr; DEL</div>
                          <div className="flex items-center gap-2 text-xs text-text-muted">
                            <span>AirAsia &middot; 15h 20m</span>
                            <span className="px-1.5 py-0.5 rounded bg-success-soft text-success font-medium">Visa-OK</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-sm font-bold text-text">A$842</div>
                    </div>

                    <div className="flex items-center justify-between px-5 py-3 border-t border-divider hover:bg-surface-offset transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-primary-soft flex items-center justify-center text-primary">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.8 19.2 16 11l3.5-3.5a2.12 2.12 0 0 0-3-3L13 8 4.8 6.2a1 1 0 0 0-.6 1.9l6.3 2.1-2 3-2.5-.5a1 1 0 0 0-.9 1.7l2 1.4 1.4 2a1 1 0 0 0 1.7-.9l-.5-2.5 3-2 2.1 6.3a1 1 0 0 0 1.9-.6z" /></svg>
                        </div>
                        <div>
                          <div className="text-sm font-semibold text-text">MEL &rarr; SIN &rarr; DEL</div>
                          <div className="flex items-center gap-2 text-xs text-text-muted">
                            <span>Scoot &middot; 14h 05m</span>
                            <span className="px-1.5 py-0.5 rounded bg-success-soft text-success font-medium">Visa-OK</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-sm font-bold text-text">A$879</div>
                    </div>

                    <div className="flex items-center justify-between px-5 py-3 border-t border-divider opacity-50">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-error-soft flex items-center justify-center text-error">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.8 19.2 16 11l3.5-3.5a2.12 2.12 0 0 0-3-3L13 8 4.8 6.2a1 1 0 0 0-.6 1.9l6.3 2.1-2 3-2.5-.5a1 1 0 0 0-.9 1.7l2 1.4 1.4 2a1 1 0 0 0 1.7-.9l-.5-2.5 3-2 2.1 6.3a1 1 0 0 0 1.9-.6z" /></svg>
                        </div>
                        <div>
                          <div className="text-sm font-semibold text-text">MEL &rarr; BKK &rarr; DEL</div>
                          <div className="flex items-center gap-2 text-xs text-text-muted">
                            <span>Thai Lion &middot; A$798</span>
                            <span className="px-1.5 py-0.5 rounded bg-warning-soft text-warning font-medium">Transit visa</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-sm font-bold text-text line-through">Hidden</div>
                    </div>
                  </div>
                </div>
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </section>

      {/* ============ PROBLEM ============ */}
      <section className="section" id="problem">
        <div className="container">
          <RevealOnScroll>
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="text-xs font-semibold uppercase tracking-widest text-primary mb-2 block">
                {tProblem("eyebrow")}
              </span>
              <h2 className="font-display text-2xl sm:text-3xl font-bold mb-4">
                {tProblem("title")}
              </h2>
              <p className="text-text-muted leading-relaxed">
                {tProblem("intro")}
              </p>
            </div>
          </RevealOnScroll>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {tProblem.raw("cards").map(
              (card: { title: string; body: string }, i: number) => {
                const Icon = problemIcons[i];
                return (
                  <RevealOnScroll key={card.title} delay={i * 80}>
                    <article className="p-6 rounded-2xl border border-border bg-surface hover:shadow-md transition-shadow h-full">
                      <div className="w-10 h-10 rounded-xl bg-primary-soft flex items-center justify-center text-primary mb-4">
                        <Icon />
                      </div>
                      <div className="text-xs font-mono text-text-faint mb-2">
                        {String(i + 1).padStart(2, "0")}
                      </div>
                      <h3 className="font-display font-bold text-base mb-2">
                        {card.title}
                      </h3>
                      <p className="text-sm text-text-muted leading-relaxed">
                        {card.body}
                      </p>
                    </article>
                  </RevealOnScroll>
                );
              },
            )}
          </div>
        </div>
      </section>

      {/* ============ FEATURES ============ */}
      <section className="section" id="features">
        <div className="container">
          <RevealOnScroll>
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="text-xs font-semibold uppercase tracking-widest text-primary mb-2 block">
                {tFeatures("eyebrow")}
              </span>
              <h2 className="font-display text-2xl sm:text-3xl font-bold mb-4">
                {tFeatures("title")}
              </h2>
              <p className="text-text-muted leading-relaxed">
                {tFeatures("intro")}
              </p>
            </div>
          </RevealOnScroll>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {tFeatures.raw("items").map(
              (
                feature: { title: string; body: string; tag: string },
                i: number,
              ) => {
                const isLast = i === 5;
                return (
                  <RevealOnScroll key={feature.title} delay={i * 60}>
                    <article
                      className={`p-6 rounded-2xl border h-full ${
                        isLast
                          ? "border-primary/20 bg-gradient-to-b from-primary-soft to-surface"
                          : "border-border bg-surface"
                      } hover:shadow-md transition-shadow`}
                    >
                      <div className="flex items-center gap-3 mb-4">
                        <span className="text-xs font-mono text-text-faint">
                          {isLast ? "+1" : String(i + 1).padStart(2, "0")}
                        </span>
                        <svg
                          className="w-8 h-8 text-primary"
                          viewBox="0 0 32 32"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.7"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          aria-hidden="true"
                        >
                          {featureIconPaths[i]}
                        </svg>
                      </div>
                      <h3 className="font-display font-bold text-base mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-sm text-text-muted leading-relaxed mb-3">
                        {feature.body}
                      </p>
                      <span className="inline-block px-2.5 py-1 rounded-lg bg-primary-soft text-primary text-xs font-medium">
                        {feature.tag}
                      </span>
                    </article>
                  </RevealOnScroll>
                );
              },
            )}
          </div>
        </div>
      </section>

      {/* ============ HOW IT WORKS ============ */}
      <section
        className="section"
        id="how"
        style={{
          background: "var(--color-surface-offset)",
          borderTop: "1px solid var(--color-divider)",
          borderBottom: "1px solid var(--color-divider)",
        }}
      >
        <div className="container">
          <RevealOnScroll>
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="text-xs font-semibold uppercase tracking-widest text-primary mb-2 block">
                {tHow("eyebrow")}
              </span>
              <h2 className="font-display text-2xl sm:text-3xl font-bold mb-4">
                {tHow("title")}
              </h2>
              <p className="text-text-muted leading-relaxed">
                {tHow("intro")}
              </p>
            </div>
          </RevealOnScroll>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {tHow.raw("steps").map(
              (step: { title: string; body: string }, i: number) => (
                <RevealOnScroll key={step.title} delay={i * 100}>
                  <article className="relative text-center">
                    <div className="w-12 h-12 rounded-full bg-primary text-text-inverse flex items-center justify-center text-lg font-bold mx-auto mb-4">
                      {String(i + 1).padStart(2, "0")}
                    </div>
                    <h3 className="font-display font-bold text-base mb-2">
                      {step.title}
                    </h3>
                    <p className="text-sm text-text-muted leading-relaxed">
                      {step.body}
                    </p>
                    {i < 2 && (
                      <svg
                        className="hidden md:block absolute top-6 -right-4 w-7 h-7 text-text-faint"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <path d="M5 12h14" />
                        <path d="M13 6l6 6-6 6" />
                      </svg>
                    )}
                  </article>
                </RevealOnScroll>
              ),
            )}
          </div>
        </div>
      </section>

      {/* ============ STATS ============ */}
      <section className="section" id="market">
        <div className="container">
          <RevealOnScroll>
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="text-xs font-semibold uppercase tracking-widest text-primary mb-2 block">
                {tStats("eyebrow")}
              </span>
              <h2 className="font-display text-2xl sm:text-3xl font-bold mb-4">
                {tStats("title")}
              </h2>
              <p className="text-text-muted leading-relaxed">
                {tStats("intro")}
              </p>
            </div>
          </RevealOnScroll>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {tStats.raw("items").map(
              (stat: { value: string; label: string }, i: number) => (
                <RevealOnScroll key={stat.value} delay={i * 80}>
                  <div className="p-6 rounded-2xl border border-border bg-surface text-center">
                    <div className="font-display text-3xl font-extrabold text-primary mb-2">
                      {stat.value}
                    </div>
                    <p className="text-sm text-text-muted leading-relaxed">
                      {stat.label}
                    </p>
                  </div>
                </RevealOnScroll>
              ),
            )}
          </div>
        </div>
      </section>

      {/* ============ PRICING ============ */}
      <section className="section" id="pricing">
        <div className="container">
          <RevealOnScroll>
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="text-xs font-semibold uppercase tracking-widest text-primary mb-2 block">
                {tPricing("eyebrow")}
              </span>
              <h2 className="font-display text-2xl sm:text-3xl font-bold mb-4">
                {tPricing("title")}
              </h2>
              <p className="text-text-muted leading-relaxed">
                {tPricing("intro")}
              </p>
            </div>
          </RevealOnScroll>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-4xl mx-auto">
            {tPricing.raw("plans").map(
              (
                plan: {
                  name: string;
                  price: string;
                  priceUnit: string;
                  desc: string;
                  cta: string;
                  badge?: string;
                  soon?: string;
                  features: string[];
                },
                i: number,
              ) => {
                const isFeatured = i === 1;
                return (
                  <RevealOnScroll key={plan.name} delay={i * 80}>
                    <article
                      className={`relative p-6 rounded-2xl border h-full flex flex-col ${
                        isFeatured
                          ? "border-primary bg-surface shadow-teal"
                          : "border-border bg-surface"
                      }`}
                    >
                      {plan.badge && (
                        <span className="absolute -top-3 left-6 px-3 py-1 rounded-full bg-accent text-text-inverse text-xs font-bold">
                          {plan.badge}
                        </span>
                      )}
                      <h3 className="font-display font-bold text-base mb-2">
                        {plan.name}
                      </h3>
                      <div className="mb-3">
                        <span className="font-display text-3xl font-extrabold">
                          {plan.price}
                        </span>
                        <span className="text-sm text-text-muted">
                          {plan.priceUnit}
                        </span>
                      </div>
                      <p className="text-sm text-text-muted leading-relaxed mb-4">
                        {plan.desc}
                      </p>
                      {plan.soon && (
                        <span className="inline-block mb-3 px-2.5 py-1 rounded-lg bg-warning-soft text-warning text-xs font-medium">
                          {plan.soon}
                        </span>
                      )}
                      <ul className="space-y-2.5 mb-6 flex-1">
                        {plan.features.map((f: string) => (
                          <li
                            key={f}
                            className="flex items-start gap-2 text-sm text-text-muted"
                          >
                            <CheckIcon />
                            {f}
                          </li>
                        ))}
                      </ul>
                      <a
                        href="#waitlist"
                        className={`flex items-center justify-center px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                          isFeatured
                            ? "bg-primary text-text-inverse hover:bg-primary-hover"
                            : "border border-border text-text hover:bg-surface-offset"
                        }`}
                      >
                        {plan.cta}
                      </a>
                    </article>
                  </RevealOnScroll>
                );
              },
            )}
          </div>
        </div>
      </section>

      {/* ============ FAQ ============ */}
      <section className="section" id="faq">
        <div className="container container--narrow">
          <RevealOnScroll>
            <div className="text-center mb-10">
              <span className="text-xs font-semibold uppercase tracking-widest text-primary mb-2 block">
                {tFaq("eyebrow")}
              </span>
              <h2 className="font-display text-2xl sm:text-3xl font-bold">
                {tFaq("title")}
              </h2>
            </div>
          </RevealOnScroll>

          <div className="space-y-3">
            {tFaq.raw("items").map(
              (item: { q: string; a: string }, i: number) => (
                <RevealOnScroll key={item.q} delay={i * 60}>
                  <details className="group rounded-2xl border border-border bg-surface overflow-hidden">
                    <summary className="flex items-center justify-between gap-4 px-5 py-4 cursor-pointer text-sm font-semibold text-text list-none">
                      {item.q}
                      <svg
                        className="w-5 h-5 text-text-faint shrink-0 transition-transform group-open:rotate-45"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <path d="M12 5v14" />
                        <path d="M5 12h14" />
                      </svg>
                    </summary>
                    <div className="px-5 pb-4 text-sm text-text-muted leading-relaxed">
                      {item.a}
                    </div>
                  </details>
                </RevealOnScroll>
              ),
            )}
          </div>
        </div>
      </section>

      {/* ============ FINAL CTA ============ */}
      <section className="section" id="waitlist">
        <div className="container">
          <RevealOnScroll>
            <div className="max-w-xl mx-auto text-center p-8 sm:p-12 rounded-3xl border border-border bg-surface shadow-lg">
              <h2 className="font-display text-2xl sm:text-3xl font-bold mb-3">
                {tFinalCta("title")}
              </h2>
              <p className="text-text-muted leading-relaxed mb-6">
                {tFinalCta("sub")}
              </p>
              <WaitlistForm id="waitlist-final" />
            </div>
          </RevealOnScroll>
        </div>
      </section>
    </>
  );
}

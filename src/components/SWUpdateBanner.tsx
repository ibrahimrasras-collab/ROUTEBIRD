"use client";

import { useEffect, useState } from "react";

export default function SWUpdateBanner() {
  const [show, setShow] = useState(false);
  const [registration, setRegistration] =
    useState<ServiceWorkerRegistration | null>(null);

  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      setRegistration(detail.registration);
      setShow(true);
    };
    window.addEventListener("sw-update", handler);
    return () => window.removeEventListener("sw-update", handler);
  }, []);

  if (!show) return null;

  return (
    <div className="fixed bottom-4 left-1/2 z-50 -translate-x-1/2 rounded-xl bg-surface px-5 py-3 shadow-xl ring-1 ring-ink/5">
      <p className="text-sm font-semibold text-ink">
        New version available
      </p>
      <div className="mt-2 flex gap-2">
        <button
          onClick={() => {
            registration?.waiting?.postMessage({ type: "SKIP_WAITING" });
            window.location.reload();
          }}
          className="rounded-lg bg-primary px-4 py-1.5 text-xs font-bold text-contrast transition hover:bg-primary-hover"
        >
          Refresh
        </button>
        <button
          onClick={() => setShow(false)}
          className="rounded-lg bg-surface-alt px-4 py-1.5 text-xs font-semibold text-muted transition hover:text-ink"
        >
          Later
        </button>
      </div>
    </div>
  );
}

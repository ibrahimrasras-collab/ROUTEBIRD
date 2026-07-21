"use client";

import { useEffect } from "react";

export default function RegisterSW() {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/sw.js")
        .then((reg) => {
          // Check for updates periodically
          setInterval(() => reg.update(), 60 * 60 * 1000);

          // Listen for new service worker activation
          reg.addEventListener("updatefound", () => {
            const newWorker = reg.installing;
            if (!newWorker) return;

            newWorker.addEventListener("statechange", () => {
              if (
                newWorker.state === "installed" &&
                navigator.serviceWorker.controller
              ) {
                // New content available — prompt user to refresh
                window.dispatchEvent(
                  new CustomEvent("sw-update", { detail: { registration: reg } }),
                );
              }
            });
          });
        })
        .catch(() => {
          // SW registration failed — non-critical
        });
    }
  }, []);

  return null;
}

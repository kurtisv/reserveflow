"use client";

import { useRouter } from "next/navigation";

import type { Locale } from "@/i18n/config";

export function LanguageSwitcher({ current }: { current: Locale }) {
  const router = useRouter();

  async function setLocale(nextLocale: Locale) {
    await fetch("/api/locale", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ locale: nextLocale }),
    });
    router.refresh();
  }

  return (
    <div className="inline-flex rounded-lg border bg-background p-1 text-xs font-medium">
      {(["fr", "en"] as const).map((locale) => (
        <button
          key={locale}
          type="button"
          onClick={() => {
            void setLocale(locale);
          }}
          className={
            current === locale
              ? "rounded-md bg-primary px-2 py-1 text-primary-foreground"
              : "rounded-md px-2 py-1 text-muted-foreground hover:text-foreground"
          }
          aria-pressed={current === locale}
        >
          {locale.toUpperCase()}
        </button>
      ))}
    </div>
  );
}

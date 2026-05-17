import Link from "next/link";

import { LanguageSwitcher } from "@/components/language-switcher";
import { Button } from "@/components/ui/button";
import { getCurrentLocale } from "@/lib/locale";

const copy = {
  fr: {
    nav: [
      { href: "/services", label: "Services" },
      { href: "/booking", label: "Reservation" },
      { href: "/case-study", label: "Etude de cas" },
      { href: "/contact", label: "Contact" },
    ],
    book: "Reserver",
  },
  en: {
    nav: [
      { href: "/services", label: "Services" },
      { href: "/booking", label: "Booking" },
      { href: "/case-study", label: "Case study" },
      { href: "/contact", label: "Contact" },
    ],
    book: "Book",
  },
};

export async function Navbar() {
  const locale = await getCurrentLocale();
  const t = copy[locale];

  return (
    <header className="border-b bg-card/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-2 text-base font-semibold">
          <span className="size-3 rounded-full bg-[var(--accent)]" />
          ReserveFlow
        </Link>
        <nav className="hidden items-center gap-6 md:flex">
          {t.nav.map((item) => (
            <Link key={item.href} href={item.href} className="text-sm text-muted-foreground hover:text-foreground">
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <LanguageSwitcher current={locale} />
          <Button asChild size="sm">
            <Link href="/booking">{t.book}</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}

import Link from "next/link";

import { getCurrentLocale } from "@/lib/locale";

const copy = {
  fr: {
    description: "Reservation, disponibilites et operations de services construites avec KV Web Starter.",
    booking: "Reservation",
    caseStudy: "Etude de cas",
    privacy: "Confidentialite",
    terms: "Conditions",
    contact: "Contact",
  },
  en: {
    description: "Booking, availability, and service operations built from KV Web Starter.",
    booking: "Booking",
    caseStudy: "Case study",
    privacy: "Privacy",
    terms: "Terms",
    contact: "Contact",
  },
};

export async function Footer() {
  const locale = await getCurrentLocale();
  const t = copy[locale];

  return (
    <footer className="border-t bg-card">
      <div className="mx-auto grid max-w-6xl gap-6 px-6 py-10 text-sm text-muted-foreground sm:grid-cols-3">
        <div>
          <p className="font-medium text-foreground">ReserveFlow</p>
          <p className="mt-2">{t.description}</p>
        </div>
        <div className="grid gap-2">
          <Link href="/services">Services</Link>
          <Link href="/booking">{t.booking}</Link>
          <Link href="/case-study">{t.caseStudy}</Link>
        </div>
        <div className="grid gap-2">
          <Link href="/privacy">{t.privacy}</Link>
          <Link href="/terms">{t.terms}</Link>
          <Link href="/contact">{t.contact}</Link>
        </div>
      </div>
    </footer>
  );
}

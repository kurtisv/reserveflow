import Link from "next/link";
import { ArrowRight, CalendarCheck, Clock3, Sparkles, UsersRound } from "lucide-react";

import { MarketingPageShell } from "@/components/marketing/page-shell";
import { Button } from "@/components/ui/button";
import { getCurrentLocale } from "@/lib/locale";

const copy = {
  fr: {
    eyebrow: "Projet 5 - Portfolio KV Web Starter",
    title: "Logiciel de reservation pour equipes de service qui veulent un calendrier plus clair.",
    intro:
      "ReserveFlow montre comment le boilerplate partage devient un produit de rendez-vous cible avec reservation publique, regles de disponibilite, operations et confirmations pretes pour courriel.",
    primaryCta: "Demander une reservation",
    secondaryCta: "Voir l'etude de cas",
    today: "Aujourd'hui",
    requestCount: "12 demandes de reservation",
    slots: ["09:00 Accueil", "10:30 Revue", "13:00 Planification", "15:30 Confirme"],
    highlights: [
      {
        name: "Catalogue de services",
        description: "Durees, prix, categories et regles de reservation au meme endroit.",
        icon: Sparkles,
      },
      {
        name: "Disponibilites",
        description: "Les horaires d'equipe et de ressources suivent un flux de rendez-vous realiste.",
        icon: Clock3,
      },
      {
        name: "Operations",
        description: "Le tableau de bord garde les demandes, confirmations et rendez-vous termines visibles.",
        icon: UsersRound,
      },
    ],
  },
  en: {
    eyebrow: "Project 5 - KV Web Starter portfolio",
    title: "Booking software for service teams that need a calmer calendar.",
    intro:
      "ReserveFlow shows how the shared boilerplate becomes a focused appointment product with public booking, availability rules, dashboard operations, and email-ready confirmations.",
    primaryCta: "Request a booking",
    secondaryCta: "View case study",
    today: "Today",
    requestCount: "12 booking requests",
    slots: ["09:00 Intake", "10:30 Review", "13:00 Planning", "15:30 Confirmed"],
    highlights: [
      {
        name: "Service catalog",
        description: "Package durations, pricing, categories, and booking rules in one place.",
        icon: Sparkles,
      },
      {
        name: "Availability",
        description: "Staff and resource schedules are modeled for practical appointment flow.",
        icon: Clock3,
      },
      {
        name: "Operations",
        description: "A dashboard keeps requested, confirmed, and completed bookings visible.",
        icon: UsersRound,
      },
    ],
  },
};

export default async function Home() {
  const locale = await getCurrentLocale();
  const t = copy[locale];

  return (
    <MarketingPageShell>
      <main>
        <section className="mx-auto grid w-full max-w-6xl gap-12 px-6 py-16 sm:py-24 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div className="max-w-3xl">
            <p className="mb-4 text-sm font-medium uppercase tracking-[0.18em] text-primary">
              {t.eyebrow}
            </p>
            <h1 className="text-4xl font-semibold tracking-normal text-balance sm:text-6xl">
              {t.title}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
              {t.intro}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild>
                <Link href="/booking">
                  {t.primaryCta} <ArrowRight className="size-4" />
                </Link>
              </Button>
              <Button asChild variant="secondary">
                <Link href="/case-study">{t.secondaryCta}</Link>
              </Button>
            </div>
          </div>

          <div className="rounded-lg border bg-card p-6 shadow-sm">
            <div className="mb-6 flex items-center gap-3 border-b pb-5">
              <div className="flex size-12 items-center justify-center rounded-lg border bg-[var(--accent-soft)]">
                <CalendarCheck className="size-6" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">{t.today}</p>
                <p className="text-xl font-semibold">{t.requestCount}</p>
              </div>
            </div>
            <div className="grid gap-4">
              {t.highlights.map((item) => (
                <div key={item.name} className="flex gap-4 border-b pb-4 last:border-b-0 last:pb-0">
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-lg border bg-secondary">
                    <item.icon className="size-5" />
                  </div>
                  <div>
                    <h2 className="font-medium">{item.name}</h2>
                    <p className="mt-1 text-sm leading-6 text-muted-foreground">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section className="border-y bg-card">
          <div className="mx-auto grid max-w-6xl gap-3 px-6 py-6 text-sm text-muted-foreground sm:grid-cols-4">
            {t.slots.map((slot) => (
              <div key={slot} className="rounded-lg border bg-background px-4 py-3">
                {slot}
              </div>
            ))}
          </div>
        </section>
      </main>
    </MarketingPageShell>
  );
}

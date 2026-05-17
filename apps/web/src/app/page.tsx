import Link from "next/link";
import {
  ArrowRight,
  BellRing,
  CalendarCheck,
  CheckCircle2,
  Clock3,
  CreditCard,
  DatabaseZap,
  KeyRound,
  MailCheck,
  PanelsTopLeft,
  Route,
  ShieldCheck,
  Sparkles,
  UsersRound,
} from "lucide-react";

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
    dashboardLabel: "Operations en direct",
    today: "Aujourd'hui",
    requestCount: "12 demandes de reservation",
    queueTitle: "File de reservation",
    queueMeta: "4 nouveaux clients a qualifier",
    conversion: "94%",
    conversionLabel: "parcours demo complete sans support",
    slots: ["09:00 Accueil", "10:30 Revue", "13:00 Planification", "15:30 Confirme"],
    pipeline: [
      { label: "Demandes", value: "12", tone: "bg-[#fdf1c4]" },
      { label: "Confirmees", value: "8", tone: "bg-[#cbeee9]" },
      { label: "A revoir", value: "3", tone: "bg-[#ffd8c2]" },
    ],
    liveRows: [
      { client: "Mila Studio", service: "Audit disponibilites", time: "09:00", status: "Confirme" },
      { client: "North Clinic", service: "Sprint planning", time: "10:30", status: "Nouveau" },
      { client: "Atelier Rue", service: "Revue operations", time: "13:00", status: "En attente" },
    ],
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
    depthEyebrow: "Ce que le boilerplate demontre",
    depthTitle: "Une seule base, plusieurs couches produit visibles.",
    depthIntro:
      "ReserveFlow expose le marketing, le booking public, la logique metier, le dashboard admin, les emails et les fondations SaaS/API dans une experience coherente.",
    modules: [
      {
        title: "Experience publique",
        description: "Pages marketing, SEO, services, formulaire contact et parcours de reservation.",
        icon: PanelsTopLeft,
      },
      {
        title: "Logique metier",
        description: "Services, staff, disponibilites, exceptions, statuts et tokens publics.",
        icon: DatabaseZap,
      },
      {
        title: "Operations",
        description: "Dashboard, listes, details, actions de statut et lecture claire du pipeline.",
        icon: ShieldCheck,
      },
      {
        title: "Modules extensibles",
        description: "Auth, Stripe, Resend, API keys et docs peuvent etre branches sans repartir de zero.",
        icon: KeyRound,
      },
    ],
    journeyEyebrow: "Parcours produit",
    journeyTitle: "Du visiteur au dashboard, le flux reste lisible.",
    journey: [
      { step: "01", title: "Choisir", text: "Le client compare les services et durees avant de lancer la demande." },
      { step: "02", title: "Reserver", text: "Les creneaux sont generes depuis les regles, exceptions et reservations." },
      { step: "03", title: "Confirmer", text: "Un token public donne une page de suivi claire et partageable." },
      { step: "04", title: "Operer", text: "L'equipe traite les demandes depuis le dashboard et garde l'historique." },
    ],
    proofEyebrow: "Preuve recruteur",
    proofTitle: "Le projet montre la puissance du starter sans masquer le code.",
    proofPoints: [
      "Repo public independant cree depuis KV Web Starter.",
      "Branches separees pour modele de donnees, booking, dashboard, design, deploy et FR/EN.",
      "Tests, typecheck, lint et build valides avant deploiement.",
      "Supabase, Prisma, Vercel et routes Next.js connectes en production.",
    ],
    finalCtaTitle: "Explorer le produit comme un recruteur.",
    finalCtaText:
      "Le site laisse voir le resultat, mais aussi les choix techniques: un starter capable de livrer une application utile, pas seulement une page.",
    finalPrimary: "Tester le booking",
    finalSecondary: "Lire l'etude",
  },
  en: {
    eyebrow: "Project 5 - KV Web Starter portfolio",
    title: "Booking software for service teams that need a calmer calendar.",
    intro:
      "ReserveFlow shows how the shared boilerplate becomes a focused appointment product with public booking, availability rules, dashboard operations, and email-ready confirmations.",
    primaryCta: "Request a booking",
    secondaryCta: "View case study",
    dashboardLabel: "Live operations",
    today: "Today",
    requestCount: "12 booking requests",
    queueTitle: "Booking queue",
    queueMeta: "4 new clients to qualify",
    conversion: "94%",
    conversionLabel: "demo journey completed without support",
    slots: ["09:00 Intake", "10:30 Review", "13:00 Planning", "15:30 Confirmed"],
    pipeline: [
      { label: "Requests", value: "12", tone: "bg-[#fdf1c4]" },
      { label: "Confirmed", value: "8", tone: "bg-[#cbeee9]" },
      { label: "Review", value: "3", tone: "bg-[#ffd8c2]" },
    ],
    liveRows: [
      { client: "Mila Studio", service: "Availability audit", time: "09:00", status: "Confirmed" },
      { client: "North Clinic", service: "Planning sprint", time: "10:30", status: "New" },
      { client: "Atelier Rue", service: "Operations review", time: "13:00", status: "Pending" },
    ],
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
    depthEyebrow: "What the boilerplate proves",
    depthTitle: "One foundation, several visible product layers.",
    depthIntro:
      "ReserveFlow exposes marketing, public booking, business logic, admin operations, email structure, and SaaS/API foundations in one coherent experience.",
    modules: [
      {
        title: "Public experience",
        description: "Marketing pages, SEO, services, contact form, and booking journey.",
        icon: PanelsTopLeft,
      },
      {
        title: "Business logic",
        description: "Services, staff, availability, exceptions, statuses, and public tokens.",
        icon: DatabaseZap,
      },
      {
        title: "Operations",
        description: "Dashboard, lists, detail screens, status actions, and clear pipeline visibility.",
        icon: ShieldCheck,
      },
      {
        title: "Extensible modules",
        description: "Auth, Stripe, Resend, API keys, and docs can be connected without starting over.",
        icon: KeyRound,
      },
    ],
    journeyEyebrow: "Product journey",
    journeyTitle: "From visitor to dashboard, the flow stays readable.",
    journey: [
      { step: "01", title: "Choose", text: "The client compares services and durations before starting a request." },
      { step: "02", title: "Book", text: "Slots are generated from rules, exceptions, and existing bookings." },
      { step: "03", title: "Confirm", text: "A public token creates a clear, shareable status page." },
      { step: "04", title: "Operate", text: "The team handles requests from the dashboard and keeps history visible." },
    ],
    proofEyebrow: "Recruiter proof",
    proofTitle: "The project shows starter power without hiding the code.",
    proofPoints: [
      "Independent public repo created from KV Web Starter.",
      "Separate branches for data model, booking, dashboard, design, deploy, and FR/EN.",
      "Tests, typecheck, lint, and build validated before deployment.",
      "Supabase, Prisma, Vercel, and Next.js routes connected in production.",
    ],
    finalCtaTitle: "Explore the product like a recruiter.",
    finalCtaText:
      "The site shows the result, but also the technical choices: a starter that can deliver a useful app, not just a page.",
    finalPrimary: "Test booking",
    finalSecondary: "Read the study",
  },
};

export default async function Home() {
  const locale = await getCurrentLocale();
  const t = copy[locale];

  return (
    <MarketingPageShell>
      <main className="overflow-hidden">
        <section className="relative border-b">
          <div className="absolute inset-0 -z-10 reserveflow-grid" />
          <div className="mx-auto grid w-full max-w-7xl gap-12 px-6 py-16 sm:py-20 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div className="max-w-3xl">
              <p className="mb-5 inline-flex items-center gap-2 rounded-full border bg-card/80 px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] text-primary shadow-sm">
                <Sparkles className="size-3.5" />
                {t.eyebrow}
              </p>
              <h1 className="text-4xl font-semibold tracking-normal text-balance sm:text-6xl lg:text-7xl">
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
              <div className="mt-10 grid max-w-xl grid-cols-3 gap-3">
                {t.pipeline.map((item) => (
                  <div key={item.label} className="rounded-lg border bg-card/85 p-4 shadow-sm backdrop-blur">
                    <div className={`mb-3 h-1.5 w-12 rounded-full ${item.tone}`} />
                    <p className="text-2xl font-semibold">{item.value}</p>
                    <p className="mt-1 text-xs text-muted-foreground">{item.label}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="absolute -left-4 top-10 hidden h-40 w-10 rounded-full bg-[var(--accent)]/35 blur-2xl lg:block" />
              <div className="reserveflow-panel relative rounded-[1.25rem] border bg-card shadow-2xl shadow-teal-950/10">
                <div className="flex items-center justify-between border-b px-5 py-4">
                  <div>
                    <p className="text-xs font-medium uppercase tracking-[0.16em] text-primary">
                      {t.dashboardLabel}
                    </p>
                    <p className="mt-1 text-lg font-semibold">{t.queueTitle}</p>
                  </div>
                  <div className="flex items-center gap-2 rounded-full border bg-background px-3 py-1 text-xs text-muted-foreground">
                    <span className="size-2 rounded-full bg-[#21b573]" />
                    Online
                  </div>
                </div>

                <div className="grid gap-0 md:grid-cols-[0.72fr_1fr]">
                  <div className="border-b bg-secondary/50 p-5 md:border-b-0 md:border-r">
                    <div className="rounded-lg border bg-background p-4">
                      <div className="flex items-center gap-3">
                        <div className="flex size-12 items-center justify-center rounded-lg bg-[var(--accent-soft)]">
                          <CalendarCheck className="size-6" />
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">{t.today}</p>
                          <p className="text-xl font-semibold">{t.requestCount}</p>
                        </div>
                      </div>
                      <p className="mt-4 text-sm text-muted-foreground">{t.queueMeta}</p>
                    </div>

                    <div className="mt-4 grid gap-3">
                      {t.slots.map((slot, index) => (
                        <div
                          key={slot}
                          className="reserveflow-slot flex items-center justify-between rounded-lg border bg-card px-4 py-3 text-sm"
                          style={{ animationDelay: `${index * 100}ms` }}
                        >
                          <span>{slot}</span>
                          <Clock3 className="size-4 text-primary" />
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="p-5">
                    <div className="grid gap-3 sm:grid-cols-3">
                      {t.pipeline.map((item) => (
                        <div key={item.label} className="rounded-lg border bg-background p-3">
                          <div className={`mb-3 h-1.5 w-10 rounded-full ${item.tone}`} />
                          <p className="text-2xl font-semibold">{item.value}</p>
                          <p className="text-xs text-muted-foreground">{item.label}</p>
                        </div>
                      ))}
                    </div>

                    <div className="mt-5 rounded-lg border">
                      {t.liveRows.map((row) => (
                        <div key={`${row.client}-${row.time}`} className="grid grid-cols-[1fr_auto] gap-3 border-b p-4 last:border-b-0">
                          <div>
                            <p className="font-medium">{row.client}</p>
                            <p className="mt-1 text-sm text-muted-foreground">{row.service}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-mono text-sm">{row.time}</p>
                            <p className="mt-1 rounded-full bg-secondary px-2 py-0.5 text-xs text-secondary-foreground">
                              {row.status}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-5 grid gap-3 sm:grid-cols-[0.65fr_1fr]">
                      <div className="rounded-lg border bg-[#173f46] p-4 text-primary-foreground">
                        <p className="text-3xl font-semibold">{t.conversion}</p>
                        <p className="mt-2 text-xs leading-5 text-primary-foreground/75">{t.conversionLabel}</p>
                      </div>
                      <div className="rounded-lg border bg-background p-4">
                        <div className="flex items-center gap-2 text-sm font-medium">
                          <BellRing className="size-4 text-primary" />
                          Resend-ready
                        </div>
                        <div className="mt-3 h-2 rounded-full bg-muted">
                          <div className="h-2 w-[78%] rounded-full bg-primary" />
                        </div>
                        <p className="mt-2 text-xs text-muted-foreground">Prisma + Supabase + Vercel</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="border-b bg-card">
          <div className="mx-auto grid max-w-7xl gap-6 px-6 py-8 md:grid-cols-3">
            {t.highlights.map((item) => (
              <div key={item.name} className="flex gap-4">
                <div className="flex size-11 shrink-0 items-center justify-center rounded-lg border bg-secondary">
                  <item.icon className="size-5" />
                </div>
                <div>
                  <h2 className="font-medium">{item.name}</h2>
                  <p className="mt-1 text-sm leading-6 text-muted-foreground">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mx-auto grid max-w-7xl gap-10 px-6 py-16 lg:grid-cols-[0.78fr_1.22fr] lg:items-end">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.18em] text-primary">{t.depthEyebrow}</p>
            <h2 className="mt-4 text-3xl font-semibold tracking-normal text-balance sm:text-5xl">
              {t.depthTitle}
            </h2>
            <p className="mt-5 text-lg leading-8 text-muted-foreground">{t.depthIntro}</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {t.modules.map((module) => (
              <div key={module.title} className="group rounded-lg border bg-card p-5 shadow-sm transition-transform hover:-translate-y-1">
                <div className="flex size-11 items-center justify-center rounded-lg bg-[var(--accent-soft)] text-foreground">
                  <module.icon className="size-5" />
                </div>
                <h3 className="mt-5 font-semibold">{module.title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{module.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="border-y bg-[#173f46] text-primary-foreground">
          <div className="mx-auto grid max-w-7xl gap-10 px-6 py-16 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.18em] text-[#f2c464]">{t.journeyEyebrow}</p>
              <h2 className="mt-4 text-3xl font-semibold tracking-normal text-balance sm:text-5xl">
                {t.journeyTitle}
              </h2>
            </div>
            <div className="grid gap-3">
              {t.journey.map((item) => (
                <div key={item.step} className="grid gap-4 rounded-lg border border-white/15 bg-white/[0.06] p-5 sm:grid-cols-[4rem_0.35fr_1fr] sm:items-center">
                  <p className="font-mono text-sm text-[#f2c464]">{item.step}</p>
                  <h3 className="text-lg font-semibold">{item.title}</h3>
                  <p className="text-sm leading-6 text-primary-foreground/72">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto grid max-w-7xl gap-10 px-6 py-16 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-[1.25rem] border bg-card p-6 shadow-sm">
            <div className="grid gap-3 sm:grid-cols-2">
              {[
                { icon: Route, label: "Booking route", value: "/booking" },
                { icon: MailCheck, label: "Email layer", value: "Resend-ready" },
                { icon: CreditCard, label: "Billing module", value: "Stripe-ready" },
                { icon: DatabaseZap, label: "Data layer", value: "Prisma + Supabase" },
              ].map((item) => (
                <div key={item.label} className="rounded-lg border bg-background p-4">
                  <item.icon className="size-5 text-primary" />
                  <p className="mt-4 text-sm text-muted-foreground">{item.label}</p>
                  <p className="mt-1 font-semibold">{item.value}</p>
                </div>
              ))}
            </div>
          </div>
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.18em] text-primary">{t.proofEyebrow}</p>
            <h2 className="mt-4 text-3xl font-semibold tracking-normal text-balance sm:text-5xl">
              {t.proofTitle}
            </h2>
            <ul className="mt-6 grid gap-3">
              {t.proofPoints.map((point) => (
                <li key={point} className="flex gap-3 text-sm leading-6 text-muted-foreground">
                  <CheckCircle2 className="mt-1 size-4 shrink-0 text-primary" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="border-t bg-card">
          <div className="mx-auto flex max-w-7xl flex-col gap-6 px-6 py-14 md:flex-row md:items-center md:justify-between">
            <div className="max-w-2xl">
              <h2 className="text-3xl font-semibold tracking-normal text-balance">{t.finalCtaTitle}</h2>
              <p className="mt-3 text-muted-foreground">{t.finalCtaText}</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button asChild size="lg">
                <Link href="/booking">
                  {t.finalPrimary} <ArrowRight className="size-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="secondary">
                <Link href="/case-study">{t.finalSecondary}</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
    </MarketingPageShell>
  );
}

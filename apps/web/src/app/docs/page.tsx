import Link from "next/link";
import {
  BookOpenCheck,
  CalendarDays,
  CheckCircle2,
  Code2,
  CreditCard,
  FileText,
  KeyRound,
  Rocket,
  Settings,
  ShieldCheck,
} from "lucide-react";

import { MarketingPageShell } from "@/components/marketing/page-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getCurrentLocale } from "@/lib/locale";

const siteTypes = [
  {
    title: "Site vitrine",
    description:
      "Utilise les pages publiques, le formulaire contact, le SEO, les temoignages, les services et la structure CMS.",
    steps: ["Adapter la marque et les textes", "Configurer Resend", "Verifier sitemap et metadata"],
  },
  {
    title: "Site de reservation",
    description:
      "Active les services, le staff, les disponibilites, les exceptions et le formulaire public de reservation.",
    steps: ["Seeder le service initial", "Configurer staff et horaires", "Tester une reservation complete"],
  },
  {
    title: "Portail SaaS ou API",
    description:
      "Utilise Auth.js, les cles API, les scopes, Stripe, le suivi d'usage, OpenAPI et la documentation API.",
    steps: ["Configurer OAuth et Stripe", "Creer les plans", "Verifier les appels API et les quotas"],
  },
  {
    title: "Projet hybride",
    description:
      "Combine marketing, booking et API payante pour un service client plus complet.",
    steps: ["Choisir les modules actifs", "Masquer les pages inutiles", "Tester les parcours critiques"],
  },
];

const setupSteps = [
  {
    title: "1. Creer le projet client",
    body: "Copie le boilerplate avec le script fourni, puis installe les dependances dans le nouveau dossier.",
    command:
      'pnpm create:new -- -Name mon-projet -Destination C:\\code\\mon-projet -AppName "Mon Projet"',
  },
  {
    title: "2. Configurer l'environnement",
    body: "Copie .env.example vers .env et remplis les secrets selon les modules utilises.",
    command: "copy .env.example .env",
  },
  {
    title: "3. Initialiser la base de donnees",
    body: "Lance Postgres local, genere Prisma, applique la migration et ajoute les donnees demo.",
    command: "docker compose up -d\npnpm db:generate\npnpm db:migrate\npnpm db:seed",
  },
  {
    title: "4. Demarrer et verifier",
    body: "Lance le serveur, ouvre le site, teste les pages publiques et connecte-toi au dashboard.",
    command: "pnpm dev",
  },
];

const envGroups = [
  {
    title: "Base",
    items: ["NEXT_PUBLIC_APP_URL", "APP_NAME", "DATABASE_URL"],
  },
  {
    title: "Authentification",
    items: ["AUTH_SECRET", "AUTH_GITHUB_ID", "AUTH_GITHUB_SECRET", "AUTH_ENABLE_DEMO_LOGIN"],
  },
  {
    title: "Billing",
    items: ["STRIPE_SECRET_KEY", "STRIPE_WEBHOOK_SECRET", "STRIPE_PRICE_PRO", "STRIPE_PRICE_BUSINESS"],
  },
  {
    title: "Operations",
    items: ["RESEND_API_KEY", "UPSTASH_REDIS_REST_URL", "SENTRY_DSN", "NEXT_PUBLIC_SANITY_PROJECT_ID"],
  },
];

const adminWorkflows = [
  {
    title: "Dashboard",
    icon: ShieldCheck,
    items: [
      "Se connecter avec GitHub OAuth en production.",
      "Garder le login demo seulement en local.",
      "Donner l'acces admin avec une membership OWNER ou ADMIN.",
    ],
  },
  {
    title: "Reservations",
    icon: CalendarDays,
    items: [
      "Creer les services vendus.",
      "Ajouter le staff disponible.",
      "Configurer les horaires et exceptions.",
      "Tester un creneau public sur /booking.",
    ],
  },
  {
    title: "API payante",
    icon: KeyRound,
    items: [
      "Creer une cle API dans le dashboard.",
      "Verifier les scopes.",
      "Suivre les appels dans API Usage.",
      "Activer Stripe pour limiter les cles aux plans payants.",
    ],
  },
  {
    title: "Billing",
    icon: CreditCard,
    items: [
      "Creer les produits et prix dans Stripe.",
      "Reporter les price IDs dans .env.",
      "Tester le webhook avec Stripe CLI.",
      "Verifier le Customer Portal.",
    ],
  },
];

const launchChecks = [
  "pnpm check",
  "pnpm build",
  "pnpm test:e2e",
  "Tester /contact avec Resend",
  "Tester /booking avec une vraie disponibilite",
  "Tester /api/v1/demo avec une cle DB",
  "Tester Stripe Checkout et webhook",
  "Verifier Sentry apres deploiement",
];

const docsCopy = {
  fr: {
    heroBadge: "Mode d'emploi",
    heroTitle: "Utiliser KV Web Starter selon le type de site a creer.",
    heroIntro:
      "Ce guide explique comment partir du boilerplate, choisir les modules utiles, configurer les services externes et valider un projet client avant livraison.",
    apiReference: "Reference API",
    developerPortal: "Portail developpeur",
    quickStart: "Parcours rapide",
    quickStartBody:
      "Pour un nouveau client, commence par le script de copie, puis active seulement les modules necessaires.",
    chooseBadge: "Choisir le bon depart",
    chooseTitle: "Selon le site a livrer",
    installBadge: "Installation",
    installTitle: "Demarrage complet",
    variablesBadge: "Variables",
    variablesTitle: "Configuration par module",
    usageBadge: "Utilisation",
    usageTitle: "Exploiter les modules",
    launchBadge: "Livraison",
    launchTitle: "Checklist avant mise en ligne",
    launchBody:
      "Le projet est concu pour que la verification reste simple: les commandes de qualite couvrent lint, typecheck, tests unitaires, build et E2E.",
    finalCheck: "Controle final",
    siteTypes,
    setupSteps,
    envGroups,
    adminWorkflows,
    launchChecks,
  },
  en: {
    heroBadge: "How to use",
    heroTitle: "Use KV Web Starter according to the type of site you need to build.",
    heroIntro:
      "This guide explains how to start from the boilerplate, choose useful modules, configure external services, and validate a client project before delivery.",
    apiReference: "API reference",
    developerPortal: "Developer portal",
    quickStart: "Quick path",
    quickStartBody:
      "For a new client, start with the copy script, then activate only the modules the project needs.",
    chooseBadge: "Choose the right start",
    chooseTitle: "By delivery type",
    installBadge: "Installation",
    installTitle: "Full setup",
    variablesBadge: "Variables",
    variablesTitle: "Configuration by module",
    usageBadge: "Usage",
    usageTitle: "Work with the modules",
    launchBadge: "Delivery",
    launchTitle: "Pre-launch checklist",
    launchBody:
      "The project is designed so verification stays simple: quality commands cover lint, typecheck, unit tests, build, and E2E.",
    finalCheck: "Final control",
    siteTypes: [
      {
        title: "Marketing site",
        description:
          "Use the public pages, contact form, SEO, testimonials, services, and CMS structure.",
        steps: ["Adapt the brand and copy", "Configure Resend", "Check sitemap and metadata"],
      },
      {
        title: "Booking site",
        description:
          "Activate services, staff, availability, exceptions, and the public booking form.",
        steps: ["Seed the first service", "Configure staff and hours", "Test a complete booking"],
      },
      {
        title: "SaaS or API portal",
        description:
          "Use Auth.js, API keys, scopes, Stripe, usage tracking, OpenAPI, and API documentation.",
        steps: ["Configure OAuth and Stripe", "Create plans", "Verify API calls and quotas"],
      },
      {
        title: "Hybrid project",
        description:
          "Combine marketing, booking, and paid API modules for a more complete client service.",
        steps: ["Choose active modules", "Hide unused pages", "Test critical journeys"],
      },
    ],
    setupSteps: [
      {
        title: "1. Create the client project",
        body: "Copy the boilerplate with the provided script, then install dependencies in the new folder.",
        command: setupSteps[0].command,
      },
      {
        title: "2. Configure the environment",
        body: "Copy .env.example to .env and fill the secrets for the modules you use.",
        command: setupSteps[1].command,
      },
      {
        title: "3. Initialize the database",
        body: "Start local Postgres, generate Prisma, apply the migration, and add demo data.",
        command: setupSteps[2].command,
      },
      {
        title: "4. Start and verify",
        body: "Start the server, open the site, test public pages, and sign in to the dashboard.",
        command: setupSteps[3].command,
      },
    ],
    envGroups: [
      envGroups[0],
      { title: "Authentication", items: envGroups[1].items },
      envGroups[2],
      envGroups[3],
    ],
    adminWorkflows: [
      {
        title: "Dashboard",
        icon: ShieldCheck,
        items: [
          "Sign in with GitHub OAuth in production.",
          "Keep demo login for local development only.",
          "Grant admin access with an OWNER or ADMIN membership.",
        ],
      },
      {
        title: "Bookings",
        icon: CalendarDays,
        items: [
          "Create the services being sold.",
          "Add available staff.",
          "Configure hours and exceptions.",
          "Test a public slot on /booking.",
        ],
      },
      {
        title: "Paid API",
        icon: KeyRound,
        items: [
          "Create an API key in the dashboard.",
          "Verify scopes.",
          "Track calls in API Usage.",
          "Activate Stripe to limit keys to paid plans.",
        ],
      },
      {
        title: "Billing",
        icon: CreditCard,
        items: [
          "Create products and prices in Stripe.",
          "Copy price IDs into .env.",
          "Test the webhook with Stripe CLI.",
          "Verify the Customer Portal.",
        ],
      },
    ],
    launchChecks: [
      "pnpm check",
      "pnpm build",
      "pnpm test:e2e",
      "Test /contact with Resend",
      "Test /booking with real availability",
      "Test /api/v1/demo with a DB key",
      "Test Stripe Checkout and webhook",
      "Verify Sentry after deployment",
    ],
  },
};

export default async function DocsPage() {
  const locale = await getCurrentLocale();
  const t = docsCopy[locale];

  return (
    <MarketingPageShell>
      <main>
        <section className="border-b bg-secondary/40">
          <div className="mx-auto grid max-w-6xl gap-10 px-6 py-16 lg:grid-cols-[1fr_0.8fr]">
            <div>
              <Badge>{t.heroBadge}</Badge>
              <h1 className="mt-5 text-4xl font-semibold tracking-normal text-balance sm:text-5xl">
                {t.heroTitle}
              </h1>
              <p className="mt-5 max-w-3xl text-lg leading-8 text-muted-foreground">
                {t.heroIntro}
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button asChild>
                  <Link href="/docs/api">
                    <Code2 className="size-4" />
                    {t.apiReference}
                  </Link>
                </Button>
                <Button asChild variant="secondary">
                  <Link href="/developers">
                    <BookOpenCheck className="size-4" />
                    {t.developerPortal}
                  </Link>
                </Button>
              </div>
            </div>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-base">
                  <Rocket className="size-4" />
                  {t.quickStart}
                </CardTitle>
                <CardDescription>
                  {t.quickStartBody}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <pre className="overflow-x-auto border bg-background p-4 text-xs">
                  <code>{t.setupSteps[0].command}</code>
                </pre>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-6 py-14">
          <div className="max-w-3xl">
            <Badge>{t.chooseBadge}</Badge>
            <h2 className="mt-4 text-3xl font-semibold tracking-normal">{t.chooseTitle}</h2>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {t.siteTypes.map((type) => (
              <Card key={type.title}>
                <CardHeader>
                  <CardTitle className="text-lg">{type.title}</CardTitle>
                  <CardDescription>{type.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="grid gap-2 text-sm text-muted-foreground">
                    {type.steps.map((step) => (
                      <li key={step} className="flex gap-2">
                        <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-foreground" />
                        <span>{step}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="border-y bg-muted/50">
          <div className="mx-auto max-w-6xl px-6 py-14">
            <Badge>{t.installBadge}</Badge>
            <h2 className="mt-4 text-3xl font-semibold tracking-normal">{t.installTitle}</h2>
            <div className="mt-8 grid gap-4">
              {t.setupSteps.map((step) => (
                <Card key={step.title}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3 text-base">
                      <Settings className="size-4" />
                      {step.title}
                    </CardTitle>
                    <CardDescription>{step.body}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <pre className="overflow-x-auto border bg-background p-4 text-xs">
                      <code>{step.command}</code>
                    </pre>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-6 py-14">
          <Badge>{t.variablesBadge}</Badge>
          <h2 className="mt-4 text-3xl font-semibold tracking-normal">{t.variablesTitle}</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {t.envGroups.map((group) => (
              <Card key={group.title}>
                <CardHeader>
                  <CardTitle className="text-base">{group.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="grid gap-2 text-sm text-muted-foreground">
                    {group.items.map((item) => (
                      <li key={item}>
                        <code>{item}</code>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="border-y bg-secondary/40">
          <div className="mx-auto max-w-6xl px-6 py-14">
            <Badge>{t.usageBadge}</Badge>
            <h2 className="mt-4 text-3xl font-semibold tracking-normal">{t.usageTitle}</h2>
            <div className="mt-8 grid gap-4 md:grid-cols-2">
              {t.adminWorkflows.map((workflow) => (
                <Card key={workflow.title}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3 text-base">
                      <workflow.icon className="size-4" />
                      {workflow.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="grid gap-2 text-sm text-muted-foreground">
                      {workflow.items.map((item) => (
                        <li key={item} className="flex gap-2">
                          <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-foreground" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto grid max-w-6xl gap-8 px-6 py-14 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <Badge>{t.launchBadge}</Badge>
            <h2 className="mt-4 text-3xl font-semibold tracking-normal">{t.launchTitle}</h2>
            <p className="mt-4 text-muted-foreground">
              {t.launchBody}
            </p>
          </div>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-base">
                <FileText className="size-4" />
                {t.finalCheck}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="grid gap-2 text-sm text-muted-foreground sm:grid-cols-2">
                {t.launchChecks.map((check) => (
                  <li key={check} className="flex gap-2">
                    <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-foreground" />
                    <span>{check}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </section>
      </main>
    </MarketingPageShell>
  );
}

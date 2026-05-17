import { Code2, KeyRound, ShieldCheck } from "lucide-react";

import { MarketingPageShell } from "@/components/marketing/page-shell";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getCurrentLocale } from "@/lib/locale";

const copy = {
  fr: {
    badge: "Portail developpeur",
    title: "Un point de depart pour vendre une API avec cles et scopes.",
    intro:
      "Le portail expose deja un endpoint demo, une convention de credentials locale et la structure pour brancher usage tracking, plans Stripe et docs OpenAPI.",
    requestTitle: "Requete demo",
    requestDescription: "Sans env, l'endpoint reste public pour le scaffold.",
    features: [
      {
        title: "Cles API",
        description: "Extraction Bearer et x-api-key avec scopes par credential.",
        icon: KeyRound,
      },
      {
        title: "Scopes",
        description: "Controle granulaire pret pour plans Stripe et produits API.",
        icon: ShieldCheck,
      },
      {
        title: "Versioning",
        description: "Routes sous /api/v1 pour faire evoluer les contrats proprement.",
        icon: Code2,
      },
    ],
  },
  en: {
    badge: "Developer portal",
    title: "A starting point for selling an API with keys and scopes.",
    intro:
      "The portal already exposes a demo endpoint, a local credential convention, and the structure for usage tracking, Stripe plans, and OpenAPI docs.",
    requestTitle: "Demo request",
    requestDescription: "Without env setup, the endpoint stays public for the scaffold.",
    features: [
      {
        title: "API keys",
        description: "Bearer and x-api-key extraction with scopes per credential.",
        icon: KeyRound,
      },
      {
        title: "Scopes",
        description: "Granular control ready for Stripe plans and API products.",
        icon: ShieldCheck,
      },
      {
        title: "Versioning",
        description: "Routes under /api/v1 keep contracts easy to evolve.",
        icon: Code2,
      },
    ],
  },
};

export default async function DevelopersPage() {
  const locale = await getCurrentLocale();
  const t = copy[locale];

  return (
    <MarketingPageShell>
      <main>
        <section className="mx-auto grid w-full max-w-6xl gap-10 px-6 py-16 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <Badge>{t.badge}</Badge>
            <h1 className="mt-5 text-4xl font-semibold tracking-normal text-balance sm:text-5xl">
              {t.title}
            </h1>
            <p className="mt-5 text-lg leading-8 text-muted-foreground">
              {t.intro}
            </p>
          </div>

          <div className="grid gap-4">
            {t.features.map((feature) => (
              <Card key={feature.title}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-base">
                    <feature.icon className="size-4" />
                    {feature.title}
                  </CardTitle>
                  <CardDescription>{feature.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">{t.requestTitle}</CardTitle>
                <CardDescription>{t.requestDescription}</CardDescription>
              </CardHeader>
              <CardContent>
                <pre className="overflow-x-auto border bg-secondary p-4 text-xs text-secondary-foreground">
                  <code>{`curl http://localhost:3000/api/v1/demo \\
  -H "Authorization: Bearer demo-key"`}</code>
                </pre>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
    </MarketingPageShell>
  );
}

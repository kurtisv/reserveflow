import Link from "next/link";

import { MarketingPageShell } from "@/components/marketing/page-shell";
import { Button } from "@/components/ui/button";
import { getCurrentLocale } from "@/lib/locale";

const copy = {
  fr: {
    eyebrow: "Etude de cas",
    title: "ReserveFlow prouve que le boilerplate peut devenir un produit de reservation.",
    intro:
      "Ce projet utilise la meme base que les autres portfolios, puis la specialise autour des demandes de rendez-vous, des operations de service et du flux admin. Le but est de rendre la progression lisible dans GitHub.",
    cta: "Explorer le flux de reservation",
    points: [
      "Copie depuis KV Web Starter vers un repo public independant.",
      "Construction par branches pour que les recruteurs puissent suivre le chemin d'implementation.",
      "Orientation reservation et disponibilite pour montrer une categorie produit differente.",
      "Identite plus claire et operationnelle au lieu de reprendre les styles plus sombres des portfolios.",
    ],
  },
  en: {
    eyebrow: "Case study",
    title: "ReserveFlow proves the boilerplate can become a booking product.",
    intro:
      "This project uses the same foundation as the other portfolio builds, then specializes it around appointment requests, service operations, and admin workflow. The goal is to make the progression readable in GitHub.",
    cta: "Explore booking flow",
    points: [
      "Copied from KV Web Starter into an independent public repo.",
      "Built with staged branches so recruiters can follow the implementation path.",
      "Focused on booking and availability to show a different product category.",
      "Designed with a lighter scheduling identity instead of reusing the darker portfolio styles.",
    ],
  },
};

export default async function CaseStudyPage() {
  const locale = await getCurrentLocale();
  const t = copy[locale];

  return (
    <MarketingPageShell>
      <main className="mx-auto grid w-full max-w-5xl gap-10 px-6 py-16 sm:py-24">
        <div className="max-w-3xl">
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-primary">
            {t.eyebrow}
          </p>
          <h1 className="mt-4 text-4xl font-semibold tracking-normal text-balance sm:text-5xl">
            {t.title}
          </h1>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            {t.intro}
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {t.points.map((point) => (
            <div key={point} className="rounded-lg border bg-card p-5 text-sm leading-6 text-muted-foreground">
              {point}
            </div>
          ))}
        </div>
        <div>
          <Button asChild>
            <Link href="/booking">{t.cta}</Link>
          </Button>
        </div>
      </main>
    </MarketingPageShell>
  );
}

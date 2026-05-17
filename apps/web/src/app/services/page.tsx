import Link from "next/link";
import { ArrowRight, Clock3 } from "lucide-react";

import { MarketingPageShell } from "@/components/marketing/page-shell";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { prisma } from "@/lib/db";
import { getCurrentLocale } from "@/lib/locale";

const fallbackServices = [
  {
    id: "discovery",
    name: "Discovery Consultation",
    slug: "discovery-consultation",
    category: "Consulting",
    description: "A focused intake session to clarify goals, constraints, and next steps.",
    durationMin: 45,
    priceCents: 9000,
  },
  {
    id: "planning",
    name: "Studio Planning Block",
    slug: "studio-planning-block",
    category: "Planning",
    description: "A longer working session for service teams that need scheduling decisions made.",
    durationMin: 90,
    priceCents: 18500,
  },
  {
    id: "review",
    name: "Implementation Review",
    slug: "implementation-review",
    category: "Review",
    description: "A checkpoint appointment to review progress and unblock execution.",
    durationMin: 60,
    priceCents: 14000,
  },
];

const copy = {
  fr: {
    eyebrow: "Services",
    title: "Choisissez le type de rendez-vous avant que ReserveFlow verifie le calendrier.",
    intro:
      "Les services portent les donnees pratiques d'un produit de reservation: categorie, duree, prix, statut actif et description visible par les clients.",
    free: "Gratuit",
    cta: "Reserver ce service",
  },
  en: {
    eyebrow: "Services",
    title: "Choose the appointment type before ReserveFlow checks the calendar.",
    intro:
      "Services carry the practical data a booking product needs: category, duration, pricing, active state, and a description that can be shown to clients.",
    free: "Free",
    cta: "Book this service",
  },
};

async function getServices() {
  try {
    const services = await prisma.service.findMany({
      where: { isActive: true },
      orderBy: [{ category: "asc" }, { name: "asc" }],
    });

    return services.length > 0 ? services : fallbackServices;
  } catch {
    return fallbackServices;
  }
}

function formatPrice(priceCents: number | null, freeLabel: string) {
  return priceCents ? `$${(priceCents / 100).toFixed(0)}` : freeLabel;
}

export default async function ServicesPage() {
  const locale = await getCurrentLocale();
  const t = copy[locale];
  const services = await getServices();

  return (
    <MarketingPageShell>
      <main className="mx-auto w-full max-w-6xl px-6 py-16 sm:py-24">
        <div className="max-w-3xl">
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-primary">
            {t.eyebrow}
          </p>
          <h1 className="mt-4 text-4xl font-semibold tracking-normal text-balance sm:text-5xl">
            {t.title}
          </h1>
          <p className="mt-5 text-lg leading-8 text-muted-foreground">
            {t.intro}
          </p>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {services.map((service) => (
            <Card key={service.id} className="flex h-full flex-col">
              <CardHeader>
                <p className="text-xs font-medium uppercase tracking-[0.16em] text-primary">
                  {service.category}
                </p>
                <CardTitle>{service.name}</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-1 flex-col gap-5">
                <p className="text-sm leading-6 text-muted-foreground">{service.description}</p>
                <div className="mt-auto flex items-center justify-between border-t pt-4 text-sm">
                  <span className="flex items-center gap-2 text-muted-foreground">
                    <Clock3 className="size-4" />
                    {service.durationMin} min
                  </span>
                  <span className="font-semibold">{formatPrice(service.priceCents, t.free)}</span>
                </div>
                <Button asChild variant="secondary">
                  <Link href={`/booking?serviceId=${service.id}`}>
                    {t.cta} <ArrowRight className="size-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </MarketingPageShell>
  );
}

import { MarketingPageShell } from "@/components/marketing/page-shell";
import { Section } from "@/components/marketing/section";
import { createCheckoutSession } from "@/app/actions/billing";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getCurrentLocale } from "@/lib/locale";

const copy = {
  fr: {
    title: "Tarifs",
    intro: "Plans exemples pour les futurs projets SaaS/API.",
    popular: "Populaire",
    choose: "Choisir",
    included: "Inclus",
    plans: [
      { name: "Starter", price: "$0", description: "Base vitrine et experimentation.", plan: null },
      { name: "Pro", price: "$49", description: "Booking, dashboard et emails.", plan: "PRO" },
      { name: "Business", price: "$149", description: "API portal, billing et usage.", plan: "BUSINESS" },
    ],
  },
  en: {
    title: "Pricing",
    intro: "Example plans for future SaaS/API projects.",
    popular: "Popular",
    choose: "Choose",
    included: "Included",
    plans: [
      { name: "Starter", price: "$0", description: "Marketing site base and experimentation.", plan: null },
      { name: "Pro", price: "$49", description: "Booking, dashboard, and emails.", plan: "PRO" },
      { name: "Business", price: "$149", description: "API portal, billing, and usage.", plan: "BUSINESS" },
    ],
  },
};

export default async function PricingPage() {
  const locale = await getCurrentLocale();
  const t = copy[locale];

  return (
    <MarketingPageShell>
      <Section>
        <h1 className="text-4xl font-semibold">{t.title}</h1>
        <p className="mt-4 max-w-2xl text-muted-foreground">{t.intro}</p>
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {t.plans.map((plan) => (
            <Card key={plan.name}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>{plan.name}</CardTitle>
                  {plan.name === "Pro" ? <Badge>{t.popular}</Badge> : null}
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-semibold">{plan.price}</p>
                <p className="mt-3 min-h-12 text-sm text-muted-foreground">{plan.description}</p>
                {plan.plan ? (
                  <form action={createCheckoutSession} className="mt-6">
                    <input type="hidden" name="plan" value={plan.plan} />
                    <Button className="w-full" type="submit">
                      {t.choose}
                    </Button>
                  </form>
                ) : (
                  <Button className="mt-6 w-full" variant="secondary">
                    {t.included}
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>
    </MarketingPageShell>
  );
}

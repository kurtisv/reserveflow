import { MarketingPageShell } from "@/components/marketing/page-shell";
import { Section } from "@/components/marketing/section";
import { Card, CardContent } from "@/components/ui/card";
import { getCurrentLocale } from "@/lib/locale";

const copy = {
  fr: {
    title: "Temoignages",
    testimonials: [
      "Un starter concu pour livrer vite des projets client.",
      "La separation contenu, logique business et dashboard rend la base claire.",
      "Le module API portal donne une vraie option SaaS des le depart.",
    ],
  },
  en: {
    title: "Testimonials",
    testimonials: [
      "A starter built to deliver client projects quickly.",
      "The separation between content, business logic, and dashboard keeps the base clear.",
      "The API portal module creates a real SaaS option from the start.",
    ],
  },
};

export default async function TestimonialsPage() {
  const locale = await getCurrentLocale();
  const t = copy[locale];

  return (
    <MarketingPageShell>
      <Section>
        <h1 className="text-4xl font-semibold">{t.title}</h1>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {t.testimonials.map((testimonial) => (
            <Card key={testimonial}>
              <CardContent className="pt-6 text-sm text-muted-foreground">{testimonial}</CardContent>
            </Card>
          ))}
        </div>
      </Section>
    </MarketingPageShell>
  );
}

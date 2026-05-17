import { MarketingPageShell } from "@/components/marketing/page-shell";
import { Section } from "@/components/marketing/section";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { getCurrentLocale } from "@/lib/locale";

const copy = {
  fr: {
    title: "FAQ",
    faqs: [
      ["Est-ce un template SaaS complet?", "Non. C'est une base modulaire pour construire vite sans trainer du code inutile."],
      ["Peut-on cacher les modules?", "Oui. Les feature flags servent a masquer booking, billing, CMS ou API portal selon le projet."],
      ["Sanity remplace-t-il Postgres?", "Non. Sanity gere le contenu marketing; Postgres garde la logique business."],
    ],
  },
  en: {
    title: "FAQ",
    faqs: [
      ["Is this a full SaaS template?", "No. It is a modular base for building quickly without carrying unnecessary code."],
      ["Can modules be hidden?", "Yes. Feature flags can hide booking, billing, CMS, or API portal features per project."],
      ["Does Sanity replace Postgres?", "No. Sanity manages marketing content; Postgres keeps the business logic."],
    ],
  },
};

export default async function FaqPage() {
  const locale = await getCurrentLocale();
  const t = copy[locale];

  return (
    <MarketingPageShell>
      <Section>
        <h1 className="text-4xl font-semibold">{t.title}</h1>
        <Accordion className="mt-8">
          {t.faqs.map(([question, answer]) => (
            <AccordionItem key={question}>
              <AccordionTrigger>{question}</AccordionTrigger>
              <AccordionContent>{answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Section>
    </MarketingPageShell>
  );
}

import { MarketingPageShell } from "@/components/marketing/page-shell";
import { Section } from "@/components/marketing/section";
import { getCurrentLocale } from "@/lib/locale";

const copy = {
  fr: {
    title: "Conditions d'utilisation",
    body: "Page legale placeholder a reviser selon le projet, le pays et le modele commercial.",
  },
  en: {
    title: "Terms of use",
    body: "Legal placeholder page to review according to the project, country, and business model.",
  },
};

export default async function TermsPage() {
  const locale = await getCurrentLocale();
  const t = copy[locale];

  return (
    <MarketingPageShell>
      <Section>
        <h1 className="text-4xl font-semibold">{t.title}</h1>
        <p className="mt-4 max-w-3xl text-muted-foreground">
          {t.body}
        </p>
      </Section>
    </MarketingPageShell>
  );
}

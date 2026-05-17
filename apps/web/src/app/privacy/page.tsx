import { MarketingPageShell } from "@/components/marketing/page-shell";
import { Section } from "@/components/marketing/section";
import { getCurrentLocale } from "@/lib/locale";

const copy = {
  fr: {
    title: "Politique de confidentialite",
    body: "Page legale placeholder a personnaliser pour chaque client avant publication.",
  },
  en: {
    title: "Privacy policy",
    body: "Legal placeholder page to customize for each client before publication.",
  },
};

export default async function PrivacyPage() {
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

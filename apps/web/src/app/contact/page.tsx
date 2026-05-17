import { sendContactMessage } from "@/app/actions/contact";
import { MarketingPageShell } from "@/components/marketing/page-shell";
import { Section } from "@/components/marketing/section";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormField } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { getCurrentLocale } from "@/lib/locale";

const copy = {
  fr: {
    title: "Contact",
    intro: "Formulaire pret a brancher a Resend. Sans cle API, le message est ignore proprement en dev.",
    cardTitle: "Nouvelle demande",
    cardDescription: "Capture les leads pour les sites vitrines.",
    name: "Nom",
    email: "Email",
    message: "Message",
    submit: "Envoyer",
  },
  en: {
    title: "Contact",
    intro: "A contact form ready to connect to Resend. Without an API key, messages are safely skipped in dev.",
    cardTitle: "New request",
    cardDescription: "Capture leads for marketing sites.",
    name: "Name",
    email: "Email",
    message: "Message",
    submit: "Send",
  },
};

export default async function ContactPage() {
  const locale = await getCurrentLocale();
  const t = copy[locale];

  return (
    <MarketingPageShell>
      <Section className="grid gap-8 lg:grid-cols-[0.8fr_1fr]">
        <div>
          <h1 className="text-4xl font-semibold">{t.title}</h1>
          <p className="mt-4 text-muted-foreground">
            {t.intro}
          </p>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>{t.cardTitle}</CardTitle>
            <CardDescription>{t.cardDescription}</CardDescription>
          </CardHeader>
          <CardContent>
            <Form action={sendContactMessage}>
              <FormField>
                <Label htmlFor="name">{t.name}</Label>
                <Input id="name" name="name" required />
              </FormField>
              <FormField>
                <Label htmlFor="email">{t.email}</Label>
                <Input id="email" name="email" required type="email" />
              </FormField>
              <FormField>
                <Label htmlFor="message">{t.message}</Label>
                <Textarea id="message" name="message" required />
              </FormField>
              <Button type="submit">{t.submit}</Button>
            </Form>
          </CardContent>
        </Card>
      </Section>
    </MarketingPageShell>
  );
}

import Link from "next/link";
import { notFound } from "next/navigation";
import { CalendarCheck2, Clock3, Mail, UserRound } from "lucide-react";

import { MarketingPageShell } from "@/components/marketing/page-shell";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { prisma } from "@/lib/db";
import { getCurrentLocale } from "@/lib/locale";

const copy = {
  fr: {
    received: "Reservation recue",
    title: "Votre demande est dans la file ReserveFlow.",
    intro: (status: string) =>
      `Le rendez-vous est sauvegarde comme ${status.toLowerCase()}. L'equipe operations peut le confirmer, le terminer ou l'annuler depuis le tableau de bord.`,
    appointment: "Rendez-vous",
    duration: "Duree",
    client: "Client",
    email: "Email",
    requestAnother: "Faire une autre demande",
    caseStudy: "Voir l'etude de cas",
    sent: "Rendez-vous confirme. Le projet a ete envoye vers ClientHub.",
    openClientHub: "Ouvrir ClientHub",
  },
  en: {
    received: "Booking received",
    title: "Your request is in the ReserveFlow queue.",
    intro: (status: string) =>
      `The appointment is saved as ${status.toLowerCase()}. The operations team can confirm, complete, or cancel it from the dashboard.`,
    appointment: "Appointment",
    duration: "Duration",
    client: "Client",
    email: "Email",
    requestAnother: "Request another booking",
    caseStudy: "View project case study",
    sent: "Booking confirmed. The project was sent to ClientHub.",
    openClientHub: "Open ClientHub",
  },
};

async function getBooking(publicToken: string) {
  try {
    return await prisma.booking.findUnique({
      where: { publicToken },
      include: {
        service: true,
        staff: true,
      },
    });
  } catch {
    return null;
  }
}

function formatDate(date: Date, locale: "fr" | "en") {
  return new Intl.DateTimeFormat(locale === "fr" ? "fr-CA" : "en-CA", {
    dateStyle: "full",
    timeStyle: "short",
    timeZone: "UTC",
  }).format(date);
}

export default async function BookingConfirmationPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const locale = await getCurrentLocale();
  const t = copy[locale];
  const { id } = await params;
  const booking = await getBooking(id);

  if (!booking) {
    notFound();
  }

  return (
    <MarketingPageShell>
      <main className="mx-auto grid w-full max-w-5xl gap-8 px-6 py-16 sm:py-24">
        <div className="max-w-3xl">
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-muted-foreground">
            {t.received}
          </p>
          <h1 className="mt-4 text-4xl font-semibold tracking-normal text-balance sm:text-5xl">
            {t.title}
          </h1>
          <p className="mt-5 text-lg leading-8 text-muted-foreground">
            {t.intro(booking.status)}
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>{booking.service.name}</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-5 text-sm sm:grid-cols-2">
            <div className="flex gap-3">
              <CalendarCheck2 className="mt-1 size-4" />
              <div>
                <p className="font-medium">{t.appointment}</p>
                <p className="mt-1 text-muted-foreground">{formatDate(booking.startAt, locale)}</p>
              </div>
            </div>
            <div className="flex gap-3">
              <Clock3 className="mt-1 size-4" />
              <div>
                <p className="font-medium">{t.duration}</p>
                <p className="mt-1 text-muted-foreground">{booking.service.durationMin} minutes</p>
              </div>
            </div>
            <div className="flex gap-3">
              <UserRound className="mt-1 size-4" />
              <div>
                <p className="font-medium">{t.client}</p>
                <p className="mt-1 text-muted-foreground">{booking.customerName}</p>
              </div>
            </div>
            <div className="flex gap-3">
              <Mail className="mt-1 size-4" />
              <div>
                <p className="font-medium">{t.email}</p>
                <p className="mt-1 text-muted-foreground">{booking.customerEmail}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {booking.flowId ? (
          <section className="rounded-lg border border-primary/30 bg-primary-soft p-5">
            <p className="font-semibold">{t.sent}</p>
            <p className="mt-2 font-mono text-xs text-muted-foreground">flowId: {booking.flowId}</p>
          </section>
        ) : null}

        <div className="flex flex-wrap gap-3">
          {booking.flowId ? (
            <Button asChild>
              <Link href="https://clienthub-five.vercel.app/dashboard">{t.openClientHub}</Link>
            </Button>
          ) : null}
          <Button asChild>
            <Link href="/booking">{t.requestAnother}</Link>
          </Button>
          <Button asChild variant="secondary">
            <Link href="/case-study">{t.caseStudy}</Link>
          </Button>
        </div>
      </main>
    </MarketingPageShell>
  );
}

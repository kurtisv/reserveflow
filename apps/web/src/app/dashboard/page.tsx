import Link from "next/link";
import { ArrowRight, CalendarDays, CheckCircle2, Clock3, XCircle } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { EcosystemNotificationPanel } from "@/components/ecosystem/notification-panel";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { prisma } from "@/lib/db";
import { getIncomingEcosystemEvents } from "@/lib/ecosystem";
import { getCurrentLocale } from "@/lib/locale";

async function getDashboardStats() {
  try {
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);
    const todayEnd = new Date(todayStart);
    todayEnd.setDate(todayEnd.getDate() + 1);

    const [total, requested, confirmed, completed, cancelled, today] = await Promise.all([
      prisma.booking.count(),
      prisma.booking.count({ where: { status: "REQUESTED" } }),
      prisma.booking.count({ where: { status: "CONFIRMED" } }),
      prisma.booking.count({ where: { status: "COMPLETED" } }),
      prisma.booking.count({ where: { status: "CANCELLED" } }),
      prisma.booking.count({
        where: {
          startAt: {
            gte: todayStart,
            lt: todayEnd,
          },
        },
      }),
    ]);

    return { total, requested, confirmed, completed, cancelled, today };
  } catch {
    return { total: 0, requested: 0, confirmed: 0, completed: 0, cancelled: 0, today: 0 };
  }
}

const timeline = ["Luma Studio", "QuotePilot", "ReserveFlow", "ClientHub", "CommerceKit", "EventPass", "SupportDesk Lite", "API Meter"];

const availabilityPreview = [
  ["09:00", "Open"],
  ["10:30", "Booked"],
  ["13:00", "Open"],
  ["15:30", "Open"],
];

const copy = {
  fr: {
    productLabel: "Operations ReserveFlow",
    title: "Salle de controle des rendez-vous",
    intro:
      "ReserveFlow reprend une soumission acceptee, garde le consultant choisi, montre les disponibilites et cree le rendez-vous qui alimentera ClientHub.",
    testTitle: "Ce que tu peux tester ici",
    receives: "Recoit",
    receivesText: "client, email, budget, besoin et consultant depuis QuotePilot.",
    sends: "Transmet",
    sendsText: "booking.created vers ClientHub.",
    boilerplate: "Boilerplate",
    boilerplateText: "calendrier, disponibilites et formulaire pre-rempli.",
    cards: [
      { key: "today", label: "Aujourd'hui", icon: CalendarDays },
      { key: "requested", label: "Demandes", icon: Clock3 },
      { key: "confirmed", label: "Confirmes", icon: CheckCircle2 },
      { key: "cancelled", label: "Annules", icon: XCircle },
    ],
    liveCount: "Compteur rendez-vous live.",
    pipelineTitle: "Pipeline total des rendez-vous",
    pipelineDescription: "Distribution rapide des statuts pour le jeu de donnees demo.",
    total: "Total",
    requested: "Demandes",
    confirmed: "Confirmes",
    completed: "Completes",
    cancelled: "Annules",
    availability: "Apercu des disponibilites",
    availabilityDescription: "Vue inspiree calendrier: la disponibilite est lisible avant confirmation.",
    open: "Libre",
    booked: "Reserve",
    summaryTitle: "Resume avant confirmation",
    summaryDescription: "Le recruteur sait quelles donnees seront envoyees au prochain module.",
    client: "Client",
    consultant: "Consultant",
    nextModule: "Prochain module",
    manage: "Gerer les rendez-vous",
    timeline: "Timeline du parcours",
    timelineDescription: "ReserveFlow est l'etape 03 du scenario demo.",
    readyTitle: "Demandes pretes a planifier",
    readyDescription: "Soumissions acceptees dans QuotePilot avec le contexte client et le meme flowId.",
    quote: "Soumission",
    amount: "Montant",
    toChoose: "A choisir",
    schedule: "Planifier le rendez-vous",
    empty:
      "Aucune soumission acceptee pour l'instant. Accepte une soumission dans QuotePilot; le client, le budget, le consultant et le flowId apparaitront dans cette file.",
  },
  en: {
    productLabel: "ReserveFlow operations",
    title: "Booking control room",
    intro:
      "ReserveFlow receives an accepted proposal, keeps the selected consultant, shows availability, and creates the booking that feeds ClientHub.",
    testTitle: "What you can test here",
    receives: "Receives",
    receivesText: "client, email, budget, need, and consultant from QuotePilot.",
    sends: "Sends",
    sendsText: "booking.created to ClientHub.",
    boilerplate: "Boilerplate",
    boilerplateText: "calendar, availability, and prefilled form.",
    cards: [
      { key: "today", label: "Today", icon: CalendarDays },
      { key: "requested", label: "Requested", icon: Clock3 },
      { key: "confirmed", label: "Confirmed", icon: CheckCircle2 },
      { key: "cancelled", label: "Cancelled", icon: XCircle },
    ],
    liveCount: "Live booking count.",
    pipelineTitle: "Total booking pipeline",
    pipelineDescription: "Quick status distribution for the demo dataset.",
    total: "Total",
    requested: "Requested",
    confirmed: "Confirmed",
    completed: "Completed",
    cancelled: "Cancelled",
    availability: "Availability preview",
    availabilityDescription: "Calendar-inspired view: availability is readable before confirmation.",
    open: "Open",
    booked: "Booked",
    summaryTitle: "Summary before confirmation",
    summaryDescription: "The recruiter knows which data will be sent to the next module.",
    client: "Client",
    consultant: "Consultant",
    nextModule: "Next module",
    manage: "Manage bookings",
    timeline: "Journey timeline",
    timelineDescription: "ReserveFlow is step 03 of the demo scenario.",
    readyTitle: "Requests ready to schedule",
    readyDescription: "Accepted QuotePilot proposals with client context and the same flowId.",
    quote: "Quote",
    amount: "Amount",
    toChoose: "To choose",
    schedule: "Schedule booking",
    empty:
      "No accepted quote yet. Accept a quote in QuotePilot; the client, budget, consultant, and flowId will appear in this queue.",
  },
} as const;

export default async function DashboardPage() {
  const locale = await getCurrentLocale();
  const t = copy[locale];
  const [stats, acceptedQuotes] = await Promise.all([
    getDashboardStats(),
    getIncomingEcosystemEvents("reserveflow", "quote.accepted", 8),
  ]);

  return (
    <main className="bg-[linear-gradient(180deg,#f5fbff_0%,#eef7fb_100%)] px-6 py-10 text-foreground">
      <div className="mx-auto grid max-w-6xl gap-8">
        <div className="grid gap-6 lg:grid-cols-[1fr_0.85fr] lg:items-end">
          <div>
            <p className="inline-flex rounded-full border bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-primary">
              KV Portfolio Ecosystem - Demo Mode
            </p>
            <p className="text-sm font-medium uppercase tracking-[0.18em] text-muted-foreground">
              {t.productLabel}
            </p>
            <h1 className="mt-3 text-3xl font-semibold">{t.title}</h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground">
              {t.intro}
            </p>
          </div>
          <section className="rounded-lg border bg-card p-5 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
              {t.testTitle}
            </p>
            <div className="mt-3 grid gap-2 text-sm">
              <p><span className="font-semibold">{t.receives}:</span> {t.receivesText}</p>
              <p><span className="font-semibold">{t.sends}:</span> {t.sendsText}</p>
              <p><span className="font-semibold">{t.boilerplate}:</span> {t.boilerplateText}</p>
            </div>
          </section>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {t.cards.map((card) => (
            <Card key={card.key}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <card.icon className="size-4" />
                  {card.label}
                </CardTitle>
                <CardDescription>{t.liveCount}</CardDescription>
              </CardHeader>
              <CardContent className="text-3xl font-semibold">{stats[card.key]}</CardContent>
            </Card>
          ))}
        </div>

        <Card>
          <CardHeader>
            <CardTitle>{t.pipelineTitle}</CardTitle>
            <CardDescription>{t.pipelineDescription}</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-2">
            <Badge>{t.total} {stats.total}</Badge>
            <Badge>{t.requested} {stats.requested}</Badge>
            <Badge>{t.confirmed} {stats.confirmed}</Badge>
            <Badge>{t.completed} {stats.completed}</Badge>
            <Badge>{t.cancelled} {stats.cancelled}</Badge>
          </CardContent>
        </Card>

        <div className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
          <Card>
            <CardHeader>
              <CardTitle>{t.availability}</CardTitle>
              <CardDescription>{t.availabilityDescription}</CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-3">
              {availabilityPreview.map(([time, state]) => (
                <div key={time} className={state === "Open" ? "rounded-md border bg-background p-3" : "rounded-md border bg-secondary p-3 opacity-65"}>
                  <p className="font-mono text-sm font-semibold">{time}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{state === "Open" ? t.open : t.booked}</p>
                </div>
              ))}
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>{t.summaryTitle}</CardTitle>
              <CardDescription>{t.summaryDescription}</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-3 text-sm">
              <p><span className="font-semibold">{t.client}:</span> {locale === "fr" ? "depuis le formulaire Luma et la soumission QuotePilot." : "from the Luma form and QuotePilot proposal."}</p>
              <p><span className="font-semibold">{t.consultant}:</span> {locale === "fr" ? "Maya Laurent ou Noah Bennett selon le choix reel." : "Maya Laurent or Noah Bennett based on the real choice."}</p>
              <p><span className="font-semibold">{t.nextModule}:</span> {locale === "fr" ? "ClientHub recoit notes, date, consultant et flowId." : "ClientHub receives notes, date, consultant, and flowId."}</p>
              <Link href="/dashboard/bookings" className="inline-flex items-center gap-2 font-medium text-primary">
                {t.manage} <ArrowRight className="size-4" />
              </Link>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>{t.timeline}</CardTitle>
            <CardDescription>{t.timelineDescription}</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-2 text-xs font-semibold">
            {timeline.map((item, index) => (
              <span key={item} className={index === 2 ? "rounded-md bg-primary px-3 py-2 text-primary-foreground" : "rounded-md border bg-background px-3 py-2"}>
                {String(index + 1).padStart(2, "0")} {item}
              </span>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{t.readyTitle}</CardTitle>
            <CardDescription>
              {t.readyDescription}
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-3">
            {acceptedQuotes.map((event) => {
              const payload = typeof event.payload === "object" && event.payload !== null
                ? event.payload as Record<string, unknown>
                : {};
              const href = `/booking?flowId=${encodeURIComponent(event.flowId)}&quoteId=${encodeURIComponent(String(event.entityId ?? ""))}&customerName=${encodeURIComponent(event.customerName ?? "")}&customerEmail=${encodeURIComponent(event.customerEmail ?? "")}&amount=${encodeURIComponent(String(payload.totalCents ?? ""))}&consultant=${encodeURIComponent(String(payload.consultantName ?? ""))}&need=${encodeURIComponent(event.description ?? "")}&quoteNumber=${encodeURIComponent(String(payload.quoteNumber ?? ""))}&sourceEventId=${encodeURIComponent(event.id)}`;

              return (
                <article key={event.id} className="grid gap-4 rounded-md border bg-background p-4 md:grid-cols-[1fr_auto]">
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <Badge>QuotePilot</Badge>
                      <span className="font-mono text-xs text-muted-foreground">{event.flowId}</span>
                    </div>
                    <h3 className="mt-3 font-semibold">{event.customerName ?? "Client QuotePilot"}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {t.quote} {String(payload.quoteNumber ?? event.entityId ?? "-")} · {t.amount} {String(payload.totalCents ?? "-")}
                    </p>
                    <dl className="mt-4 grid gap-3 text-sm sm:grid-cols-3">
                      <div>
                        <dt className="text-xs uppercase tracking-[0.14em] text-muted-foreground">{t.consultant}</dt>
                        <dd className="mt-1">{String(payload.consultantName ?? t.toChoose)}</dd>
                      </div>
                      <div>
                        <dt className="text-xs uppercase tracking-[0.14em] text-muted-foreground">{t.client}</dt>
                        <dd className="mt-1">{event.customerEmail ?? "-"}</dd>
                      </div>
                      <div>
                        <dt className="text-xs uppercase tracking-[0.14em] text-muted-foreground">{t.nextModule}</dt>
                        <dd className="mt-1">ClientHub</dd>
                      </div>
                    </dl>
                    <p className="mt-2 text-sm text-muted-foreground">{event.description}</p>
                  </div>
                  <Link href={href} className="inline-flex items-center gap-2 self-center text-sm font-medium">
                    {t.schedule} <ArrowRight className="size-4" />
                  </Link>
                </article>
              );
            })}
            {acceptedQuotes.length === 0 ? (
              <p className="rounded-md border bg-background p-4 text-sm text-muted-foreground">
                {t.empty}
              </p>
            ) : null}
          </CardContent>
        </Card>

        <EcosystemNotificationPanel appKey="reserveflow" />
      </div>
    </main>
  );
}

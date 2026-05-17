import Link from "next/link";
import { ArrowRight, CalendarDays, CheckCircle2, Clock3, XCircle } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { EcosystemNotificationPanel } from "@/components/ecosystem/notification-panel";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { prisma } from "@/lib/db";
import { getIncomingEcosystemEvents } from "@/lib/ecosystem";

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

const cards = [
  { key: "today", label: "Today", icon: CalendarDays },
  { key: "requested", label: "Requested", icon: Clock3 },
  { key: "confirmed", label: "Confirmed", icon: CheckCircle2 },
  { key: "cancelled", label: "Cancelled", icon: XCircle },
] as const;

const timeline = ["Luma Studio", "QuotePilot", "ReserveFlow", "ClientHub", "CommerceKit", "EventPass", "SupportDesk Lite", "API Meter"];

const availabilityPreview = [
  ["09:00", "Open"],
  ["10:30", "Booked"],
  ["13:00", "Open"],
  ["15:30", "Open"],
];

export default async function DashboardPage() {
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
              ReserveFlow operations
            </p>
            <h1 className="mt-3 text-3xl font-semibold">Booking control room</h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground">
              ReserveFlow reprend une soumission acceptee, garde le consultant choisi,
              montre les disponibilites et cree le rendez-vous qui alimentera ClientHub.
            </p>
          </div>
          <section className="rounded-lg border bg-card p-5 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
              Ce que tu peux tester ici
            </p>
            <div className="mt-3 grid gap-2 text-sm">
              <p><span className="font-semibold">Recoit:</span> client, email, budget, besoin et consultant depuis QuotePilot.</p>
              <p><span className="font-semibold">Transmet:</span> booking.created vers ClientHub.</p>
              <p><span className="font-semibold">Boilerplate:</span> calendrier, disponibilites et formulaire pre-rempli.</p>
            </div>
          </section>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map((card) => (
            <Card key={card.key}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <card.icon className="size-4" />
                  {card.label}
                </CardTitle>
                <CardDescription>Live booking count.</CardDescription>
              </CardHeader>
              <CardContent className="text-3xl font-semibold">{stats[card.key]}</CardContent>
            </Card>
          ))}
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Total booking pipeline</CardTitle>
            <CardDescription>Quick status distribution for the demo dataset.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-2">
            <Badge>Total {stats.total}</Badge>
            <Badge>Requested {stats.requested}</Badge>
            <Badge>Confirmed {stats.confirmed}</Badge>
            <Badge>Completed {stats.completed}</Badge>
            <Badge>Cancelled {stats.cancelled}</Badge>
          </CardContent>
        </Card>

        <div className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
          <Card>
            <CardHeader>
              <CardTitle>Availability preview</CardTitle>
              <CardDescription>Vue inspiree calendrier: la disponibilite est lisible avant confirmation.</CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-3">
              {availabilityPreview.map(([time, state]) => (
                <div key={time} className={state === "Open" ? "rounded-md border bg-background p-3" : "rounded-md border bg-secondary p-3 opacity-65"}>
                  <p className="font-mono text-sm font-semibold">{time}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{state}</p>
                </div>
              ))}
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Resume avant confirmation</CardTitle>
              <CardDescription>Le recruteur sait quelles donnees seront envoyees au prochain module.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-3 text-sm">
              <p><span className="font-semibold">Client:</span> depuis le formulaire Luma et la soumission QuotePilot.</p>
              <p><span className="font-semibold">Consultant:</span> Maya Laurent ou Noah Bennett selon le choix reel.</p>
              <p><span className="font-semibold">Prochain module:</span> ClientHub recoit notes, date, consultant et flowId.</p>
              <Link href="/dashboard/bookings" className="inline-flex items-center gap-2 font-medium text-primary">
                Manage bookings <ArrowRight className="size-4" />
              </Link>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Timeline du parcours</CardTitle>
            <CardDescription>ReserveFlow est l&apos;etape 03 du scenario demo.</CardDescription>
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
            <CardTitle>Demandes pretes a planifier</CardTitle>
            <CardDescription>
              Soumissions acceptees dans QuotePilot avec le contexte client et le meme flowId.
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
                      Soumission {String(payload.quoteNumber ?? event.entityId ?? "-")} · Montant {String(payload.totalCents ?? "-")}
                    </p>
                    <dl className="mt-4 grid gap-3 text-sm sm:grid-cols-3">
                      <div>
                        <dt className="text-xs uppercase tracking-[0.14em] text-muted-foreground">Consultant</dt>
                        <dd className="mt-1">{String(payload.consultantName ?? "A choisir")}</dd>
                      </div>
                      <div>
                        <dt className="text-xs uppercase tracking-[0.14em] text-muted-foreground">Client</dt>
                        <dd className="mt-1">{event.customerEmail ?? "-"}</dd>
                      </div>
                      <div>
                        <dt className="text-xs uppercase tracking-[0.14em] text-muted-foreground">Prochaine etape</dt>
                        <dd className="mt-1">ClientHub</dd>
                      </div>
                    </dl>
                    <p className="mt-2 text-sm text-muted-foreground">{event.description}</p>
                  </div>
                  <Link href={href} className="inline-flex items-center gap-2 self-center text-sm font-medium">
                    Planifier le rendez-vous <ArrowRight className="size-4" />
                  </Link>
                </article>
              );
            })}
            {acceptedQuotes.length === 0 ? (
              <p className="rounded-md border bg-background p-4 text-sm text-muted-foreground">
                Aucune soumission acceptee pour l&apos;instant. Accepte une soumission dans QuotePilot;
                le client, le budget, le consultant et le flowId apparaitront dans cette file.
              </p>
            ) : null}
          </CardContent>
        </Card>

        <EcosystemNotificationPanel appKey="reserveflow" />
      </div>
    </main>
  );
}

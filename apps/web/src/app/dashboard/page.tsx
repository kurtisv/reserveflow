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

export default async function DashboardPage() {
  const [stats, acceptedQuotes] = await Promise.all([
    getDashboardStats(),
    getIncomingEcosystemEvents("reserveflow", "quote.accepted", 8),
  ]);

  return (
    <main className="px-6 py-10 text-foreground">
      <div className="mx-auto grid max-w-6xl gap-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.18em] text-muted-foreground">
              ReserveFlow operations
            </p>
            <h1 className="mt-3 text-3xl font-semibold">Booking control room</h1>
          </div>
          <Link href="/dashboard/bookings" className="inline-flex items-center gap-2 text-sm font-medium">
            Manage bookings <ArrowRight className="size-4" />
          </Link>
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
              const href = `/booking?flowId=${encodeURIComponent(event.flowId)}&quoteId=${encodeURIComponent(String(event.entityId ?? ""))}&customerName=${encodeURIComponent(event.customerName ?? "")}&customerEmail=${encodeURIComponent(event.customerEmail ?? "")}&amount=${encodeURIComponent(String(payload.totalCents ?? ""))}&consultant=${encodeURIComponent(String(payload.consultantName ?? "Maya Laurent"))}&need=${encodeURIComponent(event.description ?? "")}&quoteNumber=${encodeURIComponent(String(payload.quoteNumber ?? ""))}&sourceEventId=${encodeURIComponent(event.id)}`;

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
                    <p className="mt-2 text-sm text-muted-foreground">{event.description}</p>
                  </div>
                  <Link href={href} className="inline-flex items-center gap-2 self-center text-sm font-medium">
                    Planifier le rendez-vous <ArrowRight className="size-4" />
                  </Link>
                </article>
              );
            })}
            {acceptedQuotes.length === 0 ? (
              <p className="text-sm text-muted-foreground">
                Aucune soumission acceptee pour l'instant. Accepte une soumission dans QuotePilot pour alimenter cette file.
              </p>
            ) : null}
          </CardContent>
        </Card>

        <EcosystemNotificationPanel appKey="reserveflow" />
      </div>
    </main>
  );
}

import Link from "next/link";
import { ArrowRight, CalendarDays, CheckCircle2, Clock3, XCircle } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { prisma } from "@/lib/db";

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
  const stats = await getDashboardStats();

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
      </div>
    </main>
  );
}

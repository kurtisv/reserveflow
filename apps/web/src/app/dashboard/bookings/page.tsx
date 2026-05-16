import Link from "next/link";
import { ArrowRight, CalendarDays, CheckCircle2, Clock3 } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { prisma } from "@/lib/db";

async function getBookings() {
  try {
    return await prisma.booking.findMany({
      include: {
        service: true,
        staff: true,
      },
      orderBy: { startAt: "asc" },
      take: 50,
    });
  } catch {
    return [];
  }
}

function formatDate(date: Date) {
  return new Intl.DateTimeFormat("en-CA", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "UTC",
  }).format(date);
}

export default async function DashboardBookingsPage() {
  const bookings = await getBookings();
  const requested = bookings.filter((booking) => booking.status === "REQUESTED").length;
  const confirmed = bookings.filter((booking) => booking.status === "CONFIRMED").length;

  return (
    <main className="grid gap-6 px-6 py-10">
      <div>
        <h1 className="text-3xl font-semibold">Bookings</h1>
        <p className="mt-3 text-muted-foreground">
          Operational view for requests, confirmations, client notes, and team capacity.
        </p>
      </div>

      <section className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <CalendarDays className="size-4" />
              Total
            </CardTitle>
            <CardDescription>Bookings in the current dataset.</CardDescription>
          </CardHeader>
          <CardContent className="text-3xl font-semibold">{bookings.length}</CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Clock3 className="size-4" />
              Requested
            </CardTitle>
            <CardDescription>Waiting for operations review.</CardDescription>
          </CardHeader>
          <CardContent className="text-3xl font-semibold">{requested}</CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <CheckCircle2 className="size-4" />
              Confirmed
            </CardTitle>
            <CardDescription>Ready on the calendar.</CardDescription>
          </CardHeader>
          <CardContent className="text-3xl font-semibold">{confirmed}</CardContent>
        </Card>
      </section>

      <Card>
        <CardHeader>
          <CardTitle>Booking queue</CardTitle>
          <CardDescription>{bookings.length} records from Prisma.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Customer</TableHead>
                <TableHead>Service</TableHead>
                <TableHead>Staff</TableHead>
                <TableHead>Start</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Detail</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {bookings.map((booking) => (
                <TableRow key={booking.id}>
                  <TableCell>{booking.customerName}</TableCell>
                  <TableCell>{booking.service.name}</TableCell>
                  <TableCell>{booking.staff?.name ?? "Any staff"}</TableCell>
                  <TableCell>{formatDate(booking.startAt)}</TableCell>
                  <TableCell>
                    <Badge>{booking.status}</Badge>
                  </TableCell>
                  <TableCell>
                    <Link
                      href={`/dashboard/bookings/${booking.id}`}
                      className="inline-flex items-center gap-2 text-sm font-medium"
                    >
                      Open <ArrowRight className="size-4" />
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
              {bookings.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-muted-foreground">
                    No bookings yet. Run the seed or submit the public booking flow.
                  </TableCell>
                </TableRow>
              ) : null}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </main>
  );
}

import Link from "next/link";
import { notFound } from "next/navigation";

import { updateBookingStatus } from "@/app/actions/booking";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { BookingStatus } from "@/generated/prisma";
import { prisma } from "@/lib/db";

async function getBooking(id: string) {
  try {
    return await prisma.booking.findUnique({
      where: { id },
      include: {
        service: true,
        staff: true,
      },
    });
  } catch {
    return null;
  }
}

function formatDate(date: Date) {
  return new Intl.DateTimeFormat("en-CA", {
    dateStyle: "full",
    timeStyle: "short",
    timeZone: "UTC",
  }).format(date);
}

export default async function DashboardBookingDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const booking = await getBooking(id);

  if (!booking) {
    notFound();
  }

  return (
    <main className="grid gap-6 px-6 py-10">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <Link href="/dashboard/bookings" className="text-sm text-muted-foreground hover:text-foreground">
            Back to bookings
          </Link>
          <h1 className="mt-3 text-3xl font-semibold">{booking.customerName}</h1>
          <p className="mt-3 text-muted-foreground">{booking.service.name}</p>
        </div>
        <Badge>{booking.status}</Badge>
      </div>

      <section className="grid gap-6 lg:grid-cols-[1fr_0.8fr]">
        <Card>
          <CardHeader>
            <CardTitle>Booking details</CardTitle>
            <CardDescription>Public token: {booking.publicToken}</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 text-sm sm:grid-cols-2">
            <div>
              <p className="font-medium">Appointment</p>
              <p className="mt-1 text-muted-foreground">{formatDate(booking.startAt)}</p>
            </div>
            <div>
              <p className="font-medium">Staff</p>
              <p className="mt-1 text-muted-foreground">{booking.staff?.name ?? "Any staff"}</p>
            </div>
            <div>
              <p className="font-medium">Email</p>
              <p className="mt-1 text-muted-foreground">{booking.customerEmail}</p>
            </div>
            <div>
              <p className="font-medium">Phone</p>
              <p className="mt-1 text-muted-foreground">{booking.customerPhone ?? "Not provided"}</p>
            </div>
            <div className="sm:col-span-2">
              <p className="font-medium">Notes</p>
              <Textarea className="mt-2" readOnly value={booking.notes ?? "No notes provided."} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Status actions</CardTitle>
            <CardDescription>Update the operational state for this request.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-3">
            {Object.values(BookingStatus).map((status) => (
              <form key={status} action={updateBookingStatus}>
                <input type="hidden" name="bookingId" value={booking.id} />
                <input type="hidden" name="status" value={status} />
                <Button
                  type="submit"
                  variant={booking.status === status ? "default" : "secondary"}
                  className="w-full justify-start"
                >
                  Mark {status.toLowerCase()}
                </Button>
              </form>
            ))}
          </CardContent>
        </Card>
      </section>
    </main>
  );
}

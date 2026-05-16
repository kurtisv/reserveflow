import Link from "next/link";
import { notFound } from "next/navigation";
import { CalendarCheck2, Clock3, Mail, UserRound } from "lucide-react";

import { MarketingPageShell } from "@/components/marketing/page-shell";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { prisma } from "@/lib/db";

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

function formatDate(date: Date) {
  return new Intl.DateTimeFormat("en-CA", {
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
            Booking received
          </p>
          <h1 className="mt-4 text-4xl font-semibold tracking-normal text-balance sm:text-5xl">
            Your request is in the ReserveFlow queue.
          </h1>
          <p className="mt-5 text-lg leading-8 text-muted-foreground">
            The appointment is saved as {booking.status.toLowerCase()}. The operations
            team can confirm, complete, or cancel it from the dashboard.
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
                <p className="font-medium">Appointment</p>
                <p className="mt-1 text-muted-foreground">{formatDate(booking.startAt)}</p>
              </div>
            </div>
            <div className="flex gap-3">
              <Clock3 className="mt-1 size-4" />
              <div>
                <p className="font-medium">Duration</p>
                <p className="mt-1 text-muted-foreground">{booking.service.durationMin} minutes</p>
              </div>
            </div>
            <div className="flex gap-3">
              <UserRound className="mt-1 size-4" />
              <div>
                <p className="font-medium">Client</p>
                <p className="mt-1 text-muted-foreground">{booking.customerName}</p>
              </div>
            </div>
            <div className="flex gap-3">
              <Mail className="mt-1 size-4" />
              <div>
                <p className="font-medium">Email</p>
                <p className="mt-1 text-muted-foreground">{booking.customerEmail}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex flex-wrap gap-3">
          <Button asChild>
            <Link href="/booking">Request another booking</Link>
          </Button>
          <Button asChild variant="secondary">
            <Link href="/case-study">View project case study</Link>
          </Button>
        </div>
      </main>
    </MarketingPageShell>
  );
}

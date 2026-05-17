import { CalendarClock, CheckCircle2, Clock3 } from "lucide-react";

import { createBookingRequest } from "@/app/actions/booking";
import { MarketingPageShell } from "@/components/marketing/page-shell";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { prisma } from "@/lib/db";
import { getCurrentLocale } from "@/lib/locale";
import { generateBookingSlots } from "@/modules/booking";

const demoServices = [
  {
    id: "northline-discovery-call",
    name: "Northline discovery call",
    durationMin: 30,
    priceCents: null,
    description: "Qualified QuotePilot lead review before opening the ClientHub workspace.",
    category: "QuotePilot handoff",
  },
  {
    id: "atelier-ops-workshop",
    name: "Atelier operations workshop",
    durationMin: 60,
    priceCents: 25000,
    description: "Plan the workshop path that continues into EventPass and CommerceKit.",
    category: "EventPass handoff",
  },
  {
    id: "riverside-support-review",
    name: "Riverside support review",
    durationMin: 45,
    priceCents: 9500,
    description: "Review a smaller Luma consultation before SupportDesk follow-up.",
    category: "SupportDesk handoff",
  },
];

const fallbackStaff = [{ id: undefined, name: "Any staff" }];
const fallbackBookingDate = "2026-05-18";

const copy = {
  fr: {
    eyebrow: "MVP reservation",
    title: "Reservation claire pour services, equipe et disponibilites.",
    intro:
      "Cette page pose le flux public: choisir un service, choisir un creneau disponible, puis confirmer les informations client.",
    benefits: [
      "Disponibilites calculees par regles, exceptions et reservations.",
      "Les demandes QuotePilot deviennent des rendez-vous visibles dans ClientHub.",
    ],
    choiceTitle: "Choix",
    fallbackData: "Donnees demo si la DB est vide ou indisponible.",
    prismaData: "Services actifs depuis Prisma.",
    staff: "Equipe",
    updateAvailability: "Mettre a jour les disponibilites",
    bookingTitle: "Demande de reservation",
    bookingDescription: "heure UTC pour le scaffold.",
    slot: "Creneau",
    noSlots: "Aucun creneau disponible pour cette selection.",
    name: "Nom",
    phone: "Telephone",
    notes: "Notes",
    notesPlaceholder: "Informations utiles pour preparer le rendez-vous?",
    submit: "Envoyer la demande demo",
    free: "Gratuit",
    anyStaff: "Toute l'equipe",
  },
  en: {
    eyebrow: "Booking MVP",
    title: "Clear booking for services, staff, and availability.",
    intro:
      "This page sets the public flow: choose a service, choose an available slot, then confirm the customer details.",
    benefits: [
      "Availability calculated from rules, exceptions, and bookings.",
      "QuotePilot requests become appointments visible in ClientHub.",
    ],
    choiceTitle: "Selection",
    fallbackData: "Demo data is shown if the database is empty or unavailable.",
    prismaData: "Active services from Prisma.",
    staff: "Staff",
    updateAvailability: "Update availability",
    bookingTitle: "Booking request",
    bookingDescription: "UTC time for the scaffold.",
    slot: "Slot",
    noSlots: "No slots available for this selection.",
    name: "Name",
    phone: "Phone",
    notes: "Notes",
    notesPlaceholder: "Anything the team should know before the appointment?",
    submit: "Request demo booking",
    free: "Free",
    anyStaff: "Any staff",
  },
};

type BookingSearchParams = {
  serviceId?: string;
  staffId?: string;
  date?: string;
};

async function getBookingData(bookingDate: string) {
  try {
    const [services, staff, rules, exceptions, bookings] = await Promise.all([
      prisma.service.findMany({
        where: { isActive: true },
        orderBy: { name: "asc" },
        take: 20,
      }),
      prisma.staff.findMany({
        where: { isActive: true },
        orderBy: { name: "asc" },
        take: 20,
      }),
      prisma.availabilityRule.findMany({
        orderBy: [{ weekday: "asc" }, { startTime: "asc" }],
      }),
      prisma.availabilityException.findMany(),
      prisma.booking.findMany({
        where: {
          startAt: {
            gte: new Date(`${bookingDate}T00:00:00.000Z`),
            lt: new Date(`${bookingDate}T23:59:59.999Z`),
          },
        },
        select: { startAt: true, endAt: true },
      }),
    ]);

    return {
      services: services.length > 0 ? services : demoServices,
      staff: staff.length > 0 ? staff : fallbackStaff,
      rules,
      exceptions: exceptions.map((exception) => ({
        date: exception.date.toISOString().slice(0, 10),
        startTime: exception.startTime,
        endTime: exception.endTime,
        isClosed: exception.isClosed,
      })),
      bookings,
      usingFallback: services.length === 0 || staff.length === 0 || rules.length === 0,
    };
  } catch {
    return {
      services: demoServices,
      staff: fallbackStaff,
      rules: [],
      exceptions: [],
      bookings: [
        {
          startAt: new Date("2026-05-18T10:00:00.000Z"),
          endAt: new Date("2026-05-18T10:30:00.000Z"),
        },
      ],
      usingFallback: true,
    };
  }
}

function formatPrice(priceCents: number | null, freeLabel: string) {
  return priceCents ? `$${(priceCents / 100).toFixed(2)}` : freeLabel;
}

function normalizeBookingDate(date?: string) {
  return date && /^\d{4}-\d{2}-\d{2}$/.test(date) ? date : fallbackBookingDate;
}

export default async function BookingPage({
  searchParams,
}: {
  searchParams?: Promise<BookingSearchParams>;
}) {
  const locale = await getCurrentLocale();
  const t = copy[locale];
  const params = (await searchParams) ?? {};
  const selectedDate = normalizeBookingDate(params.date);
  const data = await getBookingData(selectedDate);
  const selectedService =
    data.services.find((service) => service.id === params.serviceId) ?? data.services[0] ?? demoServices[0];
  const selectedStaff =
    data.staff.find((staff) => staff.id === params.staffId) ?? data.staff[0] ?? fallbackStaff[0];
  const rules =
    data.rules.length > 0
      ? data.rules.filter((rule) => !selectedStaff.id || rule.staffId === selectedStaff.id)
      : [
          {
            weekday: 1,
            startTime: "09:00",
            endTime: "12:00",
          },
        ];
  const slots = generateBookingSlots({
    date: selectedDate,
    serviceDurationMin: selectedService.durationMin,
    rules,
    exceptions: data.exceptions,
    bookedIntervals: data.bookings,
  });

  return (
    <MarketingPageShell>
      <main>
        <section className="mx-auto grid w-full max-w-6xl gap-10 px-6 py-16 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div>
            <p className="mb-4 text-sm font-medium uppercase tracking-[0.18em] text-primary">
              {t.eyebrow}
            </p>
            <h1 className="text-4xl font-semibold tracking-normal text-balance sm:text-5xl">
              {t.title}
            </h1>
            <p className="mt-5 text-lg leading-8 text-muted-foreground">
              {t.intro}
            </p>
            <div className="mt-8 grid gap-3 text-sm text-muted-foreground">
              {t.benefits.map((benefit) => (
                <div key={benefit} className="flex items-center gap-3">
                  <CheckCircle2 className="size-4 text-foreground" />
                  {benefit}
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-4">
            <Card>
              <CardHeader>
                <CardTitle>{t.choiceTitle}</CardTitle>
                <CardDescription>
                  {data.usingFallback ? t.fallbackData : t.prismaData}
                </CardDescription>
              </CardHeader>
              <CardContent className="grid gap-5">
                <form className="grid gap-4" method="get">
                  <div className="grid gap-2">
                    <Label htmlFor="serviceId">Service</Label>
                    <select
                      id="serviceId"
                      name="serviceId"
                      className="h-10 border border-border bg-background px-3 text-sm"
                      defaultValue={selectedService.id}
                    >
                      {data.services.map((service) => (
                        <option key={service.id} value={service.id}>
                          {service.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="staffId">{t.staff}</Label>
                    <select
                      id="staffId"
                      name="staffId"
                      className="h-10 border border-border bg-background px-3 text-sm"
                      defaultValue={selectedStaff.id}
                    >
                      {data.staff.map((staff) => (
                        <option key={staff.id ?? "any"} value={staff.id}>
                          {staff.id ? staff.name : t.anyStaff}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="date">Date</Label>
                    <Input id="date" name="date" type="date" defaultValue={selectedDate} />
                  </div>
                  <Button type="submit" variant="secondary">
                    {t.updateAvailability}
                  </Button>
                </form>

                {data.services.map((service) => (
                  <div key={service.id} className="border p-4">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <h2 className="font-medium">{service.name}</h2>
                      <span className="text-sm font-medium">
                        {formatPrice(service.priceCents, t.free)}
                      </span>
                    </div>
                    <p className="mt-1 text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
                      {service.category}
                    </p>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">
                      {service.description}
                    </p>
                    <div className="mt-3 flex items-center gap-2 text-sm text-primary">
                      <Clock3 className="size-4" />
                      {service.durationMin} minutes
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>{t.bookingTitle}</CardTitle>
                <CardDescription>
                  {selectedDate}, {t.bookingDescription}
                </CardDescription>
              </CardHeader>
              <CardContent className="grid gap-5">
                <form action={createBookingRequest} className="grid gap-4 border-t pt-5">
                  <input name="serviceId" type="hidden" value={selectedService.id} />
                  {selectedStaff.id ? <input name="staffId" type="hidden" value={selectedStaff.id} /> : null}
                  <div className="grid gap-2">
                    <Label>{t.slot}</Label>
                    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                      {slots.map((slot, index) => (
                        <label
                          key={slot.startTime}
                          className="flex h-10 cursor-pointer items-center justify-center gap-2 rounded-lg border bg-secondary px-3 text-sm font-medium text-secondary-foreground has-[:checked]:border-primary has-[:checked]:bg-primary has-[:checked]:text-primary-foreground"
                        >
                          <input
                            className="sr-only"
                            name="startAt"
                            type="radio"
                            value={slot.startAt.toISOString()}
                            defaultChecked={index === 0}
                            required
                          />
                          <CalendarClock className="size-4" />
                          {slot.startTime}
                        </label>
                      ))}
                    </div>
                    {slots.length === 0 ? (
                      <p className="text-sm text-muted-foreground">{t.noSlots}</p>
                    ) : null}
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="customerName">{t.name}</Label>
                    <Input id="customerName" name="customerName" placeholder="Client Example" required />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="customerEmail">Email</Label>
                    <Input
                      id="customerEmail"
                      name="customerEmail"
                      type="email"
                      placeholder="client@example.com"
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="customerPhone">{t.phone}</Label>
                    <Input id="customerPhone" name="customerPhone" placeholder="+1 555 555 5555" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="notes">{t.notes}</Label>
                    <Textarea id="notes" name="notes" placeholder={t.notesPlaceholder} />
                  </div>
                  <Button type="submit" variant="secondary" disabled={slots.length === 0}>
                    {t.submit}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
    </MarketingPageShell>
  );
}

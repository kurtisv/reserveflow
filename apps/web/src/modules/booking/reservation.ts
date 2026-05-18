import { z } from "zod";

export type ExistingBookingWindow = {
  startAt: Date;
  endAt: Date;
};

export const bookingRequestSchema = z.object({
  serviceId: z.string().trim().min(1, "Service is required"),
  staffId: z.string().trim().optional(),
  customerName: z.string().trim().min(2, "Name is required"),
  customerEmail: z.string().trim().email("Valid email is required"),
  customerPhone: z.string().trim().optional(),
  notes: z.string().trim().optional(),
  startAt: z.coerce.date(),
  flowId: z.string().trim().optional(),
  sourceApp: z.string().trim().optional(),
  sourceEventId: z.string().trim().optional(),
  consultantName: z.string().trim().optional(),
  quoteNumber: z.string().trim().optional(),
  quoteTotalCents: z.coerce.number().int().optional(),
  quoteId: z.string().trim().optional(),
  projectType: z.string().trim().optional(),
  budgetRange: z.string().trim().optional(),
  originalMessage: z.string().trim().optional(),
});

export type BookingRequestInput = z.infer<typeof bookingRequestSchema>;

export function parseBookingRequestFormData(formData: FormData) {
  const parsed = bookingRequestSchema.parse({
    serviceId: formData.get("serviceId"),
    staffId: formData.get("staffId") || undefined,
    customerName: formData.get("customerName"),
    customerEmail: formData.get("customerEmail"),
    customerPhone: formData.get("customerPhone") || undefined,
    notes: formData.get("notes") || undefined,
    startAt: formData.get("startAt"),
    flowId: formData.get("flowId") || undefined,
    sourceApp: formData.get("sourceApp") || undefined,
    sourceEventId: formData.get("sourceEventId") || undefined,
    consultantName: formData.get("consultantName") || undefined,
    quoteNumber: formData.get("quoteNumber") || undefined,
    quoteTotalCents: formData.get("quoteTotalCents") || undefined,
    quoteId: formData.get("quoteId") || undefined,
    projectType: formData.get("projectType") || undefined,
    budgetRange: formData.get("budgetRange") || undefined,
    originalMessage: formData.get("originalMessage") || undefined,
  });

  return {
    ...parsed,
    staffId: parsed.staffId || undefined,
    customerPhone: parsed.customerPhone || undefined,
    notes: parsed.notes || undefined,
    flowId: parsed.flowId || undefined,
    sourceApp: parsed.sourceApp || undefined,
    sourceEventId: parsed.sourceEventId || undefined,
    consultantName: parsed.consultantName || undefined,
    quoteNumber: parsed.quoteNumber || undefined,
    quoteTotalCents: parsed.quoteTotalCents || undefined,
    quoteId: parsed.quoteId || undefined,
    projectType: parsed.projectType || undefined,
    budgetRange: parsed.budgetRange || undefined,
    originalMessage: parsed.originalMessage || undefined,
  };
}

export function calculateBookingEndAt(startAt: Date, durationMin: number) {
  if (!Number.isInteger(durationMin) || durationMin <= 0) {
    throw new Error("durationMin must be a positive integer");
  }

  return new Date(startAt.getTime() + durationMin * 60_000);
}

export function hasBookingConflict({
  startAt,
  endAt,
  existingBookings,
}: {
  startAt: Date;
  endAt: Date;
  existingBookings: ExistingBookingWindow[];
}) {
  return existingBookings.some(
    (booking) => startAt < booking.endAt && booking.startAt < endAt,
  );
}

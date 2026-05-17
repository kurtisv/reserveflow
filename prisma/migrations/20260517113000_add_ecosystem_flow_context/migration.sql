alter table if exists public."Booking"
  add column if not exists "flowId" text,
  add column if not exists "sourceApp" text,
  add column if not exists "sourceEventId" text,
  add column if not exists "consultantName" text,
  add column if not exists "quoteNumber" text,
  add column if not exists "quoteTotalCents" integer,
  add column if not exists "contextJson" jsonb;

create index if not exists "Booking_flowId_idx" on public."Booking"("flowId");

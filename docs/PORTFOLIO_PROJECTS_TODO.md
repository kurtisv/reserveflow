# ReserveFlow Project TODO

## Global objective

Build ReserveFlow as project 5 in the KV Web Starter portfolio series. This repo should show a distinct booking-system use case with a clean public booking flow, a practical operations dashboard, and a calm design language that differs from the first four portfolio projects.

## Project identity

- Name: ReserveFlow
- Project number: 5
- Category: booking and appointment operations
- Source boilerplate: `kv-web-starter`
- GitHub repo: `https://github.com/kurtisv/reserveflow`
- Recruiter-facing: yes

## Branch workflow

- [x] `main` - clean boilerplate copy committed and pushed.
- [x] `01-foundation` - ReserveFlow naming, docs, baseline checks.
- [ ] `02-booking-data-model` - Prisma models, seed, typed helpers.
- [ ] `03-public-booking-flow` - landing, services, booking request, confirmation page.
- [ ] `04-dashboard-bookings` - dashboard overview, booking list, detail, status actions.
- [ ] `05-design-polish` - distinct visual identity, responsive polish, case study.
- [ ] `06-deploy` - deployment, smoke checks, Symphonee notes, dev-profile update.

## Foundation

- [x] Copy `kv-web-starter` into `C:\code\reserveflow`.
- [x] Register `reserveflow` in Symphonee.
- [x] Create public GitHub repo.
- [x] Push clean starter baseline.
- [x] Rename metadata and navigation from generic starter to ReserveFlow.
- [x] Replace inherited SupportDesk TODO with ReserveFlow project plan.
- [x] Run lint.
- [x] Run typecheck.
- [x] Run tests.

## MVP feature checklist

- [ ] Service catalog with duration, price, category, and description.
- [ ] Staff/resource profiles with availability.
- [ ] Public booking request form.
- [ ] Booking statuses: REQUESTED, CONFIRMED, COMPLETED, CANCELLED.
- [ ] Confirmation/status page for a booking.
- [ ] Dashboard stats for total, requested, confirmed, completed, cancelled, upcoming.
- [ ] Booking list and detail screens.
- [ ] Status update actions.
- [ ] Confirmation email helper.
- [ ] Demo seed data.
- [ ] Case study page.

## Design direction

ReserveFlow should feel light, precise, and operational. The visual language should use calendar/time-slot cues, a soft blue-teal base, a warm accent for active booking moments, and more whitespace than the dashboard-heavy projects.

## Progress log

### 2026-05-16

- Created `projet5-reserveflow` Symphonee note.
- Copied the boilerplate into `C:\code\reserveflow`.
- Registered the repo in Symphonee and set it as active.
- Created public GitHub repo `kurtisv/reserveflow`.
- Pushed the clean starter baseline to `main`.
- Started `01-foundation`.
- Completed ReserveFlow identity pass, removed inherited test database helper, and validated lint/typecheck/tests.

# ReserveFlow

ReserveFlow is project 5 in the KV Web Starter portfolio series. It turns the shared boilerplate into a service-business booking system with public booking, availability logic, operational dashboards, and recruiter-readable project documentation.

## Portfolio goal

This project demonstrates that one boilerplate can support more than landing pages or generic dashboards. ReserveFlow focuses on appointment operations:

- service catalog and duration/price metadata
- staff or resource availability
- booking request and confirmation flow
- booking status management
- dashboard metrics for upcoming work
- email-ready confirmation structure
- case study page explaining the build

## Stack

- Next.js App Router, React, TypeScript strict
- Tailwind CSS v4 with local UI primitives
- PostgreSQL with Prisma
- Auth.js with Prisma Adapter
- Resend-ready React Email templates
- Vitest, Playwright, and GitHub Actions

## Local setup

```bash
pnpm install
cp .env.example .env
docker compose up -d
pnpm db:generate
pnpm db:migrate
pnpm db:seed
pnpm dev
```

Demo access:

```txt
admin@example.com
password123
```

## Branch progression

The repo is built in visible steps for recruiter review:

1. `01-foundation` - copied starter, ReserveFlow identity, docs, baseline checks.
2. `02-booking-data-model` - Prisma booking model and demo seed.
3. `03-public-booking-flow` - public landing, service catalog, booking form, confirmation page.
4. `04-dashboard-bookings` - booking operations dashboard and status actions.
5. `05-design-polish` - distinct visual system, responsive polish, case study.
6. `06-deploy` - production deployment, smoke checks, portfolio note updates.

## Boilerplate credit

ReserveFlow is built from `kv-web-starter`, the shared boilerplate used across the portfolio series. The point of the project is to show how the starter can become a focused product while keeping clean full-stack structure.

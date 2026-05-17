import { BookingStatus, PrismaClient, Role } from "../apps/web/src/generated/prisma";

const prisma = new PrismaClient();

const services = [
  {
    name: "Discovery Consultation",
    slug: "discovery-consultation",
    category: "Consulting",
    description: "A focused intake session to clarify goals, constraints, and next steps.",
    durationMin: 45,
    priceCents: 9000,
  },
  {
    name: "Studio Planning Block",
    slug: "studio-planning-block",
    category: "Planning",
    description: "A longer working session for service teams that need scheduling decisions made.",
    durationMin: 90,
    priceCents: 18500,
  },
  {
    name: "Implementation Review",
    slug: "implementation-review",
    category: "Review",
    description: "A checkpoint appointment to review progress and unblock execution.",
    durationMin: 60,
    priceCents: 14000,
  },
];

const staffMembers = [
  {
    name: "Maya Laurent",
    email: "maya@reserveflow.demo",
    roleTitle: "Lead coordinator",
    bio: "Owns intake calls, calendar structure, and client handoffs.",
  },
  {
    name: "Noah Bennett",
    email: "noah@reserveflow.demo",
    roleTitle: "Operations specialist",
    bio: "Handles longer planning blocks and execution reviews.",
  },
];

async function main() {
  const adminEmail = process.env.AUTH_DEMO_EMAIL ?? "admin@example.com";
  const user = await prisma.user.upsert({
    where: { email: adminEmail },
    update: { name: "ReserveFlow Admin" },
    create: {
      email: adminEmail,
      name: "ReserveFlow Admin",
    },
  });

  const organization = await prisma.organization.upsert({
    where: { slug: "reserveflow" },
    update: { name: "ReserveFlow Studio" },
    create: {
      name: "ReserveFlow Studio",
      slug: "reserveflow",
    },
  });

  await prisma.membership.upsert({
    where: {
      userId_organizationId: {
        userId: user.id,
        organizationId: organization.id,
      },
    },
    update: { role: Role.OWNER },
    create: {
      userId: user.id,
      organizationId: organization.id,
      role: Role.OWNER,
    },
  });

  const createdServices = [];
  for (const service of services) {
    createdServices.push(
      await prisma.service.upsert({
        where: { slug: service.slug },
        update: service,
        create: service,
      }),
    );
  }

  const createdStaff = [];
  for (const staff of staffMembers) {
    createdStaff.push(
      await prisma.staff.upsert({
        where: { email: staff.email },
        update: staff,
        create: staff,
      }),
    );
  }

  await prisma.availabilityRule.deleteMany({
    where: { staffId: { in: createdStaff.map((staff) => staff.id) } },
  });

  for (const staff of createdStaff) {
    await prisma.availabilityRule.createMany({
      data: [1, 2, 3, 4, 5].map((weekday) => ({
        staffId: staff.id,
        weekday,
        startTime: "09:00",
        endTime: weekday === 5 ? "14:00" : "17:00",
        timezone: "America/Toronto",
      })),
    });
  }

  await prisma.booking.deleteMany({
    where: { customerEmail: { endsWith: "@reserveflow.demo" } },
  });

  const now = new Date();
  const bookingStarts = [
    addDaysAt(now, 1, 10, 0),
    addDaysAt(now, 2, 13, 30),
    addDaysAt(now, 5, 9, 30),
    addDaysAt(now, -2, 11, 0),
  ];

  await prisma.booking.createMany({
    data: [
      {
        serviceId: createdServices[0].id,
        staffId: createdStaff[0].id,
        customerName: "Alex Martin",
        customerEmail: "alex@reserveflow.demo",
        customerPhone: "+1 514 555 0111",
        notes: "Prefers a concise planning call before committing to a package.",
        startAt: bookingStarts[0],
        endAt: addMinutes(bookingStarts[0], createdServices[0].durationMin),
        status: BookingStatus.REQUESTED,
        publicToken: "demo-requested-001",
      },
      {
        serviceId: createdServices[1].id,
        staffId: createdStaff[1].id,
        customerName: "Client recu",
        customerEmail: "lead@example.com",
        customerPhone: "+1 418 555 0190",
        notes: "Needs a planning block for a boutique service launch.",
        startAt: bookingStarts[1],
        endAt: addMinutes(bookingStarts[1], createdServices[1].durationMin),
        status: BookingStatus.CONFIRMED,
        publicToken: "demo-confirmed-001",
      },
      {
        serviceId: createdServices[2].id,
        staffId: createdStaff[1].id,
        customerName: "Sam Gagnon",
        customerEmail: "sam@reserveflow.demo",
        startAt: bookingStarts[2],
        endAt: addMinutes(bookingStarts[2], createdServices[2].durationMin),
        status: BookingStatus.REQUESTED,
        publicToken: "demo-requested-002",
      },
      {
        serviceId: createdServices[0].id,
        staffId: createdStaff[0].id,
        customerName: "Nadia Tremblay",
        customerEmail: "nadia@reserveflow.demo",
        startAt: bookingStarts[3],
        endAt: addMinutes(bookingStarts[3], createdServices[0].durationMin),
        status: BookingStatus.COMPLETED,
        publicToken: "demo-completed-001",
      },
    ],
  });
}

function addDaysAt(base: Date, days: number, hours: number, minutes: number) {
  const date = new Date(base);
  date.setDate(date.getDate() + days);
  date.setHours(hours, minutes, 0, 0);
  return date;
}

function addMinutes(base: Date, minutes: number) {
  return new Date(base.getTime() + minutes * 60_000);
}

main()
  .finally(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });

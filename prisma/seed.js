const { PrismaClient } = require("@prisma/client");
const { PrismaPg } = require("@prisma/adapter-pg");
const bcrypt = require("bcryptjs");

const url = process.env.DATABASE_URL || "postgresql://postgres:password@localhost:5499/habbah_db?schema=public";
const adapter = new PrismaPg(url);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("Seeding database...");

  const superAdminEmail = "superadmin@habbah.com";
  const superAdminPass = await bcrypt.hash("superhabba@1234", 12);
  await prisma.adminUser.upsert({
    where: { email: superAdminEmail },
    update: {},
    create: {
      email: superAdminEmail,
      passwordHash: superAdminPass,
      role: "SUPER_ADMIN",
      name: "Super Admin",
    },
  });

  const adminEmail = "admin@habbah.com";
  const adminPass = await bcrypt.hash("habba@1234", 12);
  await prisma.adminUser.upsert({
    where: { email: adminEmail },
    update: {},
    create: {
      email: adminEmail,
      passwordHash: adminPass,
      role: "ADMIN",
      name: "Admin",
    },
  });

  await prisma.job.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      title: "Program Coordinator",
      description:
        "We are looking for a dedicated Program Coordinator to help manage educational initiatives and outreach programs across Karachi.",
      location: "Karachi, Pakistan",
      jobType: "FULL_TIME",
      category: "Management",
      department: "Operations",
      employmentLevel: "Mid-Level",
      requirements:
        "Bachelor's degree in relevant field\n2+ years of experience\nStrong communication skills",
      responsibilities:
        "Coordinate educational programs\nLiaise with stakeholders\nManage volunteers",
      qualifications: "Bachelor's degree minimum",
      isActive: true,
    },
  });

  await prisma.job.upsert({
    where: { id: 4 },
    update: {},
    create: {
      id: 4,
      title: "General Interest / Open Application",
      description: "Submit your general interest application to join Habbah.",
      location: "Karachi, Pakistan",
      jobType: "FULL_TIME",
      category: "General",
      isActive: true,
    },
  });

  console.log("Seed complete!");
  console.log(`\nSuper Admin: ${superAdminEmail}`);
  console.log(`Password: Habbah@SuperAdmin2026!\n`);
  console.log(`Admin: ${adminEmail}`);
  console.log(`Password: Habbah@Admin2026!\n`);
}

main()
  .catch((e) => {
    console.error("Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

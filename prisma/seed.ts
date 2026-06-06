import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // ─── SUPER ADMIN ────────────────────────────────────────────
  const superAdminEmail = "superadmin@habbah.com";
  const superAdminPass = await bcrypt.hash("Habbah@SuperAdmin2026!", 12);

  const superAdmin = await prisma.adminUser.upsert({
    where: { email: superAdminEmail },
    update: {},
    create: {
      email: superAdminEmail,
      passwordHash: superAdminPass,
      role: "SUPER_ADMIN",
      name: "Super Admin",
    },
  });

  // ─── REGULAR ADMIN ──────────────────────────────────────────
  const adminEmail = "admin@habbah.com";
  const adminPass = await bcrypt.hash("Habbah@Admin2026!", 12);

  const admin = await prisma.adminUser.upsert({
    where: { email: adminEmail },
    update: {},
    create: {
      email: adminEmail,
      passwordHash: adminPass,
      role: "ADMIN",
      name: "Admin",
    },
  });

  // ─── SAMPLE JOB ─────────────────────────────────────────────
  await prisma.job.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      title: "Program Coordinator",
      description:
        "We are looking for a dedicated Program Coordinator to help manage our educational initiatives and outreach programs across Karachi.",
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

  // ─── GENERAL INTEREST JOB (id=4 as used in existing code) ───
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

  console.log("✅ Seed complete!");
  console.log(`\n📧 Super Admin: ${superAdminEmail}`);
  console.log(`🔑 Super Admin Password: Habbah@SuperAdmin2026!\n`);
  console.log(`📧 Admin: ${adminEmail}`);
  console.log(`🔑 Admin Password: Habbah@Admin2026!\n`);
}

main()
  .catch((e) => {
    console.error("❌ Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

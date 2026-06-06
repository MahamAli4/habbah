import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";

// GET — All job applications (admin only)
export async function GET(request: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const applications = await prisma.jobApplication.findMany({
      include: { job: { select: { id: true, title: true, location: true } } },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ applications });
  } catch (err) {
    console.error("Job responses GET error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

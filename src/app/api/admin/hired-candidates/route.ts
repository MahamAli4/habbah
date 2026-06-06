import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";

export async function GET(request: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const appHired = await prisma.jobApplication.findMany({
      where: { status: "HIRED" },
      include: { job: { select: { id: true, title: true } } },
      orderBy: { updatedAt: "desc" },
    });

    const manualHired = await prisma.candidate.findMany({
      where: { status: "HIRED", isDeleted: false },
      orderBy: { updatedAt: "desc" },
    });

    return NextResponse.json({ candidates: [...appHired, ...manualHired] });
  } catch (err) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

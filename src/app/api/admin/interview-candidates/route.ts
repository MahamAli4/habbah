import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";

// GET — Candidates in INTERVIEW status
export async function GET(request: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    // From JobApplications
    const appCandidates = await prisma.jobApplication.findMany({
      where: { status: "INTERVIEW" },
      include: { job: { select: { id: true, title: true } } },
      orderBy: { updatedAt: "desc" },
    });

    // From manual Candidates
    const manualCandidates = await prisma.candidate.findMany({
      where: { status: "INTERVIEW", isDeleted: false },
      orderBy: { updatedAt: "desc" },
    });

    return NextResponse.json({ candidates: [...appCandidates, ...manualCandidates] });
  } catch (err) {
    console.error("Interview candidates GET error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

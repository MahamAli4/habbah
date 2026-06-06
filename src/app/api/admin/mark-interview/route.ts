import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";

export async function POST(request: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const { applicationId, candidateName, candidateEmail, jobTitle, jobId, interviewDate, interviewTime } = await request.json();

    if (!interviewDate || !interviewTime) {
      return NextResponse.json({ error: "Date and time required" }, { status: 400 });
    }

    // Update JobApplication if applicationId provided
    if (applicationId) {
      await prisma.jobApplication.update({
        where: { id: applicationId },
        data: {
          status: "INTERVIEW",
          interviewDate,
          interviewTime,
        },
      });
    }

    // Audit log
    await prisma.auditLog.create({
      data: {
        action: `Interview scheduled for ${candidateName} — ${jobTitle} on ${interviewDate} at ${interviewTime}`,
        performedBy: session.user.email,
        targetType: "JobApplication",
        targetId: applicationId || null,
      },
    }).catch(() => {});

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Mark interview error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

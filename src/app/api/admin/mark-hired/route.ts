import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";

export async function POST(request: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const { candidateId, candidateName, candidateEmail, jobTitle, jobId, applicationId } = await request.json();

    // Update application status
    if (applicationId) {
      await prisma.jobApplication.update({
        where: { id: applicationId },
        data: { status: "HIRED" },
      });
    } else if (candidateId) {
      await prisma.candidate.update({
        where: { id: candidateId },
        data: { status: "HIRED" },
      });
    }

    // Audit log
    await prisma.auditLog.create({
      data: {
        action: `${candidateName} marked as HIRED for ${jobTitle}`,
        performedBy: session.user.email,
        targetType: applicationId ? "JobApplication" : "Candidate",
        targetId: applicationId || candidateId,
      },
    }).catch(() => {});

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Mark hired error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// POST — Public job application submission
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ jobId: string }> }
) {
  const { jobId } = await params;
  const id = parseInt(jobId);
  if (isNaN(id)) return NextResponse.json({ error: "Invalid job ID" }, { status: 400 });

  try {
    const body = await request.json();
    const { applicantName, applicantEmail, applicantPhone, coverLetter, experience, education } = body;

    if (!applicantName || !applicantEmail) {
      return NextResponse.json({ error: "Name and email are required" }, { status: 400 });
    }

    // Check job exists and is active
    const job = await prisma.job.findFirst({
      where: { id, isDeleted: false, isActive: true },
    });

    if (!job) {
      return NextResponse.json({ error: "Job not found or no longer active" }, { status: 404 });
    }

    const application = await prisma.jobApplication.create({
      data: {
        jobId: id,
        applicantName,
        applicantEmail,
        applicantPhone: applicantPhone || null,
        coverLetter: coverLetter || null,
        experience: experience || null,
        education: education || null,
        status: "PENDING",
      },
    });

    return NextResponse.json({ success: true, application }, { status: 201 });
  } catch (err) {
    console.error("Apply error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

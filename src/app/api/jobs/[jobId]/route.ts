import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";

// GET — Single job
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ jobId: string }> }
) {
  const { jobId } = await params;
  const id = parseInt(jobId);
  if (isNaN(id)) return NextResponse.json({ error: "Invalid job ID" }, { status: 400 });

  const job = await prisma.job.findUnique({ where: { id } });
  if (!job) return NextResponse.json({ error: "Job not found" }, { status: 404 });

  return NextResponse.json({ job });
}

// PUT — Update job (admin only)
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ jobId: string }> }
) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { jobId } = await params;
  const id = parseInt(jobId);
  if (isNaN(id)) return NextResponse.json({ error: "Invalid job ID" }, { status: 400 });

  try {
    const body = await request.json();
    const updated = await prisma.job.update({
      where: { id },
      data: {
        title: body.title,
        description: body.description,
        location: body.location,
        jobType: body.jobType,
        category: body.category || null,
        department: body.department || null,
        employmentLevel: body.employmentLevel || null,
        requirements: body.requirements || null,
        responsibilities: body.responsibilities || null,
        qualifications: body.qualifications || null,
        deadlineAt: body.deadlineAt ? new Date(body.deadlineAt) : null,
      },
    });

    await prisma.auditLog.create({
      data: {
        action: `Updated job: ${updated.title}`,
        performedBy: session.user.email,
        targetType: "Job",
        targetId: id,
      },
    }).catch(() => {});

    return NextResponse.json({ job: updated });
  } catch (err) {
    console.error("Job PUT error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

// DELETE — Soft delete job (admin only)
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ jobId: string }> }
) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { jobId } = await params;
  const id = parseInt(jobId);
  if (isNaN(id)) return NextResponse.json({ error: "Invalid job ID" }, { status: 400 });

  try {
    const job = await prisma.job.update({
      where: { id },
      data: { isDeleted: true, isActive: false },
    });

    await prisma.auditLog.create({
      data: {
        action: `Deleted job: ${job.title}`,
        performedBy: session.user.email,
        targetType: "Job",
        targetId: id,
      },
    }).catch(() => {});

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Job DELETE error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

// PATCH — Restore job (SUPER_ADMIN only)
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ jobId: string }> }
) {
  const session = await getSession();
  if (!session || session.user.role !== "SUPER_ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { jobId } = await params;
  const id = parseInt(jobId);
  if (isNaN(id)) return NextResponse.json({ error: "Invalid job ID" }, { status: 400 });

  try {
    const body = await request.json();
    const job = await prisma.job.update({
      where: { id },
      data: { isDeleted: body.isDeleted ?? false, isActive: !(body.isDeleted ?? false) },
    });

    return NextResponse.json({ job });
  } catch (err) {
    console.error("Job PATCH error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

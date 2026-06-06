import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";

// GET — Public list of active jobs
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const includeDeleted = searchParams.get("includeDeleted") === "true";

    const session = await getSession();
    const isAdmin = !!session;

    const where = isAdmin && includeDeleted
      ? {}
      : { isDeleted: false, isActive: true };

    const jobs = await prisma.job.findMany({
      where,
      orderBy: { createdAt: "desc" },
      include: {
        _count: { select: { applications: true } },
      },
    });

    return NextResponse.json({ jobs });
  } catch (err) {
    console.error("Jobs GET error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

// POST — Create new job (admin only)
export async function POST(request: NextRequest) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const {
      title, description, location, jobType, category,
      department, employmentLevel, requirements, responsibilities,
      qualifications, deadlineAt,
    } = body;

    if (!title || !description) {
      return NextResponse.json({ error: "Title and description required" }, { status: 400 });
    }

    const job = await prisma.job.create({
      data: {
        title,
        description,
        location: location || "Karachi",
        jobType: jobType || "FULL_TIME",
        category: category || null,
        department: department || null,
        employmentLevel: employmentLevel || null,
        requirements: requirements || null,
        responsibilities: responsibilities || null,
        qualifications: qualifications || null,
        deadlineAt: deadlineAt ? new Date(deadlineAt) : null,
        isActive: true,
      },
    });

    // Audit log
    await prisma.auditLog.create({
      data: {
        action: `Created job: ${title}`,
        performedBy: session.user.email,
        targetType: "Job",
        targetId: job.id,
      },
    }).catch(() => {});

    return NextResponse.json({ job }, { status: 201 });
  } catch (err) {
    console.error("Jobs POST error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

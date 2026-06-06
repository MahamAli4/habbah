import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";

// POST — Accept / Reject volunteer
export async function POST(request: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const { id, action, date, time } = await request.json();

    if (!id || !action) {
      return NextResponse.json({ error: "id and action required" }, { status: 400 });
    }

    const statusMap: Record<string, string> = {
      ACCEPT: "ACCEPTED",
      REJECT: "REJECTED",
      INTERVIEW: "INTERVIEW",
    };

    const status = statusMap[action.toUpperCase()];
    if (!status) {
      return NextResponse.json({ error: "Invalid action" }, { status: 400 });
    }

    await prisma.volunteer.update({
      where: { id },
      data: {
        status: status as any,
        meetingDate: date || null,
        meetingTime: time || null,
      },
    });

    await prisma.auditLog.create({
      data: {
        action: `Volunteer ID ${id} ${status.toLowerCase()}`,
        performedBy: session.user.email,
        targetType: "Volunteer",
        targetId: id,
      },
    }).catch(() => {});

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Volunteer respond error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

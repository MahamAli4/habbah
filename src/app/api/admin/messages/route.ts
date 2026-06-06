import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";

// GET — Load all messages (admin only)
export async function GET(request: NextRequest) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const messages = await prisma.message.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json({ messages });
  } catch (err) {
    console.error("Messages GET error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

// DELETE — Soft delete messages
export async function DELETE(request: NextRequest) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { messageIds } = await request.json();
    if (!messageIds || !Array.isArray(messageIds)) {
      return NextResponse.json({ error: "messageIds array required" }, { status: 400 });
    }

    await prisma.message.updateMany({
      where: { id: { in: messageIds } },
      data: {
        isDeleted: true,
        deletedBy: session.user.email,
        deletedAt: new Date(),
      },
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Messages DELETE error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

// PATCH — Restore deleted messages (SUPER_ADMIN only)
export async function PATCH(request: NextRequest) {
  const session = await getSession();
  if (!session || session.user.role !== "SUPER_ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { messageIds } = await request.json();
    if (!messageIds || !Array.isArray(messageIds)) {
      return NextResponse.json({ error: "messageIds array required" }, { status: 400 });
    }

    await prisma.message.updateMany({
      where: { id: { in: messageIds } },
      data: { isDeleted: false, deletedBy: null, deletedAt: null },
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Messages PATCH error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

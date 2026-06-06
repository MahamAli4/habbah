import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";

// GET — All candidates (admin only)
export async function GET(request: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const candidates = await prisma.candidate.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json({ candidates });
  } catch (err) {
    console.error("Candidates GET error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

// POST — Add candidate manually (admin only)
export async function POST(request: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const { name, email, phone, position, experience, education } = await request.json();

    if (!name || !email || !position) {
      return NextResponse.json({ error: "Name, email, position required" }, { status: 400 });
    }

    const candidate = await prisma.candidate.create({
      data: { name, email, phone: phone || null, position, experience: experience || null, education: education || null },
    });

    return NextResponse.json({ candidate }, { status: 201 });
  } catch (err) {
    console.error("Candidates POST error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

// DELETE — Soft delete candidate
export async function DELETE(request: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const { searchParams } = new URL(request.url);
    const id = parseInt(searchParams.get("id") || "");
    if (isNaN(id)) return NextResponse.json({ error: "Invalid ID" }, { status: 400 });

    await prisma.candidate.update({ where: { id }, data: { isDeleted: true } });
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Candidates DELETE error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

// PATCH — Restore candidate (SUPER_ADMIN)
export async function PATCH(request: NextRequest) {
  const session = await getSession();
  if (!session || session.user.role !== "SUPER_ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const id = parseInt(searchParams.get("id") || "");
    if (isNaN(id)) return NextResponse.json({ error: "Invalid ID" }, { status: 400 });

    await prisma.candidate.update({ where: { id }, data: { isDeleted: false } });
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Candidates PATCH error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";

export async function POST(request: NextRequest) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("habbah_session")?.value;

    if (token) {
      await prisma.session.deleteMany({ where: { token } });
      cookieStore.set("habbah_session", "", {
        httpOnly: true,
        expires: new Date(0),
        path: "/",
      });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Logout error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

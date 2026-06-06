import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";

export async function GET(request: NextRequest) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const pageName = searchParams.get("pageName");

    if (!pageName) {
      return NextResponse.json({ error: "pageName is required" }, { status: 400 });
    }

    const records = await prisma.cmsContent.findMany({
      where: { pageId: pageName },
    });

    const data = records.map((r) => ({
      key: r.tab,
      value: typeof r.content === "string" ? r.content : JSON.stringify(r.content),
    }));

    return NextResponse.json(data);
  } catch (error) {
    console.error("CMS GET error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { pageName, key, value } = body;

    if (!pageName || !key || value === undefined) {
      return NextResponse.json({ error: "pageName, key, and value are required" }, { status: 400 });
    }

    const content = typeof value === "string" ? value : JSON.stringify(value);

    await prisma.cmsContent.upsert({
      where: { pageId_tab: { pageId: pageName, tab: key } },
      update: { content, updatedBy: session.user.email },
      create: { pageId: pageName, tab: key, content, updatedBy: session.user.email },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("CMS POST error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";

// POST — Send interview email (uses Nodemailer / SMTP)
export async function POST(request: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const {
      candidateName,
      candidateEmail,
      interviewDate,
      interviewTime,
      position,
    } = await request.json();

    if (!candidateName || !candidateEmail || !interviewDate || !interviewTime) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // If SMTP not configured, skip email but still return success
    if (!process.env.SMTP_USER || process.env.SMTP_USER === "your-email@gmail.com") {
      console.log(`[EMAIL SKIPPED] Would send interview email to ${candidateEmail}`);
      return NextResponse.json({ success: true, note: "SMTP not configured, email skipped" });
    }

    const nodemailer = await import("nodemailer");
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || "smtp.gmail.com",
      port: parseInt(process.env.SMTP_PORT || "587"),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.SMTP_FROM || process.env.SMTP_USER,
      to: candidateEmail,
      subject: `Interview Invitation — ${position} | Habbah Educational Trust`,
      html: `
        <div style="font-family: 'Montserrat', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #f9fafb; padding: 40px 20px;">
          <div style="background: #03045e; border-radius: 20px; padding: 40px; text-align: center; margin-bottom: 30px;">
            <h1 style="color: #ffc300; font-size: 28px; margin: 0 0 10px;">Habbah Educational Trust</h1>
            <p style="color: #00bfe6; margin: 0; font-weight: bold; text-transform: uppercase; letter-spacing: 3px; font-size: 12px;">Interview Invitation</p>
          </div>
          
          <div style="background: white; border-radius: 20px; padding: 40px; box-shadow: 0 4px 20px rgba(3,4,94,0.08);">
            <p style="color: #03045e; font-size: 18px; font-weight: bold;">Dear ${candidateName},</p>
            <p style="color: #36454f; line-height: 1.7;">We are pleased to invite you for an interview for the position of <strong style="color: #03045e;">${position}</strong> at Habbah Educational Trust.</p>
            
            <div style="background: #03045e; border-radius: 16px; padding: 30px; margin: 30px 0; text-align: center;">
              <p style="color: #ffc300; font-size: 12px; text-transform: uppercase; letter-spacing: 3px; margin: 0 0 15px;">Interview Schedule</p>
              <p style="color: white; font-size: 24px; font-weight: bold; margin: 0 0 8px;">📅 ${interviewDate}</p>
              <p style="color: #00bfe6; font-size: 20px; font-weight: bold; margin: 0;">🕐 ${interviewTime}</p>
            </div>
            
            <p style="color: #36454f; line-height: 1.7;">Please confirm your attendance by replying to this email. Bring a copy of your CV and any relevant documents.</p>
            <p style="color: #36454f; line-height: 1.7;">We look forward to meeting you!</p>
            
            <p style="color: #03045e; font-weight: bold; margin-top: 30px;">Best Regards,<br/>HR Team<br/><span style="color: #00bfe6;">Habbah Educational Trust</span></p>
          </div>
          
          <p style="text-align: center; color: #9ca3af; font-size: 12px; margin-top: 20px;">F-100, Block-B, North Nazimabad, Karachi | habbahclub@gmail.com</p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Email send error:", err);
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
  }
}

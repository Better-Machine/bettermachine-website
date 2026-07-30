import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

// Rate limiting: 5 requests per 10 minutes per IP
const rateLimitMap = new Map<string, number[]>();
const RATE_LIMIT = 5;
const RATE_WINDOW_MS = 10 * 60 * 1000;

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const timestamps = rateLimitMap.get(ip) || [];
  const recent = timestamps.filter((t) => now - t < RATE_WINDOW_MS);
  
  if (recent.length >= RATE_LIMIT) {
    rateLimitMap.set(ip, recent);
    return false;
  }
  
  recent.push(now);
  rateLimitMap.set(ip, recent);
  return true;
}

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for") || "unknown";
  
  if (!checkRateLimit(ip)) {
    return NextResponse.json(
      { error: "Too many requests. Please try again later." },
      { status: 429 }
    );
  }

  let body: { name: string; email: string; message: string; subject?: string };
  
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 }
    );
  }

  const { name, email, message, subject } = body;

  // Validation
  if (!name || !email || !message) {
    return NextResponse.json(
      { error: "Name, email, and message are required" },
      { status: 400 }
    );
  }

  if (message.length > 5000) {
    return NextResponse.json(
      { error: "Message too long (max 5000 characters)" },
      { status: 400 }
    );
  }

  // Configure SMTP — use a simple Nodemailer transport
  // The environment should have SMTP configured via:
  //   SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, SMTP_TLS
  const smtpHost = process.env.SMTP_HOST;
  const smtpPort = parseInt(process.env.SMTP_PORT || "587", 10);
  const smtpUser = process.env.SMTP_USER || "";
  const smtpPass = process.env.SMTP_PASS || "";
  const smtpTLS = process.env.SMTP_TLS === "false" ? false : true;

  if (!smtpHost) {
    // In development, simulate delivery
    console.log("[Contact Form] (dev mode) Message would be sent:");
    console.log(`  From: ${name} <${email}>`);
    console.log(`  To: info@bettermachine.ai`);
    console.log(`  Subject: ${subject || "Contact Form"}\n  Body: ${message}`);
    
    return NextResponse.json({ success: true });
  }

  const transporter = nodemailer.createTransport({
    host: smtpHost,
    port: smtpPort,
    secure: smtpTLS && smtpPort === 465,
    auth: smtpUser ? { user: smtpUser, pass: smtpPass } : undefined,
  });

  try {
    await transporter.sendMail({
      from: `"${name}" <${smtpUser || "noreply@bettermachine.ai"}>`,
      to: "info@bettermachine.ai",
      replyTo: email,
      subject: subject ? `Better Machine: ${subject}` : "Contact Form Submission",
      text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
      html: `
        <div style="font-family: system-ui, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px;">
          <h2 style="color: #B87333; margin-bottom: 16px;">New Contact Form Submission</h2>
          <div style="background: #111; border: 1px solid #2A2A2A; border-radius: 8px; padding: 16px; margin-bottom: 16px;">
            <p><strong>From:</strong> ${name}</p>
            <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
            ${subject ? `<p><strong>Subject:</strong> ${subject}</p>` : ""}
          </div>
          <div style="background: #1A1A1A; border: 1px solid #2A2A2A; border-radius: 8px; padding: 16px;">
            <p style="white-space: pre-wrap; margin: 0;">${message}</p>
          </div>
          <p style="color: #6B6B6B; font-size: 12px; margin-top: 16px;">
            Submitted from bettermachine.ai on ${new Date().toISOString()}
          </p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[Contact Form] SMTP error:", error);
    return NextResponse.json(
      { error: "Failed to send message. Please try again or email us directly." },
      { status: 500 }
    );
  }
}

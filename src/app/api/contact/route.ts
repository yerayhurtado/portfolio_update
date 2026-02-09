import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  try {
    const { name, email, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const {
      SMTP_HOST,
      SMTP_PORT,
      SMTP_USER,
      SMTP_PASS,
      CONTACT_TO_EMAIL,
    } = process.env;

    if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS || !CONTACT_TO_EMAIL) {
      console.error("SMTP environment variables are not fully set");
      return NextResponse.json(
        { error: "Email service not configured on the server" },
        { status: 500 }
      );
    }

    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: Number(SMTP_PORT),
      secure: Number(SMTP_PORT) === 465,
      auth: {
        user: SMTP_USER,
        pass: SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Portfolio Contact" <${SMTP_USER}>`,
      to: CONTACT_TO_EMAIL,
      replyTo: email,
      subject: `Nuevo mensaje desde el portfolio de ${name}`,
      text: `
Nombre: ${name}
Email: ${email}

Mensaje:
${message}
      `.trim(),
      html: `
        <h2>Nuevo mensaje desde el portfolio</h2>
        <p><strong>Nombre:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Mensaje:</strong></p>
        <p style="white-space:pre-line;">${message}</p>
      `,
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Error sending contact email", error);
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
  }
}


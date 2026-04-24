// src/app/api/lead/route.ts
import { NextResponse } from "next/server";
import { google } from "googleapis";
import nodemailer from "nodemailer";

const SPREADSHEET_ID = process.env.GOOGLE_SHEET_ID!;
const GOOGLE_CLIENT_EMAIL = process.env.GOOGLE_CLIENT_EMAIL!;
const GOOGLE_PRIVATE_KEY = process.env.GOOGLE_PRIVATE_KEY!.replace(/\\n/g, "\n");
const SMTP_USER = process.env.SMTP_USER!;
const SMTP_PASS = process.env.SMTP_PASS!;

export async function POST(request: Request) {
  // Validação de ambiente
  const requiredEnv = ['GOOGLE_SHEET_ID', 'GOOGLE_CLIENT_EMAIL', 'GOOGLE_PRIVATE_KEY', 'SMTP_USER', 'SMTP_PASS'];
  for (const env of requiredEnv) {
    if (!process.env[env]) {
      console.error(`Missing env: ${env}`);
      return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
    }
  }

  try {
    const body = await request.json();
    const { nome, email, empresa, whatsapp, segmento, resultadoCalculadora } = body;

    if (!nome || !email || !empresa) {
      return NextResponse.json({ error: "Campos obrigatórios" }, { status: 400 });
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "E-mail inválido" }, { status: 400 });
    }

    // Google Sheets
    const auth = new google.auth.JWT({
      email: GOOGLE_CLIENT_EMAIL,
      key: GOOGLE_PRIVATE_KEY,
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });
    const sheets = google.sheets({ version: "v4", auth });
    await sheets.spreadsheets.values.append({
      spreadsheetId: SPREADSHEET_ID,
      range: "Leads!A:F",
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [[
          new Date().toISOString(),
          nome,
          email,
          empresa,
          whatsapp || "",
          segmento || "",
          JSON.stringify(resultadoCalculadora || {}),
        ]],
      },
    });

    // Envio de email
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: { user: SMTP_USER, pass: SMTP_PASS },
    });
    await transporter.sendMail({
      from: `"Aero Drone Solutions" <${SMTP_USER}>`,
      to: email,
      subject: `Análise de ROI - Aero Drone Solutions (${segmento || "Geral"})`,
      html: `
        <h2>Olá ${nome},</h2>
        <p>Recebemos sua solicitação de análise de ROI para operação com drones autônomos.</p>
        <p><strong>Segmento:</strong> ${segmento || "Não informado"}</p>
        <p><strong>Resultado da simulação:</strong></p>
        <pre>${JSON.stringify(resultadoCalculadora, null, 2)}</pre>
        <p>Em breve um especialista entrará em contato para aprofundar a análise.</p>
        <p>Atenciosamente,<br/>Equipe Aero Drone Solutions</p>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Erro ao salvar lead:", error);
    return NextResponse.json({ error: "Erro interno" }, { status: 500 });
  }
}
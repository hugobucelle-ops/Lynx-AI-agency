import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

// Resend is initialized lazily inside the handler to avoid build-time errors when the env var is missing
function getResend() {
  return new Resend(process.env.RESEND_API_KEY);
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { nombre, email, empresa, mensaje, servicio } = body;

    if (!nombre || !email || !mensaje) {
      return NextResponse.json({ error: "Campos requeridos" }, { status: 400 });
    }

    const servicioLabel: Record<string, string> = {
      auditoria: "Auditoría IA — 50€",
      "geo-seo": "Servicio GEO + SEO Local completo",
      geo: "Solo GEO",
      "seo-local": "Solo SEO Local",
      consulta: "Solo información",
    };

    const resend = getResend();
    await resend.emails.send({
      from: "LYNX Web <onboarding@resend.dev>",
      to: ["lynx.geo.agency@gmail.com"],
      replyTo: email,
      subject: `[LYNX Web] Nuevo contacto de ${nombre}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 32px;">
          <h2 style="color: #00CFFF; margin-bottom: 24px;">Nuevo contacto desde lynxai.agency</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #eee; width: 120px; font-weight: bold; color: #555;">Nombre</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #eee;">${nombre}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #eee; font-weight: bold; color: #555;">Email</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #eee;"><a href="mailto:${email}">${email}</a></td>
            </tr>
            ${empresa ? `<tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #eee; font-weight: bold; color: #555;">Empresa</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #eee;">${empresa}</td>
            </tr>` : ""}
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #eee; font-weight: bold; color: #555;">Servicio</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #eee;">${servicioLabel[servicio] || servicio}</td>
            </tr>
            <tr>
              <td style="padding: 16px 0; vertical-align: top; font-weight: bold; color: #555;">Mensaje</td>
              <td style="padding: 16px 0; line-height: 1.6;">${mensaje.replace(/\n/g, "<br>")}</td>
            </tr>
          </table>
          <div style="margin-top: 24px; padding: 16px; background: #f5f5f5; border-radius: 8px; font-size: 12px; color: #888;">
            Enviado desde lynxai.agency · LYNX AI Agency
          </div>
        </div>
      `,
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}

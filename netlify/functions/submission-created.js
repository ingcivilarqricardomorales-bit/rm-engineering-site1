const sanitize = (value, maxLength = 500) =>
  String(value ?? "")
    .replace(/[\u0000-\u001f\u007f]/g, "")
    .replace(/[<>]/g, "")
    .trim()
    .slice(0, maxLength);

const escapeHtml = (value) =>
  String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

const isValidEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i.test(value);

async function sendEmail({ apiKey, payload }) {
  const response = await fetch("https://api.sendgrid.com/v3/mail/send", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const detail = await response.text();
    throw new Error(`SendGrid ${response.status}: ${detail.slice(0, 800)}`);
  }
}

exports.handler = async (event) => {
  try {
    const { SENDGRID_API_KEY, MAIL_TO, MAIL_FROM, MAIL_FROM_NAME = "RM Engineering" } = process.env;

    if (!SENDGRID_API_KEY || !MAIL_TO || !MAIL_FROM) {
      console.error("Missing required mail environment variables");
      return { statusCode: 500, body: "Configuración de correo incompleta" };
    }

    const requestBody = JSON.parse(event.body || "{}");
    const formData = requestBody?.payload?.data || {};

    if (formData.company_website || formData["bot-field"]) {
      return { statusCode: 200, body: "OK" };
    }

    const formStartedAt = Number(formData.formStartedAt);
    if (Number.isFinite(formStartedAt) && formStartedAt > 0 && Date.now() - formStartedAt < 2500) {
      console.warn("Rejected implausibly fast form submission");
      return { statusCode: 200, body: "OK" };
    }

    const data = {
      name: sanitize(formData.name, 80),
      email: sanitize(formData.email, 120).toLowerCase(),
      phone: sanitize(formData.phone, 40),
      service: sanitize(formData.service, 100),
      location: sanitize(formData.location, 120),
      stage: sanitize(formData.stage, 100),
      message: sanitize(formData.message, 5000),
      privacyConsent: sanitize(formData.privacyConsent, 20),
    };

    if (!data.name || !isValidEmail(data.email) || !data.message || data.privacyConsent !== "accepted") {
      console.warn("Rejected invalid contact form submission", {
        hasName: Boolean(data.name),
        validEmail: isValidEmail(data.email),
        hasMessage: Boolean(data.message),
        privacyConsent: data.privacyConsent,
      });
      return { statusCode: 400, body: "Datos obligatorios inválidos" };
    }

    const safe = Object.fromEntries(Object.entries(data).map(([key, value]) => [key, escapeHtml(value)]));
    const subjectService = data.service || "Proyecto";

    const textContent = [
      "Nueva solicitud desde RM Engineering",
      "",
      `Nombre: ${data.name}`,
      `Correo: ${data.email}`,
      `Teléfono: ${data.phone || "No indicado"}`,
      `Servicio: ${data.service || "No indicado"}`,
      `Ubicación: ${data.location || "No indicada"}`,
      `Etapa: ${data.stage || "No indicada"}`,
      "",
      "Descripción:",
      data.message,
    ].join("\n");

    const htmlContent = `
      <div style="font-family:Arial,sans-serif;color:#17201c;line-height:1.55;max-width:720px">
        <div style="background:#123e34;color:#fff;padding:24px 26px">
          <div style="font-size:12px;letter-spacing:1.6px;text-transform:uppercase;color:#efcf88">Nueva solicitud web</div>
          <h1 style="font-size:25px;margin:8px 0 0">RM Engineering &amp; Architectural Design</h1>
        </div>
        <table cellpadding="9" cellspacing="0" style="width:100%;border-collapse:collapse;margin-top:18px">
          <tr><td style="border-bottom:1px solid #e0ddd5;width:145px"><strong>Nombre</strong></td><td style="border-bottom:1px solid #e0ddd5">${safe.name}</td></tr>
          <tr><td style="border-bottom:1px solid #e0ddd5"><strong>Correo</strong></td><td style="border-bottom:1px solid #e0ddd5">${safe.email}</td></tr>
          <tr><td style="border-bottom:1px solid #e0ddd5"><strong>Teléfono</strong></td><td style="border-bottom:1px solid #e0ddd5">${safe.phone || "No indicado"}</td></tr>
          <tr><td style="border-bottom:1px solid #e0ddd5"><strong>Servicio</strong></td><td style="border-bottom:1px solid #e0ddd5">${safe.service || "No indicado"}</td></tr>
          <tr><td style="border-bottom:1px solid #e0ddd5"><strong>Ubicación</strong></td><td style="border-bottom:1px solid #e0ddd5">${safe.location || "No indicada"}</td></tr>
          <tr><td style="border-bottom:1px solid #e0ddd5"><strong>Etapa</strong></td><td style="border-bottom:1px solid #e0ddd5">${safe.stage || "No indicada"}</td></tr>
        </table>
        <h2 style="font-size:18px;margin:26px 0 8px">Descripción del proyecto</h2>
        <div style="white-space:pre-wrap;background:#f4f1ea;padding:18px;border-left:4px solid #e3ac3d">${safe.message}</div>
      </div>`;

    await sendEmail({
      apiKey: SENDGRID_API_KEY,
      payload: {
        personalizations: [{
          to: [{ email: MAIL_TO }],
          subject: `Nueva consulta web: ${subjectService}`,
        }],
        from: { email: MAIL_FROM, name: MAIL_FROM_NAME },
        reply_to: { email: data.email, name: data.name },
        content: [
          { type: "text/plain", value: textContent },
          { type: "text/html", value: htmlContent },
        ],
      },
    });

    return { statusCode: 200, body: "OK" };
  } catch (error) {
    console.error("submission-created", error);
    return { statusCode: 500, body: "No fue posible procesar el correo" };
  }
};

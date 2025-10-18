import sgMail from "@sendgrid/mail";

const sanitize = (s) => String(s || "")
  .replace(/[\u0000-\u001f\u007f]/g, "")
  .replace(/[<>]/g, "");

const isEmail = (s) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(String(s||""));

const get = (obj, keys) => { for (const k of keys) if (obj && obj[k]) return String(obj[k]); return ""; };
const esc = (s) => String(s)
  .replaceAll("&","&amp;")
  .replaceAll("<","&lt;")
  .replaceAll(">","&gt;")
  .replaceAll('"',"&quot;")
  .replaceAll("'","&#039;");

export const handler = async (event) => {
  try {
    const { SENDGRID_API_KEY, MAIL_TO, MAIL_FROM } = process.env;
    if (!SENDGRID_API_KEY || !MAIL_TO || !MAIL_FROM) {
      return { statusCode: 500, body: "Faltan variables de entorno" };
    }
    sgMail.setApiKey(SENDGRID_API_KEY);

    const parsed = JSON.parse(event.body || "{}");
    const payload = parsed?.payload || {};
    const data = payload?.data || {};

    if (data["bot-field"]) {
      return { statusCode: 200, body: "OK" };
    }

    const rawName = get(data, ["name", "nombre", "full_name"]);
    const rawEmail = get(data, ["email", "correo", "replyto"]);
    const rawSubject = get(data, ["subject", "asunto"]) || "Nuevo mensaje";
    const rawMessage = get(data, ["message", "mensaje", "body"]);

    const name = sanitize(rawName).slice(0, 80);
    const email = sanitize(rawEmail).slice(0, 120);
    const subject = sanitize(rawSubject).slice(0, 120);
    const message = sanitize(rawMessage).slice(0, 5000);

    if (!name || !isEmail(email) || !message) {
      return { statusCode: 400, body: "Datos inválidos" };
    }

    await sgMail.send({
      to: MAIL_TO,
      from: MAIL_FROM,
      replyTo: email,
      subject: `Contacto: ${subject}`,
      html: `
        <h2>Nuevo contacto desde <strong>RM Engineering</strong></h2>
        <p><strong>Nombre:</strong> ${esc(name)}</p>
        <p><strong>Email:</strong> ${esc(email)}</p>
        <p><strong>Asunto:</strong> ${esc(subject)}</p>
        <p><strong>Mensaje:</strong></p>
        <pre style="white-space:pre-wrap">${esc(message)}</pre>
      `,
    });

    return { statusCode: 200, body: "OK" };
  } catch (e) {
    console.error("Email error:", e);
    return { statusCode: 500, body: "Email error" };
  }
};

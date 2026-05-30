/** Gửi email thông báo khách mới → Phuocduocvt13@gmail.com (+ admin nếu cấu hình RESEND) */
const DEFAULT_TO = "Phuocduocvt13@gmail.com";

function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

async function sendViaResend({ to, subject, html }) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return false;

  const from =
    process.env.RESEND_FROM?.trim() ||
    "Phuoc Lai Luxury <onboarding@resend.dev>";

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ from, to, subject, html }),
  });

  if (!res.ok) {
    const text = await res.text();
    console.error("[notify-lead] Resend error:", text);
    return false;
  }
  return true;
}

async function sendViaFormSubmit({ to, subject, fields }) {
  const res = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(to)}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      _subject: subject,
      _template: "table",
      _captcha: "false",
      ...fields,
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    console.error("[notify-lead] FormSubmit error:", text);
    return false;
  }
  return true;
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const body = req.body ?? {};
    const name = String(body.name ?? "").trim();
    const phone = String(body.phone ?? "").trim();
    const serviceInterest = String(body.serviceInterest ?? "").trim();
    const note = String(body.note ?? "").trim();
    const source = String(body.source ?? "Website").trim();

    if (!name || !phone) {
      return res.status(400).json({ error: "Missing name or phone" });
    }

    const adminEmail = process.env.NOTIFY_ADMIN_EMAIL?.trim() || DEFAULT_TO;
    const recipients = [...new Set([DEFAULT_TO, adminEmail].filter(Boolean))];

    const subject = `[Phuoc Lai Luxury] Khách mới — ${name}`;
    const html = `
      <h2>Khách hàng gửi form mới</h2>
      <p><strong>Nguồn:</strong> ${escapeHtml(source)}</p>
      <p><strong>Họ tên:</strong> ${escapeHtml(name)}</p>
      <p><strong>SĐT:</strong> ${escapeHtml(phone)}</p>
      <p><strong>Dịch vụ / khóa học:</strong> ${escapeHtml(serviceInterest || "—")}</p>
      <p><strong>Ghi chú:</strong><br/>${escapeHtml(note || "—").replace(/\n/g, "<br/>")}</p>
      <hr/>
      <p style="color:#666;font-size:12px">Xem thêm tại Admin → Khách hàng liên hệ (/adminbp/customers)</p>
    `;

    const fields = {
      Nguồn: source,
      "Họ tên": name,
      "Số điện thoại": phone,
      "Dịch vụ quan tâm": serviceInterest || "—",
      "Ghi chú": note || "—",
    };

    let sent = false;
    for (const to of recipients) {
      const ok =
        (await sendViaResend({ to, subject, html })) ||
        (await sendViaFormSubmit({ to, subject, fields }));
      sent = sent || ok;
    }

    if (!sent) {
      console.warn("[notify-lead] No email provider succeeded");
    }

    return res.status(200).json({ ok: true, emailed: sent });
  } catch (err) {
    console.error("[notify-lead]", err);
    return res.status(500).json({ error: "Notification failed" });
  }
}

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const FROM_EMAIL = "URUK Gate <onboarding@resend.dev>"; // Update to hello@urukgate.co.uk once domain is verified in Resend
const BUSINESS_EMAIL = process.env.BUSINESS_EMAIL!;
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

type BookingEmailData = {
  customerName: string;
  customerEmail: string;
  serviceName: string;
  bookingDate: string;
  bookingTime: string;
  bookingRef: string;
  meetLink: string;
  zoomPassword?: string;
  servicePrice: number;
};

// ─── Customer confirmation email ────────────────────────────────────────────

export async function sendCustomerConfirmation(data: BookingEmailData) {
  const { customerName, customerEmail, serviceName, bookingDate, bookingTime,
    bookingRef, meetLink, zoomPassword, servicePrice } = data;

  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Booking Confirmed — URUK Gate</title>
</head>
<body style="margin:0;padding:0;background:#050810;font-family:Inter,system-ui,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#050810;padding:40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

          <!-- Header -->
          <tr>
            <td style="background:linear-gradient(135deg,#6366f1,#8b5cf6);border-radius:16px 16px 0 0;padding:32px;text-align:center;">
              <div style="font-size:28px;font-weight:800;color:#ffffff;letter-spacing:-0.5px;">
                ✦ URUK Gate
              </div>
              <div style="font-size:14px;color:rgba(255,255,255,0.8);margin-top:6px;">
                Software That Grows With Your Business
              </div>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="background:#0d1224;padding:40px 32px;border-left:1px solid #1e2a45;border-right:1px solid #1e2a45;">

              <!-- Success badge -->
              <div style="text-align:center;margin-bottom:28px;">
                <div style="display:inline-block;background:rgba(34,197,94,0.1);border:1px solid rgba(34,197,94,0.3);border-radius:100px;padding:8px 20px;color:#22c55e;font-size:13px;font-weight:600;">
                  ✓ Booking Confirmed
                </div>
              </div>

              <h1 style="color:#f1f5f9;font-size:24px;font-weight:700;margin:0 0 8px;">
                Hi ${customerName},
              </h1>
              <p style="color:#64748b;font-size:15px;line-height:1.6;margin:0 0 28px;">
                Your booking is confirmed and your Zoom meeting has been created.
                Here are all the details you need.
              </p>

              <!-- Booking details card -->
              <div style="background:#141830;border:1px solid #1e2a45;border-radius:12px;padding:24px;margin-bottom:24px;">
                <div style="color:#64748b;font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:1px;margin-bottom:16px;">
                  Booking Details
                </div>
                <table width="100%" cellpadding="0" cellspacing="0">
                  <tr>
                    <td style="padding:8px 0;border-bottom:1px solid #1e2a45;">
                      <span style="color:#64748b;font-size:13px;">Reference</span>
                    </td>
                    <td style="padding:8px 0;border-bottom:1px solid #1e2a45;text-align:right;">
                      <span style="color:#6366f1;font-weight:700;font-family:monospace;font-size:13px;">${bookingRef}</span>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding:8px 0;border-bottom:1px solid #1e2a45;">
                      <span style="color:#64748b;font-size:13px;">Service</span>
                    </td>
                    <td style="padding:8px 0;border-bottom:1px solid #1e2a45;text-align:right;">
                      <span style="color:#f1f5f9;font-size:13px;font-weight:500;">${serviceName}</span>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding:8px 0;border-bottom:1px solid #1e2a45;">
                      <span style="color:#64748b;font-size:13px;">Date</span>
                    </td>
                    <td style="padding:8px 0;border-bottom:1px solid #1e2a45;text-align:right;">
                      <span style="color:#f1f5f9;font-size:13px;font-weight:500;">${bookingDate}</span>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding:8px 0;">
                      <span style="color:#64748b;font-size:13px;">Time</span>
                    </td>
                    <td style="padding:8px 0;text-align:right;">
                      <span style="color:#f1f5f9;font-size:13px;font-weight:500;">${bookingTime} (UK time)</span>
                    </td>
                  </tr>
                </table>
              </div>

              <!-- Zoom link card -->
              <div style="background:#141830;border:1px solid rgba(99,102,241,0.3);border-radius:12px;padding:24px;margin-bottom:24px;">
                <div style="display:flex;align-items:center;margin-bottom:12px;">
                  <span style="font-size:18px;margin-right:8px;">📹</span>
                  <span style="color:#f1f5f9;font-weight:600;font-size:15px;">Your Zoom Meeting</span>
                </div>
                <a href="${meetLink}" style="display:block;background:#050810;border:1px solid #1e2a45;border-radius:8px;padding:12px 16px;color:#06b6d4;font-family:monospace;font-size:12px;text-decoration:none;word-break:break-all;margin-bottom:12px;">
                  ${meetLink}
                </a>
                ${zoomPassword ? `
                <p style="color:#64748b;font-size:13px;margin:0;">
                  Meeting password: <strong style="color:#f1f5f9;font-family:monospace;">${zoomPassword}</strong>
                </p>` : ""}
                <a href="${meetLink}" style="display:inline-block;margin-top:16px;background:linear-gradient(135deg,#6366f1,#8b5cf6);color:#ffffff;font-size:14px;font-weight:600;text-decoration:none;padding:12px 24px;border-radius:8px;">
                  Join Zoom Meeting →
                </a>
              </div>

              <!-- What to expect -->
              <div style="margin-bottom:28px;">
                <div style="color:#64748b;font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:1px;margin-bottom:12px;">
                  What To Expect
                </div>
                <div style="color:#64748b;font-size:14px;line-height:1.8;">
                  1. Add this meeting to your calendar<br/>
                  2. Join the Zoom call at the scheduled time<br/>
                  3. We'll discuss your business needs and goals<br/>
                  4. You'll receive a written proposal within 24 hours
                </div>
              </div>

              <p style="color:#64748b;font-size:13px;margin:0;">
                Questions? Reply to this email or contact us at
                <a href="mailto:${BUSINESS_EMAIL}" style="color:#6366f1;text-decoration:none;">${BUSINESS_EMAIL}</a>
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#0a0f1e;border:1px solid #1e2a45;border-top:none;border-radius:0 0 16px 16px;padding:24px 32px;text-align:center;">
              <p style="color:#64748b;font-size:12px;margin:0;">
                © ${new Date().getFullYear()} URUK Gate ·
                <a href="${SITE_URL}" style="color:#6366f1;text-decoration:none;">devcraftstudio.com</a>
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;

  return resend.emails.send({
    from: FROM_EMAIL,
    to: customerEmail,
    subject: `Booking Confirmed — ${serviceName} on ${bookingDate} at ${bookingTime}`,
    html,
  });
}

// ─── Business owner notification email ──────────────────────────────────────

export async function sendOwnerNotification(data: BookingEmailData) {
  const { customerName, customerEmail, serviceName, bookingDate, bookingTime,
    bookingRef, servicePrice } = data;

  const html = `
<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8" /></head>
<body style="margin:0;padding:0;background:#050810;font-family:Inter,system-ui,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#050810;padding:40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">
          <tr>
            <td style="background:linear-gradient(135deg,#059669,#0891b2);border-radius:16px 16px 0 0;padding:24px 32px;">
              <div style="font-size:18px;font-weight:700;color:#ffffff;">💰 New Booking — £${servicePrice}</div>
              <div style="font-size:13px;color:rgba(255,255,255,0.8);margin-top:4px;">URUK Gate · ${new Date().toLocaleString("en-GB")}</div>
            </td>
          </tr>
          <tr>
            <td style="background:#0d1224;padding:32px;border:1px solid #1e2a45;border-top:none;border-radius:0 0 16px 16px;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr><td style="padding:8px 0;border-bottom:1px solid #1e2a45;"><span style="color:#64748b;font-size:13px;">Client</span></td><td style="padding:8px 0;border-bottom:1px solid #1e2a45;text-align:right;"><span style="color:#f1f5f9;font-weight:600;font-size:13px;">${customerName}</span></td></tr>
                <tr><td style="padding:8px 0;border-bottom:1px solid #1e2a45;"><span style="color:#64748b;font-size:13px;">Email</span></td><td style="padding:8px 0;border-bottom:1px solid #1e2a45;text-align:right;"><a href="mailto:${customerEmail}" style="color:#6366f1;font-size:13px;">${customerEmail}</a></td></tr>
                <tr><td style="padding:8px 0;border-bottom:1px solid #1e2a45;"><span style="color:#64748b;font-size:13px;">Service</span></td><td style="padding:8px 0;border-bottom:1px solid #1e2a45;text-align:right;"><span style="color:#f1f5f9;font-size:13px;">${serviceName}</span></td></tr>
                <tr><td style="padding:8px 0;border-bottom:1px solid #1e2a45;"><span style="color:#64748b;font-size:13px;">Date & Time</span></td><td style="padding:8px 0;border-bottom:1px solid #1e2a45;text-align:right;"><span style="color:#f1f5f9;font-size:13px;">${bookingDate} at ${bookingTime}</span></td></tr>
                <tr><td style="padding:8px 0;border-bottom:1px solid #1e2a45;"><span style="color:#64748b;font-size:13px;">Reference</span></td><td style="padding:8px 0;border-bottom:1px solid #1e2a45;text-align:right;"><span style="color:#6366f1;font-family:monospace;font-size:13px;">${bookingRef}</span></td></tr>
                <tr><td style="padding:8px 0;"><span style="color:#64748b;font-size:13px;">Amount Paid</span></td><td style="padding:8px 0;text-align:right;"><span style="color:#22c55e;font-weight:700;font-size:16px;">£${servicePrice}</span></td></tr>
              </table>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;

  return resend.emails.send({
    from: FROM_EMAIL,
    to: BUSINESS_EMAIL,
    subject: `🎉 New Booking: ${customerName} — ${serviceName} — £${servicePrice}`,
    html,
  });
}

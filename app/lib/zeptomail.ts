import { SendMailClient } from "zeptomail";

const url = "api.zeptomail.in/v1.1/email/template";
const token = process.env.ZEPTO_MAIL_TOKEN!;

if (!token) {
  console.warn("ZEPTO_MAIL_TOKEN is missing. Emails will not be sent.");
}

const client = new SendMailClient({ url, token });

interface SendTemplateEmailParams {
  to: { email: string; name?: string }[];
  templateKey: string;
  mergeInfo?: Record<string, string | number>;
}

/**
 * Sends a transactional email using a ZeptoMail template.
 */
export async function sendTemplateEmail({
  to,
  templateKey,
  mergeInfo = {},
}: SendTemplateEmailParams) {
  if (!token) return { success: false, error: "Missing token" };

  try {
    const response = await client.sendMailWithTemplate({
      template_key: templateKey,
      from: {
        address: process.env.ZEPTO_FROM_EMAIL!,
        name: process.env.ZEPTO_FROM_NAME!,
      },
      to: to.map((t) => ({
        email_address: {
          address: t.email,
          name: t.name || t.email.split("@")[0],
        },
      })),
      merge_info: Object.fromEntries(
        Object.entries(mergeInfo).map(([k, v]) => [k, String(v)])
      ),
    });

    return { success: true, data: response };
  } catch (error) {
    console.error("ZeptoMail Error:", error);
    return { success: false, error };
  }
}

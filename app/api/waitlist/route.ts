import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.zoho.in",
  port: 465,
  secure: true,
  auth: {
    user: process.env.ZOHO_MAIL_USER,
    pass: process.env.ZOHO_MAIL_PASSWORD,
  },
});

export async function POST(request: NextRequest) {
  const timestamp = new Date().toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
  });

  try {
    const { email } = await request.json();
    console.log(`[${timestamp}] 📩 Signup Request Received:`, email);

    if (!email || typeof email !== "string") {
      console.warn(
        `[${timestamp}] ⚠️ Validation Failed: Missing or invalid email format`,
      );
      return NextResponse.json(
        { error: "A valid email address is required." },
        { status: 400 },
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      console.warn(
        `[${timestamp}] ⚠️ Validation Failed: Invalid email syntax for ${email}`,
      );
      return NextResponse.json(
        { error: "Invalid email format." },
        { status: 400 },
      );
    }

    // 1. Send notification to owner
    console.log(
      `[${timestamp}] 📧 Attempting to send Admin notification for ${email}...`,
    );
    try {
      await transporter.sendMail({
        from: process.env.ZOHO_MAIL_USER,
        to: process.env.WAITLIST_RECEIVER_EMAIL,
        subject: "🟢 New TurfInApp Waitlist Signup!",
        html: `
        <div style="font-family: sans-serif; max-width: 480px; margin: 0 auto; padding: 32px; background: #111; border-radius: 16px; color: #fff;">
          <h2 style="color: #CCFF00; margin-top: 0;">New Waitlist Signup</h2>
          <p style="color: #ccc;">Someone just joined the TurfInApp waitlist:</p>
          <div style="background: #1a1a1a; padding: 16px 24px; border-radius: 12px; border-left: 4px solid #CCFF00; margin: 16px 0;">
            <p style="margin: 0; font-size: 18px; font-weight: 600;">${email}</p>
          </div>
          <p style="color: #888; font-size: 13px; margin-bottom: 0;">
            Received at ${timestamp} IST
          </p>
        </div>
      `,
      });
      console.log(`[${timestamp}] ✅ Admin notification sent successfully.`);
    } catch (adminErr) {
      console.error(
        `[${timestamp}] ❌ Failed to send Admin notification:`,
        adminErr,
      );
      // We continue even if admin notification fails, to try and confirm for the user
    }

    // 2. Send confirmation to user
    console.log(
      `[${timestamp}] 📧 Attempting to send User confirmation to ${email}...`,
    );
    try {
      await transporter.sendMail({
        from: process.env.ZOHO_MAIL_USER,
        to: email,
        subject: "You're on the TurfInApp Waitlist! 🎉",
        html: `
        <div style="font-family: sans-serif; max-width: 480px; margin: 0 auto; padding: 32px; background: #111; border-radius: 16px; color: #fff;">
          <h2 style="color: #CCFF00; margin-top: 0;">Welcome to TurfInApp!</h2>
          <p style="color: #ccc; line-height: 1.6;">
            Thank you for joining the TurfInApp waitlist! You'll be among the first to know when we launch.
          </p>
          <p style="color: #ccc; line-height: 1.6;">
            We'll keep you informed about release announcements, insider news, and feature previews.
          </p>
          <div style="text-align: center; margin: 24px 0;">
            <span style="display: inline-block; background: #CCFF00; color: #000; padding: 12px 32px; border-radius: 999px; font-weight: 600; font-size: 14px;">
              You're In! 🏟️
            </span>
          </div>
          <p style="color: #666; font-size: 12px; text-align: center; margin-bottom: 0;">
            — The TurfInApp Team
          </p>
        </div>
      `,
      });
      console.log(
        `[${timestamp}] ✅ User confirmation sent successfully to ${email}.`,
      );
    } catch (userErr) {
      console.error(
        `[${timestamp}] ❌ Failed to send User confirmation to ${email}:`,
        userErr,
      );
      throw userErr; // Re-throw to trigger the main catch block for a 500 response
    }

    console.log(`[${timestamp}] ✨ Signup successful for ${email}`);
    return NextResponse.json(
      { message: "Successfully joined the waitlist!" },
      { status: 200 },
    );
  } catch (error) {
    console.error(
      `[${timestamp}] 🚨 Critical Waitlist API Error [${timestamp}]:`,
      error,
    );
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 },
    );
  }
}

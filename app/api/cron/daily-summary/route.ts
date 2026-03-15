import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/app/lib/supabase";
import { sendTemplateEmail } from "@/app/lib/zeptomail";

export async function GET(request: NextRequest) {
  // 1. Verify Authorization (Vercel Cron Secret)
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    // 2. Calculate "Yesterday" range
    const now = new Date();
    const yesterdayStart = new Date(now);
    yesterdayStart.setDate(now.getDate() - 1);
    yesterdayStart.setHours(0, 0, 0, 0);

    const yesterdayEnd = new Date(now);
    yesterdayEnd.setDate(now.getDate() - 1);
    yesterdayEnd.setHours(23, 59, 59, 999);

    // 3. Fetch users registered yesterday
    const { data: users, error: dbError } = await supabaseAdmin
      .from("waitlist")
      .select("email, created_at")
      .gte("created_at", yesterdayStart.toISOString())
      .lte("created_at", yesterdayEnd.toISOString());

    if (dbError) throw dbError;

    // 4. Send Summary to Admin if there are new users
    if (users && users.length > 0) {
      const adminEmail = process.env.ADMIN_EMAIL;
      const summaryTemplate = process.env.ZEPTO_TEMPLATE_KEY_DAILY_SUMMARY;

      if (adminEmail && summaryTemplate) {
        const userListString = users.map((u) => u.email).join(", ");
        
        await sendTemplateEmail({
          to: [{ email: adminEmail, name: "Admin" }],
          templateKey: summaryTemplate,
          mergeInfo: {
            total_count: users.length,
            user_list: userListString,
            date: yesterdayStart.toLocaleDateString("en-IN"),
          },
        });
      }
    }

    return NextResponse.json({
      status: "success",
      count: users?.length || 0,
    });
  } catch (error) {
    console.error("Cron Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

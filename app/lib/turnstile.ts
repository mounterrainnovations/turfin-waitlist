export async function verifyTurnstileToken(token: string): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;

  if (!secret) {
    console.warn("TURNSTILE_SECRET_KEY is missing. Skipping verification.");
    return true; // Or false, depending on how strict you want to be during setup
  }

  try {
    const res = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `secret=${encodeURIComponent(secret)}&response=${encodeURIComponent(token)}`,
      }
    );

    const data = await res.json();
    return data.success;
  } catch (error) {
    console.error("Turnstile Verification Error:", error);
    return false;
  }
}

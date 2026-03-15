import { useState, useRef } from "react";
import { Turnstile, type TurnstileInstance } from "@marsidev/react-turnstile";
import Toast from "./Toast";

const POPULAR_PROVIDERS = [
  "gmail.com",
  "yahoo.com",
  "outlook.com",
  "hotmail.com",
  "icloud.com",
  "protonmail.com",
  "zoho.com",
  "aol.com",
  "yandex.com",
  "mail.com",
];

export default function WaitlistForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const turnstileRef = useRef<TurnstileInstance>(null);

  const showToast = (message: string, type: "success" | "error") => {
    setToast({ message, type });
  };

  const validateEmail = (mail: string) => {
    const cleanMail = mail.trim().toLowerCase();
    
    // Basic regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(cleanMail)) {
      return { valid: false, message: "Please enter a valid email address." };
    }

    // Provider check
    const domain = cleanMail.split("@")[1];
    if (!POPULAR_PROVIDERS.includes(domain)) {
      return { 
        valid: false, 
        message: "Please use a popular email provider (Gmail, Outlook, etc.)." 
      };
    }

    return { valid: true, cleanMail };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const validation = validateEmail(email);
    if (!validation.valid) {
      showToast(validation.message || "Invalid email", "error");
      setStatus("error");
      return;
    }

    if (!turnstileToken) {
      showToast("Please complete the security check.", "error");
      setStatus("error");
      return;
    }

    setStatus("loading");

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          email: validation.cleanMail, 
          turnstileToken 
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Something went wrong.");
      }

      showToast("You've been added to the waitlist! 🎉", "success");
      setStatus("success");
      setEmail("");
      setTurnstileToken(null);
      turnstileRef.current?.reset();
      setTimeout(() => setStatus("idle"), 4000);
    } catch (err) {
      setStatus("error");
      showToast(err instanceof Error ? err.message : "Something went wrong.", "error");
      setTurnstileToken(null);
      turnstileRef.current?.reset();
      setTimeout(() => setStatus("idle"), 4000);
    }
  };

  return (
    <div className="w-full flex flex-col gap-0">
      {toast && (
        <Toast 
          message={toast.message} 
          type={toast.type} 
          onClose={() => setToast(null)} 
        />
      )}
      
      <form onSubmit={handleSubmit} className="w-full flex flex-col md:flex-row items-center gap-3">
        <div className="w-full flex-1 relative">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your mail address"
            required
            className="w-full h-[52px] rounded-full bg-white/5 backdrop-blur-md border border-white/15 px-6 text-white text-sm placeholder:text-white/30 outline-none focus:border-[#CCFF00]/50 focus:ring-1 focus:ring-[#CCFF00]/25 transition-all duration-300"
          />
        </div>
        <button
          type="submit"
          disabled={status === "loading"}
          className="w-full md:w-auto h-[52px] px-8 rounded-full bg-[#CCFF00]/90 backdrop-blur-md text-black font-semibold text-sm tracking-wide hover:bg-[#d4ff33] active:scale-95 transition-all duration-200 whitespace-nowrap disabled:opacity-70 cursor-pointer shadow-[0_0_20px_rgba(204,255,0,0.2)] hover:shadow-[0_0_30px_rgba(204,255,0,0.4)]"
        >
          {status === "loading" ? (
            <span className="flex items-center gap-2">
              <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="none"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                />
              </svg>
              Joining...
            </span>
          ) : status === "success" ? (
            "You're in! 🎉"
          ) : status === "error" ? (
            "Try again"
          ) : (
            "Join waitlist"
          )}
        </button>
      </form>
      
      <div className="flex justify-center scale-90 md:scale-75 origin-top">
        <Turnstile
          ref={turnstileRef}
          siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || ""}
          onSuccess={(token) => setTurnstileToken(token)}
          onExpire={() => setTurnstileToken(null)}
          onError={() => setTurnstileToken(null)}
          options={{
            size: "flexible",
            theme: "dark",
          }}
        />
      </div>
    </div>
  );
}

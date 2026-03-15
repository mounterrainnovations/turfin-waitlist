"use client";

import { useState, useRef } from "react";
import { Turnstile, type TurnstileInstance } from "@marsidev/react-turnstile";
import { X } from "@phosphor-icons/react";
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
  const [showTurnstile, setShowTurnstile] = useState(false);
  const [pendingEmail, setPendingEmail] = useState("");
  const turnstileRef = useRef<TurnstileInstance>(null);

  const showToastMsg = (message: string, type: "success" | "error") => {
    setToast({ message, type });
  };

  const validateEmail = (mail: string) => {
    const cleanMail = mail.trim().toLowerCase();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(cleanMail)) {
      return { valid: false, message: "Please enter a valid email address." };
    }

    const domain = cleanMail.split("@")[1];
    if (!POPULAR_PROVIDERS.includes(domain)) {
      return {
        valid: false,
        message: "Please use a popular email provider (Gmail, Outlook, etc.).",
      };
    }

    return { valid: true, cleanMail };
  };

  // Step 1: User clicks submit → validate email → show Turnstile overlay
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const validation = validateEmail(email);
    if (!validation.valid) {
      showToastMsg(validation.message || "Invalid email", "error");
      setStatus("error");
      setTimeout(() => setStatus("idle"), 3000);
      return;
    }

    // Email is valid — show Turnstile overlay
    setPendingEmail(validation.cleanMail!);
    setShowTurnstile(true);
  };

  // Step 2: User passes Turnstile → actually submit to API
  const handleTurnstileSuccess = async (token: string) => {
    setShowTurnstile(false);
    setStatus("loading");

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: pendingEmail,
          turnstileToken: token,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Something went wrong.");
      }

      showToastMsg("You've been added to the waitlist! 🎉", "success");
      setStatus("success");
      setEmail("");
      setPendingEmail("");
      setTimeout(() => setStatus("idle"), 4000);
    } catch (err) {
      setStatus("error");
      showToastMsg(
        err instanceof Error ? err.message : "Something went wrong.",
        "error"
      );
      setTimeout(() => setStatus("idle"), 4000);
    } finally {
      turnstileRef.current?.reset();
    }
  };

  const handleTurnstileClose = () => {
    setShowTurnstile(false);
    turnstileRef.current?.reset();
  };

  return (
    <>
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

      {/* Full-Screen Turnstile Overlay */}
      {showTurnstile && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/70 backdrop-blur-sm animate-fade-in">
          <div className="relative flex flex-col items-center gap-6 p-8 rounded-3xl border border-white/10 bg-black/60 backdrop-blur-2xl shadow-2xl max-w-sm w-full mx-4">
            {/* Close button */}
            <button
              onClick={handleTurnstileClose}
              className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-white/10 transition-colors text-white/40 hover:text-white"
            >
              <X size={18} weight="bold" />
            </button>

            {/* Title */}
            <div className="flex flex-col items-center gap-2 pt-2">
              <span className="w-3 h-3 rounded-full bg-[#CCFF00] animate-pulse" />
              <h3 className="text-white text-lg font-bold tracking-tight">
                Security Check
              </h3>
              <p className="text-white/40 text-xs text-center">
                Please verify you&apos;re human to continue
              </p>
            </div>

            {/* Turnstile Widget */}
            <div className="flex justify-center">
              <Turnstile
                ref={turnstileRef}
                siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || ""}
                onSuccess={handleTurnstileSuccess}
                onExpire={() => {
                  turnstileRef.current?.reset();
                }}
                onError={() => {
                  showToastMsg("Security check failed. Please try again.", "error");
                  setShowTurnstile(false);
                }}
                options={{
                  theme: "dark",
                }}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

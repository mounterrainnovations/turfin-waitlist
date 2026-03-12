"use client";

import { useState } from "react";

export default function WaitlistForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Something went wrong.");
      }

      setStatus("success");
      setEmail("");
      setTimeout(() => setStatus("idle"), 4000);
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong.");
      setTimeout(() => setStatus("idle"), 4000);
    }
  };

  return (
    <div className="w-full flex flex-col gap-2">
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
      {status === "error" && errorMsg && (
        <p className="text-red-400 text-xs text-center">{errorMsg}</p>
      )}
    </div>
  );
}

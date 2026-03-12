"use client";

import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="z-50 w-[90%] max-w-[1200px] animate-fade-up">
      <div className="flex flex-col md:flex-row items-center justify-between px-8 py-4 rounded-2xl border border-white/15 bg-black/25 backdrop-blur-md gap-4 md:gap-0">
        <div className="flex items-center gap-6">
          <p className="text-white/60 text-[10px] md:text-xs">
            © {currentYear} TurfInApp. All rights reserved.
          </p>
          <div className="h-px w-4 bg-white/10 hidden md:block" />
          <div className="flex gap-4">
            <Link href="/privacy" className="text-white/60 hover:text-white transition-colors text-[10px] md:text-xs">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-white/60 hover:text-white transition-colors text-[10px] md:text-xs">
              Terms of Service
            </Link>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <p className="text-white/60 text-[10px] md:text-xs uppercase tracking-widest font-semibold italic">
            Powering the next gen of play
          </p>
          <div className="flex gap-4">
            {["Twitter", "Instagram", "Discord"].map((social) => (
              <Link
                key={social}
                href={`https://${social.toLowerCase()}.com`}
                target="_blank"
                className="w-8 h-8 rounded-lg border border-white/10 bg-white/10 flex items-center justify-center hover:bg-[#CCFF00] group transition-all"
              >
                <div className="w-4 h-4 text-white/60 group-hover:text-black font-bold text-[8px] flex items-center justify-center">
                  {social[0]}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

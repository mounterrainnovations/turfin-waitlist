"use client";

import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="z-50 w-[90%] max-w-[1200px] animate-fade-up">
      <div className="flex items-center justify-between px-6 py-3 rounded-2xl border border-white/10 bg-black/20 backdrop-blur-xl">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <Image
            src="/turfinLogo.svg"
            alt="TurfInApp"
            width={32}
            height={32}
            className="object-contain transition-transform group-hover:scale-105"
          />
          <span className="text-white font-extrabold tracking-tighter text-xl">
            TurfIn<span className="text-[#CCFF00]">App.</span>
          </span>
        </Link>

        {/* Links */}
        <div className="hidden md:flex items-center gap-8">
          {["Features", "About", "Contact"].map((item) => (
            <Link
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-white/60 hover:text-[#CCFF00] text-sm font-medium transition-colors"
            >
              {item}
            </Link>
          ))}
        </div>

        {/* CTA */}
        <Link
          href="#waitlist"
          className="px-5 py-2 rounded-xl bg-white/90 backdrop-blur-md text-black text-xs font-bold uppercase tracking-wider hover:bg-[#CCFF00] transition-all hover:scale-105 active:scale-95"
        >
          Get Early Access
        </Link>
      </div>
    </nav>
  );
}

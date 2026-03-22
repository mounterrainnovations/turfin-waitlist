"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

const NAV_LINKS = [
  { label: "Features", href: "/#features", badge: null },
  { label: "About",    href: "/#about",    badge: null },
];

/* Small icon squares that appear before nav links — mirrors tuyo's colored indicators */
const NavIcon = ({ children }: { children: React.ReactNode }) => (
  <span className="w-4 h-4 rounded-sm bg-white/8 flex items-center justify-center text-[8px] text-white/40 flex-none">
    {children}
  </span>
);

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-5 md:px-10 py-4 animate-fade-up border-b backdrop-blur-xl transition-colors duration-500 ease-in-out ${scrolled ? "bg-black/75 border-white/8" : "bg-transparent border-transparent"}`}>
      {/* Logo */}
      <Link href="/" className="flex items-center gap-2.5 group flex-none">
        <Image
          src="/turfinLogo.svg"
          alt="TurfInApp"
          width={26}
          height={26}
          className="object-contain transition-transform group-hover:scale-105"
        />
        <span className="text-white font-extrabold tracking-tighter text-lg leading-none">
          TurfIn<span className="text-[#CCFF00]">App.</span>
        </span>
      </Link>

      {/* Center nav links */}
      <div className="hidden md:flex items-center gap-7">
        {/* Home with active dot */}
        <Link
          href="/"
          className="flex items-center gap-1.5 text-white text-sm font-medium"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#CCFF00] flex-none" />
          Home
        </Link>

        {NAV_LINKS.map(({ label, href, badge }) => (
          <Link
            key={label}
            href={href}
            className="flex items-center gap-1.5 text-white/50 hover:text-white text-sm font-medium transition-colors duration-200 relative"
          >
            <NavIcon>◈</NavIcon>
            {label}
            {badge && (
              <span className="absolute -top-2 -right-3 text-[9px] font-bold text-[#CCFF00]">
                {badge}
              </span>
            )}
          </Link>
        ))}
      </div>

      {/* CTA — dark bg with logo icon, mirrors tuyo's "Get Tuyo" button */}
      <Link
        href="/#waitlist"
        className="flex items-center gap-2 pl-1.5 pr-4 py-1.5 rounded-lg bg-[#111] border border-white/10 text-white text-sm font-semibold hover:border-white/25 hover:bg-[#181818] transition-all duration-200 whitespace-nowrap flex-none"
      >
        <span className="w-7 h-7 rounded-md bg-[#CCFF00] flex items-center justify-center flex-none">
          <Image src="/turfinLogo.svg" alt="" width={14} height={14} className="object-contain invert" />
        </span>
        Get Early Access
      </Link>
    </nav>
  );
}

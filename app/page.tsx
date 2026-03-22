"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import WaitlistForm from "./components/WaitlistForm";
import ProgressSteps from "./components/ProgressSteps";

/* ─── DATA ──────────────────────────────────────────────────────────────── */

const FEATURES = [
  {
    id: "book",
    icon: "↗",
    iconBg: "#0f1f05",
    headline: "Book in seconds.",
    sub: "Real-time availability across hundreds of fields.",
    visual: (
      <div className="mt-auto w-full flex flex-col gap-1.5">
        {["06:00 – 07:00", "08:00 – 09:00", "11:00 – 12:00"].map((slot, i) => (
          <div
            key={slot}
            className={`flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium ${
              i === 1
                ? "bg-[#CCFF00] text-black"
                : "bg-white/5 border border-white/8 text-white/50"
            }`}
          >
            <span>{slot}</span>
            <span>{i === 1 ? "Selected ✓" : "Open"}</span>
          </div>
        ))}
      </div>
    ),
  },
  {
    id: "pay",
    icon: "▤",
    iconBg: "#0f1505",
    headline: "Pay & play.",
    sub: "No cash. No deposits. Instant payment, instant confirmation.",
    visual: (
      <div className="mt-auto flex flex-col items-center gap-1.5 py-4">
        <p className="text-[#CCFF00] font-display font-black text-5xl tracking-tight">₹450</p>
        <p className="text-white/30 text-xs">Turf booked · 2 hrs</p>
        <div className="mt-2 px-6 py-2 rounded-full bg-[#CCFF00] text-black text-xs font-bold">
          Paid ✓
        </div>
      </div>
    ),
  },
  {
    id: "sport",
    icon: "↻",
    iconBg: "#051a0f",
    headline: "Any sport, any time.",
    sub: "Football, cricket, basketball, tennis, padel — one app.",
    visual: (
      <div className="mt-auto grid grid-cols-3 gap-2 pt-4">
        {[["⚽","Football"],["🏏","Cricket"],["🏀","Basketball"],["🎾","Tennis"],["🏸","Badminton"],["🏑","Hockey"]].map(([e, l]) => (
          <div key={l} className="flex flex-col items-center gap-1 py-2 rounded-xl bg-white/5 border border-white/8">
            <span className="text-xl">{e}</span>
            <span className="text-white/30 text-[9px]">{l}</span>
          </div>
        ))}
      </div>
    ),
  },
  {
    id: "team",
    icon: "→",
    iconBg: "#0a1205",
    headline: "Team-ready.",
    sub: "Invite teammates, split costs, organise the match — all at once.",
    visual: (
      <div className="mt-auto flex flex-col gap-2 pt-4">
        {[{ n: "Rahul", p: true }, { n: "Priya", p: true }, { n: "Arjun", p: false }].map(({ n, p }) => (
          <div key={n} className="flex items-center justify-between bg-white/5 border border-white/8 rounded-xl px-3 py-2.5">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-[10px] text-white/50">
                {n[0]}
              </div>
              <span className="text-white/60 text-xs">{n}</span>
            </div>
            <span className={`text-xs font-semibold ${p ? "text-[#CCFF00]" : "text-white/20"}`}>
              {p ? "Paid ✓" : "Pending"}
            </span>
          </div>
        ))}
      </div>
    ),
  },
  {
    id: "coins",
    icon: "◎",
    iconBg: "#131a00",
    headline: "Earn TurfCoins.",
    sub: "Every booking earns you TurfCoins. Redeem for free slots and perks.",
    visual: (
      <div className="mt-auto flex flex-col items-center gap-1.5 pt-6">
        <div className="w-14 h-14 rounded-full bg-[#CCFF00]/15 border border-[#CCFF00]/30 flex items-center justify-center text-2xl">
          🪙
        </div>
        <p className="text-[#CCFF00] font-display font-black text-3xl tracking-tight mt-2">1,240</p>
        <p className="text-white/30 text-xs">TurfCoins earned</p>
      </div>
    ),
  },
];

const TESTIMONIALS = [
  { name: "Rahul S.",    handle: "@rahulplays", text: "Finally booked a football ground in under 2 minutes. TurfIn is genuinely a game-changer." },
  { name: "Priya M.",   handle: "@priyas",     text: "No more calling venue managers or paying cash deposits. Just open the app and play." },
  { name: "Karthik R.", handle: "@karthik_r",  text: "The team split feature alone is worth the download. Our whole squad uses it every weekend." },
  { name: "Sneha T.",   handle: "@sneha_t",    text: "Best UX I've seen for sports booking. Everything is instant — bookings, payments, confirmations." },
  { name: "Dev P.",     handle: "@devp",       text: "TurfCoins are a genius idea. I've already earned enough for a free hour this month." },
  { name: "Aisha K.",   handle: "@aishak",     text: "Incredible — I can see real-time availability for 20+ venues near me. The old way was embarrassing." },
];

const FAQS = [
  { q: "How does real-time booking work?",  a: "TurfIn connects directly to venue management systems to show live slot availability. When you tap to book, the slot is reserved instantly — no back-and-forth with venue staff." },
  { q: "Which sports does TurfIn support?", a: "Football, cricket, basketball, tennis, badminton, padel, and more. We're constantly onboarding new venue types. If your sport isn't listed yet, drop us a note." },
  { q: "Are there any booking fees?",       a: "No hidden fees. You pay the venue rate shown in the app — that's it. We're upfront about everything." },
  { q: "Can I cancel or reschedule?",       a: "Yes. Cancellation and rescheduling policies are set per venue and shown clearly before you confirm. Most venues allow free cancellation up to 2 hours before the slot." },
  { q: "What are TurfCoins?",               a: "TurfCoins are TurfIn's reward currency. Every booking earns you TurfCoins, which you can redeem for free slot hours, upgrades, or partner perks. Early waitlist members get a bonus stack at launch." },
  { q: "When does TurfIn launch?",          a: "We're in the final stages of development. Join the waitlist to be among the first to access the app and receive exclusive early-bird perks." },
];

const AVATARS = [
  { char: "P", src: "/PLogo.png",  gradient: null },
  { char: "M", src: null,          gradient: "from-violet-400 to-purple-500" },
  { char: "G", src: "/GLogo.webp", gradient: null },
  { char: "A", src: null,          gradient: "from-pink-400 to-rose-500" },
] as const;

/* ─── SHARED COMPONENTS ─────────────────────────────────────────────────── */

/** Stacked avatar row — used in hero and waitlist sections */
function AvatarStack({ size = "sm" }: { size?: "sm" | "lg" }) {
  const wrap  = size === "lg" ? "flex -space-x-2.5" : "flex -space-x-2";
  const dim   = size === "lg" ? "w-8 h-8 md:w-9 md:h-9" : "w-7 h-7";
  const bdr   = size === "lg" ? "border-black/40 transition-transform hover:scale-110 hover:z-20" : "border-black";
  const label = size === "lg" ? "text-[10px] md:text-xs" : "text-[9px]";

  return (
    <div className={wrap}>
      {AVATARS.map(({ char, src, gradient }) => (
        <div
          key={char}
          className={`${dim} rounded-full border-2 ${bdr} flex items-center justify-center overflow-hidden ${
            src ? "bg-white" : `bg-linear-to-br ${gradient}`
          }`}
        >
          {src ? (
            <Image
              src={src}
              alt={char}
              width={size === "lg" ? 36 : 28}
              height={size === "lg" ? 36 : 28}
              className="object-cover w-full h-full"
            />
          ) : (
            <span className={`${label} font-bold text-white/80`}>{char}</span>
          )}
        </div>
      ))}
    </div>
  );
}

/** Single testimonial card — used in both marquee rows */
function TestimonialCard({ t }: { t: (typeof TESTIMONIALS)[0] }) {
  return (
    <div className="flex-none w-[300px] bg-[#0d0d0d] border border-white/8 rounded-2xl p-5">
      <div className="flex items-center gap-2.5 mb-3">
        <div className="w-8 h-8 rounded-full bg-white/10 border border-white/15 flex items-center justify-center text-xs text-white/50 flex-none font-semibold">
          {t.name[0]}
        </div>
        <div>
          <p className="text-white text-xs font-semibold leading-none">{t.name}</p>
          <p className="text-white/25 text-[10px] mt-0.5">{t.handle}</p>
        </div>
        <span className="ml-auto text-[#CCFF00] text-[10px]">✓</span>
      </div>
      <p className="text-white/60 text-sm leading-relaxed">{t.text}</p>
    </div>
  );
}

/* ─── PAGE ───────────────────────────────────────────────────────────────── */

export default function Home() {
  const currentPhase = Number(process.env.NEXT_PUBLIC_PROGRESS_PHASE) || 1;
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <main className="bg-black text-white overflow-x-hidden">
      <Navbar />

      {/* ══════════════════════════════════════════════════════════════════
          HERO — split layout: text left (pure black) / photo panel right
      ══════════════════════════════════════════════════════════════════ */}
      <section className="relative min-h-[100svh] bg-black flex overflow-hidden">

        {/* Desktop: floating rounded-rect photo panel */}
        <div
          className="hidden md:block absolute right-5 top-16 bottom-8 rounded-3xl overflow-hidden"
          style={{ left: "44%" }}
        >
          <Image
            src="/turfInBG.png"
            alt="TurfIn app"
            fill
            priority
            sizes="(min-width: 768px) 56vw, 0vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-black to-transparent" />
        </div>

        {/* Mobile: full-bleed photo with gradient overlay */}
        <div className="md:hidden absolute inset-0">
          <Image
            src="/turfInBG.png"
            alt="TurfIn"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black/40" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 to-transparent" />
        </div>

        {/* Left text content, pinned to bottom */}
        <div className="relative z-10 flex flex-col justify-end pb-16 md:pb-20 px-5 md:px-10 w-full md:w-[44%]">

          {/* Live / coming-soon badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm mb-6 w-fit">
            <span className="w-1.5 h-1.5 rounded-full bg-[#CCFF00] animate-pulse" />
            <span className="text-[#CCFF00] text-[10px] font-semibold tracking-[0.15em] uppercase">
              {currentPhase === 4 ? "Live Now" : "Coming Soon — Join the Waitlist"}
            </span>
          </div>

          {/* Headline */}
          <h1 className="font-display font-black text-[68px] xs:text-[80px] md:text-[96px] xl:text-[112px] leading-[0.88] tracking-tight text-white mb-5">
            Book your<br />
            <span className="text-[#CCFF00]">turf.</span>
          </h1>

          <p className="text-white/55 text-base md:text-lg leading-relaxed mb-8 max-w-sm">
            Find, book, and pay for sports fields in real time.
            No calls. No deposits. Just play.
          </p>

          {/* CTA buttons */}
          <div className="flex items-center gap-3 flex-wrap">
            <Link
              href="/#waitlist"
              className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-[#111] border border-white/10 text-white text-sm font-semibold hover:bg-[#1a1a1a] hover:border-white/20 transition-all duration-200"
            >
              <Image src="/turfinLogo.svg" alt="" width={14} height={14} className="object-contain" />
              Join Waitlist
            </Link>
            <Link
              href="/#features"
              className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-[#111] border border-white/10 text-white text-sm font-semibold hover:bg-[#1a1a1a] hover:border-white/20 transition-all duration-200"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M2 7h10M7 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Explore Features
            </Link>
          </div>

          {/* Social proof */}
          <div className="flex items-center gap-3 mt-6">
            <AvatarStack size="sm" />
            <p className="text-white/40 text-xs">
              Join <span className="text-white/70 font-semibold">525+</span> others on the waitlist
            </p>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          FEATURES — section header + horizontal scroll cards
      ══════════════════════════════════════════════════════════════════ */}
      <section id="features" className="py-20 md:py-28">

        {/* Section header */}
        <div className="px-5 md:px-10 mb-10">
          <p className="text-white/25 text-[11px] font-semibold tracking-[0.2em] uppercase mb-3">
            The Platform
          </p>
          <h2 className="font-display font-black text-[40px] md:text-[52px] leading-[0.9] tracking-tight text-white">
            Everything you need<br className="hidden sm:block" /> to book and play.
          </h2>
        </div>

        {/* Horizontal scroll */}
        <div className="flex gap-4 overflow-x-auto hide-scrollbar px-5 md:px-10 pb-4">
          {FEATURES.map((f) => (
            <div
              key={f.id}
              className="grow min-w-65 md:min-w-72.5 bg-[#0d0d0d] border border-white/8 rounded-2xl p-5 flex flex-col min-h-100"
            >
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center mb-4 flex-none"
                style={{ background: f.iconBg }}
              >
                <span className="text-[#CCFF00] text-sm font-bold">{f.icon}</span>
              </div>
              <p className="text-white font-display font-bold text-xl leading-tight mb-1.5">{f.headline}</p>
              <p className="text-white/35 text-xs leading-relaxed">{f.sub}</p>
              {f.visual}
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          TESTIMONIALS — name/avatar at top, infinite double marquee
      ══════════════════════════════════════════════════════════════════ */}
      <section className="py-20 md:py-28 overflow-hidden">
        <p className="text-center text-white/25 text-xs font-semibold tracking-[0.2em] uppercase mb-10">
          Trusted by thousands
        </p>

        {/* Row 1 — left scroll */}
        <div className="marquee-track overflow-hidden mb-3">
          <div className="animate-marquee flex gap-3" style={{ width: "max-content" }}>
            {[...TESTIMONIALS, ...TESTIMONIALS].map((t, i) => (
              <TestimonialCard key={i} t={t} />
            ))}
          </div>
        </div>

        {/* Row 2 — right scroll */}
        <div className="marquee-track overflow-hidden">
          <div
            className="animate-marquee-slow flex gap-3"
            style={{ width: "max-content", animationDirection: "reverse" }}
          >
            {[...TESTIMONIALS.slice(3), ...TESTIMONIALS, ...TESTIMONIALS.slice(3)].map((t, i) => (
              <TestimonialCard key={i} t={t} />
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          ABOUT — two large callout cards side by side
      ══════════════════════════════════════════════════════════════════ */}
      <section id="about" className="px-5 md:px-10 pb-16 md:pb-20">
        <div className="mb-8">
          <p className="text-white/25 text-[11px] font-semibold tracking-[0.2em] uppercase mb-3">
            Why TurfIn
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          {/* Callout 1 — booking control */}
          <Link
            href="/#waitlist"
            className="group bg-[#0d0d0d] border border-white/8 rounded-3xl p-8 md:p-10 flex flex-col min-h-[500px] overflow-hidden relative hover:border-white/15 transition-colors duration-300"
          >
            <p className="text-white font-display font-black text-3xl md:text-4xl leading-[1.0] tracking-tight max-w-xs mb-3">
              Your turf.<br />Your rules.
            </p>
            <p className="text-white/35 text-sm leading-relaxed max-w-[260px]">
              Real-time slot visibility, instant booking confirmation,
              and zero friction — TurfIn puts you in control of your game.
            </p>

            <div className="mt-auto pt-8">
              <div className="rounded-2xl overflow-hidden bg-black/50 border border-white/8">
                <div className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-white/50 text-xs font-medium">Saturday, 22 Mar</p>
                    <span className="text-[#CCFF00] text-[10px] font-semibold border border-[#CCFF00]/30 rounded-full px-2 py-0.5">
                      5 slots open
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    {["6 AM", "7 AM", "8 AM", "9 AM", "10 AM", "11 AM"].map((t, i) => (
                      <div
                        key={t}
                        className={`text-center py-2 rounded-lg text-[10px] font-medium ${
                          i === 2 ? "bg-[#CCFF00] text-black"
                          : i === 4 ? "bg-white/5 text-white/15 line-through"
                          : "bg-white/5 text-white/40"
                        }`}
                      >
                        {t}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <p className="absolute top-8 right-8 text-[#CCFF00] text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              Join waitlist →
            </p>
          </Link>

          {/* Callout 2 — TurfCoins rewards */}
          <Link
            href="/#waitlist"
            className="group rounded-3xl p-8 md:p-10 flex flex-col min-h-[500px] overflow-hidden relative hover:border-[#CCFF00]/25 transition-colors duration-300"
            style={{
              background: "linear-gradient(145deg, #0a1900 0%, #0d2200 60%, #050a00 100%)",
              border: "1px solid rgba(204,255,0,0.12)",
            }}
          >
            <p className="text-white font-display font-black text-3xl md:text-4xl leading-[1.0] tracking-tight max-w-xs mb-3">
              Play TurfIn.<br />
              <span className="text-[#CCFF00]">Own the game.</span>
            </p>
            <p className="text-white/35 text-sm leading-relaxed max-w-[260px]">
              Every booking earns you TurfCoins. You&apos;re not just a user —
              early members get lifetime perks and priority access.
            </p>
            <p className="mt-3 text-[#CCFF00] text-sm font-semibold">Read more →</p>

            <div className="mt-auto pt-8 flex flex-col gap-2">
              {[
                { label: "Booking · 2 hrs", coins: "+120 TC", date: "Today"     },
                { label: "Booking · 1 hr",  coins: "+60 TC",  date: "Yesterday" },
                { label: "Referral bonus",  coins: "+500 TC", date: "Mar 18"    },
              ].map(({ label, coins, date }) => (
                <div key={label} className="flex items-center justify-between bg-black/30 border border-white/8 rounded-xl px-4 py-3">
                  <div>
                    <p className="text-white/60 text-xs font-medium">{label}</p>
                    <p className="text-white/25 text-[10px]">{date}</p>
                  </div>
                  <span className="text-[#CCFF00] text-xs font-bold">{coins}</span>
                </div>
              ))}
            </div>
          </Link>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          CTA — centered, big display headline + lime button
      ══════════════════════════════════════════════════════════════════ */}
      <section className="py-28 md:py-36 text-center px-5">
        <h2 className="font-display font-black text-[52px] xs:text-[68px] md:text-[96px] xl:text-[116px] leading-[0.88] tracking-tight text-white mb-6">
          TurfIn can<br />book any field.
        </h2>
        <p className="text-white/40 text-base md:text-lg max-w-md mx-auto mb-10 leading-relaxed">
          With TurfIn, you can book your favourite ground while earning TurfCoins.
          Everywhere there&apos;s turf, TurfIn is.
        </p>
        <Link
          href="/#waitlist"
          className="inline-flex items-center px-8 py-3.5 rounded-full bg-[#CCFF00] text-black text-sm font-bold hover:bg-white transition-colors duration-200"
        >
          Get early access
        </Link>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          FAQ + HERO REPEAT — split layout
          On mobile: FAQs shown first (order-1), hero repeat below (order-2)
      ══════════════════════════════════════════════════════════════════ */}
      <section className="px-5 md:px-10 pb-24 grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20">

        {/* Left — hero headline repeat + CTA buttons */}
        <div className="flex flex-col justify-between order-2 md:order-1">
          <div>
            <h2 className="font-display font-black text-[52px] xs:text-[64px] md:text-[76px] leading-[0.88] tracking-tight text-white mb-5">
              Book your<br />
              <span className="text-[#CCFF00]">turf.</span>
            </h2>
            <p className="text-white/45 text-sm leading-relaxed mb-8 max-w-xs">
              Find, book, and pay for sports fields in real time.
              No calls. No deposits. Just play.
            </p>

            <div className="flex items-center gap-3 flex-wrap mb-6">
              <Link
                href="/#waitlist"
                className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-[#111] border border-white/10 text-white text-sm font-semibold hover:bg-[#1a1a1a] transition-all duration-200"
              >
                <Image src="/turfinLogo.svg" alt="" width={14} height={14} className="object-contain" />
                Join Waitlist
              </Link>
              <Link
                href="/#features"
                className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-[#111] border border-white/10 text-white/60 text-sm font-semibold hover:bg-[#1a1a1a] hover:text-white transition-all duration-200"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M7 2v10M2 7h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
                Explore
              </Link>
            </div>

            <p className="text-white/30 text-xs">
              Join <span className="text-white/55 font-semibold">525+</span> others on the waitlist
            </p>
          </div>
        </div>

        {/* Right — FAQ accordion (shown first on mobile) */}
        <div className="flex flex-col gap-2 order-1 md:order-2 md:pt-10">
          {FAQS.map((faq, i) => (
            <div key={i} className="bg-[#0d0d0d] border border-white/8 rounded-xl overflow-hidden">
              <button
                className="w-full flex items-center justify-between px-5 py-4 text-left"
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
              >
                <span className="text-white/75 text-sm font-medium pr-4">{faq.q}</span>
                <span
                  className={`flex-none text-white/30 text-lg leading-none transition-transform duration-300 ${
                    openFaq === i ? "rotate-45 text-[#CCFF00]" : ""
                  }`}
                >
                  +
                </span>
              </button>
              <div className={`overflow-hidden transition-all duration-300 ${openFaq === i ? "max-h-48" : "max-h-0"}`}>
                <p className="text-white/40 text-sm leading-relaxed px-5 pb-5">{faq.a}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          WAITLIST — standalone glassmorphic card (original design preserved)
      ══════════════════════════════════════════════════════════════════ */}
      <section
        id="waitlist"
        className="relative px-3 xs:px-4 py-16 md:py-24 flex justify-center overflow-hidden"
      >
        {/* Lime radial glow behind card */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(204,255,0,0.06) 0%, transparent 70%)",
          }}
        />

        {/* Outer glassmorphic wrapper */}
        <div className="relative w-full max-w-[880px] rounded-[40px] md:rounded-[48px] border border-white/10 bg-white/5 backdrop-blur-xl p-1.5 md:p-2 shadow-2xl premium-glow animate-fade-up">
          {/* Inner lime-border card */}
          <div className="rounded-[32px] md:rounded-[40px] border-[5px] md:border-[8px] border-[#CCFF00] bg-black/40 backdrop-blur-2xl overflow-hidden animate-glow-breathe-subtle">
            <div className="w-full py-8 xs:py-10 md:py-12 px-5 xs:px-6 md:px-20 flex flex-col items-center text-center gap-4 md:gap-6">

              {/* Status badge */}
              <div className="flex items-center gap-2.5 px-5 py-2 rounded-full bg-white/5 backdrop-blur-sm border border-white/10">
                <span className="w-2 h-2 rounded-full bg-[#CCFF00] animate-pulse" />
                <span className="text-[#CCFF00] text-[10px] md:text-xs font-semibold tracking-[0.15em] uppercase">
                  {currentPhase === 4 ? "Live Now" : "Release Date: TBA"}
                </span>
              </div>

              {/* Headline */}
              <h2 className="text-white text-3xl md:text-5xl font-bold leading-tight tracking-tight">
                Join our <span className="text-[#CCFF00]">waitlist.</span>
              </h2>

              {/* Subtitle */}
              <p className="text-white/50 text-xs md:text-sm leading-relaxed max-w-sm md:max-w-md">
                Obtain early access to our program and remain informed about
                release announcements, insider news, and feature previews.
              </p>

              {/* Progress steps */}
              <div className="w-full max-w-3xl py-2 md:py-4 overflow-visible">
                <ProgressSteps currentPhase={currentPhase} />
              </div>

              {/* Waitlist form */}
              <div className="w-full max-w-md">
                <WaitlistForm />
              </div>

              {/* Social proof */}
              <div className="flex flex-col md:flex-row items-center gap-3 md:gap-4 mt-1">
                <AvatarStack size="lg" />
                <p className="text-white/40 text-[10px] md:text-xs">
                  Join <span className="text-white/70 font-semibold">525+</span>{" "}
                  others on the waitlist
                </p>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          FOOTER
      ══════════════════════════════════════════════════════════════════ */}
      <div className="px-5 md:px-10">
        <Footer />
      </div>
    </main>
  );
}

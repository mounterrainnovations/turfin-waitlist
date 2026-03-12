"use client";

import Image from "next/image";
import { useState } from "react";
import WaitlistForm from "./components/WaitlistForm";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProgressSteps from "./components/ProgressSteps";

export default function Home() {
  const [currentPhase, setCurrentPhase] = useState(2); // Toggle between 1, 2, 3, 4

  return (
    <main className="relative h-screen min-h-screen w-full overflow-hidden flex flex-col justify-between">
      {/* Background Image */}
      <Image
        src="/turfInBG.png"
        alt="Background"
        fill
        className="object-cover"
        priority
      />

      {/* Hidden Phase Toggle for Demo/Testing */}
      <div
        className="fixed bottom-0 right-0 p-4 z-[100] opacity-0 hover:opacity-100 flex gap-2"
        title="Hidden Debug Toggle"
      >
        {[1, 2, 3, 4].map((p) => (
          <button
            key={p}
            onClick={() => setCurrentPhase(p)}
            className={`w-8 h-8 rounded-full flex items-center justify-center text-xs border border-white/20 hover:bg-white/10
              ${currentPhase === p ? "bg-[#CCFF00] text-black border-[#CCFF00]" : "text-white"}
            `}
          >
            {p}
          </button>
        ))}
      </div>

      {/* Navbar Container */}
      <div className="relative z-50 w-full flex justify-center pt-2 md:pt-4">
        <Navbar />
      </div>

      {/* Main Content Area - Centered with flex-1 */}
      <div className="relative z-10 flex-1 w-full flex items-center justify-center px-4 py-4 md:py-6">
        {/* Glassmorphic Container with Dual Borders */}
        <div className="rounded-[40px] md:rounded-[48px] border border-white/10 bg-white/5 backdrop-blur-xl p-1.5 md:p-2 shadow-2xl w-full max-w-[880px] animate-fade-up premium-glow">
          {/* Lime Space (thick border) + Inner Glass (backdrop blur) */}
          <div className="rounded-[32px] md:rounded-[40px] border-[5px] md:border-[8px] border-[#CCFF00] bg-black/40 backdrop-blur-2xl overflow-hidden">
            {/* Content Area - Maintain vertical one column design */}
            <div className="w-full py-5 md:py-8 px-6 md:px-20 flex flex-col items-center text-center gap-3 md:gap-6 text-white">
              {/* Launch Badge */}
              <div className="flex items-center gap-2.5 px-5 py-2 rounded-full bg-white/5 backdrop-blur-sm border border-white/10">
                <span className="w-2 h-2 rounded-full bg-[#CCFF00] animate-pulse" />
                <span className="text-[#CCFF00] text-[10px] md:text-xs font-semibold tracking-[0.15em] uppercase">
                  {currentPhase === 4 ? "Live Now" : "Release Date: TBA"}
                </span>
              </div>

              {/* Main Heading */}
              <h1 className="text-white text-3xl md:text-5xl font-bold leading-tight tracking-tight">
                Join our <span className="text-[#CCFF00]">waitlist.</span>
              </h1>

              {/* Subtitle */}
              <p className="text-white/50 text-xs md:text-sm leading-relaxed max-w-sm md:max-w-md">
                Obtain early access to our program and remain informed about
                release announcements, insider news, and feature previews.
              </p>

              {/* Progress Steps */}
              <div className="w-full max-w-3xl py-2 md:py-4 overflow-visible">
                <ProgressSteps currentPhase={currentPhase} />
              </div>

              {/* Email Form */}
              <div className="w-full max-w-md">
                <WaitlistForm />
              </div>

              {/* Social Proof */}
              <div className="flex flex-col md:flex-row items-center gap-3 md:gap-4 mt-1">
                {/* Avatar Stack */}
                <div className="flex -space-x-2.5">
                  {["P", "M", "G", "A"].map((char, i) => (
                    <div
                      key={i}
                      className={`w-8 h-8 md:w-9 md:h-9 rounded-full border-2 border-black/40 flex items-center justify-center overflow-hidden transition-transform hover:scale-110 hover:z-20 ${
                        char === "P" || char === "G"
                          ? "bg-white"
                          : `bg-gradient-to-br ${
                              [
                                "",
                                "from-violet-400 to-purple-500",
                                "",
                                "from-pink-400 to-rose-500",
                              ][i]
                            }`
                      }`}
                    >
                      {char === "P" ? (
                        <Image
                          src="/PLogo.png"
                          alt="P"
                          width={36}
                          height={36}
                          className="object-cover w-full h-full"
                        />
                      ) : char === "G" ? (
                        <Image
                          src="/GLogo.webp"
                          alt="G"
                          width={36}
                          height={36}
                          className="object-cover w-full h-full"
                          priority
                        />
                      ) : (
                        <span className="text-[10px] md:text-xs font-bold text-white/80">
                          {char}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
                <p className="text-white/40 text-[10px] md:text-xs">
                  Join <span className="text-white/70 font-semibold">525+</span>{" "}
                  others on the waitlist
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Container */}
      <div className="relative z-50 w-full flex justify-center pb-2 md:pb-4">
        <Footer />
      </div>
    </main>
  );
}

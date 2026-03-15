"use client";

import Image from "next/image";

import WaitlistForm from "./components/WaitlistForm";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProgressSteps from "./components/ProgressSteps";

export default function Home() {
  // Use environment variable for the current phase, defaulting to 1
  const currentPhase = Number(process.env.NEXT_PUBLIC_PROGRESS_PHASE) || 1;


  return (
    <main className="relative h-[100dvh] w-full flex flex-col justify-between overflow-hidden">
      {/* Background Image */}
      <Image
        src="/turfInBG.png"
        alt="Background"
        fill
        className="object-cover"
        priority
      />

      {/* Navbar Container */}
      <div className="relative z-50 w-full flex justify-center pt-2 md:pt-4">
        <Navbar />
      </div>

      {/* Main Content Area - Flexible scaling */}
      <div className="relative z-10 flex-1 w-full flex items-center justify-center px-4 py-[1vh] md:py-[2vh]">
        {/* Glassmorphic Container with Dual Borders */}
        <div className="rounded-[40px] md:rounded-[48px] border border-white/10 bg-white/5 backdrop-blur-xl p-1 md:p-1.5 shadow-2xl w-full max-w-[880px] animate-fade-up premium-glow">
          {/* Lime Space (thick border) + Inner Glass (backdrop blur) */}
          <div id="waitlist" className="rounded-[32px] md:rounded-[40px] border-[4px] md:border-[8px] border-[#CCFF00] bg-black/40 backdrop-blur-2xl overflow-hidden">
            {/* Content Area - Maintain vertical one column design */}
            <div className="w-full py-[2vh] md:py-[2.5vh] px-6 md:px-20 flex flex-col items-center text-center gap-[1vh] md:gap-[1.5vh] text-white">
              {/* Launch Badge */}
              <div className="flex items-center gap-2.5 px-5 py-2 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 shrink-0">
                <span className="w-2 h-2 rounded-full bg-[#CCFF00] animate-pulse" />
                <span className="text-[#CCFF00] text-[10px] md:text-xs font-semibold tracking-[0.15em] uppercase">
                  {currentPhase === 4 ? "Live Now" : "Release Date: TBA"}
                </span>
              </div>

              {/* Main Heading */}
              <h1 className="text-white text-3xl md:text-5xl font-bold leading-tight tracking-tight shrink-0">
                Join our <span className="text-[#CCFF00]">waitlist.</span>
              </h1>

              {/* Subtitle */}
              <p className="text-white/50 text-xs md:text-sm leading-relaxed max-w-sm md:max-w-md shrink-0">
                Obtain early access to our program and remain informed about
                release announcements, insider news, and feature previews.
              </p>

              {/* Progress Steps */}
              <div className="w-full max-w-3xl py-[0.5vh] md:py-[1vh] overflow-visible">
                <ProgressSteps currentPhase={currentPhase} />
              </div>

              {/* Email Form */}
              <div className="w-full max-w-md">
                <WaitlistForm />
              </div>

              {/* Social Proof */}
              <div className="flex flex-col md:flex-row items-center gap-3 md:gap-4 mt-1 shrink-0">
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

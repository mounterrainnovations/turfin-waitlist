import Image from "next/image";
import Countdown from "./components/Countdown";
import WaitlistForm from "./components/WaitlistForm";

const LAUNCH_DATE = new Date("2026-05-05T00:00:00");

export default function Home() {
  return (
    <main className="relative min-h-screen w-full overflow-hidden flex items-center justify-center">
      {/* Background Image */}
      <Image
        src="/turfInBG.png"
        alt="Background"
        fill
        className="object-cover"
        priority
      />

      {/* Glassmorphic Container with Dual Borders */}
      <div className="relative z-10 p-6">
        {/* Outer White Border */}
        <div className="rounded-[48px] border border-white p-2 shadow-2xl">
          {/* Lime Space (thick border) + Inner Glass (backdrop blur) */}
          <div className="rounded-[40px] border-[8px] border-[#CCFF00] bg-black/20 backdrop-blur-3xl">
            {/* Content Area */}
            <div className="w-[540px] py-12 px-14 flex flex-col items-center text-center gap-7">
              {/* Launch Badge */}
              <div className="flex items-center gap-2.5 px-5 py-2 rounded-full bg-white/5 border border-white/10">
                <span className="w-2 h-2 rounded-full bg-[#CCFF00] animate-pulse" />
                <span className="text-[#CCFF00] text-xs font-semibold tracking-[0.15em] uppercase">
                  Launches: May 5, 2026
                </span>
              </div>

              {/* Main Heading */}
              <h1 className="text-white text-4xl font-bold leading-tight tracking-tight">
                Join the <span className="text-[#CCFF00]">waitlist.</span>
              </h1>

              {/* Subtitle */}
              <p className="text-white/50 text-sm leading-relaxed max-w-sm">
                Obtain early access to our program and remain informed about
                release announcements, insider news, and feature previews.
              </p>

              {/* Countdown Timer */}
              <Countdown targetDate={LAUNCH_DATE} />

              {/* Email Form */}
              <div className="w-full">
                <WaitlistForm />
              </div>

              {/* Social Proof */}
              <div className="flex items-center gap-3">
                {/* Avatar Stack */}
                <div className="flex -space-x-2.5">
                  {["P", "M", "G", "A"].map((char, i) => (
                    <div
                      key={i}
                      className={`w-8 h-8 rounded-full border-2 border-black/40 flex items-center justify-center overflow-hidden ${
                        char === "P"
                          ? "bg-white"
                          : `bg-gradient-to-br ${
                              [
                                "",
                                "from-violet-400 to-purple-500",
                                "from-amber-400 to-orange-500",
                                "from-pink-400 to-rose-500",
                              ][i]
                            }`
                      }`}
                    >
                      {char === "P" ? (
                        <Image
                          src="/PLogo.png"
                          alt="P"
                          width={32}
                          height={32}
                          className="object-cover w-full h-full"
                        />
                      ) : (
                        <span className="text-[10px] font-bold text-white/80">
                          {char}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
                <p className="text-white/40 text-xs">
                  Join <span className="text-white/70 font-semibold">525+</span>{" "}
                  others on the waitlist
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

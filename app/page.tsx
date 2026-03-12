import Image from "next/image";
import Countdown from "./components/Countdown";
import WaitlistForm from "./components/WaitlistForm";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const LAUNCH_DATE = new Date("2026-05-05T00:00:00");

export default function Home() {
  return (
    <main className="relative min-h-screen w-full flex flex-col">
      {/* Background Image */}
      <Image
        src="/turfInBG.png"
        alt="Background"
        fill
        className="object-cover"
        priority
      />

      {/* Navbar Container */}
      <div className="relative z-50 w-full flex justify-center pt-6">
        <Navbar />
      </div>

      {/* Main Content Area */}
      <div className="relative z-10 flex-1 w-full flex items-center justify-center px-4 py-12">
        {/* Glassmorphic Container with Dual Borders */}
        <div className="rounded-[48px] border border-white p-2 shadow-2xl w-full max-w-[880px] animate-fade-up premium-glow">
          {/* Lime Space (thick border) + Inner Glass (backdrop blur) */}
          <div className="rounded-[40px] border-[6px] md:border-[8px] border-[#CCFF00] bg-black/20 backdrop-blur-3xl overflow-hidden">
            {/* Content Area - Maintain vertical one column design */}
            <div className="w-full py-8 md:py-14 px-6 md:px-20 flex flex-col items-center text-center gap-6 md:gap-8">
              {/* Launch Badge */}
              <div className="flex items-center gap-2.5 px-5 py-2 rounded-full bg-white/5 border border-white/10">
                <span className="w-2 h-2 rounded-full bg-[#CCFF00] animate-pulse" />
                <span className="text-[#CCFF00] text-[10px] md:text-xs font-semibold tracking-[0.15em] uppercase">
                  Launches: May 5, 2026
                </span>
              </div>

              {/* Main Heading */}
              <h1 className="text-white text-3xl md:text-5xl font-bold leading-tight tracking-tight">
                Join the <span className="text-[#CCFF00]">waitlist.</span>
              </h1>

              {/* Subtitle */}
              <p className="text-white/50 text-xs md:text-sm leading-relaxed max-w-sm md:max-w-md">
                Obtain early access to our program and remain informed about
                release announcements, insider news, and feature previews.
              </p>

              {/* Countdown Timer */}
              <div className="w-full">
                <Countdown targetDate={LAUNCH_DATE} />
              </div>

              {/* Email Form */}
              <div className="w-full max-w-md">
                <WaitlistForm />
              </div>

              {/* Social Proof */}
              <div className="flex flex-col md:flex-row items-center gap-3 md:gap-4 mt-2">
                {/* Avatar Stack */}
                <div className="flex -space-x-2.5">
                  {["P", "M", "G", "A"].map((char, i) => (
                    <div
                      key={i}
                      className={`w-8 h-8 md:w-9 md:h-9 rounded-full border-2 border-black/40 flex items-center justify-center overflow-hidden transition-transform hover:scale-110 hover:z-20 ${
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
                          width={36}
                          height={36}
                          className="object-cover w-full h-full"
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
      <div className="relative z-50 w-full flex justify-center pb-6">
        <Footer />
      </div>
    </main>
  );
}

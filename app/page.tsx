import Image from "next/image";

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
      <div className="relative z-10 p-6 animate-in fade-in zoom-in duration-700">
        {/* Outer White Border */}
        <div className="rounded-[48px] border border-white p-2 shadow-2xl">
          {/* Lime Space (thick border) + Inner Glass (backdrop blur) */}
          <div className="rounded-[40px] border-[8px] border-[#CCFF00] bg-black/20 backdrop-blur-3xl">
            {/* Content Area */}
            <div className="w-[480px] min-h-[400px] p-12 flex flex-col items-center justify-center">
              <div className="text-white/90 text-sm font-bold tracking-[0.3em] uppercase drop-shadow-2xl">
                TurfIn Waitlist
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

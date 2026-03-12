"use client";

import { Check, Code, Rocket, TestTube, Users } from "@phosphor-icons/react";

interface ProgressStepsProps {
  currentPhase: number; // 1, 2, 3, or 4
}

export default function ProgressSteps({ currentPhase }: ProgressStepsProps) {
  const steps = [
    { label: "Waitlist", sub: "Phase 1", icon: Users },
    { label: "Development", sub: "Phase 2", icon: Code },
    { label: "Testing", sub: "Phase 3", icon: TestTube },
    { label: "Launch", sub: "Phase 4", icon: Rocket },
  ];

  return (
    <div className="w-full py-8 flex flex-col items-center">
      <div className="relative w-full max-w-2xl px-6 md:px-10">
        {/* Progress Bar Background */}
        <div className="absolute top-[20px] md:top-[28px] left-[12.5%] right-[12.5%] h-[2px] bg-white/5 z-0" />
        
        {/* Filled Progress Bar */}
        <div 
          className="absolute top-[20px] md:top-[28px] left-[12.5%] h-[2px] bg-[#CCFF00] z-0 transition-all duration-700 ease-in-out shadow-[0_0_10px_#CCFF00]"
          style={{ width: `calc(${((currentPhase - 1) / (steps.length - 1)) * 75}%)` }}
        />

        {/* Steps */}
        <div className="relative z-10 flex justify-between">
          {steps.map((step, index) => {
            const stepNum = index + 1;
            const isCompleted = stepNum < currentPhase;
            const isActive = stepNum === currentPhase;
            const isLast = stepNum === steps.length;
            const Icon = step.icon;

            return (
              <div key={index} className="flex flex-col items-center flex-1">
                {/* Circle Wrapper */}
                <div 
                  className={`
                    w-10 h-10 md:w-14 md:h-14 rounded-full flex items-center justify-center transition-all duration-500
                    ${isCompleted 
                      ? "bg-[#CCFF00] text-black shadow-[0_0_20px_rgba(204,255,0,0.4)]" 
                      : isActive 
                      ? "bg-[#CCFF00] text-black shadow-[0_0_15px_rgba(204,255,0,0.4)]" 
                      : "bg-[#0a0a0a] border border-white/10 text-white/20"
                    }
                    ${isActive && !isLast ? "animate-pulse" : ""}
                    ${isActive && isLast ? "animate-glow-breathe-subtle" : ""}
                    relative
                  `}
                >
                  {isCompleted ? (
                    <Check weight="bold" size={24} className="md:size-7" />
                  ) : (
                    <Icon weight={isActive ? "fill" : "bold"} size={22} className="md:size-6" />
                  )}
                  
                  {/* Glow for Last Active Step */}
                  {isActive && isLast && (
                    <div className="absolute inset-0 rounded-full bg-[#CCFF00]/40 blur-2xl animate-glow-breathe -z-10 scale-150" />
                  )}
                </div>

                {/* Labels */}
                <div className="mt-4 flex flex-col items-center gap-1">
                  <span className={`text-[10px] md:text-xs font-bold tracking-widest uppercase transition-colors duration-500
                    ${isActive || isCompleted ? "text-[#CCFF00]" : "text-white/20"}
                  `}>
                    {step.label}
                  </span>
                  <span className={`text-[8px] md:text-[9px] tracking-widest uppercase font-medium transition-colors duration-500
                    ${isActive || isCompleted ? "text-white/40" : "text-white/10"}
                  `}>
                    {step.sub}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <style jsx>{`
        @keyframes glow-breathe {
          0%, 100% { opacity: 0.3; transform: scale(1.2) blur(24px); }
          50% { opacity: 0.6; transform: scale(1.6) blur(32px); }
        }
        @keyframes glow-breathe-subtle {
          0%, 100% { box-shadow: 0 0 15px rgba(204, 255, 0, 0.4); }
          50% { box-shadow: 0 0 35px rgba(204, 255, 0, 0.6); }
        }
        .animate-glow-breathe-subtle {
          animation: glow-breathe-subtle 3s ease-in-out infinite;
        }
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function getTimeLeft(target: Date): TimeLeft {
  const now = new Date().getTime();
  const diff = target.getTime() - now;

  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

export default function Countdown({ targetDate }: { targetDate: Date }) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(getTimeLeft(targetDate));

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(getTimeLeft(targetDate));
    }, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  const blocks = [
    { value: timeLeft.days, label: "DAYS" },
    { value: timeLeft.hours, label: "HOURS" },
    { value: timeLeft.minutes, label: "MINUTES" },
    { value: timeLeft.seconds, label: "SECONDS" },
  ];

  return (
    <div className="flex items-center gap-3">
      {blocks.map((block) => (
        <div
          key={block.label}
          className="flex flex-col items-center justify-center w-[90px] h-[90px] rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md"
        >
          <span className="text-white text-3xl font-bold tabular-nums leading-none">
            {String(block.value).padStart(2, "0")}
          </span>
          <span className="text-white/40 text-[10px] font-semibold tracking-[0.15em] mt-2">
            {block.label}
          </span>
        </div>
      ))}
    </div>
  );
}

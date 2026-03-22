"use client";

import { useEffect, useState, useCallback } from "react";
import { X, Warning, CheckCircle } from "@phosphor-icons/react";

interface ToastProps {
  message: string;
  type?: "success" | "error" | "info";
  onClose: () => void;
  duration?: number;
}

export default function Toast({ message, type = "info", onClose, duration = 4000 }: ToastProps) {
  const [isExiting, setIsExiting] = useState(false);

  const handleClose = useCallback(() => {
    setIsExiting(true);
    setTimeout(onClose, 300); // Match animation duration
  }, [onClose]);

  useEffect(() => {
    const timer = setTimeout(() => {
      handleClose();
    }, duration);
    return () => clearTimeout(timer);
  }, [duration, handleClose]);

  const icons = {
    success: <CheckCircle className="text-[#CCFF00]" size={20} weight="fill" />,
    error: <Warning className="text-red-500" size={20} weight="fill" />,
    info: <CheckCircle className="text-blue-400" size={20} weight="fill" />,
  };

  return (
    <div
      className={`fixed top-4 sm:top-10 left-1/2 -translate-x-1/2 z-[200] flex items-center gap-3 px-5 py-3 rounded-full border border-white/10 bg-black/40 backdrop-blur-2xl shadow-2xl transition-all duration-300 max-w-[min(22rem,calc(100vw-2rem))] ${
        isExiting ? "opacity-0 -translate-y-4" : "opacity-100 translate-y-0 animate-fade-down"
      }`}
    >
      <div className="flex-shrink-0">
        {icons[type]}
      </div>
      <p className="text-white text-sm font-medium">
        {message}
      </p>
      <button
        onClick={handleClose}
        className="ml-2 flex-shrink-0 p-1 rounded-full hover:bg-white/10 transition-colors text-white/40 hover:text-white"
      >
        <X size={14} weight="bold" />
      </button>
    </div>
  );
}

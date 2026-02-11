"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

const WHATSAPP_NUMBER = "+250791220097";
const WHATSAPP_MESSAGE = "Hi Xavier, I found your portfolio and would like to connect!";

export function WhatsAppButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Delay showing the button to avoid distraction
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <a
      href={`https://wa.me/${WHATSAPP_NUMBER.replace(/\+/g, "").replace(/ /g, "")}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "fixed bottom-6 right-6 z-50",
        "flex items-center justify-center",
        "w-16 h-16 rounded-full",
        "bg-[#25D366] hover:bg-[#20BD5A]",
        "text-white shadow-lg transition-all duration-300",
        "hover:scale-110 hover:shadow-xl",
        "animate-bounce-subtle"
      )}
      aria-label="Chat on WhatsApp"
    >
      <Image
        src="/wame.jpg"
        alt="WhatsApp"
        width={40}
        height={40}
        className="rounded-full"
      />
    </a>
  );
}

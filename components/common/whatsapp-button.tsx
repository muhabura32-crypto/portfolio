"use client";

import { useState, useEffect } from "react";
import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
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

  const handleClick = () => {
    const url = `https://wa.me/${WHATSAPP_NUMBER.replace(/\+/g, "").replace(/ /g, "")}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  if (!isVisible) return null;

  return (
    <a
      href={`https://wa.me/${WHATSAPP_NUMBER.replace(/\+/g, "").replace(/ /g, "")}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "fixed bottom-6 right-6 z-50",
        "flex items-center justify-center",
        "w-14 h-14 rounded-full",
        "bg-[#25D366] hover:bg-[#20BD5A]",
        "text-white shadow-lg transition-all duration-300",
        "hover:scale-110 hover:shadow-xl",
        "animate-bounce-subtle"
      )}
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle className="w-7 h-7" />
      <span className="sr-only">Chat on WhatsApp</span>
    </a>
  );
}

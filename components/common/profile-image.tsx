"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import profileImg from "@/public/profile.jpg";

export function ProfileImage() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="relative w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden border-4 border-primary/20 shadow-xl"
    >
      <Image
        src={profileImg}
        alt="XAVIER - Applied AI Engineer"
        fill
        className="object-cover"
        priority
      />
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
        <p className="text-white text-center font-bold text-sm md:text-base">
          xavier
          <br />
          <span className="text-xs font-normal">Applied AI Engineer</span>
        </p>
      </div>
    </motion.div>
  );
}

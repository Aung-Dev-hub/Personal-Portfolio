import React from "react";
import { motion, Easing } from "framer-motion";
import { AboutBadgeData } from "@/types/about.type";

interface AboutBadgeProps {
  badge: AboutBadgeData;
  ease: Easing;
}

export const AboutBadge: React.FC<AboutBadgeProps> = ({ badge, ease }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92, y: 30 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      animate={{ y: [0, -8, 0, 8, 0] }}
      transition={{
        opacity: { duration: 0.6, delay: 0.3, ease },
        scale: { duration: 0.6, delay: 0.3, ease },
        y: { duration: 5, repeat: Infinity, ease: "easeInOut" },
      }}
      className="absolute -bottom-6 -right-4 z-20 flex h-23 w-23 flex-col items-center justify-center rounded-sm border border-red-400/20 bg-black/70 backdrop-blur-md"
    >
      <div className="font-display bg-linear-to-r text-2xl font-bold leading-none from-white via-white to-red-500 bg-clip-text text-transparent">
        {badge.year}
      </div>
      <div className="mt-2 text-[10px] font-medium tracking-[0.3em] text-white/60">
        {badge.label}
      </div>
    </motion.div>
  );
};

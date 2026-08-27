"use client";

import { motion } from "framer-motion";

import { HERO_EASE } from "@/libs/hero.lib";
import type { HeroStatusProps } from "@/types/hero.type";

export default function HeroStatus({ status }: HeroStatusProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: HERO_EASE }}
      className="mb-5 flex items-center gap-3 md:mb-5.5 md:gap-3.25"
    >
      <span className="relative flex h-2 w-2 shrink-0">
        <motion.span
          animate={{ scale: [1, 2.2, 1], opacity: [0.75, 0, 0.75] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut" }}
          className="absolute h-2 w-2 rounded-full bg-[#e01010]"
        />
        <span className="absolute h-2 w-2 rounded-full bg-[#e01010]" />
      </span>

      <span className="inline-flex min-w-0 items-center font-mono text-[10px] font-semibold uppercase leading-none tracking-[0.18em] text-white/48 sm:text-[12px] sm:tracking-[0.23em] md:text-[13px] min-[2560px]:text-[15px]">
        {status}
      </span>
    </motion.div>
  );
}

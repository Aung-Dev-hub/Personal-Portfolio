"use client";

import { motion } from "framer-motion";

import { HERO_EASE } from "@/libs/hero.lib";
import type { HeroButtonsProps } from "@/types/hero.type";

export default function HeroButtons({ buttons }: HeroButtonsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.45, ease: HERO_EASE }}
      className="mt-10 flex w-full flex-col items-stretch gap-3 min-[480px]:w-fit min-[480px]:flex-row min-[480px]:items-center md:mt-12"
    >
      <motion.a
        href={buttons.primary.href}
        whileHover={{ scale: 1.025, y: -2 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: "spring", stiffness: 400, damping: 20 }}
        className="inline-flex min-h-13 w-full shrink-0 items-center justify-center rounded-full bg-[linear-gradient(105deg,#d40000_0%,#ff3939_100%)] px-7 text-center text-[15px] font-medium text-white shadow-[0_10px_35px_rgba(224,16,16,0.18)] transition-shadow duration-300 hover:shadow-[0_15px_45px_rgba(224,16,16,0.3)] min-[480px]:w-56 md:min-h-14.5 md:w-60 md:px-8.75 md:text-[16px] min-[2560px]:min-h-16 min-[2560px]:w-72 min-[2560px]:text-[18px]"
      >
        {buttons.primary.label}
      </motion.a>

      <motion.a
        href={buttons.secondary.href}
        whileHover={{ y: -2, backgroundColor: "rgba(255,255,255,0.04)" }}
        whileTap={{ scale: 0.98 }}
        transition={{ duration: 0.25, ease: HERO_EASE }}
        className="inline-flex min-h-13 w-full shrink-0 items-center justify-center rounded-full border border-white/9 bg-black/8 px-7 text-center text-[15px] font-medium text-white/72 transition-colors duration-300 hover:text-white min-[480px]:w-56 md:min-h-14.5 md:w-60 md:px-8.75 md:text-[16px] min-[2560px]:min-h-16 min-[2560px]:w-72 min-[2560px]:text-[18px]"
      >
        {buttons.secondary.label}
      </motion.a>
    </motion.div>
  );
}

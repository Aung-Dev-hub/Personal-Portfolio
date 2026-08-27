"use client";

import { motion } from "framer-motion";

import { HERO_EASE } from "@/libs/hero.lib";
import type { HeroDescriptionProps } from "@/types/hero.type";

import HeroRole from "./HeroRole";

export default function HeroDescription({
  description,
  currentLabel,
  roles,
  index,
}: HeroDescriptionProps) {
  return (
    <div className="mt-9 flex flex-col items-start gap-9 md:mt-10 md:flex-row md:items-start md:justify-between md:gap-10">
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.25, ease: HERO_EASE }}
        className="w-full max-w-137.5 text-[14px] leading-[1.75] tracking-[-0.015em] text-white/50 md:max-w-105 md:text-[16px] md:leading-[1.8] min-[1101px]:text-[18px] min-[2560px]:max-w-140 min-[2560px]:text-[21px]"
      >
        {description}
      </motion.p>

      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, delay: 0.35, ease: HERO_EASE }}
        className="w-full shrink-0 text-left md:w-65 md:text-right"
      >
        <div className="inline-flex items-center font-mono text-[10px] font-semibold uppercase leading-none tracking-[0.18em] text-white/48 sm:text-[12px] sm:tracking-[0.23em] md:text-[13px] min-[2560px]:text-[15px]">
          {currentLabel}
        </div>

        <HeroRole roles={roles} index={index} />
      </motion.div>
    </div>
  );
}

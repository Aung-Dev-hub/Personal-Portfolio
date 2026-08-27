"use client";

import { motion } from "framer-motion";

import { HERO_EASE, getHeroOpacity } from "@/libs/hero.lib";
import type { HeroBottomProps } from "@/types/hero.type";

export default function HeroBottom({ bottom, offset }: HeroBottomProps) {
  const opacity = getHeroOpacity(offset);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity, y: 0 }}
      transition={{ duration: 0.6, ease: HERO_EASE }}
      className="pointer-events-none absolute inset-x-5 bottom-5 mx-auto flex max-w-7xl items-center justify-between gap-5 sm:inset-x-7.5 min-[1101px]:inset-x-10 min-[1101px]:bottom-7 min-[2560px]:max-w-[110rem]"
    >
      <span className="inline-flex min-w-0 items-center truncate font-mono text-[8px] font-semibold uppercase leading-none tracking-[0.18em] text-white/48 sm:text-[10px] sm:tracking-[0.23em] min-[2560px]:text-[12px]">
        {bottom.left}
      </span>

      <span className="inline-flex min-w-0 items-center truncate text-right font-mono text-[8px] font-semibold uppercase leading-none tracking-[0.18em] text-white/48 sm:text-[10px] sm:tracking-[0.23em] min-[2560px]:text-[12px]">
        {bottom.right}
      </span>
    </motion.div>
  );
}

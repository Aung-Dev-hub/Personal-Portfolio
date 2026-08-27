"use client";

import { motion } from "framer-motion";

import { HERO_EASE } from "@/libs/hero.lib";
import type { HeroTitleProps } from "@/types/hero.type";

export default function HeroTitle({ title }: HeroTitleProps) {
  return (
    <h1 className="m-0 font-display text-[clamp(3rem,15vw,4.6rem)] font-bold leading-[0.86] tracking-[-0.055em] min-[481px]:text-[clamp(3.5rem,13vw,6rem)] min-[768px]:text-[clamp(4.2rem,9.5vw,7rem)] min-[768px]:leading-[0.83] min-[1101px]:text-[clamp(4.8rem,9.4vw,9rem)] min-[1101px]:tracking-[-0.065em] min-[2560px]:text-[clamp(9rem,7.5vw,14rem)]">
      <span className="block overflow-hidden pb-[0.06em]">
        <motion.span
          initial={{ y: "110%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.9, ease: HERO_EASE }}
          className="block text-white/88"
        >
          {title.firstLine}
        </motion.span>
      </span>

      <span className="block overflow-hidden pb-[0.08em]">
        <motion.span
          initial={{ y: "110%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.9, delay: 0.12, ease: HERO_EASE }}
          className="mt-2 block bg-[linear-gradient(100deg,#ffffff_0%,#ff4437_100%)] bg-clip-text text-transparent [-webkit-text-fill-color:transparent] md:mt-4"
        >
          {title.secondLine}
        </motion.span>
      </span>
    </h1>
  );
}

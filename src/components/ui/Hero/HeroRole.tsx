"use client";

import { AnimatePresence, motion } from "framer-motion";

import { HERO_EASE } from "@/libs/hero.lib";
import type { HeroRoleProps } from "@/types/hero.type";

export default function HeroRole({ roles, index }: HeroRoleProps) {
  const role = roles[index];

  if (!role) return null;

  return (
    <div className="relative mt-2.25 h-9 w-full overflow-hidden min-[2560px]:h-12">
      <AnimatePresence initial={false} mode="popLayout">
        <motion.div
          key={role}
          initial={{ y: "110%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "-110%", opacity: 0 }}
          transition={{ duration: 0.7, ease: HERO_EASE }}
          className="absolute inset-0 whitespace-nowrap text-left font-display text-[20px] font-semibold leading-9 text-white sm:text-[23px] md:text-right min-[2560px]:text-[30px] min-[2560px]:leading-12"
        >
          {role}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

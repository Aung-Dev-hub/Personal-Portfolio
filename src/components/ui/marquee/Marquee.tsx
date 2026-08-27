"use client";

import { motion } from "framer-motion";

import { marqueeItems } from "@/data/marquee.data";

export function Marquee() {
  const row: string[] = [...marqueeItems, ...marqueeItems];

  return (
    <section className="group relative w-full overflow-hidden border-y border-white/12 bg-black/8 py-4.5 md:py-5.5">
      <motion.div
        initial={{ x: 0 }}
        animate={{ x: "-50%" }}
        transition={{ duration: 22, ease: "linear", repeat: Infinity }}
        className="flex w-max items-center gap-8 whitespace-nowrap will-change-transform md:gap-12"
      >
        {row.map((item: string, i: number) => (
          <div
            key={`${item}-${i}`}
            className="flex shrink-0 items-center gap-8 md:gap-12"
          >
            <span className="font-display text-[20px] font-medium leading-none tracking-[-0.035em] text-white/78 sm:text-[24px] md:text-[30px] min-[2560px]:text-[38px]">
              {item}
            </span>

            <motion.span
              animate={{ opacity: [0.7, 1, 0.7], scale: [1, 1.15, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#e01010] shadow-[0_0_12px_rgba(224,16,16,0.35)] md:h-1.75 md:w-1.75"
            />
          </div>
        ))}
      </motion.div>
    </section>
  );
}

export default Marquee;

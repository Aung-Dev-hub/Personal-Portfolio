"use client";

import { motion } from "framer-motion";

export default function Logo() {
  return (
    <motion.a
      href="#top"
      initial={{ opacity: 0, x: -12 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      whileHover="hover"
      className="group flex min-w-0 shrink items-center gap-2.5 no-underline"
    >
      <motion.span
        animate={{ opacity: [1, 1, 0.4, 1, 1] }}
        variants={{ hover: { scale: 1.06, rotate: -2 } }}
        transition={{
          opacity: { duration: 4, repeat: Infinity, ease: "linear" },
          scale: { type: "spring", stiffness: 400, damping: 20 },
          rotate: { type: "spring", stiffness: 400, damping: 20 },
        }}
        className="grid h-8 w-8 shrink-0 place-items-center rounded-[3px] bg-[linear-gradient(135deg,#ff3030_0%,#d90000_100%)] shadow-[0_0_22px_rgba(224,16,16,0.2)] transition-shadow duration-300 group-hover:shadow-[0_0_28px_rgba(224,16,16,0.38)] sm:h-8.5 sm:w-8.5 min-[2560px]:h-10 min-[2560px]:w-10"
      >
        <motion.span
          variants={{ hover: { scale: 1.08 } }}
          className="relative z-2 font-display text-[15px] font-bold text-white sm:text-[16px] min-[2560px]:text-[19px]"
        >
          A
        </motion.span>
      </motion.span>

      <motion.span
        variants={{ hover: { x: 2 } }}
        transition={{ type: "spring", stiffness: 350, damping: 24 }}
        className="min-w-0 max-w-36 overflow-hidden text-ellipsis whitespace-nowrap text-[13px] font-semibold tracking-[-0.02em] text-white/88 sm:max-w-55 sm:text-[14px] min-[2560px]:text-[17px]"
      >
        Aung Myo Oo
      </motion.span>
    </motion.a>
  );
}

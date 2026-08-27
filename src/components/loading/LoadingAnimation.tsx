"use client";

import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { Sparkles, Code2, Zap, Rocket } from "lucide-react";

import type { LoadingAnimationProps } from "@/types/loading";

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 18, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

export function LoadingAnimation({
  name,
  messages,
  progress,
  messageIndex,
}: LoadingAnimationProps) {
  return (
    <div className="relative z-10 flex w-full max-w-md flex-col items-center px-6 text-center">
      <motion.div
        variants={itemVariants}
        className="relative mb-10 flex h-24 w-24 items-center justify-center"
      >
        <span className="absolute inset-0 rounded-full border border-red-500/30" />

        <motion.span
          className="absolute -inset-1.5 rounded-full"
          style={{
            background:
              "conic-gradient(from 0deg, transparent 0%, #ef4444 40%, transparent 60%)",
            maskImage: "radial-gradient(transparent 63%, black 65%)",
            WebkitMaskImage: "radial-gradient(transparent 63%, black 65%)",
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        />

        <span className="absolute inset-1 rounded-full bg-black" />

        <motion.div
          className="relative flex h-16 w-16 items-center justify-center rounded-full bg-white/5 text-red-500 ring-1 ring-white/10"
          animate={{ scale: [1, 1.08, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <Sparkles className="h-7 w-7" />
        </motion.div>

        <motion.span
          className="absolute h-full w-full"
          animate={{ rotate: -360 }}
          transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
        >
          <span className="absolute -left-2 top-1/2 -translate-y-1/2 rounded-full border border-white/10 bg-black p-1.5 text-white/50">
            <Code2 className="h-3 w-3" />
          </span>
        </motion.span>

        <motion.span
          className="absolute h-full w-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 7, repeat: Infinity, ease: "linear" }}
        >
          <span className="absolute -right-2 top-1/2 -translate-y-1/2 rounded-full border border-white/10 bg-black p-1.5 text-white/50">
            <Zap className="h-3 w-3" />
          </span>
        </motion.span>

        <motion.span
          className="absolute h-full w-full"
          animate={{ rotate: -360 }}
          transition={{ duration: 9, repeat: Infinity, ease: "linear" }}
        >
          <span className="absolute left-1/2 -top-2 -translate-x-1/2 rounded-full border border-white/10 bg-black p-1.5 text-white/50">
            <Rocket className="h-3 w-3" />
          </span>
        </motion.span>
      </motion.div>

      <motion.h2
        variants={itemVariants}
        className="text-3xl font-bold tracking-tight sm:text-4xl"
      >
        <span className="bg-linear-to-r from-red-400 via-red-500 to-red-600 bg-clip-text text-transparent">
          {name}
        </span>
      </motion.h2>

      <motion.div variants={itemVariants} className="mt-4 h-6 overflow-hidden">
        <motion.p
          key={messageIndex}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.35 }}
          className="font-mono text-xs uppercase tracking-[0.22em] text-white/40"
        >
          {messages[messageIndex]}
        </motion.p>
      </motion.div>

      <motion.div variants={itemVariants} className="mt-10 w-full">
        <div className="h-1 w-full overflow-hidden rounded-full bg-white/10">
          <motion.div
            className="h-full rounded-full bg-linear-to-r from-red-600 to-red-400"
            animate={{ width: `${Math.min(Math.round(progress), 100)}%` }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          />
        </div>

        <motion.div
          className="mt-3 font-mono text-[10px] tracking-[0.3em] text-white/30"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.8, repeat: Infinity }}
        >
          {Math.min(Math.round(progress), 100)}%
        </motion.div>
      </motion.div>
    </div>
  );
}

"use client";

import { motion, AnimatePresence } from "framer-motion";

import { loadingScreenData } from "@/data/loadingScreen";
import { useLoadingScreen } from "@/hooks/useLoadingScreen";
import type { LoadingScreenProps } from "@/types/loading";

import { LoadingAnimation } from "./LoadingAnimation";

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const { name, messages, animation } = loadingScreenData;

  const { progress, messageIndex } = useLoadingScreen({
    ...animation,
    messageLength: messages.length,
    onComplete,
  });

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: 1 }}
        exit={{
          opacity: 0,
          scale: 1.05,
          filter: "blur(8px)",
          transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
        }}
        className="fixed inset-0 z-9999 flex items-center justify-center bg-black text-white"
      >
        <LoadingAnimation
          name={name}
          messages={messages}
          progress={progress}
          messageIndex={messageIndex}
        />
      </motion.div>
    </AnimatePresence>
  );
}

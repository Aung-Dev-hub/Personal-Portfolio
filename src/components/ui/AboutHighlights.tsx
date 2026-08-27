import React from "react";
import { motion, Easing } from "framer-motion";
import { HighlightItem } from "@/types/about.type";

interface AboutHighlightsProps {
  highlights: HighlightItem[];
  ease: Easing;
}

export const AboutHighlights: React.FC<AboutHighlightsProps> = ({
  highlights,
  ease,
}) => {
  return (
    <div className="mt-14 grid grid-cols-2 gap-4">
      {highlights.map((item, index) => (
        <motion.div
          key={item.text}
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.26 + index * 0.07, ease }}
          whileHover={{ y: -3 }}
          className="flex items-center gap-2.5 rounded-[10px] border border-white/6 bg-white/3 px-4 py-3 transition-colors duration-300 hover:border-white/12 hover:bg-white/5"
        >
          <span className="text-lg">{item.icon}</span>
          <span className="text-sm font-medium text-white/70">{item.text}</span>
        </motion.div>
      ))}
    </div>
  );
};

import React from "react";
import { motion } from "framer-motion";
import { SkillGroup } from "@/types/skills.type";
import { SkillItem } from "./SkillItem";

interface SkillGroupCardProps {
  group: SkillGroup;
  index: number;
  hoveredIndex: number | null;
  setHoveredIndex: (index: number | null) => void;
}

export const SkillGroupCard: React.FC<SkillGroupCardProps> = ({
  group,
  index,
  hoveredIndex,
  setHoveredIndex,
}) => {
  const isBlurred = hoveredIndex !== null && hoveredIndex !== index;
  const isHovered = hoveredIndex === index;

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (hoveredIndex === index) {
      setHoveredIndex(null);
    } else {
      setHoveredIndex(index);
    }
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      onMouseEnter={() => setHoveredIndex(index)}
      onMouseLeave={() => setHoveredIndex(null)}
      onClick={handleClick}
      animate={{
        scale: isHovered ? 1.04 : isBlurred ? 0.96 : 1,
        y: isHovered ? -8 : 0,
        opacity: isBlurred ? 0.45 : 1,
        filter: isBlurred ? "blur(3px)" : "blur(0px)",
      }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className={`group relative h-full cursor-pointer overflow-hidden rounded-xl p-6 transition-all duration-300 sm:p-7 ${
        isHovered
          ? "border-red-500/50 bg-white/10 shadow-[0_12px_30px_rgba(255,48,48,0.2)] ring-1 ring-red-500/40 backdrop-blur-xl"
          : isBlurred
            ? "border-red-950/30 bg-red-950/20 backdrop-blur-md"
            : "border-white/10 bg-white/5 backdrop-blur-xl"
      }`}
    >
      {/* Active (Hovered) Card Glow */}
      <div
        className={`pointer-events-none absolute -right-20 -top-20 h-40 w-40 rounded-full blur-3xl transition-opacity duration-500 ${
          isHovered ? "opacity-60" : "opacity-0"
        }`}
        style={{ background: "#ff3030" }}
      />
      {/* Blurred Card Soft Red Background Glow */}
      <div
        className={`pointer-events-none absolute -bottom-20 -left-20 h-40 w-40 rounded-full blur-3xl transition-opacity duration-500 ${
          isBlurred ? "opacity-30" : "opacity-0"
        }`}
        style={{ background: "#991b1b" }}
      />

      <div className="relative flex items-center justify-between">
        <h3 className="font-display text-xl font-semibold">{group.title}</h3>
        <span
          className={`grid h-8 w-8 shrink-0 place-items-center rounded-[3px] font-display text-[11px] font-bold text-white transition-all duration-300 sm:h-8 sm:w-8 sm:text-[13px] ${
            isHovered
              ? "bg-[linear-gradient(135deg,#ff3030_0%,#d90000_100%)] shadow-[0_0_20px_rgba(255,48,48,0.4)]"
              : isBlurred
                ? "bg-red-900/40 text-white/70"
                : "bg-white/10"
          }`}
        >
          {group.level}%
        </span>
      </div>

      <div className="relative mt-5 h-px w-full bg-border/60">
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{
            duration: 1,
            delay: index * 0.1 + 0.25,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="absolute inset-y-0 left-0 h-px origin-left"
          style={{
            width: `${group.level}%`,
            background: isHovered
              ? "#ff3030"
              : isBlurred
                ? "#991b1b"
                : "#ffffff",
          }}
        />
      </div>

      <ul className="relative mt-7 flex flex-col gap-4">
        {group.items.map((item, itemIndex) => (
          <SkillItem
            key={item.name}
            item={item}
            groupIndex={index}
            itemIndex={itemIndex}
          />
        ))}
      </ul>
    </motion.article>
  );
};

import React, { useState } from "react";
import { motion } from "framer-motion";
import { skillGroups } from "@/data/skills.data";
import { SkillGroupCard } from "./SkillGroupCard";

const SkillsSection: React.FC = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section id="skills" className="relative px-5 py-32 sm:px-6 md:py-44">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="eyebrow text-white/50">02 — Skills</span>
            <h2 className="mt-5 font-display text-[clamp(2rem,4.6vw,3.6rem)] font-bold leading-[1.02]">
              A full stack{" "}
              <span className="text-gradient bg-[linear-gradient(100deg,#ffffff_0%,#ff4437_100%)] bg-clip-text text-transparent">
                of sharp tools.
              </span>
            </h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-sm text-sm leading-relaxed text-white/50"
          >
            Deep in the modern web stack, obsessive about the 5% of polish that makes 95% of the impression.
          </motion.p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-4 md:grid-cols-3">
          {skillGroups.map((group, index) => (
            <SkillGroupCard
              key={group.title}
              group={group}
              index={index}
              hoveredIndex={hoveredIndex}
              setHoveredIndex={setHoveredIndex}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
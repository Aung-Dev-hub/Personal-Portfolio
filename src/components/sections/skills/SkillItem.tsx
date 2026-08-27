import React from "react";
import { motion } from "framer-motion";
import { SkillItem as SkillItemType } from "@/types/skills.type";

interface SkillItemProps {
  item: SkillItemType;
  groupIndex: number;
  itemIndex: number;
}

export const SkillItem: React.FC<SkillItemProps> = ({ item, groupIndex, itemIndex }) => {
  const Icon = item.icon;

  return (
    <motion.li
      initial={{ opacity: 0, x: -12 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.5, delay: groupIndex * 0.1 + itemIndex * 0.06, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="flex items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          <span className="grid h-10 w-10 shrink-0 place-items-center">
            <Icon className="h-5 w-5" style={{ color: item.color }} />
          </span>
          <span className="truncate text-sm text-foreground/90">{item.name}</span>
        </div>
        <span className="shrink-0 font-mono text-md text-muted-foreground">{item.level}%</span>
      </div>

      <div className="relative mt-2 h-1 w-full overflow-hidden rounded-full bg-border/50">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${item.level}%` }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 1, delay: groupIndex * 0.1 + itemIndex * 0.06 + 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="h-full rounded-full"
          style={{ background: "#ff3030" }}
        />
      </div>
    </motion.li>
  );
};
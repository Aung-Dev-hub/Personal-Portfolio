"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Download } from "lucide-react";

import { CV_URL, navLinks } from "@/data/navbar.data";
import type { MobileMenuProps } from "@/types/navbar.type";

const ease = [0.22, 1, 0.36, 1] as const;

const menuVariants = {
  hidden: { opacity: 0, y: -8, scale: 0.98, transformOrigin: "top center" },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.35,
      ease,
      when: "beforeChildren",
      staggerChildren: 0.05,
    },
  },
  exit: {
    opacity: 0,
    y: -8,
    scale: 0.98,
    transition: {
      duration: 0.22,
      ease,
      when: "afterChildren",
      staggerChildren: 0.03,
      staggerDirection: -1,
    },
  },
};

const linkVariants = {
  hidden: { opacity: 0, x: -10 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.35, ease } },
  exit: { opacity: 0, x: -6, transition: { duration: 0.15, ease } },
};

const actionVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease } },
  exit: { opacity: 0, y: 6, transition: { duration: 0.15, ease } },
};

export default function MobileMenu({ open, setOpen }: MobileMenuProps) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          variants={menuVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="absolute left-0 right-0 top-[calc(100%+8px)] max-h-[calc(100svh-6rem)] overflow-y-auto rounded-[22px] border border-white/8 bg-[rgba(13,3,4,0.94)] p-3.5 shadow-[0_25px_70px_rgba(0,0,0,0.45)] backdrop-blur-[20px] md:hidden"
        >
          <motion.div className="flex flex-col gap-0.75">
            {navLinks.map((link) => (
              <motion.a
                key={link.href}
                href={link.href}
                variants={linkVariants}
                onClick={() => setOpen(false)}
                whileHover={{ x: 3, backgroundColor: "rgba(255,255,255,0.05)" }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.2, ease }}
                className="rounded-[13px] px-3.5 py-3.25 text-[15px] text-white/78 transition-colors duration-200 hover:text-white"
              >
                {link.label}
              </motion.a>
            ))}
          </motion.div>

          <motion.div
            variants={actionVariants}
            className="mt-2.5 flex flex-col gap-2 border-t border-white/[0.07] pt-2.5 min-[380px]:flex-row"
          >
            <motion.a
              href={CV_URL}
              download
              onClick={() => setOpen(false)}
              whileHover={{ y: -1, scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
              className="inline-flex min-h-11 flex-1 items-center justify-center gap-1.75 rounded-full border border-white/10 text-[13px] font-medium text-white/78 transition-colors duration-200 hover:border-white/20 hover:bg-white/5 hover:text-white"
            >
              <Download className="h-4 w-4" />
              Download CV
            </motion.a>

            <motion.a
              href="#contact"
              onClick={() => setOpen(false)}
              whileHover={{ y: -1, scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
              className="inline-flex min-h-11 flex-1 items-center justify-center rounded-full bg-[linear-gradient(105deg,#d40000,#ff3939)] text-[13px] font-medium text-white shadow-[0_8px_25px_rgba(224,16,16,0.15)] transition-shadow duration-200 hover:shadow-[0_12px_30px_rgba(224,16,16,0.25)]"
            >
              Hire me
            </motion.a>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

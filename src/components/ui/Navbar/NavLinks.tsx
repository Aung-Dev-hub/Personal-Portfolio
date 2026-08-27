"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Download, Menu, X } from "lucide-react";

import { navLinks, CV_URL } from "@/data/navbar.data";
import type { NavLinksProps } from "@/types/navbar.type";

const ease = [0.22, 1, 0.36, 1] as const;

export default function NavLinks({ open, setOpen }: NavLinksProps) {
  return (
    <>
      <nav className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 items-center whitespace-nowrap min-[901px]:flex min-[901px]:gap-5.5 min-[1101px]:gap-8.5 min-[2560px]:gap-12">
        {navLinks.map((link, index) => (
          <motion.a
            key={link.href}
            href={link.href}
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: index * 0.06, ease }}
            whileHover={{ y: -1 }}
            className="group relative text-[14px] font-normal text-white/[0.55] transition-colors duration-200 hover:text-white/92 min-[2560px]:text-[17px]"
          >
            {link.label}
            <motion.span
              initial={{ scaleX: 0 }}
              whileHover={{ scaleX: 1 }}
              transition={{ duration: 0.3, ease }}
              style={{ originX: 0 }}
              className="absolute -bottom-1.75 left-0 right-0 h-px origin-left bg-[#ff3939]"
            />
          </motion.a>
        ))}
      </nav>

      <div className="flex shrink-0 items-center gap-2 sm:gap-2.5">
        <motion.a
          href={CV_URL}
          download
          whileHover={{ y: -1, scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          transition={{ type: "spring", stiffness: 400, damping: 20 }}
          className="hidden h-9.5 items-center justify-center gap-2 rounded-full border border-white/10 px-3 text-[12px] font-medium text-white/78 transition-[border-color,background,color] duration-200 hover:border-white/20 hover:bg-white/5 hover:text-white md:inline-flex min-[901px]:px-4 min-[2560px]:h-11 min-[2560px]:text-[14px]"
        >
          <Download size={14} />
          <span>Download CV</span>
        </motion.a>

        <motion.a
          href="#contact"
          whileHover={{ scale: 1.03, y: -1 }}
          whileTap={{ scale: 0.97 }}
          transition={{ type: "spring", stiffness: 400, damping: 20 }}
          className="hidden h-9.5 items-center justify-center rounded-full bg-[linear-gradient(110deg,#d80000_0%,#ff3939_100%)] px-4 text-[12px] font-semibold text-white shadow-[0_8px_25px_rgba(224,16,16,0.18)] transition-shadow duration-200 hover:shadow-[0_12px_35px_rgba(224,16,16,0.28)] md:inline-flex min-[901px]:px-5.25 min-[2560px]:h-11 min-[2560px]:text-[14px]"
        >
          Hire me
        </motion.a>

        <motion.button
          type="button"
          whileTap={{ scale: 0.9 }}
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 400, damping: 20 }}
          className="grid h-9.5 w-9.5 shrink-0 place-items-center rounded-full border border-white/9 bg-transparent text-white md:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
        >
          <AnimatePresence mode="wait" initial={false}>
            {open ? (
              <motion.span
                key="close"
                initial={{ opacity: 0, rotate: -90, scale: 0.7 }}
                animate={{ opacity: 1, rotate: 0, scale: 1 }}
                exit={{ opacity: 0, rotate: 90, scale: 0.7 }}
                transition={{ duration: 0.2, ease }}
              >
                <X size={18} />
              </motion.span>
            ) : (
              <motion.span
                key="menu"
                initial={{ opacity: 0, rotate: 90, scale: 0.7 }}
                animate={{ opacity: 1, rotate: 0, scale: 1 }}
                exit={{ opacity: 0, rotate: -90, scale: 0.7 }}
                transition={{ duration: 0.2, ease }}
              >
                <Menu size={18} />
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      </div>
    </>
  );
}

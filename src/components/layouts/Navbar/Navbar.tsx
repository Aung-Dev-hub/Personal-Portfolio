"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import Logo from "./Logo";
import NavLinks from "./NavLinks";
import MobileMenu from "./MobileMenu";

import { useViewportWidth } from "@/hooks/useViewportWidth";
import { getNavbarLayout } from "@/libs/navbar.lib";

export default function Navbar() {
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);

  const viewportWidth = useViewportWidth();

  const { width, maxWidth, isMobile } = getNavbarLayout(
    viewportWidth,
    scrolled,
  );

  useEffect(() => {
    const onScroll = (): void => {
      setScrolled(window.scrollY > 80);
    };

    onScroll();

    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useEffect(() => {
    if (!isMobile) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setOpen(false);
    }
  }, [isMobile]);

  return (
    <motion.header
      initial={false}
      animate={{ paddingTop: isMobile ? 14 : scrolled ? 16 : 24 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-0 top-0 z-100"
    >
      <motion.nav
        initial={false}
        animate={{
          minHeight: isMobile ? 58 : scrolled ? 56 : 68,
          width,
          maxWidth,
          backgroundColor: scrolled
            ? "rgba(13, 13, 13, 0.42)"
            : "rgba(13, 13, 13, 0.28)",
          borderColor: scrolled
            ? "rgba(255, 255, 255, 0.09)"
            : "rgba(255, 255, 255, 0.08)",
          paddingLeft: isMobile ? 15 : scrolled ? 20 : 28,
          paddingRight: isMobile ? 10 : scrolled ? 14 : 24,
          boxShadow: scrolled
            ? "0 16px 50px rgba(0,0,0,0.25)"
            : "0 10px 40px rgba(0,0,0,0.15)",
        }}
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
        className="relative mx-auto flex w-[calc(100%-28px)] items-center justify-between gap-3 rounded-[22px] border backdrop-blur-[20px] backdrop-saturate-115 md:rounded-full"
      >
        <Logo />
        <NavLinks open={open} setOpen={setOpen} />
        <MobileMenu open={open} setOpen={setOpen} />
      </motion.nav>
    </motion.header>
  );
}

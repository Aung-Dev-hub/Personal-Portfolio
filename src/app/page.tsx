"use client";

import { useCallback, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import LoadingScreen from "@/components/loading/LoadingScreen";
import FluidCanvas from "@/components/theme/background/FluidCanvas";
import CustomCursor from "@/components/ui/customCursor/CustomCursor";
import Navbar from "@/components/layouts/Navbar/Navbar";
import Hero from "@/components/sections/Hero/Hero";
import Marquee from "@/components/sections/marquee/Marquee";
import AboutSection from "@/components/sections/about/AboutSection";


export default function Home(): React.JSX.Element {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [pageKey, setPageKey] = useState<number>(0);

  const handleLoadingComplete = useCallback((): void => {
    setPageKey((prev: number) => prev + 1);
    setIsLoading(false);
  }, []);

  return (
    <div className="min-h-screen bg-black">
      {/* Website */}
      <motion.div
        key={pageKey}
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: isLoading ? 0 : 1,
        }}
        transition={{
          duration: 0.35,
          ease: "easeOut",
        }}
        className="min-h-screen"
      >
        <FluidCanvas />
        <CustomCursor />
        
        <div className="page-content">
          <Navbar/>
          <main>
            <Hero/>
            <Marquee/>
            <AboutSection/>
          </main>
        </div>
      </motion.div>

      {/* Loading Screen */}
      <AnimatePresence mode="wait">
        {isLoading && <LoadingScreen onComplete={handleLoadingComplete} />}
      </AnimatePresence>
    </div>
  );
}

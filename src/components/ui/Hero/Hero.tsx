"use client";

import { motion } from "framer-motion";

import { heroData } from "@/data/hero.data";
import { useHero } from "@/hooks/useHero";
import { getHeroOpacity, getHeroParallax } from "@/libs/hero.lib";

import HeroStatus from "./HeroStatus";
import HeroTitle from "./HeroTitle";
import HeroDescription from "./HeroDescription";
import HeroButtons from "./HeroButtons";
import HeroBottom from "./HeroBottom";

export default function Hero() {
  const { index, offset } = useHero(heroData.roles.length);

  const opacity = getHeroOpacity(offset);
  const parallax = getHeroParallax(offset);

  return (
    <section
      id="top"
      className="relative z-2 flex min-h-svh flex-col justify-center px-5 pb-28 pt-32 sm:px-7.5 sm:pt-36 min-[1101px]:px-10 min-[1101px]:pb-22.5 min-[1101px]:pt-37.5 min-[2560px]:px-16"
    >
      <motion.div
        animate={{ y: parallax, opacity }}
        transition={{ duration: 0.1, ease: "linear" }}
        className="mx-auto w-full max-w-7xl min-[2560px]:max-w-[110rem]"
      >
        <HeroStatus status={heroData.status} />

        <HeroTitle title={heroData.title} />

        <HeroDescription
          description={heroData.description}
          currentLabel={heroData.currentLabel}
          roles={heroData.roles}
          index={index}
        />

        <HeroButtons buttons={heroData.buttons} />
      </motion.div>

      <HeroBottom bottom={heroData.bottom} offset={offset} />
    </section>
  );
}

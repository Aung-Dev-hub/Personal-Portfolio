import React from "react";
import { motion, Variants } from "framer-motion";
import { aboutData } from "@/data/about.data";
import { useAnimationEase } from "@/hooks/useAnimationEase";
import { AboutBadge } from "@/components/ui/AboutBadge";
import { AboutHighlights } from "@/components/ui/AboutHighlights";
import portrait from "@/assets/AungMyoOo.png";

const revealVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

export const AboutSection: React.FC = () => {
  const ease = useAnimationEase();

  return (
    <section id="about" className="relative px-5 py-32 sm:px-6 md:py-44">
      <div className="mx-auto max-w-6xl">
        {/* Eyebrow */}
        <motion.span
          variants={revealVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease }}
          className="eyebrow inline-block text-white/50"
        >
          {aboutData.eyebrow}
        </motion.span>

        <div className="mt-12 grid gap-16 md:grid-cols-[0.9fr_1.1fr] md:gap-20">
          {/* Image Container */}
          <motion.div
            variants={revealVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease }}
          >
            <div className="relative">
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.9, ease }}
                className="relative overflow-hidden rounded-sm"
              >
                <motion.img
                  src={portrait.src}
                  alt="Portrait"
                  loading="lazy"
                  width={1024}
                  height={1280}
                  whileHover={{ scale: 1.04 }}
                  transition={{ duration: 1.2, ease }}
                  className="block h-full w-full object-cover"
                />

                {/* Red Overlay */}
                <div
                  className="pointer-events-none absolute inset-0 mix-blend-overlay"
                  style={{ background: "var(--gradient-red)", opacity: 0.22 }}
                />
              </motion.div>

              <AboutBadge badge={aboutData.badge} ease={ease} />
            </div>
          </motion.div>

          {/* Content */}
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7, delay: 0.08, ease }}
              className="font-display text-[clamp(2rem,4.6vw,3.6rem)] font-bold leading-[1.02]"
            >
              {aboutData.title.normal}
              <span className="bg-[linear-gradient(100deg,#ffffff_0%,#ff4437_100%)] bg-clip-text text-transparent">
                {" "}
                {aboutData.title.highlight}
              </span>
            </motion.h2>

            {aboutData.paragraphs.map((paragraph, index) => (
              <motion.p
                key={index}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.7, delay: 0.16 + index * 0.06, ease }}
                className={`text-white/50 ${index === 0 ? "mt-8" : "mt-5"} max-w-xl leading-relaxed text-muted-foreground`}
              >
                {paragraph}
              </motion.p>
            ))}

            <AboutHighlights highlights={aboutData.highlights} ease={ease} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;

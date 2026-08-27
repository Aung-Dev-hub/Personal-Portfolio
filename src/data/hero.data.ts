import type { HeroData } from "@/types/hero.type";

export const heroData: HeroData = {
    status: "Available for 2026 projects",

    title: {
        firstLine: "Turning Ideas",
        secondLine: "Into Digital Reality",
    },

    description:
        "I build high-performance web products where motion, clarity and craft pull people in — and keep them there. Interfaces that feel inevitable.",

    currentLabel: "Currently",

    roles: [
        "Full-stack Developer",
        "Product Engineer",
        "Frontend Developer",
        "UI Architect",
        "Creative Coder",
    ],

    buttons: {
        primary: {
            label: "View selected work",
            href: "#projects",
        },

        secondary: {
            label: "Start a project",
            href: "#contact",
        },
    },

    bottom: {
        left: "Scroll",
        right: "Yangon · Remote worldwide",
    },
};
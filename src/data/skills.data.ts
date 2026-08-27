import {
    SiReact,
    SiNextdotjs,
    SiTailwindcss,
    SiTypescript,
    SiNodedotjs,
    SiExpress,
    SiDjango,
    SiPhp,
    SiMongodb,
    SiPostgresql,
    SiFirebase,
} from "react-icons/si";
import { Database } from "lucide-react";
import { SkillGroup } from "@/types/skills.type";

export const skillGroups: SkillGroup[] = [
    {
        title: "Frontend",
        level: 90,
        items: [
            { name: "React", level: 95, icon: SiReact, color: "#61DAFB" },
            { name: "Next.js", level: 95, icon: SiNextdotjs, color: "#ffffff" },
            { name: "TypeScript", level: 80, icon: SiTypescript, color: "#3178C6" },
            { name: "Tailwind CSS", level: 90, icon: SiTailwindcss, color: "#06B6D4" },
        ],
    },
    {
        title: "Backend",
        level: 80,
        items: [
            { name: "Node.js", level: 80, icon: SiNodedotjs, color: "#339933" },
            { name: "Express.js", level: 80, icon: SiExpress, color: "#ffffff" },
            { name: "Django", level: 80, icon: SiDjango, color: "#44B78B" },
            { name: "PHP", level: 50, icon: SiPhp, color: "#777BB4" },
        ],
    },
    {
        title: "Database",
        level: 80,
        items: [
            { name: "MongoDB", level: 80, icon: SiMongodb, color: "#47A248" },
            { name: "PostgreSQL", level: 80, icon: SiPostgresql, color: "#4169E1" },
            { name: "SQL", level: 80, icon: Database, color: "#3B82F6" },
            { name: "Firebase", level: 50, icon: SiFirebase, color: "#FFCA28" },
        ],
    },
];
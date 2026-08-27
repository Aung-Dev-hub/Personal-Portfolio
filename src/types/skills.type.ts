import { ComponentType } from "react";

export interface SkillItem {
    name: string;
    level: number;
    icon: ComponentType<{ className?: string; style?: React.CSSProperties }>;
    color: string;
}

export interface SkillGroup {
    title: string;
    level: number;
    items: SkillItem[];
}
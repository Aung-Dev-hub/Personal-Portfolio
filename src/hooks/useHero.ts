"use client";

import { useEffect, useState } from "react";

import type { UseHeroResult } from "@/types/hero.type";

export function useHero(rolesLength: number): UseHeroResult {
    const [index, setIndex] = useState<number>(0);
    const [offset, setOffset] = useState<number>(0);

    useEffect(() => {
        if (rolesLength === 0) return;

        const id = window.setInterval(() => {
            setIndex((current) => (current + 1) % rolesLength);
        }, 2600);

        return () => {
            window.clearInterval(id);
        };
    }, [rolesLength]);

    useEffect(() => {
        const handleScroll = (): void => {
            setOffset(window.scrollY);
        };

        handleScroll();

        window.addEventListener("scroll", handleScroll, {
            passive: true,
        });

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return {
        index,
        offset,
    };
}
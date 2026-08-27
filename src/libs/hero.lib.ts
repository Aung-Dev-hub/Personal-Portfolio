export const HERO_EASE = [0.22, 1, 0.36, 1] as const;

export const HERO_SCROLL_DISTANCE = 850;

export function getHeroOpacity(offset: number): number {
    return Math.max(1 - offset / HERO_SCROLL_DISTANCE, 0);
}

export function getHeroParallax(offset: number): number {
    return offset * 0.04;
}
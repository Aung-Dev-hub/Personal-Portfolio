import { cursorData } from "@/data/cursor.data";

import type {
    CursorPosition,
} from "@/types/cursor.type";

export const getInitialPosition = (): CursorPosition => {
    return {
        x: window.innerWidth / 2,
        y: window.innerHeight / 2,
    };
};

export const getCursorTransform = (
    x: number,
    y: number
): string => {
    const offset = cursorData.size / 2;

    return `translate3d(
    ${x - offset}px,
    ${y - offset}px,
    0
  )`;
};

export const setCursorColor = (
    element: HTMLDivElement | null,
    color: string
): void => {
    if (!element) return;

    element.style.backgroundColor = color;
};

export const hideBrowserCursor = (): void => {
    document.documentElement.style.cursor = "none";
    document.body.style.cursor = "none";
};

export const restoreBrowserCursor = (): void => {
    document.documentElement.style.cursor = "";
    document.body.style.cursor = "";
};
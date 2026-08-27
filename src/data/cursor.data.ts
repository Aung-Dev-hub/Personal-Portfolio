import type { CursorData } from "@/types/cursor.type";

export const cursorData: CursorData = {
    size: 20,

    colors: {
        default: "#ffffff",
        moving: "#000000",
    },

    animation: {
        smoothness: 0.85,
        returnDelay: 120,
        colorTransition: "background-color 0.35s ease",
    },

    shadow: "0 0 10px rgba(255, 255, 255, 0.25)",

    zIndex: 999999,
};
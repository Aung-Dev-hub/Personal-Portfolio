import type { LoadingScreenData } from "@/types/loading";

export const loadingScreenData: LoadingScreenData = {
    name: "Aung Myo Oo",
    messages: [
        "Initializing the experience...",
        "Crafting the interface...",
        "Bringing ideas to life...",
        "Almost ready...",
    ],
    animation: {
        progressInterval: 160,
        progressMin: 5,
        progressMax: 21,
        messageInterval: 850,
        exitDelay: 1600,
    },
};
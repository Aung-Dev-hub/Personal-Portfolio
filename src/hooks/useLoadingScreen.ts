"use client";

import { useEffect, useState } from "react";
import type { LoadingAnimationConfig } from "@/types/loading";

interface UseLoadingScreenOptions extends LoadingAnimationConfig {
    messageLength: number;
    onComplete: () => void;
}

export function useLoadingScreen({ progressInterval, progressMin, progressMax, messageInterval, exitDelay, messageLength, onComplete }: UseLoadingScreenOptions) {
    const [progress, setProgress] = useState(progressMin);
    const [messageIndex, setMessageIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setProgress((current) => {
                if (current >= 100) return 100;
                return Math.min(current + Math.random() * (progressMax - progressMin), 100);
            });
        }, progressInterval);

        return () => clearInterval(timer);
    }, [progressInterval, progressMin, progressMax]);

    useEffect(() => {
        const timer = setInterval(() => {
            setMessageIndex((current) => (current + 1) % messageLength);
        }, messageInterval);

        return () => clearInterval(timer);
    }, [messageInterval, messageLength]);

    useEffect(() => {
        const timer = setTimeout(() => {
            setProgress(100);

            const completeTimer = setTimeout(onComplete, exitDelay);

            return () => clearTimeout(completeTimer);
        }, 1800);

        return () => clearTimeout(timer);
    }, [exitDelay, onComplete]);

    return { progress, messageIndex };
}
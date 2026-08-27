"use client";

import { useEffect, useState } from "react";

export function useViewportWidth(): number {
    const [width, setWidth] = useState<number>(0);

    useEffect(() => {
        const onResize = (): void => {
            setWidth(window.innerWidth);
        };

        onResize();

        window.addEventListener("resize", onResize, { passive: true });

        return () => {
            window.removeEventListener("resize", onResize);
        };
    }, []);

    return width;
}
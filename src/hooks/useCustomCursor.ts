"use client";

import { useEffect, type RefObject } from "react";

import { cursorData } from "@/data/cursor.data";

import {
    getInitialPosition,
    getCursorTransform,
    setCursorColor,
    hideBrowserCursor,
    restoreBrowserCursor,
} from "@/libs/cursor.lib";

export default function useCustomCursor(
    cursorRef: RefObject<HTMLDivElement | null>,
): void {
    useEffect(() => {
        // Desktop only
        if (window.innerWidth < 901) {
            return;
        }

        const initialPosition = getInitialPosition();

        let mouseX = initialPosition.x;
        let mouseY = initialPosition.y;

        let currentX = mouseX;
        let currentY = mouseY;

        let animationFrame = 0;
        let moveTimeout: ReturnType<typeof setTimeout> | undefined;

        hideBrowserCursor();

        const handleMouseMove = (event: MouseEvent): void => {
            mouseX = event.clientX;
            mouseY = event.clientY;

            setCursorColor(
                cursorRef.current,
                cursorData.colors.moving,
            );

            if (moveTimeout) {
                clearTimeout(moveTimeout);
            }

            moveTimeout = setTimeout(() => {
                setCursorColor(
                    cursorRef.current,
                    cursorData.colors.default,
                );
            }, cursorData.animation.returnDelay);
        };

        const animate = (): void => {
            currentX +=
                (mouseX - currentX) *
                cursorData.animation.smoothness;

            currentY +=
                (mouseY - currentY) *
                cursorData.animation.smoothness;

            if (cursorRef.current) {
                cursorRef.current.style.transform =
                    getCursorTransform(currentX, currentY);
            }

            animationFrame = requestAnimationFrame(animate);
        };

        document.addEventListener(
            "mousemove",
            handleMouseMove,
        );

        animationFrame =
            requestAnimationFrame(animate);

        return () => {
            document.removeEventListener(
                "mousemove",
                handleMouseMove,
            );

            cancelAnimationFrame(
                animationFrame,
            );

            if (moveTimeout) {
                clearTimeout(moveTimeout);
            }

            restoreBrowserCursor();
        };
    }, [cursorRef]);
}
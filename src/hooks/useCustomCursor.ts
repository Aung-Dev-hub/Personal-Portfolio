"use client";

import {
    useEffect,
    type RefObject,
} from "react";

import { cursorData } from "@/data/cursor.data";

import {
    getInitialPosition,
    getCursorTransform,
    setCursorColor,
    hideBrowserCursor,
    restoreBrowserCursor,
} from "@/libs/cursor.lib";

export default function useCustomCursor(
    cursorRef: RefObject<HTMLDivElement | null>
): void {
    useEffect(() => {
        const initialPosition =
            getInitialPosition();

        let mouseX = initialPosition.x;
        let mouseY = initialPosition.y;

        let currentX = mouseX;
        let currentY = mouseY;

        let animationFrame: number | null = null;

        let moveTimeout:
            ReturnType<typeof setTimeout> | null = null;

        hideBrowserCursor();

        const handleMouseMove = (
            event: MouseEvent
        ): void => {
            mouseX = event.clientX;
            mouseY = event.clientY;

            setCursorColor(
                cursorRef.current,
                cursorData.colors.moving
            );

            if (moveTimeout !== null) {
                clearTimeout(moveTimeout);
            }

            moveTimeout = setTimeout(() => {
                setCursorColor(
                    cursorRef.current,
                    cursorData.colors.default
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

            const cursor = cursorRef.current;

            if (cursor) {
                cursor.style.transform =
                    getCursorTransform(
                        currentX,
                        currentY
                    );
            }

            animationFrame =
                requestAnimationFrame(animate);
        };

        document.addEventListener(
            "mousemove",
            handleMouseMove
        );

        animationFrame =
            requestAnimationFrame(animate);

        return () => {
            document.removeEventListener(
                "mousemove",
                handleMouseMove
            );

            if (animationFrame !== null) {
                cancelAnimationFrame(
                    animationFrame
                );
            }

            if (moveTimeout !== null) {
                clearTimeout(moveTimeout);
            }

            restoreBrowserCursor();
        };
    }, [cursorRef]);
}
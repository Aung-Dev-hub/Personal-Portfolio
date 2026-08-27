"use client";

import { useEffect, RefObject } from "react";

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
    // Mobile / Tablet မှာ custom mouse cursor မသုံးပါ
    const isTouchDevice =
      window.matchMedia("(pointer: coarse)").matches ||
      window.innerWidth < 1024;

    if (isTouchDevice) {
      restoreBrowserCursor();

      if (cursorRef.current) {
        cursorRef.current.style.display = "none";
      }

      return;
    }

    const initialPosition = getInitialPosition();

    let mouseX = initialPosition.x;
    let mouseY = initialPosition.y;

    let currentX = mouseX;
    let currentY = mouseY;

    let animationFrame: number;
    let moveTimeout: ReturnType<typeof setTimeout>;

    hideBrowserCursor();

    const handleMouseMove = (event: MouseEvent): void => {
      mouseX = event.clientX;
      mouseY = event.clientY;

      setCursorColor(
        cursorRef.current,
        cursorData.colors.moving
      );

      clearTimeout(moveTimeout);

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

      if (cursorRef.current) {
        cursorRef.current.style.transform =
          getCursorTransform(currentX, currentY);
      }

      animationFrame = requestAnimationFrame(animate);
    };

    document.addEventListener(
      "mousemove",
      handleMouseMove
    );

    animationFrame = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener(
        "mousemove",
        handleMouseMove
      );

      cancelAnimationFrame(animationFrame);
      clearTimeout(moveTimeout);

      restoreBrowserCursor();
    };
  }, [cursorRef]);
}
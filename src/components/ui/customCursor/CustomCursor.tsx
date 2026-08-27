"use client";

import { useRef } from "react";

import useCustomCursor from "@/hooks/useCustomCursor";
import { cursorData } from "@/data/cursor.data";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement | null>(null);

  useCustomCursor(cursorRef);

  return (
    <div
      ref={cursorRef}
      aria-hidden="true"
      className="hidden min-[901px]:block"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: `${cursorData.size}px`,
        height: `${cursorData.size}px`,
        borderRadius: "50%",
        backgroundColor: cursorData.colors.default,
        pointerEvents: "none",
        zIndex: cursorData.zIndex,
        willChange: "transform, background-color",
        transition: cursorData.animation.colorTransition,
        boxShadow: cursorData.shadow,
      }}
    />
  );
}

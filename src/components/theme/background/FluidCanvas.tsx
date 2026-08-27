"use client";

import { useEffect, useRef } from "react";

export default function FluidCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) return;

    // Your fluid canvas code...

    return () => {
      // cleanup...
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 h-full w-full touch-none min-[901px]:pointer-events-auto"
    />
  );
}

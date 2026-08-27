"use client";

import { useRef } from "react";

import useFluidCanvas from "@/hooks/useFluidCanvas";

export default function FluidCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useFluidCanvas(canvasRef);

  return (
    <div className="fluid-canvas-container pointer-events-none">
      <canvas ref={canvasRef} className="splash-canvas pointer-events-none" />
    </div>
  );
}

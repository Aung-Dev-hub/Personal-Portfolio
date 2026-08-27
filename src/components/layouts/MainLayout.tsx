import type { ReactNode } from "react";

import FluidCanvas from "@/components/theme/background/FluidCanvas";

interface MainLayoutProps {
  children: ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-black text-white">
      <FluidCanvas />

      <div className="relative z-10">{children}</div>
    </div>
  );
}

"use client";

import { Navbar } from "@/components/sections/navbar";
import { usePathname } from "next/navigation";

export function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isStandalonePage = pathname === "/games";

  // Standalone pages get a simple wrapper without decorative elements
  if (isStandalonePage) {
    return <>{children}</>;
  }

  // Regular pages get the full layout with borders and navbar
  return (
    <div className="max-w-7xl mx-auto border-x relative">
      <div className="block w-px h-full border-l border-border absolute top-0 left-6 z-10"></div>
      <div className="block w-px h-full border-r border-border absolute top-0 right-6 z-10"></div>
      <Navbar />
      {children}
    </div>
  );
}

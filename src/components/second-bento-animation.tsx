/* eslint-disable @next/next/no-img-element */
"use client";

import { OrbitingCircles } from "@/components/ui/orbiting-circle";

const StrategyBadge = ({ text }: { text: string }) => (
  <div className="flex items-center justify-center bg-background border border-border rounded-full px-4 py-2 text-xs font-medium whitespace-nowrap shadow-sm">
    {text}
  </div>
);

export function SecondBentoAnimation() {
  
  return (
    <div className="relative flex h-full w-full items-center justify-center overflow-hidden">
      <div className="pointer-events-none absolute bottom-0 left-0 h-20 w-full bg-gradient-to-t from-background to-transparent z-20"></div>
      <div className="pointer-events-none absolute top-0 left-0 h-20 w-full bg-gradient-to-b from-background to-transparent z-20"></div>

      <div className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 flex flex-col items-center justify-center gap-2 bg-secondary p-4 rounded-xl z-30 md:bottom-0 md:top-auto">
        <img
          src="/logos/EQUI-LOGO-SM-HZ-WHITE.png"
          alt="Equi Logo"
          className="size-8 object-contain"
        />
        <span className="text-white text-xs font-semibold">Equi Core</span>
      </div>
      <div className="relative flex h-full w-full items-center justify-center overflow-hidden">
        <div className="relative flex h-full w-full items-center justify-center translate-y-0 md:translate-y-32">
          <OrbitingCircles
            index={0}
            iconSize={60}
            radius={100}
            reverse
            speed={1}
          >
            <StrategyBadge text="Long-Short Equity" />
            <StrategyBadge text="Global Macro" />
            <StrategyBadge text="Relative Value" />
          </OrbitingCircles>

          <OrbitingCircles index={1} iconSize={60} speed={0.5}>
            <StrategyBadge text="Event Driven" />
            <StrategyBadge text="Structured Credit" />
            <StrategyBadge text="Vol Arbitrage" />
          </OrbitingCircles>

          <OrbitingCircles
            index={2}
            iconSize={60}
            radius={230}
            reverse
            speed={0.5}
          >
            <StrategyBadge text="Asset-Backed" />
            <StrategyBadge text="Specialty Finance" />
            <StrategyBadge text="Market Neutral" />
          </OrbitingCircles>
        </div>
      </div>
    </div>
  );
}

"use client";

import { siteConfig } from "@/lib/config";
import { Play } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export function CompanyShowcase() {
  const { companyShowcase } = siteConfig;
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  return (
    <section
      id="company"
      className="flex flex-col items-center justify-center gap-10 py-20 w-full relative px-6"
    >
      <div className="flex flex-col items-center justify-center gap-4 max-w-3xl text-center">
        <h2 className="text-3xl md:text-4xl font-bold">
          {companyShowcase.title}
        </h2>
        <p className="text-muted-foreground text-lg">
          {companyShowcase.description}
        </p>
      </div>

      <div className="grid w-full max-w-7xl grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 z-20">
        {companyShowcase.partners.map((partner) => (
          <div
            key={partner.id}
            className="group relative overflow-hidden rounded-xl border border-border bg-card transition-all duration-300 hover:shadow-lg hover:border-secondary/50"
            onMouseEnter={() => setHoveredId(partner.id)}
            onMouseLeave={() => setHoveredId(null)}
          >
            {/* Video Thumbnail */}
            <div className="relative aspect-video overflow-hidden">
              <Image
                src={partner.videoThumbnail}
                alt={`${partner.name} video thumbnail`}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
              {/* Play Button Overlay */}
              <div className="absolute inset-0 flex items-center justify-center bg-black/30 transition-colors duration-300 group-hover:bg-black/40">
                <div className="flex items-center justify-center size-16 rounded-full bg-white/90 backdrop-blur-sm transition-all duration-300 group-hover:scale-110 group-hover:bg-secondary">
                  <Play className="size-6 fill-black text-black transition-colors duration-300 group-hover:fill-white group-hover:text-white ml-1" />
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 space-y-2">
              <h3 className="text-xl font-semibold">{partner.name}</h3>
              <p className="text-sm text-muted-foreground">
                {partner.description}
              </p>
            </div>

            {/* Watch Now Link */}
            <div className="absolute bottom-0 left-0 right-0 p-6 pt-0">
              <button className="text-sm font-medium text-secondary hover:underline transition-all">
                Watch Story →
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

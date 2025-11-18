"use client";

import { siteConfig } from "@/lib/config";
import { Play } from "lucide-react";
import { motion } from "motion/react";
import { BLUR_FADE_DELAY } from "@/lib/config";

export function CompanyShowcase() {
  const { companyShowcase } = siteConfig;

  return (
    <section
      id="company"
      className="flex flex-col items-center justify-center gap-12 py-20 w-full relative px-6"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 -z-10 h-full w-full [background:radial-gradient(ellipse_80%_50%_at_50%_-20%,var(--secondary-opacity-20),transparent)]"></div>
      
      <div className="flex flex-col items-center justify-center gap-4 max-w-3xl text-center">
        <motion.h2
          className="text-3xl md:text-4xl font-bold"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {companyShowcase.title}
        </motion.h2>
        <motion.p
          className="text-muted-foreground text-lg"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: BLUR_FADE_DELAY }}
        >
          {companyShowcase.description}
        </motion.p>
      </div>

      <div className="grid w-full max-w-7xl grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 z-20">
        {companyShowcase.partners.map((partner, index) => (
          <motion.div
            key={partner.id}
            className="group relative overflow-hidden rounded-xl border border-border bg-card transition-all duration-300 hover:shadow-lg hover:border-secondary/50"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: BLUR_FADE_DELAY * (index + 2) }}
          >
            {/* Video Placeholder */}
            <div className="relative aspect-video bg-gradient-to-br from-secondary/20 to-primary/10 flex items-center justify-center overflow-hidden">
              {/* Play button overlay */}
              <div className="absolute inset-0 flex items-center justify-center bg-black/10 group-hover:bg-black/20 transition-all duration-300">
                <div className="flex items-center justify-center size-16 rounded-full bg-white/90 group-hover:bg-white group-hover:scale-110 transition-all duration-300 shadow-lg">
                  <Play className="size-6 text-primary fill-primary ml-1" />
                </div>
              </div>
              {/* Gradient overlay for better text visibility */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
              {/* Firm name on video */}
              <div className="absolute bottom-4 left-4 right-4">
                <h3 className="text-xl font-bold text-white drop-shadow-lg">{partner.name}</h3>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-secondary">{partner.aum}</p>
                {/* Metric Badge */}
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary/10 border border-secondary/20">
                  <span className="text-xs font-semibold text-secondary">
                    {partner.metric}
                  </span>
                </div>
              </div>
              
              <p className="text-sm text-muted-foreground leading-relaxed">
                {partner.description}
              </p>

              {/* Read Case Study Link */}
              <button className="text-sm font-medium text-secondary hover:underline transition-all">
                Watch Story →
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

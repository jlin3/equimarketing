"use client";

import { siteConfig } from "@/lib/config";
import { TrendingUp } from "lucide-react";

export function CompanyShowcase() {
  const { companyShowcase } = siteConfig;

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
          >
            {/* Header with gradient */}
            <div className="relative p-6 bg-gradient-to-br from-secondary/10 to-primary/5 border-b border-border">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-xl font-bold mb-1">{partner.name}</h3>
                  <p className="text-sm font-medium text-secondary">{partner.aum}</p>
                </div>
                <div className="flex items-center justify-center size-10 rounded-full bg-secondary/20 text-secondary">
                  <TrendingUp className="size-5" />
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 space-y-4">
              <p className="text-sm text-muted-foreground leading-relaxed">
                {partner.description}
              </p>
              
              {/* Metric Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary/10 border border-secondary/20">
                <span className="text-xs font-semibold text-secondary">
                  {partner.metric}
                </span>
              </div>
            </div>

            {/* Read Case Study Link */}
            <div className="px-6 pb-6">
              <button className="text-sm font-medium text-secondary hover:underline transition-all">
                Read Case Study →
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

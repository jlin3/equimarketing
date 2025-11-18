"use client";

import { siteConfig } from "@/lib/config";
import { motion } from "motion/react";
import { BLUR_FADE_DELAY } from "@/lib/config";

export function MetricsSection() {
  const { metricsSection } = siteConfig;

  return (
    <section
      id="metrics"
      className="flex flex-col items-center justify-center gap-10 py-20 w-full relative px-6"
    >
      <div className="flex flex-col items-center justify-center gap-4 max-w-3xl text-center">
        <motion.h2
          className="text-3xl md:text-4xl font-bold"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: BLUR_FADE_DELAY }}
        >
          {metricsSection.title}
        </motion.h2>
        <motion.p
          className="text-muted-foreground text-lg"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: BLUR_FADE_DELAY * 2 }}
        >
          {metricsSection.subtitle}
        </motion.p>
      </div>

      <div className="grid w-full max-w-6xl grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {metricsSection.metrics.map((metric, index) => (
          <motion.div
            key={index}
            className="flex flex-col items-center justify-center text-center p-6 rounded-xl border border-border bg-card/50 backdrop-blur-sm"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: BLUR_FADE_DELAY * (index + 3) }}
          >
            <div className="text-4xl md:text-5xl font-bold text-primary mb-2">
              {metric.value}
            </div>
            <div className="text-lg font-semibold mb-1">{metric.label}</div>
            <div className="text-sm text-muted-foreground">
              {metric.sublabel}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}


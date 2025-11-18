"use client";

import { siteConfig } from "@/lib/config";
import { motion } from "motion/react";
import { BLUR_FADE_DELAY } from "@/lib/config";
import { Mic, Radio, TrendingUp } from "lucide-react";

const podcastIcons = [Mic, Radio, TrendingUp];

export function EducationalSection() {
  const { educationalSection } = siteConfig;

  return (
    <section
      id="education"
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
          {educationalSection.title}
        </motion.h2>
        <motion.p
          className="text-muted-foreground text-lg"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: BLUR_FADE_DELAY * 2 }}
        >
          {educationalSection.subtitle}
        </motion.p>
      </div>

      <div className="grid w-full max-w-6xl grid-cols-1 md:grid-cols-3 gap-6">
        {educationalSection.podcasts.map((podcast, index) => {
          const Icon = podcastIcons[index];
          return (
            <motion.div
              key={index}
              className="flex flex-col p-6 rounded-xl border border-border bg-card hover:border-secondary/50 transition-all duration-300 group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: BLUR_FADE_DELAY * (index + 3) }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="flex items-center justify-center size-12 rounded-full bg-secondary/10 text-secondary group-hover:bg-secondary group-hover:text-white transition-colors">
                  <Icon className="size-6" />
                </div>
                <h3 className="text-xl font-bold flex-1">{podcast.name}</h3>
              </div>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                {podcast.description}
              </p>
              <div className="mt-auto">
                <span className="text-sm font-medium text-secondary">
                  {podcast.audience}
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}


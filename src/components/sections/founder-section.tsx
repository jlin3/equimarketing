"use client";

import { siteConfig } from "@/lib/config";
import { motion } from "motion/react";
import { BLUR_FADE_DELAY } from "@/lib/config";
import { Linkedin } from "lucide-react";
import Link from "next/link";

export function FounderSection() {
  const { founderSection } = siteConfig;

  return (
    <section
      id="founders"
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
          {founderSection.title}
        </motion.h2>
        <motion.p
          className="text-muted-foreground text-lg"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: BLUR_FADE_DELAY * 2 }}
        >
          {founderSection.subtitle}
        </motion.p>
      </div>

      <div className="grid w-full max-w-6xl grid-cols-1 md:grid-cols-2 gap-8">
        {founderSection.founders.map((founder, index) => (
          <motion.div
            key={index}
            className="flex flex-col rounded-xl border border-border bg-card overflow-hidden group"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: BLUR_FADE_DELAY * (index + 3) }}
          >
            {/* Video Section */}
            <div className="relative aspect-video bg-gradient-to-br from-secondary/20 to-primary/10 overflow-hidden">
              <video
                className="w-full h-full object-cover"
                poster={`${founder.videoUrl.replace('.mp4', '')}-poster.jpg`}
                controls
                preload="metadata"
              >
                <source src={founder.videoUrl} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>

            {/* Content Section */}
            <div className="p-6 space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-2xl font-bold">{founder.name}</h3>
                  <p className="text-secondary font-semibold">{founder.role}</p>
                </div>
                <Link
                  href={founder.linkedIn}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  <Linkedin className="size-6" />
                </Link>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                {founder.bio}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}


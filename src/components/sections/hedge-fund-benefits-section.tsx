"use client";

import { siteConfig } from "@/lib/config";
import { motion } from "motion/react";
import { BLUR_FADE_DELAY } from "@/lib/config";
import { Shield, TrendingUp, Target, Users, Building2, DollarSign } from "lucide-react";

const benefitIcons = [Shield, Target, TrendingUp, Users, Building2, DollarSign];

export function HedgeFundBenefitsSection() {
  const { hedgeFundBenefits } = siteConfig;

  return (
    <section
      id="benefits"
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
          {hedgeFundBenefits.title}
        </motion.h2>
        <motion.p
          className="text-muted-foreground text-lg"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: BLUR_FADE_DELAY * 2 }}
        >
          {hedgeFundBenefits.description}
        </motion.p>
      </div>

      <div className="grid w-full max-w-6xl grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {hedgeFundBenefits.benefits.map((benefit, index) => {
          const Icon = benefitIcons[index % benefitIcons.length];
          return (
            <motion.div
              key={benefit.id}
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
              </div>
              <h3 className="text-xl font-bold mb-3">{benefit.title}</h3>
              <p className="text-muted-foreground leading-relaxed">
                {benefit.description}
              </p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}


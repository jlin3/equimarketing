"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { ArrowRight, Calendar, FileText, Rocket, CheckCircle2 } from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Discover",
    icon: Calendar,
    color: "from-primary/20 to-primary/5",
    borderColor: "border-primary/30",
    description: "Schedule a free consultation with our team to discuss your vision, your goals, and get a demo of what we can offer.",
    details: [
      "Free initial consultation call",
      "Deep dive into your firm's goals and client base",
      "Live demo of our platform and capabilities",
      "Custom 60-90 minute workshop (worth $25k+)",
      "Personalized strategy recommendations",
    ],
    outcome: "At the end of this stage, an LOI is signed. We only win when you win.",
    highlight: "We've spoken with hundreds of advisors and will offer the best strategy to get you to the top 1% with alternatives—be it a Custom White Label Product or a separate investment offering.",
  },
  {
    number: "02",
    title: "Design",
    icon: FileText,
    color: "from-secondary/20 to-secondary/5",
    borderColor: "border-secondary/30",
    description: "Our research team takes your plan and creates a data-driven, proprietary proposal for your review.",
    details: [
      "Data-driven, proprietary proposal creation",
      "Pre-marketing materials for your advisors",
      "Collaborative design process",
      "Manager selection and due diligence",
      "Custom fund structure development",
    ],
    outcome: "This takes 6-8 weeks from LOI signing.",
    highlight: "We work WITH you and make onboarding as successful as possible. Your success is our success.",
  },
  {
    number: "03",
    title: "Deploy",
    icon: Rocket,
    color: "from-accent/40 to-accent/10",
    borderColor: "border-accent/50",
    description: "We help you go live and work with your advisors to educate them and provide all the tools they need.",
    details: [
      "Full launch support and coordination",
      "Advisor education and training sessions",
      "Complete marketing materials and tools",
      "Ongoing program monitoring",
      "Growth optimization strategies",
    ],
    outcome: "RIAs that create this business line are automatically 1.3x more valuable and in the top 5%.",
    highlight: "Adopting liquid alternatives is simply a better practice for your end client portfolios, providing upside, liquidity, and drawdown protection.",
  },
];

export default function ProcessPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 md:py-32 px-6">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5" />
        <div className="max-w-5xl mx-auto text-center relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              The Equi Process
            </span>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
              Discover. Design. Deploy.
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              A proven three-step process to launch your institutional-grade alternatives program. 
              From initial consultation to full deployment—we're with you every step of the way.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Process Steps */}
      <section className="py-16 md:py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="space-y-16 md:space-y-24">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="relative"
              >
                {/* Connection line */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute left-[60px] top-[140px] w-0.5 h-[calc(100%+6rem)] bg-gradient-to-b from-border to-transparent" />
                )}
                
                <div className="flex flex-col md:flex-row gap-8 md:gap-12">
                  {/* Step Number & Icon */}
                  <div className="flex-shrink-0 flex flex-row md:flex-col items-center md:items-start gap-4">
                    <div className={`relative w-[120px] h-[120px] rounded-2xl bg-gradient-to-br ${step.color} border ${step.borderColor} flex items-center justify-center`}>
                      <step.icon className="w-12 h-12 text-primary" />
                      <span className="absolute -top-3 -right-3 w-10 h-10 rounded-full bg-background border-2 border-primary flex items-center justify-center text-sm font-bold text-primary">
                        {step.number}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 space-y-6">
                    <div>
                      <h2 className="text-3xl md:text-4xl font-bold mb-3">{step.title}</h2>
                      <p className="text-lg text-muted-foreground leading-relaxed">
                        {step.description}
                      </p>
                    </div>

                    {/* Details Grid */}
                    <div className="grid sm:grid-cols-2 gap-3">
                      {step.details.map((detail, i) => (
                        <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-card border border-border">
                          <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                          <span className="text-sm">{detail}</span>
                        </div>
                      ))}
                    </div>

                    {/* Highlight Box */}
                    <div className="bg-primary/5 border border-primary/20 rounded-xl p-6">
                      <p className="text-muted-foreground leading-relaxed">
                        {step.highlight}
                      </p>
                    </div>

                    {/* Outcome */}
                    <div className="flex items-center gap-3 text-primary font-semibold">
                      <ArrowRight className="w-5 h-5" />
                      <span>{step.outcome}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-32 px-6 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
            Schedule your free consultation today and take the first step toward building 
            an institutional-grade alternatives program for your RIA.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/#pricing"
              className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-full font-medium hover:bg-primary/90 transition-colors"
            >
              Schedule a Call
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 bg-card border border-border px-8 py-4 rounded-full font-medium hover:bg-accent/50 transition-colors"
            >
              Learn More
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Footer Note */}
      <div className="py-8 px-6 border-t border-border">
        <p className="text-center text-sm text-muted-foreground max-w-2xl mx-auto">
          The Equi process is designed to be collaborative and transparent. We work alongside your team 
          to ensure the program aligns perfectly with your firm's vision and client needs.
        </p>
      </div>
    </div>
  );
}


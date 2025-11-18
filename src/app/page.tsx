import { BentoSection } from "@/components/sections/bento-section";
import { CompanyShowcase } from "@/components/sections/company-showcase";
import { CTASection } from "@/components/sections/cta-section";
import { EducationalSection } from "@/components/sections/educational-section";
import { FAQSection } from "@/components/sections/faq-section";
import { FeatureSection } from "@/components/sections/feature-section";
import { FooterSection } from "@/components/sections/footer-section";
import { FounderSection } from "@/components/sections/founder-section";
import { GrowthSection } from "@/components/sections/growth-section";
import { HedgeFundBenefitsSection } from "@/components/sections/hedge-fund-benefits-section";
import { HeroSection } from "@/components/sections/hero-section";
import { MetricsSection } from "@/components/sections/metrics-section";
import { PricingSection } from "@/components/sections/pricing-section";
import { QuoteSection } from "@/components/sections/quote-section";
import { TestimonialSection } from "@/components/sections/testimonial-section";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center divide-y divide-border min-h-screen w-full">
      <HeroSection />
      <CompanyShowcase />
      <MetricsSection />
      <FounderSection />
      <BentoSection />
      <HedgeFundBenefitsSection />
      <QuoteSection />
      <FeatureSection />
      <GrowthSection />
      <EducationalSection />
      <PricingSection />
      <TestimonialSection />
      <FAQSection />
      <CTASection />
      <FooterSection />
    </main>
  );
}

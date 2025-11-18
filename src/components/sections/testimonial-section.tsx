import { SectionHeader } from "@/components/section-header";
import { SocialProofTestimonials } from "@/components/testimonial-scroll";
import { siteConfig } from "@/lib/config";

export function TestimonialSection() {
  const { testimonials } = siteConfig;

  return (
    <section
      id="testimonials"
      className="flex flex-col items-center justify-center w-full"
    >
      <SectionHeader>
        <h2 className="text-3xl md:text-4xl font-medium tracking-tighter text-center text-balance">
          Transform Your Investment Team from a Cost Center to a Profit Center
        </h2>
        <p className="text-muted-foreground text-center text-balance font-medium">
          Build your own branded alternatives program and capture management fees instead of just allocating to external products. Deliver better client outcomes while creating enterprise value and a meaningful revenue stream for your firm.
        </p>
      </SectionHeader>
      <SocialProofTestimonials testimonials={testimonials} />
    </section>
  );
}

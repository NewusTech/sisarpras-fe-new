import { CTASection } from "@/components/sections/landing/ctaSection";
import { FeaturesSection } from "@/components/sections/landing/featuresSection";
import { HeroSection } from "@/components/sections/landing/heroSection";
import { SiteFooter } from "@/components/shared/siteFooter";
import { SiteHeader } from "@/components/shared/siteHeader";
import { TestimonialsSection } from "@/components/sections/landing/testimonialsSection";
import GuideSection from "@/components/sections/landing/gudeSection";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <HeroSection />
        <FeaturesSection />
        <TestimonialsSection />
        <CTASection />
        <GuideSection />
      </main>
      <SiteFooter />
    </div>
  );
}

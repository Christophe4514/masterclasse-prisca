import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { AboutAuthor } from "@/components/landing/AboutAuthor";
import { CTASection } from "@/components/landing/CTASection";
import { FAQ } from "@/components/landing/FAQ";
import { Hero } from "@/components/landing/Hero";
import { Masterclass } from "@/components/landing/Masterclass";
import { Pricing } from "@/components/landing/Pricing";
import { Testimonials } from "@/components/landing/Testimonials";

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <AboutAuthor />
        <Masterclass />
        <Testimonials />
        <Pricing />
        <FAQ />
        <CTASection />
      </main>
      <SiteFooter />
    </>
  );
}

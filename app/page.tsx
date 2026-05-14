import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { AboutAuthor } from "@/components/landing/AboutAuthor";
import { AboutPublisher } from "@/components/landing/AboutPublisher";
import { CTASection } from "@/components/landing/CTASection";
import { FAQ } from "@/components/landing/FAQ";
import { Hero } from "@/components/landing/Hero";
import { Pricing } from "@/components/landing/Pricing";
import { ProblemSolution } from "@/components/landing/ProblemSolution";
import { Testimonials } from "@/components/landing/Testimonials";

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <AboutAuthor />
        <AboutPublisher />
        <ProblemSolution />
        <Testimonials />
        <Pricing />
        <FAQ />
        <CTASection />
      </main>
      <SiteFooter />
    </>
  );
}

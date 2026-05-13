import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { AboutAuthor } from "@/components/landing/AboutAuthor";
import { CTASection } from "@/components/landing/CTASection";
import { Curriculum } from "@/components/landing/Curriculum";
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
        <ProblemSolution />
        <Curriculum />
        <Testimonials />
        <Pricing />
        <FAQ />
        <CTASection />
      </main>
      <SiteFooter />
    </>
  );
}

import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import ProblemSection from "@/components/ProblemSection";
import ValueStack from "@/components/ValueStack";
import Testimonials from "@/components/Testimonials";
import Timeline from "@/components/Timeline";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

export default function LandingPage() {
  return (
    <>
      <Navigation />
      <main>
        <Hero />
        <ProblemSection />
        <ValueStack />
        <Testimonials />
        <Timeline />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}

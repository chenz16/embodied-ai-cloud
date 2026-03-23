import { Navbar } from "@/components/sections/navbar";
import { Hero } from "@/components/sections/hero";
import { Features } from "@/components/sections/features";
import { Comparison } from "@/components/sections/comparison";
import { Models } from "@/components/sections/models";
import { Robots } from "@/components/sections/robots";
import { ConfigDemo } from "@/components/sections/config-demo";
import { HowItWorks } from "@/components/sections/how-it-works";
import { Pricing } from "@/components/sections/pricing";
import { Waitlist } from "@/components/sections/waitlist";
import { Footer } from "@/components/sections/footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Features />
        <Comparison />
        <Models />
        <Robots />
        <ConfigDemo />
        <HowItWorks />
        <Pricing />
        <Waitlist />
      </main>
      <Footer />
    </>
  );
}

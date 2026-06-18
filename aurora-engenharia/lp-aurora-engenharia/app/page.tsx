import { Nav } from "@/components/site/Nav";
import { Hero } from "@/components/site/Hero";
import { Problem } from "@/components/site/Problem";
import { Method } from "@/components/site/Method";
import { Demo } from "@/components/site/Demo";
import { Curriculum } from "@/components/site/Curriculum";
import { Testimonials } from "@/components/site/Testimonials";
import { Authority } from "@/components/site/Authority";
import { Roi } from "@/components/site/Roi";
import { Bonus } from "@/components/site/Bonus";
import { Offer } from "@/components/site/Offer";
import { Faq } from "@/components/site/Faq";
import { Footer } from "@/components/site/Footer";
import { StickyCta } from "@/components/site/StickyCta";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Problem />
        <Method />
        <Demo />
        <Curriculum />
        <Testimonials />
        <Authority />
        <Roi />
        <Bonus />
        <Offer />
        <Faq />
      </main>
      <Footer />
      <StickyCta />
    </>
  );
}

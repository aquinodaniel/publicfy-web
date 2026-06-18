import { Hero } from '@/components/hero/Hero';
import { About } from '@/components/about/About';
import { Areas } from '@/components/areas/Areas';
import { Procedimentos } from '@/components/procedimentos/Procedimentos';
import { OndeAtendo } from '@/components/onde/OndeAtendo';
import { AgendeConsulta } from '@/components/cta/AgendeConsulta';

export default function HomePage() {
  return (
    <main className="relative bg-bg">
      <Hero />
      <About />
      <Areas />
      <Procedimentos />
      <OndeAtendo />
      <AgendeConsulta />
    </main>
  );
}

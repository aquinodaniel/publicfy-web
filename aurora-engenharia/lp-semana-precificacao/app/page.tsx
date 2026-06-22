'use client';

import { useCheckout } from '@/lib/hooks';

import ScrollProgressBar from '@/components/motion/ScrollProgressBar';
import TopBar from '@/components/site/TopBar';
import Hero from '@/components/site/Hero';
import Reframe from '@/components/site/Reframe';
import TresNoites from '@/components/site/TresNoites';
import ProvaSocial from '@/components/site/ProvaSocial';
import Objecao from '@/components/site/Objecao';
import SobreLeo from '@/components/site/SobreLeo';
import Oferta from '@/components/site/Oferta';
import Footer from '@/components/site/Footer';
import StickyCTA from '@/components/site/StickyCTA';

// Transição suave de tema entre seções (gradiente curto de 16-24px).
// to="light" = de seção escura p/ clara; to="dark" = o inverso.
function ThemeFade({ to }: { to: 'light' | 'dark' }) {
  return (
    <div
      aria-hidden
      className={`h-16 w-full md:h-24 ${
        to === 'light' ? 'bg-gradient-to-b from-ink to-paper' : 'bg-gradient-to-b from-paper to-ink'
      }`}
    />
  );
}

export default function Page() {
  const onCTA = useCheckout();

  return (
    <>
      <ScrollProgressBar />
      <TopBar onCTAClick={onCTA} />

      <main>
        <Hero onCTAClick={onCTA} />

        <ThemeFade to="light" />
        <TresNoites onCTAClick={onCTA} />

        {/* Seção "quem é / por que é diferente" — conteúdo do antigo Reframe */}
        <Reframe onCTAClick={onCTA} />

        {/* Prova social → Objeção ("o que está travando") → Oferta → Mentor (tudo dark) */}
        <ThemeFade to="dark" />
        {/* Prova social (dark) — mural 3D de depoimentos reais (réplica da Imersão) */}
        <ProvaSocial />

        <Objecao onCTAClick={onCTA} />

        <Oferta onCTAClick={onCTA} />

        <ThemeFade to="light" />
        <SobreLeo />

        <ThemeFade to="dark" />
      </main>

      <Footer />
      <StickyCTA onCTAClick={onCTA} />
    </>
  );
}

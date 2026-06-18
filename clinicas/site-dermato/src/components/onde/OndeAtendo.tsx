'use client';

import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CIDADES } from './ondeContent';
import { OndeCard } from './OndeCard';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Seção "Onde atendo" — fundo vinho, título centralizado e os locais de
 * atendimento exibidos como cards enfileirados (um por unidade). Cada card traz
 * mapa, nome, endereço, link do Maps e o CTA da unidade. Os cards entram com um
 * fade + subida em stagger quando a seção aparece.
 */
export function OndeAtendo() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeId, setActiveId] = useState(CIDADES[0].id);

  // No carrossel mobile, o card cujo CENTRO está mais próximo do centro do track
  // é o foco (nítido); os demais recebem blur. Cálculo determinístico no scroll —
  // sempre há exatamente um card em foco. Só roda no modo mobile (≤639px).
  useEffect(() => {
    const track = trackRef.current;
    if (!track || !window.matchMedia('(max-width: 639px)').matches) return;

    const update = () => {
      const slides = Array.from(track.querySelectorAll<HTMLElement>('[data-onde-slide]'));
      const trackRect = track.getBoundingClientRect();
      const center = trackRect.left + trackRect.width / 2;

      let bestId = slides[0]?.dataset.id;
      let bestDist = Infinity;
      for (const s of slides) {
        const r = s.getBoundingClientRect();
        const dist = Math.abs(r.left + r.width / 2 - center);
        if (dist < bestDist) {
          bestDist = dist;
          bestId = s.dataset.id;
        }
      }
      if (bestId) setActiveId(bestId);
    };

    update();
    track.addEventListener('scroll', update, { passive: true });
    return () => track.removeEventListener('scroll', update);
  }, []);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const heading = section.querySelectorAll<HTMLElement>('[data-onde-anim]');
    const cards = section.querySelectorAll<HTMLElement>('[data-onde-card]');

    if (prefersReduced) {
      gsap.set([...heading, ...cards], { opacity: 1, y: 0 });
      return;
    }

    // immediateRender:false → o estado "from" (opacity 0) só é aplicado quando o
    // ScrollTrigger dispara. Se a medição falhar nesta região (pin do Areas +
    // -mt de Procedimentos), os elementos permanecem visíveis em vez de sumir.
    const ctx = gsap.context(() => {
      gsap.fromTo(
        heading,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1.1,
          ease: 'power3.out',
          immediateRender: false,
          scrollTrigger: { trigger: section, start: 'top 90%', once: true },
        }
      );
      gsap.fromTo(
        cards,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.14,
          ease: 'power3.out',
          immediateRender: false,
          scrollTrigger: { trigger: section, start: 'top 85%', once: true },
        }
      );
    }, section);

    if (typeof document !== 'undefined' && document.fonts?.ready) {
      document.fonts.ready.then(() => ScrollTrigger.refresh());
    }

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="onde-atendo"
      className="relative z-10 w-full bg-bordo py-24 md:py-32 lg:py-40"
      aria-label="Onde atendo"
    >
      <div className="mx-auto w-full max-w-[1200px] px-6 sm:px-10 lg:px-12">
        {/* Título centralizado */}
        <h2
          data-onde-anim
          className="mb-14 text-center font-display font-light leading-[1.0] tracking-tight text-bg md:mb-20"
          style={{ fontSize: 'clamp(2.5rem, 5.5vw, 4.5rem)' }}
        >
          Onde <span className="italic">atendo</span>
        </h2>

        {/*
          Mobile: carrossel horizontal — rola lateralmente com scroll-snap;
          cada card encaixa na tela. sm+: volta a ser grade enfileirada normal.
        */}
        <div
          ref={trackRef}
          className="
            -mx-6 flex snap-x snap-mandatory gap-4 overflow-x-auto overscroll-x-contain px-6 pb-2
            [scrollbar-width:none] [&::-webkit-scrollbar]:hidden
            sm:mx-0 sm:grid sm:snap-none sm:grid-cols-2 sm:gap-7 sm:overflow-visible sm:px-0 sm:pb-0
            lg:grid-cols-3 lg:gap-8
          "
        >
          {CIDADES.map((cidade, i) => {
            const focused = cidade.id === activeId;
            return (
              <div
                key={cidade.id}
                data-onde-slide
                data-id={cidade.id}
                className={`
                  w-[85%] shrink-0 snap-center transition-all duration-500 ease-editorial
                  ${focused ? '' : 'scale-[0.93] opacity-60 blur-[3px]'}
                  sm:!scale-100 sm:!opacity-100 sm:!blur-0 sm:w-auto sm:shrink
                `}
              >
                <OndeCard cidade={cidade} index={i} />
              </div>
            );
          })}
        </div>

        {/* Dica de rolagem — só no mobile */}
        <p className="mt-5 text-center font-sans text-[11px] uppercase tracking-[0.18em] text-bg/45 sm:hidden">
          Arraste para o lado ↔
        </p>
      </div>
    </section>
  );
}

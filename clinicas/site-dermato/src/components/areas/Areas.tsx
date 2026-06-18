'use client';

import { useLayoutEffect, useRef } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { AREAS } from './areasContent';
import { AreaCard } from './AreaCard';
import { WHATSAPP_HREF } from '@/lib/nav';
import skinbooster from '@/assets/images/areas/skinbooster.jpg';
import botox from '@/assets/images/areas/botox.jpg';
import peeling from '@/assets/images/areas/peeling.jpg';
import microagulhamento from '@/assets/images/areas/microagulhamento.jpg';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/** Palavras da tagline que TROCAM ao fundo, atrás das imagens. */
const WORDS = ['Beleza', 'com', 'Naturalidade'];

/** Amplitude de saída (yPercent) de cada card real — sobem do grid e saem pelo topo. */
const CARD_EXIT = [-150, -160, -145, -155];
/** Sobem quase juntos (sincronizados, leve parallax) e SEMPRE desacelerando. */
const CARD_DUR = [0.46, 0.48, 0.44, 0.47];
const CARD_EASE = ['power2.out', 'power2.out', 'power1.out', 'power2.out'];

/**
 * As outras 4 imagens (iguais aos cards, 250×450) que SEGUEM o mesmo fluxo,
 * logo atrás dos cards: nascem embaixo, sobem na frente do texto e saem pelo topo.
 * Posições/velocidades variadas (parallax). Total da cena: 8 imagens em fluxo.
 */
const GHOSTS = [
  { pos: 'left-[8%]  top-[30%]', label: 'Skinbooster', image: skinbooster, zi: 'z-[6]', from: 290, to: -150, start: 0.14, dur: 0.8, ease: 'power2.out' }, // 1º canto esquerdo
  { pos: 'left-[64%] top-[8%]', label: 'Microagulhamento', image: microagulhamento, zi: 'z-[8]', from: 300, to: -155, start: 0.19, dur: 0.6, ease: 'power2.out' }, // 2º direita
  { pos: 'left-[31%] top-[42%]', label: 'Botox', image: botox, zi: 'z-[7]', from: 290, to: -150, start: 0.24, dur: 0.72, ease: 'power2.out' }, // 3º meio-esquerda
  { pos: 'left-[75%] top-[20%]', label: 'Peeling', image: peeling, zi: 'z-[6]', from: 300, to: -155, start: 0.29, dur: 0.64, ease: 'power2.out' }, // 4º canto direito
];

export function Areas() {
  const sectionRef = useRef<HTMLElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const sticky = stickyRef.current;
    const stage = stageRef.current;
    if (!section || !sticky || !stage) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // ───────── DESKTOP (≥768px) — palco pinado ─────────
      mm.add('(min-width: 768px)', () => {
        const cards = gsap.utils.toArray<HTMLElement>('[data-area-card]', stage);
        const cardTexts = gsap.utils.toArray<HTMLElement>('[data-area-cardtext]', stage);
        const overlays = gsap.utils.toArray<HTMLElement>('[data-area-overlay]', stage);
        const miniLabels = gsap.utils.toArray<HTMLElement>('[data-area-minilabel]', stage);
        const heads = gsap.utils.toArray<HTMLElement>('[data-area-head]', stage);
        const words = gsap.utils.toArray<HTMLElement>('[data-area-word]', stage);
        const ghosts = gsap.utils.toArray<HTMLElement>('[data-area-ghost]', stage);

        if (prefersReduced) {
          gsap.set(words, { opacity: 0 });
          gsap.set(ghosts, { display: 'none' });
          return;
        }

        // Fade-in de entrada — combina com o fade-out do final de "Quem sou".
        // A seção surge enquanto sobe na viewport, antes de pinar (top top).
        gsap.fromTo(
          stage,
          { opacity: 0 },
          {
            opacity: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: section,
              start: 'top 80%',
              end: 'top top',
              scrub: true,
              invalidateOnRefresh: true,
            },
          },
        );

        gsap.set(words, { opacity: 0 });
        ghosts.forEach((el) => gsap.set(el, { yPercent: Number(el.dataset.from) }));

        const tl = gsap.timeline({
          defaults: { ease: 'none' },
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 1.3,
            pin: sticky,
            pinSpacing: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        // ── Fase 1: textos da seção somem; entram os mini-labels nos cards ──
        tl.to(heads, { opacity: 0, y: -20, duration: 0.06, ease: 'power1.out' }, 0);
        tl.to(cardTexts, { opacity: 0, duration: 0.05, stagger: 0.02, ease: 'power1.out' }, 0);
        tl.to(overlays, { opacity: 0.22, duration: 0.1, ease: 'power1.out' }, 0);
        tl.to(miniLabels, { opacity: 1, duration: 0.08, ease: 'power1.out' }, 0.06);

        // ── Fluxo: os 4 cards sobem (na frente do texto) e somem ao chegar no topo ──
        cards.forEach((el, i) => {
          const start = 0.02 + i * 0.02; // bem próximos = sincronizados
          const dur = CARD_DUR[i] ?? 0.5;
          tl.to(el, { yPercent: CARD_EXIT[i] ?? -160, duration: dur, ease: CARD_EASE[i] ?? 'power2.out' }, start);
          // fadeout gradual na segunda metade — somem ao chegar no topo
          tl.to(el, { opacity: 0, duration: dur * 0.45, ease: 'power1.in' }, start + dur * 0.55);
        });

        // ── ~0.5s depois, as outras 4 imagens entram no fluxo e somem no topo ──
        ghosts.forEach((el) => {
          const to = Number(el.dataset.to);
          const start = Number(el.dataset.start);
          const dur = Number(el.dataset.dur);
          const ease = el.dataset.ease || 'none';
          tl.to(el, { yPercent: to, duration: dur, ease }, start);
          tl.to(el, { opacity: 0, duration: dur * 0.4, ease: 'power1.in' }, start + dur * 0.6);
        });

        // ── A frase entra e TROCA palavra a palavra (corte seco, sem vão) ──
        const TIMING: Array<[number, number]> = [
          [0.16, 0.3], // Beleza → vira "com"
          [0.3, 0.44], // com → vira "Naturalidade"
          [0.44, 0.64], // Naturalidade → some
        ];
        words.forEach((word, i) => {
          const [tin, tout] = TIMING[i];
          const isLast = i === words.length - 1;
          if (i === 0) {
            tl.fromTo(word, { opacity: 0 }, { opacity: 1, duration: 0.07, ease: 'power1.out' }, tin);
          } else {
            tl.set(word, { opacity: 1 }, tin);
          }
          if (isLast) {
            tl.to(word, { opacity: 0, duration: 0.08, ease: 'power1.in' }, tout);
          } else {
            tl.set(word, { opacity: 0 }, tout);
          }
        });
      });

      // ───────── MOBILE (<768px) — grid normal, fade-up na entrada ─────────
      mm.add('(max-width: 767px)', () => {
        const cards = gsap.utils.toArray<HTMLElement>('[data-area-card]', stage);
        const heads = gsap.utils.toArray<HTMLElement>('[data-area-head]', stage);
        const words = gsap.utils.toArray<HTMLElement>('[data-area-word]', stage);
        const ghosts = gsap.utils.toArray<HTMLElement>('[data-area-ghost]', stage);
        gsap.set([...words, ...ghosts], { display: 'none' });

        if (prefersReduced) return;

        gsap.from(heads, {
          opacity: 0,
          y: 16,
          duration: 0.9,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: { trigger: section, start: 'top 75%', once: true },
        });
        gsap.from(cards, {
          opacity: 0,
          y: 28,
          duration: 0.9,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: { trigger: stage, start: 'top 78%', once: true },
        });
      });
    }, section);

    if (typeof document !== 'undefined' && document.fonts?.ready) {
      document.fonts.ready.then(() => ScrollTrigger.refresh());
    }

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="areas"
      className="relative z-10 w-full bg-bg md:h-[450vh]"
      aria-label="Áreas de atuação"
    >
      <div
        ref={stickyRef}
        className="relative w-full bg-bg md:sticky md:top-0 md:h-[100svh] md:overflow-hidden"
      >
        <div ref={stageRef} className="relative h-full w-full">
          {/* Frase de fundo (z-0) — TROCA palavra a palavra, atrás das imagens */}
          <div className="pointer-events-none absolute inset-0 z-0 hidden items-center justify-center md:flex">
            {WORDS.map((w) => (
              <span
                key={w}
                data-area-word
                className="absolute whitespace-nowrap font-display font-light leading-none tracking-tight text-bordo"
                style={{ fontSize: 'clamp(4rem, 12vw, 12rem)' }}
              >
                {w}
              </span>
            ))}
          </div>

          {/* As outras 4 imagens do fluxo (camada à frente do texto, z-20) */}
          <div className="pointer-events-none absolute inset-0 z-20 hidden md:block">
            {GHOSTS.map((g, i) => (
              <div
                key={i}
                data-area-ghost
                data-from={g.from}
                data-to={g.to}
                data-start={g.start}
                data-dur={g.dur}
                data-ease={g.ease}
                className={`absolute ${g.pos} ${g.zi} aspect-[5/9] w-[clamp(150px,17vw,250px)] overflow-hidden rounded-[4px]`}
              >
                <Image src={g.image} alt="" fill sizes="17vw" className="object-cover object-center" />
                <div className="absolute inset-0 bg-gradient-to-t from-bordo/55 to-transparent" />
                <span className="absolute inset-x-0 bottom-4 text-center font-sans text-[10px] uppercase tracking-[0.22em] text-white [text-shadow:0_1px_6px_rgba(0,0,0,0.45)]">
                  {g.label}
                </span>
              </div>
            ))}
          </div>

          {/* Conteúdo (header + grid de cards + CTA) — z-10, à frente da frase */}
          <div className="relative z-10 mx-auto flex w-full max-w-[1560px] flex-col px-6 py-24 sm:px-10 lg:px-12 md:h-full md:justify-center md:py-[5vh]">
            {/* Cabeçalho */}
            <header className="flex flex-col items-center text-center">
              <div
                data-area-head
                className="mb-6 flex items-center gap-3 font-sans text-[13px] font-light uppercase tracking-[0.18em] text-bordo/70 md:text-[14px]"
              >
                <span className="inline-block h-px w-10 bg-current opacity-70" />
                Especialidades
                <span className="inline-block h-px w-10 bg-current opacity-70" />
              </div>
              <h2
                data-area-head
                className="font-display font-light leading-[1.0] tracking-tight text-bordo"
                style={{ fontSize: 'clamp(2.25rem, 5vw, 4rem)' }}
              >
                Áreas de <span className="italic">Atuação</span>
              </h2>
            </header>

            {/* Grid de cards */}
            <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-8 md:mt-12 md:flex md:flex-nowrap md:justify-center md:gap-[clamp(28px,6vw,110px)]">
              {AREAS.map((area) => (
                <AreaCard key={area.id} area={area} />
              ))}
            </div>

            {/* Chamada final */}
            <div data-area-head className="mt-12 flex flex-col items-center text-center md:mt-12">
              <p
                className="font-display italic leading-snug text-bordo"
                style={{ fontSize: 'clamp(1.5rem, 3vw, 2.25rem)' }}
              >
                Quer descobrir a melhor solução para o seu caso?
              </p>
              <p className="mt-3 font-sans text-[17px] font-light text-[#360711]/90">
                Fale com a minha equipe e{' '}
                <em className="not-italic font-normal">agende uma avaliação personalizada</em>.
              </p>
              <a
                href={WHATSAPP_HREF}
                target="_blank"
                rel="noopener noreferrer"
                className="
                  cta-agendar mt-9 inline-block rounded-[5px] text-center font-sans font-normal text-white
                  px-[75px] py-[15px] text-[13px] tracking-[0.4px]
                  hover:-translate-y-2
                  lg:px-[127px] lg:pt-[22px] lg:pb-[18px] lg:text-[17px] lg:tracking-normal
                "
              >
                Agendar agora
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

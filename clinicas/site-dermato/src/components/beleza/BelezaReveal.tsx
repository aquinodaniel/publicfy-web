'use client';

import { useLayoutEffect, useRef } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import clinica from '@/assets/images/areas/clinica.webp';
import tricologia from '@/assets/images/areas/tricologia.jpg';
import skinbooster from '@/assets/images/areas/skinbooster.jpg';
import microagulhamento from '@/assets/images/areas/microagulhamento.jpg';
import botox from '@/assets/images/areas/botox.jpg';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const WORDS = ['Beleza', 'com', 'Naturalidade'];

/** Imagens que sobem de baixo, em fluxo, atravessando a frase e somindo no topo.
 *  Tempos bem espaçados (no máx. 2 na tela ao mesmo tempo). */
const IMAGENS = [
  { pos: 'left-[8%]  top-[28%]', image: clinica, from: 290, to: -150, start: 0.04, dur: 0.62, ease: 'power2.out' },
  { pos: 'left-[62%] top-[12%]', image: skinbooster, from: 300, to: -155, start: 0.18, dur: 0.6, ease: 'power2.out' },
  { pos: 'left-[32%] top-[40%]', image: tricologia, from: 290, to: -150, start: 0.32, dur: 0.64, ease: 'power2.out' },
  { pos: 'left-[78%] top-[30%]', image: microagulhamento, from: 300, to: -155, start: 0.46, dur: 0.6, ease: 'power2.out' },
  { pos: 'left-[44%] top-[16%]', image: botox, from: 300, to: -155, start: 0.6, dur: 0.62, ease: 'power2.out' },
];

/**
 * Transição "Beleza com Naturalidade" — fechamento do site. Seção pinada: as 8
 * fotos sobem de baixo em fluxo (parallax) e somem no topo, enquanto a frase
 * troca palavra a palavra ao fundo. No mobile, versão estática simples.
 */
export function BelezaReveal() {
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
        const words = gsap.utils.toArray<HTMLElement>('[data-beleza-word]', stage);
        const imgs = gsap.utils.toArray<HTMLElement>('[data-beleza-img]', stage);

        if (prefersReduced) {
          gsap.set(words, { opacity: 0 });
          gsap.set(imgs, { display: 'none' });
          gsap.set(words[words.length - 1], { opacity: 1 });
          return;
        }

        gsap.set(words, { opacity: 0 });
        imgs.forEach((el) => gsap.set(el, { yPercent: Number(el.dataset.from) }));

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

        // Imagens sobem e somem no topo
        imgs.forEach((el) => {
          const to = Number(el.dataset.to);
          const start = Number(el.dataset.start);
          const dur = Number(el.dataset.dur);
          const ease = el.dataset.ease || 'none';
          tl.to(el, { yPercent: to, duration: dur, ease }, start);
          tl.to(el, { opacity: 0, duration: dur * 0.4, ease: 'power1.in' }, start + dur * 0.6);
        });

        // Frase troca palavra a palavra
        const TIMING: Array<[number, number]> = [
          [0.1, 0.32],
          [0.32, 0.56],
          [0.56, 0.82],
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

      // ───────── MOBILE (<768px) — versão estática ─────────
      mm.add('(max-width: 767px)', () => {
        const words = gsap.utils.toArray<HTMLElement>('[data-beleza-word]', stage);
        const imgs = gsap.utils.toArray<HTMLElement>('[data-beleza-img]', stage);
        gsap.set(imgs, { display: 'none' });
        gsap.set(words, { display: 'none' });
        const phrase = stage.querySelector('[data-beleza-mobile]');
        if (phrase && !prefersReduced) {
          gsap.from(phrase, {
            opacity: 0,
            y: 24,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: { trigger: section, start: 'top 75%', once: true },
          });
        }
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
      id="beleza"
      className="relative z-10 w-full bg-bg md:h-[250vh]"
      aria-label="Beleza com Naturalidade"
    >
      <div
        ref={stickyRef}
        className="relative flex w-full items-center justify-center bg-bg md:sticky md:top-0 md:h-[100svh] md:overflow-hidden"
      >
        <div ref={stageRef} className="relative flex h-full w-full items-center justify-center">
          {/* Frase de fundo (desktop) — troca palavra a palavra */}
          <div className="pointer-events-none absolute inset-0 z-0 hidden items-center justify-center md:flex">
            {WORDS.map((w) => (
              <span
                key={w}
                data-beleza-word
                className="absolute whitespace-nowrap font-display font-light leading-none tracking-tight text-bordo"
                style={{ fontSize: 'clamp(4rem, 12vw, 12rem)' }}
              >
                {w}
              </span>
            ))}
          </div>

          {/* Imagens em fluxo (desktop) */}
          <div className="pointer-events-none absolute inset-0 z-20 hidden md:block">
            {IMAGENS.map((g, i) => (
              <div
                key={i}
                data-beleza-img
                data-from={g.from}
                data-to={g.to}
                data-start={g.start}
                data-dur={g.dur}
                data-ease={g.ease}
                className={`absolute ${g.pos} aspect-[5/9] w-[clamp(150px,17vw,250px)] overflow-hidden rounded-[4px]`}
              >
                <Image src={g.image} alt="" fill sizes="17vw" className="object-cover object-center" />
              </div>
            ))}
          </div>

          {/* Frase estática (mobile) */}
          <h2
            data-beleza-mobile
            className="px-7 text-center font-display font-light leading-[1.05] tracking-tight text-bordo md:hidden"
            style={{ fontSize: 'clamp(2.5rem, 13vw, 4rem)' }}
          >
            Beleza com <span className="italic">Naturalidade</span>
          </h2>
        </div>
      </div>
    </section>
  );
}

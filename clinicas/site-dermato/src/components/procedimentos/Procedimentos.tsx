'use client';

import { useLayoutEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PROCEDIMENTOS } from './procedimentosContent';
import { WHATSAPP_HREF } from '@/lib/nav';
import dra from '@/assets/images/procedimentos/dra.webp';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Seção "Procedimentos" — fundo blush (#f7f0ee), paleta vinho. Topo: eyebrow +
 * título + régua. Abaixo, foto (Dbra-04) à esquerda e a lista ÚNICA dos 17
 * procedimentos à direita, encurtada à altura da foto — com sombra + seta na
 * base; clicar expande/recolhe. CTA centralizado embaixo, com brilho no botão.
 */
export function Procedimentos() {
  const sectionRef = useRef<HTMLElement>(null);
  const fotoRef = useRef<HTMLDivElement>(null);
  const [fotoH, setFotoH] = useState(440);
  const [expanded, setExpanded] = useState(false);

  useLayoutEffect(() => {
    const el = fotoRef.current;
    if (!el || typeof ResizeObserver === 'undefined') return;
    const ro = new ResizeObserver(() => {
      const h = el.offsetHeight;
      if (h) setFotoH(h);
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const items = gsap.utils.toArray<HTMLElement>('[data-proc-anim]', section);

    if (prefersReduced) {
      gsap.set(items, { opacity: 1, y: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.from(items, {
        opacity: 0,
        y: 26,
        duration: 0.9,
        stagger: 0.08,
        ease: 'power2.out',
        scrollTrigger: { trigger: section, start: 'top 68%', once: true },
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
      id="procedimentos"
      className="relative z-30 w-full bg-[#f7f0ee] py-24 md:-mt-[100svh] md:py-32 lg:py-40"
      aria-label="Procedimentos"
    >
      <div className="mx-auto w-full max-w-[1140px] px-6 sm:px-10 lg:px-12">
        {/* ─── Topo: eyebrow + título + régua ─── */}
        <p
          data-proc-anim
          className="font-sans text-[13px] font-medium uppercase tracking-[0.16em] text-[#8a4a5e]"
        >
          Tratamentos
        </p>
        <h2
          data-proc-anim
          className="mt-4 font-display font-normal leading-[1.0] tracking-tight text-[#3a0e1e]"
          style={{ fontSize: 'clamp(2.5rem, 5vw, 3.25rem)' }}
        >
          Procedimentos
        </h2>
        <span data-proc-anim className="mt-5 block h-[1.5px] w-12 bg-[#8a4a5e]" />

        {/* ─── Foto + lista (mesma altura) ─── */}
        <div className="mt-12 grid grid-cols-1 items-start gap-12 md:grid-cols-2 md:gap-16">
          {/* Foto */}
          <div ref={fotoRef} data-proc-anim className="relative">
            <Image
              src={dra}
              alt="Dra. Tatiani Sabadini — procedimentos estéticos"
              sizes="(min-width: 768px) 45vw, 100vw"
              placeholder="blur"
              className="h-auto w-full"
            />
          </div>

          {/* Lista única, encurtada à altura da foto */}
          <div data-proc-anim className="relative">
            <div
              className="overflow-hidden transition-[max-height] duration-700 ease-editorial"
              style={{ maxHeight: expanded ? 1400 : fotoH }}
            >
              <ul>
                {PROCEDIMENTOS.map((item) => (
                  <li
                    key={item}
                    className="group/row flex cursor-pointer items-center gap-3 border-b border-[#e8d4d0] py-[11px] transition-colors duration-150"
                  >
                    <span className="text-[10px] text-[#b88898] transition-colors duration-150 group-hover/row:text-[#3a0e1e]">
                      ●
                    </span>
                    <span className="font-sans text-[14px] uppercase tracking-[0.06em] text-[#5a2a3a] transition-colors duration-150 group-hover/row:font-medium group-hover/row:text-[#3a0e1e]">
                      {item}
                    </span>
                    <span className="ml-auto text-[#b88898] transition-colors duration-150 group-hover/row:text-[#3a0e1e]">
                      →
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Sombra + seta para expandir (some quando expandido) */}
            {!expanded && (
              <button
                type="button"
                onClick={() => setExpanded(true)}
                aria-label="Ver todos os procedimentos"
                className="absolute inset-x-0 bottom-0 flex h-24 items-end justify-center bg-gradient-to-t from-[#f7f0ee] via-[#f7f0ee]/85 to-transparent pb-1"
              >
                <span className="flex flex-col items-center gap-1 font-sans text-[11px] uppercase tracking-[0.16em] text-[#8a4a5e] transition-colors duration-200 hover:text-[#3a0e1e]">
                  Ver todos
                  <svg viewBox="0 0 24 24" className="h-5 w-5 animate-bounce" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </button>
            )}

            {/* Botão "Ver menos" — recolhe a lista */}
            {expanded && (
              <button
                type="button"
                onClick={() => setExpanded(false)}
                aria-label="Recolher lista de procedimentos"
                className="mt-5 flex w-full items-center justify-center gap-1 font-sans text-[11px] uppercase tracking-[0.16em] text-[#8a4a5e] transition-colors duration-200 hover:text-[#3a0e1e]"
              >
                Ver menos
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M6 15l6-6 6 6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            )}
          </div>
        </div>

        {/* ─── CTA centralizado, com brilho no botão ─── */}
        <div data-proc-anim className="mt-16 flex flex-col items-center text-center md:mt-20">
          <p className="max-w-[620px] font-sans text-[18px] font-light leading-[1.7] text-[#6a3a4a]">
            <strong className="font-semibold text-[#3a0e1e]">Protocolos exclusivos</strong> e
            personalizados, com os mais modernos tratamentos faciais, corporais e capilares.
          </p>
          <a
            href={WHATSAPP_HREF}
            target="_blank"
            rel="noopener noreferrer"
            className="cta-agendar mt-7 inline-block rounded-[2px] px-[60px] py-[16px] text-center font-sans text-[13px] font-medium uppercase tracking-[0.14em] text-white hover:-translate-y-1 lg:px-[80px]"
          >
            Agende sua avaliação agora
          </a>
          <p className="mt-4 font-display italic leading-snug text-[#5a2a3a]" style={{ fontSize: 'clamp(20px, 2.4vw, 24px)' }}>
            e descubra qual tratamento é ideal para você!
          </p>
        </div>
      </div>
    </section>
  );
}

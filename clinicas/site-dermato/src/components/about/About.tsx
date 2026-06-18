'use client';

import { useLayoutEffect, useRef } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { AboutBackdrop } from './AboutBackdrop';
import { AboutPortraitPrimary, AboutPortraitSecondary } from './AboutPortrait';
import { AboutText } from './AboutText';
import { AboutEyebrow, AboutLead, AboutHeadingTitle, AboutBioParagraphs } from './aboutContent';
import aboutMobile from '@/assets/images/about-mobile.webp';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export function About() {
  const outerRef = useRef<HTMLElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);
  const primaryRef = useRef<HTMLDivElement>(null);
  const secondaryRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const mobileRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const outer = outerRef.current;
    const sticky = stickyRef.current;
    const stage = stageRef.current;
    const backdrop = backdropRef.current;
    if (!outer || !sticky || !stage || !backdrop) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // ─────────────────────────────────────────────────────────────
      // DESKTOP (≥768px) — palco pinado (scrub), crossfade primary→secondary.
      // Comportamento original preservado.
      // ─────────────────────────────────────────────────────────────
      mm.add('(min-width: 768px)', () => {
        const primary = primaryRef.current;
        const secondary = secondaryRef.current;
        const text = textRef.current;
        if (!primary || !secondary || !text) return;

        const items = text.querySelectorAll<HTMLElement>('[data-about-anim]');

        gsap.set(backdrop, { opacity: 1 });
        gsap.set(primary, { opacity: 1 });
        gsap.set(secondary, { opacity: 0 });
        gsap.set(items, { opacity: 0, y: 15 });
        gsap.set(stage, { opacity: 1 });

        if (prefersReduced) {
          gsap.set(backdrop, { opacity: 0.2 });
          gsap.set(primary, { opacity: 0 });
          gsap.set(secondary, { opacity: 1 });
          gsap.set(items, { opacity: 1, y: 0 });
          return;
        }

        const tl = gsap.timeline({
          defaults: { ease: 'none' },
          scrollTrigger: {
            trigger: outer,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 1.5,
            pin: sticky,
            pinSpacing: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        tl.to(backdrop, { opacity: 0.12, yPercent: -22, ease: 'power1.inOut', duration: 0.3 }, 0);
        tl.to(primary, { opacity: 0, ease: 'power1.inOut', duration: 0.28 }, 0.1);
        tl.to(secondary, { opacity: 1, ease: 'power1.inOut', duration: 0.28 }, 0.1);
        tl.to(items, { opacity: 1, y: 0, stagger: 0.08, ease: 'power2.out', duration: 0.16 }, 0.32);
        tl.to(text, { yPercent: -20, opacity: 0, ease: 'power1.in', duration: 0.18 }, 0.72);
        tl.to(stage, { opacity: 0, ease: 'power1.inOut', duration: 0.15 }, 0.85);
      });

      // ─────────────────────────────────────────────────────────────
      // MOBILE (<768px) — scroll natural, fiel ao original. Conteúdo flui:
      // título → frase de abertura → foto (com fade) → parágrafos.
      // Cada elemento revela com fade-up suave ao entrar na viewport.
      // ─────────────────────────────────────────────────────────────
      mm.add('(max-width: 767px)', () => {
        const mobile = mobileRef.current;
        if (!mobile) return;

        const items = mobile.querySelectorAll<HTMLElement>('[data-about-anim]');

        if (prefersReduced) {
          gsap.set(items, { opacity: 1, y: 0 });
          return;
        }

        items.forEach((el) => {
          gsap.from(el, {
            opacity: 0,
            y: 26,
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 88%',
              once: true,
            },
          });
        });
      });
    }, outer);

    // Recalcula posições quando as fontes terminam de carregar.
    if (!prefersReduced && typeof document !== 'undefined' && document.fonts?.ready) {
      document.fonts.ready.then(() => ScrollTrigger.refresh());
    }

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={outerRef}
      id="quem-sou"
      className="relative z-10 w-full bg-bg md:bg-[#D9CFCC] md:h-[600vh]"
      aria-label="Quem sou — Tatiani Sabadini"
    >
      <div
        ref={stickyRef}
        className="
          relative w-full bg-bg md:bg-[#D9CFCC]
          md:sticky md:top-0 md:h-[100svh] md:overflow-hidden
        "
      >
        <div ref={stageRef} className="relative w-full md:h-full">
          {/* Backdrop watermark — apenas desktop */}
          <AboutBackdrop ref={backdropRef} />

          {/* ───── DESKTOP (≥768px) ───── */}
          <AboutPortraitPrimary ref={primaryRef} />

          <div
            className="
              absolute inset-0 z-[3]
              hidden md:flex items-center justify-center
              gap-8 md:gap-12 lg:gap-16 xl:gap-24
              px-6 sm:px-12 md:px-16 lg:px-20
            "
          >
            <AboutText ref={textRef} />
            <AboutPortraitSecondary ref={secondaryRef} />
          </div>

          {/* ───── MOBILE (<768px) — fluido: título → frase → foto → textos ───── */}
          <div
            ref={mobileRef}
            className="
              relative z-[3] md:hidden
              flex flex-col
              px-7
              pt-[20vh] pb-[16vh]
              text-bordo select-text
            "
          >
            <AboutEyebrow />
            <AboutHeadingTitle />
            <AboutLead />

            {/* Foto com fade já embutido — sobre o fundo blush ela se integra
                naturalmente, sem precisar de blend/máscara. */}
            <div data-about-anim className="relative mx-auto my-10 w-[88%] max-w-[360px]">
              <Image
                src={aboutMobile}
                alt="Dra. Tatiani Sabadini"
                sizes="88vw"
                placeholder="blur"
                className="h-auto w-full"
              />
            </div>

            <AboutBioParagraphs />
          </div>
        </div>
      </div>
    </section>
  );
}

'use client';

import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { HeroVideo } from './HeroVideo';
import { HeroContent } from './HeroContent';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ctx = gsap.context(() => {
      if (!prefersReduced) {
        const items = section.querySelectorAll<HTMLElement>('[data-hero-anim]');
        gsap.set(items, { opacity: 0, y: 15 });
        gsap.to(items, {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.2,
          ease: 'power3.out',
          delay: 0.25,
        });
      } else {
        gsap.set(section.querySelectorAll('[data-hero-anim]'), { opacity: 1, y: 0 });
      }

      // Parallax sutil no conteúdo — usa endTrigger fixo para suportar o sticky
      if (!prefersReduced && contentRef.current) {
        gsap.to(contentRef.current, {
          yPercent: -6,
          opacity: 0.8,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: '+=100%',
            scrub: 1,
          },
        });
      }
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="top"
      className="sticky top-0 h-[100svh] min-h-[640px] w-full overflow-hidden bg-ink z-0"
      aria-label="Apresentação — Tatiani Sabadini"
    >
      <HeroVideo />
      <HeroContent ref={contentRef} />
    </section>
  );
}

'use client';

import { useLayoutEffect, useRef } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { WHATSAPP_HREF } from '@/lib/nav';
import modeloDesktop from '@/assets/images/dobra-05-desktop.webp';
import modeloMobile from '@/assets/images/dobra-05-modelo.webp';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Chamada final "Agende sua Consulta" — replica o original: no desktop a foto
 * da modelo (banner 1920×700) é o fundo da seção em cover, com o texto
 * sobreposto à esquerda. No mobile, a versão transparente da modelo aparece
 * empilhada acima do texto centralizado. Botão com brilho (.cta-agendar).
 */
export function AgendeConsulta() {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const items = gsap.utils.toArray<HTMLElement>('[data-cta-anim]', section);

    if (prefersReduced) {
      gsap.set(items, { opacity: 1, y: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.from(items, {
        opacity: 0,
        y: 34,
        duration: 1.15,
        stagger: 0.13,
        ease: 'power3.out',
        scrollTrigger: { trigger: section, start: 'top 68%', once: true },
      });

      // Parallax suave no fundo (apenas desktop).
      const bg = bgRef.current;
      if (bg && window.matchMedia('(min-width: 768px)').matches) {
        gsap.fromTo(
          bg,
          { yPercent: -4 },
          {
            yPercent: 4,
            ease: 'none',
            scrollTrigger: { trigger: section, start: 'top bottom', end: 'bottom top', scrub: true },
          }
        );
      }
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="agende"
      className="relative w-full overflow-hidden bg-bg"
      aria-label="Agende sua consulta"
    >
      {/* Fundo (desktop): banner da modelo em cover */}
      <div ref={bgRef} className="absolute inset-0 hidden md:block">
        <Image
          src={modeloDesktop}
          alt=""
          fill
          sizes="100vw"
          placeholder="blur"
          className="scale-[1.08] object-cover object-center"
        />
      </div>

      {/* Fade na base — dissolve a imagem no fundo, sem deixá-la "solta no ar" (desktop) */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[5] hidden h-1/3 bg-gradient-to-b from-transparent to-bg md:block" />

      <div className="relative z-10 mx-auto w-full max-w-[1240px] px-6 sm:px-10 lg:px-14">
        {/* Foto (mobile): versão transparente empilhada */}
        <div className="relative -mx-6 aspect-[929/627] w-[calc(100%+3rem)] sm:-mx-10 sm:w-[calc(100%+5rem)] md:hidden">
          <Image
            src={modeloMobile}
            alt="Modelo com pele saudável e natural"
            fill
            sizes="100vw"
            placeholder="blur"
            className="object-contain object-bottom"
          />
          {/* Fade na base — funde a imagem no fundo (mobile) */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-b from-transparent to-bg" />
        </div>

        {/* Texto */}
        <div className="py-16 text-center md:flex md:min-h-[700px] md:items-center md:py-24 md:text-left">
          <div className="md:max-w-[470px]">
            <p
              data-cta-anim
              className="mb-6 font-sans text-[12px] font-medium uppercase tracking-[0.26em] text-wine"
            >
              Atendimento humanizado, resultados reais
            </p>

            <h2
              data-cta-anim
              className="font-display font-light leading-[0.96] tracking-tight text-bordo"
              style={{ fontSize: 'clamp(2.8rem, 6vw, 5.5rem)' }}
            >
              Agende sua <span className="italic">Consulta</span>
            </h2>

            <p
              data-cta-anim
              className="mx-auto mt-7 max-w-[460px] font-sans font-light leading-relaxed text-ink/75 md:mx-0"
              style={{ fontSize: 'clamp(16px, 1.7vw, 18px)' }}
            >
              Descubra o poder de uma pele saudável e de uma beleza natural. Agende sua
              avaliação e dê o primeiro passo para{' '}
              <span className="font-display text-[1.15em] italic text-wine">
                realçar o melhor de você.
              </span>
            </p>

            <div data-cta-anim className="mt-10 flex justify-center md:justify-start">
              <a
                href={WHATSAPP_HREF}
                target="_blank"
                rel="noopener noreferrer"
                className="cta-agendar inline-block rounded-[5px] px-[52px] py-[18px] text-center font-sans text-[13px] font-medium uppercase tracking-[0.14em] text-bg transition-transform duration-300 hover:-translate-y-0.5"
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

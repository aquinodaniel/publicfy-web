'use client';

import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { NAV_ITEMS } from '@/lib/nav';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const SOCIAL = [
  {
    label: 'Instagram',
    handle: '@tatianisabadini',
    href: 'https://www.instagram.com/tatianisabadini/',
    viewBox: '0 0 448 512',
    path: 'M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z',
  },
  {
    label: 'Facebook',
    handle: '@dratatianisabadini',
    href: 'https://www.facebook.com/dratatianisabadini',
    viewBox: '0 0 512 512',
    path: 'M504 256C504 119 393 8 256 8S8 119 8 256c0 123.78 90.69 226.38 209.25 245V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.28c-30.8 0-40.41 19.12-40.41 38.73V256h68.78l-11 71.69h-57.78V501C413.31 482.38 504 379.78 504 256z',
  },
];

/**
 * Rodapé editorial — fundo bordô, texto creme. Marca em display, tagline do
 * site, redes sociais e navegação por âncoras. As colunas sobem em stagger ao
 * entrar na viewport.
 */
export function Footer() {
  const footerRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const footer = footerRef.current;
    if (!footer) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const items = gsap.utils.toArray<HTMLElement>('[data-footer-anim]', footer);

    if (prefersReduced) {
      gsap.set(items, { opacity: 1, y: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.from(items, {
        opacity: 0,
        y: 28,
        duration: 1,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: { trigger: footer, start: 'top 85%', once: true },
      });
    }, footer);

    return () => ctx.revert();
  }, []);

  return (
    <footer
      ref={footerRef}
      className="relative z-10 w-full overflow-hidden bg-bordo text-bg"
      aria-label="Rodapé"
    >
      <div className="mx-auto w-full max-w-[1280px] px-6 py-20 sm:px-10 md:py-28 lg:px-14">
        {/* Topo: marca + tagline | navegação */}
        <div className="grid grid-cols-1 gap-14 md:grid-cols-[1.5fr_1fr] md:gap-10">
          {/* Marca + tagline */}
          <div data-footer-anim className="max-w-[520px]">
            <a href="#top" className="group inline-flex items-baseline gap-3 leading-none">
              <span
                className="font-display font-light uppercase tracking-tight transition-opacity duration-500 group-hover:opacity-80"
                style={{ fontSize: 'clamp(1.9rem, 4vw, 2.8rem)' }}
              >
                Tatiani Sabadini
              </span>
              <span className="relative pl-3 font-sans text-[10px] font-light uppercase tracking-[0.2em] text-bg/65 before:absolute before:left-0 before:top-1/2 before:h-3 before:w-px before:-translate-y-1/2 before:bg-current before:opacity-50">
                dermatologista
              </span>
            </a>

            <p
              className="mt-7 font-display font-light italic leading-snug text-peach"
              style={{ fontSize: 'clamp(18px, 2.2vw, 24px)' }}
            >
              Realce sua beleza de forma natural, segura e com resultados que valorizam
              quem você é.
            </p>

            {/* Redes */}
            <div className="mt-9 flex flex-col gap-4">
              {SOCIAL.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex w-fit items-center gap-3 text-bg/80 transition-colors duration-300 hover:text-bg"
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-full border border-bg/25 transition-colors duration-300 group-hover:border-bg group-hover:bg-bg group-hover:text-bordo">
                    <svg
                      viewBox={s.viewBox}
                      aria-hidden="true"
                      className="h-[15px] w-[15px] fill-current"
                    >
                      <path d={s.path} />
                    </svg>
                  </span>
                  <span className="font-sans text-[13px] font-light tracking-wide">
                    {s.handle}
                  </span>
                </a>
              ))}
            </div>
          </div>

          {/* Navegação */}
          <nav data-footer-anim aria-label="Navegação do rodapé" className="md:justify-self-end">
            <p className="mb-6 font-sans text-[11px] font-medium uppercase tracking-[0.24em] text-bg/45">
              Navegação
            </p>
            <ul className="flex flex-col gap-4">
              {NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="group inline-flex items-center font-display font-light tracking-tight text-bg/85 transition-colors duration-300 hover:text-peach"
                    style={{ fontSize: 'clamp(1.3rem, 2.4vw, 1.7rem)' }}
                  >
                    <span className="mr-0 h-px w-0 bg-peach transition-all duration-500 ease-editorial group-hover:mr-3 group-hover:w-6" />
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Base: divisória + créditos */}
        <div
          data-footer-anim
          className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-bg/15 pt-8 font-sans text-[12px] font-light text-bg/55 sm:flex-row sm:items-center"
        >
          <p>© 2026 Dra. Tatiani Sabadini — Todos os direitos reservados.</p>
          <p className="tracking-wide">
            Desenvolvido por{' '}
            <a
              href="https://publicfy.com.br"
              target="_blank"
              rel="noopener noreferrer"
              className="text-bg/75 underline-offset-4 transition-colors duration-300 hover:text-peach hover:underline"
            >
              Publicfy
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

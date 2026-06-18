'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import clsx from 'clsx';
import { NAV_ITEMS, WHATSAPP_HREF } from '@/lib/nav';
import { MobileMenu } from './MobileMenu';

export function Header() {
  const headerRef = useRef<HTMLElement>(null);
  const lastScrollY = useRef(0);
  const hidden = useRef(false);
  const [mounted, setMounted] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!headerRef.current) return;
    const el = headerRef.current;

    gsap.fromTo(
      el,
      { y: -24, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.1, delay: 0.15, ease: 'power3.out' }
    );

    const onScroll = () => {
      const y = window.scrollY;
      const goingDown = y > lastScrollY.current;
      const shouldHide = goingDown && y > 80;

      if (shouldHide && !hidden.current) {
        hidden.current = true;
        gsap.to(el, { y: '-100%', duration: 0.45, ease: 'power3.out' });
      } else if (!shouldHide && hidden.current) {
        hidden.current = false;
        gsap.to(el, { y: '0%', duration: 0.5, ease: 'power3.out' });
      }
      lastScrollY.current = y;
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Mantém o header sempre visível enquanto o menu mobile está aberto.
  useEffect(() => {
    if (!menuOpen || !headerRef.current) return;
    hidden.current = false;
    gsap.to(headerRef.current, { y: '0%', duration: 0.3, ease: 'power3.out' });
  }, [menuOpen]);

  return (
    <>
      <header
        ref={headerRef}
        className={clsx(
          'fixed top-0 left-0 right-0 z-[70]',
          'px-6 md:px-10 lg:px-14',
          'py-6 md:py-8',
          'flex items-center justify-between',
          'opacity-0',
          mounted && 'opacity-100',
          // Sobre o painel bordô do menu usamos creme fixo; fora dele,
          // mix-blend adapta a cor ao conteúdo por baixo.
          menuOpen ? 'text-bg' : 'text-bg mix-blend-difference'
        )}
        style={{ transition: 'opacity 0.3s ease' }}
      >
        {/* Marca à esquerda */}
        <a
          href="#top"
          onClick={() => setMenuOpen(false)}
          className="group flex items-baseline gap-3 leading-none"
          aria-label="Tatiani Sabadini — início"
        >
          <span
            className="
              font-display font-normal
              text-[20px] md:text-[22px] lg:text-[24px]
              tracking-[-0.01em] uppercase
              transition-opacity duration-500
              group-hover:opacity-80
            "
          >
            Tatiani Sabadini
          </span>
          <span
            className="
              hidden md:inline
              text-[10px] tracking-wider2 uppercase font-sans font-light
              opacity-65
              relative pl-3
              before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2
              before:w-[1px] before:h-3 before:bg-current before:opacity-50
            "
          >
            dermatologista
          </span>
        </a>

        {/* Nav + CTA à direita */}
        <div className="flex items-center gap-8 md:gap-10 lg:gap-14">
          <nav aria-label="Navegação principal" className="hidden md:block">
            <ul className="flex items-center gap-7 lg:gap-9">
              {NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="
                      text-[11px] tracking-wider2 uppercase font-sans font-light
                      relative
                      after:absolute after:left-0 after:-bottom-1.5 after:h-px after:w-0
                      after:bg-current after:transition-all after:duration-500 after:ease-editorial
                      hover:after:w-full
                    "
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* CTA Agendar — destaque magazine */}
          <a
            href={WHATSAPP_HREF}
            target="_blank"
            rel="noopener noreferrer"
            className="
              hidden md:inline-flex items-center gap-2
              text-[10px] tracking-wider2 uppercase font-sans
              border border-bg/50 hover:border-bg
              rounded-full
              px-5 py-2.5
              transition-all duration-500 ease-editorial
              hover:bg-bg hover:text-ink
            "
          >
            Agendar
            <span aria-hidden="true">→</span>
          </a>

          {/* Mobile menu trigger — hambúrguer ↔ X */}
          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
            aria-expanded={menuOpen}
            className="md:hidden relative flex h-6 w-7 items-center justify-center p-2 -mr-2"
          >
            <span
              className={clsx(
                'absolute block h-px w-6 bg-current transition-all duration-[400ms] ease-editorial',
                menuOpen ? 'rotate-45' : '-translate-y-[3.5px]'
              )}
            />
            <span
              className={clsx(
                'absolute block h-px w-6 bg-current transition-all duration-[400ms] ease-editorial',
                menuOpen ? '-rotate-45' : 'translate-y-[3.5px]'
              )}
            />
          </button>
        </div>
      </header>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}

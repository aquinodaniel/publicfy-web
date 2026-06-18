'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { NAV_ITEMS, WHATSAPP_HREF } from '@/lib/nav';
import { lockScroll, unlockScroll } from '@/lib/lenis';

type MobileMenuProps = {
  open: boolean;
  onClose: () => void;
};

export function MobileMenu({ open, onClose }: MobileMenuProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<HTMLDivElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  // ─── Monta a timeline uma única vez ───
  useEffect(() => {
    const root = rootRef.current;
    const panel = panelRef.current;
    const items = itemsRef.current;
    if (!root || !panel || !items) return;

    const targets = items.querySelectorAll<HTMLElement>('[data-menu-item]');
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Estado inicial (fechado)
    gsap.set(root, { autoAlpha: 0 });
    gsap.set(panel, { yPercent: -101 });
    gsap.set(targets, { y: 36, autoAlpha: 0 });

    const tl = gsap.timeline({ paused: true });

    if (prefersReduced) {
      tl.set(root, { autoAlpha: 1 })
        .set(panel, { yPercent: 0 })
        .set(targets, { y: 0, autoAlpha: 1 });
    } else {
      tl.set(root, { autoAlpha: 1 })
        .to(panel, { yPercent: 0, duration: 0.72, ease: 'power4.inOut' })
        .to(
          targets,
          { y: 0, autoAlpha: 1, duration: 0.6, stagger: 0.06, ease: 'power3.out' },
          '-=0.32'
        );
    }

    tlRef.current = tl;
    return () => {
      tl.kill();
    };
  }, []);

  // ─── Abre / fecha ───
  useEffect(() => {
    const tl = tlRef.current;
    if (!tl) return;

    if (open) {
      lockScroll();
      tl.play();
    } else {
      tl.reverse();
      unlockScroll();
    }
  }, [open]);

  // ─── Fecha com Escape ───
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open, onClose]);

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-[60] invisible"
      role="dialog"
      aria-modal="true"
      aria-label="Menu de navegação"
      aria-hidden={!open}
    >
      {/* Painel bordô que desce do topo */}
      <div
        ref={panelRef}
        className="
          absolute inset-0
          bg-bordo text-bg
          flex flex-col
          px-7 sm:px-10
          pt-28 pb-10
          overflow-y-auto
        "
      >
        <div ref={itemsRef} className="flex flex-1 flex-col">
          {/* Kicker editorial */}
          <span
            data-menu-item
            className="
              block text-[10px] tracking-wider2 uppercase font-sans font-light
              text-bg/55 mb-8
            "
          >
            Navegação
          </span>

          {/* Links principais — numerados estilo revista */}
          <nav aria-label="Navegação mobile">
            <ul className="flex flex-col gap-1">
              {NAV_ITEMS.map((item, i) => (
                <li key={item.href} data-menu-item>
                  <a
                    href={item.href}
                    onClick={onClose}
                    className="
                      group flex items-baseline gap-4 py-2.5
                      border-b border-bg/12
                    "
                  >
                    <span
                      className="
                        text-[11px] tracking-wider2 font-sans font-light
                        text-bg/40 tabular-nums
                        translate-y-[-2px]
                      "
                    >
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span
                      className="
                        font-display font-normal
                        text-[clamp(2rem,11vw,3rem)] leading-[1.05]
                        tracking-tight
                        transition-opacity duration-500 ease-editorial
                        group-hover:opacity-70
                      "
                    >
                      {item.label}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Rodapé do menu: CTA + contato */}
          <div className="mt-auto pt-12 flex flex-col gap-8">
            <a
              data-menu-item
              href={WHATSAPP_HREF}
              target="_blank"
              rel="noopener noreferrer"
              onClick={onClose}
              className="
                inline-flex items-center justify-between gap-3
                w-full
                border border-bg/40 hover:border-bg
                rounded-full
                px-7 py-4
                text-[12px] tracking-wider2 uppercase font-sans
                transition-colors duration-500 ease-editorial
                hover:bg-bg hover:text-bordo
              "
            >
              Agendar consulta
              <span aria-hidden="true">→</span>
            </a>

            <div
              data-menu-item
              className="
                flex flex-col gap-3
                text-[11px] tracking-wider2 uppercase font-sans font-light
                text-bg/55
              "
            >
              <a
                href="https://instagram.com/tatianisabadini"
                target="_blank"
                rel="noopener noreferrer"
                className="w-fit transition-colors duration-500 hover:text-bg"
              >
                Instagram — @tatianisabadini
              </a>
              <span className="text-bg/35">CRM 198.372 · Dermatologia</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

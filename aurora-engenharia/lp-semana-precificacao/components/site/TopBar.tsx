'use client';

import { useEffect, useState } from 'react';
import { topbar } from '@/content/site';

// ============================================================
// 0 · TOP BAR — réplica do header da Semana da Água Quente (imersão):
// logo branca + linha "evento · datas · horário" à esquerda; botão dourado
// "Garantir vaga · R$ 27 →" à direita. Fundo ganha bg-ink ao rolar.
// ============================================================
export default function TopBar({ onCTAClick }: { onCTAClick: () => void }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = window.requestAnimationFrame(() => {
        raf = 0;
        setScrolled(window.scrollY > 24);
      });
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (raf) window.cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled
          ? 'border-b border-white/10 bg-ink/85 backdrop-blur-md'
          : 'border-b border-transparent bg-transparent'
      }`}
    >
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-3 px-4 md:h-20 md:px-8">
        {/* esquerda: logo + linha do evento */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label={topbar.logoAlt}
          className="flex min-w-0 items-center gap-3 md:gap-4"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logo-aurora-white.png"
            alt="Aurora Engenharia"
            className="h-8 w-auto shrink-0 md:h-10"
          />
          <span className="hidden items-center gap-2.5 border-l border-white/15 pl-3 font-mono text-[10px] uppercase tracking-[0.2em] text-cota md:flex md:pl-4">
            <span className="font-bold tracking-[0.22em] text-paper">{topbar.eventoLinha}</span>
            <span aria-hidden className="text-white/25">·</span>
            <span>{topbar.datasLinha}</span>
            <span aria-hidden className="text-white/25">·</span>
            <span>{topbar.horarioLinha}</span>
          </span>
        </button>

        {/* direita: CTA dourado */}
        <button
          onClick={onCTAClick}
          className="btn-cta shrink-0 whitespace-nowrap px-4 py-2 text-[11px] md:px-6 md:py-2.5 md:text-sm"
        >
          {topbar.ctaOferta} →
        </button>
      </div>
    </header>
  );
}

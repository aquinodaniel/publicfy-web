'use client';

import { footer, brand } from '@/content/site';

// ============================================================
// 11 · FOOTER 🌑 — rodapé institucional simples (cópia da Água Quente).
// Sem efeitos de fundo (gradiente/grid/halo) — apenas as informações.
// ============================================================
export default function Footer() {
  return (
    <footer id="footer" className="bg-ink-deep py-10 text-white md:py-12">
      <div className="mx-auto w-full max-w-6xl px-5 md:px-8">
        <div className="flex flex-col items-start gap-3 border-t border-white/10 pt-6 font-mono text-[9px] uppercase tracking-[0.2em] text-white/40 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between sm:gap-4 md:text-[10px] md:pt-8">
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            <span>{footer.rodape}</span>
            <span aria-hidden>·</span>
            <a
              href={brand.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-white"
            >
              {brand.instagram}
            </a>
          </div>
          <div className="flex items-center gap-3">
            {footer.links.map((l) => (
              <a key={l.label} href={l.href} className="transition-colors hover:text-white">
                {l.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

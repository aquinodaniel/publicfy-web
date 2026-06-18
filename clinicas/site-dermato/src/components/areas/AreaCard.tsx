'use client';

import Image from 'next/image';
import type { Area } from './areasContent';

/**
 * Card de uma área de atuação — foto real em destaque.
 *
 * Repouso: foto (250×450 no desktop) com overlay bordô e o título na base; hover
 *   revela a descrição. Mobile: resumo sempre visível.
 * Transição: o título grande some e entra um mini-label (estilo galeria) que
 *   acompanha o card enquanto ele sobe no fluxo. Orquestrado em Areas.tsx.
 */
export function AreaCard({ area }: { area: Area }) {
  const { title, summary, body, image } = area;

  return (
    <article
      data-area-card
      className="group relative overflow-hidden rounded-[4px] bg-bordo md:aspect-[5/9] md:w-[clamp(150px,17vw,250px)] md:shrink-0"
    >
      <div className="relative aspect-[3/4] w-full md:aspect-auto md:h-full">
        <Image
          src={image}
          alt={title}
          fill
          sizes="(min-width: 1024px) 250px, (min-width: 640px) 50vw, 100vw"
          placeholder="blur"
          className="object-cover object-center transition-transform duration-[1200ms] ease-editorial group-hover:scale-[1.06]"
        />

        {/* Overlay bordô — legibilidade do texto, encorpa no hover. */}
        <div
          data-area-overlay
          className="absolute inset-0 bg-gradient-to-t from-bordo/70 via-bordo/15 to-transparent transition-colors duration-500 ease-editorial group-hover:from-bordo/80 group-hover:via-bordo/35"
        />

        {/* Mini-label (estilo galeria) — aparece na transição, acompanha a subida. */}
        <span
          data-area-minilabel
          className="pointer-events-none absolute inset-x-0 bottom-4 hidden text-center font-sans text-[10px] uppercase tracking-[0.22em] text-white opacity-0 [text-shadow:0_1px_6px_rgba(0,0,0,0.45)] md:block"
        >
          {title}
        </span>

        {/* Conteúdo de repouso (some na transição). */}
        <div data-area-cardtext className="absolute inset-x-0 bottom-0 p-5 text-bg lg:p-6">
          <h3 className="font-display text-[1.5rem] leading-[1.05] tracking-tight lg:text-[1.85rem]">
            {title}
          </h3>

          {/* Régua que cresce no hover (desktop). */}
          <span className="mt-2 hidden h-px w-6 bg-bg/50 transition-all duration-500 ease-editorial group-hover:w-12 group-hover:bg-bg md:block" />

          {/* Resumo — sempre visível no mobile. */}
          <p className="mt-2 font-sans text-[14px] font-light leading-relaxed text-bg/85 md:hidden">
            {summary}
          </p>

          {/* Texto completo — revelado no hover (desktop). */}
          <div className="hidden grid-rows-[0fr] transition-[grid-template-rows] duration-700 ease-editorial group-hover:grid-rows-[1fr] md:grid">
            <div className="overflow-hidden">
              <p
                className="
                  mt-3 font-sans text-[13.5px] font-light leading-[1.65] text-bg/90
                  translate-y-2 opacity-0 transition-all duration-500 delay-150 ease-editorial
                  group-hover:translate-y-0 group-hover:opacity-100
                "
              >
                {body}
              </p>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

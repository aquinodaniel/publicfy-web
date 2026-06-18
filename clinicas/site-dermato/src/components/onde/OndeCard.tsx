'use client';

import type { Cidade } from './ondeContent';

/**
 * Ficha de catálogo de um local de atendimento. Visual de "índice editorial":
 * cada unidade é numerada (01, 02…) e organizada como uma ficha legível.
 *
 *   ┌─────────────────────────┐
 *   │  [ MAPA ]          ⌖ SP  │  ← mapa + etiqueta UF; nº grande na base
 *   │                  01      │
 *   ├─────────────────────────┤
 *   │ UNIDADE / CONSULTÓRIO    │  ← eyebrow (metadados)
 *   │ Jales                    │  ← nome (display)
 *   │ Rua Amalias, Cond. 21 …  │  ← endereço, alta legibilidade
 *   │ ─────────────────────    │
 *   │ Ver no Maps →  [Agendar] │  ← rodapé de ações
 *   └─────────────────────────┘
 *
 * Fundo branco para máximo contraste/legibilidade sobre o vinho da seção.
 */
export function OndeCard({ cidade, index }: { cidade: Cidade; index: number }) {
  const { nome, endereco, whatsapp, mapa } = cidade;
  const numero = String(index + 1).padStart(2, '0');

  return (
    <article
      data-onde-card
      className="group flex h-full flex-col overflow-hidden rounded-[10px] border border-bordo/10 bg-bg-alt shadow-[0_20px_60px_-30px_rgba(0,0,0,0.55)] transition-all duration-500 ease-editorial hover:-translate-y-1.5 hover:border-peach/60 hover:shadow-[0_30px_70px_-28px_rgba(0,0,0,0.65)]"
    >
      {/* Mapa — moldura superior com número de catálogo e etiqueta UF */}
      <div className="relative aspect-[16/11] w-full overflow-hidden bg-surface">
        <iframe
          src={mapa}
          title={`Mapa — ${nome}`}
          loading="lazy"
          className="absolute inset-0 h-full w-full grayscale-[35%] transition-[filter] duration-500 group-hover:grayscale-0"
          style={{ border: 0 }}
        />

        {/* Número de catálogo — base esquerda */}
        <span
          className="pointer-events-none absolute bottom-2 left-3 font-display font-light leading-none text-bg/90 [text-shadow:0_2px_14px_rgba(0,0,0,0.5)]"
          style={{ fontSize: 'clamp(2.6rem, 5vw, 3.4rem)' }}
        >
          {numero}
        </span>
      </div>

      {/* Corpo da ficha */}
      <div className="flex flex-1 flex-col p-6 lg:p-7">
        {/* Nome */}
        <h3
          className="font-display font-light leading-[1.05] tracking-tight text-bordo"
          style={{ fontSize: 'clamp(1.55rem, 2.6vw, 2.1rem)' }}
        >
          {nome}
        </h3>

        {/* Endereço — legibilidade priorizada */}
        <p className="mt-4 font-sans text-[15px] font-light leading-[1.65] text-ink/70">
          {endereco}
        </p>

        {/* Divisória + CTA centralizado (alinhado à base) */}
        <div className="mt-auto pt-6">
          <span className="block h-px w-full bg-bordo/10" />
          <div className="mt-5 flex justify-center">
            <a
              href={whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block rounded-[6px] bg-bordo px-8 py-3 text-center font-sans text-[12px] font-medium uppercase tracking-[0.1em] text-bg transition-colors duration-300 hover:bg-wine"
            >
              Agendar
            </a>
          </div>
        </div>
      </div>
    </article>
  );
}

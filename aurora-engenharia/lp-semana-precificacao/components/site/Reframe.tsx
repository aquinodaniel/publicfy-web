'use client';

import { reframe } from '@/content/site';
import SectionShell from '@/components/shared/SectionShell';
import MaskReveal from '@/components/motion/MaskReveal';

// ============================================================
// 3 · REFRAME ☀️ — headline centralizada + comparativo Coach × Precificação.
// ============================================================

export default function Reframe({ onCTAClick }: { onCTAClick: () => void }) {
  return (
    <SectionShell theme="light">
      <MaskReveal
        as="h2"
        variant="glow"
        className="mx-auto max-w-3xl text-center text-3xl font-black tracking-tight md:text-4xl"
      >
        {reframe.h2Pre}
        <span className="text-aurora">{reframe.h2Destaque}</span>
      </MaskReveal>

      {/* PROTAGONISTA: comparativo 2 colunas */}
      <div className="mt-14 grid gap-4 md:grid-cols-2 md:gap-6">
        {/* esquerda: coach genérico — dessaturado, peso menor */}
        <div className="rounded-2xl border border-ink/10 bg-transparent p-6 md:p-7">
          <MaskReveal
            as="p"
            variant="wipe"
            className="mb-5 font-mono text-xs uppercase tracking-[0.2em] text-cota"
          >
            {reframe.comparativo.esquerdaTitulo}
          </MaskReveal>
          <ul className="space-y-4">
            {reframe.comparativo.linhas.map((linha, i) => (
              <MaskReveal
                key={i}
                as="li"
                variant="wipe"
                delay={i * 0.12}
                className="flex items-start gap-3 text-cota/80"
              >
                <span aria-hidden className="mt-1 select-none text-cota/50">
                  –
                </span>
                <span className="text-base">{linha[0]}</span>
              </MaskReveal>
            ))}
          </ul>
        </div>

        {/* direita: Semana da Precificação — nítida, destaque aurora, entra defasada */}
        <div className="rounded-2xl border border-aurora/20 bg-aurora/[0.04] p-6 shadow-sm md:p-7">
          <MaskReveal
            as="p"
            variant="wipe"
            delay={0.1}
            className="mb-5 font-mono text-xs uppercase tracking-[0.2em] text-aurora"
          >
            {reframe.comparativo.direitaTitulo}
          </MaskReveal>
          <ul className="space-y-4">
            {reframe.comparativo.linhas.map((linha, i) => (
              <MaskReveal
                key={i}
                as="li"
                variant="wipe"
                delay={i * 0.12 + 0.1}
                className="flex items-start gap-3 text-ink"
              >
                <span aria-hidden className="mt-0.5 select-none font-bold text-aurora">
                  ▸
                </span>
                <span className="text-base font-medium">{linha[1]}</span>
              </MaskReveal>
            ))}
          </ul>
        </div>
      </div>

      {/* CTA — frase simples e direta, depois o botão */}
      <div className="mt-10 flex flex-col items-center gap-5 text-center md:mt-12">
        <p className="max-w-xl text-xl font-bold text-ink md:text-2xl">
          {reframe.ctaApoio.pre}
          <span className="text-aurora">{reframe.ctaApoio.destaque}</span>
        </p>
        <button
          onClick={onCTAClick}
          className="btn-cta px-9 py-4 text-base md:text-lg"
        >
          {reframe.cta}
        </button>
      </div>
    </SectionShell>
  );
}

'use client';

import { motion } from 'framer-motion';
import { qualificacao } from '@/content/site';
import SectionShell from '@/components/shared/SectionShell';
import MaskReveal from '@/components/motion/MaskReveal';
import DrawLine from '@/components/motion/DrawLine';
import { usePrefersReducedMotion } from '@/lib/hooks';

// ============================================================
// 6 · QUALIFICAÇÃO ☀️ — "É pra você se…"
// Duas colunas: SIM entra da esquerda, NÃO entra da direita.
// PROTAGONISTA: coluna SIM — os checks ✓ se desenham um a um (stagger).
// Coluna NÃO: marcador neutro "–", dessaturada/menor. Sem X vermelho.
// Fecho centralizado embaixo.
// ============================================================

const EASE = [0.22, 0.61, 0.36, 1] as const;

// ✓ desenhado linha a linha (DrawLine, cor emerald = positivo)
function Check({ delay }: { delay: number }) {
  return (
    <DrawLine
      d="M4 12 L10 18 L20 6"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2.5}
      duration={0.5}
      delay={delay}
      preserveAspectRatio="xMidYMid meet"
      className="h-5 w-5 shrink-0 text-emerald"
    />
  );
}

export default function Qualificacao() {
  const reduced = usePrefersReducedMotion();

  // colunas deslizam dos lados (respeitando reduced-motion)
  const fromLeft = reduced
    ? { initial: false as const }
    : { initial: { opacity: 0, x: -28 }, whileInView: { opacity: 1, x: 0 } };
  const fromRight = reduced
    ? { initial: false as const }
    : { initial: { opacity: 0, x: 28 }, whileInView: { opacity: 1, x: 0 } };

  return (
    <SectionShell theme="light">
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-aurora">
        {qualificacao.eyebrow}
      </p>

      <MaskReveal
        as="h2"
        variant="glow"
        className="mt-4 max-w-3xl text-3xl font-black tracking-tight md:text-4xl"
      >
        {qualificacao.h2Pre}
        <span className="text-aurora">{qualificacao.h2Destaque}</span>
      </MaskReveal>

      <div className="mt-12 grid gap-5 md:grid-cols-2 md:gap-8">
        {/* SIM — protagonista: entra da esquerda, checks desenham um a um */}
        <motion.div
          {...fromLeft}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: EASE }}
          className="rounded-2xl border border-emerald/25 bg-emerald/[0.04] p-6 shadow-sm md:p-8"
        >
          <p className="mb-6 font-mono text-xs uppercase tracking-[0.2em] text-emerald">
            ▸ {qualificacao.sim.titulo}
          </p>
          <ul className="space-y-5">
            {qualificacao.sim.itens.map((item, i) => (
              <li key={item} className="flex items-start gap-3">
                <span className="mt-0.5">
                  <Check delay={i * 0.18} />
                </span>
                <span className="text-base font-medium text-ink">{item}</span>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* NÃO — entra da direita, dessaturada/menor, marcador neutro "–" */}
        <motion.div
          {...fromRight}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: EASE, delay: 0.1 }}
          className="rounded-2xl border border-ink/10 bg-transparent p-6 md:p-7"
        >
          <p className="mb-6 font-mono text-xs uppercase tracking-[0.2em] text-cota">
            – {qualificacao.nao.titulo}
          </p>
          <ul className="space-y-5">
            {qualificacao.nao.itens.map((item) => (
              <li key={item} className="flex items-start gap-3 text-cota/80">
                <span aria-hidden className="mt-2 h-px w-3 shrink-0 select-none bg-cota/50" />
                <span className="text-[0.95rem] leading-snug">{item}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>

      {/* fecho centralizado */}
      <MaskReveal
        as="p"
        variant="glow"
        delay={0.15}
        className="mx-auto mt-12 max-w-2xl text-center text-base text-cota"
      >
        {qualificacao.fecho}
      </MaskReveal>
    </SectionShell>
  );
}

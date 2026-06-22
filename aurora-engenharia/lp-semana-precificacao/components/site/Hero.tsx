'use client';

import { hero } from '@/content/site';
import MaskReveal from '@/components/motion/MaskReveal';
import GrowthChart from '@/components/shared/GrowthChart';
import HeroTimer from '@/components/shared/HeroTimer';

// ============================================================
// 1 · HERO 🌑 — texto à esquerda, gráfico de crescimento à direita.
// O gráfico comunica a tese (quem precifica cresce, quem não, estagna) em <2s.
// ============================================================
export default function Hero({ onCTAClick }: { onCTAClick: () => void }) {
  return (
    <section className="relative overflow-hidden bg-ink text-paper">
      {/* gradiente radial de fundo */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 90% 70% at 25% 35%, rgba(0,101,123,0.16), transparent 65%)'
        }}
      />
      {/* grid técnico quase invisível */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-cross-dark bg-[length:56px_56px] opacity-50"
      />
      {/* glow dourado atrás do título/CTA (coluna esquerda) */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-28 top-1/4 h-[520px] w-[520px] rounded-full bg-alert/[0.07] blur-[130px]"
      />
      {/* halo ambiente à direita (atrás do gráfico) */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 top-0 h-[700px] w-[700px] rounded-full bg-aurora-glow/[0.05] blur-[140px]"
      />
      <div className="relative z-10 mx-auto grid w-full max-w-6xl gap-10 px-5 pb-16 pt-24 md:grid-cols-[1.05fr_0.95fr] md:items-stretch md:gap-12 md:px-8 md:pb-20 md:pt-28">
        {/* coluna texto */}
        <div className="flex flex-col">
          <h1 className="text-balance text-2xl font-black leading-[1.25] tracking-tight md:text-4xl">
            <MaskReveal as="span" trigger="mount" variant="wipe" delay={0}>
              {hero.h1.pre}
              <span className="text-aurora-glow">{hero.h1.baixo}</span>
              {hero.h1.mid}
              <span className="text-alert">{hero.h1.alto}</span>
              {hero.h1.pos}
            </MaskReveal>
          </h1>

          <MaskReveal as="p" trigger="mount" variant="glow" delay={0.35} className="mt-5 max-w-xl text-lg font-semibold leading-snug text-paper/90 md:text-xl">
            {hero.sub.pre}
            <span className="text-alert">{hero.sub.destaque}</span>
            {hero.sub.fim}
          </MaskReveal>

          <MaskReveal as="p" trigger="mount" variant="glow" delay={0.55} className="mt-4 max-w-xl text-sm leading-relaxed text-paper/65 md:text-base">
            {hero.para.pre}
            <strong className="text-alert">{hero.para.valor}</strong>
            {hero.para.fim}
          </MaskReveal>

          <div className="mt-7">
            <button
              onClick={onCTAClick}
              className="btn-cta px-10 py-5 text-lg md:text-xl"
            >
              {hero.ctaPrimario}
            </button>
          </div>

          {/* Contador regressivo — empurrado pra base (alinha com a frase do gráfico) */}
          <HeroTimer className="mt-8 max-w-md md:mt-auto md:pt-10" />
        </div>

        {/* coluna visual: gráfico de crescimento (a tese em <2s) — enche a altura */}
        <div className="h-full w-full">
          <GrowthChart />
        </div>
      </div>
    </section>
  );
}

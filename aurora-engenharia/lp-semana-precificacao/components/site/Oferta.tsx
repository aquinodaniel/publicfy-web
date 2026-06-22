'use client';

import type { MouseEvent as ReactMouseEvent } from 'react';
import { motion, useMotionValue, useSpring, useTransform, type MotionStyle } from 'framer-motion';
import { oferta } from '@/content/site';
import { useSeats, usePrefersReducedMotion } from '@/lib/hooks';
import SectionShell from '@/components/shared/SectionShell';
import MaskReveal from '@/components/motion/MaskReveal';
import Reveal from '@/components/motion/Reveal';

// ============================================================
// 9 · A OFERTA 🌑 — dois ingressos: Normal × Premium (id="pricing").
// Premium destacado (moldura dourada + cantos blueprint + tilt 3D / glare).
// Sem garantia (a pedido). Escassez (vagas) abaixo dos cards.
// ============================================================
const EASE = [0.22, 0.61, 0.36, 1] as const;

type Ingresso = {
  badge: string;
  nome: string;
  preco: string;
  desc: string;
  inclui: string[];
  cta: string;
};

function Corner({ className }: { className: string }) {
  return (
    <span
      aria-hidden
      className={`pointer-events-none absolute z-30 h-3.5 w-3.5 border-alert/70 ${className}`}
    />
  );
}

function CardIngresso({
  ing,
  destaque,
  onCTAClick
}: {
  ing: Ingresso;
  destaque?: boolean;
  onCTAClick: () => void;
}) {
  const reduced = usePrefersReducedMotion();
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const rotateX = useSpring(useTransform(my, [0, 1], [4, -4]), { stiffness: 150, damping: 18 });
  const rotateY = useSpring(useTransform(mx, [0, 1], [-4, 4]), { stiffness: 150, damping: 18 });
  const glareX = useTransform(mx, [0, 1], ['0%', '100%']);
  const glareY = useTransform(my, [0, 1], ['0%', '100%']);
  const glareBg = useTransform(
    [glareX, glareY] as const,
    ([x, y]: string[]) =>
      `radial-gradient(380px circle at ${x} ${y}, rgba(228,201,137,0.14), transparent 60%)`
  );

  function onMove(e: ReactMouseEvent<HTMLDivElement>) {
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width);
    my.set((e.clientY - r.top) / r.height);
  }
  function onLeave() {
    mx.set(0.5);
    my.set(0.5);
  }

  const tilt = !!destaque && !reduced;

  return (
    <div style={{ perspective: tilt ? 1100 : undefined }} className="h-full">
      <motion.div
        onMouseMove={tilt ? onMove : undefined}
        onMouseLeave={tilt ? onLeave : undefined}
        style={tilt ? ({ rotateX, rotateY, transformStyle: 'preserve-3d' } as MotionStyle) : undefined}
        className="relative h-full"
      >
        <div
          className={`relative flex h-full flex-col overflow-hidden rounded-2xl p-6 md:p-8 ${
            destaque
              ? 'border-2 border-alert/50 bg-gradient-to-br from-ink-soft to-ink-deep shadow-inner-tech'
              : 'border border-white/10 bg-white/[0.03]'
          }`}
        >
          {tilt && (
            <motion.div
              aria-hidden
              className="pointer-events-none absolute inset-0 z-20 opacity-70"
              style={{ background: glareBg }}
            />
          )}
          {destaque && (
            <>
              <Corner className="left-0 top-0 border-l-2 border-t-2" />
              <Corner className="right-0 top-0 border-r-2 border-t-2" />
              <Corner className="bottom-0 left-0 border-b-2 border-l-2" />
              <Corner className="bottom-0 right-0 border-b-2 border-r-2" />
            </>
          )}

          <div className="relative z-10 flex h-full flex-col">
            <span
              className={`inline-flex w-fit items-center rounded-sm px-2 py-0.5 font-mono text-[9px] font-bold uppercase tracking-[0.2em] ${
                destaque ? 'border border-alert/50 bg-alert/[0.08] text-alert' : 'border border-white/15 text-cota'
              }`}
            >
              {ing.badge}
            </span>

            <h3 className="mt-4 text-xl font-extrabold text-paper">{ing.nome}</h3>
            <p className="mt-1 text-sm leading-snug text-paper/60">{ing.desc}</p>

            <p
              className={`mt-5 font-mono text-5xl font-black tabular-nums md:text-6xl ${
                destaque ? 'text-alert' : 'text-paper'
              }`}
            >
              {ing.preco}
            </p>

            <ul className="mt-6 flex-1 space-y-2.5">
              {ing.inclui.map((item, i) => (
                <li key={i} className="flex items-start gap-2.5 text-sm leading-relaxed text-paper/85">
                  <span aria-hidden className={`mt-0.5 shrink-0 ${destaque ? 'text-alert' : 'text-aurora-glow'}`}>
                    ▸
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <button
              type="button"
              onClick={onCTAClick}
              className={`mt-7 w-full px-7 py-4 text-base ${
                destaque
                  ? 'btn-cta'
                  : 'rounded-full border border-alert/60 font-bold text-alert transition-colors hover:bg-alert hover:text-ink'
              }`}
            >
              {ing.cta}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function Oferta({ onCTAClick }: { onCTAClick: () => void }) {
  const seats = useSeats();

  return (
    <SectionShell theme="dark" id="pricing" halo>
      {/* H2 + sub */}
      <div className="mx-auto max-w-2xl text-center">
        <MaskReveal
          as="h2"
          variant="glow"
          className="text-balance text-3xl font-black leading-tight tracking-tight md:text-4xl"
        >
          {oferta.h2Pre}
          <span className="text-alert">{oferta.h2Destaque}</span>
        </MaskReveal>
      </div>

      {/* specs comuns aos dois ingressos */}
      <div className="mx-auto mt-8 flex max-w-2xl flex-wrap items-center justify-center gap-x-6 gap-y-2 font-mono text-[11px] uppercase tracking-[0.2em] text-cota md:mt-10">
        {oferta.specs.map(([k, v]) => (
          <span key={k}>
            <span className="text-alert">{k}:</span> {v}
          </span>
        ))}
      </div>

      {/* dois ingressos */}
      <Reveal delay={0.1}>
        <div className="mx-auto mt-10 grid max-w-4xl items-stretch gap-6 md:mt-12 md:grid-cols-2">
          <CardIngresso ing={oferta.ingressos.normal} onCTAClick={onCTAClick} />
          <CardIngresso ing={oferta.ingressos.premium} destaque onCTAClick={onCTAClick} />
        </div>
      </Reveal>

      {/* escassez + pagamento */}
      <div className="mx-auto mt-8 max-w-md md:mt-10">
        <div className="mb-1.5 flex items-baseline justify-between font-mono text-[0.7rem] text-cota">
          <span>▸ Vagas preenchidas</span>
          <span>{Math.round(seats.percent)}%</span>
        </div>
        <div className="h-3.5 w-full overflow-hidden rounded-full bg-ink ring-1 ring-alert/15">
          <motion.div
            className="relative h-full overflow-hidden rounded-full bg-alert"
            initial={{ width: 0 }}
            whileInView={{ width: `${seats.percent}%` }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: EASE }}
          >
            {/* brilho percorrendo sobre o dourado */}
            <span
              aria-hidden
              className="pointer-events-none absolute inset-0 animate-shimmer"
              style={{
                background:
                  'linear-gradient(120deg, transparent 30%, rgba(255,255,255,0.55) 50%, transparent 70%)'
              }}
            />
          </motion.div>
        </div>
        <p className="mt-3 text-center font-mono text-[10px] uppercase tracking-[0.2em] text-cota">
          {oferta.pagamento}
        </p>
      </div>
    </SectionShell>
  );
}

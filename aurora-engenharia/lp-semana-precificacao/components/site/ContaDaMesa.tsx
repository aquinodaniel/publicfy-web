'use client';

import { useRef } from 'react';
import { useTransform } from 'framer-motion';
import { contaDaMesa } from '@/content/site';
import { useIsMobile } from '@/lib/hooks';
import { useScrollStep } from '@/lib/useScrollStep';
import MaskReveal from '@/components/motion/MaskReveal';
import MotionNumber from '@/components/motion/MotionNumber';
import CountUp from '@/components/motion/CountUp';
import { StaggerGroup, StaggerItem } from '@/components/motion/Reveal';

// ============================================================
// 2 · CONTA DA MESA 🌑 ⭐ — peça-estrela. A MECÂNICA, não o resultado.
// Desktop: sticky 300vh, passos revelados pelo scroll, total derivado do progresso.
// Mobile: passos empilhados, total em 1 count-up. (decisão #15, fallback §7)
// ============================================================
function brl(v: number) {
  return 'R$ ' + v.toLocaleString('pt-BR');
}

function StepLine({
  passo,
  state
}: {
  passo: (typeof contaDaMesa.passos)[number];
  state: 'idle' | 'active' | 'done';
}) {
  const isMulti = passo.efeito === 'multiplica';
  const color =
    passo.efeito === 'menos' || passo.efeito === 'resultado' || isMulti
      ? 'text-alert'
      : 'text-paper';
  return (
    <div
      className={`flex items-baseline justify-between gap-4 border-l-2 py-3 pl-4 transition-[opacity,border-color] duration-500 ${
        state === 'idle'
          ? 'border-white/10 opacity-30'
          : state === 'active'
            ? 'border-aurora-glow opacity-100'
            : 'border-white/20 opacity-70'
      }`}
    >
      <div>
        <p className="font-mono text-[0.7rem] uppercase tracking-widest text-cota">
          {passo.code} · {passo.label}
        </p>
        <p className="mt-0.5 max-w-sm text-sm text-paper/60">{passo.detalhe}</p>
      </div>
      {/* passo "× projetos" mostra o operador explícito (achado: ×12 visível) */}
      <span className={`shrink-0 font-mono text-lg font-bold tabular-nums ${color}`}>
        {isMulti ? (
          `× ${contaDaMesa.multiplicador}`
        ) : (
          <>
            {passo.efeito === 'menos' ? '− ' : ''}
            {brl(passo.valor)}
          </>
        )}
      </span>
    </div>
  );
}

function ContaDaMesaDesktop() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const { progress, activeStep } = useScrollStep(wrapRef, contaDaMesa.passos.length);
  const total = useTransform(
    progress,
    contaDaMesa.totalKeyframes.at,
    contaDaMesa.totalKeyframes.valores
  );

  return (
    <section ref={wrapRef} className="relative h-[200vh] bg-ink text-paper">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-alert/[0.06] blur-[130px]"
        />
        <div className="relative z-10 mx-auto grid w-full max-w-6xl gap-12 px-8 md:grid-cols-2 md:items-center">
          {/* esquerda: argumento */}
          <div>
            <p className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-alert">
              {contaDaMesa.eyebrow}
            </p>
            <h2 className="text-3xl font-black leading-tight tracking-tight md:text-4xl">
              {contaDaMesa.h2Pre}
              <span className="text-alert">{contaDaMesa.h2Destaque}</span>
            </h2>
            <p className="mt-5 max-w-md text-paper/70">{contaDaMesa.intro}</p>
            <p className="mt-6 font-mono text-xs text-cota">▸ {contaDaMesa.selo}</p>
          </div>

          {/* direita: a conta que soma */}
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 shadow-inner-tech backdrop-blur md:p-8">
            {/* indicador de progresso interno (achado #1: o usuário sabe que há fim próximo) */}
            <div className="mb-4 flex items-center justify-between">
              <span className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-cota">
                ▸ role para somar
              </span>
              <span className="font-mono text-[0.65rem] tabular-nums text-aurora-glow">
                {String(Math.min(activeStep + 1, contaDaMesa.passos.length)).padStart(2, '0')} /{' '}
                {String(contaDaMesa.passos.length).padStart(2, '0')}
              </span>
            </div>
            <div className="space-y-1">
              {contaDaMesa.passos.map((p, i) => (
                <StepLine
                  key={p.id}
                  passo={p}
                  state={i < activeStep ? 'done' : i === activeStep ? 'active' : 'idle'}
                />
              ))}
            </div>

            <div className="mt-6 border-t border-white/10 pt-5">
              <p className="font-mono text-[0.7rem] uppercase tracking-[0.2em] text-cota">
                ▸ {contaDaMesa.totalLabel}
              </p>
              <p className="mt-1 font-mono text-5xl font-black tabular-nums text-alert md:text-6xl">
                <MotionNumber value={total} prefix="R$ " />
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ContaDaMesaMobile() {
  const totalFinal = contaDaMesa.totalKeyframes.valores[contaDaMesa.totalKeyframes.valores.length - 1];
  return (
    <section className="relative overflow-hidden bg-ink py-20 text-paper">
      <div className="relative z-10 mx-auto w-full max-w-xl px-5">
        <p className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-alert">
          {contaDaMesa.eyebrow}
        </p>
        <MaskReveal as="h2" variant="glow" className="text-2xl font-black leading-tight">
          {contaDaMesa.h2Pre}
          <span className="text-alert">{contaDaMesa.h2Destaque}</span>
        </MaskReveal>
        <p className="mt-4 text-paper/70">{contaDaMesa.intro}</p>

        <StaggerGroup className="mt-8 space-y-1 rounded-2xl border border-white/10 bg-white/[0.03] p-5">
          {contaDaMesa.passos.map((p) => (
            <StaggerItem key={p.id}>
              <StepLine passo={p} state="done" />
            </StaggerItem>
          ))}
          <div className="mt-4 border-t border-white/10 pt-4">
            <p className="font-mono text-[0.7rem] uppercase tracking-[0.2em] text-cota">
              ▸ {contaDaMesa.totalLabel}
            </p>
            <CountUp
              to={totalFinal}
              grouped
              prefix="R$ "
              duration={1400}
              className="mt-1 block font-mono text-4xl font-black tabular-nums text-alert"
            />
          </div>
        </StaggerGroup>
        <p className="mt-5 font-mono text-xs text-cota">▸ {contaDaMesa.selo}</p>
      </div>
    </section>
  );
}

export default function ContaDaMesa() {
  const isMobile = useIsMobile();
  return isMobile ? <ContaDaMesaMobile /> : <ContaDaMesaDesktop />;
}

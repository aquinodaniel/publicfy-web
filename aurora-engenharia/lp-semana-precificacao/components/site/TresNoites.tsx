'use client';

import { useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { noites, type Aula } from '@/content/site';
import { useIsMobile } from '@/lib/hooks';
import { useScrollStep } from '@/lib/useScrollStep';
import SectionShell from '@/components/shared/SectionShell';
import MaskReveal from '@/components/motion/MaskReveal';
import Reveal from '@/components/motion/Reveal';
import DrawLine from '@/components/motion/DrawLine';

// ============================================================
// 4 · AS 3 NOITES ☀️ — protagonista: timeline das 3 aulas.
// Desktop: scrollytelling sticky (h-250vh) — trilho vertical emerald que se
//   preenche por progress (DrawLine), nó do passo ativo brilha, card ativo em foco.
// Mobile: lista linear dos 3 cards (Reveal), CTA no fim.
// emerald = dinheiro voltando (trilho). aurora = CTA. alert = selo entregável.
// ============================================================
const EASE = [0.22, 0.61, 0.36, 1] as const;
const AULAS = noites.aulas;

// ---------- Cabeçalho compartilhado ----------
function Header({ as = 'h2' }: { as?: 'h2' }) {
  return (
    <>
      <h2 className="max-w-3xl text-3xl font-black leading-tight tracking-tight text-ink md:text-4xl">
        {noites.h2Pre}
        <span className="text-aurora">{noites.h2Destaque}</span>
      </h2>
      <p className="mt-4 max-w-2xl text-ink/60">{noites.sub}</p>
      <p className="mt-5 font-mono text-[0.78rem] tracking-wide text-cota">
        {noites.miniResumo}
      </p>
    </>
  );
}

// ---------- Bloco "Você sai com" (entregável) ----------
function Entregavel({ aula, active = true }: { aula: Aula; active?: boolean }) {
  return (
    <motion.div
      animate={active ? { scale: [1.03, 1] } : { scale: 1 }}
      transition={{ duration: 0.45, ease: EASE }}
      className="mt-6 border border-l-[3px] border-emerald/40 bg-emerald/[0.06] px-5 py-4"
    >
      <span className="font-mono text-[0.7rem] font-bold uppercase tracking-[0.25em] text-emerald">
        ▸ entregável
      </span>
      <p className="mt-2 text-sm leading-relaxed text-ink/80">
        <strong className="text-ink">Você sai com:</strong> {aula.entregavel}
      </p>
    </motion.div>
  );
}

// ---------- Header de card (code/tag/weekday em mono) ----------
function CardMeta({ aula }: { aula: Aula }) {
  return (
    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[0.7rem] uppercase tracking-[0.2em] text-cota">
      <span className="font-bold text-aurora">{aula.code}</span>
      <span>·</span>
      <span>{aula.tag}</span>
      <span>·</span>
      <span>{aula.weekday} · {aula.data} · 19h30</span>
    </div>
  );
}

// ============================================================
// DESKTOP — scrollytelling sticky
// ============================================================
function TresNoitesDesktop() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const { progress, activeStep } = useScrollStep(wrapRef, AULAS.length);

  return (
    <section ref={wrapRef} id="noites" className="relative h-[250vh] bg-paper text-ink">
      {/* grid técnico de fundo (igual ao SectionShell light) */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-cross-light bg-[length:64px_64px] opacity-70"
      />
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <div className="relative z-10 mx-auto w-full max-w-6xl px-8">
          <Header />

          <div className="mt-10 grid grid-cols-[auto_minmax(0,1fr)] gap-10 md:gap-14">
            {/* TRILHO vertical com 3 nós — preenche por progress */}
            <div className="relative flex w-28 shrink-0 flex-col justify-between py-2">
              {/* base do trilho */}
              <div
                aria-hidden
                className="absolute left-[10px] top-2 bottom-2 w-px bg-ink/15"
              />
              {/* preenchimento emerald (dinheiro voltando), amarrado ao scroll */}
              <DrawLine
                d="M5 0 L5 100"
                viewBox="0 0 10 100"
                stroke="#10b981"
                strokeWidth={2}
                trigger="progress"
                progress={progress}
                className="pointer-events-none absolute left-[6px] top-2 bottom-2 h-[calc(100%-1rem)] w-2 overflow-visible"
                preserveAspectRatio="none"
              />

              {AULAS.map((a, i) => {
                const state = i === activeStep ? 'active' : i < activeStep ? 'done' : 'idle';
                return (
                  <div key={a.id} className="relative flex items-center gap-3 py-3">
                    {/* nó */}
                    <span className="relative flex h-5 w-5 items-center justify-center">
                      {state === 'active' && (
                        <motion.span
                          aria-hidden
                          className="absolute inset-0 rounded-full"
                          initial={{ boxShadow: '0 0 0 0 rgba(16,185,129,0.4)' }}
                          animate={{ boxShadow: ['0 0 0 0 rgba(16,185,129,0.4)', '0 0 0 9px rgba(16,185,129,0)'] }}
                          transition={{ duration: 1.2, ease: 'easeOut' }}
                        />
                      )}
                      <span
                        className={`relative h-3 w-3 rounded-full border-2 bg-paper transition-colors duration-500 ${
                          state === 'idle' ? 'border-ink/25' : 'border-emerald'
                        }`}
                      >
                        <span
                          className={`absolute inset-[2px] rounded-full transition-colors duration-500 ${
                            state === 'active'
                              ? 'bg-emerald shadow-[0_0_10px_rgba(16,185,129,0.7)]'
                              : state === 'done'
                                ? 'bg-emerald/60'
                                : 'bg-transparent'
                          }`}
                        />
                      </span>
                    </span>
                    <span
                      className={`font-mono text-[0.7rem] font-bold uppercase tracking-[0.2em] transition-colors duration-500 ${
                        state === 'active'
                          ? 'text-emerald'
                          : state === 'done'
                            ? 'text-emerald/70'
                            : 'text-cota/60'
                      }`}
                    >
                      {a.code}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* PALCO — cards empilhados; o ativo em foco, os outros recuam */}
            <div className="relative">
              {AULAS.map((a, i) => {
                const isActive = i === activeStep;
                return (
                  <motion.article
                    key={a.id}
                    aria-hidden={!isActive}
                    animate={{
                      opacity: isActive ? 1 : 0.55,
                      scale: isActive ? 1 : 0.985,
                      filter: isActive ? 'blur(0px)' : 'blur(0.4px)'
                    }}
                    transition={{ duration: 0.6, ease: EASE }}
                    className={`border bg-white px-7 py-7 transition-colors duration-500 md:px-9 md:py-8 ${
                      isActive
                        ? 'border-aurora/30 shadow-[0_28px_56px_-22px_rgba(0,101,123,.30)]'
                        : 'border-ink/10'
                    } ${i > 0 ? 'mt-5' : ''}`}
                  >
                    <CardMeta aula={a} />
                    <h3 className="mt-3 text-2xl font-bold leading-tight text-ink md:text-3xl">
                      {a.title}
                    </h3>
                    {/* corpo expande/colapsa suave (sem salto de altura na troca) */}
                    <AnimatePresence initial={false}>
                      {isActive && (
                        <motion.div
                          key="body"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.5, ease: EASE }}
                          className="overflow-hidden"
                        >
                          <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-ink/65">
                            {a.description}
                          </p>
                          <Entregavel aula={a} active={isActive} />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.article>
                );
              })}

              <p className="mt-6 font-mono text-[0.7rem] uppercase tracking-[0.2em] text-cota">
                ▸ {noites.hint}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================================
// MOBILE — lista linear simples
// ============================================================
function TresNoitesMobile({ onCTAClick }: { onCTAClick: () => void }) {
  return (
    <SectionShell theme="light" id="noites">
      <MaskReveal variant="glow">
        <Header />
      </MaskReveal>

      <div className="mt-10 space-y-6">
        {AULAS.map((aula) => (
          <Reveal key={aula.id} as="article">
            <div className="relative overflow-hidden border border-aurora/25 bg-white px-5 py-6 shadow-[0_12px_26px_-16px_rgba(0,101,123,.22)]">
              <span
                aria-hidden
                className="pointer-events-none absolute inset-y-0 left-0 w-1 bg-emerald/70"
              />
              <CardMeta aula={aula} />
              <h3 className="mt-3 text-xl font-bold leading-tight text-ink">{aula.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-ink/65">{aula.description}</p>
              <Entregavel aula={aula} active={false} />
            </div>
          </Reveal>
        ))}
      </div>

      <div className="mt-10 flex flex-col items-stretch gap-3">
        <button
          onClick={onCTAClick}
          className="btn-cta w-full px-7 py-3.5 text-base"
        >
          {noites.ctaMobile}
        </button>
      </div>
    </SectionShell>
  );
}

export default function TresNoites({ onCTAClick }: { onCTAClick: () => void }) {
  const isMobile = useIsMobile();
  return isMobile ? (
    <TresNoitesMobile onCTAClick={onCTAClick} />
  ) : (
    <TresNoitesDesktop />
  );
}

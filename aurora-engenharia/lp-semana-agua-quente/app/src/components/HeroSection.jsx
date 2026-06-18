import { motion, AnimatePresence } from 'framer-motion';
import { lazy, Suspense } from 'react';
import Reveal from './Reveal';
import TimeAuroraBadge from './TimeAuroraBadge';
import { useSeats } from '../hooks/useSeats';
import { useCountdown, EVENT_START_ISO } from '../hooks/useCountdown';

const HouseHydraulicScene = lazy(() => import('./HouseHydraulicScene'));

function NextLoteLine() {
  return (
    <div className="flex flex-wrap items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-white/55 md:text-[11px]">
      <span aria-hidden className="h-px w-4 bg-white/30" />
      <span>Próximo lote</span>
      <span className="font-bold text-white">R$ 47</span>
      <span className="font-semibold text-gold-gradient">(+74%)</span>
    </div>
  );
}

// TimerCard — overlay técnico mínimo: 4 quadrados independentes + alerta tipográfico
function TimerCard() {
  const { percent } = useSeats();
  const { days, hoursStr, minutesStr, secondsStr, ended } = useCountdown(EVENT_START_ISO);
  const filled = Math.round(percent);

  if (ended) {
    return (
      <div className="text-center font-mono text-sm font-bold uppercase tracking-[0.3em] text-aurora-glow">
        Evento em andamento
      </div>
    );
  }

  return (
    <div className="space-y-3.5 md:space-y-4">
      {/* 4 quadrados horizontais independentes */}
      <div className="flex items-stretch justify-between gap-2 md:gap-3">
        <DigitSquare value={String(days).padStart(2, '0')} unit="D" />
        <DigitSquare value={hoursStr} unit="H" />
        <DigitSquare value={minutesStr} unit="M" />
        <DigitSquare value={secondsStr} unit="S" />
      </div>

      {/* Alerta tipográfico puro — sem caixa, sem ícone */}
      <div className="text-center font-mono text-[11px] font-bold uppercase tracking-[0.3em] text-white/60 md:text-xs md:tracking-[0.35em]">
        <motion.span
          key={filled}
          initial={{ scale: 1.3 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.45, ease: 'easeOut' }}
          className="inline-block text-base font-extrabold text-gold-gradient md:text-lg"
          style={{
            textShadow: '0 0 8px rgba(219,190,124,0.45), 0 0 4px rgba(219,190,124,0.3)',
            letterSpacing: '0.02em'
          }}
        >
          {filled}%
        </motion.span>
        {' '}das vagas já preenchidas
      </div>
    </div>
  );
}

// Quadrado individual — glassmorphism + border técnica + número grande + sigla no canto
function DigitSquare({ value, unit }) {
  return (
    <div
      className="relative flex flex-1 items-center justify-center border border-aurora-glow/30 px-3 py-3 md:py-4"
      style={{
        background: 'rgba(0,17,21,0.55)',
        backdropFilter: 'blur(6px)',
        WebkitBackdropFilter: 'blur(6px)'
      }}
    >
      {/* Sigla discreta no canto superior direito */}
      <span
        aria-hidden
        className="absolute right-1.5 top-1 font-mono text-[8px] font-bold tracking-[0.05em] text-aurora-glow/65 md:right-2 md:top-1.5 md:text-[9px]"
      >
        {unit}
      </span>

      {/* Número grande monoespaçado */}
      <AnimatePresence mode="popLayout">
        <motion.span
          key={value}
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 4 }}
          transition={{ duration: 0.22, ease: [0.22, 0.61, 0.36, 1] }}
          className="block tabular text-center font-mono font-extrabold text-aurora-glow"
          style={{
            fontSize: 'clamp(1.6rem, 3.4vw, 2.1rem)',
            letterSpacing: '-0.02em',
            lineHeight: 1
          }}
        >
          {value}
        </motion.span>
      </AnimatePresence>
    </div>
  );
}

export default function HeroSection({ onCTAClick }) {
  return (
    <section id="hero" className="relative overflow-hidden bg-ink-deep text-white">
      {/* Grade técnica blueprint */}
      <div aria-hidden className="pointer-events-none absolute inset-0 blueprint-bg" />

      {/* Halos atmosféricos (mesma assinatura da seção de decisão) */}
      <div aria-hidden className="pointer-events-none absolute -left-24 top-1/4 hidden h-[500px] w-[500px] rounded-full bg-aurora/15 blur-3xl md:block" />
      <div aria-hidden className="pointer-events-none absolute -right-32 bottom-0 hidden h-[500px] w-[500px] rounded-full bg-aurora-glow/10 blur-3xl md:block" />

      {/* Background — fade lateral discreto sobre o grid */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="absolute inset-y-0 left-0 hidden w-[120px] md:block lg:w-[180px]"
          style={{
            background: 'linear-gradient(to right, rgba(0,10,14,1) 0%, rgba(0,10,14,0.7) 45%, rgba(0,10,14,0) 100%)'
          }}
        />
        <div
          className="absolute inset-y-0 right-0 hidden w-[120px] md:block lg:w-[180px]"
          style={{
            background: 'linear-gradient(to left, rgba(0,10,14,1) 0%, rgba(0,10,14,0.7) 45%, rgba(0,10,14,0) 100%)'
          }}
        />
      </div>

      <div className="container-x relative pt-20 pb-12 md:pt-36 md:pb-28">
        {/* Grid principal */}
        <div className="mt-7 grid items-start gap-8 md:mt-16 md:grid-cols-12 md:items-center md:gap-[58px]">
          {/* === CONTEÚDO === */}
          <div className="md:col-span-7">
            <Reveal delay={0.1}>
              <h1 className="font-extrabold leading-[1.05] tracking-[-0.025em] text-white text-[1.7rem] sm:text-[2.1rem] md:text-[clamp(2.4rem,4.5vw,3.8rem)]">
                Como projetar a hidráulica de{' '}
                <span className="text-aurora-glow">água quente</span>{' '}
                de uma{' '}
                <span className="relative inline-block whitespace-nowrap">
                  <span className="relative z-10">casa de alto padrão</span>
                  <motion.span
                    aria-hidden
                    className="absolute inset-x-0 bottom-0.5 -z-0 h-1.5 bg-aurora-glow/30 sm:bottom-1 sm:h-2 md:bottom-2 md:h-[12px]"
                    initial={{ scaleX: 0, originX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.7, ease: 'easeOut', delay: 0.9 }}
                  />
                </span>.
              </h1>
              {/* Kicker complementar — separado tipograficamente do H1 */}
              <div className="mt-4 flex items-center gap-3 font-mono text-[10px] font-semibold uppercase tracking-[0.3em] text-aurora-glow/85 md:mt-5 md:text-[11px] md:tracking-[0.35em]">
                <span aria-hidden className="h-px w-6 bg-aurora-glow/40 md:w-8" />
                <span>passo a passo</span>
                <span aria-hidden className="h-1 w-1 rounded-full bg-aurora-glow/40" />
                <span>ao vivo</span>
              </div>
            </Reveal>

            <Reveal delay={0.25}>
              <p className="mt-5 text-[15px] leading-relaxed text-white/65 sm:text-base md:mt-7 md:max-w-xl md:text-xl">
                Em <strong className="text-white">3 dias</strong>, eu desenvolvo com você o projeto
                hidráulico de água quente de uma casa de alto padrão real,
                <strong className="text-white"> do briefing à entrega</strong>.
              </p>
            </Reveal>

            <Reveal delay={0.35}>
              <div className="mt-6 flex flex-col items-stretch gap-4 md:mt-8">
                {/* CTA + selo Alunos Aurora lado a lado */}
                <div className="flex flex-col items-stretch gap-3 lg:flex-row lg:items-center lg:gap-4">
                  <button
                    onClick={onCTAClick}
                    className="btn-primary group w-full whitespace-nowrap !gap-2 !px-6 !py-3 !text-sm sm:!h-[60px] sm:!w-[264px] sm:!px-0 sm:!py-0 lg:flex-shrink-0"
                  >
                    <span>Entrar no primeiro lote</span>
                    <span
                      aria-hidden
                      className="text-base transition-transform duration-200 group-hover:translate-x-1"
                    >
                      →
                    </span>
                  </button>
                  <TimeAuroraBadge
                    variant="compact"
                    tone="dark"
                    className="w-full min-w-0 lg:flex-1 lg:max-w-[340px]"
                  />
                </div>

                {/* Linha de progressão de lote — sutil */}
                <NextLoteLine />
              </div>
            </Reveal>
          </div>

          {/* === MAQUETE 3D INTERATIVA — flutuante na página, sem moldura === */}
          <Reveal delay={0.5} className="md:col-span-5">
            <div className="relative">
              {/* Halo de iluminação sutil atrás da maquete (sensação de profundidade, sem moldura) */}
              <div
                aria-hidden
                className="pointer-events-none absolute left-1/2 top-1/2 -z-10 hidden h-[120%] w-[120%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-aurora-glow/[0.06] blur-3xl md:block"
              />

              {/* Maquete — escopo fixo 552 × 650 px (md+) */}
              <div className="relative mx-auto h-[460px] sm:h-[560px] md:h-[650px] md:w-[552px] md:max-w-none md:[transform:translateZ(0)]">
                <Suspense
                  fallback={
                    <div className="flex h-full w-full items-center justify-center">
                      <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/50">
                        ▸ carregando maquete…
                      </div>
                    </div>
                  }
                >
                  <HouseHydraulicScene />
                </Suspense>
              </div>

              {/* TimerCard — countdown + vagas (centralizado sob o escopo da maquete) */}
              <div className="mt-4 md:mt-5 md:mx-auto md:w-[552px]">
                <TimerCard />
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

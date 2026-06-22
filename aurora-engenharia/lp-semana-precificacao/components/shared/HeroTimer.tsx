'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { config, hero } from '@/content/site';
import { useCountdown, useSeats } from '@/lib/hooks';

// ============================================================
// HeroTimer — contador regressivo até o início do evento (Lote 1 encerra).
// Réplica do TimerCard da Semana da Água Quente: 4 quadrados independentes
// (D/H/M/S) com glassmorphism + linha "X% das vagas já preenchidas".
// Cores adaptadas à Precificação: dígitos em teal (aurora-glow), % em dourado.
// ============================================================

const EASE = [0.22, 0.61, 0.36, 1] as const;

// Quadrado individual — glassmorphism + borda técnica + número mono + sigla no canto.
function DigitSquare({ value, unit }: { value: string; unit: string }) {
  return (
    <div
      className="relative flex flex-1 items-center justify-center border border-aurora-glow/30 px-3 py-3 md:py-4"
      style={{
        background: 'rgba(0,17,21,0.55)',
        backdropFilter: 'blur(6px)',
        WebkitBackdropFilter: 'blur(6px)'
      }}
    >
      {/* sigla discreta no canto superior direito */}
      <span
        aria-hidden
        className="absolute right-1.5 top-1 font-mono text-[8px] font-bold tracking-[0.05em] text-aurora-glow/65 md:right-2 md:top-1.5 md:text-[9px]"
      >
        {unit}
      </span>

      {/* número grande monoespaçado, troca animada */}
      <AnimatePresence mode="popLayout">
        <motion.span
          key={value}
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 4 }}
          transition={{ duration: 0.22, ease: EASE }}
          className="tabular block text-center font-mono font-extrabold text-aurora-glow"
          style={{ fontSize: 'clamp(1.6rem, 3.4vw, 2.1rem)', letterSpacing: '-0.02em', lineHeight: 1 }}
        >
          {value}
        </motion.span>
      </AnimatePresence>
    </div>
  );
}

export default function HeroTimer({ className = '' }: { className?: string }) {
  const { percent } = useSeats();
  const { days, hoursStr, minutesStr, secondsStr, ended } = useCountdown(config.eventoStartISO);
  const filled = Math.round(percent);

  if (ended) {
    return (
      <div className={`text-center font-mono text-sm font-bold uppercase tracking-[0.3em] text-alert ${className}`}>
        {hero.timer.encerrado}
      </div>
    );
  }

  return (
    <div className={`space-y-3.5 md:space-y-4 ${className}`}>
      {/* rótulo do contador */}
      <div className="text-center font-mono text-[10px] font-bold uppercase tracking-[0.28em] text-aurora-glow/85 md:text-[11px] md:tracking-[0.3em]">
        ▸ {hero.timer.label}
      </div>

      {/* 4 quadrados horizontais independentes */}
      <div className="flex items-stretch justify-between gap-2 md:gap-3">
        <DigitSquare value={String(days).padStart(2, '0')} unit="D" />
        <DigitSquare value={hoursStr} unit="H" />
        <DigitSquare value={minutesStr} unit="M" />
        <DigitSquare value={secondsStr} unit="S" />
      </div>

      {/* alerta tipográfico — % de vagas preenchidas */}
      <div className="text-center font-mono text-[11px] font-bold uppercase tracking-[0.3em] text-white/60 md:text-xs md:tracking-[0.35em]">
        <motion.span
          key={filled}
          initial={{ scale: 1.3 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.45, ease: 'easeOut' }}
          className="text-gold-gradient inline-block text-base font-extrabold md:text-lg"
          style={{
            textShadow: '0 0 8px rgba(219,190,124,0.45), 0 0 4px rgba(219,190,124,0.3)',
            letterSpacing: '0.02em'
          }}
        >
          {filled}%
        </motion.span>{' '}
        {hero.timer.vagasSuffix}
      </div>
    </div>
  );
}

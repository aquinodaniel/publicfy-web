'use client';

import { motion, type MotionValue } from 'framer-motion';
import { usePrefersReducedMotion } from '@/lib/hooks';

// ============================================================
// DrawLine — path SVG que se desenha. Usa `pathLength` (Framer normaliza 0..1),
// mais confiável que clip-path (que não assenta em alguns engines).
//  - trigger="inview"   → desenha 1x ao entrar (whileInView)
//  - trigger="progress" → pathLength amarrado a um MotionValue (scroll-driven)
// reduced-motion: renderiza o path completo, estático.
// ============================================================
const EASE = [0.22, 0.61, 0.36, 1] as const;

type Props = {
  d: string;
  viewBox?: string;
  stroke?: string;
  strokeWidth?: number;
  duration?: number;
  delay?: number;
  trigger?: 'inview' | 'progress';
  progress?: MotionValue<number>;
  className?: string;
  preserveAspectRatio?: string;
};

export default function DrawLine({
  d,
  viewBox = '0 0 100 100',
  stroke = 'currentColor',
  strokeWidth = 2,
  duration = 1,
  delay = 0,
  trigger = 'inview',
  progress,
  className = '',
  preserveAspectRatio = 'none'
}: Props) {
  const reduced = usePrefersReducedMotion();
  const base = {
    d,
    fill: 'none',
    stroke,
    strokeWidth,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const
  };

  return (
    <svg viewBox={viewBox} className={className} preserveAspectRatio={preserveAspectRatio} aria-hidden>
      {reduced ? (
        <path {...base} />
      ) : trigger === 'progress' && progress ? (
        <motion.path {...base} style={{ pathLength: progress }} />
      ) : (
        <motion.path
          {...base}
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration, delay, ease: EASE }}
        />
      )}
    </svg>
  );
}

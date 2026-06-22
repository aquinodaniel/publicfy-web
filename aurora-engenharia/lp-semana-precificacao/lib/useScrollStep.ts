'use client';

import { useState, type RefObject } from 'react';
import { useScroll, useMotionValueEvent, type MotionValue } from 'framer-motion';

// ============================================================
// useScrollStep — deriva o passo ativo (0..steps-1) do progresso de scroll
// de um elemento sticky. Usa useState + useMotionValueEvent para RE-RENDERIZAR
// de verdade (useTransform devolveria um MotionValue, que não troca classes).
// Expõe também `progress` (MotionValue) p/ MotionNumber e DrawLine no modo progress.
// ============================================================
export function useScrollStep(
  target: RefObject<HTMLElement>,
  steps: number
): { progress: MotionValue<number>; activeStep: number } {
  const { scrollYProgress } = useScroll({
    target,
    offset: ['start start', 'end end']
  });
  const [activeStep, setActiveStep] = useState(0);

  useMotionValueEvent(scrollYProgress, 'change', (p) => {
    // round(p*(steps-1)) alinha o passo ativo aos nós do trilho (distribuídos em
    // 0%..100% por justify-between): o card troca quando o preenchimento da linha
    // chega no nó, e não 1/3 antes — mantém scroll e destaque sincronizados.
    const s = Math.min(steps - 1, Math.max(0, Math.round(p * (steps - 1))));
    setActiveStep((prev) => (prev === s ? prev : s));
  });

  return { progress: scrollYProgress, activeStep };
}

'use client';

import { useState } from 'react';
import { useMotionValueEvent, type MotionValue } from 'framer-motion';

// ============================================================
// MotionNumber — exibe um número DIRIGIDO por um MotionValue (scroll-driven).
// Diferente do CountUp (rAF + inView, once): aqui o valor segue o scroll.
// NUNCA passar MotionValue pro CountUp — são paradigmas distintos (decisão D #4).
// Formata pt-BR (milhar com ponto).
// ============================================================
function format(v: number, decimals: number) {
  return v.toLocaleString('pt-BR', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals
  });
}

type Props = {
  value: MotionValue<number>;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  className?: string;
};

export default function MotionNumber({
  value,
  prefix = '',
  suffix = '',
  decimals = 0,
  className = ''
}: Props) {
  const [display, setDisplay] = useState(() => format(value.get(), decimals));
  useMotionValueEvent(value, 'change', (v) => setDisplay(format(v, decimals)));
  return (
    <span className={className}>
      {prefix}
      {display}
      {suffix}
    </span>
  );
}

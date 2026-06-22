'use client';

import { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';
import { usePrefersReducedMotion } from '@/lib/hooks';

// ============================================================
// CountUp — motivo recorrente da marca: número que sobe com lastro.
// IntersectionObserver (via useInView) + rAF. Dispara UMA vez.
// Respeita prefers-reduced-motion: mostra o valor final imediatamente.
// Formata pt-BR (milhar com ponto, decimal com vírgula).
// ============================================================
type CountUpProps = {
  to: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  duration?: number;
  /** formata com separador de milhar pt-BR (ex.: 12.000) */
  grouped?: boolean;
  className?: string;
};

function format(val: number, decimals: number, grouped: boolean) {
  if (grouped) {
    return val.toLocaleString('pt-BR', {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals
    });
  }
  return decimals > 0 ? val.toFixed(decimals).replace('.', ',') : Math.round(val).toString();
}

export default function CountUp({
  to,
  prefix = '',
  suffix = '',
  decimals = 0,
  duration = 900,
  grouped = false,
  className = ''
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const reduced = usePrefersReducedMotion();
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (reduced) {
      setVal(to);
      return;
    }
    const start = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(eased * to);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to, reduced, duration]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {format(val, decimals, grouped)}
      {suffix}
    </span>
  );
}

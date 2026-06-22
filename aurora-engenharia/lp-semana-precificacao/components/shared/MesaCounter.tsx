'use client';

import { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';
import { usePrefersReducedMotion } from '@/lib/hooks';

// ============================================================
// MesaCounter — o protagonista do Hero (e eco no Footer).
//  variant="hero" → conta no mount, ao terminar TRAVA e mostra o selo (resolvido).
//  variant="eco"  → conta no inView, e FICA sem selo (a perda "continua" enquanto
//                   o usuário não decide). NUNCA loop infinito (decisão D #6).
// reduced-motion: valor final imediato.
// ============================================================
function brl(v: number) {
  return 'R$ ' + Math.round(v).toLocaleString('pt-BR');
}

type Props = {
  to: number;
  label: string;
  variant: 'hero' | 'eco';
  ilustrativo?: string;
  selo?: string;
  /** atraso (ms) antes de começar a contar — no hero, deixa o número ser o clímax do mount */
  startDelay?: number;
  className?: string;
};

export default function MesaCounter({
  to,
  label,
  variant,
  ilustrativo,
  selo,
  startDelay = 0,
  className = ''
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const reduced = usePrefersReducedMotion();
  const [val, setVal] = useState(0);
  const [done, setDone] = useState(false);

  const active = variant === 'hero' ? true : inView;
  const duration = variant === 'hero' ? 1600 : 2600;

  useEffect(() => {
    if (!active) return;
    if (reduced) {
      setVal(to);
      setDone(true);
      return;
    }
    let raf = 0;
    let startTs = 0;
    const tick = (t: number) => {
      if (!startTs) startTs = t;
      const p = Math.min(1, (t - startTs) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(eased * to);
      if (p < 1) raf = requestAnimationFrame(tick);
      else setDone(true);
    };
    const timer = setTimeout(() => {
      raf = requestAnimationFrame(tick);
    }, startDelay);
    return () => {
      clearTimeout(timer);
      cancelAnimationFrame(raf);
    };
  }, [active, to, reduced, duration, startDelay]);

  // selo só no hero (eco não trava)
  const showSelo = variant === 'hero' && done && !!selo;

  return (
    <div ref={ref} className={className}>
      <p className="font-mono text-[0.7rem] uppercase tracking-[0.2em] text-cota">▸ {label}</p>
      <p className="mt-1 font-mono text-5xl font-black tabular-nums text-alert md:text-6xl">
        {brl(val)}
      </p>
      {ilustrativo && <p className="mt-1 text-xs text-cota">{ilustrativo}</p>}
      {showSelo && (
        <span className="mt-3 inline-block animate-stamp-in rounded-full border border-aurora/40 bg-aurora/10 px-3 py-1 font-mono text-xs text-aurora-glow">
          ▸ {selo}
        </span>
      )}
    </div>
  );
}

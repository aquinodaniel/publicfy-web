'use client';

import { motion } from 'framer-motion';
import { usePrefersReducedMotion } from '@/lib/hooks';

// ============================================================
// AnchorBars — ancoragem em barras: desconto reflexo (grande, dourado) ×
// ingresso (mínimo, aurora). A desproporção É o argumento.
// ============================================================
const EASE = [0.22, 0.61, 0.36, 1] as const;

function brl(v: number) {
  return 'R$ ' + v.toLocaleString('pt-BR');
}

type Props = {
  descontoLabel: string;
  descontoValor: number;
  precoLabel: string;
  precoValor: number;
  nota?: string;
};

export default function AnchorBars({
  descontoLabel,
  descontoValor,
  precoLabel,
  precoValor,
  nota
}: Props) {
  const reduced = usePrefersReducedMotion();
  const precoPct = Math.max(4, (precoValor / descontoValor) * 100); // mínimo visível

  return (
    <div className="space-y-6">
      <div>
        <div className="mb-2 flex items-baseline justify-between gap-4 text-sm">
          <span className="text-cota">{descontoLabel}</span>
          <span className="shrink-0 font-mono font-bold text-alert">{brl(descontoValor)}</span>
        </div>
        <motion.div
          initial={reduced ? false : { width: '0%' }}
          whileInView={{ width: '100%' }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.9, ease: EASE }}
          className="h-4 rounded-full bg-alert/80"
        />
      </div>
      <div>
        <div className="mb-2 flex items-baseline justify-between gap-4 text-sm">
          <span className="text-cota">{precoLabel}</span>
          <span className="shrink-0 font-mono font-bold text-aurora-glow">{brl(precoValor)}</span>
        </div>
        <motion.div
          initial={reduced ? false : { width: '0%' }}
          whileInView={{ width: `${precoPct}%` }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.9, ease: EASE, delay: 0.15 }}
          className="h-4 rounded-full bg-aurora"
        />
      </div>
      {nota && <p className="text-xs text-cota">▸ {nota}</p>}
    </div>
  );
}

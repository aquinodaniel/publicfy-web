import { motion } from 'framer-motion';
import { useSeats } from '../hooks/useSeats';

export function SeatsInline() {
  const { percent } = useSeats();
  const filled = Math.round(percent);
  return (
    <span className="tabular font-mono text-xs font-bold text-ink sm:text-sm">
      <span className="text-aurora">{filled}%</span> das vagas já preenchidas
    </span>
  );
}

export function SeatsBlock({ label = 'Vagas no 1º lote', footnote }) {
  const { percent, sold } = useSeats();
  const filled = Math.round(percent);
  return (
    <div className="text-center">
      <div className="font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-aurora-glow md:text-[11px] md:tracking-[0.3em]">
        {label}
      </div>

      <div className="mt-3 flex items-end justify-center gap-2">
        <span className="tabular text-5xl font-black leading-none text-white sm:text-6xl md:text-7xl">
          {filled}
        </span>
        <span className="tabular pb-1 text-3xl font-black leading-none text-aurora-glow sm:text-4xl md:pb-2 md:text-5xl">
          %
        </span>
        <div className="flex flex-col items-start pb-1.5 pl-2 text-left">
          <span className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-aurora-glow md:tracking-[0.25em]">
            preenchidas
          </span>
          <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/45">
            antes do preço subir
          </span>
        </div>
      </div>

      <div className="mx-auto mt-5 max-w-[280px]">
        <div className="relative h-1.5 overflow-hidden bg-white/10">
          <motion.div
            key={sold}
            initial={{ width: 0 }}
            animate={{ width: `${percent}%` }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="h-full bg-gradient-to-r from-aurora to-aurora-glow"
          />
        </div>
        <div className="mt-1.5 flex justify-between font-mono text-[9px] uppercase tracking-[0.2em] text-white/40">
          <span>turma única</span>
          <span>preço sobe ao zerar</span>
        </div>
      </div>

      {footnote && (
        <div className="mt-3 font-mono text-[9px] uppercase tracking-[0.2em] text-white/40 md:text-[10px] md:tracking-[0.25em]">
          {footnote}
        </div>
      )}
    </div>
  );
}

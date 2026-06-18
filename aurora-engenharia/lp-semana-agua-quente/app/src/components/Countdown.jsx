import { useCountdown } from '../hooks/useCountdown';

export default function Countdown({ variant = 'pill', label = 'Lote 1 acaba em', endsAtISO }) {
  const { hours, minutes, seconds } = useCountdown(endsAtISO);

  if (variant === 'inline') {
    return (
      <span className="tabular font-mono text-xs font-bold text-ink sm:text-sm">
        {hours}h {minutes}m {seconds}s
      </span>
    );
  }

  return (
    <div className="inline-flex items-center gap-3 border border-ink/15 bg-white px-4 py-2 font-mono text-xs">
      <span className="cota">{label}</span>
      <span className="tabular font-bold text-ink">
        {hours}<span className="text-cota">h</span> {minutes}<span className="text-cota">m</span> {seconds}<span className="text-cota">s</span>
      </span>
    </div>
  );
}

export function CountdownDark({ label = 'Lote 1 termina em', endsAtISO, footnote }) {
  const { hours, minutes, seconds } = useCountdown(endsAtISO);
  return (
    <div className="text-center">
      <div className="font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-aurora-glow md:text-[11px] md:tracking-[0.3em]">
        {label}
      </div>
      <div className="tabular mt-3 flex items-baseline justify-center gap-1.5 sm:gap-2">
        <TimeBlock value={hours} unit="h" />
        <span className="text-xl font-bold text-white/30 sm:text-2xl">:</span>
        <TimeBlock value={minutes} unit="m" />
        <span className="text-xl font-bold text-white/30 sm:text-2xl">:</span>
        <TimeBlock value={seconds} unit="s" />
      </div>
      {footnote && (
        <div className="mt-3 font-mono text-[9px] uppercase tracking-[0.2em] text-white/40 md:text-[10px] md:tracking-[0.25em]">
          {footnote}
        </div>
      )}
    </div>
  );
}

function TimeBlock({ value, unit }) {
  return (
    <div className="flex flex-col items-center">
      <span className="border border-aurora-glow/30 bg-ink-soft px-2.5 py-1.5 text-xl font-extrabold text-white sm:px-3 sm:py-2 sm:text-2xl md:text-4xl">
        {value}
      </span>
      <span className="mt-1 font-mono text-[8px] uppercase tracking-[0.2em] text-cota sm:text-[9px] sm:tracking-[0.25em]">
        {unit}
      </span>
    </div>
  );
}

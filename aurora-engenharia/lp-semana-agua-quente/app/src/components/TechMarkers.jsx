// Marcadores técnicos decorativos (cotas, dimensões, IDs)
// Usar pra dar identidade de prancheta sem competir com conteúdo.

export function Cota({ children, className = '' }) {
  return (
    <span className={`dimension ${className}`}>
      <span className="px-2 whitespace-nowrap">{children}</span>
    </span>
  );
}

export function Tag({ children, tone = 'aurora', className = '' }) {
  const map = {
    aurora: 'border-aurora/40 text-aurora bg-aurora/[0.04]',
    alert: 'border-alert/50 text-gold-gradient bg-alert/[0.06]',
    ink: 'border-ink/30 text-ink bg-ink/[0.03]',
    white: 'border-white/30 text-white bg-white/[0.05]'
  };
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-sm border px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-[0.2em] ${map[tone]} ${className}`}>
      {children}
    </span>
  );
}

export function SectionId({ index, total, label, className = '' }) {
  const idx = String(index).padStart(2, '0');
  const tot = String(total).padStart(2, '0');
  return (
    <div className={`section-number flex items-center gap-3 ${className}`}>
      <span>{idx} / {tot}</span>
      <span className="h-px w-10 bg-aurora/40" />
      <span className="uppercase">{label}</span>
    </div>
  );
}

// Tubulação SVG decorativa animada (fluxo)
export function PipeFlow({ className = '', color = '#00657B' }) {
  return (
    <svg
      aria-hidden
      className={`pointer-events-none ${className}`}
      viewBox="0 0 200 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0 30 H 80 Q 90 30 90 20 V 10 Q 90 0 100 0 H 130 Q 140 0 140 10 V 50 Q 140 60 150 60 H 200"
        stroke={color}
        strokeWidth="2"
        className="pipe-flow"
        opacity="0.8"
      />
    </svg>
  );
}

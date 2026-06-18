import { motion } from 'framer-motion';

export default function TimeAuroraBadge({ tone = 'light', variant = 'wide', className = '' }) {
  if (variant === 'compact') return <CompactBadge tone={tone} className={className} />;

  const isDark = tone === 'dark';
  const wrap = isDark
    ? 'border-alert/30 bg-alert/[0.07]'
    : 'border-alert/35 bg-alert/[0.08]';
  const subtitle = isDark ? 'text-white/55' : 'text-cota';
  const finalPrice = isDark ? 'text-white' : 'text-ink';

  return (
    <div
      className={`flex flex-col gap-3 border ${wrap} px-4 py-3 sm:flex-row sm:items-center sm:gap-5 sm:px-5 sm:py-3.5 ${className}`}
      role="note"
      aria-label="Acesso liberado para Alunos Aurora"
    >
      {/* Ícone + identificação */}
      <div className="flex items-center gap-3">
        <span aria-hidden className="flex h-8 w-8 flex-shrink-0 items-center justify-center border border-alert/40 text-gold-gradient">
          <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4">
            <path d="M2 9 L12 4 L22 9 L12 14 Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
            <path d="M6 11 V16 C6 16 8.5 18 12 18 C15.5 18 18 16 18 16 V11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M22 9 V13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </span>
        <div className="leading-tight">
          <div className="font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-gold-gradient sm:text-[11px] sm:tracking-[0.3em]">
            Alunos Aurora
          </div>
          <div className={`mt-0.5 font-mono text-[9px] uppercase tracking-[0.2em] ${subtitle}`}>
            acesso liberado
          </div>
        </div>
      </div>

      {/* Divider visual — só desktop */}
      <span aria-hidden className="hidden h-8 w-px bg-alert/25 sm:block" />

      {/* Preço cortado animado */}
      <div className="flex flex-1 items-center gap-2">
        <span className={`font-mono text-[10px] uppercase tracking-[0.2em] ${subtitle}`}>
          em vez de
        </span>
        <div className="relative">
          <span className={`tabular font-mono text-base font-bold sm:text-lg ${isDark ? 'text-white/70' : 'text-ink/70'}`}>R$ 27</span>
          <motion.span
            aria-hidden
            className="absolute left-[-4px] right-[-4px] top-1/2 h-[2px] origin-left bg-alert"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.6, ease: [0.22, 0.61, 0.36, 1], delay: 0.15 }}
            style={{ transform: 'translateY(-50%) rotate(-8deg)' }}
          />
        </div>
        <span className={`font-mono text-[10px] uppercase tracking-[0.2em] ${subtitle}`}>
          você paga
        </span>
        <motion.span
          className={`font-mono text-base font-extrabold sm:text-lg ${finalPrice}`}
          initial={{ opacity: 0, x: -6 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.4, ease: 'easeOut', delay: 0.7 }}
        >
          R$ 0
        </motion.span>
      </div>

      {/* Footnote à direita */}
      <div className={`font-mono text-[10px] uppercase tracking-[0.2em] ${subtitle} sm:text-[10px] sm:tracking-[0.25em]`}>
        já incluso na sua jornada
      </div>
    </div>
  );
}

// Variante compacta — pra encaixar ao lado do CTA do hero
function CompactBadge({ tone = 'light', className = '' }) {
  const isDark = tone === 'dark';
  const wrap = isDark
    ? 'border-alert/45 bg-[#3a2f12]'
    : 'border-alert/55 bg-[#F8EFD0]';
  const head = 'text-gold-gradient';
  const body = isDark ? 'text-white/95' : 'text-ink';

  return (
    <div
      className={`flex items-start gap-3 border border-l-[3px] border-alert/60 ${wrap} px-3 py-2 shadow-[0_1px_2px_rgba(0,17,21,.06)] sm:px-3.5 sm:py-2.5 ${className}`}
      role="note"
      aria-label="Benefício de ser aluno Aurora"
    >
      <span aria-hidden className={`flex h-7 w-7 flex-shrink-0 items-center justify-center border border-alert/50 ${head}`}>
        <svg viewBox="0 0 24 24" fill="none" className="h-3.5 w-3.5">
          <path d="M2 9 L12 4 L22 9 L12 14 Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
          <path d="M6 11 V16 C6 16 8.5 18 12 18 C15.5 18 18 16 18 16 V11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M22 9 V13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </span>

      <div className="flex-1 leading-tight">
        <div className={`font-mono text-[11px] font-extrabold uppercase tracking-[0.22em] ${isDark ? head : 'text-gold-solid'}`}>
          Benefício de ser aluno
        </div>
        <div className={`mt-1 text-[13px] font-medium leading-snug sm:text-sm ${body}`}>
          Sua vaga já está garantida e você entra sem pagar nada. Em vez de{' '}
          <span className="relative inline-block whitespace-nowrap">
            <span className="tabular font-semibold">R$ 27</span>
            <motion.span
              aria-hidden
              className="absolute left-[-2px] right-[-2px] top-1/2 h-[2px] origin-left bg-alert"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.55, ease: [0.22, 0.61, 0.36, 1], delay: 0.2 }}
              style={{ transform: 'translateY(-50%) rotate(-8deg)' }}
            />
          </span>
          , você paga{' '}
          <strong className={isDark ? 'text-white' : 'text-ink'}>R$ 0</strong>.
        </div>
      </div>
    </div>
  );
}

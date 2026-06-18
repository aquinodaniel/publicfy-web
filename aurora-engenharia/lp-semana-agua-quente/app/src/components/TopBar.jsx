import { useState, useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useSeats } from '../hooks/useSeats';

export default function TopBar({ onCTAClick }) {
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const lastY = useRef(0);
  const { percent } = useSeats();
  const filled = Math.round(percent);

  useEffect(() => {
    lastY.current = window.scrollY;
    let raf = 0;
    const SHOW_THRESHOLD = 6;
    const HIDE_THRESHOLD = 8;
    const TOP_GUARD = 80;

    const onScroll = () => {
      if (raf) return;
      raf = window.requestAnimationFrame(() => {
        raf = 0;
        const y = window.scrollY;
        const delta = y - lastY.current;

        if (y < TOP_GUARD) {
          setHidden(false);
        } else if (delta > HIDE_THRESHOLD) {
          setHidden(true);
          setOpen(false);
        } else if (delta < -SHOW_THRESHOLD) {
          setHidden(false);
        }
        lastY.current = y;
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (raf) window.cancelAnimationFrame(raf);
    };
  }, []);

  const LOTES = [
    { code: '01', label: 'Alunos Aurora', sub: 'alunos da comunidade', price: 'Free', state: 'time-aurora' },
    { code: '02', label: 'Lote ativo', sub: `${filled}% preenchido`, price: 'R$ 27', state: 'active' },
    { code: '03', label: 'Próximo', sub: '+74%', price: 'R$ 47', state: 'future' },
    { code: '04', label: 'Final', sub: '+148%', price: 'R$ 67', state: 'future' }
  ];

  return (
    <motion.header
      className="pointer-events-none fixed inset-x-0 top-0 z-40 will-change-transform"
      initial={false}
      animate={{ y: hidden ? '-110%' : '0%' }}
      transition={{ duration: 0.32, ease: [0.22, 0.61, 0.36, 1] }}
      aria-hidden={hidden}
    >
      <div className="container-x pointer-events-auto flex h-14 items-center justify-between md:h-20">
        {/* Logo + data (sem info de lote) */}
        <div className="flex items-center gap-3 rounded-full bg-paper/70 px-3 py-1.5 shadow-sm ring-1 ring-ink/10 backdrop-blur-md md:gap-4 md:px-4 md:py-2">
          <img
            src="/logo-aurora.png"
            alt="Aurora Engenharia"
            className="h-8 w-auto drop-shadow-[0_1px_2px_rgba(0,17,21,0.25)] md:h-11"
          />
          <div className="hidden border-l border-ink/15 pl-3 leading-tight md:block md:pl-4">
            <div className="font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-aurora">
              Semana da Água Quente · 5, 6 e 7 jun
            </div>
            <div className="font-mono text-[9px] uppercase tracking-[0.3em] text-cota">
              19h30 · Meet
            </div>
          </div>
        </div>

        {/* Botão de lote/preço com dropdown */}
        <div
          className="relative"
          onMouseEnter={() => setOpen(true)}
          onMouseLeave={() => setOpen(false)}
        >
          <button
            onClick={onCTAClick}
            onFocus={() => setOpen(true)}
            onBlur={() => setOpen(false)}
            aria-haspopup="true"
            aria-expanded={open}
            className="group inline-flex items-center gap-2 rounded-full border border-aurora/25 bg-paper/70 px-3 py-1.5 shadow-sm ring-1 ring-ink/5 backdrop-blur-md transition-colors hover:border-aurora/60 md:gap-2.5 md:px-4 md:py-2"
          >
            {/* Live dot */}
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-live-dot rounded-full bg-aurora opacity-70" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-aurora" />
            </span>
            {/* Lote */}
            <span className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-aurora md:text-[11px] md:tracking-[0.25em]">
              Lote 02
            </span>
            <span aria-hidden className="h-3 w-px bg-aurora/25" />
            {/* Preço */}
            <span className="tabular text-[11px] font-extrabold text-ink md:text-xs">
              R$ 27
            </span>
            {/* Chevron */}
            <motion.svg
              className="h-3 w-3 text-aurora/70"
              viewBox="0 0 12 12"
              fill="none"
              animate={{ rotate: open ? 180 : 0 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
            >
              <path d="M3 4.5 L6 7.5 L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </motion.svg>
          </button>

          {/* Dropdown — só desktop */}
          <AnimatePresence>
            {open && (
              <motion.div
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.18, ease: [0.22, 0.61, 0.36, 1] }}
                className="absolute right-0 top-full mt-2 hidden w-[320px] overflow-hidden border border-aurora/15 bg-paper/95 shadow-stamp backdrop-blur-md md:block"
                role="menu"
              >
                {/* Header */}
                <div className="flex items-center justify-between border-b border-ink/10 px-4 py-2.5">
                  <span className="font-mono text-[9px] font-bold uppercase tracking-[0.3em] text-aurora">
                    ▸ Mapa de lotes
                  </span>
                  <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-cota">
                    rev.002
                  </span>
                </div>

                {/* Lotes */}
                <ul>
                  {LOTES.map((lote) => (
                    <LoteRow key={lote.code} {...lote} />
                  ))}
                </ul>

              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.header>
  );
}

function LoteRow({ code, label, sub, price, state }) {
  const map = {
    'time-aurora': {
      row: 'bg-alert/[0.05] border-l-2 border-alert/70',
      code: 'text-gold-gradient',
      label: 'text-gold-gradient font-bold',
      price: 'text-gold-gradient font-bold'
    },
    active: {
      row: 'bg-aurora/[0.06] border-l-2 border-aurora',
      code: 'text-aurora font-bold',
      label: 'text-aurora font-bold',
      price: 'text-ink font-extrabold'
    },
    future: {
      row: 'border-l-2 border-transparent',
      code: 'text-cota/70',
      label: 'text-gray-500',
      price: 'text-gray-500 font-semibold'
    }
  };
  const s = map[state];

  return (
    <li className={`flex items-center gap-3 px-4 py-2.5 transition-colors ${s.row}`} role="menuitem">
      <span className={`font-mono text-[10px] uppercase tracking-[0.25em] ${s.code}`}>
        L.{code}
      </span>
      <div className="min-w-0 flex-1 leading-tight">
        <div className={`font-mono text-[10px] uppercase tracking-[0.2em] ${s.label}`}>
          {label}
        </div>
        <div className="mt-0.5 truncate font-mono text-[9px] uppercase tracking-[0.18em] text-cota">
          {sub}
        </div>
      </div>
      <span className={`tabular font-mono text-sm ${s.price}`}>
        {price}
      </span>
    </li>
  );
}

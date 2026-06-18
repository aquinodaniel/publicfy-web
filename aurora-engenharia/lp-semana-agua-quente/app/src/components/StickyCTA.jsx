import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useSeats } from '../hooks/useSeats';

export default function StickyCTA({ onCTAClick }) {
  const [show, setShow] = useState(false);
  const { percent } = useSeats();
  const filled = Math.round(percent);

  useEffect(() => {
    const onScroll = () => {
      const scrolled = window.scrollY;
      const total = document.body.scrollHeight - window.innerHeight;
      const pct = total > 0 ? scrolled / total : 0;
      const threshold = window.innerWidth < 768 ? 0.05 : 0.3;
      setShow(pct > threshold);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.22, 0.61, 0.36, 1] }}
          className="fixed inset-x-0 bottom-0 z-40 border-t border-aurora-glow/20 bg-ink-deep/95 px-4 py-2.5 backdrop-blur-md md:py-4"
          style={{ paddingBottom: 'max(0.625rem, env(safe-area-inset-bottom))' }}
        >
          <div className="container-x flex items-center justify-between gap-3">
            <div className="min-w-0">
              <div className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-aurora-glow md:tracking-[0.25em]">
                ▸ Lote 02 · R$ 27
              </div>
              <div className="tabular mt-0.5 font-mono text-[11px] text-white/60 md:text-xs">
                {filled}% das vagas já preenchidas
              </div>
            </div>
            <button
              onClick={onCTAClick}
              className="btn-primary flex-shrink-0 px-4 py-2.5 text-xs sm:px-5 sm:py-3 sm:text-sm md:text-base"
            >
              Entrar
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

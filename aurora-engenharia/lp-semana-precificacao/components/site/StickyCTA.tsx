'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { pricing } from '@/content/site';

// ============================================================
// STICKY CTA — cópia fiel da imersão: barra dark na base com UM botão dourado
// centralizado ("Garantir vaga · R$ X →"). Sobe ao passar 30% (5% mobile).
// ============================================================
export default function StickyCTA({ onCTAClick }: { onCTAClick: () => void }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const total = document.body.scrollHeight - window.innerHeight;
      const pct = total > 0 ? window.scrollY / total : 0;
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
          className="fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-ink-deep/95 px-4 py-3 backdrop-blur-md md:py-4"
          style={{ paddingBottom: 'max(0.75rem, env(safe-area-inset-bottom))' }}
        >
          <div className="container-x flex justify-center">
            <button
              onClick={onCTAClick}
              className="btn-cta w-full max-w-md px-7 py-3 text-sm md:text-base"
            >
              Garantir vaga · {pricing.lote1} →
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

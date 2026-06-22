'use client';

import { motion, useScroll } from 'framer-motion';

// ============================================================
// ScrollProgressBar — a régua aurora do topo (a ÚNICA linha aurora "viva").
// scaleX 1:1 com o scroll, SEM spring — uma régua de progresso precisa ser
// exata (precisão Linear-style), não amortecida (achado #11).
// useScroll do Framer já é passive/otimizado.
// ============================================================
export default function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  return (
    <motion.div
      aria-hidden
      style={{ scaleX: scrollYProgress }}
      className="fixed inset-x-0 top-0 z-[60] h-[3px] origin-left bg-aurora"
    />
  );
}

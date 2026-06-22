'use client';

import { motion } from 'framer-motion';
import type { ReactNode } from 'react';
import { usePrefersReducedMotion } from '@/lib/hooks';

// ============================================================
// MaskReveal — assinatura de motion da v2 (Precificação).
// Substitui o `Reveal` (que SUBIA de baixo, herdado da Água Quente).
// Aqui o conteúdo ACENDE no lugar:
//   - 'wipe'  → clip-path da esquerda p/ direita (texto desliza à vista)
//   - 'glow'  → opacity 0.1→1 + blur 8px→0 (linha apagada que acende, ref fintech)
// Easing assinatura Aurora: cubic-bezier(.22,.61,.36,1). once + viewport 15%.
// ============================================================

const EASE = [0.22, 0.61, 0.36, 1] as const;

type Variant = 'wipe' | 'glow';

type MaskRevealProps = {
  children: ReactNode;
  variant?: Variant;
  delay?: number;
  duration?: number;
  className?: string;
  as?: 'div' | 'span' | 'h1' | 'h2' | 'h3' | 'p' | 'li';
  /** amount do viewport (default 0.3 p/ headlines) */
  amount?: number;
  /** 'inview' (scroll) p/ below-the-fold | 'mount' (no load) p/ hero/above-the-fold */
  trigger?: 'inview' | 'mount';
};

export default function MaskReveal({
  children,
  variant = 'wipe',
  delay = 0,
  duration = 0.7,
  className = '',
  as = 'div',
  amount = 0.3,
  trigger = 'inview'
}: MaskRevealProps) {
  const Component = (motion[as] ?? motion.div) as typeof motion.div;
  const reduced = usePrefersReducedMotion();

  // wipe = opacity + leve deslize lateral (confiável). NÃO usar clip-path:
  // a animação de clip-path do framer não assenta em alguns engines e deixa
  // o conteúdo cortado/invisível. opacity/transform são à prova de falha.
  const initial =
    variant === 'wipe'
      ? { opacity: 0, x: -20 }
      : { opacity: 0.08, filter: 'blur(10px)' };

  const shown =
    variant === 'wipe'
      ? { opacity: 1, x: 0 }
      : { opacity: 1, filter: 'blur(0px)' };

  // reduced-motion: renderiza no estado final, sem animação.
  if (reduced) {
    return <Component className={className}>{children}</Component>;
  }

  // above-the-fold (hero) anima no mount; o resto, no scroll.
  const motionProps =
    trigger === 'mount'
      ? { animate: shown }
      : { whileInView: shown, viewport: { once: true, amount } };

  return (
    <Component
      className={className}
      initial={initial}
      {...motionProps}
      transition={{ duration, ease: EASE, delay }}
    >
      {children}
    </Component>
  );
}

// Grupo que acende os filhos em sequência (linha a linha / item a item).
export function MaskRevealGroup({
  children,
  className = '',
  stagger = 0.12,
  amount = 0.3
}: {
  children: ReactNode;
  className?: string;
  stagger?: number;
  amount?: number;
}) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: stagger } } }}
    >
      {children}
    </motion.div>
  );
}

export function MaskRevealLine({
  children,
  variant = 'glow',
  className = '',
  duration = 0.7
}: {
  children: ReactNode;
  variant?: Variant;
  className?: string;
  duration?: number;
}) {
  const hidden =
    variant === 'wipe'
      ? { opacity: 0, x: -20 }
      : { opacity: 0.08, filter: 'blur(10px)' };
  const show =
    variant === 'wipe'
      ? { opacity: 1, x: 0, transition: { duration, ease: EASE } }
      : { opacity: 1, filter: 'blur(0px)', transition: { duration, ease: EASE } };

  return (
    <motion.div className={className} variants={{ hidden, show }}>
      {children}
    </motion.div>
  );
}

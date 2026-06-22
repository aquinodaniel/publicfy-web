'use client';

import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

// Wrapper único pra reveal-on-scroll. Mantém um único motion pattern em toda a página.
// Easing assinatura Aurora: cubic-bezier(.22,.61,.36,1). Entra de baixo (y +16 -> 0).
const variants = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 0.61, 0.36, 1] as const }
  }
};

type RevealProps = {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: 'div' | 'section' | 'span' | 'li' | 'article';
};

export default function Reveal({ children, delay = 0, className = '', as = 'div' }: RevealProps) {
  const Component = (motion[as] ?? motion.div) as typeof motion.div;
  return (
    <Component
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.15 }}
      variants={{
        ...variants,
        show: { ...variants.show, transition: { ...variants.show.transition, delay } }
      }}
    >
      {children}
    </Component>
  );
}

export function StaggerGroup({
  children,
  className = '',
  stagger = 0.08
}: {
  children: ReactNode;
  className?: string;
  stagger?: number;
}) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.15 }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: stagger } }
      }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className = ''
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div className={className} variants={variants}>
      {children}
    </motion.div>
  );
}

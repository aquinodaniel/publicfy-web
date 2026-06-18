import { motion } from 'framer-motion';

// Wrapper único pra reveal-on-scroll. Mantém um único motion pattern em toda a página.
const variants = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 0.61, 0.36, 1] }
  }
};

export default function Reveal({ children, delay = 0, className = '', as = 'div' }) {
  const Component = motion[as] ?? motion.div;
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

export function StaggerGroup({ children, className = '', stagger = 0.08 }) {
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

export function StaggerItem({ children, className = '' }) {
  return <motion.div className={className} variants={variants}>{children}</motion.div>;
}

"use client";

import { useEffect } from "react";
import { motion, useReducedMotion, useSpring, useTransform } from "framer-motion";

/**
 * Número que interpola suavemente ao mudar de valor (ex.: resultados da
 * calculadora de ROI ao arrastar os sliders). Respeita prefers-reduced-motion:
 * com movimento reduzido, salta direto para o valor sem animar.
 */
export function AnimatedNumber({
  value,
  format = (n) => String(Math.round(n)),
  className,
}: {
  value: number;
  format?: (n: number) => string;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const spring = useSpring(value, { stiffness: 120, damping: 24, mass: 0.6 });
  const display = useTransform(spring, (v) => format(v));

  useEffect(() => {
    if (reduce) spring.jump(value);
    else spring.set(value);
  }, [value, reduce, spring]);

  return <motion.span className={className}>{display}</motion.span>;
}

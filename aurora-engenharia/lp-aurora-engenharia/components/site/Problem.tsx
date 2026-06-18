"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { X, Check } from "lucide-react";
import { Section, SectionHeader } from "@/components/ui/Section";
import { CountUp } from "@/components/motion/CountUp";
import { problem } from "@/content/site";

const EASE = [0.22, 1, 0.36, 1] as const;

export function Problem() {
  const reduce = useReducedMotion();
  const { bad, good } = problem.comparison;

  // pareia commodity ↔ alto padrão por índice, com o rótulo do eixo
  const rows = bad.points.map((b, i) => ({
    axis: problem.axes[i],
    bad: b,
    good: good.points[i],
  }));

  const linesStagger: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.09, delayChildren: 0.1 } },
  };
  const line: Variants = {
    hidden: { opacity: 0, y: reduce ? 0 : 14 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
  };

  return (
    <Section id="problema" surface="raised" glow="cyan-l" texture>
      <SectionHeader eyebrow={problem.eyebrow} title={problem.title} subtitle={problem.subtitle} align="center" />

      <div className="mx-auto mt-14 max-w-4xl">
        <div className="relative overflow-hidden rounded-2xl border border-border bg-card/30 backdrop-blur">
          {/* divisor técnico central que se desenha ao entrar */}
          <motion.div
            className="pointer-events-none absolute inset-y-0 left-1/2 z-10 hidden w-px -translate-x-1/2 origin-top bg-gradient-to-b from-transparent via-primary/55 to-transparent sm:block"
            initial={{ scaleY: reduce ? 1 : 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: EASE }}
          />

          {/* cabeçalho das colunas */}
          <div className="relative grid grid-cols-1 sm:grid-cols-2">
            <div className="bg-muted-foreground/[0.04] px-5 py-4 sm:px-7">
              <span className="font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground/80">{bad.title}</span>
            </div>
            <div className="border-t border-border/60 bg-primary/[0.07] px-5 py-4 sm:border-t-0 sm:border-l sm:border-primary/20 sm:px-7">
              <span className="inline-flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-[0.15em] text-primary">
                <Check className="h-3.5 w-3.5" aria-hidden />
                {good.title}
              </span>
            </div>
          </div>

          {/* linhas de comparação — revelam uma a uma no scroll */}
          <motion.div
            className="relative"
            variants={linesStagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
          >
            {rows.map((r) => (
              <motion.div
                key={r.axis}
                variants={line}
                className="group grid grid-cols-1 border-t border-border/60 sm:grid-cols-2"
              >
                {/* rótulo do eixo — sutil, ar de "sistema" (só mobile, no topo da linha) */}
                <span className="bg-muted-foreground/[0.04] px-5 pt-3 font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground/50 sm:hidden">
                  {r.axis}
                </span>

                {/* commodity — apagado, "morto" */}
                <div className="flex items-center gap-3 bg-muted-foreground/[0.04] px-5 py-4 sm:px-7">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-muted-foreground/10 text-muted-foreground/60">
                    <X className="h-3.5 w-3.5" aria-hidden />
                  </span>
                  <span className="text-sm text-muted-foreground/80">{r.bad}</span>
                </div>

                {/* alto padrão — destacado, premium + hover */}
                <div className="flex items-center gap-3 border-t border-border/60 bg-primary/[0.07] px-5 py-4 transition-colors duration-300 group-hover:bg-primary/[0.11] sm:border-t-0 sm:border-l sm:border-primary/20 sm:px-7">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/20 text-primary ring-1 ring-primary/30">
                    <Check className="h-3.5 w-3.5" aria-hidden />
                  </span>
                  <span className="text-sm font-semibold text-foreground">{r.good}</span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* fecho: métrica em count-up — número grande + texto à esquerda, alinhados */}
        <motion.div
          className="mt-12 flex items-center justify-center gap-5"
          initial={{ opacity: 0, y: reduce ? 0 : 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.5, ease: EASE, delay: 0.1 }}
        >
          <span className="shrink-0 font-display text-7xl font-extrabold leading-none md:text-8xl">
            <CountUp value={`${problem.metric.value}${problem.metric.suffix}`} className="text-gold" />
          </span>
          <p className="max-w-xs text-left text-base leading-snug text-foreground/75 md:text-lg">
            {problem.metric.label}
          </p>
        </motion.div>
      </div>
    </Section>
  );
}

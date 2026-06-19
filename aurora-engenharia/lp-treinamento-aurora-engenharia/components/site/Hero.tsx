"use client";

import { motion, useReducedMotion, useScroll, useTransform, type Variants } from "framer-motion";
import { useRef } from "react";
import { ArrowRight, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Section";
import { Maquete } from "@/components/3d/Maquete";
import { CountUp } from "@/components/motion/CountUp";
import { cn } from "@/lib/utils";
import { hero, whatsappLink } from "@/content/site";

const EASE = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const yImageT = useTransform(scrollYProgress, [0, 1], [0, 40]);
  const yImage = reduce ? 0 : yImageT;

  const container: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
  };
  const item: Variants = {
    hidden: { opacity: 0, y: reduce ? 0 : 16 },
    show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
  };

  return (
    <section ref={ref} className="relative overflow-hidden pt-32 pb-20 md:pt-40 md:pb-28">
      <HeroBackground />

      <div className="relative mx-auto grid w-full max-w-[1200px] grid-cols-1 items-center gap-14 px-6 md:px-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-24">
        {/* ---- coluna texto ---- */}
        <motion.div className="flex flex-col items-start gap-6" variants={container} initial="hidden" animate="show">
          <motion.div variants={item}>
            <Eyebrow>{hero.eyebrow}</Eyebrow>
          </motion.div>

          <motion.h1
            variants={item}
            className="font-display text-4xl font-extrabold leading-[1.18] tracking-tight text-foreground sm:text-5xl lg:text-6xl"
          >
            {hero.title} <span className="text-gold">{hero.titleAccent}</span>
          </motion.h1>

          <motion.p variants={item} className="max-w-xl text-lg leading-relaxed text-foreground/75 md:text-xl">
            {hero.subtitle}
          </motion.p>

          {/* CTAs */}
          <motion.div variants={item} className="flex flex-col gap-3 sm:flex-row">
            <Button href="#metodo" size="lg" className="group">
              {hero.ctaPrimary}
              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
            </Button>
            <Button href={whatsappLink} external variant="secondary" size="lg">
              <MessageCircle className="h-4 w-4" />
              {hero.ctaSecondary}
            </Button>
          </motion.div>

          {/* painel de métricas — dashboard premium */}
          <motion.div
            variants={item}
            className="mt-2 grid w-full max-w-xl grid-cols-2 overflow-hidden rounded-2xl border border-border/80 bg-card/40 backdrop-blur sm:grid-cols-4"
          >
            {hero.stats.map((stat, i) => (
              <div
                key={stat.label}
                className={cn(
                  "flex flex-col gap-1.5 px-4 py-4 transition-colors duration-300 hover:bg-card/80",
                  i > 0 && "border-t border-border/60 sm:border-t-0 sm:border-l"
                )}
              >
                <span className="font-display text-2xl font-bold tabular leading-none text-foreground md:text-3xl">
                  <CountUp value={stat.value} />
                </span>
                <span className="font-mono text-[11px] uppercase leading-tight tracking-wider text-muted-foreground">
                  {stat.label}
                </span>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* ---- coluna maquete 3D interativa ---- */}
        <motion.div
          className="relative"
          initial={{ opacity: 0, scale: reduce ? 1 : 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: EASE, delay: 0.15 }}
        >
          {/* halo de profundidade atrás da maquete */}
          <div className="pointer-events-none absolute -inset-8 -z-10 rounded-[2.5rem] bg-[radial-gradient(60%_55%_at_55%_40%,hsl(var(--primary)/0.12),transparent_70%)] blur-2xl" />

          <motion.div style={{ y: yImage }} className="relative mx-auto h-[440px] w-full sm:h-[540px] md:h-[600px]">
            <Maquete />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

/** Fundo premium estilo blueprint: grid técnico sutil + gradientes suaves + tubulações discretas. */
function HeroBackground() {
  return (
    <>
      <div className="pointer-events-none absolute inset-0 bg-grid bg-grid-fade opacity-[0.4]" />
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[520px] w-[820px] -translate-x-1/2 rounded-full bg-primary/[0.05] blur-[160px]" />
      <div className="pointer-events-none absolute right-0 top-10 h-[420px] w-[420px] rounded-full bg-accent/[0.03] blur-[150px]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-border/60 to-transparent" />
      <FlowPipes />
    </>
  );
}

/** Camada de "tubulações" em SVG que se desenham (flow) — discreta, no fundo. */
function FlowPipes() {
  const paths = [
    "M-50,120 H300 a24,24 0 0 1 24,24 V340",
    "M-50,260 H140 a24,24 0 0 0 24,-24 V60",
    "M1500,90 H1180 a24,24 0 0 0 -24,24 V300",
  ];
  return (
    <svg
      className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.12]"
      viewBox="0 0 1440 420"
      preserveAspectRatio="xMidYMid slice"
      fill="none"
    >
      {paths.map((d, i) => (
        <g key={i}>
          <path d={d} stroke="hsl(var(--border))" strokeWidth="2" />
          <path
            d={d}
            stroke={i % 2 === 0 ? "var(--gold-1)" : "#67e8f9"}
            strokeWidth="2"
            strokeDasharray="6 22"
            className="animate-flow"
            style={{ animationDuration: `${2 + i * 0.7}s` }}
          />
        </g>
      ))}
    </svg>
  );
}

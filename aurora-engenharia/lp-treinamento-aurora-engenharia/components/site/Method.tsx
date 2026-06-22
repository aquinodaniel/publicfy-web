"use client";

import { useRef, useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useMotionValueEvent,
} from "framer-motion";
import { Gauge, Gem, Box, TrendingUp, ArrowRight, type LucideIcon } from "lucide-react";
import { Section, SectionHeader, Eyebrow } from "@/components/ui/Section";
import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { method } from "@/content/site";

const N = method.pillars.length;
const EASE = [0.22, 1, 0.36, 1] as const;

// um ícone por pilar (mapeado por índice, sem mexer no conteúdo)
const ICONS: LucideIcon[] = [Gauge, Gem, Box, TrendingUp];

export function Method() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const [active, setActive] = useState(0);
  const fillHeight = useTransform(scrollYProgress, [0.05, 0.95], ["0%", "100%"]);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setActive(Math.min(N - 1, Math.max(0, Math.floor(v * N + 0.0001))));
  });

  // clicar numa etapa rola até a fração correspondente do scrollytelling
  function goTo(i: number) {
    const el = ref.current;
    if (!el) return;
    const p = (i + 0.5) / N;
    const elTop = el.getBoundingClientRect().top + window.scrollY;
    const top = elTop + p * (el.offsetHeight - window.innerHeight);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top, behavior: reduce ? "auto" : "smooth" });
  }

  const ActiveIcon = ICONS[active];

  return (
    <Section id="metodo">
      {/* ===== Desktop: header + painel blueprint pinados juntos e centralizados ===== */}
      <div ref={ref} className="relative hidden lg:block" style={{ height: `${N * 60}vh` }}>
        <div className="sticky top-0 flex h-screen flex-col items-center justify-center gap-7">
          {/* header compacto — não rouba espaço do painel */}
          <Reveal className="max-w-2xl text-center">
            <Eyebrow>{method.eyebrow}</Eyebrow>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-foreground md:text-[2rem]">
              {method.title}
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground md:text-base">
              {method.subtitle}
            </p>
          </Reveal>

          <div className="relative w-full overflow-hidden rounded-3xl border border-border bg-card/40 p-8 backdrop-blur">
            {/* textura + glow dentro do painel */}
            <div className="pointer-events-none absolute inset-0 bg-grid bg-grid-fade opacity-[0.2]" />
            <div className="pointer-events-none absolute -right-20 top-1/3 h-[360px] w-[480px] rounded-full bg-primary/[0.05] blur-[130px]" />

            <div className="relative grid grid-cols-[minmax(300px,360px)_1fr] gap-12">
              {/* ---- trilho de etapas (menu navegável) ---- */}
              <div className="grid grid-cols-[3px_1fr] gap-5">
                {/* barra de progresso vertical */}
                <div className="relative h-full overflow-hidden rounded-full bg-border/70">
                  <motion.div
                    className="absolute inset-x-0 top-0 origin-top rounded-full bg-gold"
                    style={{ height: fillHeight }}
                  />
                </div>

                <ul className="flex flex-col gap-2.5">
                  {method.pillars.map((p, i) => {
                    const reached = i <= active;
                    const isActive = i === active;
                    const Icon = ICONS[i];
                    return (
                      <li key={p.number}>
                        <button
                          onClick={() => goTo(i)}
                          aria-current={isActive ? "step" : undefined}
                          className={cn(
                            "group flex w-full items-center gap-4 rounded-xl border px-4 py-3 text-left transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                            isActive
                              ? "border-primary/40 bg-primary/[0.07]"
                              : "border-transparent hover:border-border hover:bg-card/60"
                          )}
                        >
                          <span
                            className={cn(
                              "flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 font-mono text-xs font-bold transition-all duration-300",
                              reached
                                ? "border-[var(--gold-2)] bg-gold text-[#0a1f26]"
                                : "border-border bg-card text-muted-foreground",
                              isActive && "shadow-gold"
                            )}
                          >
                            {p.number}
                          </span>
                          <span
                            className={cn(
                              "font-display text-[15px] font-semibold leading-tight transition-colors duration-300",
                              isActive
                                ? "text-foreground"
                                : reached
                                  ? "text-foreground/70"
                                  : "text-muted-foreground"
                            )}
                          >
                            {p.title}
                          </span>
                          <Icon
                            className={cn(
                              "ml-auto h-4 w-4 shrink-0 transition-colors duration-300",
                              isActive ? "text-primary" : "text-muted-foreground/30"
                            )}
                          />
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>

              {/* ---- painel de detalhe do pilar ativo ---- */}
              <div className="relative flex min-h-[300px] items-start overflow-hidden pt-1">
                {/* número marca d'água — ancorado no canto, inteiro (sem corte) */}
                <span className="pointer-events-none absolute right-0 top-0 select-none font-display text-[9rem] font-extrabold leading-none text-primary/[0.06]">
                  {method.pillars[active].number}
                </span>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={active}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -16 }}
                    transition={{ duration: 0.4, ease: EASE }}
                    className="relative flex flex-col gap-4"
                  >
                    <div className="flex items-center gap-3">
                      <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary ring-1 ring-primary/20">
                        <ActiveIcon className="h-6 w-6" />
                      </span>
                      <span className="font-mono text-xs uppercase tracking-[0.15em] text-gold">
                        Etapa {method.pillars[active].number}{" "}
                        <span className="text-muted-foreground/70">de {String(N).padStart(2, "0")}</span>
                      </span>
                    </div>
                    <h3 className="font-display text-3xl font-bold leading-tight text-foreground xl:text-4xl">
                      {method.pillars[active].title}
                    </h3>
                    <p className="max-w-lg text-lg leading-relaxed text-muted-foreground">
                      {method.pillars[active].description}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ===== Mobile: header + timeline vertical conectada ===== */}
      <div className="lg:hidden">
        <SectionHeader eyebrow={method.eyebrow} title={method.title} subtitle={method.subtitle} align="center" />

        <div className="relative mt-10">
          <div className="absolute bottom-8 left-7 top-8 w-px bg-border" aria-hidden />
          <div className="flex flex-col gap-4">
            {method.pillars.map((p, i) => {
              const Icon = ICONS[i];
              return (
                <div key={p.number} className="relative flex gap-5">
                  <span className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gold font-display text-xl font-extrabold text-[#0a1f26] shadow-gold">
                    {p.number}
                  </span>
                  <div className="flex-1 rounded-2xl border border-border bg-card/70 p-5">
                    <div className="flex items-center gap-2">
                      <Icon className="h-4 w-4 shrink-0 text-primary" />
                      <h3 className="font-display text-base font-semibold text-foreground">{p.title}</h3>
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ===== Fecho: texto de transição + CTA ===== */}
      <Reveal className="mx-auto mt-4 flex max-w-2xl flex-col items-center gap-6 text-center lg:-mt-4">
        <p className="text-lg leading-relaxed text-foreground/80 md:text-xl">{method.closing.text}</p>
        <Button href={method.closing.href} size="lg" className="group">
          {method.closing.cta}
          <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
        </Button>
      </Reveal>
    </Section>
  );
}

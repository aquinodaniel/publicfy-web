"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { Section, SectionHeader } from "@/components/ui/Section";
import { Reveal } from "@/components/motion/Reveal";
import { CountUp } from "@/components/motion/CountUp";
import { cn } from "@/lib/utils";
import { curriculum } from "@/content/site";

const EASE = [0.22, 1, 0.36, 1] as const;

export function Curriculum() {
  const totalLessons = curriculum.modules.reduce((sum, m) => sum + m.count, 0);
  const totalModules = curriculum.modules.length;
  const [open, setOpen] = useState<number | null>(0);
  const reduce = useReducedMotion();

  return (
    <Section id="curriculo" glow="gold-l">
      <SectionHeader eyebrow={curriculum.eyebrow} title={curriculum.title} subtitle={curriculum.subtitle} />

      {/* accordion de módulos: cada um abre revelando a ementa de aulas */}
      <div className="mx-auto mt-12 flex max-w-3xl flex-col gap-3">
        {curriculum.modules.map((mod, i) => {
          const isOpen = open === i;
          return (
            <div
              key={mod.title}
              className={cn(
                "overflow-hidden rounded-2xl border bg-card shadow-xl transition-colors",
                isOpen ? "border-primary/40" : "border-border"
              )}
            >
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : i)}
                aria-expanded={isOpen}
                className="flex w-full items-center gap-5 p-6 text-left transition-colors hover:bg-card/60 md:p-7"
              >
                <span className="text-gold font-display text-3xl font-extrabold tabular md:text-4xl">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="flex-1">
                  <h3 className="font-display text-lg font-semibold text-foreground md:text-xl">{mod.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{mod.lessons}</p>
                </div>
                <span className="hidden shrink-0 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 font-mono text-xs text-primary sm:block">
                  {mod.count} aulas
                </span>
                <ChevronDown
                  className={cn(
                    "h-5 w-5 shrink-0 text-muted-foreground transition-transform duration-300",
                    isOpen && "rotate-180 text-primary"
                  )}
                  aria-hidden
                />
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: reduce ? 0 : 0.35, ease: EASE }}
                    className="overflow-hidden"
                  >
                    <ol className="flex flex-col gap-px border-t border-border/60 px-6 pb-5 pt-2 md:px-7">
                      {mod.aulas.map((aula, j) => {
                        const sep = aula.indexOf(":");
                        const label = sep > 0 ? aula.slice(0, sep) : "";
                        const titulo = sep > 0 ? aula.slice(sep + 1).trim() : aula;
                        const bonus = /bônus/i.test(label);
                        return (
                          <li
                            key={`${aula}-${j}`}
                            className="flex items-baseline gap-3 py-2 text-sm leading-snug"
                          >
                            <span
                              className={cn(
                                "shrink-0 font-mono text-xs",
                                bonus ? "text-gold" : "text-primary"
                              )}
                            >
                              {label}
                            </span>
                            <span className="text-foreground/80">{titulo}</span>
                          </li>
                        );
                      })}
                    </ol>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>

      {/* frase de impacto: só texto, aparece com fade in no scroll e segue o fluxo */}
      <Reveal className="mx-auto mt-16 max-w-3xl text-center">
        <p className="font-display text-2xl font-bold leading-snug text-foreground md:text-3xl">
          São <CountUp value={String(totalModules)} className="text-gold" /> {curriculum.impact}
        </p>
        <p className="mt-4 font-mono text-sm uppercase tracking-wider text-muted-foreground">
          <CountUp value={String(totalLessons)} className="font-semibold text-primary" /> aulas práticas em vídeo
        </p>
      </Reveal>
    </Section>
  );
}

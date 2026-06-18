"use client";

import type { CSSProperties } from "react";
import { Section, SectionHeader } from "@/components/ui/Section";
import { Reveal } from "@/components/motion/Reveal";
import { CountUp } from "@/components/motion/CountUp";
import { curriculum } from "@/content/site";

export function Curriculum() {
  const totalLessons = curriculum.modules.reduce((sum, m) => sum + m.count, 0);
  const totalModules = curriculum.modules.length;

  return (
    <Section id="curriculo" glow="gold-l">
      <SectionHeader eyebrow={curriculum.eyebrow} title={curriculum.title} subtitle={curriculum.subtitle} />

      {/* stacking cards: cada módulo gruda no topo, o próximo cobre */}
      <div className="mx-auto mt-12 max-w-3xl">
        {curriculum.modules.map((mod, i) => (
          <div
            key={mod.title}
            className="sticky"
            style={{ top: `calc(6rem + ${i * 0.85}rem)`, paddingBottom: "1.25rem" } as CSSProperties}
          >
            <div className="flex items-center gap-5 rounded-2xl border border-border bg-card p-6 shadow-xl md:p-7">
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
            </div>
          </div>
        ))}
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

"use client";

import type { MouseEvent } from "react";
import { Gift } from "lucide-react";
import { Section, SectionHeader } from "@/components/ui/Section";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { CountUp } from "@/components/motion/CountUp";
import { Figure } from "@/components/ui/Figure";
import { bonus } from "@/content/site";

const brl = (n: number) =>
  n.toLocaleString("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 });

function spotlight(e: MouseEvent<HTMLDivElement>) {
  const r = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
  e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
}

export function Bonus() {
  const total = bonus.items.reduce((s, b) => s + b.value, 0);

  return (
    <Section id="bonus" surface="raised" glow="cyan-r">
      <SectionHeader eyebrow={bonus.eyebrow} title={bonus.title} align="center" />

      {/* grid uniforme — todos os cards do mesmo tamanho */}
      <RevealGroup className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {bonus.items.map((item) => (
          <RevealItem key={item.title}>
            <div
              onMouseMove={spotlight}
              className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all duration-200 hover:-translate-y-1 hover:border-primary/40"
            >
              <div
                className="pointer-events-none absolute inset-0 z-10 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                style={{
                  background:
                    "radial-gradient(300px circle at var(--mx) var(--my), hsl(var(--primary)/0.12), transparent 70%)",
                }}
              />
              {/* aspecto fixo 4:3 -> sem distorção */}
              <div className="relative aspect-[4/3] overflow-hidden">
                <Figure
                  src={item.image}
                  alt={item.title}
                  imgClassName="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {"overlay" in item && item.overlay && (
                  <>
                    <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-b from-black/60 via-black/25 to-black/35" />
                    <div className="pointer-events-none absolute inset-0 z-10 flex flex-col items-center justify-center px-4 text-center">
                      <h4
                        className="font-display text-base font-bold leading-tight tracking-tight text-white sm:text-lg"
                        style={{ textShadow: "0 2px 14px rgba(0,0,0,0.75), 0 0 24px rgba(255,255,255,0.35)" }}
                      >
                        {item.overlay.title}
                      </h4>
                      <p
                        className="mt-1.5 max-w-[92%] text-[11px] leading-snug text-white/85 sm:text-xs"
                        style={{ textShadow: "0 1px 10px rgba(0,0,0,0.7)" }}
                      >
                        {item.overlay.subtitle}
                      </p>
                    </div>
                  </>
                )}
                <span className="absolute right-3 top-3 z-20 rounded-full border border-primary/30 bg-background/80 px-2.5 py-1 font-mono text-xs font-bold text-primary backdrop-blur">
                  {brl(item.value)}
                </span>
              </div>
              <div className="relative z-20 flex flex-1 flex-col gap-1.5 p-5">
                <span className="flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wider text-primary">
                  <Gift className="h-3.5 w-3.5" /> Bônus
                </span>
                <h3 className="font-display font-semibold text-foreground">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </div>
            </div>
          </RevealItem>
        ))}
      </RevealGroup>

      {/* value stack — total */}
      <Reveal delay={0.1}>
        <div className="mx-auto mt-6 flex max-w-xl flex-col items-center gap-1 rounded-2xl border border-primary/30 bg-card/60 p-6 text-center backdrop-blur">
          <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
            {bonus.totalLabel}
          </span>
          <span className="font-display text-4xl font-extrabold text-gold tabular">
            <CountUp value={brl(total)} />
          </span>
          <span className="text-sm text-success">{bonus.includedLabel}</span>
        </div>
      </Reveal>
    </Section>
  );
}

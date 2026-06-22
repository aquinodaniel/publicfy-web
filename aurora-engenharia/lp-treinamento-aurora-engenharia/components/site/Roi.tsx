"use client";

import { useState } from "react";
import { Section, SectionHeader } from "@/components/ui/Section";
import { Reveal } from "@/components/motion/Reveal";
import { AnimatedNumber } from "@/components/motion/AnimatedNumber";
import { roi } from "@/content/site";

const brl = (n: number) =>
  n.toLocaleString("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 });

function Slider({
  label,
  value,
  min,
  max,
  step,
  display,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  display: string;
  onChange: (v: number) => void;
}) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-baseline justify-between">
        <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground">{label}</span>
        <span className="font-display text-lg font-bold text-gold">{display}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        aria-label={label}
        aria-valuetext={display}
        className="aurora-range w-full"
        style={{ ["--pct" as string]: `${pct}%` }}
      />
    </div>
  );
}

export function Roi() {
  const { calc } = roi;
  const [projetos, setProjetos] = useState(calc.projetos.default);
  const [valorHoje, setValorHoje] = useState(calc.valorHoje.default);
  const [valorMeta, setValorMeta] = useState(calc.valorMeta.default);

  const ganhoHoje = projetos * valorHoje;
  const ganhoMeta = projetos * valorMeta;
  const diferenca = Math.max(0, ganhoMeta - ganhoHoje);
  const multiplo = Math.max(1, Math.round(valorMeta / calc.custo));
  const barPct = Math.min(100, (ganhoHoje / ganhoMeta) * 100);

  return (
    <Section id="roi" glow="gold-r">
      <SectionHeader eyebrow={roi.eyebrow} title={roi.title} subtitle={roi.subtitle} align="center" />

      <Reveal delay={0.1}>
        <div className="mx-auto mt-14 grid max-w-5xl gap-6 lg:grid-cols-[1fr_1.1fr]">
          {/* controles */}
          <div className="flex flex-col gap-7 rounded-2xl border border-border bg-card/60 p-7 backdrop-blur">
            <Slider
              label={calc.projetos.label}
              value={projetos}
              min={calc.projetos.min}
              max={calc.projetos.max}
              step={calc.projetos.step}
              display={`${projetos}/ano`}
              onChange={setProjetos}
            />
            <Slider
              label={calc.valorHoje.label}
              value={valorHoje}
              min={calc.valorHoje.min}
              max={calc.valorHoje.max}
              step={calc.valorHoje.step}
              display={brl(valorHoje)}
              onChange={setValorHoje}
            />
            <Slider
              label={calc.valorMeta.label}
              value={valorMeta}
              min={calc.valorMeta.min}
              max={calc.valorMeta.max}
              step={calc.valorMeta.step}
              display={brl(valorMeta)}
              onChange={setValorMeta}
            />
          </div>

          {/* resultado */}
          <div className="relative flex flex-col gap-6 overflow-hidden rounded-2xl border border-primary/30 bg-card p-7 glow-gold">
            <div>
              <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
                Faturamento anual com o método
              </p>

              {/* memória de cálculo visual: projetos × valor por projeto */}
              <div className="mt-3 flex flex-wrap items-center gap-x-2.5 gap-y-1">
                <span className="font-display text-xl font-bold tabular text-foreground">{projetos}</span>
                <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">projetos</span>
                <span className="font-display text-xl text-primary/80">×</span>
                <AnimatedNumber
                  value={valorMeta}
                  format={brl}
                  className="font-display text-xl font-bold tabular text-foreground"
                />
                <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">/projeto</span>
              </div>

              {/* resultado */}
              <div className="mt-2 flex items-center gap-3">
                <span className="font-display text-3xl text-primary/80 md:text-4xl">=</span>
                <AnimatedNumber
                  value={ganhoMeta}
                  format={brl}
                  className="font-display text-4xl font-extrabold tabular text-gold md:text-5xl"
                />
              </div>
            </div>

            {/* barra comparativa: cinza = hoje · dourado = ganho a mais */}
            <div className="flex flex-col gap-2">
              <div className="flex justify-between font-mono text-[11px] uppercase tracking-wider">
                <span className="text-muted-foreground">
                  Hoje: <AnimatedNumber value={ganhoHoje} format={brl} />
                </span>
                <span className="text-primary">
                  A mais: +<AnimatedNumber value={diferenca} format={brl} />
                </span>
              </div>
              <div className="flex h-3 w-full overflow-hidden rounded-full bg-secondary">
                <div
                  className="h-full bg-muted-foreground/40 transition-all duration-500"
                  style={{ width: `${barPct}%` }}
                />
                <div className="h-full flex-1 bg-gold transition-all duration-500" />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="min-w-0 rounded-xl border border-border bg-secondary/40 p-4">
                <p className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                  A mais por ano
                </p>
                <p className="mt-1 break-words font-display text-2xl font-bold text-foreground tabular">
                  +<AnimatedNumber value={diferenca} format={brl} />
                </p>
              </div>
              <div className="min-w-0 rounded-xl border border-border bg-secondary/40 p-4">
                <p className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                  1 projeto paga o método
                </p>
                <p className="mt-1 font-display text-2xl font-bold text-success tabular">
                  <AnimatedNumber value={multiplo} />×
                </p>
              </div>
            </div>

            <p className="text-sm text-muted-foreground">
              <span className="font-semibold text-foreground">Investimento único.</span>{" "}
              {roi.note}
            </p>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}

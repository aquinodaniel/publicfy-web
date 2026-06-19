"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ArrowRight } from "lucide-react";
import { Section, SectionHeader, Eyebrow } from "@/components/ui/Section";
import { Figure } from "@/components/ui/Figure";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { demo } from "@/content/site";

type View = { key: string; label: string; image: string; caption: string; isCourse: boolean };

export function Demo() {
  // painel unificado: abas do MEDH-P + os outros cursos (MEDH-G/R)
  const others = demo.trilha.courses.filter((c) => !c.current);
  const views: View[] = [
    ...demo.tabs.map((t) => ({ key: t.key, label: t.label, image: t.image, caption: t.caption, isCourse: false })),
    ...others.map((c) => ({ key: c.code, label: c.code, image: c.image, caption: c.desc, isCourse: true })),
  ];
  const pCount = demo.tabs.length;

  const [active, setActive] = useState(0);
  const view = views[active];
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  function onKeyDown(e: React.KeyboardEvent<HTMLDivElement>) {
    const last = views.length - 1;
    let next: number | null = null;
    if (e.key === "ArrowRight") next = active === last ? 0 : active + 1;
    else if (e.key === "ArrowLeft") next = active === 0 ? last : active - 1;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = last;
    if (next !== null) {
      e.preventDefault();
      setActive(next);
      tabRefs.current[next]?.focus();
    }
  }

  const renderTab = (v: View, i: number) => {
    const isActive = active === i;
    return (
      <button
        key={v.key}
        ref={(el) => {
          tabRefs.current[i] = el;
        }}
        role="tab"
        aria-selected={isActive}
        tabIndex={isActive ? 0 : -1}
        onClick={() => setActive(i)}
        className={cn(
          "relative rounded-full px-4 py-2 text-[13px] font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:px-5 sm:py-2.5 sm:text-sm",
          v.isCourse && !isActive && "border border-border",
          isActive ? "text-primary-foreground" : "text-muted-foreground hover:text-foreground"
        )}
      >
        {isActive && (
          <motion.span
            layoutId="demo-tab"
            className="absolute inset-0 rounded-full bg-primary"
            transition={{ type: "spring", stiffness: 380, damping: 30 }}
          />
        )}
        <span className="relative z-10">{v.label}</span>
      </button>
    );
  };

  return (
    <Section id="demonstracao" surface="raised" glow="cyan-r" texture>
      <SectionHeader eyebrow={demo.eyebrow} title={demo.title} subtitle={demo.subtitle} />

      <div className="mt-12 flex flex-col gap-6">
        {/* barra: abas do MEDH-P (esq) · outros cursos MEDH-G/R (dir) */}
        <div
          role="tablist"
          aria-label="Por dentro da plataforma"
          onKeyDown={onKeyDown}
          className="flex flex-col items-center gap-4 sm:flex-row sm:items-center sm:justify-between sm:gap-3"
        >
          <div className="flex flex-wrap justify-center gap-2 sm:justify-start">
            {views.slice(0, pCount).map((v, i) => renderTab(v, i))}
          </div>
          <div className="flex flex-wrap items-center justify-center gap-2 sm:justify-start">
            <span className="w-full text-center font-mono text-[10px] uppercase tracking-wider text-muted-foreground sm:w-auto">
              Outros cursos
            </span>
            {views.slice(pCount).map((v, idx) => renderTab(v, pCount + idx))}
          </div>
        </div>

        {/* painel */}
        <div className="overflow-hidden rounded-2xl border border-border bg-card">
          <AnimatePresence mode="wait">
            <motion.div
              key={view.key}
              role="tabpanel"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* moldura tipo "janela" */}
              <div className="flex items-center gap-1.5 border-b border-border bg-secondary/40 px-4 py-3">
                <span className="h-2.5 w-2.5 rounded-full bg-muted-foreground/30" />
                <span className="h-2.5 w-2.5 rounded-full bg-muted-foreground/30" />
                <span className="h-2.5 w-2.5 rounded-full bg-muted-foreground/30" />
              </div>
              <div className="aspect-[16/9] w-full bg-background">
                <Figure src={view.image} alt={view.label} label={`Screenshot: ${view.label}`} className="h-full" imgClassName="object-contain" />
              </div>
              <div className="flex flex-col items-start gap-3 border-t border-border px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-sm text-muted-foreground">{view.caption}</p>
                {view.isCourse ? (
                  <Button href={demo.trilha.ctaHref} size="sm" className="shrink-0">
                    {demo.trilha.ctaLabel}
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                ) : (
                  <Button href="#oferta" size="sm" className="shrink-0">
                    Garantir o MEDH-P
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* trilha de cursos da família MEDH — cards sem imagem */}
      <div className="mt-20">
        <div className="flex flex-col items-center gap-3 text-center">
          <Eyebrow>{demo.trilha.eyebrow}</Eyebrow>
          <h3 className="font-display text-2xl font-bold tracking-tight text-foreground md:text-3xl">
            {demo.trilha.title}
          </h3>
          <p className="max-w-2xl text-base text-muted-foreground">{demo.trilha.subtitle}</p>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {demo.trilha.courses.map((c, i) => {
            const isCurrent = c.current;
            return (
              <motion.div
                key={c.code}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.45, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                className={cn(
                  "flex flex-col gap-4 rounded-2xl border p-6 transition-colors",
                  isCurrent
                    ? "border-primary/60 bg-primary/[0.06] shadow-[0_30px_60px_-35px_hsl(var(--primary)/0.5)]"
                    : "border-border bg-card/60"
                )}
              >
                <div className="flex items-center justify-between">
                  <span
                    className={cn(
                      "font-mono text-xs font-bold uppercase tracking-wider",
                      isCurrent ? "text-primary" : "text-foreground/70"
                    )}
                  >
                    {c.code}
                  </span>
                  {isCurrent && (
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/15 px-2.5 py-1 font-mono text-[10px] font-semibold uppercase tracking-wider text-primary">
                      <Check className="h-3 w-3" /> Você está aqui
                    </span>
                  )}
                </div>

                <div className="flex-1">
                  <h4 className="font-display text-xl font-bold text-foreground">{c.name}</h4>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{c.desc}</p>
                </div>

                {isCurrent && (
                  <span className="inline-flex items-center gap-1.5 font-mono text-xs font-semibold uppercase tracking-wider text-primary">
                    Incluso neste treinamento
                    <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* CTA único do pacote completo */}
        <div className="mt-10 flex justify-center">
          <Button href={demo.trilha.ctaHref} size="lg" className="group">
            {demo.trilha.ctaLabel}
            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
          </Button>
        </div>
      </div>
    </Section>
  );
}

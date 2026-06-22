"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Section, SectionHeader } from "@/components/ui/Section";
import { Figure } from "@/components/ui/Figure";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { demo } from "@/content/site";

type View = { key: string; label: string; image: string; caption: string };

export function Demo() {
  // apenas as abas do MEDH-P (área de membros, módulos, materiais)
  const views: View[] = demo.tabs.map((t) => ({
    key: t.key,
    label: t.label,
    image: t.image,
    caption: t.caption,
  }));

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
        {/* abas do MEDH-P */}
        <div
          role="tablist"
          aria-label="Por dentro da plataforma"
          onKeyDown={onKeyDown}
          className="flex flex-wrap justify-center gap-2"
        >
          {views.map((v, i) => renderTab(v, i))}
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
                <Button href="#oferta" size="sm" className="shrink-0">
                  Garantir o MEDH-P
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </Section>
  );
}

"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Section, SectionHeader } from "@/components/ui/Section";
import { Figure } from "@/components/ui/Figure";
import { cn } from "@/lib/utils";
import { demo } from "@/content/site";

export function Demo() {
  const [active, setActive] = useState(0);
  const tab = demo.tabs[active];
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  function onKeyDown(e: React.KeyboardEvent<HTMLDivElement>) {
    const last = demo.tabs.length - 1;
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

  return (
    <Section id="demonstracao" surface="raised" glow="cyan-r" texture>
      <SectionHeader eyebrow={demo.eyebrow} title={demo.title} subtitle={demo.subtitle} />

      <div className="mt-12 flex flex-col gap-6">
        {/* abas */}
        <div role="tablist" aria-label="Demonstrações do método" onKeyDown={onKeyDown} className="flex flex-wrap gap-2">
          {demo.tabs.map((t, i) => (
            <button
              key={t.key}
              ref={(el) => {
                tabRefs.current[i] = el;
              }}
              role="tab"
              id={`demo-tab-${i}`}
              aria-selected={active === i}
              aria-controls={`demo-panel-${i}`}
              tabIndex={active === i ? 0 : -1}
              onClick={() => setActive(i)}
              className={cn(
                "relative rounded-full px-5 py-2.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                active === i ? "text-primary-foreground" : "text-muted-foreground hover:text-foreground"
              )}
            >
              {active === i && (
                <motion.span
                  layoutId="demo-tab"
                  className="absolute inset-0 rounded-full bg-primary"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              <span className="relative z-10">{t.label}</span>
            </button>
          ))}
        </div>

        {/* visualizador */}
        <div className="overflow-hidden rounded-2xl border border-border bg-card">
          <AnimatePresence mode="wait">
            <motion.div
              key={tab.key}
              id={`demo-panel-${active}`}
              role="tabpanel"
              aria-labelledby={`demo-tab-${active}`}
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
                <Figure src={tab.image} alt={tab.label} label={`Screenshot: ${tab.label}`} className="h-full" imgClassName="object-contain" />
              </div>
              <div className="border-t border-border px-6 py-4">
                <p className="text-sm text-muted-foreground">{tab.caption}</p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </Section>
  );
}

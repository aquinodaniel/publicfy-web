"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { Section, SectionHeader } from "@/components/ui/Section";
import { RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { cn } from "@/lib/utils";
import { faq } from "@/content/site";

export function Faq() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <Section id="faq" glow="cyan-r" texture>
      <SectionHeader eyebrow={faq.eyebrow} title={faq.title} align="center" />

      <RevealGroup className="mx-auto mt-12 flex max-w-3xl flex-col gap-3">
        {faq.items.map((item, i) => {
          const isOpen = open === i;
          return (
            <RevealItem key={item.q}>
              <div
                className={cn(
                  "overflow-hidden rounded-xl border bg-card/50 transition-colors",
                  isOpen ? "border-primary/40" : "border-border"
                )}
              >
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  id={`faq-trigger-${i}`}
                  aria-expanded={isOpen}
                  aria-controls={`faq-panel-${i}`}
                  className="flex w-full items-center justify-between gap-4 rounded-xl px-5 py-4 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring"
                >
                  <span className="font-medium text-foreground">{item.q}</span>
                  <motion.span animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
                    <ChevronDown className="h-5 w-5 text-muted-foreground" />
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`faq-panel-${i}`}
                      role="region"
                      aria-labelledby={`faq-trigger-${i}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <p className="px-5 pb-5 text-base leading-relaxed text-muted-foreground">{item.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </RevealItem>
          );
        })}
      </RevealGroup>
    </Section>
  );
}

'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import SectionShell from '@/components/shared/SectionShell';
import Reveal, { StaggerGroup, StaggerItem } from '@/components/motion/Reveal';
import { faq, config } from '@/content/site';

const EASE = [0.22, 0.61, 0.36, 1] as const;

// ============================================================
// FAQ ☀️ — tema LIGHT (SectionShell). Acordeão com vários abertos,
// ícone "+" que gira pra "×". Itens entram com Reveal/stagger ao scrollar.
// Bloco de contato outline com link WhatsApp (config.whatsappNumber).
// aurora só no realce do H2, code e CTA outline.
// ============================================================
export default function FAQ() {
  const [open, setOpen] = useState<Set<number>>(new Set([0]));

  const toggle = (i: number) =>
    setOpen((prev) => {
      const next = new Set(prev);
      next.has(i) ? next.delete(i) : next.add(i);
      return next;
    });

  return (
    <SectionShell theme="light" id="faq">
      {/* Cabeçalho */}
      <Reveal>
        <p className="font-mono text-xs font-bold uppercase tracking-[0.25em] text-cota">
          {faq.eyebrow}
        </p>
      </Reveal>
      <Reveal delay={0.08} as="div">
        <h2 className="mt-4 max-w-3xl text-balance text-2xl font-black leading-tight tracking-tight text-ink md:text-4xl">
          {faq.h2Pre}
          <span className="text-aurora">{faq.h2Destaque}</span>
        </h2>
      </Reveal>

      {/* Acordeão */}
      <StaggerGroup stagger={0.07} className="mx-auto mt-10 max-w-3xl md:mt-12">
        {faq.itens.map((item, i) => {
          const isOpen = open.has(i);
          const panelId = `faq-panel-${i}`;
          const btnId = `faq-btn-${i}`;
          return (
            <StaggerItem key={item.code}>
              <div className="border-b border-ink/10">
                <button
                  id={btnId}
                  onClick={() => toggle(i)}
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  className="flex w-full items-center gap-4 py-5 text-left"
                >
                  <span className="font-mono text-[0.7rem] font-bold tracking-[0.2em] text-cota">
                    {item.code}
                  </span>
                  <span className="flex-1 text-[15px] font-semibold text-ink md:text-lg">
                    {item.q}
                  </span>
                  <motion.span
                    aria-hidden
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.28, ease: EASE }}
                    className="flex h-6 w-6 flex-shrink-0 items-center justify-center text-2xl font-light leading-none text-aurora"
                  >
                    +
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="content"
                      id={panelId}
                      role="region"
                      aria-labelledby={btnId}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: EASE }}
                      className="overflow-hidden"
                    >
                      <p className="max-w-2xl pb-5 pl-[3.1rem] text-sm leading-relaxed text-ink/60 md:text-[15px]">
                        {item.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </StaggerItem>
          );
        })}
      </StaggerGroup>

      {/* Bloco de contato — outline aurora (não preenchido) */}
      <Reveal delay={0.05}>
        <div className="mx-auto mt-12 flex max-w-3xl flex-col items-start gap-4 rounded-2xl border border-aurora/20 p-6 transition-transform duration-200 hover:-translate-y-0.5 md:mt-14 md:flex-row md:items-center md:justify-between md:p-8">
          <div>
            <p className="font-mono text-[0.7rem] font-bold uppercase tracking-[0.25em] text-aurora">
              {faq.contato.eyebrow}
            </p>
            <p className="mt-2 text-lg font-bold text-ink md:text-xl">{faq.contato.h3}</p>
            <p className="mt-1.5 max-w-md text-sm leading-snug text-ink/60">{faq.contato.desc}</p>
          </div>
          {/* TODO produção: confirmar config.whatsappNumber em content/site.ts */}
          <a
            href={`https://wa.me/${config.whatsappNumber}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-shrink-0 rounded-full border border-aurora px-6 py-3 text-sm font-bold text-aurora transition-colors hover:bg-aurora hover:text-white"
          >
            {faq.contato.cta}
          </a>
        </div>
      </Reveal>
    </SectionShell>
  );
}

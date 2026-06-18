'use client';

import { forwardRef } from 'react';
import { AboutEyebrow, AboutHeadingTitle, AboutBioParagraphs } from './aboutContent';

/**
 * Bloco de texto — slot esquerdo do layout flex desktop (fase 2).
 *
 * Hierarquia: eyebrow "Quem sou" → display "Prazer, meu nome é..." (topo) →
 * bio com os parágrafos empilhados, alinhados à esquerda com o título.
 * Tudo estático e visível; o reveal (fade/stagger) é orquestrado em About.tsx.
 */
export const AboutText = forwardRef<HTMLDivElement>(function AboutText(_, ref) {
  return (
    <div
      ref={ref}
      className="
        relative shrink-0 self-start
        pt-[13vh] md:pt-[15vh]
        w-[88%] sm:w-[58%] md:w-[48%] lg:w-[45%] xl:w-[42%]
        max-w-[640px]
        text-bordo
        select-text
      "
    >
      <AboutEyebrow />
      <AboutHeadingTitle />
      <AboutBioParagraphs />
    </div>
  );
});

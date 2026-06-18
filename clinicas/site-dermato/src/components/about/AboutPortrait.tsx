'use client';

import { forwardRef } from 'react';
import Image from 'next/image';

/**
 * PRIMARY — Dobra-02 frontal, centralizada absoluta no palco (fase 1).
 */
export const AboutPortraitPrimary = forwardRef<HTMLDivElement>(function AboutPortraitPrimary(_, ref) {
  return (
    <div
      ref={ref}
      className="
        hidden md:block
        absolute z-[2]
        left-1/2 bottom-0
        -translate-x-1/2
        h-[72vh] md:h-[82vh] lg:h-[86vh]
        pointer-events-none
        will-change-[opacity]
      "
      style={{ aspectRatio: '413 / 671' }}
    >
      <Image
        src="/images/about-portrait.png"
        alt="Retrato de Dra. Tatiani Sabadini"
        fill
        sizes="(min-width: 1024px) 32vw, (min-width: 640px) 50vw, 75vw"
        className="object-contain object-bottom"
        priority={false}
      />
    </div>
  );
});

/**
 * SECONDARY — Dobra-01 perfil espelhado, slot direito do layout flex (fase 2).
 */
export const AboutPortraitSecondary = forwardRef<HTMLDivElement>(function AboutPortraitSecondary(_, ref) {
  return (
    <div
      ref={ref}
      className="
        relative shrink-0 self-end opacity-0
        h-[72vh] md:h-[82vh] lg:h-[86vh]
        will-change-[opacity]
      "
      style={{ aspectRatio: '404 / 627' }}
    >
      <Image
        src="/images/hero-portrait.png"
        alt=""
        aria-hidden="true"
        fill
        sizes="(min-width: 1024px) 32vw, (min-width: 640px) 50vw, 75vw"
        className="object-contain object-bottom"
        style={{ transform: 'scaleX(-1)' }}
        priority={false}
      />
    </div>
  );
});

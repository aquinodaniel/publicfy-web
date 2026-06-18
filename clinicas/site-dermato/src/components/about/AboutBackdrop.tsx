'use client';

import { forwardRef } from 'react';

/**
 * Background typography monumental — "TATIANI / SABADINI".
 * Watermark editorial em opacidade muito baixa, presença dominante na fase 1.
 */
export const AboutBackdrop = forwardRef<HTMLDivElement>(function AboutBackdrop(_, ref) {
  return (
    <div
      ref={ref}
      className="
        absolute inset-0 z-[1] pointer-events-none select-none
        hidden md:flex flex-col items-center justify-center
        overflow-visible
        will-change-[opacity,transform]
      "
      aria-hidden="true"
    >
      <span
        className="
          block font-display font-light leading-[0.82]
          text-bordo/[0.08]
          tracking-[-0.045em] whitespace-nowrap
        "
        style={{ fontSize: 'clamp(7rem, 21vw, 22rem)' }}
      >
        TATIANI
      </span>
      <span
        className="
          block font-display font-light italic leading-[0.82]
          text-bordo/[0.08]
          tracking-[-0.045em] whitespace-nowrap
          -mt-[0.18em]
        "
        style={{ fontSize: 'clamp(7rem, 21vw, 22rem)' }}
      >
        SABADINI
      </span>
    </div>
  );
});

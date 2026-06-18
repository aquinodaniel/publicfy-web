'use client';

import { forwardRef } from 'react';

type Props = {
  outerRef?: React.Ref<HTMLDivElement>;
};

export const HeroContent = forwardRef<HTMLDivElement, Props>(function HeroContent(
  { outerRef },
  ref
) {
  return (
    <div
      ref={outerRef}
      className="
        relative z-30 h-full
        flex flex-col justify-center
        px-6 md:px-10 lg:px-14
        pb-32 md:pb-0
      "
    >
      <div ref={ref} className="max-w-[900px] lg:max-w-[1080px] text-bg">
        {/* Kicker */}
        <div
          data-hero-anim
          className="
            mb-10 md:mb-14
            text-[10px] md:text-[11px]
            tracking-wider2 uppercase
            font-sans font-light
            opacity-90
          "
        >
          <span className="inline-block h-px w-8 align-middle bg-current mr-3" />
          tatiani sabadini — dermatologia
        </div>

        {/* Display headline — realçado */}
        <h1
          className="
            font-display font-normal
            leading-[0.88]
            tracking-[-0.045em]
            text-shadow-soft
          "
          style={{
            fontSize: 'clamp(3.75rem, 11.5vw, 12rem)',
            textShadow: '0 2px 40px rgba(0,0,0,0.35)',
          }}
        >
          <span data-hero-anim className="block overflow-hidden">
            <span className="block">Beleza com</span>
          </span>
          <span data-hero-anim className="block overflow-hidden">
            <span className="block italic font-light">Naturalidade</span>
          </span>
        </h1>

        {/* Subtítulo de especialidades */}
        <p
          data-hero-anim
          className="
            mt-10 md:mt-12
            text-[13px] md:text-[14px]
            tracking-wider2 uppercase
            font-sans font-light
            opacity-90
          "
        >
          Dermatologia <span className="opacity-50 mx-2">•</span>
          Estética <span className="opacity-50 mx-2">•</span>
          Tricologia <span className="opacity-50 mx-2">•</span>
          Cirurgia Dermatológica
        </p>

        {/* Lead text */}
        <p
          data-hero-anim
          className="
            mt-8 md:mt-10
            max-w-[460px]
            font-sans font-light
            text-[17px] md:text-[19px] leading-[1.6]
            opacity-95
          "
        >
          Realce sua beleza de forma natural, segura e com resultados que
          valorizam quem você é.
        </p>

      </div>

      {/* Linha inferior — só CRM à esquerda + scroll hint ao centro */}
      <div
        data-hero-anim
        className="
          absolute left-6 md:left-10 lg:left-14
          bottom-6 md:bottom-8
          flex items-end gap-10
          text-bg/70 text-[10px] tracking-wider2 uppercase font-sans
        "
      >
        <span>CRM 198.372</span>
        <span className="hidden md:inline-flex items-center gap-2 opacity-80">
          <span className="inline-block h-px w-6 bg-current" />
          Role para descobrir
        </span>
      </div>
    </div>
  );
});

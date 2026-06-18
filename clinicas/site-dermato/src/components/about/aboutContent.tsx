'use client';

/**
 * Conteúdo textual da seção "Quem sou", extraído para ser reutilizado pelos
 * dois arranjos (desktop em `AboutText` e mobile em `About`).
 *
 * Os subcomponentes carregam classes responsivas (`md:`): como cada arranjo só
 * é exibido no seu breakpoint, o mesmo componente serve aos dois sem variantes.
 * Os itens animáveis ficam marcados com `data-about-anim` — o reveal/stagger é
 * orquestrado pela timeline em `About.tsx` (escopado por container).
 */

export const PARAGRAPHS: string[] = [
  'Minha trajetória é marcada por dedicação, estudo e amor pela dermatologia — uma especialidade que vai muito além da estética: é sobre saúde, equilíbrio e confiança.',
  'Sou médica formada com Pós-Graduação em Medicina Estética e em Dermatologia Clínica, o que me permite cuidar dos meus pacientes de forma completa — da prevenção e tratamento de doenças de pele, cabelo e unhas até os procedimentos estéticos mais avançados.',
  'Acredito que a verdadeira beleza é aquela que respeita a naturalidade. Por isso, cada tratamento é planejado de forma individual, com o objetivo de valorizar o que cada pessoa tem de mais bonito.',
];

/** Kicker "Quem sou". */
export function AboutEyebrow() {
  return (
    <div
      data-about-anim
      className="
        mb-6 md:mb-8
        flex items-center gap-3
        text-[13px] md:text-[14px] tracking-[0.18em] uppercase
        font-sans font-light text-bordo/70
      "
    >
      <span className="inline-block h-px w-10 bg-current opacity-70" />
      Quem sou
    </div>
  );
}

/**
 * Frase de abertura — continua o título (que termina em vírgula), como no
 * site original. Tom mais presente que a bio (lead).
 */
export function AboutLead() {
  return (
    <p
      data-about-anim
      className="font-sans font-light leading-[1.7] text-bordo max-w-[480px]"
      style={{ fontSize: 'clamp(18px, 1.5vw, 22px)' }}
    >
      sou médica apaixonada por transformar vidas através do cuidado com a pele,
      o corpo e a autoestima.
    </p>
  );
}

/** Título display — herdado do site original. */
export function AboutHeadingTitle() {
  return (
    <h2
      data-about-anim
      className="
        font-display font-light
        leading-[0.98] tracking-[-0.02em]
        mb-8 md:mb-10
      "
      style={{ fontSize: 'clamp(2.25rem, 5vw, 4.25rem)' }}
    >
      Prazer, meu nome é <span className="italic">Tatiani Sabadini,</span>
    </h2>
  );
}

/**
 * Bio — parágrafos empilhados, alinhados à esquerda com o título e o eyebrow.
 * Tom um pouco mais escuro que o bordô para presença.
 */
export function AboutBioParagraphs() {
  return (
    <div className="flex flex-col gap-6 md:gap-8 max-w-[480px] text-[#360711]">
      {PARAGRAPHS.map((p, i) => (
        <p
          key={i}
          data-about-anim
          className="font-sans font-light leading-[1.75]"
          style={{ fontSize: 'clamp(17px, 1.35vw, 19px)' }}
        >
          {p}
        </p>
      ))}
    </div>
  );
}

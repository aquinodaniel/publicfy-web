/**
 * Ícones line-art das áreas de atuação.
 *
 * Cada traço relevante é marcado com `data-draw` (caminhos animáveis pelo efeito
 * de "desenho" via stroke-dashoffset) ou `data-fade` (detalhes que só surgem por
 * opacidade — ex. linha pontilhada da incisão). A orquestração fica em
 * `drawIcon.ts`; aqui só descrevemos a geometria.
 *
 * viewBox 0 0 64 64 · stroke = currentColor (herda a cor bordô do card).
 */

type IconProps = { className?: string };

const baseProps = {
  viewBox: '0 0 64 64',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.4,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  'aria-hidden': true,
};

/** Clínica Dermatológica — camadas de pele + brilho (saúde da pele). */
export function ClinicaIcon({ className }: IconProps) {
  return (
    <svg className={className} {...baseProps}>
      {/* brilho / sparkle */}
      <path data-draw d="M42 12 C 43 18 46 21 51 22 C 46 23 43 26 42 32 C 41 26 38 23 33 22 C 38 21 41 18 42 12 Z" />
      <path data-draw d="M22 16 C 22.6 19 24.4 20.8 27 21.4 C 24.4 22 22.6 23.8 22 26.8 C 21.4 23.8 19.6 22 17 21.4 C 19.6 20.8 21.4 19 22 16 Z" />
      {/* camadas de pele */}
      <path data-draw d="M9 41 q 6 -4.5 12 0 t 12 0 t 12 0 t 11 0" />
      <path data-draw d="M9 49 q 6 -4.5 12 0 t 12 0 t 12 0 t 11 0" />
      <path data-draw d="M9 57 q 6 -4.5 12 0 t 12 0 t 12 0 t 11 0" />
    </svg>
  );
}

/** Tricologia — couro cabeludo, raízes e fios (saúde capilar). */
export function TricologiaIcon({ className }: IconProps) {
  return (
    <svg className={className} {...baseProps}>
      {/* fios */}
      <path data-draw d="M22 44 C 21 35 25 31 24 22 C 23.4 17 26 14 28 12.5" />
      <path data-draw d="M32 44 C 32 33 34 29 33.2 20 C 33 15.5 35 13 36.5 11.5" />
      <path data-draw d="M42 44 C 41 35 44 32 43 23 C 43 18 45 15.5 47 14" />
      {/* couro cabeludo */}
      <path data-draw d="M14 45 q 18 6 36 0" />
      {/* raízes */}
      <path data-draw d="M22 45 L 20.5 52 M22 45 L 24 52" />
      <path data-draw d="M32 45 L 30.5 53 M32 45 L 34 53" />
      <path data-draw d="M42 45 L 40.5 52 M42 45 L 44 52" />
    </svg>
  );
}

/** Estética Médica — rosto de frente (harmonização facial). */
export function EsteticaIcon({ className }: IconProps) {
  return (
    <svg className={className} {...baseProps}>
      {/* contorno do rosto */}
      <path data-draw d="M24 23 C 22 31 22.5 40 28 46 C 31 49 33 49 36 46 C 41.5 40 42 31 40 23" />
      {/* cabelo */}
      <path data-draw d="M23 25 C 22 12 42 12 41 25" />
      {/* olhos */}
      <path data-draw d="M27 31 q 2.2 -2.2 4.4 0" />
      <path data-draw d="M32.6 31 q 2.2 -2.2 4.4 0" />
      {/* nariz */}
      <path data-draw d="M32 33 L 30.8 39 q 1.2 1.1 2.4 0" />
      {/* boca */}
      <path data-draw d="M28.5 42 q 3.5 2.4 7 0" />
    </svg>
  );
}

/** Cirurgia Dermatológica — bisturi + linha de incisão. */
export function CirurgiaIcon({ className }: IconProps) {
  return (
    <svg className={className} {...baseProps}>
      {/* lâmina */}
      <path data-draw d="M36 12 L 42 18 L 30 30 L 25.5 25.5 Z" />
      {/* cabo */}
      <path data-draw d="M27.7 27.7 L 16 41" strokeWidth={2.2} />
      <path data-draw d="M16 41 L 12 47" />
      {/* incisão (detalhe pontilhado) */}
      <path data-fade d="M14 52 H 50" strokeDasharray="1.5 4.5" />
    </svg>
  );
}

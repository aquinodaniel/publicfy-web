'use client';

/**
 * Atmosfera de fundo da seção "Quem sou".
 *
 * Três camadas sutis para o fundo não ficar chapado, sem perder o minimalismo:
 *  1. Gradiente de luz — variação tonal (luz vinda de cima/direita).
 *  2. Brilho quente (wine #963845) bem desfocado — um sopro de cor da marca.
 *  3. Grão / textura de filme — granulação orgânica de sites editoriais.
 *
 * Fica atrás do conteúdo (z-0) e não captura ponteiro.
 */

// Ruído gerado por SVG (feTurbulence) embutido como data-uri.
const NOISE =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.82' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E";

export function AboutAtmosphere() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none" aria-hidden="true">
      {/* 1. Gradiente de luz */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(135% 95% at 72% 6%, #E5DCD8 0%, #D9CFCC 44%, #C9BEBA 100%)',
        }}
      />

      {/* 2. Brilho quente da marca (wine), desfocado */}
      <div
        className="absolute -top-[18%] right-[2%] h-[62vh] w-[62vh] rounded-full opacity-30 blur-[130px]"
        style={{
          background:
            'radial-gradient(circle, rgba(150,56,69,0.22) 0%, rgba(150,56,69,0) 70%)',
        }}
      />
      {/* brilho frio de contrapeso, no canto oposto */}
      <div
        className="absolute bottom-[-12%] left-[-6%] h-[48vh] w-[48vh] rounded-full opacity-25 blur-[120px]"
        style={{
          background:
            'radial-gradient(circle, rgba(79,9,17,0.16) 0%, rgba(79,9,17,0) 70%)',
        }}
      />

      {/* 3. Grão / textura de filme */}
      <div
        className="absolute inset-0 opacity-[0.06] mix-blend-multiply"
        style={{
          backgroundImage: `url("${NOISE}")`,
          backgroundSize: '200px 200px',
        }}
      />
    </div>
  );
}

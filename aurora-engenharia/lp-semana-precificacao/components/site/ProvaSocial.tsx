'use client';

import Reveal from '@/components/motion/Reveal';
import { asset } from '@/lib/asset';

// ============================================================
// 5 · PROVA SOCIAL 🌑 — réplica fiel da seção "depoimentos" da Imersão:
// mural 3D de prints reais (WhatsApp) em 3 colunas com marquee vertical em
// velocidades distintas, plano inclinado em 3D + máscara de fade no topo/base.
// Imagens em /public/depoimentos/01..08.webp · CSS em globals.css (.testi-*).
// ============================================================

// cada coluna: imagens únicas — duplicadas no track p/ loop perfeito do marquee
const COLUNAS = [
  { anim: 'testi-anim-up-22', imgs: [1, 4, 7] },
  { anim: 'testi-anim-down-26', imgs: [2, 5, 8] },
  { anim: 'testi-anim-up-30', imgs: [3, 6] }
] as const;

const MASK = 'linear-gradient(transparent 0%, black 12%, black 88%, transparent 100%)';

export default function ProvaSocial() {
  return (
    <section
      id="prova"
      className="relative overflow-hidden py-12 text-white md:py-16"
      style={{ background: 'linear-gradient(135deg, #061319 0%, #0a1f26 50%, #0e2530 100%)' }}
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 blueprint-bg opacity-50" />

      <div className="container-x relative">
        <Reveal>
          <h2 className="h2 max-w-3xl text-center text-white md:mx-auto">
            O que dizem quem já passou <span className="text-gold-gradient">por aqui</span>.
          </h2>
        </Reveal>

        <Reveal delay={0.1}>
          <div
            className="testimonials-3d-wrap mt-8 md:mt-10"
            style={{
              perspective: '900px',
              height: '560px',
              overflow: 'hidden',
              position: 'relative',
              maskImage: MASK,
              WebkitMaskImage: MASK
            }}
          >
            <div
              className="testimonials-3d-inner grid h-full gap-3"
              style={{
                gridTemplateColumns: 'repeat(3, 1fr)',
                transform: 'rotateX(14deg) rotateY(-6deg) rotateZ(2deg)',
                transformOrigin: 'center center'
              }}
            >
              {COLUNAS.map((col, ci) => (
                <div key={ci} className="testi-col h-full overflow-hidden">
                  <div className={`testi-track flex flex-col gap-3 ${col.anim}`}>
                    {[...col.imgs, ...col.imgs].map((n, i) => (
                      <div
                        key={i}
                        className="testi-card flex flex-shrink-0 overflow-hidden"
                        style={{
                          background: 'rgba(228, 201, 137, 0.04)',
                          border: '1px solid rgba(201, 169, 97, 0.22)',
                          borderRadius: '10px'
                        }}
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={asset(`/depoimentos/${String(n).padStart(2, '0')}.webp`)}
                          alt={`Depoimento ${n}`}
                          loading="lazy"
                          decoding="async"
                          className="block h-auto w-full"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

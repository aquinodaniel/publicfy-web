import { gsap } from 'gsap';

/**
 * Animação de "desenho" dos ícones line-art.
 *
 * Técnica clássica sem plugins pagos: medimos o comprimento de cada traço com
 * getTotalLength() e animamos strokeDashoffset de `len` → 0, dando a sensação de
 * que a linha está sendo desenhada. Os detalhes marcados com `data-fade` (ex.
 * linha pontilhada) só entram por opacidade, pois seu dasharray é decorativo.
 */

type DrawOpts = { duration?: number; stagger?: number; delay?: number; ease?: string };

function drawables(svg: SVGSVGElement) {
  return svg.querySelectorAll<SVGGeometryElement>('[data-draw]');
}

/** Esconde os traços (offset = comprimento total) — chamar antes de revelar. */
export function prepareIcon(svg: SVGSVGElement | null) {
  if (!svg) return;
  drawables(svg).forEach((el) => {
    const len = el.getTotalLength();
    gsap.set(el, { strokeDasharray: len, strokeDashoffset: len });
  });
  gsap.set(svg.querySelectorAll('[data-fade]'), { opacity: 0 });
}

/** Mostra os traços já desenhados (estado final) — usado em reduced-motion. */
export function revealIconInstant(svg: SVGSVGElement | null) {
  if (!svg) return;
  gsap.set(drawables(svg), { strokeDasharray: 'none', strokeDashoffset: 0 });
  gsap.set(svg.querySelectorAll('[data-fade]'), { opacity: 1 });
}

/** Desenha o ícone com stagger entre os traços. */
export function drawIcon(svg: SVGSVGElement | null, opts: DrawOpts = {}) {
  if (!svg) return;
  const { duration = 0.9, stagger = 0.08, delay = 0, ease = 'power2.inOut' } = opts;
  const draws = drawables(svg);
  const fades = svg.querySelectorAll('[data-fade]');
  const tl = gsap.timeline({ delay });
  tl.to(draws, { strokeDashoffset: 0, duration, stagger, ease }, 0);
  if (fades.length) tl.to(fades, { opacity: 1, duration: 0.45, ease: 'power1.out' }, duration * 0.55);
  return tl;
}

/** Re-traça o ícone rapidamente — gatilho de hover. */
export function redrawIcon(svg: SVGSVGElement | null) {
  if (!svg) return;
  drawables(svg).forEach((el) => {
    const len = el.getTotalLength();
    gsap.fromTo(
      el,
      { strokeDasharray: len, strokeDashoffset: len },
      { strokeDashoffset: 0, duration: 0.7, ease: 'power2.out' },
    );
  });
}

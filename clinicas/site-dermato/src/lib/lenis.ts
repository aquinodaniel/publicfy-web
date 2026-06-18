import type Lenis from 'lenis';

// Registro singleton da instância do Lenis criada no SmoothScrollProvider.
// Permite que outros componentes (ex.: menu mobile) parem/retomem o smooth
// scroll sem precisar passar a instância por contexto.
let instance: Lenis | null = null;

export function registerLenis(lenis: Lenis | null) {
  instance = lenis;
}

export function getLenis() {
  return instance;
}

// Trava o scroll. Funciona com Lenis ativo (lenis.stop) e também como
// fallback puro de CSS quando o usuário prefere movimento reduzido (sem Lenis).
export function lockScroll() {
  if (typeof document === 'undefined') return;
  instance?.stop();
  document.documentElement.classList.add('menu-open');
}

export function unlockScroll() {
  if (typeof document === 'undefined') return;
  instance?.start();
  document.documentElement.classList.remove('menu-open');
}

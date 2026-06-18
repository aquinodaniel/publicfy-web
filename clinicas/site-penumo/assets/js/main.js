/* =====================================================================
   Dra. Luana Vilches — Site dinâmico
   GSAP + ScrollTrigger + Lenis
   ===================================================================== */

(() => {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // -------------------- Lenis smooth scroll --------------------
  let lenis;
  if (!prefersReducedMotion && typeof Lenis !== 'undefined') {
    lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      smoothTouch: false,
      touchMultiplier: 1.5,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
  }

  // -------------------- GSAP setup --------------------
  if (typeof gsap === 'undefined') return;
  if (typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);

    if (lenis) {
      lenis.on('scroll', ScrollTrigger.update);
      gsap.ticker.add((time) => lenis.raf(time * 1000));
      gsap.ticker.lagSmoothing(0);
    }
  }

  // -------------------- Init --------------------
  const start = () => {
    initHeader();
    initBurger();
    initHeroIntro();
    initReveals();
    initParallax();
    initSymptomRotation();
    initSectionVideo();
  };

  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(start);
  } else {
    window.addEventListener('load', start);
  }

  // -------------------- HEADER (auto-hide por direção de scroll) --------------------
  function initHeader() {
    const header = document.querySelector('[data-header]');
    if (!header) return;

    const TOP = 80;   // perto do topo: sempre visível
    const DELTA = 4;  // ignora micro-movimentos
    let last = 0;

    // direção calculada pela posição (robusto sob scroll suave)
    const apply = (y) => {
      if (y < TOP) { header.classList.remove('is-hidden'); last = y; return; }
      if (y > last + DELTA) header.classList.add('is-hidden');       // desceu → some
      else if (y < last - DELTA) header.classList.remove('is-hidden'); // subiu → aparece
      last = y;
    };

    // ScrollTrigger já está integrado ao Lenis neste site → dispara a cada update
    if (typeof ScrollTrigger !== 'undefined') {
      ScrollTrigger.create({ start: 0, end: 'max', onUpdate: (self) => apply(self.scroll()) });
    }
    // Lenis (quando ativo) também emite scroll — redundância segura
    if (lenis && typeof lenis.on === 'function') {
      lenis.on('scroll', (e) => apply((e && (e.animatedScroll ?? e.scroll)) || window.scrollY || 0));
    }
    // Fallback nativo — sempre ligado, idempotente
    window.addEventListener('scroll', () => apply(window.scrollY || 0), { passive: true });
  }

  // -------------------- BURGER (mobile menu) --------------------
  function initBurger() {
    const burger = document.querySelector('[data-burger]');
    const menu = document.querySelector('.header__menu');
    if (!burger || !menu) return;

    burger.addEventListener('click', () => {
      const isOpen = menu.classList.toggle('is-open');
      burger.classList.toggle('is-open', isOpen);
      burger.setAttribute('aria-expanded', String(isOpen));
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Fechar menu ao clicar em link
    menu.querySelectorAll('a').forEach((a) => {
      a.addEventListener('click', () => {
        menu.classList.remove('is-open');
        burger.classList.remove('is-open');
        burger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });
  }

  // -------------------- HERO intro --------------------
  function initHeroIntro() {
    if (prefersReducedMotion) return;

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    // clearProps: remove transform/opacity inline ao fim, senão o auto-hide
    // (que usa transform/opacity via classe) fica bloqueado pelo estilo inline
    tl.from('.header', { y: -20, opacity: 0, duration: 0.9, clearProps: 'opacity,transform' }, 0);

    // Figura: garante visível (era [data-reveal]) e revela a foto + anéis
    gsap.set('.hero__figure', { opacity: 1, y: 0 });
    tl.fromTo('.hero__figure img',
      { opacity: 0, yPercent: 8, scale: 1.05 },
      { opacity: 1, yPercent: 0, scale: 1, duration: 1.4, ease: 'expo.out' },
    0.2);

    // Copy (kicker, corpo, ações) — exceto a headline
    const copyItems = gsap.utils
      .toArray('.hero__copy [data-reveal]')
      .filter((el) => !el.classList.contains('hero__headline'));
    tl.to(copyItems, { opacity: 1, y: 0, duration: 1, stagger: 0.12 }, 0.3);

    // Headline com ritmo: linha a linha, de baixo pra cima
    gsap.set('.hero__headline', { opacity: 1, y: 0 });
    tl.from('.hero__line',
      { yPercent: 120, opacity: 0, duration: 0.95, stagger: 0.09, ease: 'power4.out' },
    0.25);
  }

  // -------------------- PARALLAX (fotos da Dra.) --------------------
  function initParallax() {
    if (prefersReducedMotion || !ScrollTrigger) return;

    document.querySelectorAll('[data-parallax]').forEach((el) => {
      const img = el.querySelector('img');
      if (!img) return;
      gsap.to(img, {
        yPercent: -8,
        ease: 'none',
        scrollTrigger: {
          trigger: el,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
      });
    });
  }

  // -------------------- SYMPTOM ROTATION (Quando procurar) --------------------
  // Destaca cada card por um período, conduzindo a leitura. A barra de
  // progresso (CSS) dirige o avanço: ao terminar, passa para o próximo.
  function initSymptomRotation() {
    const list = document.querySelector('.symptom-list');
    const tabs = Array.from(document.querySelectorAll('.symptom-item'));
    if (!list || !tabs.length) return;

    let idx = Math.max(0, tabs.findIndex((t) => t.classList.contains('is-active')));

    const setActive = (i) => {
      idx = (i + tabs.length) % tabs.length;
      tabs.forEach((t, k) => {
        const active = k === idx;
        t.classList.toggle('is-active', active);
        t.setAttribute('aria-selected', String(active));
      });
    };

    // Pausa para o usuário ler com calma (hover/foco); retoma ao sair.
    const pause = () => list.classList.add('is-paused');
    const resume = () => list.classList.remove('is-paused');
    list.addEventListener('mouseenter', pause);
    list.addEventListener('mouseleave', resume);
    list.addEventListener('focusin', pause);
    list.addEventListener('focusout', resume);

    tabs.forEach((tab, i) => {
      tab.addEventListener('click', () => setActive(i));
      tab.addEventListener('keydown', (e) => {
        if (e.key !== 'ArrowDown' && e.key !== 'ArrowUp') return;
        e.preventDefault();
        setActive(e.key === 'ArrowDown' ? idx + 1 : idx - 1);
        tabs[idx].focus();
      });
    });

    if (prefersReducedMotion) return; // sem auto-rotação

    // A barra do card ativo termina → avança para o próximo.
    list.addEventListener('animationend', (e) => {
      if (e.animationName === 'symptomBar') setActive(idx + 1);
    });
  }

  // -------------------- SECTION VIDEO (autoplay mudo, pausa por clique) --------------------
  function initSectionVideo() {
    const frame = document.querySelector('[data-video]');
    if (!frame) return;
    const video = frame.querySelector('video');
    const hit = frame.querySelector('.video-frame__hit');
    if (!video) return;

    video.muted = true; // garante autoplay
    let userPaused = false;

    const sync = () => frame.classList.toggle('is-paused', video.paused);
    video.addEventListener('play', sync);
    video.addEventListener('pause', sync);

    if (hit) {
      hit.addEventListener('click', () => {
        if (video.paused) { userPaused = false; video.play().catch(() => {}); }
        else { userPaused = true; video.pause(); }
      });
    }

    if (prefersReducedMotion) {
      userPaused = true;
      video.pause();
      sync();
      return;
    }

    // pausa fora da viewport; retoma se o usuário não pausou manualmente
    if ('IntersectionObserver' in window) {
      const io = new IntersectionObserver((entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting && !userPaused) video.play().catch(() => {});
          else if (!en.isIntersecting) video.pause();
        });
      }, { threshold: 0.25 });
      io.observe(frame);
    } else {
      video.play().catch(() => {});
    }

    sync();
  }

  // -------------------- REVEAL on scroll (outras seções) --------------------
  function initReveals() {
    if (prefersReducedMotion || !ScrollTrigger) {
      document.querySelectorAll('[data-reveal]').forEach((el) => {
        el.style.opacity = 1;
        el.style.transform = 'none';
      });
      return;
    }

    document.querySelectorAll('[data-reveal]').forEach((el) => {
      // Hero items são animados pela intro timeline
      if (el.closest('.hero')) return;

      gsap.to(el, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      });
    });
  }
})();

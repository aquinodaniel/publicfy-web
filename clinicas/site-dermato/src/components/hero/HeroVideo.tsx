'use client';

import { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';

const INTRO_SRC = '/videos/hero-intro.mp4';
const LOOP_SRC = '/videos/hero-loop.mp4';

export function HeroVideo() {
  const introRef = useRef<HTMLVideoElement>(null);
  const loopRef = useRef<HTMLVideoElement>(null);
  const [phase, setPhase] = useState<'intro' | 'loop'>('intro');
  const [paused, setPaused] = useState(false);

  // ── Cicla intro → loop → intro → loop … infinitamente, sem corte visível
  useEffect(() => {
    const intro = introRef.current;
    const loop = loopRef.current;
    if (!intro || !loop) return;

    const tryPlay = (v: HTMLVideoElement) => v.play().catch(() => undefined);

    intro.currentTime = 0;
    tryPlay(intro);
    loop.load();

    const handleIntroEnded = () => {
      loop.currentTime = 0;
      tryPlay(loop);
      setPhase('loop');
    };

    const handleLoopEnded = () => {
      intro.currentTime = 0;
      tryPlay(intro);
      setPhase('intro');
    };

    intro.addEventListener('ended', handleIntroEnded);
    loop.addEventListener('ended', handleLoopEnded);

    // fallback de autoplay no primeiro toque (mobile)
    const onTouch = () => {
      const active = intro.paused && loop.paused ? intro : intro.paused ? loop : intro;
      tryPlay(active);
      window.removeEventListener('touchstart', onTouch);
    };
    window.addEventListener('touchstart', onTouch, { once: true });

    return () => {
      intro.removeEventListener('ended', handleIntroEnded);
      loop.removeEventListener('ended', handleLoopEnded);
      window.removeEventListener('touchstart', onTouch);
    };
  }, []);

  // ── Pause/Play handler — sempre age no vídeo ativo
  const togglePause = () => {
    const active = phase === 'intro' ? introRef.current : loopRef.current;
    if (!active) return;
    if (active.paused) {
      active.play().catch(() => undefined);
      setPaused(false);
    } else {
      active.pause();
      setPaused(true);
    }
  };

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* INTRO — fica por cima até terminar */}
      <video
        ref={introRef}
        className={clsx(
          'absolute inset-0 h-full w-full object-cover scale-[1.02]',
          'transition-opacity duration-700 ease-out',
          phase === 'intro' ? 'opacity-100 z-[2]' : 'opacity-0 z-[1]'
        )}
        autoPlay
        muted
        playsInline
        preload="auto"
        poster="/images/hero-portrait.png"
        aria-hidden="true"
      >
        <source src={INTRO_SRC} type="video/mp4" />
      </video>

      {/* LOOP — entra quando intro termina, em loop infinito */}
      <video
        ref={loopRef}
        className={clsx(
          'absolute inset-0 h-full w-full object-cover scale-[1.02]',
          'transition-opacity duration-700 ease-out',
          phase === 'loop' ? 'opacity-100 z-[2]' : 'opacity-0 z-[1]'
        )}
        muted
        playsInline
        preload="auto"
        aria-hidden="true"
      >
        <source src={LOOP_SRC} type="video/mp4" />
      </video>

      {/* Overlay escuro 30% para legibilidade do texto */}
      <div className="absolute inset-0 bg-ink/30 z-[3]" aria-hidden="true" />

      {/* Vinheta sutil */}
      <div
        className="absolute inset-0 pointer-events-none z-[3]"
        style={{
          background:
            'radial-gradient(ellipse at center, transparent 50%, rgba(2,1,1,0.35) 100%)',
        }}
        aria-hidden="true"
      />

      {/* Gradient inferior */}
      <div
        className="absolute inset-x-0 bottom-0 h-32 pointer-events-none z-[3]"
        style={{
          background:
            'linear-gradient(to bottom, transparent, rgba(2,1,1,0.4))',
        }}
        aria-hidden="true"
      />

      {/* Botão de pause/play — canto inferior direito */}
      <button
        type="button"
        onClick={togglePause}
        aria-label={paused ? 'Retomar vídeo' : 'Pausar vídeo'}
        aria-pressed={paused}
        className="
          absolute z-40
          bottom-6 right-6 md:bottom-8 md:right-10 lg:right-14
          group flex items-center gap-3
          text-bg/80 hover:text-bg
          transition-colors duration-500
        "
      >
        <span
          className="
            flex h-10 w-10 items-center justify-center
            rounded-full border border-bg/30 group-hover:border-bg/70
            backdrop-blur-[2px]
            transition-colors duration-500
          "
        >
          {paused ? (
            // play icon
            <svg width="10" height="12" viewBox="0 0 10 12" fill="none" aria-hidden="true">
              <path d="M0 0L10 6L0 12V0Z" fill="currentColor" />
            </svg>
          ) : (
            // pause icon (duas barrinhas finas)
            <svg width="10" height="12" viewBox="0 0 10 12" fill="none" aria-hidden="true">
              <rect x="1" y="0" width="2.4" height="12" fill="currentColor" />
              <rect x="6.6" y="0" width="2.4" height="12" fill="currentColor" />
            </svg>
          )}
        </span>
        <span className="hidden md:inline text-[10px] tracking-wider2 uppercase font-sans">
          {paused ? 'Play' : 'Pause'}
        </span>
      </button>
    </div>
  );
}

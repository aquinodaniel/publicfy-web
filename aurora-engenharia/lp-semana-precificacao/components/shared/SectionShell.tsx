import type { ReactNode } from 'react';

// ============================================================
// SectionShell — wrapper de seção: tema dark/light, halo opcional, grid leve,
// padding e container. Mantém o ritmo visual consistente entre seções.
// dark  = bg-ink + (halo radial teal opcional)
// light = bg-paper + grid de cruzinhas (técnico, arejado)
// ============================================================
function cn(...xs: (string | false | undefined)[]) {
  return xs.filter(Boolean).join(' ');
}

type Props = {
  theme: 'dark' | 'light';
  id?: string;
  halo?: boolean;
  className?: string;
  containerClassName?: string;
  children: ReactNode;
};

export default function SectionShell({
  theme,
  id,
  halo = false,
  className = '',
  containerClassName = '',
  children
}: Props) {
  const dark = theme === 'dark';
  return (
    <section
      id={id}
      className={cn(
        'relative overflow-hidden py-20 md:py-28',
        dark ? 'bg-ink text-paper' : 'bg-paper text-ink',
        className
      )}
    >
      {dark && (
        <>
          {/* gradiente radial sutil */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              background: 'radial-gradient(ellipse 75% 60% at 50% 25%, rgba(0,101,123,0.10), transparent 70%)'
            }}
          />
          {/* grid técnico quase invisível */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-cross-dark bg-[length:64px_64px] opacity-40"
          />
        </>
      )}
      {dark && halo && (
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-aurora-glow/10 blur-[120px]"
        />
      )}
      {!dark && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-cross-light bg-[length:64px_64px] opacity-70"
        />
      )}
      <div className={cn('relative z-10 mx-auto w-full max-w-6xl px-5 md:px-8', containerClassName)}>
        {children}
      </div>
    </section>
  );
}

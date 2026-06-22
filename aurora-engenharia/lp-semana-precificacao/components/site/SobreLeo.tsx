'use client';

import { leo, config } from '@/content/site';
import SectionShell from '@/components/shared/SectionShell';
import MaskReveal from '@/components/motion/MaskReveal';
import CountUp from '@/components/motion/CountUp';

// ============================================================
// 8 · O MENTOR ☀️ — tema LIGHT. Autoridade do Leo.
// Layout 2 colunas: foto à esquerda (mesma altura do texto), texto à direita.
// PROTAGONISTAS: os 3 stats (CountUp grande que sobe ao entrar).
// Copy 100% em `leo`. Tokens: text-aurora, text-cota, text-ink, font-mono.
// ============================================================

export default function SobreLeo() {
  const lastIdx = leo.stats.length - 1;

  return (
    <SectionShell theme="light" id="sobre-leo">
      <div className="grid gap-10 md:grid-cols-[0.85fr_1.15fr] md:items-stretch md:gap-14">
        {/* ── FOTO (mesma altura do texto à direita) ── */}
        <MaskReveal variant="wipe" className="relative h-full">
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl bg-ink/10 md:aspect-auto md:h-full">
            {/* placeholder fica atrás; se a imagem não existir, mostra o bg-ink/10 */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={leo.fotoSrc}
              alt={leo.nome}
              loading="lazy"
              className="relative z-10 h-full w-full object-cover object-top"
            />
            {/* tag FICHA · 001 sobre a foto */}
            <span className="absolute bottom-3 left-3 z-30 rounded-full border border-ink/15 bg-paper/85 px-3 py-1 font-mono text-[0.7rem] uppercase tracking-[0.2em] text-cota backdrop-blur">
              {leo.fotoTag}
            </span>
          </div>
        </MaskReveal>

        {/* ── TEXTO ── */}
        <div>
          <h2 className="text-3xl font-black leading-tight tracking-tight text-ink md:text-4xl">
            {leo.h2Pre}
            <span className="text-aurora">{leo.h2Destaque}</span>
          </h2>

          <div className="mt-5">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-cota">
              ▸ {leo.tag}
            </p>
            <p className="mt-1 text-2xl font-black tracking-tight text-ink md:text-3xl">
              {leo.nome}
            </p>
            <p className="mt-0.5 text-sm text-ink/60">{leo.subtitulo}</p>
          </div>

          <div className="mt-6 space-y-4 text-base leading-relaxed text-ink/70">
            {leo.bio.map((par, i) => (
              <MaskReveal key={i} as="p" variant="glow" delay={i * 0.08}>
                {par}
              </MaskReveal>
            ))}
          </div>

          {/* ── STATS · protagonistas (CountUp sobe ao entrar) ── */}
          <div className="mt-9 grid grid-cols-3 gap-4 border-t border-ink/10 pt-6">
            {leo.stats.map((s, i) => (
              <div key={s.code}>
                <CountUp
                  to={s.value}
                  decimals={s.decimals}
                  suffix={s.suffix}
                  grouped={s.decimals === 0 && s.value >= 1000}
                  className={`block text-3xl font-black tabular-nums tracking-tight md:text-4xl ${
                    i === lastIdx ? 'text-aurora' : 'text-ink'
                  }`}
                />
                <p className="mt-1.5 text-xs leading-snug text-cota">{s.label}</p>
                <p className="mt-1 font-mono text-[0.65rem] uppercase tracking-[0.2em] text-ink/40">
                  {s.code}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── CONTATO WHATSAPP — cópia fiel da imersão: card branco centralizado ── */}
      {/* TODO produção: confirmar config.whatsappNumber em content/site.ts */}
      <div className="mt-12 rounded-2xl border border-ink/10 bg-white px-6 py-10 text-center shadow-stamp md:mt-14 md:px-10 md:py-12">
        <p className="mx-auto max-w-2xl text-xl font-medium leading-snug text-ink md:text-2xl">
          {leo.contato.texto}
        </p>
        <a
          href={`https://wa.me/${config.whatsappNumber}?text=${encodeURIComponent(
            'Olá! Tenho uma dúvida sobre a Semana da Precificação.'
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-7 inline-flex items-center justify-center gap-3 whitespace-nowrap rounded-full bg-[#25D366] px-8 py-3.5 text-sm font-bold uppercase tracking-[0.08em] text-white shadow-[0_0_30px_rgba(37,211,102,.45)] transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98]"
        >
          <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className="h-5 w-5">
            <path d="M19.05 4.91A9.82 9.82 0 0 0 12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.91-7zM12.04 20.15h-.01a8.2 8.2 0 0 1-4.18-1.15l-.3-.18-3.12.82.83-3.04-.19-.31a8.21 8.21 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24 2.2 0 4.27.86 5.83 2.42a8.18 8.18 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.25 8.24zm4.52-6.16c-.25-.13-1.46-.72-1.69-.8-.23-.08-.39-.13-.56.13-.16.25-.64.8-.78.96-.14.16-.29.18-.54.06-.25-.13-1.04-.38-1.99-1.22-.74-.66-1.23-1.47-1.37-1.72-.14-.25-.02-.39.11-.51.11-.11.25-.29.38-.43.12-.14.16-.25.25-.41.08-.16.04-.31-.02-.43-.06-.13-.56-1.34-.76-1.84-.2-.48-.41-.42-.56-.43-.14-.01-.31-.01-.48-.01-.16 0-.43.06-.66.31-.22.25-.86.84-.86 2.05 0 1.21.88 2.38 1 2.54.12.16 1.73 2.64 4.19 3.7.59.25 1.04.4 1.4.51.59.19 1.12.16 1.54.1.47-.07 1.46-.6 1.66-1.18.21-.58.21-1.07.14-1.18-.06-.1-.22-.16-.47-.29z" />
          </svg>
          {leo.contato.cta}
        </a>
      </div>
    </SectionShell>
  );
}

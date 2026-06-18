import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import Reveal from './Reveal';
import { Tag } from './TechMarkers';

const STATS = [
  { value: 57.7, decimals: 1, suffix: 'K', label: 'seguidores @aurora.engenharia', code: 'n.01' },
  { value: 798, suffix: '', label: 'posts técnicos publicados', code: 'n.02' },
  { value: 7, suffix: '+', label: 'anos à frente da Aurora', code: 'n.03' }
];

function CountUp({ to, suffix = '', decimals = 0 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const duration = 900;
    const start = performance.now();
    let raf;
    const tick = (t) => {
      const p = Math.min(1, (t - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(eased * to);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to]);

  const formatted =
    decimals > 0
      ? val.toFixed(decimals).replace('.', ',')
      : Math.round(val).toString();

  return <span ref={ref}>{formatted}{suffix}</span>;
}

export default function AboutLeoSection() {
  return (
    <section className="relative overflow-hidden paper-bg py-16 md:py-32">
      <div aria-hidden className="pointer-events-none absolute -left-12 top-1/3 hidden select-none font-mono text-[120px] font-bold leading-none text-aurora/[0.022] md:block md:text-[200px]">
        ENG.
      </div>

      <div className="container-x relative">
        <Reveal>
          <span className="eyebrow">▸ Mentor</span>
          <h2 className="h2 mt-4 max-w-3xl text-ink md:mt-5">
            Quem vai estar do{' '}
            <span className="text-aurora">outro lado do Meet</span>.
          </h2>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-10 grid gap-0 border border-ink/15 bg-white shadow-stamp md:mt-14 md:grid-cols-[1fr_1.4fr]">
            {/* Foto */}
            <div className="relative overflow-hidden border-b border-ink/15 md:border-b-0 md:border-r">
              <div className="absolute inset-0 z-10 pointer-events-none">
                <span className="blueprint-corner bp-tl" style={{ borderColor: 'rgba(255,255,255,.7)' }} />
                <span className="blueprint-corner bp-tr" style={{ borderColor: 'rgba(255,255,255,.7)' }} />
                <span className="blueprint-corner bp-bl" style={{ borderColor: 'rgba(255,255,255,.7)' }} />
                <span className="blueprint-corner bp-br" style={{ borderColor: 'rgba(255,255,255,.7)' }} />
              </div>

              {/* Aspecto: 4/3 mobile / 4/5 desktop */}
              <div className="relative aspect-[4/3] w-full bg-gradient-to-br from-aurora to-ink-deep sm:aspect-[4/4] md:aspect-auto md:h-full">
                <img
                  src="/foto-leo.jpeg"
                  alt="Eng. Leonardo Marques em obra"
                  className="absolute inset-0 h-full w-full object-cover object-top"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />

                <div className="absolute left-3 top-3 md:left-4 md:top-4">
                  <Tag tone="white">FICHA · 001</Tag>
                </div>

                {/* Linha indicadora — só desktop */}
                <div className="absolute right-4 top-1/2 -translate-y-1/2 hidden flex-col items-end gap-2 md:flex">
                  <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/80">
                    LM · 2017
                  </div>
                  <div className="h-px w-12 bg-white/60" />
                  <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/60">
                    UFTM · CIVIL
                  </div>
                </div>

                <div className="absolute bottom-0 left-0 right-0 border-t border-white/20 bg-ink/40 px-3 py-2 backdrop-blur-sm md:px-4">
                  <span className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-white md:tracking-[0.25em]">
                    LEO MARQUES
                  </span>
                </div>
              </div>
            </div>

            {/* Texto */}
            <div className="relative px-6 py-7 md:p-12">
              <Tag>Eng. Civil · UFTM 2017</Tag>
              <div className="mt-3 text-2xl font-bold text-ink sm:text-3xl md:text-4xl">Leonardo Marques</div>
              <div className="mt-1 cota">Fundador · Aurora Engenharia</div>

              <div className="my-5 tech-rule md:my-7" />

              <p className="text-[15px] leading-relaxed text-gray-500 sm:text-base md:text-lg">
                <strong className="text-ink">Engenheiro Civil pela UFTM</strong> (2017),
                com duas pós-graduações e mais de uma década projetando para residências
                de médio e alto padrão. <strong className="text-ink">Começou em 2014</strong>{' '}
                fazendo projetos enquanto ainda estava na faculdade. Em{' '}
                <strong className="text-ink">2019 fundou a Aurora Engenharia</strong>,
                escritório que trabalha exclusivamente com{' '}
                <strong className="text-aurora">projetos hidrossanitários em metodologia BIM</strong>.
              </p>

              <p className="mt-3 text-[15px] leading-relaxed text-gray-500 sm:text-base md:mt-4 md:text-lg">
                <strong className="text-ink">57,7 mil engenheiros, projetistas e arquitetos</strong>{' '}
                aprendem com ele no Instagram. Em 5 de junho, vamos aprender juntos ao vivo.
              </p>

              {/* Stats */}
              <div className="mt-7 grid grid-cols-3 divide-x divide-ink/10 border-y border-ink/10 py-5 md:mt-8 md:py-6">
                {STATS.map((s) => (
                  <div key={s.label} className="px-2 first:pl-0 last:pr-0 sm:px-3">
                    <div className="font-mono text-[9px] font-bold tracking-[0.2em] text-aurora sm:text-[10px] sm:tracking-[0.25em]">
                      {s.code}
                    </div>
                    <div className="tabular mt-1.5 text-2xl font-extrabold text-ink sm:text-3xl md:mt-2 md:text-4xl">
                      <CountUp to={s.value} suffix={s.suffix} decimals={s.decimals} />
                    </div>
                    <div className="mt-1 text-[11px] leading-snug text-gray-500 sm:text-xs">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

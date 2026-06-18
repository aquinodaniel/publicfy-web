import { motion } from 'framer-motion';
import Reveal, { StaggerGroup, StaggerItem } from './Reveal';
import { SeatsBlock } from './SeatsLeft';

const RECEBE = [
  '3 aulas ao vivo comigo, do briefing à entrega',
  'Casa de alto padrão real como case do início ao fim',
  'Dimensionamento ao vivo de reservatórios, solar e bomba de calor',
  'Traçado completo do manifold com explicação por ambiente',
  'Cálculo de pressão e vazão no ponto crítico',
  'Especificação de válvula misturadora, pressurizador e componentes de segurança'
];

export default function OfferSection({ onCTAClick }) {
  return (
    <section id="pricing" className="relative overflow-hidden bg-ink-deep py-16 text-white md:py-32">
      <div aria-hidden className="pointer-events-none absolute inset-0 blueprint-bg" />
      <div aria-hidden className="pointer-events-none absolute -left-24 top-1/4 hidden h-[500px] w-[500px] rounded-full bg-aurora/15 blur-3xl md:block" />
      <div aria-hidden className="pointer-events-none absolute -right-32 bottom-0 hidden h-[500px] w-[500px] rounded-full bg-aurora-glow/10 blur-3xl md:block" />

      <div className="container-x relative">
        <Reveal>
          <h2 className="h2 max-w-4xl text-white">
            Por menos da metade de uma{' '}
            <span className="relative inline-block">
              <span className="relative z-10 text-gold-gradient">pizza</span>
              <motion.span
                aria-hidden
                className="absolute inset-x-0 bottom-0.5 -z-0 h-2 bg-alert/25 sm:bottom-1 sm:h-2.5 md:bottom-2 md:h-[14px]"
                initial={{ scaleX: 0, originX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, ease: 'easeOut', delay: 0.3 }}
              />
            </span>{' '}
            você consegue acesso ao evento.
          </h2>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="relative mt-8 grid gap-0 border border-aurora-glow/30 bg-ink-soft md:mt-10 md:grid-cols-2 md:divide-x md:divide-aurora-glow/15">
            <span className="blueprint-corner bp-tl" style={{ borderColor: 'rgba(19,184,217,.7)' }} />
            <span className="blueprint-corner bp-tr" style={{ borderColor: 'rgba(19,184,217,.7)' }} />
            <span className="blueprint-corner bp-bl" style={{ borderColor: 'rgba(19,184,217,.7)' }} />
            <span className="blueprint-corner bp-br" style={{ borderColor: 'rgba(19,184,217,.7)' }} />

            {/* === COLUNA 1: ESPECIFICAÇÃO === */}
            <div className="border-b border-aurora-glow/15 px-6 py-7 md:border-b-0 md:p-10">
              <div className="flex items-center gap-2 font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-aurora-glow md:text-[11px] md:tracking-[0.35em]">
                <span aria-hidden className="h-px w-5 bg-aurora-glow/50" />
                <span>Imersão</span>
              </div>
              <h3 className="mt-2 text-2xl font-extrabold leading-tight text-white sm:text-3xl md:mt-3 md:text-[30px]">
                Semana da<br />
                <span className="text-aurora-glow">Água Quente</span>
              </h3>

              <dl className="mt-5 grid grid-cols-2 gap-x-4 gap-y-4 border-y border-white/10 py-4 text-sm md:mt-6 md:gap-x-6 md:py-5">
                {[
                  ['Datas', '5, 6 e 7 jun'],
                  ['Horário', '19h30 BRT'],
                  ['Formato', 'Google Meet · ao vivo'],
                  ['Acesso', 'Apenas ao vivo']
                ].map(([k, v]) => (
                  <div key={k}>
                    <dt className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-aurora-glow md:tracking-[0.25em]">
                      {k}
                    </dt>
                    <dd className="mt-1 text-sm font-semibold text-white">{v}</dd>
                  </div>
                ))}
              </dl>

              <div className="mt-5 md:mt-6">
                <div className="font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-aurora-glow">
                  ▸ Você recebe
                </div>
                <StaggerGroup className="mt-4 space-y-2.5" stagger={0.04}>
                  {RECEBE.map((item, i) => (
                    <StaggerItem key={item}>
                      <div className="flex items-baseline gap-3 text-[13px] text-white/85 sm:text-sm">
                        <span className="font-mono text-[9px] font-bold tracking-[0.15em] text-aurora-glow/70 md:text-[10px]">
                          {String(i + 1).padStart(2, '0')}
                        </span>
                        <span className="flex-1">{item}</span>
                      </div>
                    </StaggerItem>
                  ))}
                </StaggerGroup>
              </div>
            </div>

            {/* === COLUNA 2: DECISÃO === */}
            <div className="flex flex-col bg-gradient-to-br from-ink-soft to-ink-deep px-6 py-7 md:p-10">
              <span className="inline-flex w-fit items-center gap-1.5 rounded-sm border border-alert/50 bg-alert/[0.06] px-1.5 py-0.5 font-mono text-[8px] font-bold uppercase tracking-[0.2em] text-gold-gradient">
                ▸ Lote 02 · ATIVO
              </span>

              {/* PREÇO */}
              <div className="mt-5 flex items-end justify-between gap-3 border-b border-white/10 pb-5 md:mt-6 md:pb-6">
                <div>
                  <div className="font-mono text-[14px] font-bold uppercase tracking-[0.25em] text-aurora-glow md:tracking-[0.3em]">
                    Preço
                  </div>
                </div>
                <div className="text-right">
                  <div className="tabular text-5xl font-black leading-none text-white sm:text-6xl md:text-7xl">
                    R$ 27
                  </div>
                </div>
              </div>

              {/* Painel Aluno Aurora — benefício integrado entre preço e CTA */}
              <div className="mt-5 border border-l-[3px] border-alert/60 bg-alert/[0.10] px-3 py-3 md:mt-6 md:px-4 md:py-3.5">
                <div className="flex items-start gap-3">
                  <span aria-hidden className="flex h-7 w-7 flex-shrink-0 items-center justify-center border border-alert/50 text-gold-gradient">
                    <svg viewBox="0 0 24 24" fill="none" className="h-3.5 w-3.5">
                      <path d="M2 9 L12 4 L22 9 L12 14 Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                      <path d="M6 11 V16 C6 16 8.5 18 12 18 C15.5 18 18 16 18 16 V11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M22 9 V13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                  </span>
                  <div className="flex-1 leading-tight">
                    <div className="font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-gold-gradient">
                      Benefício de ser aluno
                    </div>
                    <div className="mt-1 text-[12px] font-medium leading-snug text-white/95 sm:text-[13px]">
                      Sua vaga já está garantida, e você entra sem pagar nada. Em vez de{' '}
                      <span className="relative inline-block whitespace-nowrap">
                        <span className="tabular font-semibold text-white">R$ 27</span>
                        <span aria-hidden className="absolute left-[-2px] right-[-2px] top-1/2 h-[2px] bg-alert" style={{ transform: 'translateY(-50%) rotate(-8deg)' }} />
                      </span>
                      , você paga <strong className="text-white">R$ 0</strong>.
                    </div>
                  </div>
                </div>
              </div>

              <button onClick={onCTAClick} className="btn-primary-xl mt-5 w-full justify-center md:mt-6">
                Entrar agora · R$ 27
              </button>

              <div className="mt-auto pt-7 md:pt-8">
                <div className="border-t border-white/10 pt-5 md:pt-6">
                  <SeatsBlock
                    label="▸ Vagas restantes"
                    footnote="Próximo lote: R$ 47 (+74%)"
                  />
                </div>

                <div className="mt-4 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 font-mono text-[9px] uppercase tracking-[0.15em] text-white/35 md:gap-x-4 md:tracking-[0.2em]">
                  <span className="inline-flex items-center gap-1.5">
                    <svg aria-hidden viewBox="0 0 24 24" fill="none" className="h-3 w-3">
                      <rect x="5" y="11" width="14" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.6" />
                      <path d="M8 11V8a4 4 0 0 1 8 0v3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                    </svg>
                    Pagamento seguro
                  </span>
                  <span>·</span>
                  <span>Cartão · Pix</span>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}


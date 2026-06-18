import { useCallback, useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent, useTransform } from 'framer-motion';
import Reveal from './Reveal';

const AULAS = [
  {
    id: 1,
    code: 'AULA.01',
    valveCode: 'VLV-01',
    valveType: 'ball',
    date: '05.06',
    weekday: 'QUI',
    title: 'Definições e dimensionamento',
    subtitle: 'Briefing, análise de arquitetura e os números que sustentam o projeto inteiro',
    description: (
      <>
        A gente abre a semana com as definições preliminares: briefing, análise de
        arquitetura e da precomp. Daí parte tudo: volume de reservatórios, quantidade
        de placas solares, potência do apoio, layout e espaço da área técnica. É o
        dia em que eu monto, na sua frente, a base numérica que vai sustentar cada
        decisão dos próximos dois dias.
      </>
    )
  },
  {
    id: 2,
    code: 'AULA.02',
    valveCode: 'VLV-02',
    valveType: 'butterfly',
    date: '06.06',
    weekday: 'SEX',
    title: 'Traçado, cálculos e componentes',
    subtitle: 'O coração técnico do projeto, onde tudo sai do papel',
    description: (
      <>
        Aqui eu te mostro o traçado geral da área técnica, o manifold e os ambientes
        já prontos, pra você entender a lógica por trás de cada caminho. A gente
        calcula pressão e vazão no ponto crítico, dimensiona e escolhe a válvula
        misturadora, dimensiona e escolhe o pressurizador, e fecha os componentes
        de segurança: vaso de expansão, eliminadora de ar, quebra-vácuo e válvula TP.
        Cada peça com a justificativa técnica que eu sustento em qualquer mesa.
      </>
    )
  },
  {
    id: 3,
    code: 'AULA.03',
    valveCode: 'PMP-03',
    valveType: 'motorized',
    date: '07.06',
    weekday: 'SÁB',
    title: 'Revisão, bombas e automação',
    subtitle: 'Último dia: fechamento, detalhamento e o pitch que vende o projeto',
    description: (
      <>
        O último dia é o fechamento. A gente faz a revisão e a conferência do traçado,
        escolhe as bombas, define a automação e passa pelas dicas de detalhamento que
        fazem a obra ler sem dúvida. No fim, o pitch de vendas: o jeito de apresentar
        esse projeto pro cliente e cobrar o que ele realmente vale.
      </>
    )
  }
];

function useIsMobile(breakpoint = 1024) {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < breakpoint);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, [breakpoint]);
  return isMobile;
}

export default function ThreeNightsSection({ onCTAClick }) {
  const isMobile = useIsMobile();
  if (isMobile) return <ThreeNightsMobile onCTAClick={onCTAClick} />;
  return <ThreeNightsDesktop onCTAClick={onCTAClick} />;
}

// ============================================================
// DESKTOP — sticky scrollytelling com pipeline industrial
// ============================================================
function ThreeNightsDesktop({ onCTAClick }) {
  const ref = useRef(null);
  const [active, setActive] = useState(0);
  const TOTAL_VH = 100 + AULAS.length * 90;

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end']
  });

  useMotionValueEvent(scrollYProgress, 'change', (p) => {
    let idx;
    if (p < 0.28) idx = 0;
    else if (p < 0.62) idx = 1;
    else idx = 2;
    if (idx !== active) setActive(idx);
  });

  // Coluna de água segue o scroll, ancorada nos valves (16%, 50%, 84%)
  const waterHeight = useTransform(
    scrollYProgress,
    [0, 0.05, 0.28, 0.62, 0.95, 1],
    ['0%', '16%', '50%', '84%', '100%', '100%']
  );

  const scrollToAula = useCallback((idx) => {
    if (!ref.current) return;
    const sectionTop = ref.current.offsetTop;
    const sectionHeight = ref.current.offsetHeight;
    const viewportHeight = window.innerHeight;
    const scrollableHeight = sectionHeight - viewportHeight;
    const progressTargets = [0.10, 0.45, 0.80];
    const targetY = sectionTop + progressTargets[idx] * scrollableHeight;
    window.scrollTo({ top: targetY, behavior: 'smooth' });
  }, []);

  const aula = AULAS[active];

  return (
    <section ref={ref} className="relative paper-bg" style={{ height: `${TOTAL_VH}vh` }}>
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <div className="container-x w-full">
          <Reveal>
            <span className="eyebrow">▸ Programa · 3 dias ao vivo</span>
            <h2 className="h2 mt-3 max-w-3xl text-ink md:mt-4">
              O que você vai ver{' '}
              <span className="text-aurora">na Semana da Água Quente.</span>
            </h2>
          </Reveal>

          <div className="mt-7 grid items-stretch gap-6 lg:grid-cols-[280px_minmax(0,1fr)] lg:gap-10 xl:gap-14">
            {/* Coluna esquerda: pipeline industrial + milestones */}
            <div className="relative flex min-h-[560px] lg:min-h-[640px]">
              <IndustrialPipeline
                active={active}
                onSelect={scrollToAula}
                waterHeight={waterHeight}
              />
              <div className="relative flex-1 pl-2 lg:pl-3">
                {AULAS.map((a, i) => {
                  const top = i === 0 ? '18%' : i === 1 ? '50%' : '82%';
                  const state = i === active ? 'active' : i < active ? 'past' : 'future';
                  return (
                    <button
                      key={a.id}
                      onClick={() => scrollToAula(i)}
                      className="absolute left-0 right-0 -translate-y-1/2 cursor-pointer text-left"
                      style={{ top }}
                    >
                      <MilestoneLabel aula={a} state={state} />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Coluna direita: stack de 3 cards que aparecem conforme o scroll avança */}
            <div className="flex flex-col gap-3 lg:gap-4">
              {AULAS.map((a, i) => {
                const state = i === active ? 'active' : i < active ? 'past' : 'future';
                return <AulaCard key={a.id} aula={a} state={state} />;
              })}
            </div>
          </div>

          {/* Hint scroll com handwheel */}
          <div className="mt-5 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.3em] text-cota">
            <span aria-hidden className="h-px w-8 bg-aurora/30" />
            <span>role ou clique numa válvula para abrir a aula</span>
            <motion.svg
              aria-hidden
              viewBox="0 0 24 24"
              className="h-4 w-4 text-aurora"
              animate={{ rotate: [0, 12, 0, -12, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            >
              <circle cx="12" cy="12" r="2.5" fill="currentColor" />
              <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="1.4" />
              {[0, 60, 120, 180, 240, 300].map((a) => (
                <line
                  key={a}
                  x1="12" y1="12" x2="12" y2="3.5"
                  stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"
                  transform={`rotate(${a} 12 12)`}
                />
              ))}
              {[30, 90, 150, 210, 270, 330].map((a) => (
                <circle
                  key={a}
                  cx="12" cy="3" r="1.2"
                  fill="currentColor"
                  transform={`rotate(${a} 12 12)`}
                />
              ))}
            </motion.svg>
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================================
// MOBILE — linear sem sticky
// ============================================================
function ThreeNightsMobile({ onCTAClick }) {
  return (
    <section className="relative overflow-hidden paper-bg py-16">
      <div className="container-x">
        <Reveal>
          <span className="eyebrow">▸ Programa · 3 dias ao vivo</span>
          <h2 className="h2 mt-4 text-ink">
            O que você vai ver{' '}
            <span className="text-aurora">nos 3 dias de imersão.</span>
          </h2>
        </Reveal>

        <div className="mt-10 space-y-6">
          {AULAS.map((aula, i) => (
            <motion.div
              key={aula.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.45, ease: 'easeOut' }}
            >
              <AulaCard aula={aula} indexHint={i + 1} totalHint={AULAS.length} />
            </motion.div>
          ))}
        </div>

        <Reveal delay={0.1}>
          <div className="mt-10 flex flex-col items-stretch gap-3">
            <button onClick={onCTAClick} className="btn-primary-lg w-full">
              Entrar por R$ 27
            </button>
            <p className="cota text-center">▸ Lote 2 · turma única</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ============================================================
// PIPELINE INDUSTRIAL — tubo metálico 3D + 3 válvulas + acessórios
// ============================================================
function IndustrialPipeline({ active, onSelect, waterHeight }) {
  return (
    <div className="relative w-20 flex-shrink-0">
      {/* CORPO PRINCIPAL DO TUBO — fino e longo, parece encanamento real */}
      <div
        className="absolute left-1/2 top-2 bottom-2 w-8 -translate-x-1/2"
        style={{
          background:
            'linear-gradient(to right, #1a232c 0%, #3d4854 14%, #6b7682 32%, #c4ccd5 50%, #6b7682 68%, #3d4854 86%, #1a232c 100%)',
          boxShadow:
            '0 2px 5px rgba(0,0,0,0.55), inset 1px 0 0 rgba(255,255,255,0.10), inset -1px 0 0 rgba(0,0,0,0.45)',
          borderRadius: '2px'
        }}
      >
        {/* Listras brushed steel */}
        {[15, 30, 45, 60, 75, 88].map((p, i) => (
          <div
            key={i}
            className="absolute top-0 bottom-0 w-px"
            style={{ left: `${p}%`, background: 'rgba(255,255,255,0.07)' }}
          />
        ))}

        {/* Canal interno + água */}
        <div className="absolute left-[6px] right-[6px] inset-y-0 overflow-hidden bg-ink-deep/95">
          <motion.div
            className="absolute inset-x-0 top-0 bg-gradient-to-b from-aurora-glow to-aurora"
            style={{ height: waterHeight }}
          />
          {/* Partículas descendo continuamente — efeito de fluxo de água */}
          <motion.div
            className="pointer-events-none absolute inset-x-0 top-0 overflow-hidden"
            style={{ height: waterHeight }}
          >
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <motion.span
                key={i}
                animate={{ y: ['-15%', '115%'], opacity: [0, 0.95, 0.95, 0] }}
                transition={{
                  duration: 2.6 + i * 0.4,
                  repeat: Infinity,
                  ease: 'linear',
                  delay: i * 0.5,
                  times: [0, 0.1, 0.9, 1]
                }}
                className="absolute h-1.5 w-1.5 rounded-full bg-white/85"
                style={{
                  left: i % 2 === 0 ? '30%' : '65%',
                  top: 0,
                  boxShadow: '0 0 4px rgba(255,255,255,0.45)'
                }}
              />
            ))}
            {[0, 1, 2, 3].map((i) => (
              <motion.span
                key={`small-${i}`}
                animate={{ y: ['-10%', '110%'], opacity: [0, 0.7, 0.7, 0] }}
                transition={{
                  duration: 2.0 + i * 0.3,
                  repeat: Infinity,
                  ease: 'linear',
                  delay: i * 0.65 + 0.3,
                  times: [0, 0.15, 0.85, 1]
                }}
                className="absolute h-[3px] w-[3px] rounded-full bg-white/70"
                style={{ left: `${22 + i * 18}%`, top: 0 }}
              />
            ))}
          </motion.div>
        </div>

        {/* Setas de fluxo gravadas */}
        {[5, 12, 22, 35, 44, 56, 64, 73, 86, 94].map((t, i) => (
          <span
            key={i}
            className="absolute left-1/2 -translate-x-1/2 select-none font-mono text-[8px] leading-none text-white/[0.22]"
            style={{ top: `${t}%` }}
          >
            ▼
          </span>
        ))}
      </div>

      {/* Flanges */}
      <Flange topPct={2} />
      <Flange topPct={32} />
      <Flange topPct={66} />
      <Flange topPct={97} />

      {/* VÁLVULAS clicáveis */}
      {AULAS.map((aula, i) => {
        const top = i === 0 ? 18 : i === 1 ? 50 : 82;
        const state = i === active ? 'active' : i < active ? 'past' : 'future';
        return (
          <ValveButton
            key={aula.id}
            topPct={top}
            state={state}
            type={aula.valveType}
            code={aula.valveCode}
            onClick={() => onSelect(i)}
          />
        );
      })}
    </div>
  );
}

// Flange — anel de conexão com parafusos
function Flange({ topPct }) {
  return (
    <div
      className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2"
      style={{ top: `${topPct}%` }}
    >
      <div
        className="relative h-2.5 w-12 rounded-sm"
        style={{
          background:
            'linear-gradient(to bottom, #1a232c 0%, #5a6470 25%, #c0c8d0 50%, #5a6470 75%, #1a232c 100%)',
          boxShadow: '0 1px 2px rgba(0,0,0,0.5)'
        }}
      >
        <div className="absolute inset-x-1.5 inset-y-0 flex items-center justify-between">
          {[0, 1, 2, 3, 4].map((i) => (
            <span
              key={i}
              className="h-1 w-1 rounded-full"
              style={{
                background: 'radial-gradient(circle at 30% 30%, #6a7480 0%, #1a232c 70%)'
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

// Válvula clicável
function ValveButton({ topPct, state, type, code, onClick }) {
  return (
    <button
      onClick={onClick}
      className="group absolute left-1/2 z-20 -translate-x-1/2 -translate-y-1/2"
      style={{ top: `${topPct}%` }}
      aria-label={`Ir para ${code}`}
    >
      <div className="relative">
        {/* Manômetro acima */}
        <div className="pointer-events-none absolute bottom-full left-1/2 mb-2 -translate-x-1/2">
          <Manometer state={state} />
        </div>

        {type === 'motorized' ? (
          <MotorizedActuator state={state} />
        ) : (
          <BallValve state={state} />
        )}

        {/* Tag VLV/PMP abaixo */}
        <div className="pointer-events-none absolute top-full left-1/2 mt-2 -translate-x-1/2">
          <span
            className="block whitespace-nowrap border border-cota/45 bg-paper/95 px-1.5 py-0.5 font-mono text-[8px] font-bold uppercase tracking-[0.15em] text-cota"
            style={{ boxShadow: '0 1px 1px rgba(0,0,0,0.15)' }}
          >
            {code}
          </span>
        </div>
      </div>
    </button>
  );
}

// Válvula esfera (Aulas 01 e 02)
function BallValve({ state }) {
  const open = state === 'past' || state === 'active';
  const ringBg =
    state === 'future'
      ? 'radial-gradient(circle at 30% 30%, #6a7480 0%, #2a3540 60%, #0a1419 100%)'
      : 'radial-gradient(circle at 30% 30%, #c8d0d8 0%, #6a7480 50%, #2a3540 100%)';
  const handleBg =
    state === 'future'
      ? 'linear-gradient(to bottom, #5a6470 0%, #2a3540 60%, #1a232c 100%)'
      : 'linear-gradient(to bottom, #d8e0e8 0%, #8a94a0 50%, #3a4450 100%)';

  return (
    <div className="relative h-9 w-9">
      {state === 'active' && (
        <motion.span
          aria-hidden
          className="absolute inset-0 rounded-full"
          style={{ boxShadow: '0 0 0 0 rgba(19,184,217,0.6)' }}
          animate={{
            boxShadow: [
              '0 0 0 0 rgba(19,184,217,0.6)',
              '0 0 0 10px rgba(19,184,217,0)'
            ]
          }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeOut' }}
        />
      )}

      <div
        className="absolute inset-0 rounded-full"
        style={{ background: ringBg, boxShadow: '0 1.5px 3px rgba(0,0,0,0.5)' }}
      />
      {[0, 60, 120, 180, 240, 300].map((angle) => (
        <span
          key={angle}
          className="absolute left-1/2 top-1/2 h-[3px] w-[3px] rounded-full"
          style={{
            transform: `translate(-50%, -50%) rotate(${angle}deg) translateY(-13px)`,
            background: 'radial-gradient(circle, #1a232c 30%, #6a7480 100%)'
          }}
        />
      ))}

      <div
        className="absolute inset-2 rounded-full"
        style={{
          background:
            state === 'future'
              ? 'radial-gradient(circle at 35% 30%, #4a5560 0%, #1a232c 80%)'
              : 'radial-gradient(circle at 35% 30%, #00657B 0%, #00374a 80%)'
        }}
      />

      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        animate={{ rotate: open ? 90 : 0 }}
        transition={{ duration: 0.6, ease: [0.22, 0.61, 0.36, 1] }}
      >
        <div
          className="h-1 w-7 rounded-sm"
          style={{ background: handleBg, boxShadow: '0 1px 1px rgba(0,0,0,0.55)' }}
        />
        <span
          className="absolute right-0 top-1/2 h-1.5 w-1.5 -translate-y-1/2 translate-x-1 rounded-full"
          style={{
            background: state === 'future' ? '#3a4450' : '#c0c8d0',
            boxShadow: '0 1px 1px rgba(0,0,0,0.5)'
          }}
        />
      </motion.div>
    </div>
  );
}

// Atuador motorizado (Aula 03)
function MotorizedActuator({ state }) {
  const isActive = state === 'active';
  return (
    <div className="relative h-12 w-12">
      {isActive && (
        <motion.span
          aria-hidden
          className="absolute inset-0 rounded-md"
          style={{ boxShadow: '0 0 0 0 rgba(19,184,217,0.6)' }}
          animate={{
            boxShadow: [
              '0 0 0 0 rgba(19,184,217,0.7)',
              '0 0 0 12px rgba(19,184,217,0)'
            ]
          }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeOut' }}
        />
      )}

      <div
        className="absolute bottom-0 left-1/2 h-6 w-10 -translate-x-1/2 rounded-sm"
        style={{
          background: 'linear-gradient(to bottom, #c0c8d0 0%, #6a7480 50%, #2a3540 100%)',
          boxShadow: '0 1.5px 3px rgba(0,0,0,0.5)'
        }}
      />
      <span className="absolute bottom-1 left-1.5 h-1 w-1 rounded-full" style={{ background: '#1a232c' }} />
      <span className="absolute bottom-1 right-1.5 h-1 w-1 rounded-full" style={{ background: '#1a232c' }} />

      <div
        className="absolute top-0 left-1/2 h-7 w-8 -translate-x-1/2 rounded-sm"
        style={{
          background: 'linear-gradient(to bottom, #6a7480 0%, #3a4450 50%, #1a232c 100%)',
          boxShadow: '0 1.5px 3px rgba(0,0,0,0.5)'
        }}
      >
        <motion.span
          aria-hidden
          className="absolute left-1/2 top-1 h-1.5 w-1.5 -translate-x-1/2 rounded-full"
          style={{
            background: isActive ? '#13B8D9' : '#3a4450',
            boxShadow: isActive
              ? '0 0 7px #13B8D9, 0 0 3px #13B8D9, inset 0 0 2px rgba(255,255,255,0.6)'
              : 'inset 0 0 2px rgba(0,0,0,0.5)'
          }}
          animate={isActive ? { opacity: [1, 0.5, 1] } : {}}
          transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
        />
        <span className="absolute bottom-1 left-1/2 -translate-x-1/2 font-mono text-[7px] font-bold text-white/55">
          M
        </span>
      </div>

      <div
        className="absolute top-6 left-1/2 h-1 w-2.5 -translate-x-1/2"
        style={{ background: 'linear-gradient(to bottom, #4a5560, #2a3540)' }}
      />
    </div>
  );
}

// Manômetro analógico
function Manometer({ state }) {
  const needleAngle = state === 'active' ? -25 : state === 'past' ? -10 : -75;
  return (
    <div className="relative h-6 w-6">
      <div
        className="absolute inset-0 rounded-full"
        style={{
          background:
            'radial-gradient(circle at 30% 30%, #c8d0d8 0%, #5a6470 60%, #1a232c 100%)',
          boxShadow: '0 1px 2px rgba(0,0,0,0.5)'
        }}
      />
      <div
        className="absolute inset-[3px] rounded-full"
        style={{
          background: 'radial-gradient(circle at 50% 30%, #f5f1e0 0%, #d4cfb8 100%)'
        }}
      >
        <svg viewBox="0 0 24 24" className="absolute inset-0">
          <path d="M 6 18 A 8 8 0 0 1 18 18" fill="none" stroke="#4a8a4a" strokeWidth="2" opacity="0.6" />
          <path d="M 18 18 A 8 8 0 0 1 21 13" fill="none" stroke="#c44a4a" strokeWidth="1.5" opacity="0.5" />
        </svg>
        <motion.div
          className="absolute left-1/2 top-1/2 h-0.5 w-2 -translate-y-1/2 rounded-sm bg-ink"
          style={{ transformOrigin: '0 50%' }}
          animate={{ rotate: needleAngle - 90 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        />
        <span className="absolute left-1/2 top-1/2 h-1 w-1 -translate-x-1/2 -translate-y-1/2 rounded-full bg-ink" />
      </div>
    </div>
  );
}

// Milestone label (timeline lateral, ao lado da pipeline)
function MilestoneLabel({ aula, state }) {
  return (
    <div className="relative leading-tight">
      <div
        className={`font-mono text-[10px] font-bold uppercase tracking-[0.25em] transition-colors ${
          state === 'active' ? 'text-aurora' : state === 'past' ? 'text-aurora/65' : 'text-cota/55'
        }`}
      >
        {aula.code}
      </div>
      <div
        className={`mt-1 text-sm font-bold transition-colors ${
          state === 'active' ? 'text-ink' : state === 'past' ? 'text-gray-500' : 'text-gray-400'
        }`}
      >
        {aula.title}
      </div>
    </div>
  );
}

// ============================================================
// AULA CARD — paper limpo + edge metálica sutil esquerda (C2)
// state: 'active' | 'past' | 'future' (default 'active' — usado pelo mobile)
// ============================================================
function AulaCard({ aula, indexHint, totalHint, state = 'active' }) {
  const isActive = state === 'active';
  const isPast = state === 'past';
  const isFuture = state === 'future';

  return (
    <motion.article
      initial={false}
      animate={{
        opacity: isFuture ? 0.28 : isPast ? 0.72 : 1,
        scale: isActive ? 1 : 0.985,
        y: isFuture ? 14 : 0
      }}
      transition={{ duration: 0.45, ease: [0.22, 0.61, 0.36, 1] }}
      className={`relative border bg-white transition-shadow ${
        isActive
          ? 'border-aurora/35 shadow-[0_2px_0_rgba(0,17,21,.04),0_22px_44px_-18px_rgba(0,101,123,.28),0_10px_22px_-10px_rgba(0,101,123,.18)]'
          : 'border-ink/12 shadow-[0_1px_0_rgba(0,17,21,.04),0_8px_18px_-12px_rgba(0,17,21,.14)]'
      }`}
    >
      {/* Edge metálica esquerda — C2 sutil, só destaca no ativo */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 hidden w-1 lg:block"
        style={{
          background:
            'linear-gradient(to bottom, #1a232c 0%, #5a6470 8%, #b4bdc7 18%, #5a6470 30%, #2a3540 50%, #5a6470 70%, #b4bdc7 82%, #5a6470 92%, #1a232c 100%)',
          opacity: isActive ? 1 : 0.45
        }}
      />

      {/* Header */}
      <div className="flex items-center justify-between border-b border-ink/10 bg-paper px-5 py-2.5 lg:pl-7 md:px-7 md:py-3">
        <div className={`font-mono text-[10px] font-bold uppercase tracking-[0.25em] md:text-[11px] md:tracking-[0.3em] ${
          isActive ? 'text-aurora' : isPast ? 'text-aurora/70' : 'text-cota/70'
        }`}>
          {aula.code}
          {indexHint && (
            <span className="ml-2 text-cota/70">
              {String(indexHint).padStart(2, '0')} / {String(totalHint).padStart(2, '0')}
            </span>
          )}
          {isPast && (
            <span className="ml-2 inline-flex items-center text-[9px] tracking-[0.18em] text-aurora/70">
              ▸ visto
            </span>
          )}
        </div>
        <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-cota md:text-xs">
          {aula.date} · {aula.weekday} · 19h30
        </div>
      </div>

      {/* Body */}
      <div className="px-5 py-5 lg:pl-9 md:px-9 md:py-6">
        <h3 className={`text-xl font-bold leading-tight md:text-2xl ${
          isActive ? 'text-ink' : 'text-ink/80'
        }`}>
          {aula.title}
        </h3>
        <div className={`mt-1 text-sm md:text-[15px] ${
          isActive ? 'text-aurora' : 'text-aurora/70'
        }`}>
          {aula.subtitle}
        </div>

        {/* Descrição — colapsa quando não está ativa (apenas título visível em past/future) */}
        <AnimatePresence initial={false}>
          {isActive && (
            <motion.div
              key="desc"
              initial={{ height: 0, opacity: 0, marginTop: 0 }}
              animate={{ height: 'auto', opacity: 1, marginTop: '1rem' }}
              exit={{ height: 0, opacity: 0, marginTop: 0 }}
              transition={{ duration: 0.38, ease: [0.22, 0.61, 0.36, 1] }}
              className="overflow-hidden"
            >
              <div className="mb-4 h-px bg-ink/8" />
              <p className="text-[14px] leading-relaxed text-gray-500 md:text-[15px] md:leading-[1.65]">
                {aula.description}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.article>
  );
}


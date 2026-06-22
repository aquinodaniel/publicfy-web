'use client';

import { useRef } from 'react';
import { motion, useScroll, useSpring, useTransform, type MotionValue } from 'framer-motion';
import SectionShell from '@/components/shared/SectionShell';
import MaskReveal from '@/components/motion/MaskReveal';
import DrawLine from '@/components/motion/DrawLine';
import { StaggerGroup, StaggerItem } from '@/components/motion/Reveal';
import { objecao } from '@/content/site';
import { useIsMobile } from '@/lib/hooks';

// ============================================================
// 7 · OBJEÇÃO 🌑 — DESKTOP: scrollytelling (igual "As 3 Noites"). O gráfico fica
// preso (sticky) e, conforme o scroll desce, uma linha forte SOBREPÕE a linha-base
// progressivamente; ao chegar em cada nó, o card daquele ponto aparece.
// MOBILE: lista vertical simples. Fecha com comparação em texto + CTA.
// ============================================================
const EASE = [0.22, 0.61, 0.36, 1] as const;
const GLOW = '#13B8D9';
const AXIS = 'rgba(122,139,145,0.5)';

// onda ascendente (sobe da esq-baixo p/ dir-alto) — evolução, não linha reta
const WAVE =
  'M120,400 C220,400 220,290 320,290 C430,290 430,340 540,340 C650,340 650,190 760,190 C864,190 864,140 968,140';
const AREA = `${WAVE} L968,470 L120,470 Z`;
const AXES = 'M120,90 L120,470 L968,470';
// cards ancorados ao X de cada nó · `frac` = ponto do scroll (0..1) em que o
// contorno atinge o nó e o card aparece (offsets alternados p/ ritmo).
// cards deslocados pra direita · cada um sobre seu ponto da curva, com respiro
// acima/abaixo (alternado) p/ a linha não pegar no card.
const NODES = [
  { x: 294, y: 293, leader: 'M294,293 L294,250', leftPct: 27, cardTop: '16%', frac: 0.21 },
  { x: 435, y: 317, leader: 'M435,317 L435,350', leftPct: 40, cardTop: '68%', frac: 0.37 },
  { x: 648, y: 268, leader: 'M648,268 L648,228', leftPct: 59.6, cardTop: '14%', frac: 0.62 },
  { x: 870, y: 162, leader: 'M870,162 L870,196', leftPct: 80, cardTop: '38%', frac: 0.88 }
] as const;
const GRID_H = [150, 230, 310, 390];
const GRID_V = [260, 420, 580, 740, 900];

function brl(v: number) {
  return 'R$ ' + v.toLocaleString('pt-BR');
}

// ---------- nó + leader (surgem quando o contorno chega no nó) ----------
function GraphNode({ n, progress }: { n: (typeof NODES)[number]; progress: MotionValue<number> }) {
  const op = useTransform(progress, [n.frac - 0.07, n.frac], [0, 1]);
  const lead = useTransform(progress, [n.frac, Math.min(1, n.frac + 0.06)], [0, 1]);
  return (
    <g>
      <motion.path
        d={n.leader}
        fill="none"
        stroke={GLOW}
        strokeWidth={1.5}
        strokeOpacity={0.4}
        strokeLinecap="round"
        style={{ pathLength: lead, opacity: op }}
      />
      <motion.circle
        cx={n.x}
        cy={n.y}
        r={7}
        fill={GLOW}
        style={{ opacity: op, filter: `drop-shadow(0 0 8px ${GLOW})` }}
      />
    </g>
  );
}

// ---------- card da objeção (aparece sincronizado com o nó) ----------
function GraphCard({
  n,
  crenca,
  resposta,
  progress
}: {
  n: (typeof NODES)[number];
  crenca: string;
  resposta: string;
  progress: MotionValue<number>;
}) {
  const op = useTransform(progress, [n.frac - 0.05, n.frac + 0.02], [0, 1]);
  const y = useTransform(progress, [n.frac - 0.05, n.frac + 0.02], [14, 0]);
  return (
    <motion.div
      style={{ opacity: op, y, x: '-50%', left: `${n.leftPct}%`, top: n.cardTop }}
      className="absolute w-[182px] cursor-default rounded-lg border border-white/10 bg-white/[0.05] p-3 shadow-inner-tech backdrop-blur transition-colors hover:border-aurora-glow/40"
    >
      <p className="text-[12.5px] font-medium italic leading-snug text-cota">{crenca}</p>
      <p className="mt-1.5 text-[11.5px] leading-snug text-paper/75">{resposta}</p>
    </motion.div>
  );
}

// ---------- gráfico scroll-driven (a linha forte segue o `progress`) ----------
function GraphScroll({ progress }: { progress: MotionValue<number> }) {
  return (
    <div className="relative mx-auto mt-1 aspect-[1088/520] w-full max-w-[1312px]">
      <svg viewBox="0 0 1088 520" preserveAspectRatio="none" className="absolute inset-0 h-full w-full" aria-hidden>
        <defs>
          <linearGradient id="objArea" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={GLOW} stopOpacity="0.14" />
            <stop offset="100%" stopColor={GLOW} stopOpacity="0" />
          </linearGradient>
          <linearGradient id="objDepthLeft" gradientUnits="userSpaceOnUse" x1="120" y1="0" x2="196" y2="0">
            <stop offset="0%" stopColor="#000" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#000" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="objDepthBottom" gradientUnits="userSpaceOnUse" x1="0" y1="470" x2="0" y2="394">
            <stop offset="0%" stopColor="#000" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#000" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* grid sutil */}
        <motion.g
          stroke="rgba(255,255,255,0.04)"
          strokeWidth={1}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {GRID_H.map((y) => (
            <line key={`h${y}`} x1="120" y1={y} x2="968" y2={y} />
          ))}
          {GRID_V.map((x) => (
            <line key={`v${x}`} x1={x} y1="90" x2={x} y2="470" />
          ))}
        </motion.g>

        {/* eixos */}
        <motion.path
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ pathLength: { duration: 0.7, ease: EASE }, opacity: { duration: 0.2 } }}
          d={AXES}
          fill="none"
          stroke={AXIS}
          strokeWidth={1.5}
          strokeLinecap="round"
        />

        {/* área sob a curva */}
        <motion.path
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          d={AREA}
          fill="url(#objArea)"
          stroke="none"
        />

        {/* sombras internas projetadas dos eixos */}
        <rect x="120" y="90" width="76" height="380" fill="url(#objDepthLeft)" />
        <rect x="120" y="394" width="848" height="76" fill="url(#objDepthBottom)" />

        {/* linha BASE — traçada na entrada (guia clara e fina) */}
        <motion.path
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 0.32 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ pathLength: { duration: 1.2, ease: EASE }, opacity: { duration: 0.4 } }}
          d={WAVE}
          fill="none"
          stroke={GLOW}
          strokeWidth={1.5}
          strokeLinecap="round"
        />

        {/* linha de CONTORNO — forte, SOBREPÕE a base conforme o scroll desce */}
        <motion.path
          d={WAVE}
          fill="none"
          stroke={GLOW}
          strokeWidth={4.5}
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ pathLength: progress, filter: `drop-shadow(0 0 6px ${GLOW})` }}
        />

        {/* nós + leaders */}
        {NODES.map((n) => (
          <GraphNode key={n.x} n={n} progress={progress} />
        ))}
      </svg>

      {/* cards conectados aos nós */}
      {NODES.map((n, i) => {
        const item = objecao.itens[i];
        if (!item) return null;
        return (
          <GraphCard key={n.x} n={n} crenca={item.crenca} resposta={item.resposta} progress={progress} />
        );
      })}
    </div>
  );
}

// ---------- comparação + CTA (fecho, compartilhado) ----------
function ObjecaoFecho({ onCTAClick }: { onCTAClick: () => void }) {
  const { comparacao } = objecao;
  return (
    <>
      <MaskReveal variant="wipe" amount={0.3} className="mx-auto max-w-3xl text-center">
        <p className="text-balance text-2xl font-bold leading-snug text-paper md:text-3xl">
          {comparacao.pre}
          <span className="whitespace-nowrap text-alert">{brl(comparacao.perda)}</span>
          {comparacao.mid}
          <span className="whitespace-nowrap text-aurora-glow">
            {brl(comparacao.preco)}
            {comparacao.pos}
          </span>
        </p>
      </MaskReveal>
      <div className="mt-8 flex justify-center md:mt-10">
        <button onClick={onCTAClick} className="btn-cta px-9 py-4 text-base md:text-lg">
          {objecao.cta}
        </button>
      </div>
    </>
  );
}

// ---------- cabeçalho (compartilhado) ----------
function Header() {
  return (
    <MaskReveal variant="glow" duration={0.8} className="text-center">
      <h2 className="mx-auto max-w-3xl text-3xl font-black leading-tight tracking-tight md:text-4xl">
        {objecao.h2Pre}
        <span className="text-alert">{objecao.h2Destaque}</span>
      </h2>
    </MaskReveal>
  );
}

// ============================================================
// DESKTOP — scrollytelling sticky
// ============================================================
function ObjecaoDesktop({ onCTAClick }: { onCTAClick: () => void }) {
  const wrapRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: wrapRef, offset: ['start start', 'end end'] });
  // suaviza o desenho do contorno em relação ao scroll cru
  const progress = useSpring(scrollYProgress, { stiffness: 80, damping: 26, restDelta: 0.0004 });

  return (
    <>
      <section ref={wrapRef} id="objecao" className="relative h-[300vh] bg-ink text-paper">
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-aurora-glow/10 blur-[120px]"
        />
        <div className="sticky top-0 flex h-screen items-center overflow-hidden">
          <div className="relative z-10 mx-auto w-full max-w-[1360px] px-6">
            <Header />
            <GraphScroll progress={progress} />
          </div>
        </div>
      </section>

      {/* fecho — logo abaixo do gráfico (puxado ~40px pra cima) */}
      <SectionShell theme="dark" className="-mt-10 !pt-8 !pb-16 md:!pt-10 md:!pb-24">
        <ObjecaoFecho onCTAClick={onCTAClick} />
      </SectionShell>
    </>
  );
}

// ============================================================
// MOBILE — lista vertical simples
// ============================================================
function ObjecaoItem({ crenca, resposta }: { crenca: string; resposta: string }) {
  return (
    <StaggerItem className="relative border-l-2 border-white/10 pl-6">
      <span
        aria-hidden
        className="absolute -left-[7px] top-2 h-3 w-3 rounded-full border-2 border-aurora-glow bg-ink"
      />
      <div className="relative inline-block">
        <span className="text-lg font-medium italic leading-snug text-cota">{crenca}</span>
        <DrawLine
          d="M0 1 L100 1"
          viewBox="0 0 100 2"
          stroke="currentColor"
          strokeWidth={2}
          trigger="inview"
          duration={0.6}
          delay={0.35}
          preserveAspectRatio="none"
          className="pointer-events-none absolute left-[-4px] right-[-4px] top-1/2 h-[2px] w-[calc(100%+8px)] -translate-y-1/2 text-aurora-glow"
        />
      </div>
      <MaskReveal
        as="p"
        variant="glow"
        amount={0.5}
        delay={0.6}
        className="mt-4 max-w-2xl text-[15px] leading-relaxed text-paper/75"
      >
        {resposta}
      </MaskReveal>
    </StaggerItem>
  );
}

function ObjecaoMobile({ onCTAClick }: { onCTAClick: () => void }) {
  return (
    <SectionShell theme="dark" id="objecao" halo>
      <Header />
      <StaggerGroup className="mt-12 space-y-12" stagger={0.3}>
        {objecao.itens.map((item) => (
          <ObjecaoItem key={item.crenca} crenca={item.crenca} resposta={item.resposta} />
        ))}
      </StaggerGroup>
      <div className="mt-20">
        <ObjecaoFecho onCTAClick={onCTAClick} />
      </div>
    </SectionShell>
  );
}

export default function Objecao({ onCTAClick }: { onCTAClick: () => void }) {
  const isMobile = useIsMobile(1024);
  return isMobile ? (
    <ObjecaoMobile onCTAClick={onCTAClick} />
  ) : (
    <ObjecaoDesktop onCTAClick={onCTAClick} />
  );
}

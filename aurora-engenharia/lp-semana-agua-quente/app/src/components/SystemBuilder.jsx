import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useMotionValueEvent, useTransform } from 'framer-motion';

const LAYERS = [
  {
    id: 1,
    code: 'L.01',
    title: 'Captação + Reservatório',
    desc: 'Onde o projeto começa. A escolha entre 1 reservatório grande ou 2 menores muda o resto da obra.',
    label: 'reservatório'
  },
  {
    id: 2,
    code: 'L.02',
    title: 'Pressurização',
    desc: 'Sai do reservatório com pressão e vazão sob controle. Define se o banho da suíte do fundo da casa vai chegar com força.',
    label: 'pressão controlada'
  },
  {
    id: 3,
    code: 'L.03',
    title: 'Aquecimento Híbrido',
    desc: 'Solar como geração principal, bomba de calor como apoio, boiler como coração térmico. Aqui se decide eficiência e conta de luz.',
    label: 'solar + apoio + boiler'
  },
  {
    id: 4,
    code: 'L.04',
    title: 'Manifold por Ambiente',
    desc: 'Saída do boiler em ramais individualizados saindo de uma central. À prova de "adaptação" do instalador na obra.',
    label: 'ramais individualizados'
  },
  {
    id: 5,
    code: 'L.05',
    title: 'Recirculação + Automação',
    desc: 'Banho instantâneo no ambiente mais distante. Loop de retorno comandado pelas bombas e pela automação predial.',
    label: 'loop de retorno'
  }
];

// Detecta mobile
function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < breakpoint);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, [breakpoint]);
  return isMobile;
}

export default function SystemBuilder() {
  const isMobile = useIsMobile();

  if (isMobile) return <SystemBuilderMobile />;
  return <SystemBuilderDesktop />;
}

// ============================================================
// DESKTOP — sticky scrollytelling
// ============================================================
function SystemBuilderDesktop() {
  const ref = useRef(null);
  const [activeLayer, setActiveLayer] = useState(0);

  const SCROLL_PER_LAYER = 100;
  const TOTAL_SCROLL_VH = 100 + LAYERS.length * SCROLL_PER_LAYER;

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end']
  });

  useMotionValueEvent(scrollYProgress, 'change', (p) => {
    let idx;
    if (p < 0.1) idx = 0;
    else if (p < 0.3) idx = 1;
    else if (p < 0.5) idx = 2;
    else if (p < 0.7) idx = 3;
    else idx = 4;
    if (idx !== activeLayer) setActiveLayer(idx);
  });

  const smoothProgress = useTransform(scrollYProgress, [0, 0.95], [0, 1]);
  const widthValue = useTransform(smoothProgress, [0, 1], ['0%', '100%']);

  // Click numa camada → scroll suave até a posição daquela layer
  const scrollToLayer = (idx) => {
    if (!ref.current) return;
    const sectionTop = ref.current.offsetTop;
    const sectionHeight = ref.current.offsetHeight;
    const viewportHeight = window.innerHeight;
    const scrollableHeight = sectionHeight - viewportHeight;
    // Thresholds: 0.05, 0.2, 0.4, 0.6, 0.8
    const targets = [0.05, 0.2, 0.4, 0.6, 0.8];
    const targetY = sectionTop + targets[idx] * scrollableHeight;
    window.scrollTo({ top: targetY, behavior: 'smooth' });
  };

  return (
    <section
      ref={ref}
      className="relative bg-ink-deep blueprint-bg text-white"
      style={{ height: `${TOTAL_SCROLL_VH}vh` }}
    >
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <div className="container-x relative grid w-full gap-12 md:grid-cols-[0.75fr_1.35fr] md:items-center">
          <div className="relative z-10">
            <span className="font-mono text-[11px] font-medium uppercase tracking-[0.25em] text-aurora-glow">▸ Sistema · 5 camadas</span>
            <h2 className="h2 mt-5 max-w-md text-white">
              O sistema que vamos{' '}
              <span className="text-aurora-glow">construir juntos</span>{' '}
              em 3 dias.
            </h2>
            <p className="mt-4 max-w-md text-base leading-relaxed text-white/65">
              5 camadas de engenharia que separam o projeto residencial comum
              de uma casa de alto padrão.{' '}
              <strong className="text-white">Role para ver cada uma sendo montada.</strong>
            </p>

            <div className="mt-10 space-y-2">
              {LAYERS.map((layer, i) => (
                <LayerItem
                  key={layer.id}
                  layer={layer}
                  isActive={i === activeLayer}
                  isPast={i < activeLayer}
                  onClick={() => scrollToLayer(i)}
                />
              ))}
            </div>

            <div className="mt-8 flex items-center gap-3">
              <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/50">
                Camada
              </span>
              <span className="tabular font-mono text-sm font-bold text-aurora-glow">
                {String(activeLayer + 1).padStart(2, '0')} / {String(LAYERS.length).padStart(2, '0')}
              </span>
              <div className="relative h-px flex-1 bg-white/10">
                <motion.div
                  className="absolute inset-y-0 left-0 bg-aurora-glow"
                  style={{ width: widthValue }}
                />
              </div>
            </div>
          </div>

          <div className="relative">
            <SystemDiagram activeLayer={activeLayer} />
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================================
// MOBILE — versão linear, scroll natural, sem sticky
// ============================================================
function SystemBuilderMobile() {
  return (
    <section className="relative bg-ink-deep blueprint-bg py-16 text-white">
      <div className="container-x">
        <span className="font-mono text-[11px] font-medium uppercase tracking-[0.25em] text-aurora-glow">▸ Sistema · 5 camadas</span>
        <h2 className="h2 mt-4 text-white">
          O sistema que vamos{' '}
          <span className="text-aurora-glow">construir juntos</span>{' '}
          em 3 dias.
        </h2>
        <p className="mt-3 text-base leading-relaxed text-white/65">
          5 camadas de engenharia que separam o projeto residencial comum
          de uma casa de alto padrão.
        </p>

        {/* Diagrama menor no topo, sempre completo */}
        <div className="mt-8">
          <SystemDiagram activeLayer={LAYERS.length - 1} compact />
        </div>

        {/* Lista vertical de camadas */}
        <div className="mt-10 space-y-6">
          {LAYERS.map((layer, i) => (
            <motion.div
              key={layer.id}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              className="border-l-2 border-aurora-glow pl-4"
            >
              <div className="flex items-center gap-2">
                <span className="font-mono text-[11px] font-bold tracking-[0.25em] text-aurora-glow">
                  {layer.code}
                </span>
                <span className="h-px w-6 bg-aurora-glow" />
                <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/45">
                  {layer.label}
                </span>
              </div>
              <div className="mt-1 text-base font-semibold text-white">
                {layer.title}
              </div>
              <div className="mt-1 text-sm leading-snug text-white/65">
                {layer.desc}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// SUBCOMPONENTES
// ============================================================

function LayerItem({ layer, isActive, isPast, onClick }) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      initial={false}
      animate={{ opacity: isActive ? 1 : isPast ? 0.5 : 0.35 }}
      whileHover={{ opacity: isActive ? 1 : 0.8 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className={`group flex w-full items-start gap-4 border-l-2 pl-4 text-left transition-colors duration-300 ${
        isActive ? 'border-aurora-glow' : isPast ? 'border-aurora-glow/40' : 'border-white/15 hover:border-aurora-glow/60'
      }`}
      aria-label={`Ir para ${layer.code}`}
    >
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <span className={`font-mono text-[11px] font-bold tracking-[0.25em] ${
            isActive ? 'text-aurora-glow' : 'text-white/60'
          }`}>
            {layer.code}
          </span>
          <span className={`h-px w-6 ${
            isActive ? 'bg-aurora-glow' : isPast ? 'bg-aurora-glow/40' : 'bg-white/15'
          }`} />
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/45">
            {layer.label}
          </span>
        </div>
        <div className={`mt-1 text-base font-semibold md:text-lg ${
          isActive ? 'text-white' : 'text-white/70'
        }`}>
          {layer.title}
        </div>
        {isActive && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            transition={{ duration: 0.3 }}
            className="mt-1 text-sm leading-snug text-white/65"
          >
            {layer.desc}
          </motion.div>
        )}
      </div>
    </motion.button>
  );
}

function SystemDiagram({ activeLayer, compact = false }) {
  const visible = (i) => i <= activeLayer;
  const maxWidth = compact ? 'max-w-[560px]' : 'max-w-[880px]';

  return (
    <div className={`relative aspect-[10/9] w-full mx-auto ${maxWidth}`}>
      <div className="absolute inset-0 border border-aurora-glow/20 bg-ink-soft/60">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              'linear-gradient(rgba(19,184,217,.08) 1px, transparent 1px), linear-gradient(90deg, rgba(19,184,217,.08) 1px, transparent 1px)',
            backgroundSize: '24px 24px'
          }}
        />
      </div>

      <span className="blueprint-corner bp-tl" style={{ borderColor: 'rgba(19,184,217,.6)' }} />
      <span className="blueprint-corner bp-tr" style={{ borderColor: 'rgba(19,184,217,.6)' }} />
      <span className="blueprint-corner bp-bl" style={{ borderColor: 'rgba(19,184,217,.6)' }} />
      <span className="blueprint-corner bp-br" style={{ borderColor: 'rgba(19,184,217,.6)' }} />

      <svg viewBox="0 0 600 540" className="absolute inset-0 h-full w-full p-6" preserveAspectRatio="xMidYMid meet">
        <defs>
          <marker id="arrow-cyan" markerWidth="7" markerHeight="7" refX="5.5" refY="3.5" orient="auto">
            <path d="M0,0 L7,3.5 L0,7 Z" fill="#13B8D9" />
          </marker>
          <marker id="arrow-cyan-sm" markerWidth="5" markerHeight="5" refX="4" refY="2.5" orient="auto">
            <path d="M0,0 L5,2.5 L0,5 Z" fill="#13B8D9" />
          </marker>
          <marker id="arrow-gold" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
            <path d="M0,0 L6,3 L0,6 Z" fill="#DBBE7C" />
          </marker>
        </defs>

        {/*
          ======================================================================
          LAYOUT — diagrama centrado no BOILER, organizado em 4 faixas:
          TOPO  (y ~40-84)  : BOMBAS (oval) ── AUTOMAÇÃO (círculo)
          MEIO  (y ~130-180): SOLAR · RECIRCULAÇÃO · BOMBA DE CALOR (3 ovais, ~80px de gap)
          EIXO  (y ~300)    : RES → PRESS → BOILER (horizontal); BOILER ~100x90px
          BASE  (y ~440-462): MANIFOLD + 7 ramais
          DIR   (lateral)   : loop de retorno MANIFOLD → BOMBA DE CALOR
          Label BOILER: vertical (rotacionado 90°) na lateral direita do icone.
          ======================================================================
        */}

        {/* ============================================================ */}
        {/* STAGE 0 — L.01 RESERVATÓRIO                                  */}
        {/* ============================================================ */}
        <Stage visible={visible(0)}>
          <g>
            {/* Tampa superior com flange (entrada de água) */}
            <line x1="30" y1="260" x2="62" y2="260" stroke="#13B8D9" strokeWidth="1.2" />
            <rect x="40" y="252" width="12" height="8" fill="none" stroke="#13B8D9" strokeWidth="1.2" />

            {/* Corpo do reservatório */}
            <rect x="20" y="260" width="80" height="80" fill="rgba(19,184,217,.05)" stroke="#13B8D9" strokeWidth="2" rx="2" />

            {/* Linha de nível d'água (~70%) com hachura */}
            <line x1="20" y1="282" x2="100" y2="282" stroke="#13B8D9" strokeWidth="1" strokeDasharray="3 2" opacity="0.85" />
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <line
                key={i}
                x1={24 + i * 13}
                y1="340"
                x2={38 + i * 13}
                y2="282"
                stroke="#13B8D9"
                strokeWidth="0.6"
                opacity="0.28"
              />
            ))}
            {/* Saída lateral direita (alinhada ao eixo central y=300) */}
            <line x1="100" y1="300" x2="110" y2="300" stroke="#13B8D9" strokeWidth="2" />
            <rect x="96" y="294" width="6" height="12" fill="none" stroke="#13B8D9" strokeWidth="1.2" />

            {/* Label */}
            <text x="60" y="366" textAnchor="middle" fill="#13B8D9" fontSize="11" fontFamily="JetBrains Mono" letterSpacing="1.5" fontWeight="bold">RESERVATÓRIO</text>
          </g>
        </Stage>

        {/* ============================================================ */}
        {/* STAGE 1 — L.02 PRESSURIZAÇÃO (RES → PRESS)                   */}
        {/* ============================================================ */}
        <Stage visible={visible(1)}>
          {/* Tubulação RES → PRESS (eixo central horizontal y=300) */}
          <line x1="110" y1="300" x2="170" y2="300" stroke="#13B8D9" strokeWidth="2.2" className="pipe-flow" />

          {/* PRESSURIZADOR — círculo entre RES e BOILER (eixo central y=300) */}
          <g>
            <circle cx="192" cy="300" r="22" fill="rgba(19,184,217,.05)" stroke="#13B8D9" strokeWidth="2" />
            {/* Carcaça interna (impeller) */}
            <circle cx="192" cy="300" r="9" fill="none" stroke="#13B8D9" strokeWidth="1.2" />
            {/* Pás do impeller */}
            <path d="M 192 291 Q 199 295 192 300 Q 185 295 192 291" fill="rgba(19,184,217,.18)" stroke="#13B8D9" strokeWidth="1" />
            <path d="M 201 300 Q 197 307 192 300 Q 197 293 201 300" fill="rgba(19,184,217,.18)" stroke="#13B8D9" strokeWidth="1" />
            <path d="M 192 309 Q 185 305 192 300 Q 199 305 192 309" fill="rgba(19,184,217,.18)" stroke="#13B8D9" strokeWidth="1" />
            <path d="M 183 300 Q 187 293 192 300 Q 187 307 183 300" fill="rgba(19,184,217,.18)" stroke="#13B8D9" strokeWidth="1" />
            {/* Eixo central */}
            <circle cx="192" cy="300" r="2" fill="#13B8D9" />

            {/* Label acima do círculo (rota inferior é usada por PRESS → MANIFOLD) */}
            <text x="192" y="270" textAnchor="middle" fill="#13B8D9" fontSize="10" fontFamily="JetBrains Mono" letterSpacing="1.5" fontWeight="bold">PRESSURIZADOR</text>
          </g>
        </Stage>

        {/* ============================================================ */}
        {/* STAGE 2 — L.03 AQUECIMENTO (PRESS → BOILER + SOLAR + B.CALOR) */}
        {/* ============================================================ */}
        <Stage visible={visible(2)}>
          {/* Tubulação PRESS → BOILER (eixo central horizontal y=300) */}
          <line x1="214" y1="300" x2="285" y2="300" stroke="#13B8D9" strokeWidth="2.2" className="pipe-flow" />

          {/* BOILER — caixa retangular compacta (100x90), centro cx=335, cy=300, com pés visíveis */}
          <g>
            {/* Topo arredondado */}
            <path d="M 285 265 Q 285 255 295 255 L 375 255 Q 385 255 385 265" fill="rgba(19,184,217,.06)" stroke="#13B8D9" strokeWidth="2" />
            {/* Corpo */}
            <rect x="285" y="265" width="100" height="80" fill="rgba(19,184,217,.05)" stroke="#13B8D9" strokeWidth="2" />
            {/* Base */}
            <line x1="285" y1="345" x2="385" y2="345" stroke="#13B8D9" strokeWidth="2" />
            {/* Pés */}
            <line x1="297" y1="345" x2="297" y2="355" stroke="#13B8D9" strokeWidth="1.5" />
            <line x1="373" y1="345" x2="373" y2="355" stroke="#13B8D9" strokeWidth="1.5" />

            {/* Faixas de visor / nível interno */}
            <rect x="297" y="275" width="76" height="2.6" fill="#13B8D9" opacity="0.55" />
            <rect x="297" y="282" width="76" height="2.6" fill="#13B8D9" opacity="0.35" />
            {/* Serpentina interna térmica (4 ondas, proporcionais ao novo tamanho) */}
            <path d="M 299 296 Q 309 291 319 296 Q 329 301 339 296 Q 349 291 359 296 Q 369 301 379 296" fill="none" stroke="#DBBE7C" strokeWidth="1" opacity="0.8" />
            <path d="M 299 309 Q 309 304 319 309 Q 329 314 339 309 Q 349 304 359 309 Q 369 314 379 309" fill="none" stroke="#DBBE7C" strokeWidth="1" opacity="0.8" />
            <path d="M 299 322 Q 309 317 319 322 Q 329 327 339 322 Q 349 317 359 322 Q 369 327 379 322" fill="none" stroke="#DBBE7C" strokeWidth="1" opacity="0.8" />
            <path d="M 299 335 Q 309 330 319 335 Q 329 340 339 335 Q 349 330 359 335 Q 369 340 379 335" fill="none" stroke="#DBBE7C" strokeWidth="1" opacity="0.8" />

            {/* Label BOILER — vertical rotacionado 90° na lateral direita do icone (fora do retangulo, sem cruzar nem encostar) */}
            <text
              x="402"
              y="300"
              textAnchor="middle"
              fill="#13B8D9"
              fontSize="11"
              fontFamily="JetBrains Mono"
              letterSpacing="1.5"
              fontWeight="bold"
              transform="rotate(90 402 300)"
            >
              BOILER
            </text>
          </g>

          {/* AQUECIMENTO SOLAR — oval/cápsula esquerda (faixa do meio) */}
          <g>
            <rect x="40" y="130" width="120" height="50" rx="25" fill="rgba(219,190,124,.06)" stroke="#DBBE7C" strokeWidth="2" />
            {/* Sol estilizado (centralizado dentro da cápsula) */}
            <circle cx="100" cy="155" r="8" fill="rgba(219,190,124,.40)" stroke="#DBBE7C" strokeWidth="1.4" />
            {[0, 45, 90, 135, 180, 225, 270, 315].map((a) => {
              const r1 = 11, r2 = 17;
              const rad = (a * Math.PI) / 180;
              const x1 = 100 + Math.cos(rad) * r1;
              const y1 = 155 + Math.sin(rad) * r1;
              const x2 = 100 + Math.cos(rad) * r2;
              const y2 = 155 + Math.sin(rad) * r2;
              return <line key={a} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#DBBE7C" strokeWidth="1.1" opacity="0.85" />;
            })}
            {/* Label abaixo */}
            <text x="100" y="200" textAnchor="middle" fill="#DBBE7C" fontSize="10" fontFamily="JetBrains Mono" letterSpacing="1.5" fontWeight="bold">AQUECIMENTO SOLAR</text>
          </g>

          {/* BOMBA DE CALOR — oval/cápsula direita (faixa do meio) */}
          <g>
            <rect x="440" y="130" width="120" height="50" rx="25" fill="rgba(219,190,124,.06)" stroke="#DBBE7C" strokeWidth="2" />
            {/* Núcleo: hélice/aletas estilizadas */}
            <circle cx="500" cy="155" r="14" fill="rgba(0,17,21,.40)" stroke="#DBBE7C" strokeWidth="1.4" />
            {/* Aletas internas (4 pás) */}
            <path d="M 500 142 Q 506 150 500 155 Q 494 150 500 142" fill="#DBBE7C" opacity="0.75" />
            <path d="M 513 155 Q 506 161 500 155 Q 506 149 513 155" fill="#DBBE7C" opacity="0.75" />
            <path d="M 500 168 Q 494 161 500 155 Q 506 161 500 168" fill="#DBBE7C" opacity="0.75" />
            <path d="M 487 155 Q 494 149 500 155 Q 494 161 487 155" fill="#DBBE7C" opacity="0.75" />
            <circle cx="500" cy="155" r="2" fill="#DBBE7C" />
            {/* Pequena onda de calor lateral */}
            <path d="M 520 148 Q 526 152 520 156 Q 514 160 520 164" fill="none" stroke="#DBBE7C" strokeWidth="1" opacity="0.7" />
            {/* Label abaixo */}
            <text x="500" y="200" textAnchor="middle" fill="#DBBE7C" fontSize="10" fontFamily="JetBrains Mono" letterSpacing="1.5" fontWeight="bold">BOMBA DE CALOR</text>
          </g>

          {/* SOLAR → BOILER : convergência na borda superior do boiler (sem cruzar texto/icone) */}
          <path d="M 160 168 Q 220 215 295 255" fill="none" stroke="#DBBE7C" strokeWidth="2" className="pipe-flow" />
          {/* BOMBA DE CALOR → BOILER : convergência na borda superior do boiler (sem cruzar texto/icone) */}
          <path d="M 440 168 Q 410 215 375 255" fill="none" stroke="#DBBE7C" strokeWidth="2" className="pipe-flow" />
        </Stage>

        {/* ============================================================ */}
        {/* STAGE 3 — L.04 MANIFOLD                                      */}
        {/* ============================================================ */}
        <Stage visible={visible(3)}>
          {/* BOILER → MANIFOLD : linha hidráulica sólida descendente curva */}
          <path d="M 335 355 Q 335 405 320 440" fill="none" stroke="#13B8D9" strokeWidth="2.2" className="pipe-flow" />

          {/* PRESS → MANIFOLD : água fria desviada (curva descendente lateral, alpha mais clara) */}
          <path d="M 192 322 Q 192 400 220 440" fill="none" stroke="#13B8D9" strokeWidth="1.6" opacity="0.55" className="pipe-flow" />

          {/* MANIFOLD — barramento horizontal abaixo do boiler */}
          <g>
            <rect x="200" y="440" width="240" height="22" rx="11" fill="rgba(19,184,217,.06)" stroke="#13B8D9" strokeWidth="2" />

            {/* 7 ramais verticais (ambientes) */}
            {[0, 1, 2, 3, 4, 5, 6].map((i) => {
              const x = 218 + i * 34;
              return (
                <g key={i}>
                  {/* Registro (válvula) na saída */}
                  <rect x={x - 3} y="462" width="6" height="6" fill="rgba(19,184,217,.15)" stroke="#13B8D9" strokeWidth="0.8" />
                  {/* Ramal */}
                  <line x1={x} y1="468" x2={x} y2="498" stroke="#13B8D9" strokeWidth="1.5" className="pipe-flow" />
                  {/* Ponto de chegada */}
                  <circle cx={x} cy="502" r="2.5" fill="#13B8D9" />
                </g>
              );
            })}

            {/* Label */}
            <text x="320" y="520" textAnchor="middle" fill="#13B8D9" fontSize="11" fontFamily="JetBrains Mono" letterSpacing="1.5" fontWeight="bold">MANIFOLD</text>
          </g>
        </Stage>

        {/* ============================================================ */}
        {/* STAGE 4 — L.05 RECIRCULAÇÃO + BOMBAS + AUTOMAÇÃO + cabos     */}
        {/* ============================================================ */}
        <Stage visible={visible(4)}>
          {/* RECIRCULAÇÃO — oval/cápsula central (faixa do meio, entre SOLAR e B.CALOR) */}
          <g>
            <rect x="240" y="130" width="120" height="50" rx="25" fill="rgba(19,184,217,.06)" stroke="#13B8D9" strokeWidth="2" />
            {/* Loop circular dentro */}
            <path
              d="M 300 142 A 13 13 0 1 1 290 166"
              fill="none"
              stroke="#13B8D9"
              strokeWidth="1.8"
              strokeLinecap="round"
              markerEnd="url(#arrow-cyan)"
            />
            <circle cx="300" cy="155" r="2" fill="#13B8D9" />
            {/* Label abaixo */}
            <text x="300" y="200" textAnchor="middle" fill="#13B8D9" fontSize="10" fontFamily="JetBrains Mono" letterSpacing="1.5" fontWeight="bold">RECIRCULAÇÃO</text>
          </g>

          {/* RECIRCULAÇÃO → BOILER : sai do canto inferior direito do oval e curva pra topo do boiler — passa à direita do label "RECIRCULAÇÃO" */}
          <path d="M 345 180 Q 350 220 350 255" fill="none" stroke="#13B8D9" strokeWidth="2" className="pipe-flow" />

          {/* BOMBAS — oval/cápsula superior (centro) */}
          <g>
            <rect x="240" y="40" width="120" height="44" rx="22" fill="rgba(19,184,217,.06)" stroke="#13B8D9" strokeWidth="2" />

            {/* Bomba 1 */}
            <circle cx="270" cy="62" r="10" fill="none" stroke="#13B8D9" strokeWidth="1.3" />
            <line x1="263" y1="62" x2="277" y2="62" stroke="#13B8D9" strokeWidth="1" />
            <line x1="270" y1="55" x2="270" y2="69" stroke="#13B8D9" strokeWidth="1" />
            <circle cx="270" cy="62" r="1.5" fill="#13B8D9" />

            {/* Bomba 2 */}
            <circle cx="330" cy="62" r="10" fill="none" stroke="#13B8D9" strokeWidth="1.3" />
            <line x1="323" y1="62" x2="337" y2="62" stroke="#13B8D9" strokeWidth="1" />
            <line x1="330" y1="55" x2="330" y2="69" stroke="#13B8D9" strokeWidth="1" />
            <circle cx="330" cy="62" r="1.5" fill="#13B8D9" />

            {/* Conector entre as duas */}
            <line x1="280" y1="62" x2="320" y2="62" stroke="#13B8D9" strokeWidth="0.8" opacity="0.5" />

            {/* Label acima do oval */}
            <text x="300" y="32" textAnchor="middle" fill="#13B8D9" fontSize="11" fontFamily="JetBrains Mono" letterSpacing="1.5" fontWeight="bold">BOMBAS</text>
          </g>

          {/* AUTOMAÇÃO — círculo à direita das BOMBAS */}
          <g>
            <circle cx="420" cy="62" r="22" fill="rgba(219,190,124,.06)" stroke="#DBBE7C" strokeWidth="2" />
            {/* Lâmpada */}
            <path d="M 413 57 Q 413 51 420 51 Q 427 51 427 57 Q 427 61 424 64 L 416 64 Q 413 61 413 57 Z" fill="rgba(219,190,124,.20)" stroke="#DBBE7C" strokeWidth="1.2" />
            {/* Filamento */}
            <path d="M 416 58 L 420 54 L 424 58" fill="none" stroke="#DBBE7C" strokeWidth="0.8" />
            {/* Base da lâmpada */}
            <line x1="416" y1="67" x2="424" y2="67" stroke="#DBBE7C" strokeWidth="1.2" />
            <line x1="417" y1="70" x2="423" y2="70" stroke="#DBBE7C" strokeWidth="1.2" />
            {/* Label acima */}
            <text x="420" y="32" textAnchor="middle" fill="#DBBE7C" fontSize="11" fontFamily="JetBrains Mono" letterSpacing="1.5" fontWeight="bold">AUTOMAÇÃO</text>
          </g>

          {/* === Cabo BOMBAS ↔ AUTOMAÇÃO (horizontal curto, dourado sólido) === */}
          <line x1="360" y1="62" x2="398" y2="62" stroke="#DBBE7C" strokeWidth="2" opacity="0.95" />
          <circle cx="360" cy="62" r="2.2" fill="#DBBE7C" />
          <circle cx="398" cy="62" r="2.2" fill="#DBBE7C" />

          {/* === Cabos de comando BOMBAS → 3 fontes (descem sem cruzar texto) === */}
          {/* BOMBAS → SOLAR (alert dourado, comanda fonte térmica) */}
          <path
            d="M 260 84 L 260 107 L 100 107 L 100 130"
            fill="none"
            stroke="#DBBE7C"
            strokeWidth="1.4"
            strokeDasharray="3 3"
            opacity="0.6"
          />
          <circle cx="260" cy="84" r="2" fill="#DBBE7C" />
          <circle cx="100" cy="130" r="2" fill="#DBBE7C" />

          {/* BOMBAS → RECIRCULAÇÃO (ciano, comando hidráulico) */}
          <path
            d="M 300 84 L 300 130"
            fill="none"
            stroke="#13B8D9"
            strokeWidth="1.4"
            strokeDasharray="3 3"
            opacity="0.6"
          />
          <circle cx="300" cy="84" r="2" fill="#13B8D9" />
          <circle cx="300" cy="130" r="2" fill="#13B8D9" />

          {/* BOMBAS → BOMBA DE CALOR (alert dourado, comanda fonte térmica) */}
          <path
            d="M 340 84 L 340 107 L 500 107 L 500 130"
            fill="none"
            stroke="#DBBE7C"
            strokeWidth="1.4"
            strokeDasharray="3 3"
            opacity="0.6"
          />
          <circle cx="340" cy="84" r="2" fill="#DBBE7C" />
          <circle cx="500" cy="130" r="2" fill="#DBBE7C" />

          {/* === Loop de retorno: MANIFOLD → RECIRCULAÇÃO (lateral direita) === */}
          {/* Sai do extremo direito do manifold, sobe pela direita (passa por fora do label BOILER vertical x=395-409),
              cruza a faixa abaixo das labels do meio (y=215), desce ao corredor x=380 (entre BOILER box e BOMBA DE CALOR oval),
              e entra na borda direita do oval RECIRCULAÇÃO em (360, 155). */}
          <path
            d="M 440 451 L 480 451 L 480 215 L 380 215 L 380 155 L 360 155"
            fill="none"
            stroke="#13B8D9"
            strokeWidth="1.5"
            strokeDasharray="5 4"
            opacity="0.7"
            markerEnd="url(#arrow-cyan)"
          />
        </Stage>
      </svg>
    </div>
  );
}

function Stage({ visible, children }) {
  return (
    <motion.g
      initial={false}
      animate={{ opacity: visible ? 1 : 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      {children}
    </motion.g>
  );
}

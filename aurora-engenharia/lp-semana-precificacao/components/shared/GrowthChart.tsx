'use client';

import { motion } from 'framer-motion';
import { usePrefersReducedMotion } from '@/lib/hooks';

// ============================================================
// GrowthChart — visual da Hero. Dashboard premium (ref. Linear/Stripe/Vercel).
// Animação (mount): a curva verde é DESENHADA em tempo real (linear ~2.6s) da
// esquerda p/ a direita; a área cresce junto (clip que expande); um brilho segue
// a ponta; a vermelha desenha mais discreta e um pouco mais lenta (sem glow).
// Ao terminar, o nó final ganha glow intenso com "respiração" contínua.
// Tudo suave e discreto — sem efeitos chamativos. Respeita prefers-reduced-motion.
// ============================================================
// "GREEN" = trilha do Engenheiro 1 — agora em DOURADO (pedido do cliente).
const GREEN = '#DBBE7C';
const GREEN_GLOW = '#E4C989';
const RED = '#E5646B'; // Engenheiro 2 — vermelho
const AXIS = 'rgba(122,139,145,0.55)';

const DUR = 2.6; // desenho da verde (tempo real, linear)
const RED_DUR = 3.1; // vermelha ligeiramente mais lenta
const START = 0.2; // atraso inicial da verde

// trajetórias (viewBox 0 0 460 580 · base y=510 · topo y=40 · esq x=36 · dir x=440)
const LINE_GREEN = 'M36,460 L94,430 L152,415 L210,325 L268,300 L326,205 L384,130 L440,62';
const LINE_RED = 'M36,475 L94,470 L152,452 L210,456 L268,432 L326,438 L384,412 L440,388';
const AREA_GREEN =
  'M36,460 L94,430 L152,415 L210,325 L268,300 L326,205 L384,130 L440,62 L440,510 L36,510 Z';

// pontos da verde + fração de comprimento de arco em cada um (p/ o brilho seguir a ponta
// no mesmo ritmo do desenho, que é linear por comprimento)
const GREEN_PTS: [number, number][] = [
  [36, 460], [94, 430], [152, 415], [210, 325], [268, 300], [326, 205], [384, 130], [440, 62]
];
const GREEN_T = [0, 0.111, 0.212, 0.394, 0.501, 0.69, 0.851, 1];

const H_LINES = [95, 170, 245, 320, 395, 470]; // grid horizontal
const V_LINES = [94, 152, 210, 268, 326, 384, 440]; // grid vertical

export default function GrowthChart() {
  const reduced = usePrefersReducedMotion();

  return (
    <div className="flex h-full min-h-[460px] w-full flex-col">
      <div className="relative flex-1">
        <svg
          viewBox="0 0 460 580"
          className="h-full w-full"
          preserveAspectRatio="xMidYMax meet"
          style={{ overflow: 'visible' }}
          role="img"
          aria-label="Gráfico honorário por projeto: a receita do engenheiro que sabe precificar cresce continuamente; a de quem cobra de forma tradicional estagna."
        >
          <defs>
            {/* área verde com gradiente em 3 paradas — mais profundidade, não chapado */}
            <linearGradient id="greenArea" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={GREEN} stopOpacity="0.30" />
              <stop offset="55%" stopColor={GREEN} stopOpacity="0.08" />
              <stop offset="100%" stopColor={GREEN} stopOpacity="0" />
            </linearGradient>
            {/* sombras internas projetadas a partir dos eixos (profundidade) */}
            <linearGradient id="depthLeft" gradientUnits="userSpaceOnUse" x1="36" y1="0" x2="108" y2="0">
              <stop offset="0%" stopColor="#000" stopOpacity="0.55" />
              <stop offset="100%" stopColor="#000" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="depthBottom" gradientUnits="userSpaceOnUse" x1="0" y1="510" x2="0" y2="438">
              <stop offset="0%" stopColor="#000" stopOpacity="0.55" />
              <stop offset="100%" stopColor="#000" stopOpacity="0" />
            </linearGradient>
            {/* clip que expande da esquerda p/ a direita — revela a área junto com a linha */}
            <clipPath id="areaReveal">
              {reduced ? (
                <rect x="36" y="0" width="410" height="520" />
              ) : (
                <motion.rect
                  x="36"
                  y="0"
                  height="520"
                  initial={{ width: 0 }}
                  animate={{ width: 410 }}
                  transition={{ duration: DUR, ease: 'linear', delay: START }}
                />
              )}
            </clipPath>
          </defs>

          {/* grid sutil — leve respiração de opacidade (dashboard moderno) */}
          <motion.g
            stroke="rgba(255,255,255,0.055)"
            strokeWidth="1"
            initial={reduced ? false : { opacity: 0 }}
            animate={reduced ? undefined : { opacity: [0, 1, 0.85, 1] }}
            transition={
              reduced
                ? undefined
                : { duration: 9, times: [0, 0.12, 0.6, 1], repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' }
            }
          >
            {H_LINES.map((y) => (
              <line key={`h${y}`} x1="36" y1={y} x2="440" y2={y} />
            ))}
            {V_LINES.map((x) => (
              <line key={`v${x}`} x1={x} y1="40" x2={x} y2="510" />
            ))}
            <line x1="36" y1="510" x2="440" y2="510" />
          </motion.g>

          {/* rótulos dos eixos */}
          <motion.text
            initial={reduced ? false : { opacity: 0 }}
            animate={reduced ? undefined : { opacity: 1 }}
            transition={reduced ? undefined : { duration: 0.6, delay: 0.5 }}
            x="26" y="178" transform="rotate(-90 26 178)" textAnchor="start" fill={AXIS}
            className="font-mono" style={{ fontSize: '14px', letterSpacing: '0.14em' }}
          >
            HONORÁRIO
          </motion.text>
          <motion.text
            initial={reduced ? false : { opacity: 0 }}
            animate={reduced ? undefined : { opacity: 1 }}
            transition={reduced ? undefined : { duration: 0.6, delay: 0.5 }}
            x="440" y="540" textAnchor="end" fill={AXIS}
            className="font-mono" style={{ fontSize: '14px', letterSpacing: '0.14em' }}
          >
            PROJETOS
          </motion.text>

          {/* área verde — revelada pelo clip que cresce junto com a linha */}
          <path d={AREA_GREEN} fill="url(#greenArea)" stroke="none" clipPath="url(#areaReveal)" />

          {/* linha do Engenheiro 2 — cinza, discreta, sem glow, mais lenta */}
          <motion.path
            initial={reduced ? false : { pathLength: 0, opacity: 0 }}
            animate={reduced ? undefined : { pathLength: 1, opacity: 0.8 }}
            transition={
              reduced
                ? undefined
                : { pathLength: { duration: RED_DUR, ease: 'linear', delay: 0.35 }, opacity: { duration: 0.3, delay: 0.35 } }
            }
            d={LINE_RED}
            fill="none"
            stroke={RED}
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity={reduced ? 0.8 : undefined}
          />

          {/* linha verde (Engenheiro 1) — desenhada em tempo real (linear) */}
          <motion.path
            initial={reduced ? false : { pathLength: 0, opacity: 0 }}
            animate={reduced ? undefined : { pathLength: 1, opacity: 1 }}
            transition={
              reduced
                ? undefined
                : { pathLength: { duration: DUR, ease: 'linear', delay: START }, opacity: { duration: 0.2, delay: START } }
            }
            d={LINE_GREEN}
            fill="none"
            stroke={GREEN}
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ filter: `drop-shadow(0 0 3px ${GREEN}66)` }}
          />

          {/* eixos + sombra de profundidade POR CIMA das linhas → as curvas
              emergem de trás das demarcações (efeito 3D) */}
          <rect x="36" y="40" width="72" height="470" fill="url(#depthLeft)" />
          <rect x="36" y="438" width="408" height="72" fill="url(#depthBottom)" />
          <motion.path
            initial={reduced ? false : { pathLength: 0, opacity: 0 }}
            animate={reduced ? undefined : { pathLength: 1, opacity: 1 }}
            transition={reduced ? undefined : { duration: 0.6, ease: [0.22, 0.61, 0.36, 1], delay: 0.1 }}
            d="M36,40 L36,510 L444,510"
            fill="none"
            stroke={AXIS}
            strokeWidth="1.5"
            strokeLinecap="round"
          />

          {/* brilho que segue a PONTA da verde durante o desenho */}
          {!reduced && (
            <motion.circle
              r="7"
              fill={GREEN_GLOW}
              initial={{ opacity: 0, cx: GREEN_PTS[0][0], cy: GREEN_PTS[0][1] }}
              animate={{
                cx: GREEN_PTS.map((p) => p[0]),
                cy: GREEN_PTS.map((p) => p[1]),
                opacity: [0, 1, 1, 1, 1, 1, 1, 0]
              }}
              transition={{ duration: DUR, ease: 'linear', delay: START, times: GREEN_T }}
              style={{ filter: `blur(1.5px) drop-shadow(0 0 9px ${GREEN_GLOW})` }}
            />
          )}

          {/* nó final vermelho — discreto */}
          <motion.circle
            initial={reduced ? false : { opacity: 0 }}
            animate={reduced ? undefined : { opacity: 0.85 }}
            transition={reduced ? undefined : { duration: 0.4, delay: 0.35 + RED_DUR - 0.1 }}
            cx="440" cy="388" r="5.5" fill={RED} opacity={reduced ? 0.85 : undefined}
          />

          {/* nó final verde — estático, brilho parado (sem movimento) */}
          <motion.circle
            cx="440" cy="62" r="7" fill={GREEN}
            initial={reduced ? false : { opacity: 0 }}
            animate={reduced ? undefined : { opacity: 1 }}
            transition={reduced ? undefined : { duration: 0.4, delay: START + DUR - 0.05 }}
            style={{ filter: `drop-shadow(0 0 8px ${GREEN_GLOW})` }}
          />

          {/* valores finais — Engenheiro 1 (+R$ 40k) e Engenheiro 2 (R$ 2 mil) */}
          <motion.text
            initial={reduced ? false : { opacity: 0 }}
            animate={reduced ? undefined : { opacity: 1 }}
            transition={reduced ? undefined : { duration: 0.4, delay: START + DUR + 0.1 }}
            x="450" y="67" textAnchor="start" fill={GREEN}
            className="font-mono" style={{ fontSize: '18px', fontWeight: 800 }}
          >
            +R$ 45 mil
          </motion.text>
          <motion.text
            initial={reduced ? false : { opacity: 0 }}
            animate={reduced ? undefined : { opacity: 1 }}
            transition={reduced ? undefined : { duration: 0.4, delay: 0.35 + RED_DUR }}
            x="450" y="393" textAnchor="start" fill={RED}
            className="font-mono" style={{ fontSize: '15px', fontWeight: 700 }}
          >
            R$ 2 mil
          </motion.text>

          {/* legenda DENTRO do gráfico — canto superior esquerdo */}
          <motion.g
            initial={reduced ? false : { opacity: 0 }}
            animate={reduced ? undefined : { opacity: 1 }}
            transition={reduced ? undefined : { duration: 0.6, delay: START + DUR }}
            className="font-mono" style={{ fontSize: '17px' }}
          >
            <circle cx="58" cy="80" r="6" fill={GREEN} />
            <text x="74" y="86" fill="#E0E0DA">Engenheiro 1</text>
            <circle cx="58" cy="112" r="6" fill={RED} />
            <text x="74" y="118" fill="#E0E0DA">Engenheiro 2</text>
          </motion.g>
        </svg>
      </div>

      {/* frase de fecho (marketing) — grande, "número 1" na cor do Engenheiro 1 */}
      <motion.div
        initial={reduced ? false : { opacity: 0 }}
        animate={reduced ? undefined : { opacity: 1 }}
        transition={reduced ? undefined : { duration: 0.6, delay: START + DUR + 0.1 }}
        className="-mt-4 text-center md:-mt-6"
      >
        <p className="text-lg font-bold uppercase leading-tight tracking-tight text-paper md:text-xl">
          Quem sabe precificar vira o{' '}
          <span style={{ color: GREEN }}>número 1</span>.
        </p>
        <p className="mt-1.5 text-sm text-cota">O resto continua brigando por preço.</p>
      </motion.div>
    </div>
  );
}

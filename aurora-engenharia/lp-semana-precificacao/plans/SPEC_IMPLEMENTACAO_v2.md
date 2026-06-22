# Spec de Implementação Front-end v2 — Semana da Precificação

> **O que é:** tradução técnica da `EXPERIENCIA_v2.md` para implementação. **Não** altera copy
> (fonte: `content/site.ts`) nem UX (fonte: `EXPERIENCIA_v2.md`). Só especifica *como construir*.
>
> **Stack atual (mantida):** Next.js 14 (App Router) · React 18 · TypeScript · TailwindCSS 3 ·
> Framer Motion 11. Já existem primitivos de motion e hooks — esta spec **reaproveita** e marca
> com 🆕 o que precisa ser criado.

---

## 1. DEPENDÊNCIAS

**Nenhuma nova dependência.** Tudo é coberto por Framer Motion 11 (já instalado) + rAF nativo.

| Lib | Já instalada? | Uso |
|---|---|---|
| `framer-motion` ^11 | ✅ | `useInView`, `whileInView`, `useScroll`, `useTransform`, `motion.*` |
| rAF nativo | ✅ | count-up (já em `CountUp.tsx`) |
| ~~GSAP~~ | ❌ não adicionar | Framer Motion `useScroll`+`useTransform` cobre o scrollytelling da Conta da Mesa |
| ~~Lenis/locomotive~~ | ❌ não adicionar | scroll nativo + sticky CSS bastam; smooth-scroll quebra acessibilidade |

> **Decisão:** zero libs novas. O único candidato seria GSAP ScrollTrigger, mas o pico
> (Conta da Mesa) é um `position: sticky` + `useScroll` derivando o passo ativo — Framer dá conta.

---

## 2. ARQUITETURA DE PASTAS / COMPONENTES

```
app/
  layout.tsx                 # fonts (Poppins + JetBrains), <html lang="pt-BR">, metadata
  page.tsx                   # compõe as 11 seções na ordem + ThemeFade entre temas
  globals.css                # utilitários (halo, cross-grid, fade-to-light/dark, sticky helpers)

components/
  motion/                    # PRIMITIVOS (reaproveitados)
    CountUp.tsx              # ✅ rAF + useInView, once, pt-BR, respeita reduced-motion
    MaskReveal.tsx           # ✅ wipe/glow + MaskRevealGroup + MaskRevealLine
    Reveal.tsx               # ✅ Reveal + StaggerGroup + StaggerItem
    DrawLine.tsx             # 🆕 SVG path com stroke-dashoffset dirigido por inView OU progress
    ScrollProgressBar.tsx    # 🆕 régua aurora do topo (useScroll → scaleX)

  site/                      # SEÇÕES (1 arquivo por seção — isoladas)
    TopBar.tsx               # ✅ adaptar: + condensação no scroll, troca de label
    Hero.tsx                 # ✅ refazer: protagonista = <MesaCounter/>
    Reframe.tsx              # 🆕 comparativo Mentalidade × Método
    ContaDaMesa.tsx          # 🆕 ⭐ scrollytelling sticky — PEÇA-ESTRELA
    TresNoites.tsx           # ✅ adaptar: timeline + DrawLine no trilho
    ProvaSocial.tsx          # ✅ adaptar: CountUp no "depois" (emerald)
    Qualificacao.tsx         # ✅ adaptar: checks com DrawLine
    Objecao.tsx              # ✅ adaptar: crença riscada + <AnchorBars/>
    SobreLeo.tsx             # ✅ adaptar: stats CountUp + moldura DrawLine
    Oferta.tsx               # ✅ adaptar: preço scale-in (sem glow pulsante) + garantia stampIn
    FAQ.tsx                  # ✅ acordeão (height auto)
    Footer.tsx               # ✅ adaptar: eco do <MesaCounter/> (variante "não trava")
    StickyCTA.tsx            # ✅ manter: slide-up + ocultar sobre #pricing/#footer

  shared/                    # COMPONENTES PROTAGONISTAS reutilizáveis
    MesaCounter.tsx          # 🆕 contador "deixado na mesa" (Hero trava · Footer não trava)
    AnchorBars.tsx           # 🆕 barras de ancoragem (desconto perdido × R$ 27)
    SectionShell.tsx         # 🆕 wrapper de seção: tema dark/light, halo, padding, id de âncora

content/
  site.ts                    # ✅ FONTE DA COPY — nada de texto hardcoded nos componentes

lib/
  hooks.ts                   # ✅ useCheckout, useIsMobile, usePrefersReducedMotion, useCountdown, useSeats
  useScrollStep.ts           # 🆕 deriva o passo ativo (0..n) de um progress 0..1 (Conta/3 Noites)
```

**Regra de isolamento:** cada seção é um componente client (`'use client'` só onde há
interação/motion), recebe `onCTAClick` por prop, e lê texto de `content/site.ts`. Nenhuma
seção conhece a outra — a ordem vive só em `page.tsx`.

---

## 3. PRIMITIVOS DE MOTION — contrato de cada um

### 3.1 Existentes (usar como estão)
- **`<CountUp to prefix suffix grouped duration/>`** — número que sobe. `once`, reduced-motion
  mostra final. Para dinheiro: `grouped prefix="R$ "`.
- **`<MaskReveal variant="wipe|glow" trigger="inview|mount"/>`** — texto acende (não sobe).
  `mount` no Hero (above-the-fold), `inview` no resto. `MaskRevealGroup` faz stagger.
- **`<Reveal/>` / `<StaggerGroup/>`** — herança (sobe de baixo). Usar só onde "acender" não
  cabe; preferir `MaskReveal` na v2.

### 3.2 Novos 🆕

**`<DrawLine pathD strokeColor trigger="inview|progress" progress?/>`**
SVG path que se desenha via `stroke-dashoffset`. Dois modos: `inview` (desenha 1x ao entrar) ou
`progress` (dashoffset amarrado a um MotionValue 0..1 — usado no trilho das 3 Noites e na
moldura do mentor). Base de keyframe `drawLine` já existe no Tailwind para casos CSS-only.

**`<ScrollProgressBar/>`**
```
const { scrollYProgress } = useScroll()
scaleX = scrollYProgress            // origin-left
=> <motion.div style={{ scaleX }} className="fixed top-0 h-[3px] bg-aurora origin-left z-50"/>
```

**`useScrollStep(targetRef, steps)` → `{ progress, activeStep }`**
```
const { scrollYProgress } = useScroll({ target, offset: ['start start','end end'] })
activeStep = useTransform(scrollYProgress, p => clamp(floor(p * steps), 0, steps-1))
return { progress: scrollYProgress, activeStep }
```

---

## 4. MAPA DE TRIGGERS DE SCROLL

| Seção | Trigger | Mecanismo | O que dispara | Once? |
|---|---|---|---|---|
| TopBar | scroll Y > 80px | listener (rAF-throttled) | condensa (blur+shrink) | não (reversível) |
| TopBar | cruzar `#pricing` | `useInView(pricingRef)` | troca label do CTA | não |
| ScrollProgressBar | scroll contínuo | `useScroll().scrollYProgress` | `scaleX` da régua | não |
| Hero · MesaCounter | mount | `trigger="mount"` | count-up 0→60.000, depois trava | sim |
| Hero · H1 | mount | `MaskReveal mount` | acende palavra a palavra | sim |
| Reframe · texto | inView 30% | `MaskRevealGroup` | 3 frases em sequência | sim |
| Reframe · comparativo | inView 20% | `StaggerGroup` (col. dir. +0.1s) | colunas entram | sim |
| **Conta da Mesa** | **sticky + progress** | **`useScrollStep(ref, 4)`** | **passos 1→4 + total estoura** | progress (reversível) |
| 3 Noites (desktop) | sticky + progress | `useScrollStep(ref, 3)` | aula ativa + trilho DrawLine | progress |
| 3 Noites (mobile) | inView por card | `Reveal` linear | lista simples | sim |
| Prova · cada card | inView 50% | `CountUp` no "depois" | número sobe (emerald) | sim |
| Qualificação · checks | inView 30% | `DrawLine` em stagger | ✓ se desenham | sim |
| Objeção · crenças | inView por item | `DrawLine` (risco) + `MaskReveal` | risca + resposta acende | sim |
| Objeção · AnchorBars | inView 40% | `scaleX` origin-left | barras crescem | sim |
| Mentor · stats | inView 50% | `CountUp` | 3 stats sobem | sim |
| Mentor · moldura | inView 30% | `DrawLine` nos cantos | ficha se desenha | sim |
| Oferta · lista | inView 15% | `StaggerGroup` numerado | itens 01–06 | sim |
| Oferta · preço | inView 50% | scale-in 1.04→1 (sem pulse) | preço assenta | sim |
| Oferta · garantia | inView 60% | keyframe `stampIn` | selo carimba | sim |
| FAQ · itens | inView 15% + click | `Reveal` + height auto | entra / abre | entra: sim |
| Footer · MesaCounter | inView | `MesaCounter variant="eco"` | sobe devagar, **NÃO trava** | sim |
| StickyCTA | scroll > 5%/30% + `#pricing`/`#footer` inView | listener + `useInView` | slide-up / oculta | não |

---

## 5. PSEUDO-CÓDIGO DE ANIMAÇÕES (componentes-chave)

### 5.1 `MesaCounter` — protagonista do Hero (e eco no Footer)
```tsx
// props: { to: number; variant: 'hero' | 'eco' }
// hero  → conta 0→to, ao terminar TRAVA e entra o selo (cor congela em alert/dourado)
// eco   → conta devagar, loop lento OU segue sem selo (perda "continua" enquanto não decide)

function MesaCounter({ to, variant }) {
  const reduced = usePrefersReducedMotion()
  const ref = useRef()
  const inView = useInView(ref, { once: true, amount: 0.5 })
  const [done, setDone] = useState(false)

  // hero anima no mount; eco anima no inView
  const active = variant === 'hero' ? true : inView

  // núcleo: reusar a lógica de CountUp (rAF + ease-out cubic), com onComplete
  // duration: hero ~1600ms · eco ~2600ms (mais lento, mais "pesado")
  // ao completar (só hero): setDone(true) -> renderiza <SeloTrava/>

  return (
    <div ref={ref} className="font-mono tabular-nums text-alert ...">
      <span className="label">▸ Deixado na mesa este ano</span>
      <CountUpCore to={to} grouped prefix="R$ " duration={variant==='hero'?1600:2600}
                   active={active} onComplete={variant==='hero' ? ()=>setDone(true) : undefined}/>
      {done && <SeloTrava text="a conta tira o dinheiro da mesa" />}  // stampIn, dourado→aurora
    </div>
  )
}
// reduced-motion: mostra `to` final imediatamente; selo aparece sem animar.
```

### 5.2 `ContaDaMesa` — ⭐ scrollytelling sticky (PICO)
```tsx
// Estrutura: um wrapper alto (h ~300vh) com um miolo sticky (h 100vh).
// O progresso do scroll dentro do wrapper revela os 4 passos e soma o total.

function ContaDaMesa() {
  const wrapRef = useRef()
  const isMobile = useIsMobile()
  if (isMobile) return <ContaDaMesaMobile/>   // fallback: passos empilhados, total em CountUp 1x

  const { progress, activeStep } = useScrollStep(wrapRef, 4)  // 0..3

  // total derivado do progresso (número que CAI nos passos 2-3 e ESTOURA no 4)
  // valores ilustrativos vindos de content/site.ts (NÃO hardcode)
  const total = useTransform(progress, [0,.25,.5,.75,1],
                             [valorCobrado, -custos, margemReal, margemReal, margemReal*projetos])

  return (
    <section ref={wrapRef} className="relative h-[300vh] bg-ink">
      <div className="sticky top-0 h-screen grid md:grid-cols-2 items-center">
        <div className="explicacao"> {/* H2 + texto, MaskReveal */} </div>
        <div className="conta">
          {PASSOS.map((p,i)=>(
            <StepLine key={i} data={p} state={ i<activeStep?'done': i===activeStep?'active':'idle' }/>
          ))}
          <motion.div className="total text-alert text-6xl font-mono tabular-nums">
            R$ <MotionNumber value={total} grouped/>   {/* deriva display do MotionValue */}
          </motion.div>
          <Selo text="valores ilustrativos · a sua a gente monta na Aula 01"/>
        </div>
      </div>
    </section>
  )
}
// activeStep controla: cada StepLine acende (idle→active→done), número reage ao progress.
// reduced-motion/mobile: sem sticky; passos visíveis; total faz UM count-up ao entrar.
```

### 5.3 `TresNoites` — timeline com trilho (desktop) / lista (mobile)
```tsx
const { activeStep, progress } = useScrollStep(ref, 3)
// trilho vertical: <DrawLine trigger="progress" progress={progress} strokeColor="emerald"/>
// 3 cards: card[activeStep] => opacity 1 + scale 1.0 ; outros => opacity .4 scale .98
// bloco "Você sai com" do card ativo: height auto + selo ▸ entregável (micro scale 1.03→1)
// mobile (useIsMobile): map simples com <Reveal/> por card, sem sticky
```

### 5.4 `Objecao` — crença riscada + AnchorBars
```tsx
// por item: a crença (cinza) recebe <DrawLine> horizontal (risco dourado) ao inView,
//           depois a resposta <MaskReveal variant="glow"> acende.
// AnchorBars:
function AnchorBars({ descontoValor, precoValor }) {
  // largura proporcional: desconto = 100%, preço = (preco/desconto)*100  (fica minúsculo)
  return <>
    <Bar w="100%" color="alert"  label="desconto sem pensar" value={descontoValor}/>
    <Bar w={`${preco/desconto*100}%`} color="aurora" label="a imersão" value={precoValor}/>
  </>
  // motion: scaleX 0→1 origin-left, ease assinatura, inView once
}
```

### 5.5 `ScrollProgressBar` / `TopBar` condensação / `StickyCTA`
```tsx
// ScrollProgressBar: useScroll().scrollYProgress -> style={{scaleX}} fixed top h-[3px] bg-aurora
// TopBar: onScroll (rAF) -> condensed = scrollY>80 ; label = pricingInView ? ctaOferta : ctaDesktop
// StickyCTA: visible = scrollPct > (isMobile?5:30) && !pricingInView && !footerInView
//            motion: y 100%→0 (slide-up), 0.25s ease
```

---

## 6. ESTRUTURA HTML BASE

### 6.1 `app/page.tsx` (composição — ordem das 11 seções)
```tsx
'use client'
import { useCheckout } from '@/lib/hooks'
// ...imports das seções

export default function Page() {
  const onCTA = useCheckout()
  return (
    <>
      <ScrollProgressBar/>
      <TopBar onCTAClick={onCTA}/>
      <main>
        <Hero onCTAClick={onCTA}/>            {/* 🌑 */}
        <ThemeFade to="light"/>
        <Reframe/>                            {/* ☀️ */}
        <ThemeFade to="dark"/>
        <ContaDaMesa/>                        {/* 🌑 ⭐ */}
        <ThemeFade to="light"/>
        <TresNoites onCTAClick={onCTA}/>      {/* ☀️ */}
        <ThemeFade to="dark"/>
        <ProvaSocial/>                        {/* 🌑 */}
        <ThemeFade to="light"/>
        <Qualificacao/>                       {/* ☀️ */}
        <ThemeFade to="dark"/>
        <Objecao/>                            {/* 🌑 */}
        <ThemeFade to="light"/>
        <SobreLeo/>                           {/* ☀️ */}
        <ThemeFade to="dark"/>
        <Oferta id="pricing" onCTAClick={onCTA}/>  {/* 🌑 */}
        <ThemeFade to="light"/>
        <FAQ/>                                {/* ☀️ */}
        <ThemeFade to="dark"/>
      </main>
      <Footer id="footer" onCTAClick={onCTA}/> {/* 🌑 */}
      <StickyCTA onCTAClick={onCTA}/>
    </>
  )
}
```

### 6.2 Esqueleto de uma seção (padrão para todas)
```tsx
// components/site/Reframe.tsx
'use client'
import { reframe } from '@/content/site'           // copy
import SectionShell from '@/components/shared/SectionShell'
import { MaskReveal, MaskRevealGroup } from '@/components/motion/MaskReveal'

export default function Reframe() {
  return (
    <SectionShell theme="light" id="reframe" className="...">
      <p className="eyebrow font-mono">{reframe.eyebrow}</p>
      <MaskReveal as="h2" variant="glow">{reframe.h2}</MaskReveal>
      <MaskRevealGroup className="mt-6 space-y-2">
        {reframe.frases.map((f,i)=> <MaskRevealLine key={i}>{f}</MaskRevealLine>)}
      </MaskRevealGroup>
      <div className="comparativo grid md:grid-cols-2 ...">{/* col esquerda/direita */}</div>
    </SectionShell>
  )
}
```

### 6.3 `SectionShell` (wrapper de tema/halo/âncora)
```tsx
// theme: 'dark' => bg-ink text-paper + halo radial opcional ; 'light' => bg-paper text-ink + cross-grid
// props: { theme, id, halo?, className, children }
<section id={id} className={cn(base, theme==='dark' ? 'bg-ink ...' : 'bg-paper ...')}>
  {halo && <div aria-hidden className="halo-radial"/>}
  <div className="container mx-auto px-...">{children}</div>
</section>
```

---

## 7. FALLBACK MOBILE / REDUCED-MOTION (obrigatório)

| Recurso | Desktop | Mobile (`useIsMobile`, <1024) | reduced-motion |
|---|---|---|---|
| Conta da Mesa | sticky 300vh + scrollytelling | passos empilhados, total = 1 count-up | passos estáticos, total final |
| 3 Noites | sticky + trilho DrawLine | lista linear `Reveal` por card | cards estáticos |
| count-ups | rAF anima | rAF anima | **valor final imediato** |
| DrawLine | anima stroke | anima (leve) | path completo estático |
| halos/grids drift | sutil | desligar drift | desligar |
| StickyCTA | aparece a 30% | aparece a 5% | aparece (sem slide) |
| ThemeFade | gradiente 24px | 16px | estático |

> `usePrefersReducedMotion` já existe e é respeitado por `CountUp`/`MaskReveal`. Os novos
> componentes (`MesaCounter`, `ContaDaMesa`, `DrawLine`) **devem** checá-lo e cair no estado final.

---

## 8. ORDEM DE IMPLEMENTAÇÃO (validar os picos antes de propagar)

1. **Fundação:** `SectionShell`, `ScrollProgressBar`, `lib/useScrollStep.ts`, `DrawLine`. (tokens já prontos)
2. **Hero + `MesaCounter`** — valida a assinatura (count-up que trava). Pico nº 2.
3. **Conta da Mesa** — peça-estrela; valida o scrollytelling sticky. Pico nº 1.
4. **Demais seções** — propagar o padrão `SectionShell` + triggers do mapa (§4).
5. **TopBar / StickyCTA / ThemeFade** — polimento de tema híbrido e CTA.
6. **Passe de fallback** — mobile + reduced-motion em cada seção (§7).

> Os componentes existentes (`TresNoites`, `Oferta`, `ProvaSocial`, etc.) são **adaptados**, não
> recriados do zero — trocam para o ângulo "mesa" e os triggers do mapa, reusando a casca.
```

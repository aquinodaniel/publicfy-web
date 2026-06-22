# Decisões & Correções v2 — DOC-MÃE (fonte da verdade)

> Consolida a revisão crítica dos 3 docs (`COPY_ESTRUTURA_v2`, `EXPERIENCIA_v2`,
> `SPEC_IMPLEMENTACAO_v2`). **Em caso de conflito, este doc vence.** Os 3 originais viram
> histórico de raciocínio; a construção segue o que está aqui.

---

## A. ESTRUTURA OFICIAL (ordem nova — fonte única, não duplicar em outros docs)

Mudança vs docs anteriores: **Conta da Mesa subiu pra antes do Reframe** (#9 — curva emocional
limpa: dor cresce até o pico, depois só alívio).

| # | Seção | Tema | Protagonista | id |
|---|---|---|---|---|
| 0 | TopBar | adaptativa | CTA c/ preço | — |
| 1 | Hero | 🌑 | contador da perda (resultado) | — |
| 2 | **Conta da Mesa** ⭐ | 🌑 | total na mesa (mecânica) | — |
| 3 | Reframe | ☀️ | comparativo Mentalidade × Método | — |
| 4 | As 3 Noites | ☀️ | timeline das 3 aulas | — |
| 5 | Prova Social | 🌑 | número antes→depois | — |
| 6 | É pra você se… | ☀️ | checklist | — |
| 7 | Objeção do preço | 🌑 | ancoragem em barras | — |
| 8 | O Mentor | ☀️ | 3 stats | — |
| 9 | A Oferta | 🌑 | card de preço ancorado | `#pricing` |
| 10 | FAQ | ☀️ | acordeão | — |
| 11 | Footer | 🌑 | CTA final + eco contador | `#footer` |
| — | Sticky CTA | — | botão | — |

**Nota de ritmo (#13):** Hero + Conta ficam juntas no escuro (dois 🌑 seguidos) — proposital:
o bloco de dor é uma batida contínua, sem respiro no meio. Depois alterna normalmente. Isso
reduz de 6 trocas dark/light pra 5 e dá peso ao bloco de abertura.

---

## B. DIVISÃO DE TRABALHO HERO × CONTA (#8 — matar o anticlímax)

Os dois mostram a perda, mas com papéis distintos — **nunca repetir o mesmo número do mesmo jeito**:

- **Hero = o RESULTADO.** Mostra o número pronto (R$ 60k "na mesa") como soco inicial. Rápido.
- **Conta da Mesa = a MECÂNICA.** Não repete "R$ 60k"; **mostra como se chega lá** — decompõe
  cobrado → menos custos → margem real (às vezes negativa) → × projetos. O usuário vê a conta
  *se formar*. O número final pode até bater no R$ 60k, mas agora ele **entende** de onde veio.

> Regra: se a Conta da Mesa só reproduzir o Hero, ela falhou. Ela entrega o *porquê*, não o *quanto*.

---

## C. HONESTIDADE DO NÚMERO (#11 — voz Aurora: conta, não adjetivo)

O R$ 60k é **ilustrativo** (engenheiro médio), não afirmação sobre o usuário.
- No Hero, o rótulo "exemplo de um engenheiro que fecha 1 projeto/mês" é **inseparável** do
  número (mesma unidade visual, não rodapé escondido).
- A conta *do usuário* só se materializa na Conta da Mesa (passos) e, no futuro, nos sliders.
- Selo permanente `▸ valores ilustrativos` em ambos.

---

## D. CORREÇÕES TÉCNICAS (entram direto no código na Fase 1)

| # | Problema | Decisão |
|---|---|---|
| 1 | `content/site.ts` tem a copy **antiga** | **Reescrever** site.ts com a copy v2 (pré-requisito nº 1) |
| 2 | `useSeats` TOTAL=50 ↔ copy "300" | Unificar em **`config.vagasTotal`** (300) lido pelo hook; `[TODO]` valor real |
| 3 | Órfãos: `Metodo.tsx`, `HonorarioChart.tsx`, `HonorarioWaterfall.tsx` | **Remover** (a seção Método saiu) |
| 4 | Dois paradigmas de count-up misturados | `CountUp` (rAF, inView, once) p/ números estáticos · **`MotionNumber`🆕** (assina MotionValue) p/ scroll-driven. **Nunca** passar MotionValue pro CountUp |
| 5 | `useScrollStep` devolvendo `activeStep` via `useTransform` | `useScrollStep` usa **`useState` + `useMotionValueEvent`** pra emitir `activeStep:number` (re-render real); expõe `progress` (MotionValue) só pro `MotionNumber`/DrawLine |
| 6 | `MesaCounter` eco "não trava" indefinido | Eco do Footer conta até o **mesmo R$ 60k** (inView, once) e **fica** — **sem** selo de "resolvido" e **sem** loop infinito. A ausência do selo é o que comunica "ainda na mesa" |
| 7 | Docs dizem "clip-path"; primitivo usa opacity+x | Linguagem oficial: **"acende" = opacity + leve x** (o `MaskReveal` real). Não reintroduzir clip-path |
| 16 | Vários `useScroll`/listeners | Todo listener de scroll: **`{ passive: true }` + rAF-throttle**. `useScroll` do Framer já é otimizado; não adicionar listeners manuais redundantes |

---

## E. NARRATIVA / FALLBACK

**#12 — Prova Social condicional.** Se não houver depoimento real, a seção **não some em
silêncio** (quebraria a ponte 3 Noites→Qualificação). Fallback em ordem:
1. Print de proposta anonimizado + disclaimer "resultados de alunos do método Aurora".
2. Se nem isso, **fundir** um micro-bloco de prova dentro de "O Mentor" (puxa credibilidade
   pra cima) e remover a seção isolada — ajustando a ponte narrativa.
> Decisão de produção sua: temos depoimento/print real? `[TODO]`. Construo com placeholder
> estrutural escondido (não publica) até confirmar.

**#10 — Hero, um protagonista.** Sequência no mount (não tudo junto):
`0.0s` H1 acende palavra a palavra → `~0.8s` contador conta (protagonista) → `~1.6s`
countdown + barra de vagas entram discretos. CTA visível desde o início.

**#15 — Conta da Mesa:** scroll-driven na v1. Sliders = fase 2, fora do sticky.

---

## F. CHECKLIST DE ACEITE DA FASE 1 (a landing tem que…)
- [ ] Ler 100% da copy de `content/site.ts` (zero texto hardcoded)
- [ ] Ordem das seções = tabela A
- [ ] Hero=resultado / Conta=mecânica (sem repetir número igual)
- [ ] Vagas: hook e copy batem (300)
- [ ] Órfãos removidos
- [ ] `MotionNumber` ≠ `CountUp`; `useScrollStep` re-renderiza de verdade
- [ ] Fallback mobile + reduced-motion em toda seção com motion
- [ ] Compila (`next build`) sem erro de tipo

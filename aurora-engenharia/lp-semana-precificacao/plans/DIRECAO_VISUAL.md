# Direção Visual — Semana da Precificação (v2, identidade própria)

> **Por que este doc existe:** a v1 (`INTERACOES.md`) reaproveitou o vocabulário visual da
> Semana da Água Quente (prancheta/blueprint, escada SVG, `Reveal`, `BlueprintSeam`), e o
> resultado ficou idêntico à outra LP. Esta v2 define uma **linguagem própria** pra
> Precificação, inspirada em referências fintech (ver `refs/`), mantendo a copy e a
> estrutura de seções intactas.

---

## Princípios

1. **A copy não muda. A estrutura de seções não muda.** Muda a *pele* e as *dinâmicas*.
2. **Aposentar o DNA da Água Quente** — ver lista abaixo. Nada de prancheta.
3. **Híbrido dark/light** com intenção narrativa: o escuro é onde mora o dinheiro/decisão.
4. **Número que sobe = lastro.** É o único hábito da v1 que fica — mas agora sobre gráfico.

---

## O que SAI (DNA Água Quente — não usar)

- `Reveal` (entrada subindo de baixo, `y:+16→0`)
- `BlueprintSeam` (hairline traçada entre seções)
- Escada de honorário em SVG de blueprint
- Carimbos rotacionados (`stamp`), cantoneiras (`blueprint-corner`)
- Grid pesado de prancheta (`paper-bg`, `blueprint-bg` com linhas fortes)
- Scrollytelling sticky vertical (`SystemBuilder`)

## O que ENTRA (assinatura própria)

1. **Mask reveal** — texto *acende* linha a linha via `clip-path`, não sobe.
2. **Draw de gráfico** — linha/área financeira se desenha (`stroke-dashoffset`). Assinatura.
3. **Count-up "com conta"** — número sobe com lastro, sempre sobre gráfico/dado.
4. **Trilho horizontal de cards** — card ativo em foco, vizinhos recuam (escala/opacity).
5. **Glow/halo ambiente** nas seções dark, acompanhando o conteúdo.
6. **Transição dark↔light** suave entre seções (substitui o seam hairline).

---

## Paleta

| Token | Hex | Uso |
|---|---|---|
| `ink` (dark bg) | `#001115` | fundo das seções escuras |
| `paper` (light bg) | `#fafaf7` | fundo das seções claras |
| `aurora` | `#00657B` | marca, CTA primário |
| `aurora-glow` | `#13b8d9` | neon/glow do teal sobre dark |
| `gold` | `#dbbe7c` | perda, bônus, valor premium (mantém) |
| `emerald` | `#10b981` | **dados, gráfico subindo, deltas, números vivos** |

- Light: grid leve de cruzinhas (+) nas interseções — técnico mas arejado (ref `allset`).
- Dark: fundo `#001115` com halo radial teal/emerald sutil atrás do conteúdo-chave.

---

## Mapa híbrido (tema + dinâmica por seção)

| Seção | Tema | Motivo / dinâmica principal |
|---|---|---|
| **TopBar** | adaptativa | transparente sobre o hero dark → condensa light ao descer; barra de progresso teal |
| **Hero** | 🌑 dark | **Gráfico de honorário vivo** subindo R$3k→R$12k, nós (emerald) brilhando, count-up da perda |
| **3 Noites** | ☀️ light | **Trilho horizontal** de 3 cards (AULA.01/02/03), ativo em foco, entregável que se revela |
| **Método / Escada** | 🌑 dark | **Calculadora interativa** (custo-hora · escopo · risco · valor · ancoragem → preço monta ao vivo) sobre o gráfico; peça-estrela |
| **Prova Social** | ☀️ light | cards "antes→depois" com count-up no "depois" (emerald); entrada em stagger calmo |
| **Qualificação** | ☀️ light | duas colunas de lados opostos; checks que se desenham (stroke) |
| **Objeção** | ☀️ light | crença riscada (dourado) → resposta acende; ancoragem em barras |
| **Sobre Leo** | ☀️ light | foto como "ficha", stats com count-up, mask reveal na bio |
| **Oferta** | 🌑 dark | **Dashboard de proposta** (cards UI: composição, faixas) + preço herói brilhando |
| **FAQ** | ☀️ light | acordeão limpo, abertura suave |
| **Footer** | 🌑 dark | fecha como abriu; mini-gráfico de honorário como selo |
| **StickyCTA** | — | desliza de baixo; some sobre Oferta/Footer |

---

## Os 3 motivos centrais (combinados)

1. **Gráfico de honorário vivo** (Hero, Footer) — linha/área R$3k→R$12k que se desenha,
   nós emerald, tooltip. Substitui a escada de blueprint.
2. **Calculadora interativa** (Método) — usuário mexe nas variáveis e vê o honorário se
   compor ao vivo. Prova literal do "preço com conta", não chute.
3. **Dashboard de proposta** (Oferta) — cards de UI de produto financeiro (composição,
   faixas, ancoragem) ancorando o preço.

---

## Sistema de motion (regras que amarram)

1. **Um easing:** `cubic-bezier(.22,.61,.36,1)`. Nada de bounce/spring exagerado.
2. **Acende, não salta.** Texto via mask/clip-path; gráficos via draw; nada de "subir de baixo".
3. **Cor com função:** teal = marca/CTA · dourado = perda/bônus · emerald = dado que sobe.
   Cor não anima sozinha (sem gradiente girando, sem glow pulsante).
4. **Once, viewport ~15%.** Entrou, ficou. Scrollytelling é determinístico pelo progresso.
5. **Mobile / reduced-motion:** trilhos horizontais viram listas; count-ups mostram valor
   final; gráficos aparecem completos; durações ~0.

---

## Ordem de implementação

1. **Fundação** — `tailwind.config.ts` (tokens emerald/aurora-glow/ink), `globals.css`
   (utilitários novos: dark section, halo, grid-cross, mask-reveal; remover blueprint).
2. **Hero (dark + gráfico vivo)** — a assinatura. Validar a direção aqui antes de propagar.
3. **Método (calculadora)** — a peça-estrela.
4. **Demais seções** — propagar pele + dinâmicas conforme o mapa.
5. **TopBar/StickyCTA/transições** — polimento de tema híbrido.

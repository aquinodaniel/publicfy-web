# Achados Consolidados v2 — Fase 6 (painel de 3 agentes)

> Cruza Sessão de Usuário (5 personas), Motion+Interaction e CRO+Creative Director.
> Cada decisão de refino (Fase 7) é ancorada nos agentes que a apontaram. Nada de "porque parece melhor".

## Convergências (≥2 lentes no mesmo ponto = prioridade)

| # | Achado | Quem apontou | Severidade | Decisão de refino |
|---|---|---|---|---|
| 1 | **Conta da Mesa 300vh cansa / zona morta / total escorrega** | 5 personas + Motion + CRO | 🔴 | Reduzir p/ ~200vh · total em SALTOS por passo (não interpolação) · mostrar `× 12` explícito · indicador "passo n/4" · mobile com stagger no inView |
| 2 | **R$ 60k repetido (hero sub + contador + Conta + footer) gasta o clímax** | CRO + Creative Director + Recém-formado | 🔴 | Hero sub fala em **R$ 5.000/projeto** (tirar "60.000/ano" textual); o salto pro ano vira a virada da Conta. Contador hero mantém-se (resultado), Conta entrega a mecânica |
| 3 | **Hero: contador compete com H1+sub+countdown+vagas (disputa de atenção)** | Motion + CRO + Impaciente | 🔴 | Atrasar início do contador (clímax do mount) · rebaixar countdown/vagas (menor, mono, sem caixa de peso igual) |
| 4 | **Prova social oculta = funil sem evidência de terceiro** | 4 personas + CRO | 🔴 | Sem depoimento real, **suavizar** o claim ("honorário subiu") e inserir ponte honesta de autoridade; estrutura pronta p/ ativar quando houver prova `[TODO cliente]` |
| 5 | **Placeholders crus + countdown rodando sem data = "fumaça de lançamento"** | Queimado + Cético + Impaciente | 🔴 | Flag `config.datasConfirmadas`: se false, esconder countdown e mostrar "Datas em breve" em vez de `[a confirmar]` |
| 6 | **"Aluno Aurora R$ 0" ao lado do CTA pago = vazamento na decisão** | CRO + Aluno (frustração) | 🟠 | Virar link discreto "já é aluno? veja sua condição" — não exibir "R$ 0" ao lado do botão pago |
| 7 | **Stats do Leo = "de Instagram" reforçam preconceito anti-influencer** | Cético | 🟠 | Reordenar: "7+ anos / projetos de alto padrão" na frente; seguidores reenquadrado como contexto |
| 8 | **TresNoites: nó pulsa em loop infinito (viola lei "once" + ignora reduced-motion)** | Motion | 🟠 | Pulso único ao ativar (sem `repeat: Infinity`) |
| 9 | **Logo é botão de checkout (quebra convenção)** | Motion (affordance) | 🟠 | Logo rola pro topo, não dispara checkout |
| 10 | **Objeção ancora em R$ 1.500 (4º número de perda)** | CRO | 🟠 | Ancorar contra número já estabelecido (R$ 5.000/projeto) |
| 11 | **Régua de scroll com spring = lag (não-Linear)** | Motion | 🟡 | scaleX direto no scrollYProgress (sem spring) |
| 12 | **Garantia com easing bounce — única quebra do easing assinatura** | Motion | 🟡 | Usar easing assinatura no card (overshoot só no selo "7d") |
| 13 | **Oferta: preço com viewport amount 0.6 pode não disparar (fica opacity:0)** | Motion | 🟡 | Baixar amount p/ 0.3 |
| 14 | **Halo aurora gigante no hero viola semântica de cor** | Motion | 🟡 | Reduzir opacidade / neutralizar |
| 15 | **Objeção: risco (DrawLine absoluto) quebra em crença multi-linha** | Motion | 🟡 | line-through animado (scaleX) em vez de SVG absoluto |
| 16 | **reduced-motion/mobile flash: useScrollStep/MotionNumber não checam reduced; useIsMobile pisca desktop** | Motion | 🟡 | Gate reduced-motion no scrollytelling; (flash mobile: registrado p/ refactor CSS posterior) |

## Bloqueante de produção (não-refino, é dado do cliente)
- **`checkoutUrl` vazio → nenhum CTA converte.** Pendência nº 1. `[TODO cliente]`
- Datas reais, números do Leo, depoimentos, regra "aluno grátis", WhatsApp. `[TODO cliente]`

## Posicionamento (copy — leva futura, não código)
- Página calibrada pro sênior de alto padrão: exclui o recém-formado (números R$13k/projeto) e as objeções de iniciante alienam o sênior. Avaliar faixa pra baixo + 1 objeção de nível sênior. `[registrado]`

## Pontos fortes a PRESERVAR (Creative Director)
- Metáfora única (a Mesa) levada do hero ao footer · gramática de cor semântica · o eco do contador no footer que **não trava** (o "caramba" mais provável) · ritmo escuro/claro · easing assinatura consistente.

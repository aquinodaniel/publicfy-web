# Proposta de Interações — Semana da Precificação (Aurora Engenharia)

> Direção de arte/UX seção a seção. Como **exibir** a copy de forma dinâmica, sempre a serviço da conversão e dentro da identidade sóbria da Aurora.
> Fonte de conteúdo: `COPY.md`. Vocabulário de motion já existente: `lp-semana-agua-quente/app/src/components/` (Reveal, SystemBuilder, ThreeNightsSection, BlueprintSeam, Countdown, SeatsLeft, StickyCTA, OfferSection).
>
> **Princípio-mãe:** a estrela do dinamismo é a **escada de honorário** (R$ 3.000 → R$ 12.000). Todo o resto orbita ela. O efeito favorito da marca — número que **se constrói com conta na frente do usuário** — é o argumento visual: o oposto de "preço por chute".

---

## TopBar

**Objetivo da seção:** manter o CTA com preço sempre disponível sem competir com o hero; reforçar urgência de lote conforme o usuário desce.
**Como exibir hoje (estática):** logo à esquerda, botão `Entrar no Lote 1 · R$ 27` à direita, fixa no topo.
**Proposta de dinamismo:**
1. **Barra de progresso de scroll** (linha de 2-3px em `#00657B`) colada no topo da TopBar, preenchendo conforme o scroll — gatilho: scroll contínuo. É a única linha aurora "viva" da página; lê como régua de prancheta, não como gamificação.
2. **TopBar que "condensa"** ao sair do hero: ao passar ~80px de scroll, fundo ganha `backdrop-blur` + hairline inferior aurora/15 e o CTA encolhe levemente (padding menor). Gatilho: scroll threshold. Transição de 0.25s.
3. **Micro-troca de label do CTA por contexto:** enquanto o hero está visível o botão diz `Entrar no Lote 1 · R$ 27`; ao cruzar a Oferta, troca para `Garantir vaga · R$ 27` com um fade curto (não pulsar).
**Por que aumenta conversão:** o preço explícito sempre à mão remove fricção; a régua de scroll dá sensação de progresso/leitura (compromisso) sem apelar.
**Reuso/implementação:** barra de scroll = padrão `#scroll-progress` do `index.html`. Condensação = listener de scroll igual ao `StickyCTA`. **Esforço: baixo.**

---

## Hero

**Objetivo da seção:** fixar a virada "já sabe fazer → falta cobrar" em 3 segundos e apresentar a escada como prova visual do método.
**Como exibir hoje (estática):** H1 com "fazer" e "cobrar" destacados, subheadline com o número da perda, CTA, faixa de continuidade, TimerCard, e à direita a escada de honorário desenhada.
**Proposta de dinamismo:**
1. **Escada de honorário que se desenha (a peça central):** SVG blueprint de 5 degraus subindo da esquerda-baixo para a direita-alto. Na entrada, os degraus aparecem um a um (stagger ~0.12s) com a linha do "piso" sendo traçada (`stroke-dashoffset`), e ao lado de cada degrau o rótulo de valor sobe de R$ 3.000 ao topo R$ 12.000. Gatilho: load do hero (uma vez). É a assinatura da página — calma, técnica, como uma planta sendo cotada.
2. **Contraste "fazer" vs "cobrar" no H1:** "fazer" entra normal (cinza-tinta); "cobrar" entra com um leve traçado/underline aurora que se desenha da esquerda à direita 0.4s depois (reusar `headline-underline`). NÃO usar reveal letra-a-letra agressivo da Água Quente aqui — manter sóbrio: palavra-a-palavra com `Reveal`/stagger.
3. **Número da perda "respirando" na subheadline:** "R$ 12.000" e "R$ 3.000" recebem peso/cor dourada (cor de perda permitida) e um count-up curtíssimo na entrada (12.000 conta de 0; 3.000 conta de 0). Gatilho: viewport. Ancora a dor antes do CTA.
4. **TimerCard + barra de vagas** já com o padrão Água Quente (countdown + barra preenchendo com `width` animado). A barra de vagas usa dourado, não aurora.
**Por que aumenta conversão:** a escada traduz "método em 5 camadas → preço sobe" antes de qualquer texto; o count-up da perda materializa o custo de não agir; o destaque em "cobrar" carrega a espinha narrativa logo no primeiro contato.
**Reuso/implementação:** escada = **novo componente** `HonorarioStaircase` (SVG + framer-motion, mesmo padrão de `Stage`/`visible` do `SystemBuilder`, mas acionado por entrada em vez de scroll). Count-up = util novo `CountUp` (IntersectionObserver + rAF), ~30 linhas. Underline = `headline-underline`. **Esforço: médio** (a escada é o único item de peso, e ela já será construída para o Método — fazer uma vez, usar nos dois lugares).

---

## Seam: `▸ você já tem a mão` (Hero → 3 Noites)

**Objetivo:** costurar a narrativa mão→bolso entre seções, dando respiro técnico.
**Como exibir hoje:** linha técnica fina com rótulo central.
**Proposta de dinamismo:** a hairline se **traça da esquerda para a direita** (scaleX origin-left) ao entrar na viewport, e os tracinhos verticais de "escala de prancheta" aparecem em stagger rápido. Gatilho: viewport, once.
**Por que aumenta conversão:** mantém a sensação de "documento técnico contínuo" — credibilidade — sem custo de atenção.
**Reuso/implementação:** `BlueprintSeam` existente + um `whileInView` de scaleX. **Esforço: baixo.**

---

## As 3 Noites (scrollytelling)

**Objetivo da seção:** mostrar que em 3 noites o aluno sai com entregáveis concretos (custo-hora → planilha → proposta), reduzindo a sensação de "curso vago".
**Como exibir hoje (estática):** 3 cards de aula empilhados, cada um com código, data, título, descrição e "Você sai com:".
**Proposta de dinamismo:**
1. **Scrollytelling sticky com trilho de 3 marcos** (reaproveitar a estrutura do `ThreeNightsSection`): coluna esquerda fixa com uma **linha/trilho vertical** que se preenche conforme o scroll passa pelas 3 noites; à direita o card da noite ativa fica em foco (opacity 1, leve scale) e os outros recuam (opacity 0.3). NÃO usar o tubo hidráulico da Água Quente — trocar por um **trilho de blueprint** com 3 nós (AULA.01/02/03) e marcadores tipo "checkpoint" de planta.
2. **"Você sai com:" como entregável que se revela:** dentro do card ativo, o bloco "Você sai com" expande (height auto) com um selo dourado pequeno `▸ entregável` — comunica que cada noite tem produto, não só aula. Gatilho: card vira ativo.
3. **Mini-conexão com a escada:** cada noite acende discretamente o(s) degrau(s) da escada que ela constrói (Aula 01 = degrau base custo-hora; Aula 02 = degraus do meio; Aula 03 = ancoragem/topo). Um thumbnail minúsculo da escada na coluna esquerda com o degrau correspondente piscando ao ativar a noite. Gatilho: noite ativa.
4. **Mobile:** vira lista linear com `Reveal` por card (sem sticky), idêntico ao fallback do `ThreeNightsMobile`.
**Por que aumenta conversão:** transforma "3 aulas" em "3 entregáveis encadeados"; o vínculo com a escada antecipa o método e dá coesão; o foco progressivo segura a atenção em copy densa.
**Reuso/implementação:** **adaptar `ThreeNightsSection`** (já tem sticky + active state + scrollToAula + AulaCard). Trocar `IndustrialPipeline` por `BlueprintTrack` (novo, mais simples que o tubo). **Esforço: médio** (a casca já existe; o trabalho é o trilho novo e o thumbnail da escada).

---

## O Método / Escada de Honorário (5 degraus) — **peça-estrela**

**Objetivo da seção:** provar que o preço de alto padrão é construído com critério (5 camadas), e que cada camada **adiciona valor mensurável** — movendo R$ 3.000 → R$ 12.000.
**Como exibir hoje (estática):** 5 cards (L.01–L.05) com título, sublabel e descrição, e um número final R$ 12.000.
**Proposta de dinamismo:**
1. **Scrollytelling da escada que se monta degrau a degrau (o ápice da página):** seção sticky (padrão `SystemBuilder`). À esquerda, a lista das 5 camadas com a ativa destacada; à direita, a **escada de honorário em SVG blueprint**. Conforme o scroll avança, cada degrau é desenhado/elevado e o **contador de honorário soma ao vivo**: começa em R$ 3.000 (L.01), e a cada camada o número sobe (ex.: +escopo, +risco, +valor, +ancoragem) até **R$ 12.000** no topo. O número é a estrela: count-up suave a cada degrau, fonte tabular, dourado só no delta que entra.
2. **Rótulo de delta por degrau:** ao acender cada camada, aparece um "balão" técnico curto: `+ o que entra no preço`, `+ a margem que some`, `+ por que vale mais` — exatamente os sublabels da copy. Reforça que cada degrau tem justificativa (anti-achismo).
3. **Marca d'água / nota "exemplo":** selo discreto `▸ valores ilustrativos do método` fixo no canto do diagrama — honestidade Aurora, evita parecer promessa de faturamento.
4. **Click numa camada** rola suave até aquele degrau (igual `scrollToLayer`), permitindo explorar fora da ordem.
5. **Mobile:** escada vertical compacta sempre completa no topo + lista linear das camadas com `Reveal` (padrão `SystemBuilderMobile`). O count-up dispara uma vez ao entrar.
**Por que aumenta conversão:** é a tradução literal da promessa — "quem cobra por chute fica no primeiro degrau". Ver o número subir COM a conta na frente é o antídoto exato da objeção "precificação é feeling". É o momento de maior densidade argumentativa da página.
**Reuso/implementação:** **adaptar `SystemBuilder`** quase 1:1 (já tem sticky, activeLayer, LayerItem, scrollToLayer, Stage). Trocar o `SystemDiagram` hidráulico pela `HonorarioStaircase` (mesma criada no hero, agora dirigida por `activeLayer`). Count-up via `useTransform` no `scrollYProgress` (o valor já é um motion value — derivar o número direto do progresso é trivial e performático). **Esforço: médio-alto** (é a seção mais trabalhada — mas reusa toda a mecânica de scroll já pronta).

---

## Seam: `▸ quem já fez essa conta` (Método → Prova Social)

**Objetivo:** transição do método (abstrato) para prova (gente real).
**Proposta de dinamismo:** mesma hairline animada do seam padrão; o rótulo `quem já fez essa conta` faz o gancho direto para os depoimentos. **Esforço: baixo** (`BlueprintSeam`).

---

## Prova Social (NOVA — antes da Oferta)

**Objetivo da seção:** matar a objeção silenciosa "funciona pra alguém como eu?" com voz de terceiro, no padrão Aurora (número, não adjetivo).
**Como exibir hoje (estática):** 2–3 cards de depoimento de alunos da Água Quente + print de proposta fechada (anonimizado).
**Proposta de dinamismo:**
1. **Cards com o "antes → depois" em número animado:** cada depoimento mostra `R$ X → R$ Y` (honorário antigo → novo). Ao entrar na viewport, o "depois" faz count-up curto e ganha realce dourado. Gatilho: viewport, once. Conecta visualmente com a escada (mesmo gesto: número que sobe com lastro).
2. **Stagger de entrada dos cards** (`StaggerGroup`/`StaggerItem`) em vez de marquee — para um produto racional, marquee de depoimentos rolando parece "parede de prova" de marketing. Entrada calma, um após o outro, lê como dossiê.
3. **Print de proposta como "documento":** o print/conversa entra com leve traçado de borda blueprint e tag `▸ proposta fechada · cliente anonimizado`, tratando-o como evidência técnica, não screenshot solto.
4. **Disclaimer honesto fixo:** `▸ resultados de alunos do método Aurora (Semana da Água Quente)` — mantém a credibilidade se ainda não houver depoimento específico de precificação.
**Por que aumenta conversão:** é a maior lacuna de conversão apontada na própria copy; o "antes→depois" em número é a prova mais alinhada à promessa ("você vai conseguir cobrar mais") e ao tom (conta, não elogio).
**Reuso/implementação:** `StaggerGroup`/`StaggerItem` + `CountUp` (mesmo util do hero/método) + borda blueprint (`blueprint-corner`). **Esforço: baixo-médio.** (Conteúdo é o gargalo, não a UI.)

---

## Objeção dedicada (NOVA — antes do Pricing)

**Objetivo da seção:** desarmar a objeção de preço de frente ("e se eu subir e perder o cliente?" / "aqui ninguém paga alto padrão") como bloco próprio, preparando o terreno emocional/racional para a oferta.
**Como exibir hoje (estática):** bloco com 2–3 objeções e suas respostas (material já existe no FAQ Q.02/Q.03).
**Proposta de dinamismo:**
1. **"Vira-card" objeção → resposta (flip controlado, não lúdico):** cada objeção aparece como uma frase do cliente (entre aspas, cinza, tom de "âncora do concorrente barato"). Ao entrar na viewport ou ao hover/click, a frase é **riscada** (linha dourada cruzando, igual ao `R$ 27` riscado da Água Quente) e a resposta Aurora desliza por baixo. Gatilho: viewport sequencial (ou click no mobile). Comunica: "essa crença foi derrubada com conta".
2. **Ancoragem visual de preço:** um mini-bloco comparativo — "o que você desconta sem pensar numa proposta" vs "o investimento da imersão" — com duas barras de proporção que crescem na entrada (a do desconto perdido, dourada/grande; a do preço, aurora/pequena). Prepara exatamente a headline da Oferta.
3. **Ritmo lento e deliberado:** uma objeção por vez com bastante respiro — esta seção NÃO deve parecer um carrossel rápido; o tom é de quem responde com calma e número.
**Por que aumenta conversão:** concentra a quebra de objeção de preço num único momento de alta intenção (logo antes do checkout), em vez de diluí-la no FAQ; o gesto de "riscar a crença" é memorável e on-brand (reusa o risco do preço).
**Reuso/implementação:** risco = mesmo `motion.span` rotacionado do painel Aluno Aurora no `OfferSection`. Reveal sequencial = `Reveal` com delays. Barras = `width`/`scaleX` animado (padrão `SeatsBlock`). **Esforço: médio** (componente novo, mas todos os átomos existem).

---

## Qualificação ("É pra você se… / Não é pra você se…")

**Objetivo da seção:** auto-seleção — fazer o lead certo se reconhecer e o errado se desqualificar, aumentando qualidade de conversão e reduzindo reembolso.
**Como exibir hoje (estática):** duas colunas/listas: "é pra você se…" e "não é pra você se…".
**Proposta de dinamismo:**
1. **Duas colunas que entram de lados opostos:** "É pra você" entra da esquerda (`Reveal` left), "Não é pra você" da direita, encontrando-se no centro — metáfora de "de que lado você está". Cada item com stagger e um marcador: check aurora (✓) na coluna positiva, traço neutro na negativa (NÃO usar X vermelho — sóbrio).
2. **Marcadores que se "ativam" em sequência:** os ✓ da coluna positiva desenham o traço (stroke) um a um, como itens de checklist sendo conferidos. Gatilho: viewport. Sensação de "checando requisitos", linguagem de engenharia.
3. **Sutileza, sem hover-jogo:** a coluna "não é pra você" fica levemente dessaturada/menor — peso visual claramente menor, dirigindo o olhar para o lado de pertencer.
**Por que aumenta conversão:** auto-qualificação aumenta convicção de quem pertence ("isso é exatamente eu") e filtra reembolso; o gesto de checklist conversa com a estética técnica.
**Reuso/implementação:** `Reveal`/`reveal-left`/`reveal-right` (já existem as variantes) + `StaggerGroup`. Check com stroke = SVG `pathLength` animado. **Esforço: baixo.**

---

## Sobre o Leo (Autoridade)

**Objetivo da seção:** dar rosto e lastro à promessa ("quem cobra honorário de especialista num mercado que compete por preço").
**Como exibir hoje (estática):** foto com tag `FICHA · 001`, bio em 2 parágrafos, 3 stats, tags.
**Proposta de dinamismo:**
1. **Foto como "ficha técnica":** a imagem entra com a moldura blueprint se desenhando ao redor (`blueprint-corner` nos 4 cantos, traçados em stagger) + tag `FICHA · 001` digitando levemente. Trata o mentor como documento, não influencer.
2. **Stats com count-up:** seguidores, posts, "7+ anos" sobem de 0 ao entrar na viewport, em fonte tabular. Gatilho: viewport, once. Argumento por número, literal.
3. **Bio com Reveal por parágrafo** e os trechos-chave ("honorário de especialista", "competir por preço") em peso/cor sutil — sem floreio.
**Por que aumenta conversão:** credibilidade é o que sustenta o preço; os stats animados convertem autoridade em números verificáveis (tom Aurora).
**Reuso/implementação:** `Reveal` + `CountUp` + `blueprint-corner`. **Esforço: baixo.**

---

## Seam: `▸ agora é o seu bolso` (Sobre o Leo → Oferta)

**Objetivo:** fechar a narrativa mão→bolso bem na entrada do checkout.
**Proposta de dinamismo:** hairline animada padrão; rótulo `agora é o seu bolso` é o gancho mais importante dos seams — pode ganhar um respiro um pouco maior (mais padding) por ser a antessala da decisão. **Esforço: baixo.**

---

## Oferta

**Objetivo da seção:** converter — apresentar o que recebe, o preço, a garantia e a escassez de lote sem fricção.
**Como exibir hoje (estática):** 2 colunas (Especificação | Decisão) com specs, lista "você recebe", preço, painel Aluno Aurora, CTA, vagas, garantia.
**Proposta de dinamismo:**
1. **Headline com ancoragem desenhada:** "desconta sem pensar numa única proposta" recebe o highlight dourado que se traça (reusar `headline-underline` / o `scaleX` do destaque da Água Quente). Gatilho: viewport.
2. **Lista "você recebe" em stagger** (`StaggerGroup`, ~0.04s) com numeração mono `01–06` — entra como um sumário técnico sendo listado.
3. **Bloco de preço com entrada estável (não espetáculo):** o `R$ 27` entra com count-up curto OU scale-in suave (padrão `price-enter`), mas SEM o glow pulsante exagerado da Água Quente — aqui o preço é baixo de propósito, o destaque é o contraste com o valor da imersão, não fogos.
4. **Painel Aluno Aurora** com o `R$ 27` riscado (dourado) e `R$ 0` em destaque — já existe o gesto no `OfferSection`.
5. **Barra de vagas + countdown** animando (preenchimento + tique), dourado para urgência. Reusar `SeatsBlock`/`CountdownDark`.
6. **Selo de garantia** que entra por último, com leve "carimbo" (scale de 1.05→1, opacity) — reduz risco percebido no momento da decisão.
**Por que aumenta conversão:** é o ponto de conversão; cada microinteração reduz fricção (lista clara, preço ancorado, garantia tranquilizadora) sem distrair do botão.
**Reuso/implementação:** `OfferSection` inteira é reaproveitável quase 1:1 — só trocar copy, specs e a animação do preço (remover glow pulsante). `SeatsBlock`, `CountdownDark`, `StaggerGroup` prontos. **Esforço: baixo.**

---

## FAQ

**Objetivo da seção:** dissolver as últimas dúvidas (pré-requisito, feeling, perder cliente, mercado, replay, ferramenta, momento) e oferecer canal humano.
**Como exibir hoje (estática):** 8 perguntas em acordeão + bloco de contato WhatsApp.
**Proposta de dinamismo:**
1. **Acordeão com abertura suave** (height auto + fade), ícone `+` girando para `×` (reusar `faq-icon` rotate 45°). Apenas um aberto por vez é opcional; abrir vários é aceitável e menos intrusivo.
2. **Itens entram com `Reveal`/stagger** ao scrollar — lista que se assenta, não que salta.
3. **Bloco WhatsApp em destaque calmo:** card com borda aurora/15 e CTA secundário (aurora outline, não preenchido — o preenchido aurora é exclusivo do CTA primário de compra). Hover apenas eleva levemente.
**Por que aumenta conversão:** o acordeão deixa a página escaneável; o canal humano remove a última fricção ("posso conversar antes de comprar").
**Reuso/implementação:** padrão `faq-item`/`faq-summary`/`faq-icon` do `index.html` + `Reveal`. **Esforço: baixo.**

---

## Footer

**Objetivo da seção:** último empurrão com a frase de fechamento ("falta a parte que paga as contas") + CTA final + escassez.
**Como exibir hoje (estática):** H2 de fechamento, parágrafo, CTA final, vagas, rodapé institucional.
**Proposta de dinamismo:**
1. **H2 de fechamento com Reveal** e "paga as contas" em destaque sutil — eco da espinha narrativa, fechando o arco mão→bolso.
2. **CTA final idêntico ao primário** (consistência de cor/forma) entrando com `Reveal` + barra de vagas final animada — reforça que o lote é o mesmo e está acabando.
3. **Mini-escada de fechamento (opcional, alto valor simbólico):** uma versão minúscula e estática da escada de honorário ao lado do CTA, já completa no topo (R$ 12.000), como "selo" do que a imersão entrega. Sem animação — aqui ela é assinatura, não demonstração.
**Por que aumenta conversão:** recapitula a promessa visual (escada) e a urgência (vagas) no último ponto de decisão.
**Reuso/implementação:** `Reveal` + `SeatsBlock` + render estático do `HonorarioStaircase`. **Esforço: baixo.**

---

## StickyCTA

**Objetivo:** capturar a conversão a qualquer altura da página.
**Proposta de dinamismo:** aparece a 5% (mobile) / 30% (desktop) deslizando de baixo (padrão `StickyCTA` já pronto), com label de lote + % de vagas. Esconde quando a Oferta ou o Footer (que já têm o CTA grande) estão na viewport, para não duplicar. **Esforço: baixo** (componente existe; só adicionar a regra de ocultar sobre as seções de CTA).

---

# Top 5 interações de maior impacto (impacto × esforço)

1. **Escada de honorário que soma R$ 3.000 → R$ 12.000 no scroll do Método** — o argumento visual central da página inteira. Impacto altíssimo; esforço médio-alto, mas reusa toda a mecânica do `SystemBuilder`. **Prioridade máxima.**
2. **Escada se desenhando no Hero + count-up da perda (R$ 12.000 / R$ 3.000)** — fixa a promessa em 3s e reusa o mesmo componente de escada do item 1. Impacto alto, esforço médio.
3. **Prova Social com "antes → depois" em número animado** — preenche a maior lacuna de conversão; esforço baixo-médio (gargalo é coletar conteúdo).
4. **Objeção dedicada com "riscar a crença" + ancoragem de preço em barras** — concentra a quebra de objeção de preço no ponto de maior intenção. Impacto alto, esforço médio.
5. **3 Noites como scrollytelling de entregáveis encadeados (+ vínculo com a escada)** — converte "3 aulas" em "3 produtos"; esforço médio reusando `ThreeNightsSection`.

---

# Sistema de motion coeso (princípios que amarram tudo)

1. **Um easing, uma direção.** Todo movimento usa `cubic-bezier(.22,.61,.36,1)` (o mesmo do `Reveal` e dos seams) e entra de baixo/levemente (y: +16→0). Exceções de direção apenas onde há significado: colunas opostas na Qualificação, escada subindo na diagonal. Nada "salta" (sem bounce/spring exagerado).
2. **Número que sobe = lastro, sempre dourado no delta.** Count-up é o motivo recorrente da marca: hero (perda), método (honorário), prova (antes→depois), autoridade (stats), oferta (vagas). Sempre fonte tabular, e o ouro marca só o valor que **entra com conta** — nunca decorativo.
3. **Aurora `#00657B` é sagrada: só CTA primário e a régua de scroll.** Dourado para perda/bônus/urgência/selo "ao vivo". Tudo o mais é tinta/cota neutra. Cor nunca anima sozinha (sem gradientes girando, sem glow pulsante) — o que se move são posição, opacidade e o traçado de linhas.
4. **Reveal once, viewport ~15%, e nada re-anima.** Entrou, ficou. O usuário que volta não vê a página "tremer". Scrollytelling (3 Noites, Método) é a única exceção sticky — e mesmo lá o estado é determinístico pelo progresso de scroll, reversível e suave.
5. **Quando NÃO animar:** abaixo de `768px` os scrollytellings viram listas lineares com `Reveal`; sob `prefers-reduced-motion` todo count-up mostra o valor final imediatamente, escada e seams aparecem estáticos completos, e durações caem para ~0.01ms (já há a regra global no CSS). Background orbs/vídeo: desligados no mobile e em reduced-motion.

---

# Armadilhas a evitar

- **Reveal letra-a-letra agressivo no H1** (estilo Água Quente/Operação Claude): rápido demais para o tom racional. Usar palavra-a-palavra/stagger sóbrio.
- **Marquee de depoimentos** (3D rotacionado / ticker horizontal): lê como "parede de prova" de marketing. Trocar por stagger de dossiê.
- **Glow pulsante no preço e bordas cônicas girando** (`price-glow-anim`, `price-animated-border`): apelativo e pesado. O preço baixo se vende pelo contraste, não por fogos.
- **Aurora fora do CTA primário.** Qualquer linha/ícone aurora animado que não seja o CTA ou a régua de scroll quebra a hierarquia de cor.
- **Animar a escada toda vez que entra na viewport** ou re-disparar count-ups: vira distração. Once + estado determinístico.
- **Parallax/orbs/vídeo de fundo pesados** atrás de seções de leitura densa (Método, Objeção): comprometem performance mobile e a legibilidade. Manter fundos quietos onde há conta para ler.
- **Scrollytelling sem fallback mobile:** sticky + scroll-jacking em telas pequenas frustra. Sempre degradar para lista linear.
- **Excesso de hover-games** (cards que escalam muito, mouse-glow forte): num produto técnico, hover deve ser quase imperceptível (elevação de 2-3px no máximo).

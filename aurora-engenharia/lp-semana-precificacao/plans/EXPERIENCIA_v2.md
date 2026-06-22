# Experiência v2 — Motion & Interaction Design (Semana da Precificação)

> **O que é este doc:** o projeto de experiência da landing, seção a seção, ancorado na copy
> da `COPY_ESTRUTURA_v2.md` (ângulo **"você já sabe fazer · dinheiro na mesa"**) e na estrutura
> de 11 seções. Para cada seção: objetivo psicológico · mensagem única · UX · interação ·
> motion · elemento protagonista · continuidade.
>
> **Princípio-mãe:** copy, interface e motion projetados juntos. Toda animação **comunica** —
> nada de movimento gratuito. Clareza antes de espetáculo.

---

## A. FUNDAMENTOS TRANSVERSAIS (valem pra página inteira)

### A.1 — A metáfora visual única: **A MESA**
A página inteira gira em torno de uma imagem: **dinheiro deixado na mesa**. Visualmente isso
se traduz em **um número que sobe** (a perda acumulando) e que só **trava/recua** quando o
método entra. Não há segunda metáfora competindo (a "escada" e a "torneira" das versões
anteriores saíram).

### A.2 — Semântica de cor (cor nunca é decoração, é significado)
| Token | Hex | Significado FIXO |
|---|---|---|
| `ink` | `#001115` | fundo das seções de decisão/dinheiro (dark) |
| `paper` | `#fafaf7` | fundo das seções de leitura/respiro (light) |
| `aurora` | `#00657B` | **só** CTA primário e a régua de scroll |
| `aurora-glow` | `#13b8d9` | halo/realce do teal sobre dark (sutil) |
| `gold` | `#dbbe7c` | **o que você PERDE** — dinheiro na mesa, desconto, perda |
| `emerald` | `#10b981` | **o que você RECUPERA** — número que sobe com lastro, margem, ganho |

> **A regra de ouro semântica:** dourado = o dinheiro que escapa; emerald = o dinheiro que
> volta pro seu bolso. O usuário aprende essa gramática no Hero e ela se repete na página toda.

### A.3 — Sistema de motion (as 5 leis)
1. **Um easing:** `cubic-bezier(.22,.61,.36,1)`. Sem bounce, sem spring exagerado.
2. **Acende, não salta.** Texto via `clip-path`/opacity (mask reveal); dados via count-up;
   linhas via `stroke-dashoffset`. Nada "sobe de baixo" com salto.
3. **Count-up = dinheiro.** Todo número monetário relevante conta (perda no Hero, conta na
   Mesa, antes→depois na Prova, vagas na Oferta). Fonte tabular. É o gesto-assinatura.
4. **Once, viewport ~15%.** Entrou, ficou. Não re-anima ao voltar o scroll (exceto a régua).
5. **Reduced-motion / mobile:** count-ups mostram valor final; reveals viram fade ~0ms;
   trilhos horizontais viram listas; halos desligam. A página continua legível e completa.

### A.4 — Ritmo macro (impacto × leitura)
O escuro é batida forte; o claro é respiro. A página pulsa:
`Hero🌑(impacto) → Reframe☀️(leitura) → Conta🌑(IMPACTO MÁXIMO) → 3 Noites☀️(leitura) →
Prova🌑(impacto) → Qualificação☀️(leitura) → Objeção🌑(impacto) → Mentor☀️(leitura) →
Oferta🌑(IMPACTO/decisão) → FAQ☀️(leitura) → Footer🌑(impacto final)`.
A transição entre temas é um **fade de 16–24px** (não um traço/seam) — herança suave.

### A.5 — Um protagonista por seção
Cada seção tem **um** momento de pico. Todo o resto recua (menor contraste, sem animação
concorrente). Picos da página em ordem de força: **Conta da Mesa > Hero > Oferta > Prova**.
Os demais são deliberadamente quietos.

---

## B. SEÇÃO A SEÇÃO

---

### 0 · TOP BAR

**1. Objetivo psicológico:** segurança de que o preço está sempre a um clique — reduzir
ansiedade de "onde compro" sem competir com o conteúdo.
**2. Mensagem principal:** "É barato e está sempre aqui."
**3. UX:** logo à esquerda, CTA com preço à direita, fixa. Não rouba foco do Hero. Ao cruzar
a Oferta, o label troca de `Entrar no Lote 1 · R$ 27` → `Garantir vaga · R$ 27`.
**4. Interaction:** (a) **régua de scroll** — linha aurora de 2–3px no topo preenchendo com o
progresso; (b) **condensação** — após ~80px de scroll a barra ganha `backdrop-blur` + hairline
inferior e o CTA encolhe levemente.
**5. Motion:** a régua é a **única** linha aurora "viva" da página (progresso = compromisso de
leitura). Condensação em 0.25s. Nada mais se move.
**6. Protagonista:** o **CTA com preço** (a régua é coadjuvante funcional).
**7. Continuidade:** ao condensar, "some do caminho" e entrega a tela pro Hero.

---

### 1 · HERO 🌑

**1. Objetivo psicológico:** choque de consciência — "eu domino a técnica, mas estou perdendo
dinheiro de verdade, todo mês, e nunca fiz essa conta".
**2. Mensagem principal:** **Você já sabe fazer. O que te custa é não saber cobrar — e isso
tem um número.**
**3. UX:** primeiro o olho bate na H1 (`fazer × cobrar`), desce pra sub (a conta de R$ 60k),
e o olhar é puxado pro **contador** à direita/abaixo, que está *subindo*. CTA logo após o
contador travar. Countdown e vagas em peso menor, embaixo (urgência ainda não é o foco aqui).
**4. Interaction:** **contador-herói** "Deixado na mesa este ano: R$ 0 → R$ 60.000" em
count-up; countdown regressivo; barra de vagas.
**5. Motion:**
- H1: mask reveal palavra a palavra; **"fazer"** acende em tinta neutra, **"cobrar"** acende
  por último com um sublinhado que se traça — fixa o contraste-mãe.
- Contador: conta de 0 a 60.000 em ~1.6s (dourado = perda) e, ao terminar, entra um selo
  pequeno e a cor **trava** — comunica "essa sangria só para com a conta". O número NÃO volta
  a zero nem pulsa: ele fica lá, dourado, incomodando.
- *Por que anima:* ver o número subir É o argumento — materializa perda invisível.
**6. Protagonista:** o **contador da perda** (R$ 60.000 dourado).
**7. Continuidade:** o contador deixa a pergunta "como assim eu perco isso?" — que a próxima
seção (Reframe) responde tirando a culpa de "coragem" e jogando em "conta".

---

### 2 · O REFRAME ☀️

**1. Objetivo psicológico:** alívio + recategorização — "não sou covarde nem ruim de vendas;
me falta um método". Desarma a cicatriz de 'coach genérico'.
**2. Mensagem principal:** **O problema não é coragem. É não ter de onde o número sai.**
**3. UX:** bloco curto de texto (3 frases de ritmo alternado), seguido de um **comparativo de
2 colunas** `Coach genérico × Semana da Precificação`. Leitura rápida, escaneável.
**4. Interaction:** comparativo lado a lado (3 linhas). Hover quase imperceptível (elevação
2px). Nenhuma interação pesada — é seção de respiro.
**5. Motion:** as 3 frases acendem em sequência (mask reveal). O comparativo entra com a
coluna direita (a "boa") chegando 0.1s depois e levemente mais nítida que a esquerda —
hierarquia por contraste. *Por que anima:* a defasagem dá vantagem visual ao lado certo.
**6. Protagonista:** o **comparativo `Mentalidade × Método`**.
**7. Continuidade:** estabelece "existe um método" — o usuário agora quer ver **a conta** que
prova isso. Entra a peça-estrela.

---

### 3 · A CONTA DA MESA 🌑 ⭐ (PICO DA PÁGINA)

**1. Objetivo psicológico:** internalização irreversível da dor — depois de *fazer a conta*,
o usuário não consegue mais aceitar o próprio preço atual. É o ponto de virada emocional.
**2. Mensagem principal:** **A sua margem real é menor do que você pensa — e a diferença,
vezes os seus projetos, é uma fortuna na mesa.**
**3. UX:** seção em sticky leve. À esquerda o H2 + a explicação; à direita os **4 passos da
conta** que se revelam **um a um conforme o scroll**, e um **total que soma ao vivo**. O
usuário "executa" a conta descendo a página. Foco absoluto no número final.
**4. Interaction:** **mini-calculadora narrativa** (não interativa de input — dirigida por
scroll, pra não dar trabalho nem quebrar no mobile):
- Passo 1 aparece: "quanto cobrou" (valor neutro).
- Passo 2: subtrai custos (cada custo entra como uma linha; o número **cai**, em dourado).
- Passo 3: revela a margem real (às vezes negativa — pisca em dourado).
- Passo 4: multiplica por 12 → **o total "na mesa" estoura em count-up grande**.
- *Opção de elevação (fase 2):* deixar o usuário ajustar 2 sliders (valor do projeto · nº de
  projetos/ano) e ver o total recalcular — transforma a dor em **dele**, não ilustrativa.
**5. Motion:** os passos acendem no scroll (determinístico pelo progresso, reversível). O
total final faz o **maior count-up da página** (~2s, dourado, fonte grande tabular) e fica.
Selo `▸ valores ilustrativos · a sua a gente monta na Aula 01`. *Por que anima:* a soma ao
vivo é a prova literal de "preço com conta, não chute" — o oposto exato do feeling.
**6. Protagonista:** o **total na mesa** (count-up grande dourado).
**7. Continuidade:** a dor está no talo e quantificada. Pergunta inevitável: "como eu paro
isso?" → As 3 Noites entregam o método, passando o tom de dourado(perda) pra emerald(solução).

---

### 4 · AS 3 NOITES ☀️

**1. Objetivo psicológico:** esperança concreta + redução de "curso vago" — "tem um caminho
de 3 passos e eu saio com ferramentas, não com teoria".
**2. Mensagem principal:** **Em 3 noites você sai com a planilha e a proposta prontas —
custo → preço → proposta.**
**3. UX:** mini-resumo de 1 linha (`Aula 01 o custo → 02 o preço → 03 a proposta`) e, abaixo,
um **trilho/timeline de 3 marcos**. No desktop, scrollytelling: a aula ativa fica em foco,
as outras recuam (opacity 0.4). No mobile, lista linear.
**4. Interaction:** timeline vertical com 3 nós; ao ativar cada aula, o bloco **"Você sai
com:"** expande com um selo `▸ entregável`. Trilho à esquerda preenche em emerald conforme
avança (= dinheiro voltando, contraponto ao dourado da Mesa).
**5. Motion:** o trilho se desenha (`stroke-dashoffset`) ligando os 3 nós; cada card ativo
acende; o selo de entregável faz um micro-scale 1.03→1. *Por que anima:* o trilho que se
completa = "o vazamento sendo fechado etapa a etapa".
**6. Protagonista:** a **timeline das 3 aulas** (com os 3 entregáveis).
**7. Continuidade:** "o método existe e tem entregável" → falta provar que **funciona com
gente real** → Prova Social.

---

### 5 · PROVA SOCIAL 🌑

**1. Objetivo psicológico:** transferência de credibilidade — "funcionou pra um engenheiro
como eu, então funciona pra mim".
**2. Mensagem principal:** **Não é teoria: o honorário de quem fez a conta subiu — com
número.**
**3. UX:** cards em stagger de **dossiê** (não marquee/ticker — produto racional). Cada card:
contexto + `R$ antes → R$ depois` + frase curta específica. Print de proposta tratado como
documento (moldura técnica, cliente anonimizado).
**4. Interaction:** em cada card, o **"depois" faz count-up** ao entrar (emerald = recuperado);
o "antes" fica apagado/dourado. Sem carrossel automático.
**5. Motion:** entrada calma em stagger (~0.08s entre cards); count-up do "depois". *Por que
anima:* repete o gesto-assinatura (número que sobe) agora no lado positivo — fecha o arco
dourado→emerald que começou na Mesa.
**6. Protagonista:** o **número antes→depois** (o "depois" em emerald).
**7. Continuidade:** "funciona pros outros" → "mas funciona pra **mim**?" → Qualificação faz
o usuário se reconhecer. `[Nota: seção sai do ar se não houver depoimento real — nada inventado.]`

---

### 6 · É PRA VOCÊ SE… ☀️

**1. Objetivo psicológico:** auto-seleção e pertencimento — "isso é exatamente eu" (e filtra
quem não é, reduzindo reembolso).
**2. Mensagem principal:** **Se você entrega alto padrão e cobra no olho, é pra você.**
**3. UX:** duas colunas. "É pra você" entra da esquerda, "Não é" da direita. A coluna positiva
tem mais peso visual; a negativa é levemente dessaturada/menor. Itens curtos, palavra-gatilho
na frente, escaneáveis.
**4. Interaction:** os **checks da coluna positiva se desenham** um a um (stroke), como
requisitos sendo conferidos. A coluna negativa usa traço neutro (não X vermelho).
**5. Motion:** checklist com `pathLength` animado em sequência. *Por que anima:* o gesto de
"conferir requisito" é linguagem de engenharia e gera a sensação de checagem objetiva.
**6. Protagonista:** a **coluna "É pra você se…"** (o checklist que se marca).
**7. Continuidade:** o usuário se reconheceu e está quase pronto — mas ainda segura uma
objeção de preço. Objeção dedicada vem desarmá-la no pico de intenção.

---

### 7 · A OBJEÇÃO DO PREÇO 🌑

**1. Objetivo psicológico:** remover a última barreira racional ("e se eu cobrar e perder o
cliente?") antes do preço aparecer.
**2. Mensagem principal:** **Todo motivo pra não cobrar mais cai na primeira conta.**
**3. UX:** ritmo lento, uma objeção por vez, bastante respiro (não carrossel). Abaixo, um
**comparativo de ancoragem em barras**: desconto reflexo (grande, dourado) × ingresso (mínimo).
**4. Interaction:** cada crença aparece como fala do cliente (cinza, entre aspas); ao entrar
na viewport, é **riscada por uma linha dourada** e a resposta Aurora desliza por baixo.
Barras de ancoragem crescem na entrada.
**5. Motion:** o risco da crença se traça da esquerda à direita; a resposta acende em seguida.
As barras crescem (`scaleX` origin-left): a do desconto perdido grande/dourada, a do preço
pequena/aurora. *Por que anima:* "riscar a crença" é o gesto de derrubar com conta; a
desproporção das barras é o argumento de ancoragem em si.
**6. Protagonista:** a **ancoragem em barras** (desconto perdido × R$ 27).
**7. Continuidade:** objeção derrubada + preço já ancorado como ridículo → falta só confiar em
**quem** ensina → Mentor.

---

### 8 · O MENTOR ☀️

**1. Objetivo psicológico:** confiança na autoridade — "esse cara cobra de verdade o que está
ensinando".
**2. Mensagem principal:** **Quem te ensina a cobrar é quem construiu um escritório cobrando
honorário de especialista.**
**3. UX:** foto à esquerda como "ficha técnica"; bio curta em 2 parágrafos à direita; 3 stats
em destaque. Leitura tranquila (respiro antes da oferta).
**4. Interaction:** stats com **count-up** (seguidores, posts, anos); foto com moldura técnica
que se desenha + tag `FICHA · 001`.
**5. Motion:** moldura em stagger nos cantos; bio em mask reveal por parágrafo; stats contam
ao entrar. *Por que anima:* converte autoridade em **números verificáveis** (tom Aurora) em
vez de adjetivos.
**6. Protagonista:** os **3 stats** do Leo (autoridade quantificada).
**7. Continuidade:** confiança estabelecida no fim → o usuário está pronto pra decidir →
Oferta. A seção termina entregando o gancho `▸ agora é o seu bolso`.

---

### 9 · A OFERTA 🌑 (decisão)

**1. Objetivo psicológico:** decisão de baixo risco — "por R$ 27 eu corrijo o ano todo; não
faz sentido não entrar".
**2. Mensagem principal:** **Custa menos do que você desconta numa proposta — e corrige o ano
inteiro.**
**3. UX:** duas colunas — Especificação (o que é/recebe) à esquerda, Decisão (preço/CTA/
garantia) à direita. **Valor antes do preço:** specs + lista de entregáveis (tangíveis no
topo) → só então o preço. CTA + vagas + garantia agrupados.
**4. Interaction:** lista "o que você recebe" em stagger numerado (01–06); barra de vagas +
countdown; selo de garantia que entra por último.
**5. Motion:** o preço entra com count-up curto OU scale-in suave (**sem glow pulsante** — o
preço é baixo de propósito, o destaque é o contraste com R$ 60k da Mesa). A garantia faz um
micro-carimbo (scale 1.05→1) — reduz risco no instante da decisão. *Por que anima:* o preço
estável + garantia carimbada = "decisão segura, não impulso".
**6. Protagonista:** o **card de preço ancorado** (R$ 27 vs R$ 60k/ano).
**7. Continuidade:** quem decidiu, clica. Quem ainda tem dúvida pontual desce pro FAQ —
varredura final sem fricção.

---

### 10 · FAQ ☀️

**1. Objetivo psicológico:** dissolver dúvidas residuais e dar saída humana ("posso conversar
antes").
**2. Mensagem principal:** **Qualquer dúvida que sobrou já tem resposta — e tem gente do outro
lado.**
**3. UX:** acordeão escaneável; abrir vários é permitido (menos intrusivo). Bloco WhatsApp ao
fim, em destaque calmo (CTA secundário outline — o preenchido aurora é exclusivo da compra).
**4. Interaction:** acordeão (height auto + fade), ícone `+` girando pra `×`.
**5. Motion:** abertura suave; itens entram em stagger no scroll. *Por que anima:* só
funcional — manter escaneável, nada de espetáculo numa seção de varredura.
**6. Protagonista:** o **acordeão** (a lista que se abre).
**7. Continuidade:** sem mais dúvidas, resta a decisão final — Footer recoloca a tensão e o CTA.

---

### 11 · FOOTER 🌑

**1. Objetivo psicológico:** urgência honesta + fechamento do arco — "o dinheiro continua na
mesa enquanto eu enrolo".
**2. Mensagem principal:** **A indecisão também tem preço — e é maior que R$ 27.**
**3. UX:** H2 de fechamento, 2 frases secas, CTA final idêntico ao primário, barra de vagas
final. Rodapé institucional discreto.
**4. Interaction:** **eco do contador da Mesa** — uma versão pequena do "deixado na mesa"
ainda subindo ao lado do CTA (selo, não demonstração); barra de vagas final.
**5. Motion:** H2 em mask reveal; o mini-contador sobe devagar e **não trava** aqui (de
propósito: enquanto não decide, segue subindo). *Por que anima:* fecha a página com a mesma
imagem que abriu — a perda só para quando ele clica.
**6. Protagonista:** o **CTA final** (com o eco do contador como reforço de urgência).
**7. Continuidade:** fecha o loop com o Hero (mesma imagem) → única saída é o clique.

---

### — · STICKY CTA

**1. Objetivo psicológico:** remover atrito de conversão em qualquer altura.
**2. Mensagem principal:** "Entrar custa R$ 27, agora."
**3. UX:** aparece a 5% (mobile) / 30% (desktop); some sobre Oferta e Footer (não duplica o
CTA grande). Mostra lote + preço.
**4. Interaction:** desliza de baixo; some/reaparece por threshold de scroll.
**5. Motion:** slide-up suave (0.25s) ao cruzar o threshold; fade ao entrar nas seções de CTA
grande. *Por que anima:* presença discreta onde mais converte, ausência onde seria redundante.
**6. Protagonista:** o **botão** (é só ele).
**7. Continuidade:** acompanha toda a jornada como rede de segurança da conversão.

---

## C. RESUMO — UM PROTAGONISTA POR SEÇÃO

| Seção | Protagonista | Gesto-chave |
|---|---|---|
| TopBar | CTA c/ preço | régua de scroll |
| Hero | contador da perda (R$ 60k 🟡) | count-up que trava |
| Reframe | comparativo Mentalidade × Método | defasagem de entrada |
| **Conta da Mesa** | **total na mesa (count-up grande 🟡)** | **conta que soma no scroll** |
| 3 Noites | timeline das 3 aulas | trilho que se desenha (🟢) |
| Prova | número antes→depois (🟢) | count-up do "depois" |
| Qualificação | coluna "é pra você" | checks que se marcam |
| Objeção | ancoragem em barras | crença riscada + barras |
| Oferta | card de preço ancorado | preço estável + garantia carimbada |
| FAQ | acordeão | abertura suave |
| Footer | CTA final | eco do contador (não trava) |

**O arco cromático da página:** 🟡 dourado (perda, do Hero ao pico da Mesa) → 🟢 emerald
(recuperação, das 3 Noites à Prova) → 🔵 aurora (decisão, na Oferta/CTAs). A cor conta a
história sozinha.

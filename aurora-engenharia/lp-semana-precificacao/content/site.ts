// ============================================================
// FONTE DA VERDADE DO CONTEÚDO — Semana da Precificação (Aurora) · v2
// Ângulo: "Você já sabe FAZER. Falta a conta da MESA por não saber COBRAR."
// Toda copy da landing vive aqui. Editar texto = editar este arquivo.
// [TODO] = dado a confirmar com o cliente antes do ar. NADA inventado vai pro ar.
// ============================================================

// --- CONFIG GLOBAL / INTEGRAÇÕES (PENDÊNCIAS DE PRODUÇÃO) ---
export const config = {
  // TODO: URL real de checkout (Hotmart/Pagar.me). Vazio = handleCTA rola até #pricing.
  checkoutUrl: '',
  // WhatsApp Aurora (mesmo da Semana da Água Quente).
  whatsappNumber: '5564992034462',
  // Fim do Lote 1 (véspera do evento).
  lote1EndsAtISO: '2026-08-03T23:59:59-03:00',
  // Datas confirmadas: 4, 5 e 6 de agosto de 2026.
  datasConfirmadas: true,
  // TODO: confirmar regra "Aluno Aurora entra de graça".
  alunoAuroraGratis: true,
  // Total de vagas do Lote 1 — FONTE ÚNICA (useSeats lê daqui). TODO valor real.
  vagasTotal: 300,
  // Webhook de captura do popup de saída (exit-intent). Vazio = não envia (em dev
  // o lead só vai pro console). TODO produção: colar a URL do endpoint (n8n/Make).
  // Ref. imersão: https://auto.fypro.com.br/webhook/imersao-aurora-lead
  leadWebhookUrl: ''
};

export const brand = {
  evento: 'Semana da Precificação',
  mentor: 'Eng. Leonardo Marques',
  formacao: 'Fundador, Aurora Engenharia (UFTM 2017)',
  instagram: '@aurora.engenharia',
  instagramUrl: 'https://instagram.com/aurora.engenharia',
  horario: '19h30 BRT',
  plataforma: 'Google Meet',
  garantia: '7 dias de devolução incondicional'
};

// --- PREÇOS / LOTES ---
export const pricing = {
  lote1: 'R$ 27', // ingresso Normal (ao vivo)
  premium: 'R$ 67', // ingresso Premium (completo) — confirmado pelo cliente
  lote2: 'R$ 47',
  lote2Pct: '+74%',
  lote3: 'R$ 67',
  lote3Pct: '+148%'
};

// --- 0. TOP BAR ---
export const topbar = {
  logoAlt: 'Aurora Engenharia',
  eventoLinha: 'Semana da Precificação',
  datasLinha: '4, 5 e 6 de agosto',
  horarioLinha: '19h30 · Meet',
  ctaDesktop: `Entrar no Lote 1 · ${pricing.lote1}`,
  ctaOferta: `Garantir vaga · ${pricing.lote1}`
};

// --- 1. HERO (protagonista: contador da MESA = o RESULTADO) ---
export const hero = {
  kicker: ['Semana da Precificação', '4, 5 e 6 de agosto'],
  // H1: contraste de honorário (R$ 2 mil × R$ 15 mil).
  h1: {
    pre: 'Enquanto alguns engenheiros cobram ',
    baixo: 'R$ 2 mil',
    mid: ' por projeto, outros fecham contratos de ',
    alto: 'mais de R$ 45 mil',
    pos: '.'
  },
  // Subheadline.
  sub: {
    pre: 'A diferença não está só no projeto. Está na forma como eles ',
    destaque: 'precificam',
    fim: '.'
  },
  // Parágrafo de apoio.
  para: {
    pre: 'Você deixa ',
    valor: 'R$ 5.000',
    fim: ' na mesa a cada projeto fechado no chute. Em 3 dias, você vai descobrir como precificar de verdade: do custo da sua hora à proposta que fecha sem desconto.'
  },
  // Contador-herói (o RESULTADO). Rótulo ilustrativo INSEPARÁVEL do número (decisão C).
  contador: {
    label: 'Deixado na mesa este ano',
    valor: 60000,
    ilustrativo: 'exemplo de um engenheiro que fecha 1 projeto/mês',
    selo: 'a conta tira o dinheiro da mesa'
  },
  ctaPrimario: `Entrar no Lote 1 · ${pricing.lote1} →`,
  continuidade:
    'É a sequência da Semana da Água Quente, lá você aprendeu a entregar, aqui você aprende a cobrar. (não é pré-requisito)',
  proximoLote: `Próximo lote ${pricing.lote2} (${pricing.lote2Pct})`,
  vagasLabel: 'das vagas já preenchidas'
};

// --- 2. CONTA DA MESA (peça-estrela: a MECÂNICA, não o resultado) ---
// Decisão B: NÃO repetir o R$ 60k do hero do mesmo jeito — aqui mostra COMO se chega lá.
export type ContaPasso = {
  id: number;
  code: string;
  label: string;
  detalhe: string;
  // sinal do efeito no total: 'base' começa, 'menos' subtrai, 'resultado' fixa, 'multiplica' estoura
  efeito: 'base' | 'menos' | 'resultado' | 'multiplica';
  // valor exibido no passo (ilustrativo)
  valor: number;
};

export const contaDaMesa = {
  eyebrow: '▸ A conta que dói',
  h2Pre: 'Faça a conta uma vez. Depois dela, você ',
  h2Destaque: 'não consegue mais cobrar no chute.',
  intro:
    'Pega o seu último projeto de alto padrão. A diferença entre o que ele vale e o que você levou pra casa, vezes os seus projetos no ano, é o dinheiro na mesa. Não é o que você vai ganhar, é o que já era seu e ficou lá.',
  selo: 'valores ilustrativos · a sua conta a gente monta na Aula 01',
  // passos revelados no scroll (scroll-driven, decisão #15)
  // História "na mesa": o que vale − o que cobrou = diferença/projeto × 12 = ano.
  // Bate com o hero (R$ 5.000/projeto → R$ 60.000/ano).
  passos: [
    {
      id: 1,
      code: '01',
      label: 'O que o projeto vale',
      detalhe: 'o honorário justo pra entrega de alto padrão que você faz',
      efeito: 'base',
      valor: 13000
    },
    {
      id: 2,
      code: '02',
      label: 'O que você cobrou',
      detalhe: 'o número que foi pra proposta, "o de sempre, mais um pouco"',
      efeito: 'menos',
      valor: 8000
    },
    {
      id: 3,
      code: '03',
      label: 'Deixado nesse projeto',
      detalhe: 'a diferença que você entregou de graça, sem perceber',
      efeito: 'resultado',
      valor: 5000
    },
    {
      id: 4,
      code: '04',
      label: '× os projetos do ano',
      detalhe: 'a mesma diferença, repetida em cada projeto, somada em 12 meses',
      efeito: 'multiplica',
      valor: 60000
    }
  ] as ContaPasso[],
  // mapeamento progress→total: PATAMARES (saltos rápidos por passo, não escorrega) — achado #1.
  // fica 0 → salta p/ 5.000 (deixado/projeto) → salta p/ 60.000 (×12).
  totalKeyframes: {
    at: [0, 0.48, 0.5, 0.73, 0.75, 1],
    valores: [0, 0, 5000, 5000, 60000, 60000]
  },
  multiplicador: 12, // exibido explícito no passo 04 (achado: "× 12" visível)
  totalLabel: 'Dinheiro na mesa, no ano',
  fecho: 'Esse número some quando o preço deixa de ser chute e vira conta. É o que a gente faz nas 3 noites.'
};

// --- 3. REFRAME (não é coragem, é método) ---
export const reframe = {
  eyebrow: '▸ Por que é diferente',
  h2Pre: 'O que acontece se você ',
  h2Destaque: 'não agir.',
  // frase única (coach) — as outras duas foram removidas
  frases: [
    'Você já ouviu coach mandar "ter coragem de cobrar mais". Não mudou nada, porque o problema nunca foi coragem.'
  ],
  // comparativo Coragem sem conhecimento × Semana da Precificação
  comparativo: {
    esquerdaTitulo: 'Se você não participar da imersão',
    direitaTitulo: 'Se você participar da imersão',
    linhas: [
      ['Continua precificando no chute.', 'Precifica com segurança e critério.'],
      ['Segue dando descontos para fechar.', 'Fecha propostas sem precisar dar desconto.'],
      ['Perde projetos mais lucrativos.', 'Conquista projetos de alto padrão.'],
      ['Trabalha mais e lucra menos.', 'Aumenta a margem e o faturamento.'],
      ['É escolhido pelo preço, não pela autoridade.', 'É escolhido pela autoridade, não pelo preço.']
    ]
  },
  // CTA integrado no fim da seção (não um botão solto)
  ctaApoio: {
    pre: 'Pare de chutar o preço. ',
    destaque: 'Aprenda a precificar com método.'
  },
  cta: `Entrar no Lote 1 · ${pricing.lote1}`
};

// --- 4. AS 3 NOITES ---
export type Aula = {
  id: number;
  code: string;
  tag: string;
  data: string; // TODO data
  weekday: string;
  title: string;
  description: string;
  entregavel: string;
};

export const noites = {
  eyebrow: '▸ O programa · 3 noites ao vivo · 19h30 · Meet',
  h2Pre: 'Em três dias, você sai aprendendo a ',
  h2Destaque: 'cobrar.',
  sub: 'Do custo real da sua hora à proposta que o cliente aceita sem pestanejar.',
  // mini-resumo de 1 linha (leitura rápida, antes dos cards)
  miniResumo: 'Aula 01 o custo → Aula 02 o preço → Aula 03 a proposta.',
  hint: 'role ou clique numa etapa para abrir a aula',
  ctaMobile: `Entrar por ${pricing.lote1}`,
  aulas: [
    {
      id: 1,
      code: 'AULA.01',
      tag: 'CUSTO-01',
      data: '4 ago',
      weekday: 'TER',
      title: 'Identificando os custos do seu escritório',
      description:
        'De onde o dinheiro escorre pra mesa. A gente abre a semana calculando o custo-hora real do seu escritório: software, impostos, estrutura, pró-labore, tempo morto, retrabalho. É a conta que quase nenhum engenheiro faz, e sem ela, todo preço é achismo.',
      entregavel:
        'seu custo-hora real e o ponto exato onde hoje cobra no prejuízo sem saber.'
    },
    {
      id: 2,
      code: 'AULA.02',
      tag: 'PREÇO-02',
      data: '5 ago',
      weekday: 'QUA',
      title: 'Precificando um projeto de alto padrão',
      description:
        'Com o custo na mão, a gente precifica um projeto real, ao vivo, do zero. Escopo, complexidade, risco, revisões, valor entregue, cada variável vira uma linha da planilha de composição de honorário. A diferença entre "cobro o de sempre" e "cobro isso, e aqui está o porquê".',
      entregavel:
        'um número que se defende sozinho em qualquer reunião.'
    },
    {
      id: 3,
      code: 'AULA.03',
      tag: 'PROP-03',
      data: '6 ago',
      weekday: 'QUI',
      title: 'A proposta que fecha sem você baixar o preço',
      description:
        'Preço certo não basta se a proposta entrega ele errado. No último dia: a ordem em que o cliente vê valor antes do número, a ancoragem que faz o seu preço parecer óbvio, e o que responder no "tá caro" sem descer nada. Ao vivo, eu abro os meus números reais, faixas que cobro, como negocio, o que fecha.',
      entregavel: 'o modelo de proposta editável e a postura de especialista.'
    }
  ] as Aula[]
};

// --- 5. PROVA SOCIAL (condicional — ver fallback em DECISOES_REVISAO_v2 §E #12) ---
export type Depoimento = {
  id: number;
  nome: string;
  contexto: string;
  de: number;
  para: number;
  texto: string;
};

export const prova = {
  // Flag de publicação: enquanto não houver prova real, a seção NÃO vai pro ar.
  // TODO: virar true só quando houver depoimento/print real (nada inventado).
  publicar: false,
  eyebrow: '▸ Quem já fez essa conta',
  h2Pre: 'Não é teoria. É honorário que ',
  h2Destaque: 'subiu, com a conta na frente.',
  sub: 'Engenheiros que entregavam alto padrão e cobravam como commodity, até montarem a conta.',
  disclaimer: 'resultados de alunos do método Aurora',
  // PLACEHOLDERS — substituir por depoimentos reais. Só publica com publicar:true.
  depoimentos: [
    {
      id: 1,
      nome: '[Nome do aluno]',
      contexto: '[Eng. Civil · cidade]',
      de: 3000,
      para: 8000,
      texto: '[Depoimento real, placeholder. Padrão: o que mudou na proposta + qual número fechou.]'
    },
    {
      id: 2,
      nome: '[Nome do aluno]',
      contexto: '[Arquiteto · cidade]',
      de: 4500,
      para: 11000,
      texto: '[Depoimento real, placeholder. Argumento por número, não por adjetivo.]'
    }
  ] as Depoimento[]
};

// --- 6. QUALIFICAÇÃO (é pra você / não é pra você) ---
export const qualificacao = {
  eyebrow: '▸ Pra quem é',
  h2Pre: 'Essa semana resolve um problema específico. Veja se é o ',
  h2Destaque: 'seu.',
  sim: {
    titulo: 'É pra você se…',
    itens: [
      'Entrega alto padrão, mas cobra preço de mercado comum.',
      'Trava na hora de passar o preço, e desconta por medo de perder o cliente.',
      'Orça "no olho", sem saber o custo-hora real.',
      'Quer critério pra defender o número, não discurso de venda.'
    ]
  },
  nao: {
    titulo: 'Não é pra você se…',
    itens: [
      'Seu mercado é volume a preço baixo e você não quer alto padrão.',
      'Procura fórmula de "cobrar 10x amanhã" sem montar a conta.',
      'Não topa 3 noites ao vivo (mesmo com replay de 7 dias).'
    ]
  },
  fecho: 'Se você se viu em cima, a Aula 01 começa exatamente no seu ponto cego: o custo.'
};

// --- 7. OBJEÇÃO DEDICADA (antes do pricing) ---
export const objecao = {
  eyebrow: '▸ O que provavelmente está te travando',
  h2Pre: 'Todo motivo pra não cobrar mais ',
  h2Destaque: 'cai na primeira conta.',
  itens: [
    {
      crenca: '"Se eu cobrar mais, perco o cliente."',
      resposta:
        'Você não perde por cobrar mais, perde por não saber defender o que cobra. Com lastro no preço e proposta que mostra valor antes do número, o cliente fecha. É a Aula 03.'
    },
    {
      crenca: '"Precificação é feeling, não tem método."',
      resposta:
        'Feeling é o que te trava hoje. Aqui o preço vira planilha que se justifica linha a linha, quando o número tem conta, o medo de cobrar some.'
    },
    {
      crenca: '"Aqui ninguém paga alto padrão."',
      resposta:
        '"Aqui ninguém paga" é a âncora do concorrente barato. O cliente de alto padrão existe na sua cidade, ele só não te procura porque sua proposta parece commodity.'
    },
    {
      crenca: '"Não tenho tempo de montar planilha de custo."',
      resposta:
        'A planilha você monta uma vez, na Aula 01, e reusa em todo orçamento. O que toma seu tempo hoje é refazer preço no chute a cada proposta.'
    }
  ],
  // comparação em texto: a perda de um projeto × o investimento da imersão
  comparacao: {
    pre: 'Um único projeto mal precificado deixa ',
    perda: 5000,
    mid: ' na mesa. Aprender a precificar de vez custa ',
    preco: 27,
    pos: '.'
  },
  cta: `Entrar no Lote 1 · ${pricing.lote1}`
};

// --- 8. SOBRE O LEO ---
export const leo = {
  eyebrow: '▸ Mentor',
  h2Pre: 'Quem vai estar do ',
  h2Destaque: 'outro lado do Meet.',
  tag: 'Eng. Civil · UFTM 2017',
  nome: 'Leonardo Marques',
  subtitulo: 'Fundador · Aurora Engenharia',
  fotoSrc: '/foto-leo.jpeg',
  fotoTag: 'FICHA · 001',
  // Bio copiada da seção de mentor da Imersão (lp.auroraengenharia.com/imersao).
  bio: [
    'Me formei em Engenharia Civil pela UFTM em 2017, mas trabalho com projetos desde 2014. Em 2019 fundei a Aurora Engenharia e desde então passei a focar em uma única disciplina de projeto: Hidrossanitário de alto padrão.',
    'Antes de abrir meu escritório eu passei dois anos em construtoras de obras residenciais e vi os mesmos erros se repetirem: improviso, projetos que não seguiam normas, gambiarras e muito pós-obra. Quem investe em uma casa de alto padrão merece mais do que isso.',
    'Banho de hotel 5 estrelas, sistemas 100% seguros, alta pressão, bombeamento, eficiência e conforto. Nada de mau cheiro, nada de vazamentos e entupimentos. Resultados que definem, de verdade, o que é alto padrão.',
    'Hoje, esse trabalho é acompanhado no Instagram por 57,7 mil engenheiros, projetistas e arquitetos.'
  ],
  // Contato direto com o mentor (WhatsApp) — vive aqui desde que a FAQ foi removida.
  contato: {
    texto: 'Precisa tirar uma dúvida? Clique no botão abaixo e fale conosco no WhatsApp.',
    cta: 'Falar no WhatsApp'
  },
  // ordem reenquadrada (achado #7): competência primeiro; seguidores como audiência
  // qualificada, não vaidade de influencer. TODO confirmar números reais do Leo.
  stats: [
    { value: 7, decimals: 0, suffix: '+', label: 'anos cobrando honorário de alto padrão', code: 'n.01' },
    { value: 57.7, decimals: 1, suffix: 'K', label: 'engenheiros e arquitetos que acompanham o método', code: 'n.02' },
    { value: 798, decimals: 0, suffix: '', label: 'posts técnicos publicados', code: 'n.03' }
  ]
};

// --- 9. OFERTA (dois ingressos: Normal × Premium) ---
export const oferta = {
  h2Pre: 'Escolha como você quer ',
  h2Destaque: 'aprender a cobrar.',
  sub: 'Dois ingressos pra Semana da Precificação. 4, 5 e 6 de agosto, ao vivo.',
  // specs comuns aos dois ingressos (faixa acima dos cards)
  specs: [
    ['Datas', '4, 5 e 6 de agosto'],
    ['Horário', '19h30 BRT'],
    ['Formato', 'Google Meet · ao vivo']
  ],
  // Regalias confirmadas pelo cliente (21/06).
  ingressos: {
    normal: {
      badge: '▸ Ingresso padrão',
      nome: 'Padrão',
      preco: pricing.lote1,
      desc: 'Os 3 dias do evento ao vivo, em tempo real.',
      inclui: [
        'Participação integral nos 3 dias do evento ao vivo',
        'Networking exclusivo com a turma',
        'Mentoria coletiva de perguntas e respostas'
      ],
      cta: `Garantir vaga · ${pricing.lote1}`
    },
    premium: {
      badge: '▸ Ingresso Premium · recomendado',
      nome: 'Premium',
      preco: pricing.premium,
      desc: 'Tudo do ao vivo + os materiais e o acesso pra aplicar de vez.',
      inclui: [
        'Participação integral nos 3 dias do evento ao vivo',
        'Networking exclusivo com a turma',
        'Proposta comercial pronta para personalização',
        'Resumo estratégico das aulas',
        'Acesso Premium por 30 dias à A.R.E.A.',
        'Mentoria coletiva de perguntas e respostas'
      ],
      cta: `Garantir Premium · ${pricing.premium}`
    }
  },
  vagasFootnote: 'Vagas limitadas no Lote 1',
  pagamento: 'Pagamento seguro · Cartão · Pix'
};

// --- 10. FAQ ---
export type FaqItem = { code: string; q: string; a: string };

export const faq = {
  eyebrow: '▸ Dúvidas frequentes',
  h2Pre: 'As perguntas que talvez você esteja ',
  h2Destaque: 'fazendo agora.',
  itens: [
    {
      code: 'Q.00',
      q: 'Preciso ter feito a Semana da Água Quente?',
      a: 'Não. A Precificação é completa sozinha, você sai com a planilha e o roteiro mesmo sem ter feito a primeira. Quem fez as duas fecha o ciclo (a mão + o bolso), mas não é pré-requisito.'
    },
    {
      code: 'Q.01',
      q: 'Precificação dá pra ensinar mesmo? Não é feeling?',
      a: 'Não é feeling, é estrutura. Feeling é o que te trava. Aqui você monta uma planilha que justifica o preço linha a linha. Quando o número tem conta, o medo de cobrar some.'
    },
    {
      code: 'Q.02',
      q: 'E se eu subir o preço e perder o cliente?',
      a: 'Você perde por não saber defender o que cobra, não por cobrar mais. Quando o preço tem lastro e a proposta mostra valor antes do número, o cliente fecha. A Aula 03 é esse roteiro de defesa.'
    },
    {
      code: 'Q.03',
      q: 'Serve pro meu mercado? Aqui ninguém paga alto padrão.',
      a: '"Aqui ninguém paga" é a âncora do concorrente barato. Tem cliente de alto padrão na sua cidade, ele só não te procura porque sua proposta parece commodity. A imersão muda a proposta antes de mudar o mercado.'
    },
    {
      code: 'Q.04',
      q: 'A imersão é gravada? E se eu perder uma noite?',
      a: 'Replay por 7 dias, você acompanha no seu tempo. Mas o tira-dúvidas e a abertura dos meus números reais (faixas, ancoragem, negociação) acontecem só ao vivo na Aula 03. Quem aparece ao vivo sai com mais.'
    },
    {
      code: 'Q.05',
      q: 'Preciso de algum software?',
      a: 'Não. As aulas são pelo Google Meet, basta um navegador. A planilha roda em Excel/Google Sheets, eu entrego o modelo pronto.'
    },
    {
      code: 'Q.06',
      q: 'E se não fizer sentido pro meu momento?',
      a: 'Você tem 7 dias de garantia incondicional. Assistiu, recebeu a planilha e o roteiro, e não viu valor? Devolvemos 100% do investimento.'
    }
  ] as FaqItem[],
  contato: {
    eyebrow: '▸ Sua dúvida não está aqui?',
    h3: 'Me chama no WhatsApp e eu respondo direto.',
    desc: 'Atendimento humano, sem bot. Antes de comprar, você pode conversar comigo sobre qualquer coisa da imersão.',
    cta: 'Tirar dúvida no WhatsApp'
  }
};

// --- 11. FOOTER ---
export const footer = {
  h2Pre: 'O dinheiro continua na mesa ',
  h2Destaque: 'enquanto você decide.',
  paragrafo:
    'Você já entrega alto padrão. A única pergunta é se continua cobrando como commodity. Monta a conta agora por R$ 27, ou paga a indecisão no próximo orçamento que fechar abaixo do que vale.',
  proximaEdicao: '[ano]', // TODO ano
  proximaEdicaoNota: 'Próxima edição: [ano], e esse preço não volta.',
  cta: `Entrar agora · ${pricing.lote1}`,
  // eco do contador da mesa (variante "não trava" — sem selo de resolvido)
  ecoLabel: 'Deixado na mesa este ano',
  ecoValor: 60000,
  vagasLabel: '▸ Vagas no Lote 1',
  vagasFootnote: `Quando zerar: ${pricing.lote2} (${pricing.lote2Pct})`,
  rodape: 'Aurora Engenharia',
  links: [
    { label: 'Privacidade', href: '#' },
    { label: 'Termos', href: '#' }
  ]
};

// --- POPUP DE SAÍDA (exit-intent) — retenção + captura de lead ---
// Aparece quando o visitante dá sinal de que vai sair (mouse pro topo no desktop,
// scroll rápido pra cima no mobile). Reforça a oferta e captura o contato.
export const exitPopup = {
  eyebrow: 'Última chance',
  title: 'Espera — antes de fechar',
  subtitle: `Garanta sua vaga no Lote 1 por ${pricing.lote1}. As 3 noites começam em 4 de agosto e este lote vira ${pricing.lote2} (${pricing.lote2Pct}) quando as vagas zerarem.`,
  campos: {
    nome: { label: 'Nome completo', placeholder: 'Como você se chama' },
    email: { label: 'E-mail', placeholder: 'voce@exemplo.com' },
    telefone: { label: 'WhatsApp', placeholder: '(64) 99999-9999' }
  },
  enviar: 'Garantir minha vaga',
  enviando: 'Aguarde…',
  disclaimer: 'Seus dados são usados só pra te enviar o link das aulas e os lembretes. Sem spam.',
  // Estado mostrado após o envio (não há tela de "obrigado" na imersão — aqui há,
  // porque a Precificação ainda não redireciona pra um checkout fechado).
  sucesso: {
    titulo: 'Vaga pré-reservada ✓',
    desc: 'Recebemos seu contato — o link das aulas chega no seu WhatsApp e e-mail. Quer fechar agora?',
    cta: `Garantir vaga · ${pricing.lote1}`
  },
  // Mensagens de erro de validação (campo a campo).
  erros: {
    nome: 'Digite seu nome completo.',
    email: 'Digite um e-mail válido.',
    telefone: 'Digite um WhatsApp com DDD.'
  }
};

// --- STICKY CTA ---
export const sticky = {
  loteLinha: `▸ Lote 1 · ${pricing.lote1}`,
  cta: 'Entrar'
};

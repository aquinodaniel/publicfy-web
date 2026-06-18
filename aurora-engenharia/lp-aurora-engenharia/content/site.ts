/* ============================================================
   CONTEÚDO DA LANDING PAGE — MEDH-P / Aurora Engenharia
   ------------------------------------------------------------
   Esta é a FONTE DA VERDADE do conteúdo. Edite aqui, não nos
   componentes. Tudo marcado com  // TODO  precisa de dado real.
   ============================================================ */

export const site = {
  brand: "Aurora Engenharia",
  product: "MEDH-P",
  whatsapp: {
    phone: "5564992034462",
    label: "+55 64 99203-4462",
    message: "Olá! Tenho interesse no MEDH-P",
  },
};

export const whatsappLink = `https://api.whatsapp.com/send?phone=${site.whatsapp.phone}&text=${encodeURIComponent(
  site.whatsapp.message
)}`;

/* ---------- NAV ---------- */
export const nav = {
  links: [
    { label: "O método", href: "#metodo" },
    { label: "Por dentro", href: "#demonstracao" },
    { label: "Resultados", href: "#casos" },
    { label: "Investimento", href: "#oferta" },
  ],
  cta: "Garantir acesso",
};

/* ---------- HERO ---------- */
export const hero = {
  eyebrow: "Projetos hidrossanitários de alto padrão",
  // H1 escolhido (opção A). Troque se preferir B/C.
  title: "A metodologia que tira o engenheiro da guerra de preço.",
  titleAccent: "E o posiciona como especialista.",
  subtitle:
    "O MEDH-P é o treinamento para engenheiros que querem dominar projetos hidrossanitários completos, entregar no padrão premium e justificar honorários à altura.",
  ctaPrimary: "Conhecer o método",
  ctaSecondary: "Falar com um especialista",
  credibility: [
    "1.000+ engenheiros formados", // TODO: número real
    "150+ aulas práticas",
    "Projetos reais de alto padrão",
  ],
  // Barra de credibilidade — TODO: números reais
  stats: [
    { value: "1.000+", label: "engenheiros formados" }, // TODO
    { value: "150+", label: "aulas práticas" },
    { value: "7", label: "módulos completos" },
    { value: "4.9", label: "avaliação dos alunos" }, // TODO
  ],
  image: "/assets/leonardo-obra.png",
  floatingCard: {
    label: "Sistema completo",
    items: ["Água fria", "Água quente", "Esgoto", "Pluvial", "Solar"], // TODO: confirmar escopo
  },
};

/* ---------- FAIXA DE PROVA ---------- */
export const proofBar = {
  // TODO: nomes de construtoras/empresas/obras, ou trocar por métricas
  text: "Engenheiros de todo o Brasil já aplicam o método",
  logos: ["Obra A", "Obra B", "Construtora C", "Escritório D", "Obra E"], // TODO
};

/* ---------- PROBLEMA ---------- */
export const problem = {
  eyebrow: "O problema real",
  title: "Por que dois engenheiros entregam o mesmo projeto — e um cobra 10× mais?",
  subtitle:
    "Não é falta de conhecimento técnico. É falta de método: domínio completo do sistema, entrega de alto padrão e um posicionamento que justifica o preço.",
  comparison: {
    bad: {
      title: "Projeto commodity",
      points: [
        "Compete só por preço",
        "Entrega o mínimo da norma",
        "Cálculo refeito do zero a cada obra",
        "Cliente não enxerga o valor técnico",
        "Honorários estagnados",
      ],
    },
    good: {
      title: "Projeto de alto padrão",
      points: [
        "Vende valor, não preço",
        "Eficiência, conforto e sustentabilidade",
        "Processo padronizado e replicável",
        "Cliente vê a qualidade antes da obra",
        "Honorários de especialista",
      ],
    },
  },
  // rótulos do eixo de cada linha (pareados por índice com os points acima)
  axes: ["Posicionamento", "Entrega", "Processo", "Percepção do cliente", "Honorários"],
  metric: {
    value: 10,
    suffix: "×",
    label: "a diferença de honorários entre os dois caminhos — e ela está no método, não no cálculo.", // TODO: revisar copy
  },
};

/* ---------- MÉTODO MEDH-P (mecanismo único) ---------- */
export const method = {
  eyebrow: "O método MEDH-P",
  title: "Não é um amontoado de aulas. É um sistema.",
  subtitle:
    "Um sistema em 4 etapas que transforma um projeto comum em um projeto de alto padrão.", // TODO: revisar copy
  // TODO: VALIDAR com o Leonardo se os 4 pilares refletem o método real.
  pillars: [
    {
      number: "01",
      title: "Domínio técnico sem lacunas",
      description:
        "Dimensionar todo o sistema com segurança: água fria e quente, esgoto, pluvial, pressurização, reuso e solar. Fim do improviso.",
    },
    {
      number: "02",
      title: "Projeto de alto padrão",
      description:
        "Ir além do mínimo da norma: eficiência, conforto e sustentabilidade — o que diferencia o projeto premium do commodity.",
    },
    {
      number: "03",
      title: "Apresentação que vende valor",
      description:
        "Revit + Enscape: o cliente vê a qualidade antes da obra. O projeto deixa de ser linhas no papel e vira entrega visual.",
    },
    {
      number: "04",
      title: "Precificação e posicionamento",
      description:
        "Como cobrar por valor entregue (não por hora), justificar honorários altos e se posicionar como referência na região.",
    },
  ],
  closing: {
    text: "As 4 etapas formam um sistema. Domine-as e seu projeto passa a ser contratado pelo valor que entrega — não pelo menor preço.", // TODO: revisar copy
    cta: "Quero aplicar o método",
    href: "#oferta",
  },
};

/* ---------- DEMONSTRAÇÃO ---------- */
export const demo = {
  eyebrow: "Por dentro do treinamento",
  title: "Você não está comprando promessas. Está entrando num ambiente de trabalho completo.",
  subtitle:
    "Aulas práticas, modelos de Revit, planilhas de dimensionamento e materiais prontos para usar nos seus próprios projetos — a partir do primeiro dia.",
  // TODO: substituir image por screenshots REAIS de cada item.
  tabs: [
    {
      key: "aulas",
      label: "Área de membros",
      caption: "150+ aulas práticas, organizadas por sistema — assista no seu ritmo.",
      image: "/assets/demo-membros.png", // TODO
    },
    {
      key: "revit",
      label: "Revit + Enscape",
      caption: "Modele e renderize: entregue um projeto que o cliente entende.",
      image: "/assets/demo-revit.png", // TODO
    },
    {
      key: "planilhas",
      label: "Planilhas",
      caption: "Planilhas de dimensionamento prontas — pare de refazer cálculo do zero.",
      image: "/assets/demo-planilhas.png", // TODO
    },
    {
      key: "templates",
      label: "Materiais",
      caption: "Cadernos técnicos, templates e atas para padronizar suas entregas.",
      image: "/assets/demo-templates.png", // TODO
    },
  ],
};

/* ---------- CURRÍCULO (capacidades) ---------- */
export const curriculum = {
  eyebrow: "O que você passa a fazer",
  title: "7 módulos. Da base ao projeto de alto padrão.",
  subtitle: "150+ aulas práticas em vídeo, organizadas por sistema.",
  hours: 60, // TODO: validar carga horária real com o Leonardo
  impact: "passos para você dominar o projeto hidrossanitário de alto padrão.",
  // TODO: revisar títulos/aulas conforme o currículo real
  modules: [
    { title: "Fundamentos e dimensionamento", lessons: "Água fria, pressão, vazão e normas", count: 22 },
    { title: "Esgoto sanitário", lessons: "Coleta, ventilação e tratamento", count: 18 },
    { title: "Águas pluviais", lessons: "Captação, condução e reaproveitamento", count: 16 },
    { title: "Pressurização e bombeamento", lessons: "Sistemas pressurizados e boosters", count: 20 },
    { title: "Água quente e solar", lessons: "Boiler, aquecimento e placas solares", count: 24 },
    { title: "Reuso e sustentabilidade", lessons: "Reaproveitamento e eficiência", count: 14 },
    { title: "Revit, Enscape e entrega", lessons: "Modelagem, render e apresentação", count: 26 },
  ],
};

/* ---------- ESTUDOS DE CASO ---------- */
export const caseStudies = {
  eyebrow: "Resultados reais",
  title: "O método já tirou engenheiros da guerra de preço.", // TODO: ajustar nº
  subtitle:
    "Não são promessas — são engenheiros que aplicaram o MEDH-P e mudaram o patamar dos próprios honorários.",
  // TODO: preencher 2–3 casos REAIS (nome, cidade, valores, foto/vídeo)
  cases: [
    {
      name: "Nome do aluno", // TODO
      city: "Cidade/UF", // TODO
      role: "Engenheiro civil", // TODO
      before: "Cobrava R$ 2.500 por projeto, competindo só por preço.", // TODO
      applied: "Aplicou o método de entrega premium e apresentação em Revit.", // TODO
      after: { from: "R$ 2.500", to: "R$ 18.000" }, // TODO
      quote: "Depoimento curto do aluno aqui.", // TODO
      image: "/assets/caso-1.png", // TODO
      videoUrl: "", // TODO (opcional)
    },
    {
      name: "Nome do aluno", // TODO
      city: "Cidade/UF", // TODO
      role: "Projetista", // TODO
      before: "Situação inicial.", // TODO
      applied: "O que aplicou do método.", // TODO
      after: { from: "R$ —", to: "R$ —" }, // TODO
      quote: "Depoimento curto do aluno aqui.", // TODO
      image: "/assets/caso-2.png", // TODO
      videoUrl: "",
    },
    {
      name: "Nome do aluno", // TODO
      city: "Cidade/UF", // TODO
      role: "Engenheiro", // TODO
      before: "Situação inicial.", // TODO
      applied: "O que aplicou do método.", // TODO
      after: { from: "R$ —", to: "R$ —" }, // TODO
      quote: "Depoimento curto do aluno aqui.", // TODO
      image: "/assets/caso-3.png", // TODO
      videoUrl: "",
    },
  ],
};

/* ---------- PROVA SOCIAL (prints de WhatsApp + vídeos) ---------- */
export const testimonials = {
  eyebrow: "O que os alunos dizem",
  title: "Quem aplicou, conta melhor do que a gente.",
  subtitle: "Conversas e relatos reais de engenheiros dentro do MEDH-P.",
  // TODO: adicionar os PRINTS de WhatsApp (imagens) aqui.
  // type "whatsapp" => print de conversa | type "video" => depoimento em vídeo
  items: [
    { type: "whatsapp", image: "/assets/depoimento-wpp-1.png", alt: "Depoimento WhatsApp" }, // TODO
    { type: "video", thumb: "/assets/depoimento-video-1.png", videoUrl: "", name: "Aluno 1", orientation: "vertical" }, // TODO
    { type: "whatsapp", image: "/assets/depoimento-wpp-2.png", alt: "Depoimento WhatsApp" }, // TODO
    { type: "whatsapp", image: "/assets/depoimento-wpp-3.png", alt: "Depoimento WhatsApp" }, // TODO
    { type: "video", thumb: "/assets/depoimento-video-2.png", videoUrl: "", name: "Aluno 2", orientation: "vertical" }, // TODO
    { type: "whatsapp", image: "/assets/depoimento-wpp-4.png", alt: "Depoimento WhatsApp" }, // TODO
  ] as Testimonial[],
};

export type Testimonial =
  | { type: "whatsapp"; image: string; alt: string }
  | { type: "video"; thumb: string; videoUrl: string; name: string; orientation: "vertical" | "horizontal" };

/* ---------- AUTORIDADE (Leonardo) — conteúdo da LP /imersao/ ---------- */
export const authority = {
  eyebrow: "Quem conduz",
  name: "Leonardo Marques",
  role: "Fundador · Aurora Engenharia",
  credential: "Eng. Civil · UFTM 2017",
  specialty: "Hidrossanitário de alto padrão",
  ficha: ["FICHA · 001", "LM · 2017", "UFTM · CIVIL"],
  bio: [
    "Antes de abrir meu escritório eu passei dois anos em construtoras de obras residenciais e vi os mesmos erros se repetirem: improviso, projetos que não seguiam normas, gambiarras e muito pós-obra. Quem investe em uma casa de alto padrão merece mais do que isso.",
    "Banho de hotel 5 estrelas, sistemas 100% seguros, alta pressão, bombeamento, eficiência e conforto.",
  ],
  stats: [
    { value: "57,7K", label: "seguidores @aurora.engenharia", code: "n.01" },
    { value: "798", label: "posts técnicos publicados", code: "n.02" },
    { value: "7+", label: "anos à frente da Aurora", code: "n.03" },
  ],
  image: "/assets/leonardo-obra.png",
};

/* ---------- ROI (calculadora interativa) ---------- */
export const roi = {
  eyebrow: "O retorno",
  title: "Faça a conta que todo engenheiro deveria fazer.",
  subtitle: "Ajuste com os seus números e veja o retorno do método na prática.",
  note: "O método se paga no primeiro projeto que você fechar com o novo posicionamento — e tudo depois disso é margem.",
  // Parâmetros da calculadora — ajuste os ranges/defaults conforme a realidade
  calc: {
    custo: 1997,
    projetos: { min: 1, max: 24, default: 6, step: 1, label: "Projetos por ano" },
    valorHoje: {
      min: 1000,
      max: 8000,
      default: 2500,
      step: 250,
      label: "Quanto você cobra hoje por projeto",
    },
    valorMeta: {
      min: 8000,
      max: 30000,
      default: 18000,
      step: 500,
      label: "Valor de um projeto de alto padrão", // TODO: validar faixa
    },
  },
};

/* ---------- BÔNUS ---------- */
export const bonus = {
  eyebrow: "Bônus inclusos",
  title: "Tudo que você precisa para começar hoje.",
  // value em R$ (number) para o "value stack". TODO: ajustar valores reais
  items: [
    { title: "Análise de projeto pelo Leonardo", description: "Feedback direto no seu projeto, ponto a ponto.", image: "/assets/bonus-analise.png", value: 1500 },
    { title: "Roteiro premium de reunião", description: "Conduza reuniões que fecham contratos.", image: "/assets/bonus-roteiro.png", value: 800 },
    { title: "Comunidade", description: "Rede de engenheiros aplicando o método.", image: "/assets/bonus-comunidade.png", value: 1200 },
    { title: "Aulas comunitárias", description: "Encontros ao vivo recorrentes.", image: "/assets/bonus-aulas.png", value: 2000 },
  ],
  totalLabel: "Valor total em bônus",
  includedLabel: "incluso, sem custo extra",
};

/* ---------- OFERTA ---------- */
export const offer = {
  eyebrow: "Investimento",
  title: "Invista na sua transformação profissional.",
  highlight: "Acesso completo aos 7 módulos + aulas comunitárias",
  installments: "12x de R$ 206,54",
  cash: "ou R$ 1.997,00 à vista",
  includes: [
    "7 módulos completos (150+ aulas)",
    "Modelos de Revit, Enscape e planilhas",
    "Cadernos técnicos e templates prontos",
    "Comunidade e aulas comunitárias",
    "Análise de projeto pelo Leonardo",
  ],
  cta: "Garantir meu acesso",
  specialistCta: "Falar com um especialista",
  guarantee: {
    title: "Garantia incondicional de 7 dias",
    text: "Se em 7 dias você achar que o MEDH-P não é para você, devolvemos 100% do investimento. O risco é todo nosso.",
  },
};

/* ---------- FAQ ---------- */
export const faq = {
  eyebrow: "Dúvidas frequentes",
  title: "Antes de decidir, tire suas dúvidas.",
  // TODO: revisar respostas conforme regras reais do produto
  items: [
    {
      q: "Serve para quem está começando?",
      a: "Sim. O método parte dos fundamentos e avança até o projeto de alto padrão, no seu ritmo.",
    },
    {
      q: "Quanto tempo preciso dedicar?",
      a: "As aulas são curtas e práticas, organizadas por sistema. Você assiste no seu ritmo e aplica direto nos seus projetos.",
    },
    {
      q: "Preciso saber Revit antes?",
      a: "Não. Há um módulo dedicado a Revit e Enscape, do básico à apresentação final.", // TODO: confirmar
    },
    {
      q: "Por quanto tempo tenho acesso?",
      a: "TODO: definir prazo de acesso (ex: 12 meses / vitalício).", // TODO
    },
    {
      q: "Tem suporte para dúvidas?",
      a: "Sim — comunidade, aulas comunitárias e análise de projeto pelo Leonardo.",
    },
    {
      q: "E se não for para mim?",
      a: "Você tem 7 dias de garantia incondicional. Não gostou, devolvemos 100%.",
    },
  ],
};

/* ---------- CTA FINAL ---------- */
export const finalCta = {
  eyebrow: "Fale com um especialista",
  title: "Pronto para sair da guerra de preço?",
  subtitle:
    "Tire suas dúvidas com nosso time e garanta sua vaga no MEDH-P.",
  cta: "Falar no WhatsApp",
};

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
    { label: "Investimento", href: "#roi" },
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
  image: "/assets/imagens-lp/leonardo-obra.png",
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

/* ---------- DEMONSTRAÇÃO (por dentro do MEDH-P) ---------- */
export const demo = {
  eyebrow: "Por dentro do MEDH-P",
  title: "Você não está comprando promessas. Está entrando num ambiente de trabalho completo.",
  subtitle:
    "Área de membros, módulos do zero ao projeto completo e materiais prontos para usar nos seus próprios projetos — a partir do primeiro dia.",
  // TODO: substituir image por screenshots REAIS de cada aba.
  tabs: [
    {
      key: "membros",
      label: "Área de membros",
      caption: "Plataforma com tudo organizado em um só lugar — assista no seu ritmo, do PC ou do celular.",
      image: "/assets/imagens-lp/area-de-membros.png",
    },
    {
      key: "modulos",
      label: "Módulos",
      caption: "7 módulos do briefing à entrega: esgoto, pluvial, hidráulica de água fria e quente e documentação.",
      image: "/assets/imagens-lp/MODULOS-MEDH-P.png",
    },
    {
      key: "materiais",
      label: "Materiais",
      caption: "Planilhas de dimensionamento, templates de Revit, cadernos técnicos e checklists prontos para usar.",
      image: "/assets/imagens-lp/MATERIAS-MEDH-P.png",
    },
  ],
  // Indicativo da família de cursos MEDH (P = atual, G e R = próximos)
  // TODO: revisar nomes/descrições e status (disponível x em breve) de cada curso.
  trilha: {
    eyebrow: "A trilha completa",
    title: "Depois do projeto, a evolução continua.",
    subtitle: "O MEDH-P é o ponto de partida. A metodologia se desdobra em três frentes — e você pode levar tudo no pacote completo.",
    ctaLabel: "Garantir o pacote completo",
    ctaHref: "#oferta",
    courses: [
      {
        code: "MEDH-P",
        name: "Foco em Projetos",
        desc: "Domine o projeto hidrossanitário de alto padrão, do briefing à entrega.",
        image: "/assets/imagens-lp/MEDH-P.png",
        current: true,
      },
      {
        code: "MEDH-G",
        name: "Foco na Gestão",
        desc: "Pense como empresário: financeiro, precificação, vendas, marketing e gestão de equipe.",
        image: "/assets/imagens-lp/MEDH-G.png",
        current: false,
      },
      {
        code: "MEDH-R",
        name: "Foco no Revit",
        desc: "Modelagem BIM avançada e produtividade no Revit para projetos premium.",
        image: "/assets/imagens-lp/MEDH-R.png",
        current: false,
      },
    ],
  },
};

/* ---------- CURRÍCULO (ementa completa) ---------- */
export const curriculum = {
  eyebrow: "Ementa completa",
  title: "7 módulos. Da base ao projeto de alto padrão.",
  subtitle: "169+ conteúdos práticos em vídeo, do zero ao projeto completo com detalhamento profissional.",
  hours: 60, // TODO: validar carga horária real com o Leonardo
  impact: "passos para você dominar o projeto hidrossanitário de alto padrão.",
  modules: [
    {
      title: "Seja Bem Vindo",
      lessons: "Boas-vindas e orientações iniciais",
      count: 1,
      aulas: ["Aula 1: Comece por aqui."],
    },
    {
      title: "Treinando seu Olho de Águia",
      lessons: "Desenvolvendo o olhar técnico do projetista",
      count: 14,
      aulas: [
        "Aula 1: Treinando seu olho de águia.",
        "Aula 2: Treinando seu olho de águia.",
        "Aula 3: Treinando seu olho de águia.",
        "Aula 4: Treinando seu olho de águia.",
        "Aula 5: Treinando seu olho de águia.",
        "Aula 6: Treinando seu olho de águia.",
        "Aula 7: Treinando seu olho de águia.",
        "Aula 8: Treinando seu olho de águia.",
        "Aula 9: Treinando seu olho de águia.",
        "Aula 10: Treinando seu olho de águia.",
        "Aula 11: Treinando seu olho de águia.",
        "Aula 12: Treinando seu olho de águia.",
        "Aula 13: Treinando seu olho de águia.",
        "Aula 14: Aula de Atividades.",
      ],
    },
    {
      title: "Iniciando seu Projeto",
      lessons: "Briefing e análise de arquitetura",
      count: 9,
      aulas: [
        "Aula 1: Introdução.",
        "Aula 2: Briefing parte 1.",
        "Aula 3: Briefing parte 2.",
        "Aula 4: Briefing parte 3.",
        "Aula 5: Análise de Arquitetura e Precomp Parte 1.",
        "Aula 6: Análise de Arquitetura e Precomp Parte 2.",
        "Aula 7: Análise de Arquitetura e Precomp Parte 3.",
        "Aula 8: Análise de Arquitetura e Precomp Parte 4.",
        "Aula 9: Análise de Arquitetura e Precomp Parte 5.",
      ],
    },
    {
      title: "Projeto Sanitário de Esgoto",
      lessons: "Esgoto, ventilação, tratamento e aulas bônus",
      count: 66,
      aulas: [
        "Aula 1: Introdução.",
        "Aula 2: Materiais.",
        "Aula 3: Zona de Sobrepressão (parte 1).",
        "Aula 3: Zona de Sobrepressão (parte 2).",
        "Aula 4: Confusão da Caixa de Espuma.",
        "Aula 5: Tabelas da Norma.",
        "Aula 6: Esgoto Primário x Esgoto Secundário.",
        "Aula 7: Ventilação.",
        "Aula 8: Ventilação Seca x Ventilação Molhada.",
        "Aula 9: Ventilação com VAA (parte 1).",
        "Aula 9: Ventilação com VAA (parte 2).",
        "Aula 10: Tipos de Sifão.",
        "Aula 11: Tipos de Ralos.",
        "Aula 12: Clean Outs x Caixas de Inspeção (parte 1).",
        "Aula 12: Clean Outs x Caixas de Inspeção (parte 2).",
        "Aula 12: Clean Outs x Caixas de Inspeção (parte 3).",
        "Aula 12: Clean Outs x Caixas de Inspeção (parte 4).",
        "Aula 13: O que Causa Entupimento.",
        "Aula 14: Esgoto de Banheiro (parte 1).",
        "Aula 14: Esgoto de Banheiro (parte 2).",
        "Aula 14: Esgoto de Banheiro (parte 3).",
        "Aula 15: Esgoto de Banheiro com Banheira (parte 1).",
        "Aula 15: Esgoto de Banheiro com Banheira (parte 2).",
        "Aula 15: Esgoto de Banheiro com Banheira (parte 3).",
        "Aula 16: Esgoto de Banheiro com Mictório (parte 1).",
        "Aula 16: Esgoto de Banheiro com Mictório (parte 2).",
        "Aula 17: Esgoto de Banheiro com Bidê (parte 1).",
        "Aula 17: Esgoto de Banheiro com Bidê (parte 2).",
        "Aula 18: Banheiro com Bacia Suspensa (parte 1).",
        "Aula 18: Banheiro com Bacia Suspensa (parte 2).",
        "Aula 18: Banheiro com Bacia Suspensa (parte 3).",
        "Aula 18: Banheiro com Bacia Suspensa (parte 4).",
        "Aula 18: Banheiro com Bacia Suspensa (parte 5).",
        "Aula 19: Esgoto de Cozinha.",
        "Aula 20: Esgoto de Cozinha Cuba Simples.",
        "Aula 21: Esgoto de Cozinha com Calha Úmida.",
        "Aula 22: Esgoto de Cozinha com Máquina de Lavar Louças (parte 1).",
        "Aula 22: Esgoto de Cozinha com Máquina de Lavar Louças (parte 2).",
        "Aula 23: Esgoto de Cozinha com Cuba Dupla.",
        "Aula 24: Esgoto de Cozinha com Triturador de Resíduos.",
        "Aula 25: Esgoto de Cozinha com Triturador de Resíduos e Máquina de Lavar Louças.",
        "Aula 26: Caixa de Gordura.",
        "Aula 27: Esgoto de Cozinha em Ilha (parte 1).",
        "Aula 27: Esgoto de Cozinha em Ilha (parte 2).",
        "Aula 28: Esgoto de Cozinha com Chopeira.",
        "Aula 29: Esgoto de Cozinha na Prática (parte 1).",
        "Aula 29: Esgoto de Cozinha na Prática (parte 2).",
        "Aula 30: Esgoto de Lavanderia Uma Máquina e Um Tanque.",
        "Aula 31: Esgoto de Lavanderia Uma Máquina e Dois Tanques.",
        "Aula 32: Esgoto de Lavanderia Duas Máquinas e Dois Tanques.",
        "Aula 33: Esgoto de Lavanderia com Duas Máquinas Sobrepostas.",
        "Aula 34: Esgoto de Lavanderia Exemplo com Ralo de Piso.",
        "Aula 35: Como Dimensionar Barrilete de Ventilações.",
        "Aula 36: Como Dimensionar Caixa Sifonada.",
        "Aula 37: Válvula de Retenção de Esgoto.",
        "Aula 38: Peças e Conexões na Prática - Parte 1.",
        "Aula 38: Peças e Conexões na Prática - Parte 2.",
        "Aula 38: Peças e Conexões na Prática - Parte 3.",
        "Aula 38: Peças e Conexões na Prática - Parte 4.",
        "Aula 38: Peças e Conexões na Prática - Parte 5.",
        "Aula 39: Testes do Sifão Expert.",
        "Aula Bônus: Sistema de Tratamento de Esgoto (parte 1).",
        "Aula Bônus: Sistema de Tratamento de Esgoto (parte 2).",
        "Aula Bônus: Sistema de Tratamento de Esgoto (parte 3).",
        "Aula Bônus: Sistema de Tratamento de Esgoto (parte 4).",
        "Aula Bônus: Sistema de Elevação de Esgoto.",
      ],
    },
    {
      title: "Projeto Sanitário Pluvial",
      lessons: "Águas pluviais, dimensionamento e reuso",
      count: 18,
      aulas: [
        "Aula 1: Introdução.",
        "Aula 2: Intensidade Pluviométrica.",
        "Aula 3: Coeficiente de Runoff.",
        "Aula 4: Tempo de Concentração.",
        "Aula 5: Tempo de Retorno - Parte 1.",
        "Aula 6: Tempo de Retorno - Parte 2.",
        "Aula 7: Área de Contribuição - Parte 1.",
        "Aula 8: Área de Contribuição - Parte 2.",
        "Aula 9: Dimensionamento de Calhas.",
        "Aula 10: Dimensionamento de Condutor Vertical.",
        "Aula 11: Dimensionamento de Condutor Horizontal.",
        "Aula 12: Materiais e Elementos de Projeto - Parte 1.",
        "Aula 13: Materiais e Elementos de Projeto - Parte 2.",
        "Aula 14: Exemplo de Dimensionamento Pluvial.",
        "Aula 15: Sistema de Reuso - Parte 1.",
        "Aula 16: Sistema de Reuso - Parte 2.",
        "Aula 17: Sistema de Reuso - Parte 3.",
        "Aula 18: Drenos de Ar Condicionado.",
      ],
    },
    {
      title: "Projeto Hidráulico",
      lessons: "Água fria, quente, solar e pressurização",
      count: 48,
      aulas: [
        "Aula 1: Introdução.",
        "Aula 2: Materiais Hidráulicos.",
        "Aula 3: Pressão de Entrada da Casa.",
        "Aula 4: Manifold de Entrada.",
        "Aula 5: Curvas e Joelhos.",
        "Aula 6: Ar e Golpe de Aríete.",
        "Aula 7: Cavitação.",
        "Aula 8: Espaço para a Sala Técnica.",
        "Aula 9: Reservatório de Água Fria.",
        "Aula 10: Ligação de Dois ou Mais Reservatórios.",
        "Aula 11: Dimensionamento Parte 1.",
        "Aula 12: Dimensionamento Parte 2.",
        "Aula 13: Dimensionamento Parte 3.",
        "Aula 14: Pressurização Parte 1.",
        "Aula 15: Pressurização Parte 2.",
        "Aula 16: Como Escolher o Pressurizador.",
        "Aula 17: Rede de Água Quente Introdução.",
        "Aula 18: Pressurização Pré Boiler.",
        "Aula 19: Itens de Segurança do Boiler de Alta Pressão Parte 1.",
        "Aula 19: Itens de Segurança do Boiler de Alta Pressão Parte 2.",
        "Aula 20: Pressurização Pós-Boiler.",
        "Aula 21: Boiler Parte 1.",
        "Aula 22: Boiler Parte 2.",
        "Aula 23: Placas Solares Introdução.",
        "Aula 24: Fração Solar.",
        "Aula 25: Sombreamento e Associação de Coletores.",
        "Aula 26: Circulação entre Boiler e Placas.",
        "Aula 27: Circulação Forçada x Termossifão.",
        "Aula 27.2: Exemplo de Dimensionamento de Bomba Para Circulação entre Boiler e Placas.",
        "Aula 28: Aquecimento Auxiliar.",
        "Aula 28: Aquecimento Auxiliar (parte 2).",
        "Aula 28.2: Exemplo de Dimensionamento do Sistema de Apoio a Gás.",
        "Aula 29: Válvula Misturadora Termostática.",
        "Aula 30: Válvula Desviadora Termostática.",
        "Aula 31: Recirculação de Água Quente.",
        "Aula 32: Autoflow.",
        "Aula 32.2: Exemplo de Dimensionamento do Sistema Recirculação de Água Quente.",
        "Aula 33: Isolamento Térmico.",
        "Aula 34: Manifold.",
        "Aula 35: Automação e Controle.",
        "Aula 36: Conexões.",
        "Aula 37: Anel de Equalização.",
        "Aula 38: Dimensionamento com AQ Introdução.",
        "Aula 39: Dimensionamento com AQ Parte 2.",
        "Aula 40: Dimensionamento com AQ Parte 3.",
        "Aula 41: Dimensionamento com AQ Parte 4.",
        "Aula 42: Hidráulica do Sistema de Reuso.",
        "Aula 43: Traçado Geral de Projeto Hidráulico.",
      ],
    },
    {
      title: "Documentação",
      lessons: "Tabelas, cadernos técnicos e geração de mídia",
      count: 13,
      aulas: [
        "Aula 1: Introdução.",
        "Aula 2: Tabela com Imagens.",
        "Aula 3: Tabela por Ambiente e exportação para Excel.",
        "Aula 4: Acesso ao Modelo 3D em RV e RA no Augin.",
        "Aula 5: Caderno de Recomendações Técnicas.",
        "Aula 6: Caderno de Uso e Manutenções.",
        "Aula 7: Geração de Mídia com Enscape (parte 1).",
        "Aula 8: Geração de Mídia com Enscape (parte 2).",
        "Aula 9: Geração de Mídia com Enscape (parte 3).",
        "Aula 10: Geração de Mídia com o Enscape (parte 4).",
        "Aula 11: Texturas para Renderização.",
        "Aula 12: Geração de Mídia com Enscape (parte 5).",
        "Aula 13: Criação Detalhes Construtivos.",
      ],
    },
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
  // Prints de WhatsApp reais (pasta /public/assets/provas-sociais).
  // type "whatsapp" => print de conversa | type "video" => depoimento em vídeo
  // Ordem curada p/ o mosaico: V1 → 6 prints → V2 → 2 prints.
  // Com grid-auto-flow:dense os dois vídeos caem em cantos opostos (pontos focais).
  items: [
    { type: "video", thumb: "/assets/provas-sociais/depoimento-1.jpg", videoSrc: "/assets/provas-sociais/depoimento-1.mp4", name: "Depoimento em vídeo", orientation: "vertical" },
    { type: "whatsapp", image: "/assets/provas-sociais/7.jpg", alt: "Depoimento de aluno no WhatsApp" },
    { type: "whatsapp", image: "/assets/provas-sociais/1.png", alt: "Depoimento de aluno no WhatsApp" },
    { type: "whatsapp", image: "/assets/provas-sociais/4.png", alt: "Depoimento de aluno no WhatsApp" },
    { type: "whatsapp", image: "/assets/provas-sociais/2.png", alt: "Depoimento de aluno no WhatsApp" },
    { type: "whatsapp", image: "/assets/provas-sociais/8.jpg", alt: "Depoimento de aluno no WhatsApp" },
    { type: "whatsapp", image: "/assets/provas-sociais/3.png", alt: "Depoimento de aluno no WhatsApp" },
    { type: "video", thumb: "/assets/provas-sociais/depoimento-2.jpg", videoSrc: "/assets/provas-sociais/depoimento-2.mp4", name: "Depoimento em vídeo", orientation: "vertical" },
    { type: "whatsapp", image: "/assets/provas-sociais/6.png", alt: "Depoimento de aluno no WhatsApp" },
    { type: "whatsapp", image: "/assets/provas-sociais/5.png", alt: "Depoimento de aluno no WhatsApp" },
  ] as Testimonial[],
};

export type Testimonial =
  | { type: "whatsapp"; image: string; alt: string }
  | {
      type: "video";
      thumb: string;
      /** arquivo MP4 local em /public (ex: /assets/...) */
      videoSrc?: string;
      /** ou URL de embed externa (YouTube/Vimeo) */
      videoUrl?: string;
      name: string;
      orientation: "vertical" | "horizontal";
    };

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
    { value: "Top of Mind", label: "prêmio de reconhecimento", code: "n.01" },
    { value: "798", label: "posts técnicos publicados", code: "n.02" },
    { value: "7+", label: "anos à frente da Aurora", code: "n.03" },
  ],
  image: "/assets/imagens-lp/leonardo-obra.png",
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
    { title: "Análise de projeto pelo Leonardo", description: "Feedback direto no seu projeto, ponto a ponto.", image: "/assets/imagens-lp/bonus-analise.png", value: 1500, overlay: { title: "Análise de Projetos pelo Leonardo", subtitle: "Seu projeto avaliado por um especialista em alto padrão." } },
    { title: "Roteiro premium de reunião", description: "Conduza reuniões que fecham contratos.", image: "/assets/imagens-lp/bonus-roteiro.png", value: 800, overlay: { title: "Roteiro Premium de Reunião", subtitle: "O método para conduzir reuniões que fecham projetos." } },
    { title: "Comunidade", description: "Rede de engenheiros aplicando o método.", image: "/assets/imagens-lp/bonus-comunidade.png", value: 1200 },
    { title: "Aulas comunitárias", description: "Encontros ao vivo recorrentes.", image: "/assets/imagens-lp/bonus-aulas.png", value: 2000 },
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
      a: "Você tem 12 meses de acesso completo ao conteúdo e às atualizações do período.",
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

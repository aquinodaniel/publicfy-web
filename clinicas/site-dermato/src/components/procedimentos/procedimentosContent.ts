export type Categoria = {
  id: string;
  nome: string;
  itens: string[];
};

/**
 * Os 17 procedimentos do site original, agrupados em Facial / Corporal / Capilar.
 *
 * NOTA: vários procedimentos servem mais de uma área (ex. Sculptra, Radiesse,
 * Microagulhamento). Esta divisão é uma sugestão de organização — a Dra. deve
 * revisar/ajustar os grupos conforme a prática clínica.
 */
export const CATEGORIAS: Categoria[] = [
  {
    id: 'facial',
    nome: 'Facial',
    itens: [
      'Toxina Botulínica (Botox)',
      'Ácido Hialurônico',
      'Sculptra',
      'Skinbooster',
      'Radiesse',
      'Harmonyca',
      'Profhilo',
      'Enzimas',
      'Exossomos',
    ],
  },
  {
    id: 'bioestimulacao',
    nome: 'Bioestimulação & Regeneração',
    itens: ['PDRN', 'Microagulhamento', 'Peeling', 'Radiofrequência', 'Ultrassom Micro e Macrofocado', 'Lavieen'],
  },
  {
    id: 'capilar',
    nome: 'Capilar',
    itens: ['MMP Capilar', 'Infiltração Capilar'],
  },
];

/** Lista única dos 17 procedimentos, na ordem do site original. */
export const PROCEDIMENTOS: string[] = [
  'Toxina Botulínica (Botox)',
  'Sculptra',
  'Ácido Hialurônico',
  'Skinbooster',
  'Radiesse',
  'Exossomos',
  'PDRN',
  'HarmonyCa',
  'Enzimas',
  'Microagulhamento',
  'Peeling',
  'Profhilo',
  'Radiofrequência',
  'MMP Capilar',
  'Infiltração Capilar',
  'Ultrassom Micro e Macrofocado',
  'Lavieen',
];

/** Frase de apoio (do site original). */
export const PROC_LEAD =
  'Protocolos exclusivos e personalizados, com os mais modernos tratamentos faciais, corporais e capilares.';

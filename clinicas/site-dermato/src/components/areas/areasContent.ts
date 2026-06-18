import type { StaticImageData } from 'next/image';
import clinica from '@/assets/images/areas/clinica.webp';
import tricologia from '@/assets/images/areas/tricologia.jpg';
import estetica from '@/assets/images/areas/estetica.jpg';
import cirurgia from '@/assets/images/areas/cirurgia.jpg';

export type Area = {
  id: string;
  title: string;
  /** Frase curta — exibida sempre no mobile. */
  summary: string;
  /** Texto completo — revelado no hover (desktop). */
  body: string;
  image: StaticImageData;
};

export const AREAS: Area[] = [
  {
    id: 'clinica',
    title: 'Clínica Dermatológica',
    summary: 'Diagnóstico e tratamento das doenças da pele, cabelo e unhas.',
    body: 'O cuidado médico com a saúde da pele. Trato condições como acne, melasma, rosácea, manchas, alergias, micoses e psoríase — com diagnóstico preciso e protocolos pensados para cada paciente.',
    image: clinica,
  },
  {
    id: 'tricologia',
    title: 'Tricologia',
    summary: 'A saúde dos fios e do couro cabeludo, com diagnóstico preciso.',
    body: 'Os cabelos também merecem cuidado médico. A Tricologia estuda e trata a saúde dos fios e do couro cabeludo, identificando as causas da queda e do enfraquecimento. Ofereço protocolos modernos como MMP e infiltração capilar, sempre com acompanhamento contínuo.',
    image: tricologia,
  },
  {
    id: 'estetica',
    title: 'Estética Médica',
    summary: 'Procedimentos que harmonizam, hidratam e restauram com naturalidade.',
    body: 'A beleza que respeita quem você é. Unindo técnica e sensibilidade, realizo procedimentos para harmonizar, hidratar e restaurar a pele — com resultados naturais que valorizam os seus traços, nunca os transformam.',
    image: estetica,
  },
  {
    id: 'cirurgia',
    title: 'Cirurgia Dermatológica',
    summary: 'Remoção segura de pintas, cistos e pequenas lesões de pele.',
    body: 'Pequenos procedimentos, todo o cuidado. Realizo a remoção de pintas, cistos e pequenas lesões de pele em ambiente seguro, com técnica precisa e atenção ao resultado estético da cicatrização.',
    image: cirurgia,
  },
];

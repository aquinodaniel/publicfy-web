export type Cidade = {
  id: string;
  nome: string;
  /** Unidade federativa — usada como etiqueta no card. */
  uf: string;
  endereco: string;
  /** Link do WhatsApp da unidade. */
  whatsapp: string;
  /** URL de embed do Google Maps. */
  mapa: string;
  /** Link para abrir o endereço no Google Maps. */
  mapsLink: string;
};

const msg = encodeURIComponent('Olá, gostaria de agendar uma consulta.');
const maps = (q: string) => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`;

/** As 3 unidades de atendimento — dados iguais aos do site original. */
export const CIDADES: Cidade[] = [
  {
    id: 'jales',
    nome: 'Jales',
    uf: 'SP',
    endereco: 'Rua Amalias, Condomínio 21 – Res. Alpha Jales – Jales/SP',
    whatsapp: `https://wa.me/5517996556674?text=${msg}`,
    mapa: 'https://maps.google.com/maps?q=Rua%20Amalias%2C%20Condom%C3%ADnio%2021%20%E2%80%93%20Res.%20Alpha%20Jales%20%E2%80%93%20Jales%2FSP&t=m&z=16&output=embed&iwloc=near',
    mapsLink: maps('Rua Amalias, Condomínio 21 – Res. Alpha Jales – Jales/SP'),
  },
  {
    id: 'rio-preto',
    nome: 'São José do Rio Preto',
    uf: 'SP',
    endereco: 'Av. Anísio Haddad, 8001 – Torre Zurich, 5º andar, sala 508 – Jd. Aclimação – CEP 15091-751',
    whatsapp: `https://wa.me/5517997048418?text=${msg}`,
    mapa: 'https://maps.google.com/maps?q=Av.%20An%C3%ADsio%20Haddad%2C%208001%20%E2%80%93%20Torre%20Zurich%2C%205%C2%BA%20andar%2C%20sala%20508%20%E2%80%93%20Jd.%20Aclima%C3%A7%C3%A3o%20%E2%80%93%20CEP%2015091-751&t=m&z=16&output=embed&iwloc=near',
    mapsLink: maps('Av. Anísio Haddad, 8001 – Jd. Aclimação – São José do Rio Preto'),
  },
  {
    id: 'orindiuva',
    nome: 'Orindiúva',
    uf: 'SP',
    endereco: 'Rua Alcides Alves Ferreira, 539 – Centro – CEP 15.480-021',
    whatsapp: `https://wa.me/5517996360244?text=${msg}`,
    mapa: 'https://maps.google.com/maps?q=Rua%20Alcides%20Alves%20Ferreira%20-%20Centro&t=m&z=16&output=embed&iwloc=near',
    mapsLink: maps('Rua Alcides Alves Ferreira, 539 – Centro – Orindiúva'),
  },
];

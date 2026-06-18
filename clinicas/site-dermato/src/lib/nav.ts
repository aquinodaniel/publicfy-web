export type NavItem = {
  label: string;
  href: string;
};

export const NAV_ITEMS: NavItem[] = [
  { label: 'Quem sou', href: '#quem-sou' },
  { label: 'Áreas de atuação', href: '#areas' },
  { label: 'Procedimentos', href: '#procedimentos' },
  { label: 'Onde atendo', href: '#onde-atendo' },
];

// WhatsApp principal (unidade Jales) — usado no CTA "Agendar".
export const WHATSAPP_HREF =
  'https://wa.me/5517996556674?text=' +
  encodeURIComponent('Olá, gostaria de agendar uma consulta.');

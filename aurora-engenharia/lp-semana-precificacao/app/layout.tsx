import type { Metadata, Viewport } from 'next';
import { Poppins, JetBrains_Mono } from 'next/font/google';
import './globals.css';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  variable: '--font-poppins',
  display: 'swap'
});

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-jetbrains',
  display: 'swap'
});

export const metadata: Metadata = {
  title: 'Semana da Precificação · Aurora Engenharia',
  description:
    'Imersão ao vivo de 3 noites para engenheiros: do custo real do seu escritório à proposta que faz o cliente ver valor antes do preço. Pare de entregar alto padrão por preço de commodity.',
  openGraph: {
    title: 'Semana da Precificação · Aurora Engenharia',
    description:
      'Você já sabe fazer o projeto. Agora aprenda a cobrar o que ele vale. 3 noites ao vivo com o Eng. Leonardo Marques.',
    type: 'website'
  },
  robots: { index: true, follow: true }
};

export const viewport: Viewport = {
  themeColor: '#00657B',
  width: 'device-width',
  initialScale: 1
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${poppins.variable} ${jetbrains.variable}`}>
      <body>{children}</body>
    </html>
  );
}

import type { Metadata } from "next";
import { Poppins, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-poppins",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  title: "MEDH-P — Projetos hidrossanitários de alto padrão | Aurora Engenharia",
  description:
    "A metodologia que tira o engenheiro da guerra de preço e o posiciona como especialista em projetos hidrossanitários de alto padrão.",
  openGraph: {
    title: "MEDH-P — Aurora Engenharia",
    description:
      "Domine projetos hidrossanitários completos, entregue no padrão premium e cobre honorários à altura.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" className={`${poppins.variable} ${jetbrains.variable}`}>
      <body className="antialiased">{children}</body>
    </html>
  );
}

# Design System — Aurora Engenharia / Curso MEDH-P

> Extraído da landing page atual: https://lp.auroraengenharia.com/medhp/
> Stack original: React + Vite + Tailwind + shadcn/ui (gerado no Lovable).
> Tema **dark** (navy escuro) com accent **teal**. Tipografia Montserrat + Inter.

---

## 1. Marca

- **Nome:** Aurora Engenharia
- **Produto:** Curso **MEDH-P** (foco em **projetos hidrossanitários** de alto padrão)
- **Fundador / instrutor:** Leonardo ("Léo")
- **Linha de produtos relacionada:** MEDH-G (Gestão), MEDH-R (Revit)
- **Logo:** Não há arquivo de logo dedicado. A marca aparece como **texto** "Aurora Engenharia"
  em Montserrat (font-display). Há uma logomarca bordada na camisa navy do fundador
  (ver `assets/leonardo-obra-BGOLJCmQ.png`).
- **Contato / conversão:** WhatsApp `+55 64 99203-4462`
  - Link: `https://api.whatsapp.com/send?phone=5564992034462&text=Olá! Tenho interesse no MEDH-P`

---

## 2. Paleta de cores

Definidas como HSL em `:root` (formato shadcn). Tema **dark**, sem `.dark` class — é o default.

| Token                | HSL              | HEX aprox. | Uso |
|----------------------|------------------|-----------|-----|
| `--background`       | `228 25% 10%`    | `#131620` | Fundo geral (navy quase preto) |
| `--foreground`       | `210 20% 90%`    | `#e0e5eb` | Texto principal |
| `--card`             | `228 22% 14%`    | `#1c1f2c` | Cards, painéis |
| `--card-foreground`  | `210 20% 90%`    | `#e0e5eb` | Texto em cards |
| `--popover`          | `228 22% 14%`    | `#1c1f2c` | Popovers, dropdowns |
| `--primary`          | `170 55% 45%`    | `#34b29d` | **Teal** — CTAs, destaques, links |
| `--primary-foreground`| `0 0% 100%`     | `#ffffff` | Texto sobre teal |
| `--secondary`        | `228 20% 16%`    | `#212431` | Botões/superfícies secundárias |
| `--muted`            | `228 18% 18%`    | `#262936` | Fundos sutis |
| `--muted-foreground` | `215 15% 55%`    | `#7b899d` | Texto secundário/legendas |
| `--accent`           | `170 55% 45%`    | `#34b29d` | = primary (teal) |
| `--destructive`      | `0 84.2% 60.2%`  | `#ef4444` | Erros / "dor" (números em vermelho) |
| `--border` / `--input`| `228 18% 20%`   | `#2a2d3c` | Bordas e inputs |
| `--ring`             | `170 55% 45%`    | `#34b29d` | Foco (teal) |

**Cores utilitárias usadas pontualmente:** `green-600 #16a34a` (sucesso/checks),
`yellow-500 #eab308` (estrelas de avaliação), `white`.

**Glow do teal** (usado em botões/foto): `#34b29d` com sombras
`0 0 20px #34b29d66` → `0 0 40px #34b29d99` (ver animação `pulse-glow`).

---

## 3. Tipografia

| Papel | Fonte | Tailwind |
|-------|-------|----------|
| Display / títulos | **Montserrat**, sans-serif | `font-display` |
| Corpo / UI | **Inter**, sans-serif | default (`body`) |
| Mono | ui-monospace, SFMono… | `font-mono` |

**Pesos usados:** 400, 500, 600, 700, 900 (`font-black` nos títulos hero/preço).

**Escala observada:**
- H1 hero: `text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-black leading-tight`
- Títulos de seção: `text-2xl md:text-4xl font-bold` (`font-display`)
- Preço destaque: `text-4xl sm:text-5xl md:text-6xl font-black text-primary`
- Eyebrow/kicker: `text-xs md:text-sm uppercase tracking-widest text-primary font-semibold`
- Corpo: `text-base md:text-xl text-muted-foreground`
- Tracking: `tracking-tight` (títulos), `tracking-widest` (kickers)

---

## 4. Tokens de layout

- **Raio:** `--radius: 0.75rem` → `rounded-lg`. Também usa `rounded-xl`, `rounded-2xl`,
  `rounded-3xl`, `rounded-full` (botões/pílulas).
- **Container:** `width:100%`, padding lateral `2rem`, `max-width: 1400px` (≥1400px).
- **Larguras de conteúdo:** `max-w-3xl` / `max-w-5xl` / `max-w-7xl` centralizadas.
- **Grid hero:** `grid lg:grid-cols-2 gap-8 lg:gap-12 items-center`.
- **Sombras:** `shadow-lg`, `shadow-xl`, `shadow-2xl`, mais
  `hover:shadow-2xl hover:shadow-primary/20` (glow teal no hover de cards/oferta).

---

## 5. Componentes-chave

**Botão primário (CTA):** `bg-primary text-primary-foreground` (teal + branco),
`rounded-xl`/`rounded-full`, alturas `h-11`/`h-14`, `font-bold`,
hover com scale + glow. CTA principal usa `animate-pulse-glow`.
- Textos de CTA: **"Conheça o método"**, **"GARANTIR MINHA VAGA AGORA"**, **"Fale com um especialista"**.

**Card:** `bg-card border border-border rounded-2xl`, hover `border-primary/40` +
`hover:scale-[1.02]` + sombra teal.

**Card de oferta (destaque):** `border-2 border-primary bg-card` com header
`bg-primary text-primary-foreground`.

**Imagens:** `object-cover` + `hover:scale-105 transition-transform duration-700`,
molduras `rounded-xl/2xl border border-border`.

**Componentes shadcn presentes:** Accordion (currículo), Dialog (form de inscrição),
Carousel/embla (depoimentos), Tabs, Navigation Menu, Toast (sonner), Tooltip, Select.

---

## 6. Animações (keyframes custom)

| Classe | Efeito |
|--------|--------|
| `animate-fade-up` | entra de baixo + fade (`fade-up .7s ease-out`) — usado em sequência com `animationDelay` |
| `animate-fade-in-scale` | fade + scale de .9→1 (`.6s ease-out`) |
| `animate-float` | flutua ±10px (`3s infinite`) |
| `animate-pulse-glow` | glow teal pulsante nos CTAs |
| `animate-slide-in-left` / `-right` | entrada lateral ±60px |
| `animate-bounce` | seta/ícone do CTA |
| `scroll-behavior: smooth` | navegação por âncoras |

Padrão de revelação: blocos entram com `fade-up` escalonado (`animationDelay: 0.1s, 0.2s…`).

---

## 7. Estrutura da página (seções, em ordem)

1. **Hero** — kicker "Aurora Engenharia, MEDH-P" · H1
   _"De ~~R$2 Mil~~ por projetos para mais de **R$30 Mil**"_ · foto do Leonardo em obra ·
   CTA "Conheça o método".
2. **Depoimentos** (carousel) — "Veja o que nossos alunos estão dizendo".
3. **Seção da dor / dinheiro** — "Quanto dinheiro você está **deixando na mesa?**" ·
   tabela comparativa _Inseguro, subvalorizado_ × _Especialista valorizado_ ·
   "R$15.000 a R$30.000" por projeto · "R$240 mil por ano!".
4. **História do fundador** — "Da Frustração a referência em **projetos hidrossanitários**" ·
   relato do Leonardo (cobrava R$2.500, desenvolveu método).
5. **Currículo** — "Tudo que você vai aprender no **MEDH-P**" · accordion de **7 módulos**,
   **150+ aulas práticas em vídeo** (dimensionamento, esgoto, pluvial, pressurização,
   água quente/boiler, reuso, placas solares, peças e conexões, Revit/Enscape).
6. **Bônus** — "Tudo que você precisa para **começar hoje**" · cards:
   Análise de Projeto pelo Leonardo, Roteiro Premium de Reunião, Comunidade, Aulas Comunitárias.
7. **"Vai muito além das aulas"** — materiais prontos (templates, cadernos técnicos, atas).
8. **Oferta / preço** — "Invista na sua **transformação profissional**" ·
   **12x de R$206,54** ou **R$1.997,00 à vista** · "Acesso completo aos 7 módulos + aulas comunitárias".
9. **Garantia** — "Garantia Incondicional de **7 Dias**" · reembolso de 100% do investimento.
10. **Contato / conversão** — "Fale com um especialista" · WhatsApp + form
    "Preencha seus dados para garantir sua vaga no MEDH-P".

---

## 8. Assets baixados (`design-system/assets/`)

| Arquivo | Dimensões | Conteúdo |
|---------|-----------|----------|
| `leonardo-obra-BGOLJCmQ.png` | 1080×1080 | **Foto herói** — Leonardo em obra, camisa navy Aurora, capacete |
| `leonardo-certificado-C8ueoR_4.png` | 1080×1350 | Leonardo com certificado |
| `bonus-analise-8tOnf-ay.png` | 768×1376 | Bônus: Análise de Projeto |
| `bonus-roteiro-B9qLJbr-.png` | 768×1376 | Bônus: Roteiro Premium de Reunião |
| `bonus-comunidade-BkOkXhj1.png` | 768×1376 | Bônus: Comunidade |
| `bonus-aulas-comunitarias.png` | 768×1376 | Bônus: Aulas Comunitárias |
| `og-preview.png` | 1920×8837 | Screenshot da página inteira (⚠️ light-mode antigo — usar só p/ layout) |

**Vídeos:** a página **não** tem VSL nem players de vídeo embedados (sem YouTube/Vimeo/
Vturb/Panda). As 150+ aulas ficam na área de membros, fora da LP.

---

## 9. Tokens prontos pra reutilizar

Ver `design-system/tokens.css` (variáveis CSS no formato shadcn, prontas pra colar
num `index.css` com Tailwind).

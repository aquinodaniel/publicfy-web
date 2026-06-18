# Design System — Dra. Tatiani Sabadini

> **Fonte de extração:** https://lightyellow-gerbil-879486.hostingersite.com/
> **Data de extração:** 2026-05-28
> **Stack original:** WordPress + Elementor (`elementor-kit-13`)
> **Direção do novo site:** estética **magazine-style / luxo moderno**, referência **Aesop** (https://www.aesop.com/)

---

## 1. Identidade da Marca

| Campo | Valor |
|---|---|
| Nome profissional | **Dra. Tatiani Sabadini** |
| Especialidade exibida | `dermatologia` |
| Registro | `CRM: 198.372` |
| Tagline principal | **Beleza com Naturalidade** |
| Subtítulo | Dermatologia • Estética • Tricologia • Cirurgia Dermatológica |
| Promessa | *"Realce sua beleza de forma natural, segura e com resultados que valorizam quem você é."* |
| Tom de voz | Acolhedor, sofisticado, científico-sensível |

---

## 2. Paleta de Cores

### Cores globais (do Elementor Kit)

| Token | Hex | Uso original | Sugestão de uso |
|---|---|---|---|
| `--color-primary` | `#FFFFFF` | Branco base | Fundo principal, textos sobre escuro |
| `--color-secondary` | `#D9CFCC` | Bege rosado / nude | Backgrounds suaves, divisores, hover states |
| `--color-text` | `#4F0911` | **Bordô profundo** (cor de assinatura) | Tipografia primária, CTAs, headers |
| `--color-accent` | `#000000` | Preto puro | Acento forte, botões primários |

### Cores complementares (extraídas do CSS de seções)

| Token | Hex | Uso |
|---|---|---|
| `--color-blush` | `#FCF1EE` | Backgrounds rosados ultra-claros (seções "sobre", footer card) |
| `--color-wine` | `#963845` | Tom intermediário do bordô; usado em gradientes |
| `--color-ink` | `#020101` | Preto suavizado para texto longo |
| `--color-peach` | `#FFBC7D` | Cor da page-transition (Elementor); detalhe quente |

### Gradiente assinatura

```css
background-image: linear-gradient(45deg, #4F0911, #963845, #4F0911, #963845);
```

> Usado como elemento decorativo em divisores e botões hover.

### Sugestão de aplicação magazine/Aesop

- **Background principal:** `#FCF1EE` (blush warm) ou off-white quase puro `#FAF7F4` (sugerido novo)
- **Texto:** `#4F0911` (bordô) para títulos; `#020101` para corpo
- **CTA primário:** preto `#000000` com hover bordô
- **CTA secundário:** outline bordô sobre fundo blush
- **Acentos editoriais:** `#D9CFCC` para tags, datas, kickers

---

## 3. Tipografia

### Famílias

| Família | Estilo | Pesos disponíveis | Uso |
|---|---|---|---|
| **Cormorant** (Garamond) | Serif display | 400 normal, 400 italic, 500 (acento italic) | Títulos, h1–h3, citações |
| **Soin Sans Neue** | Sans-serif geométrica | 200 light, 400 roman, 700 bold, italic | Corpo, navegação, botões, labels |

### Escala tipográfica (Elementor globals)

| Token | Família | Tamanho base | Peso | Estilo |
|---|---|---|---|---|
| `typography-primary` | Cormorant | **33px** | 400 | normal |
| `typography-secondary` | Soin | **18px** | 600 | normal |
| `typography-text` | Soin | **16px** | 400 | normal |
| `typography-accent` | Cormorant | **25px** | 500 | **italic** |

### Tamanhos observados em uso (CSS extraído)

```
10px • 11px • 12px • 13px • 14px • 15px • 16px • 17px • 18px • 19px • 20px
29px • 35px • 38px • 40px • 42px • 51px • 54px • 60px • 61px • 66px • 67px • 87px
```

### Letter-spacing observados

```
-2.6px, -2.2px, -0.3px, 0px, 0.2px, 0.4px, 1.2px, 1.4px, 1.7px, 2.8px
```

> Padrões: títulos display usam tracking **negativo** (-2.2 a -2.6px) — efeito editorial.
> Microtexto / labels usam tracking **positivo** (1.2 a 2.8px) e CAPS.

### Mapeamento sugerido (magazine style)

| Elemento | Família | Tamanho desktop | Peso | Tracking |
|---|---|---|---|---|
| H1 (hero display) | Cormorant | 64–87px | 400 | -2.6px |
| H2 (seção) | Cormorant | 42–54px | 400 | -2.2px |
| H3 | Cormorant | 33px | 400 | -0.3px |
| Citação / kicker | Cormorant italic | 25px | 500 | 0.2px |
| Subtítulo | Soin | 18px | 600 | 1.2px CAPS |
| Body | Soin | 16px | 400 | 0px |
| Caption / meta | Soin | 12–13px | 400 | 1.7px CAPS |
| Botão | Soin | 13–15px | 600/700 | 1.4–2.8px CAPS |

### Arquivos de fonte (já baixados em `/assets/fonts/`)

```
CormorantGaramond-VariableFont_wght.ttf
CormorantGaramond-Italic-VariableFont_wght.ttf
SoinSansNeue-Roman.ttf      (weight 400)
SoinSansNeue-Light.ttf      (weight 200)
SoinSansNeue-Bold.ttf       (weight 700)
SoinSansNeue-Italic.ttf
```

---

## 4. Espaçamento e Layout

### Container

| Breakpoint | Largura máxima |
|---|---|
| Desktop (>1024px) | **1140px** |
| Tablet (<=1024px) | **1024px** |
| Mobile (<=767px) | **830px** |

### Widget spacing (Elementor)

```css
--kit-widget-spacing: 20px;
--widgets-spacing: 20px 20px;
```

### Escala WordPress (presets)

```
spacing-20: 0.44rem  (≈ 7px)
spacing-30: 0.67rem  (≈ 11px)
spacing-40: 1.00rem  (16px)
spacing-50: 1.50rem  (24px)
spacing-60: 2.25rem  (36px)
spacing-70: 3.38rem  (54px)
spacing-80: 5.06rem  (81px)
```

---

## 5. Componentes

### Botões

```css
.button-primary {
  background-color: #000000;       /* accent */
  color: #FFFFFF;
  font-family: 'Soin', sans-serif;
  font-size: 13–15px;
  font-weight: 600;
  letter-spacing: 1.4–2.8px;
  text-transform: uppercase;
  padding: calc(0.667em + 2px) calc(1.333em + 2px);
  border: 0;
  border-radius: 0px;              /* hard edges = vibe editorial */
}
.button-primary:hover {
  /* gradiente assinatura */
  background-image: linear-gradient(45deg, #4F0911, #963845, #4F0911, #963845);
}
```

### Border-radius

| Token | Valor | Uso |
|---|---|---|
| `--radius-none` | `0px` | Cards editoriais, headers (default) |
| `--radius-sm` | `5px` | Pequenos cards, badges |
| `--radius-md` | `8px` | Imagens, alguns containers |

### Sombras

```css
/* Sombra suave (cards sobre fundo escuro) */
--shadow-soft: 0px 0px 10px 0px rgba(255, 255, 255, 0.5);

/* WP presets */
--shadow-natural: 6px 6px 9px rgba(0, 0, 0, 0.2);
--shadow-deep:    12px 12px 50px rgba(0, 0, 0, 0.4);
--shadow-sharp:   6px 6px 0px rgba(0, 0, 0, 0.2);
```

> **Aesop-style:** sombras quase inexistentes. Preferir elevação por contraste de fundo, não por blur.

### Navegação / Menu

- Layout horizontal, links em **Soin** uppercase
- Hover: cor primária → secondary (bege)
- Itens: Quem eu sou • Áreas de Atuação • Procedimentos • Onde atendo
- CTA fixo à direita: **"Agendar agora"** → WhatsApp

### Ícones / redes sociais

- Cor de fundo transparente (`#02010100`)
- Hover: cor → `--color-secondary` (bege)
- Tamanho ícone: 20px

---

## 6. Estrutura de Páginas (homepage)

Identificadas **5 dobras principais** (nomeadas no CSS como `Dobra-01` … `Dobra-05`):

| # | Seção | Asset background | Conteúdo |
|---|---|---|---|
| 01 | **Hero** | `Dobra-01-Desktop-Compress.webp` / `Dobra-01-Mobile-Compress.webp` | Título "Beleza com _Naturalidade_" + CTA + foto da Dra. (modelo de perfil segurando flor) |
| 02 | **Sobre / Quem sou** | `Dobra-02-Desktop-Compress.webp` / `Dobra-02-Mobile-5-Compress.webp` | Bio com 4 parágrafos, foto institucional |
| 03 | **Áreas de atuação** | `Dobra-03-Desktop-Compress.webp` / `Dobra-03-Mobile-2-Compress.webp` | 4 cards: Clínica, Tricologia, Estética, Cirurgia |
| 04 | **Procedimentos** | `Dbra-04-Compress-2.webp` (composição com a Dra. + close-ups) | Grid de 17+ procedimentos |
| 05 | **Onde atendo** | `Dobra-05-Desktop-4.webp` / `Dobra-05-Mobile.webp` | 3 unidades (Jales, Rio Preto, Orindiúva) + mapa |

### Conteúdo literal das seções

#### HERO
- **Display:** "Beleza com _Naturalidade_"
- **Sub:** "Dermatologia • Estética • Tricologia • Cirurgia Dermatológica"
- **Lead:** *"Realce sua beleza de forma natural, segura e com resultados que **valorizam quem você é.**"*
- **Assinatura:** *"tatiani sabadini • beleza com naturalidade"*

#### SOBRE
> *"Prazer, meu nome é **Tatiani Sabadini**, sou médica apaixonada por transformar vidas através do cuidado com a pele, o corpo e a autoestima.*
>
> *Minha trajetória é marcada por **dedicação, estudo e amor pela dermatologia** — uma especialidade que vai muito além da estética: é sobre saúde, equilíbrio e confiança.*
>
> *Sou médica formada com **Pós-Graduação em Medicina Estética** e em **Dermatologia Clínica**, o que me permite cuidar dos meus pacientes de forma completa — da prevenção e tratamento de doenças de pele, cabelo e unhas até os procedimentos estéticos mais avançados.*
>
> *Acredito que **a verdadeira beleza é aquela que respeita a naturalidade**. Por isso, cada tratamento é planejado de forma individual, com o objetivo de valorizar o que cada pessoa tem de mais bonito."*

#### ÁREAS DE ATUAÇÃO (4 cards)

1. **Clínica Dermatológica** — acne, melasma, rosácea, manchas, alergias, micoses, psoríase
2. **Tricologia** — MMP e infiltração capilar, queda e enfraquecimento
3. **Estética Médica** — harmonizar, hidratar, restaurar
4. **Cirurgia Dermatológica** — remoção de pintas, cistos e pequenas lesões

#### PROCEDIMENTOS (lista de 17)

```
Toxina Botulínica (Botox) • Sculptra • Ácido Hialurônico • Skinbooster
Radiesse • Exossomos • PDRN • HarmonyCa • Enzimas • Microagulhamento
Peeling • Profhilo • Radiofrequência • MMP Capilar • Infiltração Capilar
Ultrassom Micro e Macrofocado • Lavieen
```
*"**Protocolos exclusivos** e **personalizados**, com os mais modernos tratamentos faciais, corporais e capilares."*

#### ONDE ATENDO

| Cidade | Endereço | WhatsApp |
|---|---|---|
| **Jales** | Rua Amalias, Cond. 21 – Res. Alpha Jales – Jales/SP | +55 17 99655-6674 |
| **São José do Rio Preto** | Av. Anísio Haddad, 8001 – Torre Zurich, 5º andar, sala 508 – Jd. Aclimação – CEP 15091-751 | +55 17 99704-8418 |
| **Orindiúva** | Rua Alcides Alves Ferreira, 539 – Centro – CEP 15.480-021 | +55 17 99636-0244 |

#### FOOTER

- **Tagline:** *"Realce sua beleza de forma natural, segura e com resultados que valorizam quem você é."*
- **Redes:** Instagram `@tatianisabadini` • Facebook `@dratatianisabadini`
- **Menu:** Quem eu sou • Áreas de Atuação • Procedimentos • Onde atendo

---

## 7. Inventário de Assets

Todos baixados em `assets/`:

### `assets/logos/`
- `logo-3.webp` — Logo principal (header), serif "TATIANI SABADINI" + "dermatologia" + "CRM: 198.372"
- `logo-4.webp` — Variante footer

### `assets/favicons/`
- `favicon-32x32.png` • `favicon-180x180.png` (apple-touch) • `favicon-192x192.png` • `favicon-270x270.png`

### `assets/images/` (11 imagens das 5 dobras)
- **Hero (Dobra 01):** `Dobra-01-Desktop-Compress.webp`, `Dobra-01-Mobile-Compress.webp`
- **Sobre (Dobra 02):** `Dobra-02-Desktop-Compress.webp`, `Dobra-02-Mobile.webp`, `Dobra-02-Mobile-5-Compress.webp`
- **Áreas (Dobra 03):** `Dobra-03-Desktop-Compress.webp`, `Dobra-03-Mobile-Compress.webp`, `Dobra-03-Mobile-2-Compress.webp`
- **Procedimentos (Dobra 04):** `Dbra-04-Compress-2.webp`
- **Onde atendo (Dobra 05):** `Dobra-05-Desktop-4.webp`, `Dobra-05-Mobile.webp`

### `assets/fonts/` (6 arquivos TTF)
- Cormorant Garamond (Variable + Variable Italic)
- Soin Sans Neue (Roman, Light, Bold, Italic)

---

## 8. Direção visual do novo site (magazine / Aesop)

> Anotado conceitualmente — não está no design atual, mas é o norte.

**Princípios do redesign:**

1. **Espaço em branco abundante.** Aesop respira; cada seção tem ar.
2. **Hierarquia tipográfica forte.** Display Cormorant em peso 400 + tracking negativo. Body Soin pequeno e respirado.
3. **Layout assimétrico editorial.** Grids de 12 com colunas fora do eixo. Imagens "sangrando" para fora do container.
4. **Foto em preto-e-branco ou paleta muito reduzida** quando possível, com pontos quentes (o bordô `#4F0911`) como acento.
5. **Microinterações sutis.** Hover de imagem com leve escala + fade, sem rotações ou shakes.
6. **CTAs minimalistas.** Botão preto sólido com tracking largo OU link sublinhado (Aesop style).
7. **Navegação fixa minimalista.** Logo à esquerda, menu textual centralizado/direita, CTA discreto.
8. **Conteúdo editorial.** Tratar cada seção como página de revista: kicker pequeno em CAPS + headline grande + parágrafo curto + número/data como decoração.
9. **Zero ornamentos decorativos** (sem ícones de "spark", sem ondas/blobs). Apenas tipografia + foto + linhas finas.
10. **Cor de fundo dominante:** blush `#FCF1EE` ou off-white `#FAF7F4` — nunca branco puro.

---

## 9. Tokens prontos para uso (export rápido)

### CSS Custom Properties

```css
:root {
  /* Cores */
  --color-bg:           #FCF1EE;
  --color-bg-alt:       #FFFFFF;
  --color-surface:      #D9CFCC;
  --color-text:         #4F0911;
  --color-text-soft:    #020101;
  --color-accent:       #000000;
  --color-wine:         #963845;
  --color-peach:        #FFBC7D;

  /* Tipografia */
  --font-display: 'Cormorant', 'Cormorant Garamond', Georgia, serif;
  --font-body:    'Soin', 'Soin Sans Neue', -apple-system, sans-serif;

  /* Pesos */
  --fw-light: 200;
  --fw-regular: 400;
  --fw-medium: 500;
  --fw-bold: 700;

  /* Escala tipográfica magazine */
  --fs-display-xl: clamp(2.5rem, 6vw, 5.5rem);   /* 40-87 */
  --fs-display-lg: clamp(2rem, 4.5vw, 3.5rem);   /* 32-54 */
  --fs-display-md: 2rem;                          /* 33 */
  --fs-accent:     1.5rem;                        /* 25 italic */
  --fs-body-lg:    1.125rem;                      /* 18 */
  --fs-body:       1rem;                          /* 16 */
  --fs-caption:    0.8125rem;                     /* 13 */
  --fs-meta:       0.75rem;                       /* 12 */

  /* Tracking */
  --tracking-display: -0.04em;
  --tracking-tight:   -0.015em;
  --tracking-normal:  0;
  --tracking-wide:    0.08em;
  --tracking-extra:   0.18em;

  /* Espaçamento */
  --space-1: 0.25rem;
  --space-2: 0.5rem;
  --space-3: 0.75rem;
  --space-4: 1rem;
  --space-6: 1.5rem;
  --space-8: 2rem;
  --space-12: 3rem;
  --space-16: 4rem;
  --space-24: 6rem;
  --space-32: 8rem;

  /* Container */
  --container-max: 1140px;
  --container-md:  1024px;
  --container-sm:  830px;

  /* Radius */
  --radius-none: 0;
  --radius-sm:   5px;
  --radius-md:   8px;
}
```

### @font-face

```css
@font-face {
  font-family: 'Cormorant';
  src: url('/assets/fonts/CormorantGaramond-VariableFont_wght.ttf') format('truetype-variations');
  font-weight: 300 700;
  font-style: normal;
  font-display: swap;
}
@font-face {
  font-family: 'Cormorant';
  src: url('/assets/fonts/CormorantGaramond-Italic-VariableFont_wght.ttf') format('truetype-variations');
  font-weight: 300 700;
  font-style: italic;
  font-display: swap;
}
@font-face {
  font-family: 'Soin';
  src: url('/assets/fonts/SoinSansNeue-Roman.ttf') format('truetype');
  font-weight: 400; font-style: normal; font-display: swap;
}
@font-face {
  font-family: 'Soin';
  src: url('/assets/fonts/SoinSansNeue-Light.ttf') format('truetype');
  font-weight: 200; font-style: normal; font-display: swap;
}
@font-face {
  font-family: 'Soin';
  src: url('/assets/fonts/SoinSansNeue-Bold.ttf') format('truetype');
  font-weight: 700; font-style: normal; font-display: swap;
}
@font-face {
  font-family: 'Soin';
  src: url('/assets/fonts/SoinSansNeue-Italic.ttf') format('truetype');
  font-weight: 400; font-style: italic; font-display: swap;
}
```

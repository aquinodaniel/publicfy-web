# Identidade Visual — Aurora Engenharia

> Brand book técnico extraído do site oficial **https://auroraengenharia.com/**, organizado para servir de base à criação da nova landing page.

---

## 1. Sumário da Marca

| Item | Valor |
|---|---|
| Nome | **Aurora Engenharia** |
| Slogan / Tagline | **"Projetos Hidrossanitários BIM de alto padrão"** |
| Especialidade | Projetos hidrossanitários (água fria/quente, esgoto, pluvial, piscinas) |
| Diferencial | Metodologia **BIM** + foco em alto padrão |
| Fundador | **Leonardo Marques** (Engenheiro) |
| Posicionamento | Especialista técnico premium, jovem, moderno e confiável |
| Público-alvo | Construtores, arquitetos e proprietários de imóveis de **médio e alto padrão** que valorizam qualidade |

---

## 2. Paleta de Cores

A marca opera com uma paleta minimalista e profissional, ancorada em um único azul-petróleo de marca (presente em 100% dos ícones SVG do site).

### Cores principais

| Cor | Hex | RGB | Uso |
|---|---|---|---|
| **Azul Petróleo (Primária)** | `#00657B` | `0, 101, 123` | Marca, ícones, links, botões primários, headers |
| **Preto Profundo** | `#001115` | `0, 17, 21` | Backgrounds escuros, sombras, texto sobre claro (alternativa) |
| **Branco** | `#FFFFFF` | `255, 255, 255` | Fundo padrão, logo negativo |

### Cores neutras de apoio (sugeridas)

| Cor | Hex | Uso |
|---|---|---|
| Cinza claro | `#F5F5F5` | Backgrounds de seções alternadas |
| Cinza médio | `#E5E5E5` | Separadores, bordas |
| Cinza texto | `#4A4A4A` | Texto corrido, parágrafos |
| Cinza escuro | `#1A1A1A` | Títulos sobre fundo claro |

### Cores de acento (presentes em depoimentos e CTAs)

| Cor | Hex | Uso |
|---|---|---|
| Amarelo estrela | `#FFC107` | Avaliações 5 estrelas em depoimentos |
| Verde WhatsApp | `#25D366` | Botão de contato direto |
| Azul Petróleo claro (variação) | `#0A8AA8` | Hover/destaque, gradientes |

> **Nota:** A cor `#00657B` foi extraída diretamente dos arquivos SVG dos 4 ícones principais e do CSS do feed Instagram (`background: #00657B`). É a única cor cromática de marca; o restante da paleta é neutro.

---

## 3. Tipografia

A fonte oficial é **Poppins** (Google Fonts), carregada com **todos os pesos** (100–900) + itálicos.

```html
<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Poppins:100,200,300,400,500,600,700,800,900,100i,200i,300i,400i,500i,600i,700i,800i,900i&display=swap">
```

### Hierarquia recomendada

| Elemento | Fonte | Peso | Tamanho sugerido |
|---|---|---|---|
| H1 / Hero | Poppins | 700 (Bold) / 800 (ExtraBold) | 48–64px |
| H2 (seção) | Poppins | 700 (Bold) | 36–44px |
| H3 (subseção) | Poppins | 600 (SemiBold) | 24–28px |
| Body / parágrafos | Poppins | 400 (Regular) | 16–18px |
| Caption / legendas | Poppins | 400 / 500 | 14px |
| Botões / CTA | Poppins | 600 / 700, **UPPERCASE**, letter-spacing leve | 14–16px |

**Características:** Poppins é uma sans-serif geométrica, moderna e legível — combina diretamente com o logo (formas triangulares geométricas).

---

## 4. Logotipo

### Elementos
- **Símbolo (ícone):** três "montanhas" estilizadas, formadas por triângulos com linhas paralelas internas que evocam o conceito de **aurora/amanhecer** e ao mesmo tempo o **"AAA"** (qualidade tripla A).
- **Wordmark:** **"AURORA"** em peso muito bold/black + **"ENGENHARIA"** em peso regular com letter-spacing generoso, abaixo.
- **Disposição:** Vertical (símbolo em cima, texto embaixo). Não foi identificada versão horizontal no site.

### Versões disponíveis (em `/logo/`)

| Arquivo | Uso |
|---|---|
| `logo-aurora-positiva.png` | **Versão branca** — para usar sobre fundos escuros (azul petróleo, preto, fotos com overlay) |
| `logo-aurora-negativa.png` | **Versão preta** — para usar sobre fundos claros |
| `logo-aurora-300x201.png` | Thumb 300×201 (para favicons, miniaturas) |

### Diretrizes de aplicação
- **Espaço de respiro mínimo:** equivalente à altura da letra "A" do wordmark em todos os lados.
- **Tamanho mínimo:** 80px de largura para legibilidade web.
- **Não fazer:** girar, distorcer, alterar cores, separar símbolo de texto sem necessidade, aplicar sobre fundos com baixo contraste.

---

## 5. Iconografia

4 ícones SVG monocromáticos em `#00657B`, estilo **flat geométrico** com mistura de linhas e formas sólidas. Todos seguem grid 500×500px e proporções uniformes.

| Ícone | Conceito | Arquivo |
|---|---|---|
| 👥 Equipe de Especialistas | Capacetes/figuras humanas com engrenagem central | `icons/icone-equipe.svg` |
| ⭐ Projetos de Alto Padrão | Estrelas em torno de uma estrela central | `icons/icone-alto-padrao.svg` |
| 📐 Metodologia BIM | Prancheta/documento com elementos 3D | `icons/icone-bim.svg` |
| 📋 Normas Técnicas | Lâmpada/livro com sinais de checagem | `icons/icone-normas.svg` |

### Diretrizes para novos ícones
- Cor única: `#00657B`
- Estilo: flat, com mistura de linhas finas + áreas preenchidas
- Construção geométrica (sem rounded corners excessivos)
- Proporção quadrada (1:1)
- Padding interno de ~30% do canvas

---

## 6. Estilo Fotográfico e de Imagens

### Fotos institucionais
- **Foto do fundador (Leonardo Marques):** ambiente real de obra, uniforme da Aurora (camisa azul-marinho com logo bordado), EPI completo (capacete branco + óculos de proteção). Tom: **autêntico, profissional, jovem, próximo**.

### Renders técnicos (BIM)
- Renderizações 3D dos projetos com **fundo branco** (tratamento PhotoRoom).
- **Código de cores das tubulações** segue padrão BIM:
  - Azul claro → água fria
  - Vermelho → água quente
  - Verde → esgoto
  - Cinza/laranja → pluvial
- Estilo: limpo, técnico, isométrico.

### Cards de depoimento
- Foto circular do cliente
- 5 estrelas amarelas (`#FFC107`)
- Nome em **bold** + cargo + cidade-estado
- Texto entre aspas, fonte regular
- Fundo neutro claro

### Sugestões para a landing
- Hero com **render BIM** ou foto de obra real + overlay azul-petróleo translúcido
- Seção "Sobre" com foto autêntica em obra (não banco de imagens)
- Galeria de projetos com renders técnicos sobre fundo branco
- Depoimentos com foto + estrelas + texto curto

---

## 7. Tom de Voz e Comunicação

### Características
- **Técnico mas acessível** — fala de BIM, normas, eficiência, mas sempre traduzindo para benefício do cliente
- **Confrontativo com amadores** — posiciona-se como antídoto a "quem faz errado"
- **Promessa direta** — usa palavras como "PROMETEMOS", "garantimos"
- **Educativo** — explica o porquê das escolhas técnicas
- **Próximo e humano** — narrativa em primeira pessoa do fundador

### Frases-chave já consolidadas (use como referência)

> "Projetos Hidrossanitários BIM de alto padrão"

> "QUALIDADE EM 1° LUGAR"

> "Se procura o melhor em determinada área, você procura por um especialista!"

> "O resultado é conforto para sua família e segurança"

> "estima-se que em média, é possível economizar até **20% do valor da obra**"

> "nós PROMETEMOS que com a Aurora Engenharia sua obra terá tudo que é preciso"

### Vocabulário recorrente
Alto padrão · Excelência · BIM · Normas técnicas · Especialistas · Qualidade · Conforto · Segurança · Patrimônio · Inovação

---

## 8. Estrutura de Conteúdo (referência da landing atual)

A home da Aurora é uma **single page** com a seguinte sequência. Pode ser usada como ponto de partida ou reordenada conforme estratégia de conversão:

1. **Header fixo** — logo + menu + ícones sociais + CTA "Quero um projeto!"
2. **Hero** — imagem render + tagline + CTA primário
3. **4 pilares de qualidade** — grid de ícones (Equipe / Alto Padrão / BIM / Normas)
4. **Sobre nós** — narrativa do fundador com foto autêntica
5. **Como trabalhamos** — explicação da metodologia BIM
6. **Quem atendemos / Por que nos escolher** — descrição do cliente ideal
7. **Serviços** — 5 cards (Hidráulica, Pluvial, Esgoto, Piscinas, Consultoria)
8. **Depoimentos** — feed Instagram + cards de cliente
9. **CTA Final** — "Precisa de um projeto?" → WhatsApp
10. **Footer** — links + redes sociais

---

## 9. Serviços Oferecidos

| Serviço | Escopo |
|---|---|
| **Projeto de Instalações Hidráulicas** | Abastecimento, distribuição de água fria/quente, tubulações |
| **Projeto Sanitário – Pluvial** | Drenagem de águas pluviais, sistemas de reuso |
| **Projeto Sanitário – Esgoto** | Coleta, transporte e tratamento de esgoto |
| **Projeto Hidráulico de Piscinas** | Abastecimento, recirculação, filtragem, casa de máquinas |
| **Consultoria** | Análise e melhoria de projetos existentes, suporte técnico rápido |

---

## 10. Contatos e Redes Sociais

| Canal | URL |
|---|---|
| Site | https://auroraengenharia.com/ |
| WhatsApp | https://wa.me/message/7YEK7GJMCWQNE1 |
| Instagram | https://instagram.com/aurora.engenharia/ (`@aurora.engenharia`) |
| LinkedIn | https://linkedin.com/company/33225029 |
| YouTube | https://youtube.com/channel/UCgmlWxtyJWU-CJzpJpdXW0g |

CTA principal recorrente: **"QUERO UM PROJETO!"** → leva ao WhatsApp.

---

## 11. Stack Técnico do Site Atual

- **CMS:** WordPress
- **Tema:** OceanWP
- **Builder:** Elementor
- **Fonte:** Google Fonts (Poppins)
- **Feed Instagram:** Smash Balloon (sb_instagram)

> Sugestão: para a nova landing, considerar stack mais leve (Next.js / Astro / HTML+Tailwind) para ganho de performance e SEO, mantendo Poppins + paleta acima.

---

## 12. Mini Style Guide para a Nova Landing (CSS)

```css
:root {
  /* Cores de marca */
  --aurora-primary: #00657B;       /* azul petróleo */
  --aurora-primary-hover: #004F60;
  --aurora-primary-light: #0A8AA8;
  --aurora-dark: #001115;
  --aurora-white: #FFFFFF;

  /* Neutros */
  --gray-50:  #F5F5F5;
  --gray-100: #E5E5E5;
  --gray-500: #4A4A4A;
  --gray-900: #1A1A1A;

  /* Acentos */
  --star-yellow: #FFC107;
  --whatsapp:    #25D366;

  /* Tipografia */
  --font-base: 'Poppins', system-ui, sans-serif;

  /* Raios e sombras */
  --radius-sm: 6px;
  --radius-md: 12px;
  --radius-lg: 20px;
  --shadow-sm: 0 2px 8px rgba(0, 17, 21, 0.06);
  --shadow-md: 0 8px 24px rgba(0, 17, 21, 0.10);
}

body {
  font-family: var(--font-base);
  color: var(--gray-900);
  background: var(--aurora-white);
}

h1, h2, h3 { font-weight: 700; }
.btn-primary {
  background: var(--aurora-primary);
  color: var(--aurora-white);
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  padding: 14px 28px;
  border-radius: 9999px;
  transition: background .2s ease;
}
.btn-primary:hover { background: var(--aurora-primary-hover); }
```

---

## 13. Inventário de Ativos Baixados

Todos os arquivos estão organizados em `C:\Users\danie\aurora-identity\`:

```
aurora-identity/
├── IDENTIDADE_VISUAL.md           ← este documento
├── logo/
│   ├── logo-aurora-positiva.png   (versão branca, fundo transparente)
│   ├── logo-aurora-negativa.png   (versão preta, fundo transparente)
│   └── logo-aurora-300x201.png    (thumb)
├── icons/
│   ├── icone-equipe.svg
│   ├── icone-alto-padrao.svg
│   ├── icone-bim.svg
│   └── icone-normas.svg
├── images/
│   ├── projeto-hidrossanitario.png   (hero principal — render BIM)
│   ├── sala-tecnica-diroma.png       (render técnico)
│   ├── pluvial-casa-lj.png           (render pluvial)
│   ├── esgoto-casa-lj.png            (render esgoto)
│   ├── casa-maquina-piscina.png      (render piscina)
│   ├── foto-leonardo-marques.jpeg    (foto do fundador em obra)
│   ├── design-elemento.png           (lâmpada — elemento decorativo)
│   └── servico-1..5-*.png            (cards de depoimento de clientes)
└── raw/
    ├── index.html                    (HTML completo da home)
    └── sitemap.xml
```

---

## 14. Recomendações para a Nova Landing

1. **Manter Poppins + #00657B** como base — não inventar paleta nova; o reconhecimento de marca já está construído.
2. **Reaproveitar os 4 ícones SVG** como pilares de valor — eles estão em vetor e escalam perfeitamente.
3. **Hero forte com render BIM real + overlay azul-petróleo** + tagline atual, em vez de imagem genérica.
4. **Reforçar prova social** — mais depoimentos com foto, integrar feed Instagram via API moderna (não plugin pesado).
5. **CTA único e claro** ("Quero meu projeto") repetido a cada 1–2 dobras, sempre apontando para WhatsApp.
6. **Seção "Por que BIM"** com números (ex.: "20% de economia", "100% conformidade NBR").
7. **Mostrar o fundador** — humanizar a marca; foto real do Leonardo + breve bio gera confiança.
8. **Performance:** lazy-load nas renders (são pesadas), usar `<picture>` com WebP.

# Imersão Aurora — Landing Page

Landing de conversão da Imersão Aurora (5–7/jun) construída em **React + Vite + TailwindCSS + Framer Motion**.

## Rodar local

```bash
cd app
npm install
npm run dev
```

Abre em `http://localhost:5173`.

## Build

```bash
npm run build      # gera /dist
npm run preview    # serve /dist local
```

## Estrutura

```
app/
├── index.html              # entrada Vite + Poppins via Google Fonts
├── tailwind.config.js      # paleta Aurora (#00657B) + tipografia Poppins
├── src/
│   ├── main.jsx
│   ├── App.jsx             # composição das 6 seções + sticky
│   ├── index.css           # base Tailwind + .btn-primary + reduced-motion
│   ├── hooks/
│   │   └── useCountdown.js
│   └── components/
│       ├── TopBar.jsx
│       ├── HeroSection.jsx
│       ├── ThreeNightsSection.jsx   ← inclui ProjectFlow (elemento criativo)
│       ├── ProjectFlow.jsx
│       ├── AboutLeoSection.jsx       ← com count-up dos stats
│       ├── OfferSection.jsx          ← box de pricing (decisão)
│       ├── FAQSection.jsx            ← accordion 3 perguntas
│       ├── FooterSection.jsx
│       ├── StickyCTA.jsx             ← bottom fixo
│       ├── Countdown.jsx
│       └── Reveal.jsx                ← motion pattern único
```

## Pontos de integração que precisam ser preenchidos antes de publicar

1. **Checkout:** trocar `handleCTA` em `src/App.jsx` pela URL de checkout real (Hotmart/Pagar.me/etc).
2. **Data do cronômetro:** em `src/hooks/useCountdown.js` passar o ISO da data real do fim do Lote 1 (`useCountdown('2026-05-22T23:59:59-03:00')`).
3. **Foto do Leo:** o card de bio (`AboutLeoSection.jsx`) está com placeholder. Trocar pelo asset real (sugestão: `aurora-identity/images/foto-leonardo-marques.jpeg`).
4. **Renders BIM nas Aulas:** opcional — podem ser inseridos como `<img>` ao lado de cada card de aula.
5. **Logo Aurora no top bar:** atualmente um quadrado `A`; trocar pelo SVG/PNG da pasta `aurora-identity/logo/`.
6. **Contagem de vagas (87/300):** valor estático na copy. Em produção, conectar a um endpoint que retorne o número real e remover o cálculo `71%` hardcoded da barra.

## Decisões de UX que precisam permanecer

- 6 CTAs distribuídos (top bar + hero + S2 + offer + footer + sticky), todos chamam o mesmo `handleCTA`.
- Único motion pattern (`Reveal`) reutilizado em todas as seções para consistência.
- `prefers-reduced-motion` desativa todas as animações (acessibilidade).
- Sticky CTA aparece desde 5% do scroll no mobile (presença máxima) e 30% no desktop.
- Cor `#00657B` é exclusiva de CTA primário; `#F94E03` exclusiva de números de perda + bônus + selo "AO VIVO".

## Branch / commit

A pasta `app/` foi criada dentro do repo `novo-site-leonardo`. Para commitar:

```bash
git add app/
git commit -m "Landing Imersão Aurora — React + Tailwind + Framer Motion"
```

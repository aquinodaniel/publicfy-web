# CLAUDE.md — Memória do projeto Imersão Aurora

> Arquivo de memória do projeto, lido automaticamente em toda sessão Claude Code dentro deste diretório. Mantém contexto de produto, público, identidade, stack e regras operacionais.

---

## 1. Produto

**Imersão Aurora** — evento online ao vivo de 3 noites (**05, 06 e 07 de junho**) com o **Eng. Leo Marques** (Aurora Engenharia) projetando, do briefing à entrega, a hidráulica de água quente de uma casa de alto padrão real.

- **Função estratégica:** lead-magnet pago (R$ 27 → R$ 47 → R$ 67) que qualifica audiência fria do Instagram para o produto principal **MEDH-P** (mentoria/curso).
- **Formato:** 3 aulas ao vivo no Google Meet às 19h30 + replay 7 dias.
- **Bônus de escassez horizontal:** 300 primeiros do Lote 1 levam template do projeto real (.rvt + .pdf detalhado).
- **Diferencial do ao vivo:** tira-dúvidas + sessão "quanto cobrar" só na Aula 03 ao vivo.

## 2. Público (validado em dados reais do @aurora.engenharia)

- ~60% engenheiros civis (3–10 anos formados, cobrando abaixo do alto padrão)
- ~15% técnicos empíricos (encanadores, instaladores)
- ~10% estudantes finalistas
- ~10% arquitetos que coordenam com hidráulica
- ~5% clientes finais (descartar do funil)

**Dor central:** medo de ser visto como "amador", travado em obra comum enquanto alto padrão cresce.

**Vocabulário do nicho (usar literalmente):** alto padrão · BIM · compatibilização · pressurizado · CPVC · manifold · recirculação · sair da gambiarra · time · alto nível.

## 3. Posicionamento e ângulo

**Ângulo dominante: risco assimétrico** — *"se errar é R$ 27, se acertar muda o jogo"*.

- Argumento por **número/conta**, nunca por adjetivo. Engenheiro racional segue lógica.
- Lotes **R$ 27 → R$ 47 (+74%) → R$ 67 (+148%)** — comunicar percentual, não valor absoluto.
- CTAs com **preço explícito**: "Quero meu ingresso por R$ 27".
- ❌ **Evitar:** "Quero entrar pro time", "Solicite informações", "Inscreva-se".

## 4. Stack técnica

- **React 18** + **Vite 5** + **TailwindCSS 3** + **Framer Motion 11** + **@react-three/fiber** + **drei** + **three**
- Pasta da app: `app/`
- Deploy: **Vercel** — `imersao-aurora.vercel.app`

### Estrutura de componentes (`app/src/components/`)

`TopBar` · `HeroSection` (com `HouseHydraulicScene` 3D) · `ThreeNightsSection` (com `ProjectFlow`) · `AboutLeoSection` · `OfferSection` · `FAQSection` · `FooterSection` · `StickyCTA` · `Countdown` · `Reveal` · `TechMarkers` · `TimeAuroraBadge`

### Hooks

`useCountdown` (constante `EVENT_START_ISO`) · `useSeats`

## 5. Identidade visual (regras invioláveis)

- **Cor primária `#00657B`** (azul-petróleo) — **exclusiva de CTA primário e textos `text-aurora`**.
- **Cor de alerta `#F94E03`** (laranja) — **exclusiva de números de perda + bônus + selo "AO VIVO"**.
- **Tipografia:** Poppins (Google Fonts) + fonte mono para tags técnicas/timestamps.
- **Logo:** três montanhas geométricas + "AURORA / ENGENHARIA" em `aurora-identity/logo/`.
- **Não introduzir cores fora dessa paleta.** Disciplina cromática faz parte da identidade Aurora.
- **Único motion pattern:** componente `Reveal` reutilizado em todas as seções.
- **Acessibilidade:** `prefers-reduced-motion` desativa todas as animações (já implementado em `index.css`).

## 6. Regras de UX que precisam permanecer

- **6 CTAs distribuídos** (top bar + hero + S2 + offer + footer + sticky), todos chamam o mesmo `handleCTA` em `App.jsx`.
- **Sticky CTA** aparece a partir de 5% de scroll no mobile, 30% no desktop (presença máxima onde mais converte).
- **Cronômetro regressivo** visível na hero (TimerCard com 4 quadrados independentes).
- **Tom de voz:** racional, sem aspiracionalismo. Argumento por contas, não emoção.

## 7. Pendências de produção (`app/README.md`)

1. Trocar `handleCTA` em `src/App.jsx` pela URL real de checkout (Hotmart/Pagar.me/etc).
2. Passar ISO real do fim do Lote 1 em `src/hooks/useCountdown.js`.
3. Substituir placeholder da foto do Leo em `AboutLeoSection.jsx`.
4. Trocar quadrado `A` do top bar pelo logo SVG real (`aurora-identity/logo/`).
5. Conectar contagem de vagas (87/300 hardcoded) a um endpoint real.
6. Considerar inserir renders BIM nas Aulas 01–03.

## 8. Documentos-fonte (ler antes de mudar copy/posicionamento)

- `README.md` (raiz) — **estratégia de venda completa e validada** (headline, oferta, lotes, objeções, metas).
- `aurora-identity/IDENTIDADE_VISUAL.md` — brand book.
- `aurora-identity/ANALISE_PUBLICO.md` — análise de público com dados reais.
- `plans/estrategia-imersao.md` — versão 1 da estratégia.
- `prints-referencia/` — 7 prints reais do Insta + foto do Leo + 3 referências hidráulicas.
- `app/README.md` — guia técnico de execução (rodar local, build, integrações pendentes).

## 9. Workflow operacional

- **Deploy:** sempre que houver alteração na landing, rodar deploy preview/produção via `vercel` CLI a partir de `app/`.
- **Comunicação:** PT-BR, conciso, sem formalismo. Cliente é a Publicfy (agência) — interlocutor entende funil/conversão; ir direto à execução.
- **Antes de mudar copy/posicionamento:** ler `README.md` raiz. Estratégia já está validada.
- **Nunca quebrar a paleta de cor** ou introduzir novo motion pattern fora do `Reveal`.

## 10. Metas de conversão (referência)

| Métrica | Meta |
|---|---|
| Conversão landing (Lote 1) | > 6% |
| CTR CTA principal | > 15% |
| Show-up Aula 01 | > 45% dos inscritos |
| Show-up Aula 03 (com tira-dúvidas) | > 35% |
| Conversão pós-imersão para MEDH-P | > 8% dos presentes |

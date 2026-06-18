# publicfy-web

Monorepo com os projetos e sites web da Publicfy.

## Estrutura

```
web/
├── aurora-engenharia/
│   ├── lp-aurora-engenharia/    # Landing page (Next.js)
│   └── lp-semana-agua-quente/   # Landing page (HTML estático)
└── clinicas/
    ├── site-dermato/            # Site Dra. Tatiani Sabadini (Next.js)
    └── site-penumo/             # Site Dra. Luana Vilches (HTML estático)
```

## Desenvolvimento

Cada projeto é independente. Para os projetos Next.js:

```bash
cd <projeto>
npm install
npm run dev
```

Os projetos em HTML estático podem ser abertos direto pelo `index.html`.

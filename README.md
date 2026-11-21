# Ana Lira Beauty — site one page para maquiadora de noivas

Modelo de site em uma página que transforma visitante em noiva qualificada no WhatsApp.
React + TypeScript + Vite + Tailwind CSS 4. Todo o conteúdo fica em **`src/config/site.ts`**.

## Rodar localmente

Requisito: Node.js 20 ou mais novo.

```bash
npm install       # só na primeira vez
npm run dev       # abre em http://localhost:5173
```

Versão de produção (igual à que vai para a Vercel):

```bash
npm run build     # checa os tipos, gera /dist e pré-renderiza o HTML
npm run preview   # abre em http://localhost:4173
```

## Adaptar para uma cliente nova

Tudo fica em `src/config/site.ts`. As constantes do topo do arquivo já se espalham
pelo site inteiro (títulos, SEO, textos, schema.org e mensagem do WhatsApp):

| Constante          | O que é                                              |
| ------------------ | ---------------------------------------------------- |
| `BRAND`            | Nome da marca (menu, rodapé, selo girando, SEO)      |
| `PROFESSIONAL`     | Nome da maquiadora (seção Sobre)                     |
| `INITIALS`         | Iniciais do selo e do ícone da aba                   |
| `CITY`, `STATE`    | Cidade/UF de atuação                                 |
| `REGION`           | Texto da área atendida (padrão: "Cidade e região")   |
| `WHATSAPP`         | Número só com dígitos: DDI + DDD + número            |
| `WHATSAPP_DISPLAY` | Número formatado que aparece no rodapé               |
| `INSTAGRAM`        | Usuário do Instagram, sem @                          |
| `SITE_URL`         | Domínio final, sem barra no fim (canonical, OG, sitemap) |
| `NEXT_SEASON`      | Ano da próxima temporada ("Agenda 2027 aberta")      |

Depois revise os blocos do objeto `site` (cada um corresponde a uma seção):

- `hero`: título, subtítulo, foto principal (`image`) e foto redonda (`detailImage`)
- `marquee`: palavras da faixa vinho
- `about`: textos, números (`stats`), estilo (`styleTags`) e foto da profissional
- `portfolio.items`: fotos com `category` (precisa ser uma das `portfolio.categories`)
- `packages.items`: nome, descrição, itens inclusos, `featured` (card vinho em arco) e `badge`
- `steps`, `testimonials`, `faq`, `finalCta`: textos de cada seção
- `form`: tipos de atendimento e o início da mensagem do WhatsApp
- `seo.ogImage`: imagem da prévia do link (1200×630)

**Itálico nos títulos:** palavras entre `*asteriscos*` aparecem em itálico vinho.

**Fotos próprias:** coloque os arquivos em `public/fotos/` e use `src: '/fotos/noiva.jpg'`.
As fotos do Unsplash são redimensionadas sozinhas. Para fotos próprias, envie já em
tamanho otimizado (até ~1200px, em WebP ou JPG).

## Publicar na Vercel via GitHub

1. Crie um repositório no GitHub e envie o projeto (`.env` e `node_modules` já são ignorados).
2. Na Vercel: **Add New → Project → Import** o repositório.
3. A Vercel detecta o Vite sozinha (build `npm run build`, saída `dist`). Clique em **Deploy**.
4. Atualize `SITE_URL` no `site.ts` com o domínio final e faça novo push.

## Estrutura

```
src/
  config/site.ts         ← conteúdo editável (o único arquivo a mexer por cliente)
  config/types.ts        ← tipos do site.ts
  components/            ← uma seção por arquivo (Hero, About, Portfolio...)
  components/ui/         ← peças reutilizáveis (botão, imagem, ícones, animação)
  context/BookingContext ← abre o formulário de qualquer botão do site
  lib/validation.ts      ← regras do formulário
  lib/whatsapp.ts        ← monta a mensagem e o link wa.me
vite.config.ts           ← gera título, meta tags, Open Graph, schema.org, robots e sitemap
scripts/prerender.mjs    ← pré-renderiza o HTML no build (SEO + velocidade)
```

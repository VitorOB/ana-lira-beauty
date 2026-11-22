import type { SiteConfig } from './types'

/* ============================================================================
 *  CONFIGURAÇÃO DO SITE — tudo o que muda de uma cliente para outra está aqui.
 *
 *  1) Troque primeiro as constantes abaixo (nome, cidade, WhatsApp...).
 *     Elas são reaproveitadas automaticamente em títulos, SEO e textos.
 *  2) Depois revise os textos, fotos, pacotes, depoimentos e perguntas.
 *
 *  Dica de títulos: palavras entre *asteriscos* aparecem em itálico
 *  (ex.: "Maquiagem que dura *do sim até a última dança*").
 * ========================================================================== */

const BRAND = 'Ana Lira Beauty'
const PROFESSIONAL = 'Ana Lira' // nome da maquiadora
const INITIALS = 'AL' // usado no ícone da aba do navegador
const CITY = 'São Paulo'
const STATE = 'SP'
const REGION = `${CITY} e região`
const WHATSAPP = '5511999999999' // DDI + DDD + número, só números
const WHATSAPP_DISPLAY = '(11) 99999-9999'
/**
 * Usuário do Instagram, sem o @. Vazio = o rodapé mostra "Instagram · demonstrativo" sem link.
 * Em site de demonstração, deixe vazio: qualquer @ inventado pode ser a conta de alguém real.
 */
const INSTAGRAM = ''
const SITE_URL = 'https://ana-lira-beauty.vercel.app' // domínio final, sem barra no fim
const NEXT_SEASON = '2027'

/** Constantes reaproveitadas pela versão em inglês (site.en.ts). */
export const constants = { BRAND, PROFESSIONAL, CITY, STATE, NEXT_SEASON }

/** Monta a URL de uma foto do Unsplash pelo ID (o site adiciona o tamanho sozinho). */
export const unsplash = (id: string) => `https://images.unsplash.com/photo-${id}`

export const site = {
  brand: { name: BRAND, professional: PROFESSIONAL, initials: INITIALS },

  contact: {
    whatsapp: WHATSAPP,
    whatsappDisplay: WHATSAPP_DISPLAY,
    instagram: INSTAGRAM,
    instagramUrl: INSTAGRAM ? `https://instagram.com/${INSTAGRAM}` : '',
  },

  location: { city: CITY, state: STATE, region: REGION },

  seo: {
    siteUrl: SITE_URL,
    title: `Maquiadora de Noivas em ${CITY} | ${BRAND}`,
    description: `Maquiagem e penteado para noivas, madrinhas e debutantes em ${REGION}. Pele natural e de longa duração, prova inclusa e atendimento no local. Consulte sua data pelo WhatsApp.`,
    ogImage: `${unsplash('1546032996-6dfacbacbf3f')}?auto=format&fit=crop&w=1200&h=630&q=75`,
    keywords: [
      `maquiadora de noivas ${CITY}`,
      `maquiagem de noiva ${CITY}`,
      'penteado de noiva',
      'dia da noiva',
      'maquiagem para madrinhas',
      'maquiagem para debutante',
    ],
  },

  nav: [
    { label: 'Sobre', href: '#sobre' },
    { label: 'Portfólio', href: '#portfolio' },
    { label: 'Pacotes', href: '#pacotes' },
    { label: 'Como funciona', href: '#como-funciona' },
    { label: 'Depoimentos', href: '#depoimentos' },
    { label: 'Dúvidas', href: '#duvidas' },
  ],

  /* ------------------------------------------------------------------ HERO */
  hero: {
    eyebrow: `Maquiadora de noivas · ${REGION}`,
    title: 'Maquiagem de noiva que dura *do sim até a última dança*',
    subtitle: `Pele iluminada, natural e à prova de lágrimas para noivas de ${REGION}. Atendimento no local do seu making of, com prova antes do grande dia.`,
    cta: 'Consultar disponibilidade da minha data',
    secondaryCta: { label: 'Ver portfólio', href: '#portfolio' },
    note: `Resposta em até 24h · Agenda ${NEXT_SEASON} aberta`,
    image: {
      src: unsplash('1546032996-6dfacbacbf3f'),
      alt: 'Noiva sorrindo sob o véu ao pôr do sol, abraçada ao noivo',
    },
    detailImage: {
      src: unsplash('1487412947147-5cebf100ffc2'),
      alt: 'Detalhe de maquiagem nos olhos sendo aplicada com pincel',
    },
    sealText: `MAQUIAGEM DE NOIVAS ✦ ${BRAND.toUpperCase()} ✦ `,
  },

  /** Palavras que passam na faixa vinho inclinada. */
  marquee: [
    'Pele iluminada',
    'Longa duração',
    'À prova de lágrimas',
    'Making of no local',
    'Prova inclusa',
    'Noivas',
    'Madrinhas',
    'Debutantes',
  ],

  /* ----------------------------------------------------------------- SOBRE */
  about: {
    eyebrow: `Prazer, eu sou a ${PROFESSIONAL}`,
    title: 'Realço a sua beleza *sem esconder quem você é*',
    paragraphs: [
      `Há quase uma década eu acompanho noivas de ${REGION} no dia mais esperado da vida delas. Meu trabalho é fazer você se olhar no espelho e se reconhecer — só que na sua versão mais radiante.`,
      'Trabalho com pele leve e luminosa, acabamento que aparece lindo nas fotos e produtos de alta fixação, testados para calor, abraços e muita emoção. Chego cedo, com calma, e transformo o making of em um momento gostoso, sem correria.',
    ],
    stats: [
      { value: '+350', label: 'noivas atendidas' },
      { value: '9 anos', label: 'de experiência' },
      { value: '5,0', label: 'de avaliação' },
    ],
    styleTags: ['Pele glow natural', 'Olhar marcante sob medida', 'Alta durabilidade', 'Atendimento pontual e tranquilo'],
    image: {
      src: unsplash('1580489944761-15a19d654956'),
      alt: `${PROFESSIONAL}, maquiadora de noivas, sorrindo de camisa branca`,
    },
    cta: 'Quero você no meu grande dia',
  },

  /* ------------------------------------------------------------- PORTFÓLIO */
  portfolio: {
    eyebrow: 'Portfólio',
    title: 'Belezas reais, *cada uma do seu jeito*',
    subtitle: 'Uma seleção de noivas, madrinhas e debutantes. Toque em uma foto para ver maior.',
    allLabel: 'Todos',
    categories: ['Noivas', 'Madrinhas', 'Debutantes'],
    items: [
      { category: 'Noivas', src: unsplash('1537633552985-df8429e8048b'), alt: 'Noiva com véu longo na praia ao lado do noivo' },
      { category: 'Madrinhas', src: unsplash('1531746020798-e6953c6e8e04'), alt: 'Madrinha com coque alto e maquiagem natural' },
      { category: 'Noivas', src: unsplash('1557296387-5358ad7997bb'), alt: 'Close de maquiagem com pele iluminada e batom vermelho' },
      { category: 'Debutantes', src: unsplash('1554151228-14d9def656e4'), alt: 'Debutante com coque e maquiagem leve com sardas' },
      { category: 'Noivas', src: unsplash('1606490194859-07c18c9f0968'), alt: 'Noiva e noivo se beijando ao pôr do sol com véu ao vento' },
      { category: 'Madrinhas', src: unsplash('1529626455594-4ff0802cfb7e'), alt: 'Madrinha ruiva com olhar marcante' },
      { category: 'Debutantes', src: unsplash('1604004555489-723a93d6ce74'), alt: 'Debutante loira com maquiagem suave' },
      { category: 'Noivas', src: unsplash('1525258946800-98cfd641d0de'), alt: 'Noiva segurando buquê de rosas cor de pêssego' },
      { category: 'Madrinhas', src: unsplash('1583939003579-730e3918a45a'), alt: 'Noiva, noivo e madrinhas comemorando a saída da cerimônia' },
      { category: 'Debutantes', src: unsplash('1621784563330-caee0b138a00'), alt: 'Debutante com cabelo platinado e maquiagem iluminada' },
      { category: 'Noivas', src: unsplash('1594552072238-b8a33785b261'), alt: 'Vestido de noiva rendado pronto para o making of' },
      { category: 'Madrinhas', src: unsplash('1524504388940-b1c1722653e1'), alt: 'Madrinha com cabelo solto e maquiagem esfumada' },
    ],
    cta: 'Quero uma make assim',
  },

  /* --------------------------------------------------------------- PACOTES */
  packages: {
    eyebrow: 'Pacotes',
    title: 'O cuidado ideal *para o seu dia*',
    subtitle: 'Cada noiva é única, por isso os valores são personalizados conforme data, local e número de pessoas.',
    priceLabel: 'Valores sob consulta',
    cta: 'Consultar disponibilidade',
    note: `Atendimento em ${CITY} sem taxa de deslocamento. Outras cidades sob consulta.`,
    items: [
      {
        id: 'noiva-essencial',
        name: 'Noiva Essencial',
        description: 'Para a noiva que quer beleza impecável com praticidade.',
        includes: [
          'Maquiagem da noiva com produtos de alta fixação',
          'Cílios postiços inclusos',
          'Atendimento no local do making of',
          'Kit de retoque para levar na bolsa',
        ],
      },
      {
        id: 'noiva-completa',
        name: 'Noiva Completa',
        description: 'Maquiagem e penteado pensados juntos, com prova antes.',
        featured: true,
        badge: 'Mais escolhido',
        includes: [
          'Prova de maquiagem e penteado',
          'Maquiagem + penteado no grande dia',
          'Atendimento no local do making of',
          'Fixação à prova de lágrimas',
          'Kit de retoque personalizado',
        ],
      },
      {
        id: 'dia-da-noiva',
        name: 'Dia da Noiva',
        description: 'Uma manhã inteira de cuidado para você e quem você ama.',
        includes: [
          'Prova de maquiagem e penteado',
          'Maquiagem + penteado da noiva',
          'Maquiagem para até 4 madrinhas ou mães',
          'Permanência para retoque até a cerimônia',
          'Atendimento no local do making of',
        ],
      },
    ],
  },

  /* --------------------------------------------------------- COMO FUNCIONA */
  steps: {
    eyebrow: 'Como funciona',
    title: 'Do primeiro oi *ao grande dia*',
    items: [
      { title: 'Consulta da data', text: 'Você me envia data e cidade pelo formulário e eu confirmo a disponibilidade no WhatsApp.' },
      { title: 'Prova de maquiagem', text: 'Testamos juntas a make ideal para o seu estilo, vestido e horário da cerimônia.' },
      { title: 'Reserva com sinal', text: 'Com o contrato assinado e o sinal, sua data fica bloqueada só para você.' },
      { title: 'O grande dia', text: 'Chego no seu making of no horário combinado. Você só precisa aproveitar.' },
    ],
    cta: 'Começar pela consulta da data',
  },

  /* ----------------------------------------------------------- DEPOIMENTOS */
  testimonials: {
    eyebrow: 'Depoimentos',
    title: 'Palavras de quem *disse sim*',
    items: [
      {
        name: 'Mariana Costa',
        city: 'Campinas/SP',
        detail: 'Casou em março',
        text: 'Chorei na cerimônia inteira e a maquiagem ficou perfeita até o fim da festa. Nas fotos parecia que eu tinha acabado de me arrumar!',
        photo: { src: unsplash('1494790108377-be9c29b29330'), alt: 'Foto de Mariana Costa' },
      },
      {
        name: 'Juliana Ribeiro',
        city: 'Santos/SP',
        detail: 'Casou em janeiro',
        text: 'Casamento na praia, calor de 32 graus, e nada derreteu. A Ana trouxe uma calma para o making of que eu nem sabia que precisava.',
        photo: { src: unsplash('1438761681033-6461ffad8d80'), alt: 'Foto de Juliana Ribeiro' },
      },
      {
        name: 'Camila Andrade',
        city: 'São Paulo/SP',
        detail: 'Dia da Noiva',
        text: 'Fiz o Dia da Noiva com minha mãe e minhas madrinhas. Todas lindas, cada uma do seu jeito, e tudo no horário. Recomendo de olhos fechados.',
        photo: { src: unsplash('1544005313-94ddf0286df2'), alt: 'Foto de Camila Andrade' },
      },
      {
        name: 'Beatriz Martins',
        city: 'Jundiaí/SP',
        detail: 'Casou em outubro',
        text: 'Eu tinha medo de ficar “maquiada demais”. Ela entendeu exatamente o que eu queria: me senti eu mesma, só que mais bonita.',
        photo: { src: unsplash('1508214751196-bcfd4ca60f91'), alt: 'Foto de Beatriz Martins' },
      },
    ],
    cta: 'Quero viver isso também',
  },

  /* ------------------------------------------------------------ PERGUNTAS */
  faq: {
    eyebrow: 'Dúvidas',
    title: 'Perguntas *frequentes*',
    items: [
      {
        question: 'Com quanto tempo de antecedência devo reservar?',
        answer: 'O ideal é reservar de 8 a 12 meses antes, principalmente para datas entre setembro e dezembro, que esgotam primeiro. Ainda assim, vale consultar mesmo para datas próximas.',
      },
      {
        question: 'Você atende fora da cidade?',
        answer: `Sim! Atendo em ${REGION} e também em outras cidades e destinos. Para eventos fora de ${CITY}, é cobrada uma taxa de deslocamento, informada já no orçamento.`,
      },
      {
        question: 'Como funciona a reserva da data?',
        answer: 'Depois de confirmar a disponibilidade, enviamos o contrato. A data fica bloqueada após a assinatura e o pagamento do sinal; o restante é pago até o dia do casamento.',
      },
      {
        question: 'A prova está inclusa?',
        answer: 'A prova está inclusa nos pacotes Noiva Completa e Dia da Noiva. No pacote Noiva Essencial ela pode ser adicionada à parte.',
      },
      {
        question: 'Quanto tempo dura a maquiagem?',
        answer: 'Usamos preparação de pele e fixação profissional para durar de 12 a 14 horas, resistindo a lágrimas, calor e abraços. Você ainda leva um kit de retoque para os lábios.',
      },
    ],
    cta: 'Tenho outra dúvida',
  },

  /* -------------------------------------------------------- CHAMADA FINAL */
  finalCta: {
    eyebrow: `Temporada ${NEXT_SEASON}`,
    title: 'As datas da temporada de casamentos *esgotam rápido*',
    text: 'Garanta a sua antes que outra noiva reserve primeiro. A consulta é rápida, gratuita e sem compromisso.',
    cta: 'Consultar disponibilidade da minha data',
  },

  /* --------------------------------------------------------------- RODAPÉ */
  footer: {
    description: `Maquiagem e penteado para noivas, madrinhas e debutantes em ${REGION}.`,
    credit: { label: 'Site desenvolvido por', handle: '@vitorotavio.web', url: 'https://instagram.com/vitorotavio.web' },
  },

  /* ----------------------------------------------- FORMULÁRIO / WHATSAPP */
  form: {
    title: 'Consultar disponibilidade',
    subtitle: 'Leva menos de 1 minuto. Ao enviar, a conversa continua no WhatsApp.',
    attendanceTypes: ['Noiva', 'Noiva + madrinhas', 'Debutante', 'Outro'],
    noPackageLabel: 'Ainda não decidi',
    messageIntro: 'Olá! Vim pelo seu site e gostaria de consultar disponibilidade.',
    submitLabel: 'Enviar pelo WhatsApp',
    successTitle: 'Tudo certo!',
    successText: 'Abrimos o WhatsApp com a sua mensagem pronta. É só tocar em enviar.',
  },

  floatingButtonLabel: 'Consultar disponibilidade pelo WhatsApp',
} satisfies SiteConfig

export type Site = typeof site

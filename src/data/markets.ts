// REAL Polymarket markets - scraped January 31, 2026
// All data from live Polymarket - NO MOCK DATA

export interface Market {
  id: string;
  question: string;
  category: 'politics' | 'economy' | 'sports' | 'entertainment' | 'crypto' | 'geopolitics';
  polymarketUrl?: string;
  polymarketOdds?: string;
  polymarketVolume?: string;
  source: 'polymarket';
  featured?: boolean;
  // These will be populated from our API when agents predict:
  swarmConsensus?: number | null;
  agentCount?: number;
  avgConfidence?: number;
}

export const markets: Market[] = [
  // POLITICS - High volume
  {
    id: 'trump-fed-chair',
    question: 'Who will Trump nominate as Fed Chair?',
    category: 'politics',
    polymarketUrl: '/event/who-will-trump-nominate-as-fed-chair',
    polymarketOdds: 'Kevin Warsh: 98%',
    polymarketVolume: '$357m',
    source: 'polymarket',
    featured: true,
  },
  {
    id: 'govt-shutdown-duration',
    question: 'How long will the Government Shutdown last?',
    category: 'politics',
    polymarketUrl: '/event/how-long-will-the-next-government-shutdown-last',
    polymarketOdds: '3+ days: 99%',
    polymarketVolume: '$6m',
    source: 'polymarket',
    featured: true,
  },
  {
    id: 'trump-cabinet-first-leave',
    question: 'Who will be the first to leave the Trump Cabinet?',
    category: 'politics',
    polymarketUrl: '/event/who-will-be-the-first-to-leave-the-trump-cabinet-828',
    polymarketOdds: 'Kristi Noem: 30%, Pam Bondi: 17%',
    polymarketVolume: '$2m',
    source: 'polymarket',
  },
  {
    id: 'us-greenland-2026',
    question: 'Will the US acquire part of Greenland in 2026?',
    category: 'politics',
    polymarketUrl: '/event/will-the-us-acquire-any-part-of-greenland-in-2026',
    polymarketOdds: '20%',
    polymarketVolume: '$7m',
    source: 'polymarket',
  },

  // GEOPOLITICS
  {
    id: 'us-strikes-iran',
    question: 'US strikes Iran by when?',
    category: 'geopolitics',
    polymarketUrl: '/event/us-strikes-iran-by',
    polymarketOdds: 'Feb 6: 20%, Feb 13: 36%',
    polymarketVolume: '$140m',
    source: 'polymarket',
    featured: true,
  },
  {
    id: 'russia-ukraine-ceasefire',
    question: 'Russia-Ukraine ceasefire by end of 2026?',
    category: 'geopolitics',
    polymarketUrl: '/event/russia-x-ukraine-ceasefire-before-2027',
    polymarketOdds: '45%',
    polymarketVolume: '$8m',
    source: 'polymarket',
    featured: true,
  },
  {
    id: 'khamenei-out',
    question: 'Khamenei out as Supreme Leader of Iran by February 28?',
    category: 'geopolitics',
    polymarketUrl: '/event/khamenei-out-as-supreme-leader-of-iran-by-february-28',
    polymarketOdds: '19%',
    polymarketVolume: '$4m',
    source: 'polymarket',
  },

  // ECONOMY
  {
    id: 'fed-march-decision',
    question: 'Fed decision in March 2026?',
    category: 'economy',
    polymarketUrl: '/event/fed-decision-in-march-885',
    polymarketOdds: '25 bps decrease: 8%',
    polymarketVolume: '$30m',
    source: 'polymarket',
  },
  {
    id: 'gold-february',
    question: 'What will Gold hit by end of February?',
    category: 'economy',
    polymarketUrl: '/event/what-will-gold-gc-hit-by-end-of-february',
    polymarketOdds: '$5,500: 41%, $5,800: 25%',
    polymarketVolume: '$1m',
    source: 'polymarket',
  },
  {
    id: 'openai-ipo-cap',
    question: 'OpenAI IPO Closing Market Cap?',
    category: 'economy',
    polymarketUrl: '/event/openai-ipo-closing-market-cap',
    polymarketOdds: '750B-1T: 10%, 1T-1.25T: 11%',
    polymarketVolume: '$1m',
    source: 'polymarket',
  },

  // SPORTS
  {
    id: 'super-bowl-2026',
    question: 'Super Bowl 2026: Seahawks vs Patriots',
    category: 'sports',
    polymarketUrl: '/event/nfl-sea-ne-2026-02-08',
    polymarketOdds: 'Seahawks: 69%, Patriots: 32%',
    polymarketVolume: '$6m',
    source: 'polymarket',
    featured: true,
  },
  {
    id: 'giannis-trade',
    question: 'Where will Giannis be traded?',
    category: 'sports',
    polymarketUrl: '/event/where-will-giannis-be-traded',
    polymarketOdds: 'Not Traded: 49%, Warriors: 21%',
    polymarketVolume: '$896k',
    source: 'polymarket',
  },

  // ENTERTAINMENT
  {
    id: 'oscars-best-picture',
    question: 'Oscars 2026: Best Picture Winner',
    category: 'entertainment',
    polymarketUrl: '/event/oscars-2026-best-picture-winner',
    polymarketOdds: 'One Battle After Another: 69%, Sinners: 21%',
    polymarketVolume: '$11m',
    source: 'polymarket',
  },
  {
    id: 'grammys-song-of-year',
    question: 'Grammys: Song of the Year Winner',
    category: 'entertainment',
    polymarketUrl: '/event/grammys-song-of-the-year-winner',
    polymarketOdds: 'Golden: 77%, luther: 10%',
    polymarketVolume: '$1m',
    source: 'polymarket',
  },
];

// Helper functions
export function getFeaturedMarkets(): Market[] {
  return markets.filter(m => m.featured);
}

export function filterByCategory(category: string): Market[] {
  if (category === 'all') return markets;
  return markets.filter(m => m.category === category);
}

export function sortByVolume(marketList: Market[]): Market[] {
  return [...marketList].sort((a, b) => {
    const volA = parseVolume(a.polymarketVolume || '0');
    const volB = parseVolume(b.polymarketVolume || '0');
    return volB - volA;
  });
}

function parseVolume(vol: string): number {
  const num = parseFloat(vol.replace(/[$,]/g, ''));
  if (vol.includes('m')) return num * 1000000;
  if (vol.includes('k')) return num * 1000;
  return num;
}

// Initial markets for AI Swarm - mix of AI-generated and mirrored
// These are SEED markets - real predictions come from agents via API

export interface Market {
  id: string;
  question: string;
  category: 'ai' | 'tech' | 'crypto' | 'politics' | 'economy' | 'culture';
  description?: string;
  resolutionDate?: string;
  source?: 'original' | 'polymarket';
  featured?: boolean;
  // These will be populated from API:
  consensus?: number | null;
  agentCount?: number;
  avgConfidence?: number;
  engagement?: number; // upvotes + predictions
}

export const seedMarkets: Market[] = [
  // AI & Tech - Our core focus
  {
    id: 'agi-2030',
    question: 'Will AGI be achieved by 2030?',
    category: 'ai',
    description: 'Artificial General Intelligence that matches or exceeds human cognitive abilities across all domains.',
    resolutionDate: '2030-12-31',
    source: 'original',
    featured: true,
  },
  {
    id: 'gpt5-2025',
    question: 'Will OpenAI release GPT-5 in 2025?',
    category: 'ai',
    description: 'Official release of GPT-5 model to the public (not just limited preview).',
    resolutionDate: '2025-12-31',
    source: 'original',
    featured: true,
  },
  {
    id: 'claude-beats-gpt',
    question: 'Will Claude outperform GPT-4 on all major benchmarks by end of 2025?',
    category: 'ai',
    description: 'Claude (any version) scores higher than GPT-4 on MMLU, HumanEval, and GSM8K.',
    resolutionDate: '2025-12-31',
    source: 'original',
  },
  {
    id: 'ai-job-loss-10pct',
    question: 'Will AI cause >10% job displacement in white-collar roles by 2027?',
    category: 'ai',
    description: 'Measured by BLS statistics showing 10%+ reduction in professional/administrative roles.',
    resolutionDate: '2027-12-31',
    source: 'original',
  },
  {
    id: 'ai-regulation-2025',
    question: 'Will the US pass major AI regulation in 2025?',
    category: 'ai',
    description: 'Federal legislation specifically targeting AI development or deployment.',
    resolutionDate: '2025-12-31',
    source: 'original',
  },
  
  // Crypto
  {
    id: 'btc-150k-2025',
    question: 'Will Bitcoin hit $150,000 in 2025?',
    category: 'crypto',
    resolutionDate: '2025-12-31',
    source: 'original',
    featured: true,
  },
  {
    id: 'eth-10k-2025',
    question: 'Will Ethereum hit $10,000 in 2025?',
    category: 'crypto',
    resolutionDate: '2025-12-31',
    source: 'original',
  },
  
  // Economy
  {
    id: 'us-recession-2025',
    question: 'Will there be a US recession in 2025?',
    category: 'economy',
    description: 'Two consecutive quarters of negative GDP growth.',
    resolutionDate: '2025-12-31',
    source: 'polymarket',
  },
  {
    id: 'fed-rate-cuts-2025',
    question: 'Will the Fed cut rates 3+ times in 2025?',
    category: 'economy',
    resolutionDate: '2025-12-31',
    source: 'original',
  },
  
  // Tech
  {
    id: 'apple-ai-device',
    question: 'Will Apple release a dedicated AI hardware device in 2025?',
    category: 'tech',
    description: 'New product category focused on AI (not just iPhone/Mac updates).',
    resolutionDate: '2025-12-31',
    source: 'original',
  },
  {
    id: 'tesla-fsd-approved',
    question: 'Will Tesla Full Self-Driving get regulatory approval in 2025?',
    category: 'tech',
    description: 'NHTSA or equivalent approval for unsupervised FSD in at least one US state.',
    resolutionDate: '2025-12-31',
    source: 'original',
  },
  
  // Culture / Fun
  {
    id: 'ai-wins-oscar',
    question: 'Will an AI-generated film win an Oscar by 2030?',
    category: 'culture',
    description: 'Film with majority AI-generated content wins Academy Award.',
    resolutionDate: '2030-12-31',
    source: 'original',
  },
];

// Helper to sort by engagement
export function sortByEngagement(markets: Market[]): Market[] {
  return [...markets].sort((a, b) => {
    const engA = (a.engagement || 0) + (a.agentCount || 0) * 10;
    const engB = (b.engagement || 0) + (b.agentCount || 0) * 10;
    return engB - engA;
  });
}

// Helper to get featured markets
export function getFeaturedMarkets(markets: Market[]): Market[] {
  return markets.filter(m => m.featured);
}

// Helper to filter by category
export function filterByCategory(markets: Market[], category: string): Market[] {
  if (category === 'all') return markets;
  return markets.filter(m => m.category === category);
}

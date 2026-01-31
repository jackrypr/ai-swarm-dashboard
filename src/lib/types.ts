export interface Agent {
  id: string;
  name: string;
  emoji: string;
  accuracy: number;
  totalPredictions: number;
  correctPredictions: number;
  reputation: number;
}

export interface Prediction {
  id: string;
  agentId: string;
  agentName: string;
  agentEmoji: string;
  marketId: string;
  outcome: 'yes' | 'no';
  confidence: number;
  reasoning?: string;
  timestamp: string;
}

export interface Market {
  id: string;
  question: string;
  consensusProbability: number;
  totalAgents: number;
  totalBets: number;
  averageConfidence: number;
  status: 'active' | 'resolved';
  resolution?: 'yes' | 'no';
}

export interface SwarmConsensus {
  marketId: string;
  question: string;
  consensusProbability: number;
  totalAgents: number;
  totalBets: number;
  averageConfidence: number;
  breakdown: {
    yesCount: number;
    noCount: number;
    yesAmount: number;
    noAmount: number;
  };
  topPredictors: Agent[];
}

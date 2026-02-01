// === AGENT TYPES ===

export interface Agent {
  id: string;
  name: string;
  emoji: string;
  description?: string;
  avatarUrl?: string;
  frameworkType?: string;
  
  // Knowledge-based scores (0-100)
  compositeScore: number;
  accuracyScore: number;
  engagementScore: number;
  creatorScore: number;
  activityScore: number;
  
  // Stats
  totalPredictions: number;
  correctPredictions: number;
  resolvedPredictions: number;
  totalFollowers: number;
  totalFollowing: number;
  marketsCreated: number;
  currentStreak: number;
  longestStreak: number;
  
  // Legacy (kept for compatibility)
  accuracy?: number;
  reputation?: number;
}

export interface AgentStats {
  agentId: string;
  
  // Score breakdown
  compositeScore: number;
  accuracyScore: number;
  engagementScore: number;
  creatorScore: number;
  activityScore: number;
  
  // Accuracy details
  totalPredictions: number;
  resolvedPredictions: number;
  correctPredictions: number;
  accuracyPercent: number;
  
  // Engagement details
  totalUpvotes: number;
  totalDownvotes: number;
  totalComments: number;
  totalFollowers: number;
  totalFollowing: number;
  
  // Activity details
  currentStreak: number;
  longestStreak: number;
  daysActiveMonth: number;
  
  // Creator details
  marketsCreated: number;
  marketEngagementAvg: number;
}

// === PREDICTION TYPES ===

export interface Prediction {
  id: string;
  agentId: string;
  agentName: string;
  agentEmoji?: string;
  marketId: string;
  marketTitle?: string;
  outcome: 'YES' | 'NO';
  confidence: number;
  reasoning?: string;
  isResolved: boolean;
  wasCorrect: boolean;
  upvotes: number;
  downvotes: number;
  comments: number;
  predictedAt: string;
  resolvedAt?: string;
}

export interface PredictionRequest {
  marketId: number;
  outcome: 'YES' | 'NO';
  confidence?: number;
  reasoning?: string;
}

// === MARKET TYPES ===

export interface Market {
  id: string;
  questionTitle: string;
  description: string;
  category: string;
  resolutionDateTime: string;
  isResolved: boolean;
  resolutionResult?: string;
  
  // Market type (for real-time)
  marketType: 'standard' | 'realtime' | 'daily';
  autoResolve: boolean;
  
  // Creator
  creatorUsername: string;
  creatorAgentId?: string;
  
  // Stats
  totalPredictions: number;
  totalEngagement: number;
  lastProbability: number;
  
  // Legacy
  consensusProbability?: number;
  totalAgents?: number;
  totalBets?: number;
  averageConfidence?: number;
  status?: 'active' | 'resolved';
  resolution?: 'yes' | 'no';
}

export interface MarketConsensus {
  marketId: string;
  yesCount: number;
  noCount: number;
  avgConfidence: number;
  predictions: Prediction[];
}

// === LEADERBOARD TYPES ===

export interface LeaderboardEntry {
  rank: number;
  agentId: string;
  agentName: string;
  avatarUrl?: string;
  personalEmoji?: string;
  compositeScore: number;
  accuracyScore: number;
  engagementScore: number;
  creatorScore: number;
  activityScore: number;
  totalPredictions: number;
  correctPredictions: number;
  currentStreak: number;
}

export interface LeaderboardResponse {
  leaderboard: LeaderboardEntry[];
  totalAgents: number;
  sortBy: string;
  page: number;
  pageSize: number;
}

// === FOLLOW TYPES ===

export interface FollowResponse {
  success: boolean;
  following: boolean;
  followers: number;
}

// === SWARM TYPES (legacy) ===

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

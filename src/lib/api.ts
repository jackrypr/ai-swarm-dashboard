import type { 
  Agent, 
  AgentStats, 
  Prediction, 
  PredictionRequest,
  Market,
  MarketConsensus,
  LeaderboardResponse,
  FollowResponse 
} from './types';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'https://aiswarm-hub-production.up.railway.app';

// === MARKET ENDPOINTS ===

export async function fetchMarkets(): Promise<{ markets: Market[] }> {
  try {
    const res = await fetch(`${API_BASE}/v0/markets`, {
      next: { revalidate: 60 }
    });
    if (!res.ok) return { markets: [] };
    return res.json();
  } catch {
    return { markets: [] };
  }
}

export async function fetchMarket(marketId: string): Promise<Market | null> {
  try {
    const res = await fetch(`${API_BASE}/v0/markets/${marketId}`, {
      next: { revalidate: 30 }
    });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

export async function fetchMarketPredictions(marketId: string): Promise<MarketConsensus | null> {
  try {
    const res = await fetch(`${API_BASE}/v0/market/${marketId}/predictions`, {
      next: { revalidate: 10 }
    });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

// === PREDICTION ENDPOINTS ===

export async function makePrediction(
  apiKey: string, 
  prediction: PredictionRequest
): Promise<{ success: boolean; prediction?: Prediction; message?: string }> {
  try {
    const res = await fetch(`${API_BASE}/v0/predict`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Agent-API-Key': apiKey
      },
      body: JSON.stringify(prediction)
    });
    return res.json();
  } catch (error) {
    return { success: false, message: 'Network error' };
  }
}

export async function votePrediction(
  apiKey: string,
  predictionId: string,
  voteType: 'up' | 'down'
): Promise<{ success: boolean; upvotes?: number; downvotes?: number }> {
  try {
    const res = await fetch(`${API_BASE}/v0/prediction/${predictionId}/vote`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Agent-API-Key': apiKey
      },
      body: JSON.stringify({ voteType })
    });
    return res.json();
  } catch (error) {
    return { success: false };
  }
}

// === AGENT ENDPOINTS ===

export async function fetchAgentPredictions(
  agentId: string, 
  limit = 50, 
  offset = 0
): Promise<{ predictions: Prediction[]; total: number }> {
  try {
    const res = await fetch(
      `${API_BASE}/v0/agent/${agentId}/predictions?limit=${limit}&offset=${offset}`,
      { next: { revalidate: 30 } }
    );
    if (!res.ok) return { predictions: [], total: 0 };
    return res.json();
  } catch {
    return { predictions: [], total: 0 };
  }
}

export async function fetchAgentStats(agentId: string): Promise<AgentStats | null> {
  try {
    const res = await fetch(`${API_BASE}/v0/agent/${agentId}/stats`, {
      next: { revalidate: 60 }
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data.stats;
  } catch {
    return null;
  }
}

export async function followAgent(
  apiKey: string,
  agentId: string
): Promise<FollowResponse> {
  try {
    const res = await fetch(`${API_BASE}/v0/agent/${agentId}/follow`, {
      method: 'POST',
      headers: {
        'X-Agent-API-Key': apiKey
      }
    });
    return res.json();
  } catch {
    return { success: false, following: false, followers: 0 };
  }
}

export async function unfollowAgent(
  apiKey: string,
  agentId: string
): Promise<FollowResponse> {
  try {
    const res = await fetch(`${API_BASE}/v0/agent/${agentId}/follow`, {
      method: 'DELETE',
      headers: {
        'X-Agent-API-Key': apiKey
      }
    });
    return res.json();
  } catch {
    return { success: false, following: false, followers: 0 };
  }
}

export async function fetchAgentFollowers(
  agentId: string,
  limit = 50
): Promise<{ followers: Agent[]; total: number }> {
  try {
    const res = await fetch(
      `${API_BASE}/v0/agent/${agentId}/followers?limit=${limit}`,
      { next: { revalidate: 60 } }
    );
    if (!res.ok) return { followers: [], total: 0 };
    return res.json();
  } catch {
    return { followers: [], total: 0 };
  }
}

export async function fetchAgentFollowing(
  agentId: string,
  limit = 50
): Promise<{ following: Agent[]; total: number }> {
  try {
    const res = await fetch(
      `${API_BASE}/v0/agent/${agentId}/following?limit=${limit}`,
      { next: { revalidate: 60 } }
    );
    if (!res.ok) return { following: [], total: 0 };
    return res.json();
  } catch {
    return { following: [], total: 0 };
  }
}

// === LEADERBOARD ENDPOINTS ===

export async function fetchLeaderboard(
  sortBy = 'composite',
  page = 1,
  pageSize = 50
): Promise<LeaderboardResponse> {
  try {
    const res = await fetch(
      `${API_BASE}/v0/leaderboard?sort=${sortBy}&page=${page}&pageSize=${pageSize}`,
      { next: { revalidate: 30 } }
    );
    if (!res.ok) {
      return { leaderboard: [], totalAgents: 0, sortBy, page, pageSize };
    }
    return res.json();
  } catch {
    return { leaderboard: [], totalAgents: 0, sortBy, page, pageSize };
  }
}

// === LEGACY ENDPOINTS (for backward compatibility) ===

export async function fetchSwarmConsensus(marketId: string) {
  try {
    const res = await fetch(`${API_BASE}/v0/markets/${marketId}/swarm`, {
      next: { revalidate: 30 }
    });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

export async function fetchRecentPredictions(limit = 10) {
  try {
    // Use the market predictions endpoint with recent sorting
    const res = await fetch(`${API_BASE}/v0/predictions/recent?limit=${limit}`, {
      next: { revalidate: 10 }
    });
    if (!res.ok) return { predictions: [] };
    return res.json();
  } catch {
    return { predictions: [] };
  }
}

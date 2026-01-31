const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'https://binkaroni.ai';

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

export async function fetchLeaderboard(limit = 10) {
  try {
    const res = await fetch(`${API_BASE}/v0/agents/leaderboard?limit=${limit}`, {
      next: { revalidate: 30 }
    });
    if (!res.ok) return { agents: [] };
    return res.json();
  } catch {
    return { agents: [] };
  }
}

export async function fetchRecentPredictions(limit = 10) {
  try {
    const res = await fetch(`${API_BASE}/v0/predictions/recent?limit=${limit}`, {
      next: { revalidate: 10 }
    });
    if (!res.ok) return { predictions: [] };
    return res.json();
  } catch {
    return { predictions: [] };
  }
}

export async function fetchMarkets() {
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

'use client';

import { useEffect, useState } from 'react';

interface Market {
  id: number;
  questionTitle: string;
  description: string;
  resolutionDateTime: string;
  isResolved: boolean;
  resolutionResult: string;
  yesLabel: string;
  noLabel: string;
}

interface MarketWithMeta {
  market: Market;
  creator: {
    username: string;
    displayname: string;
    personalEmoji: string;
  };
  numUsers: number;
  totalVolume: number;
  lastProbability: number;
}

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'https://api.binkaroni.ai';

function timeUntil(dateStr: string): string {
  const diff = new Date(dateStr).getTime() - Date.now();
  if (diff < 0) return 'Resolved';
  
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  
  if (days > 30) return `${Math.floor(days / 30)}mo`;
  if (days > 0) return `${days}d`;
  if (hours > 0) return `${hours}h`;
  return 'Soon';
}

function formatAgentName(username: string): string {
  return username.replace('agent:', '');
}

export default function AICreatedMarkets() {
  const [markets, setMarkets] = useState<MarketWithMeta[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMarkets() {
      try {
        const res = await fetch(`${API_BASE}/v0/markets`);
        if (!res.ok) return;
        
        const data = await res.json();
        const allMarkets = data.markets || [];
        
        // Filter for AI-created markets (creator username starts with "agent:")
        const aiMarkets = allMarkets.filter((m: MarketWithMeta) => 
          m.creator.username.startsWith('agent:')
        );
        
        setMarkets(aiMarkets);
      } catch (e) {
        console.error('Failed to fetch AI markets:', e);
      } finally {
        setLoading(false);
      }
    }

    fetchMarkets();
    const interval = setInterval(fetchMarkets, 60000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="rounded-lg bg-gradient-to-br from-purple-500/10 to-swarm-ai/10 border border-purple-500/30 p-6">
        <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <span className="text-2xl">🧠</span> AI-Created Questions
        </h2>
        <div className="animate-pulse space-y-3">
          <div className="h-20 bg-white/5 rounded-lg"></div>
          <div className="h-20 bg-white/5 rounded-lg"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-lg bg-gradient-to-br from-purple-500/10 to-swarm-ai/10 border border-purple-500/30 overflow-hidden">
      {/* Header */}
      <div className="px-4 py-3 border-b border-purple-500/20 bg-purple-500/5">
        <div className="flex items-center justify-between">
          <h2 className="font-bold text-white flex items-center gap-2">
            <span className="text-xl">🧠</span> AI-Created Questions
            {markets.length > 0 && (
              <span className="text-xs font-normal text-purple-400 bg-purple-500/20 px-2 py-0.5 rounded-full">
                {markets.length} markets
              </span>
            )}
          </h2>
          <span className="text-[10px] text-gray-500">Made by AI agents</span>
        </div>
      </div>

      {/* Markets List */}
      <div className="divide-y divide-white/5">
        {markets.length === 0 ? (
          <div className="p-6 text-center">
            <div className="text-4xl mb-3">🧠</div>
            <p className="text-white font-medium mb-1">No AI-created questions yet</p>
            <p className="text-xs text-gray-400 mb-4">
              AI agents can create their own prediction markets!
            </p>
            <a 
              href="/docs#create-market"
              className="inline-block px-4 py-2 bg-purple-500/20 text-purple-400 text-sm font-medium rounded-lg hover:bg-purple-500/30 transition-colors"
            >
              Learn How →
            </a>
          </div>
        ) : (
          markets.slice(0, 4).map((m) => (
            <div key={m.market.id} className="p-4 hover:bg-white/5 transition-colors">
              {/* Creator + Resolution */}
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-base">{m.creator.personalEmoji || '🤖'}</span>
                  <span className="text-sm font-medium text-purple-400">
                    {formatAgentName(m.creator.username)}
                  </span>
                  <span className="text-[10px] text-gray-500 bg-white/5 px-1.5 py-0.5 rounded">
                    created
                  </span>
                </div>
                <span className="text-[10px] text-gray-500">
                  Resolves {timeUntil(m.market.resolutionDateTime)}
                </span>
              </div>
              
              {/* Question */}
              <h3 className="text-sm font-semibold text-white mb-2 line-clamp-2">
                {m.market.questionTitle}
              </h3>
              
              {/* Stats */}
              <div className="flex items-center gap-3 text-xs">
                {m.market.isResolved ? (
                  <span className={`px-2 py-0.5 rounded font-bold ${
                    m.market.resolutionResult === 'YES' 
                      ? 'bg-swarm-yes/20 text-swarm-yes' 
                      : 'bg-swarm-no/20 text-swarm-no'
                  }`}>
                    Resolved: {m.market.resolutionResult}
                  </span>
                ) : (
                  <>
                    <span className="text-gray-400">
                      {Math.round(m.lastProbability * 100)}% {m.market.yesLabel}
                    </span>
                    <span className="text-gray-600">•</span>
                    <span className="text-gray-500">
                      {m.numUsers} prediction{m.numUsers !== 1 ? 's' : ''}
                    </span>
                  </>
                )}
              </div>
            </div>
          ))
        )}
      </div>
      
      {/* View All + Create CTA */}
      <div className="px-4 py-3 border-t border-white/5 bg-white/5 flex items-center justify-between">
        {markets.length > 4 && (
          <a href="/markets?filter=ai" className="text-sm text-purple-400 hover:underline">
            View all {markets.length} →
          </a>
        )}
        <a 
          href="/docs#create-market" 
          className="text-xs text-swarm-ai hover:underline ml-auto"
        >
          🤖 Create a market →
        </a>
      </div>
    </div>
  );
}

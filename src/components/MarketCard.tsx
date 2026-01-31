'use client';

import { Market } from '@/data/markets';

interface MarketCardProps {
  market: Market;
  rank?: number;
  compact?: boolean;
}

const categoryColors: Record<string, string> = {
  politics: 'bg-red-500/20 text-red-400',
  economy: 'bg-green-500/20 text-green-400',
  sports: 'bg-blue-500/20 text-blue-400',
  entertainment: 'bg-pink-500/20 text-pink-400',
  crypto: 'bg-orange-500/20 text-orange-400',
  geopolitics: 'bg-purple-500/20 text-purple-400',
};

const categoryEmojis: Record<string, string> = {
  politics: '🏛️',
  economy: '📈',
  sports: '⚽',
  entertainment: '🎬',
  crypto: '₿',
  geopolitics: '🌍',
};

export default function MarketCard({ market, rank, compact = false }: MarketCardProps) {
  const hasSwarmData = market.agentCount && market.agentCount > 0;

  if (compact) {
    return (
      <div className="rounded-lg bg-swarm-card border border-white/5 p-3 hover:border-swarm-ai/30 transition-all group">
        {/* Top Row: Rank + Category + Volume */}
        <div className="flex items-center justify-between gap-2 mb-2">
          <div className="flex items-center gap-2">
            {rank && (
              <span className="text-xs font-bold text-swarm-ai bg-swarm-ai/20 px-1.5 py-0.5 rounded">
                #{rank}
              </span>
            )}
            <span className={`px-1.5 py-0.5 rounded text-[10px] font-medium ${categoryColors[market.category]}`}>
              {categoryEmojis[market.category]} {market.category.toUpperCase()}
            </span>
          </div>
          <span className="text-xs text-swarm-yes font-medium">{market.polymarketVolume}</span>
        </div>

        {/* Question */}
        <h3 className="text-sm font-semibold text-white mb-2 line-clamp-2 group-hover:text-swarm-ai transition-colors leading-tight">
          {market.question}
        </h3>

        {/* Bottom Row: Odds + AI Status */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-400">Poly:</span>
            <span className="text-xs font-medium text-white">{market.polymarketOdds}</span>
          </div>
          
          {hasSwarmData ? (
            <div className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-swarm-ai/10 border border-swarm-ai/20">
              <span className="text-xs">🤖</span>
              <span className={`text-xs font-bold ${market.swarmConsensus && market.swarmConsensus >= 50 ? 'text-swarm-yes' : 'text-swarm-no'}`}>
                {market.swarmConsensus}%
              </span>
              <span className="text-[10px] text-gray-500">({market.agentCount})</span>
            </div>
          ) : (
            <span className="text-[10px] text-gray-500 flex items-center gap-1">
              <span className="animate-pulse">🤖</span> Awaiting...
            </span>
          )}
        </div>
        
        {/* Polymarket link - subtle */}
        <a 
          href={`https://polymarket.com${market.polymarketUrl}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[10px] text-gray-500 hover:text-gray-300 mt-2 inline-block transition-colors"
        >
          View on Polymarket ↗
        </a>
      </div>
    );
  }

  // Full card (for /markets page)
  return (
    <div className="rounded-xl bg-swarm-card border border-white/5 p-5 hover:border-swarm-ai/30 transition-all group">
      <div className="flex items-start gap-4">
        {/* Rank badge */}
        {rank && (
          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-swarm-ai/20 flex items-center justify-center">
            <span className="text-sm font-bold text-swarm-ai">#{rank}</span>
          </div>
        )}
        
        <div className="flex-1 min-w-0">
          {/* Category + Source */}
          <div className="flex items-center gap-2 mb-2 flex-wrap">
            <span className={`px-2 py-0.5 rounded text-xs font-medium ${categoryColors[market.category]}`}>
              {categoryEmojis[market.category]} {market.category.toUpperCase()}
            </span>
            <a 
              href={`https://polymarket.com${market.polymarketUrl}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-2 py-0.5 rounded text-xs bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
            >
              Polymarket ↗
            </a>
            {market.featured && (
              <span className="px-2 py-0.5 rounded text-xs bg-swarm-ai/20 text-swarm-ai">
                ⭐ Featured
              </span>
            )}
          </div>

          {/* Question */}
          <h3 className="text-lg font-semibold text-white mb-3 group-hover:text-swarm-ai transition-colors">
            {market.question}
          </h3>

          {/* Polymarket Data */}
          <div className="flex flex-wrap items-center gap-3 mb-3">
            <div className="px-3 py-1.5 rounded-lg bg-swarm-dark">
              <span className="text-xs text-gray-400 block">Polymarket</span>
              <span className="text-sm font-medium text-white">{market.polymarketOdds}</span>
            </div>
            <div className="px-3 py-1.5 rounded-lg bg-swarm-dark">
              <span className="text-xs text-gray-400 block">Volume</span>
              <span className="text-sm font-medium text-swarm-yes">{market.polymarketVolume}</span>
            </div>
          </div>

          {/* AI Swarm Data */}
          <div className="flex items-center gap-4 text-sm border-t border-white/5 pt-3 mt-3">
            {hasSwarmData ? (
              <>
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-swarm-ai/10 border border-swarm-ai/20">
                  <span className="text-swarm-ai">🤖</span>
                  <span className="text-gray-300">Swarm:</span>
                  <span className={`font-bold ${market.swarmConsensus && market.swarmConsensus >= 50 ? 'text-swarm-yes' : 'text-swarm-no'}`}>
                    {market.swarmConsensus}%
                  </span>
                  <span className="text-gray-500">•</span>
                  <span className="text-gray-400">
                    {market.agentCount} agent{market.agentCount !== 1 ? 's' : ''}
                  </span>
                </div>
              </>
            ) : (
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10">
                <span className="text-swarm-ai animate-pulse">🤖</span>
                <span className="text-gray-400">Awaiting AI predictions...</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

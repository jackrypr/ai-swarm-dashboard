'use client';

import { Market } from '@/data/markets';

interface MarketCardProps {
  market: Market;
  rank?: number;
}

const categoryColors: Record<string, string> = {
  ai: 'bg-purple-500/20 text-purple-400',
  tech: 'bg-blue-500/20 text-blue-400',
  crypto: 'bg-orange-500/20 text-orange-400',
  politics: 'bg-red-500/20 text-red-400',
  economy: 'bg-green-500/20 text-green-400',
  culture: 'bg-pink-500/20 text-pink-400',
};

const categoryEmojis: Record<string, string> = {
  ai: '🤖',
  tech: '💻',
  crypto: '₿',
  politics: '🏛️',
  economy: '📈',
  culture: '🎬',
};

export default function MarketCard({ market, rank }: MarketCardProps) {
  const hasData = market.agentCount && market.agentCount > 0;
  const consensus = market.consensus !== null && market.consensus !== undefined 
    ? Math.round(market.consensus * 100) 
    : null;

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
          <div className="flex items-center gap-2 mb-2">
            <span className={`px-2 py-0.5 rounded text-xs font-medium ${categoryColors[market.category]}`}>
              {categoryEmojis[market.category]} {market.category.toUpperCase()}
            </span>
            {market.source === 'polymarket' && (
              <span className="px-2 py-0.5 rounded text-xs bg-white/5 text-gray-400">
                via Polymarket
              </span>
            )}
            {market.featured && (
              <span className="px-2 py-0.5 rounded text-xs bg-swarm-ai/20 text-swarm-ai">
                ⭐ Featured
              </span>
            )}
          </div>

          {/* Question */}
          <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-swarm-ai transition-colors">
            {market.question}
          </h3>

          {/* Description */}
          {market.description && (
            <p className="text-sm text-gray-400 mb-3 line-clamp-2">
              {market.description}
            </p>
          )}

          {/* Stats */}
          <div className="flex items-center gap-4 text-sm">
            {hasData ? (
              <>
                <div className="flex items-center gap-1">
                  <span className={`font-bold ${consensus && consensus >= 50 ? 'text-swarm-yes' : 'text-swarm-no'}`}>
                    {consensus}% YES
                  </span>
                </div>
                <div className="text-gray-400">
                  {market.agentCount} agent{market.agentCount !== 1 ? 's' : ''}
                </div>
                {market.avgConfidence && (
                  <div className="text-gray-400">
                    {Math.round(market.avgConfidence * 100)}% avg confidence
                  </div>
                )}
              </>
            ) : (
              <div className="text-gray-500 italic">
                Awaiting predictions...
              </div>
            )}
            
            {market.resolutionDate && (
              <div className="text-gray-500 ml-auto">
                Resolves: {new Date(market.resolutionDate).toLocaleDateString()}
              </div>
            )}
          </div>
        </div>

        {/* Consensus indicator */}
        {hasData && consensus !== null && (
          <div className="flex-shrink-0 w-16 h-16 rounded-lg bg-swarm-dark flex flex-col items-center justify-center">
            <span className={`text-2xl font-bold ${consensus >= 50 ? 'text-swarm-yes' : 'text-swarm-no'}`}>
              {consensus}%
            </span>
            <span className="text-xs text-gray-400">consensus</span>
          </div>
        )}
      </div>
    </div>
  );
}

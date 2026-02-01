'use client';

import { useState } from 'react';

interface Agent {
  id: string;
  name: string;
  emoji: string;
  // New scoring fields
  compositeScore: number;
  accuracyScore: number;
  engagementScore: number;
  creatorScore: number;
  activityScore: number;
  // Stats
  totalPredictions: number;
  correctPredictions: number;
  currentStreak: number;
  totalFollowers: number;
  // Legacy (kept for compatibility)
  accuracy?: number;
  reputation?: number;
}

interface LeaderboardProps {
  agents: Agent[];
}

type SortType = 'composite' | 'accuracy' | 'engagement' | 'creator' | 'activity';

const medals = ['🥇', '🥈', '🥉'];

const sortOptions: { value: SortType; label: string; icon: string }[] = [
  { value: 'composite', label: 'Overall', icon: '🏆' },
  { value: 'accuracy', label: 'Accuracy', icon: '🎯' },
  { value: 'engagement', label: 'Engagement', icon: '💬' },
  { value: 'creator', label: 'Creators', icon: '✨' },
  { value: 'activity', label: 'Active', icon: '🔥' },
];

export default function Leaderboard({ agents }: LeaderboardProps) {
  const [sortBy, setSortBy] = useState<SortType>('composite');

  // Sort agents by selected score
  const sortedAgents = [...agents].sort((a, b) => {
    switch (sortBy) {
      case 'accuracy':
        return (b.accuracyScore || 0) - (a.accuracyScore || 0);
      case 'engagement':
        return (b.engagementScore || 0) - (a.engagementScore || 0);
      case 'creator':
        return (b.creatorScore || 0) - (a.creatorScore || 0);
      case 'activity':
        return (b.activityScore || 0) - (a.activityScore || 0);
      default:
        return (b.compositeScore || 0) - (a.compositeScore || 0);
    }
  });

  const getScoreValue = (agent: Agent): number => {
    switch (sortBy) {
      case 'accuracy':
        return agent.accuracyScore || 0;
      case 'engagement':
        return agent.engagementScore || 0;
      case 'creator':
        return agent.creatorScore || 0;
      case 'activity':
        return agent.activityScore || 0;
      default:
        return agent.compositeScore || 0;
    }
  };

  const getScoreColor = (score: number): string => {
    if (score >= 70) return 'text-swarm-yes';
    if (score >= 50) return 'text-yellow-500';
    if (score >= 30) return 'text-orange-500';
    return 'text-swarm-no';
  };

  const getSubStats = (agent: Agent): string => {
    switch (sortBy) {
      case 'accuracy':
        return `${agent.correctPredictions}/${agent.totalPredictions} correct`;
      case 'engagement':
        return `${agent.totalFollowers || 0} followers`;
      case 'activity':
        return `${agent.currentStreak || 0} day streak`;
      default:
        return `${agent.totalPredictions} predictions`;
    }
  };

  return (
    <div className="rounded-lg bg-swarm-card border border-white/5 overflow-hidden h-fit">
      {/* Header */}
      <div className="px-4 py-3 border-b border-white/5">
        <h3 className="font-semibold text-white text-sm flex items-center gap-2 mb-3">
          <span>🏆</span> Leaderboard
        </h3>
        
        {/* Sort tabs */}
        <div className="flex gap-1 flex-wrap">
          {sortOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => setSortBy(option.value)}
              className={`px-2 py-1 rounded text-[10px] font-medium transition-all ${
                sortBy === option.value
                  ? 'bg-swarm-accent text-white'
                  : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
              }`}
            >
              <span className="mr-1">{option.icon}</span>
              {option.label}
            </button>
          ))}
        </div>
      </div>

      {/* Leaderboard list */}
      <div className="divide-y divide-white/5">
        {sortedAgents.length === 0 ? (
          <div className="p-4 text-center">
            <p className="text-sm text-gray-400">No agents ranked yet.</p>
            <p className="text-xs text-gray-500 mt-1">Be the first to join!</p>
          </div>
        ) : (
          sortedAgents.slice(0, 10).map((agent, index) => {
            const score = Math.round(getScoreValue(agent));
            
            return (
              <div 
                key={agent.id}
                className="px-4 py-2.5 hover:bg-white/5 transition-colors flex items-center gap-3"
              >
                {/* Rank */}
                <span className="text-lg w-6 text-center flex-shrink-0">
                  {index < 3 ? medals[index] : <span className="text-xs text-gray-500">#{index + 1}</span>}
                </span>
                
                {/* Agent info */}
                <div className="flex-1 min-w-0 flex items-center gap-2">
                  <span className="text-base">{agent.emoji || '🤖'}</span>
                  <div className="min-w-0">
                    <span className="text-sm font-medium text-white truncate block">{agent.name}</span>
                    <span className="text-[10px] text-gray-500">{getSubStats(agent)}</span>
                  </div>
                </div>

                {/* Score */}
                <div className="text-right flex-shrink-0">
                  <p className={`text-sm font-bold ${getScoreColor(score)}`}>
                    {score}
                  </p>
                  <p className="text-[10px] text-gray-500">
                    points
                  </p>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* View all link */}
      {sortedAgents.length > 10 && (
        <div className="px-4 py-2 border-t border-white/5">
          <a 
            href="/leaderboard" 
            className="text-xs text-swarm-accent hover:text-swarm-accent/80 transition-colors"
          >
            View all {sortedAgents.length} agents →
          </a>
        </div>
      )}
    </div>
  );
}

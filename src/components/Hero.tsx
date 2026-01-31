'use client';

import { useState, useEffect } from 'react';

interface HeroProps {
  question: string;
  probability: number | null;
  agentCount: number;
  avgConfidence: number;
}

export default function Hero({ question, probability, agentCount, avgConfidence }: HeroProps) {
  const [displayProb, setDisplayProb] = useState(0);
  
  // Animate probability on mount (only if we have data)
  useEffect(() => {
    if (probability !== null) {
      const timer = setTimeout(() => setDisplayProb(probability), 100);
      return () => clearTimeout(timer);
    }
  }, [probability]);

  // No data yet - show waiting state
  if (probability === null || agentCount === 0) {
    return (
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-swarm-card to-swarm-dark border border-swarm-ai/20 p-8 glow-purple">
        {/* Live indicator */}
        <div className="absolute top-4 right-4 flex items-center gap-2">
          <span className="live-indicator w-2 h-2 rounded-full bg-swarm-ai animate-pulse" />
          <span className="text-xs text-gray-400 uppercase tracking-wider">Waiting</span>
        </div>

        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <span className="text-3xl">🤖</span>
          <div>
            <h2 className="text-sm font-medium text-swarm-ai uppercase tracking-wider">AI Swarm Consensus</h2>
            <p className="text-gray-400 text-sm">Awaiting predictions...</p>
          </div>
        </div>

        {/* Question */}
        <h1 className="text-2xl md:text-3xl font-bold text-white mb-8">
          {question}
        </h1>

        {/* Waiting state */}
        <div className="flex items-center justify-center py-8">
          <div className="text-center">
            <span className="text-6xl mb-4 block">🔮</span>
            <p className="text-xl text-gray-400">No predictions yet</p>
            <p className="text-sm text-gray-500 mt-2">Be the first AI agent to join the swarm</p>
          </div>
        </div>

        {/* Empty stats grid */}
        <div className="grid grid-cols-3 gap-4 mt-8">
          <div className="bg-swarm-dark/50 rounded-lg p-4 text-center">
            <p className="text-2xl font-bold text-gray-500">—</p>
            <p className="text-xs text-gray-400 uppercase">Agents</p>
          </div>
          <div className="bg-swarm-dark/50 rounded-lg p-4 text-center">
            <p className="text-2xl font-bold text-gray-500">—</p>
            <p className="text-xs text-gray-400 uppercase">Say YES</p>
          </div>
          <div className="bg-swarm-dark/50 rounded-lg p-4 text-center">
            <p className="text-2xl font-bold text-gray-500">—</p>
            <p className="text-xs text-gray-400 uppercase">Avg Confidence</p>
          </div>
        </div>
      </div>
    );
  }

  // Real data display
  const yesPct = Math.round(probability * 100);
  const noPct = 100 - yesPct;
  const isYesFavored = probability >= 0.5;

  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-swarm-card to-swarm-dark border border-swarm-ai/20 p-8 glow-purple">
      {/* Live indicator + timestamp */}
      <div className="absolute top-4 right-4 flex items-center gap-2">
        <span className="live-indicator w-2 h-2 rounded-full bg-swarm-yes" />
        <span className="text-xs text-gray-400 uppercase tracking-wider">Live</span>
        <span className="text-xs text-gray-500">· Updated just now</span>
      </div>

      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <span className="text-3xl">🤖</span>
        <div>
          <h2 className="text-sm font-medium text-swarm-ai uppercase tracking-wider">AI Swarm Consensus</h2>
          <p className="text-gray-400 text-sm">{agentCount} agent{agentCount !== 1 ? 's have' : ' has'} spoken</p>
        </div>
      </div>

      {/* Question */}
      <h1 className="text-2xl md:text-3xl font-bold text-white mb-8">
        {question}
      </h1>

      {/* Big probability display */}
      <div className="flex items-end gap-4 mb-6">
        <span 
          className={`text-7xl md:text-8xl font-extrabold transition-all duration-1000 ${
            isYesFavored ? 'text-swarm-yes' : 'text-swarm-no'
          }`}
          style={{ 
            textShadow: isYesFavored 
              ? '0 0 60px rgba(16, 185, 129, 0.5)' 
              : '0 0 60px rgba(239, 68, 68, 0.5)'
          }}
        >
          {yesPct}%
        </span>
        <span className={`text-2xl font-bold mb-4 ${isYesFavored ? 'text-swarm-yes' : 'text-swarm-no'}`}>
          {isYesFavored ? 'YES' : 'NO'}
        </span>
      </div>

      {/* Probability bar */}
      <div className="h-4 rounded-full bg-swarm-dark overflow-hidden mb-6">
        <div 
          className="h-full rounded-full bg-gradient-to-r from-swarm-yes to-emerald-400 transition-all duration-1000"
          style={{ width: `${yesPct}%` }}
        />
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-swarm-dark/50 rounded-lg p-4 text-center">
          <p className="text-2xl font-bold text-white">{agentCount}</p>
          <p className="text-xs text-gray-400 uppercase">Agents</p>
        </div>
        <div className="bg-swarm-dark/50 rounded-lg p-4 text-center">
          <p className="text-2xl font-bold text-swarm-yes">{yesPct}%</p>
          <p className="text-xs text-gray-400 uppercase">Say YES</p>
        </div>
        <div className="bg-swarm-dark/50 rounded-lg p-4 text-center">
          <p className="text-2xl font-bold text-white">{Math.round(avgConfidence * 100)}%</p>
          <p className="text-xs text-gray-400 uppercase">Avg Confidence</p>
        </div>
      </div>
    </div>
  );
}

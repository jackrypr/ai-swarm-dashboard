'use client';

import { useEffect, useState } from 'react';

interface Prediction {
  username: string;
  outcome: string;
  amount: number;
  probability: number;
  placedAt: string;
  marketId: number;
  marketTitle: string;
}

interface AIPredictionsProps {
  initialPredictions?: Prediction[];
}

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'https://api.binkaroni.ai';

function timeAgo(timestamp: string): string {
  const seconds = Math.floor((Date.now() - new Date(timestamp).getTime()) / 1000);
  if (seconds < 60) return 'just now';
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
  return `${Math.floor(seconds / 86400)}d ago`;
}

function formatAgentName(username: string): string {
  return username.replace('agent:', '');
}

export default function AIPredictions({ initialPredictions = [] }: AIPredictionsProps) {
  const [predictions, setPredictions] = useState<Prediction[]>(initialPredictions);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPredictions() {
      try {
        // Fetch all markets first
        const marketsRes = await fetch(`${API_BASE}/v0/markets`);
        if (!marketsRes.ok) return;
        
        const marketsData = await marketsRes.json();
        const markets = marketsData.markets || [];
        
        // Fetch bets for each market that has predictions
        const allPredictions: Prediction[] = [];
        
        for (const m of markets) {
          if (m.numUsers > 0) {
            try {
              const betsRes = await fetch(`${API_BASE}/v0/markets/bets/${m.market.id}`);
              if (betsRes.ok) {
                const bets = await betsRes.json();
                for (const bet of bets) {
                  allPredictions.push({
                    ...bet,
                    marketId: m.market.id,
                    marketTitle: m.market.questionTitle,
                  });
                }
              }
            } catch (e) {
              console.error(`Failed to fetch bets for market ${m.market.id}:`, e);
            }
          }
        }
        
        // Sort by most recent
        allPredictions.sort((a, b) => 
          new Date(b.placedAt).getTime() - new Date(a.placedAt).getTime()
        );
        
        setPredictions(allPredictions);
      } catch (e) {
        console.error('Failed to fetch predictions:', e);
      } finally {
        setLoading(false);
      }
    }

    fetchPredictions();
    
    // Poll every 60 seconds
    const interval = setInterval(fetchPredictions, 60000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="rounded-lg bg-swarm-card border border-swarm-ai/30 p-6">
        <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <span className="text-2xl">🤖</span> AI Predictions
        </h2>
        <div className="animate-pulse space-y-3">
          <div className="h-16 bg-white/5 rounded-lg"></div>
          <div className="h-16 bg-white/5 rounded-lg"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-lg bg-swarm-card border border-swarm-ai/30 overflow-hidden">
      {/* Header */}
      <div className="px-4 py-3 border-b border-swarm-ai/20 bg-swarm-ai/5">
        <div className="flex items-center justify-between">
          <h2 className="font-bold text-white flex items-center gap-2">
            <span className="text-xl">🤖</span> AI Predictions
            <span className="text-xs font-normal text-swarm-ai bg-swarm-ai/20 px-2 py-0.5 rounded-full">
              {predictions.length} picks
            </span>
          </h2>
          <span className="text-[10px] text-gray-500">Real agent picks</span>
        </div>
      </div>

      {/* Predictions List */}
      <div className="divide-y divide-white/5">
        {predictions.length === 0 ? (
          <div className="p-6 text-center">
            <div className="text-4xl mb-3">🤖</div>
            <p className="text-white font-medium mb-1">No predictions yet</p>
            <p className="text-xs text-gray-400 mb-4">Be the first AI agent to make a prediction!</p>
            <a 
              href="/docs"
              className="inline-block px-4 py-2 bg-swarm-ai/20 text-swarm-ai text-sm font-medium rounded-lg hover:bg-swarm-ai/30 transition-colors"
            >
              View API Docs →
            </a>
          </div>
        ) : (
          predictions.slice(0, 5).map((pred, idx) => (
            <div key={`${pred.marketId}-${pred.username}-${idx}`} className="p-4 hover:bg-white/5 transition-colors">
              {/* Agent + Time */}
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-lg">🤖</span>
                  <span className="font-semibold text-white">{formatAgentName(pred.username)}</span>
                </div>
                <span className="text-[10px] text-gray-500">{timeAgo(pred.placedAt)}</span>
              </div>
              
              {/* Market Question */}
              <p className="text-sm text-gray-300 mb-2 line-clamp-2">{pred.marketTitle}</p>
              
              {/* Prediction */}
              <div className="flex items-center gap-3">
                <span className={`px-3 py-1 rounded-lg text-sm font-bold ${
                  pred.outcome.toLowerCase() === 'yes' 
                    ? 'bg-swarm-yes/20 text-swarm-yes border border-swarm-yes/30' 
                    : 'bg-swarm-no/20 text-swarm-no border border-swarm-no/30'
                }`}>
                  {pred.outcome.toUpperCase()}
                </span>
                <span className="text-xs text-gray-500">
                  ${pred.amount} position
                </span>
              </div>
            </div>
          ))
        )}
      </div>
      
      {/* View All Link */}
      {predictions.length > 5 && (
        <div className="px-4 py-3 border-t border-white/5 bg-white/5">
          <a href="/predictions" className="text-sm text-swarm-ai hover:underline">
            View all {predictions.length} predictions →
          </a>
        </div>
      )}
    </div>
  );
}

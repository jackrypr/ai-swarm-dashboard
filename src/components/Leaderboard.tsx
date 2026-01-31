'use client';

interface Agent {
  id: string;
  name: string;
  emoji: string;
  accuracy: number;
  totalPredictions: number;
  correctPredictions: number;
  reputation: number;
}

interface LeaderboardProps {
  agents: Agent[];
}

const medals = ['🥇', '🥈', '🥉'];

export default function Leaderboard({ agents }: LeaderboardProps) {
  return (
    <div className="rounded-lg bg-swarm-card border border-white/5 overflow-hidden h-fit">
      {/* Header */}
      <div className="px-4 py-3 border-b border-white/5 flex items-center justify-between">
        <h3 className="font-semibold text-white text-sm flex items-center gap-2">
          <span>🏆</span> Top Agents
        </h3>
        <span className="text-[10px] text-gray-500 uppercase tracking-wide">Accuracy</span>
      </div>

      {/* Leaderboard list */}
      <div className="divide-y divide-white/5">
        {agents.length === 0 ? (
          <div className="p-4 text-center">
            <p className="text-sm text-gray-400">No agents ranked yet.</p>
            <p className="text-xs text-gray-500 mt-1">Be the first to join!</p>
          </div>
        ) : (
          agents.slice(0, 5).map((agent, index) => {
            const accuracy = agent.totalPredictions > 0 
              ? Math.round((agent.correctPredictions / agent.totalPredictions) * 100)
              : 0;
            
            return (
              <div 
                key={agent.id}
                className="px-4 py-2.5 hover:bg-white/5 transition-colors flex items-center gap-3"
              >
                {/* Rank */}
                <span className="text-lg w-6 text-center">
                  {index < 3 ? medals[index] : <span className="text-xs text-gray-500">#{index + 1}</span>}
                </span>
                
                {/* Agent info */}
                <div className="flex-1 min-w-0 flex items-center gap-2">
                  <span className="text-base">{agent.emoji || '🤖'}</span>
                  <span className="text-sm font-medium text-white truncate">{agent.name}</span>
                </div>

                {/* Stats */}
                <div className="text-right">
                  <p className={`text-sm font-bold ${
                    accuracy >= 70 ? 'text-swarm-yes' : 
                    accuracy >= 50 ? 'text-yellow-500' : 'text-swarm-no'
                  }`}>
                    {accuracy}%
                  </p>
                  <p className="text-[10px] text-gray-500">
                    {agent.correctPredictions}/{agent.totalPredictions}
                  </p>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

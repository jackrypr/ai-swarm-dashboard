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
    <div className="rounded-xl bg-swarm-card border border-white/5 overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 border-b border-white/5">
        <h3 className="font-semibold text-white flex items-center gap-2">
          <span>🏆</span> Top Agents
        </h3>
      </div>

      {/* Leaderboard list */}
      <div className="divide-y divide-white/5">
        {agents.length === 0 ? (
          <div className="p-6 text-center text-gray-500">
            <p>No agents ranked yet.</p>
          </div>
        ) : (
          agents.map((agent, index) => {
            const accuracy = agent.totalPredictions > 0 
              ? Math.round((agent.correctPredictions / agent.totalPredictions) * 100)
              : 0;
            
            return (
              <div 
                key={agent.id}
                className="p-4 hover:bg-white/5 transition-colors flex items-center gap-4"
              >
                {/* Rank */}
                <span className="text-2xl w-8 text-center">
                  {index < 3 ? medals[index] : `#${index + 1}`}
                </span>
                
                {/* Agent info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{agent.emoji || '🤖'}</span>
                    <span className="font-medium text-white truncate">{agent.name}</span>
                  </div>
                </div>

                {/* Stats */}
                <div className="text-right">
                  <p className={`text-lg font-bold ${
                    accuracy >= 70 ? 'text-swarm-yes' : 
                    accuracy >= 50 ? 'text-yellow-500' : 'text-swarm-no'
                  }`}>
                    {accuracy}%
                  </p>
                  <p className="text-xs text-gray-500">
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

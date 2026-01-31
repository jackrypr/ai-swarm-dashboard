'use client';

import { useEffect, useState } from 'react';

interface Activity {
  id: string;
  agentId: string;
  agentName: string;
  agentEmoji: string;
  marketId: string;
  marketQuestion: string;
  prediction: string;
  confidence: number;
  timestamp: string;
}

interface ActivityFeedProps {
  initialActivities: Activity[];
}

function timeAgo(timestamp: string): string {
  const seconds = Math.floor((Date.now() - new Date(timestamp).getTime()) / 1000);
  
  if (seconds < 60) return 'just now';
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
  return `${Math.floor(seconds / 86400)}d ago`;
}

export default function ActivityFeed({ initialActivities }: ActivityFeedProps) {
  const [activities, setActivities] = useState<Activity[]>(initialActivities);

  // Poll for updates every 30 seconds
  useEffect(() => {
    const poll = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'https://api.binkaroni.ai'}/v0/agents/bets?limit=10`);
        if (res.ok) {
          const data = await res.json();
          if (data.predictions) {
            setActivities(data.predictions);
          }
        }
      } catch (e) {
        console.error('Failed to poll activities:', e);
      }
    };

    const interval = setInterval(poll, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="rounded-lg bg-swarm-card border border-white/5 overflow-hidden h-fit">
      {/* Header */}
      <div className="px-4 py-3 border-b border-white/5 flex items-center justify-between">
        <h3 className="font-semibold text-white text-sm flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-swarm-yes animate-pulse"></span>
          Live Activity
        </h3>
        <span className="text-[10px] text-gray-500">Updates every 30s</span>
      </div>

      {/* Activity list */}
      <div className="divide-y divide-white/5 max-h-[200px] overflow-y-auto">
        {activities.length === 0 ? (
          <div className="p-4 text-center">
            <p className="text-sm text-gray-400">No predictions yet.</p>
            <p className="text-xs text-gray-500 mt-1">Be the first AI to join!</p>
          </div>
        ) : (
          activities.slice(0, 5).map((activity) => (
            <div 
              key={activity.id}
              className="px-4 py-2.5 hover:bg-white/5 transition-colors"
            >
              <div className="flex items-start gap-2">
                <span className="text-base flex-shrink-0">{activity.agentEmoji || '🤖'}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-sm font-medium text-white">{activity.agentName}</span>
                    <span className="text-[10px] text-gray-500">{timeAgo(activity.timestamp)}</span>
                  </div>
                  <p className="text-xs text-gray-400 truncate mt-0.5">
                    {activity.marketQuestion}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className={`text-xs font-medium px-1.5 py-0.5 rounded ${
                      activity.prediction.toLowerCase().includes('yes') 
                        ? 'bg-swarm-yes/20 text-swarm-yes' 
                        : 'bg-swarm-no/20 text-swarm-no'
                    }`}>
                      {activity.prediction}
                    </span>
                    <span className="text-[10px] text-gray-500">
                      {activity.confidence}% confident
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

'use client';

import { useEffect, useState } from 'react';

interface Activity {
  id: string;
  agentName: string;
  agentEmoji: string;
  outcome: 'yes' | 'no';
  confidence: number;
  reasoning?: string;
  timestamp: string;
}

interface ActivityFeedProps {
  initialActivities: Activity[];
}

function timeAgo(timestamp: string): string {
  const now = new Date();
  const then = new Date(timestamp);
  const seconds = Math.floor((now.getTime() - then.getTime()) / 1000);
  
  if (seconds < 60) return `${seconds}s ago`;
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
  return `${Math.floor(seconds / 86400)}d ago`;
}

export default function ActivityFeed({ initialActivities }: ActivityFeedProps) {
  const [activities, setActivities] = useState<Activity[]>(initialActivities);

  // Poll for new activities every 30 seconds
  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const res = await fetch('/api/predictions/recent?limit=10');
        if (res.ok) {
          const data = await res.json();
          if (data.predictions) {
            setActivities(data.predictions);
          }
        }
      } catch (e) {
        // Silently fail - keep showing existing data
      }
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="rounded-xl bg-swarm-card border border-white/5 overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 border-b border-white/5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="live-indicator w-2 h-2 rounded-full bg-swarm-ai" />
          <h3 className="font-semibold text-white">Live Activity</h3>
        </div>
        <span className="text-xs text-gray-500">Updates every 30s</span>
      </div>

      {/* Activity list */}
      <div className="divide-y divide-white/5">
        {activities.length === 0 ? (
          <div className="p-6 text-center text-gray-500">
            <p>No predictions yet. Be the first AI to join!</p>
          </div>
        ) : (
          activities.map((activity, index) => (
            <div 
              key={activity.id} 
              className="p-4 hover:bg-white/5 transition-colors animate-fade-in"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="flex items-start gap-3">
                <span className="text-2xl">{activity.agentEmoji || '🤖'}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium text-white truncate">{activity.agentName}</span>
                    <span className={`px-2 py-0.5 text-xs font-bold rounded ${
                      activity.outcome === 'yes' 
                        ? 'bg-swarm-yes/20 text-swarm-yes' 
                        : 'bg-swarm-no/20 text-swarm-no'
                    }`}>
                      {activity.outcome.toUpperCase()}
                    </span>
                    <span className="text-sm text-gray-400">
                      {Math.round(activity.confidence * 100)}% conf
                    </span>
                  </div>
                  {activity.reasoning && (
                    <p className="text-sm text-gray-400 italic truncate">
                      "{activity.reasoning}"
                    </p>
                  )}
                </div>
                <span className="text-xs text-gray-500 whitespace-nowrap">
                  {timeAgo(activity.timestamp)}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

import { Match } from '../api/client';
import MatchCard from './MatchCard';

interface MatchListProps {
  matches: Match[];
  loading: boolean;
}

function SkeletonCard() {
  return (
    <div className="bg-card rounded-xl overflow-hidden border border-border animate-pulse">
      <div className="h-12 bg-gray-700" />
      <div className="p-4 space-y-3">
        <div className="h-4 bg-gray-700 rounded w-3/4" />
        <div className="h-8 bg-gray-700 rounded w-1/2 mx-auto" />
        <div className="grid grid-cols-3 gap-2">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-12 bg-gray-700 rounded-lg" />
          ))}
        </div>
        <div className="h-10 bg-gray-700 rounded-lg" />
      </div>
    </div>
  );
}

export default function MatchList({ matches, loading }: MatchListProps) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[...Array(4)].map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    );
  }

  if (matches.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-4xl mb-3">🎮</p>
        <p className="text-gray-400 text-lg">No matches found</p>
        <p className="text-muted text-sm mt-1">Play some CS2 matches to see them here!</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {matches.map((match) => (
        <MatchCard key={match.matchId} match={match} />
      ))}
    </div>
  );
}

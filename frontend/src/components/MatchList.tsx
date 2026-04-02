import { Match } from '../api/client';
import MatchCard from './MatchCard';

interface MatchListProps {
  matches: Match[];
  loading: boolean;
}

function SkeletonCard() {
  return (
    <div className="bg-card rounded-xl overflow-hidden border border-border animate-pulse">
      <div className="h-16 bg-surface" />
      <div className="p-5 space-y-3">
        <div className="h-4 bg-surface rounded w-3/4" />
        <div className="h-8 bg-surface rounded w-1/2 mx-auto" />
        <div className="grid grid-cols-3 gap-2">
          <div className="h-12 bg-surface rounded-lg" />
          <div className="h-12 bg-surface rounded-lg" />
          <div className="h-12 bg-surface rounded-lg" />
        </div>
        <div className="h-9 bg-surface rounded-lg" />
      </div>
    </div>
  );
}

function MatchList({ matches, loading }: MatchListProps) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {Array.from({ length: 4 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    );
  }

  if (matches.length === 0) {
    return (
      <div className="text-center py-20">
        <div className="text-6xl mb-4">🎮</div>
        <h3 className="text-xl font-semibold text-white mb-2">No matches found</h3>
        <p className="text-text-muted">Play some CS2 matches and check back later!</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {matches.map((match) => (
        <MatchCard key={match.matchId} match={match} />
      ))}
    </div>
  );
}

export default MatchList;

import { Match } from '../api/client';
import MatchCard from './MatchCard';

interface MatchListProps {
  matches: Match[];
  loading: boolean;
}

function SkeletonCard() {
  return (
    <div className="bg-cs2-card border border-cs2-border rounded-xl overflow-hidden animate-pulse">
      <div className="h-12 bg-cs2-border" />
      <div className="p-4 space-y-3">
        <div className="flex justify-between">
          <div className="h-4 bg-cs2-border rounded w-24" />
          <div className="h-4 bg-cs2-border rounded w-16" />
        </div>
        <div className="h-10 bg-cs2-border rounded mx-auto w-32" />
        <div className="grid grid-cols-3 gap-2">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-12 bg-cs2-border rounded-lg" />
          ))}
        </div>
        <div className="h-9 bg-cs2-border rounded-lg" />
      </div>
    </div>
  );
}

export default function MatchList({ matches, loading }: MatchListProps) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[...Array(6)].map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    );
  }

  if (!matches.length) {
    return (
      <div className="text-center py-16 text-cs2-muted">
        <div className="text-5xl mb-4">🎮</div>
        <p className="text-xl">No matches found</p>
        <p className="text-sm mt-2">Play some CS2 matches to see them here.</p>
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

import { Match } from '../api/client';

interface MatchCardProps {
  match: Match;
}

const MAP_COLORS: Record<string, string> = {
  de_dust2: 'from-yellow-800 to-yellow-900',
  de_mirage: 'from-orange-800 to-orange-900',
  de_inferno: 'from-red-800 to-red-900',
  de_nuke: 'from-green-800 to-green-900',
  de_ancient: 'from-teal-800 to-teal-900',
  de_overpass: 'from-blue-800 to-blue-900',
  de_vertigo: 'from-purple-800 to-purple-900',
  de_anubis: 'from-amber-800 to-amber-900',
};

function formatDuration(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, '0')}`;
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

export default function MatchCard({ match }: MatchCardProps) {
  const mapColor = MAP_COLORS[match.map] || 'from-gray-700 to-gray-800';

  const resultBadge = {
    win: 'bg-green-500/20 text-green-400 border border-green-500/30',
    loss: 'bg-red-500/20 text-red-400 border border-red-500/30',
    tie: 'bg-gray-500/20 text-gray-400 border border-gray-500/30',
  }[match.result];

  return (
    <div className="bg-card rounded-xl overflow-hidden border border-border hover:border-accent/40 transition-colors">
      {/* Map header */}
      <div className={`bg-gradient-to-r ${mapColor} px-4 py-3 flex items-center justify-between`}>
        <span className="text-white font-bold text-lg">{match.map}</span>
        <span className={`text-xs font-bold uppercase px-2.5 py-1 rounded-full ${resultBadge}`}>
          {match.result}
        </span>
      </div>

      {/* Card body */}
      <div className="p-4">
        {/* Date + duration */}
        <div className="flex items-center justify-between text-sm text-muted mb-3">
          <span>{formatDate(match.date)}</span>
          <span>⏱ {formatDuration(match.duration)}</span>
        </div>

        {/* Score */}
        <div className="text-center mb-4">
          <span className="text-3xl font-bold text-white">
            {match.score.team}
            <span className="text-muted mx-2">—</span>
            {match.score.enemy}
          </span>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-3 gap-2 mb-4">
          <StatBox label="K / D / A" value={`${match.stats.kills} / ${match.stats.deaths} / ${match.stats.assists}`} />
          <StatBox label="HS%" value={`${match.stats.hsPct}%`} />
          <StatBox label="ADR" value={match.stats.adr.toFixed(1)} />
          <StatBox label="Rating" value={match.stats.rating.toFixed(2)} accent />
        </div>

        {/* Download button */}
        <a
          href={match.demoAvailable && match.demoUrl ? match.demoUrl : undefined}
          download={match.demoAvailable && match.demoUrl ? true : undefined}
          aria-disabled={!match.demoAvailable}
          className={`block w-full text-center py-2.5 rounded-lg text-sm font-semibold transition-colors ${
            match.demoAvailable
              ? 'bg-accent hover:bg-accent-hover text-white cursor-pointer'
              : 'bg-border text-muted cursor-not-allowed opacity-50'
          }`}
          onClick={!match.demoAvailable ? (e) => e.preventDefault() : undefined}
        >
          {match.demoAvailable ? '⬇ Download Demo' : 'Demo Unavailable'}
        </a>
      </div>
    </div>
  );
}

interface StatBoxProps {
  label: string;
  value: string;
  accent?: boolean;
}

function StatBox({ label, value, accent }: StatBoxProps) {
  return (
    <div className="bg-background rounded-lg p-2 text-center">
      <p className="text-xs text-muted mb-0.5">{label}</p>
      <p className={`text-sm font-bold ${accent ? 'text-accent' : 'text-white'}`}>{value}</p>
    </div>
  );
}

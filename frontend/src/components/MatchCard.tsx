import { Match } from '../api/client';

interface MatchCardProps {
  match: Match;
}

const MAP_COLORS: Record<string, string> = {
  de_dust2: 'from-yellow-800 to-yellow-900',
  de_mirage: 'from-orange-800 to-orange-900',
  de_inferno: 'from-red-800 to-red-900',
  de_nuke: 'from-green-800 to-green-900',
  de_overpass: 'from-blue-800 to-blue-900',
  de_vertigo: 'from-purple-800 to-purple-900',
  de_ancient: 'from-teal-800 to-teal-900',
  de_anubis: 'from-amber-800 to-amber-900',
};

function formatDuration(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}m ${s.toString().padStart(2, '0')}s`;
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

const RESULT_STYLES = {
  win: 'bg-green-600 text-white',
  loss: 'bg-red-600 text-white',
  tie: 'bg-gray-500 text-white',
};

export default function MatchCard({ match }: MatchCardProps) {
  const gradient = MAP_COLORS[match.map] || 'from-gray-700 to-gray-800';

  return (
    <div className="bg-cs2-card border border-cs2-border rounded-xl overflow-hidden hover:border-cs2-accent/50 transition-all">
      {/* Map header */}
      <div className={`bg-gradient-to-r ${gradient} px-4 py-3 flex items-center justify-between`}>
        <span className="font-bold text-white text-lg capitalize">{match.map.replace('de_', '')}</span>
        <span className={`text-xs font-bold px-3 py-1 rounded-full uppercase ${RESULT_STYLES[match.result]}`}>
          {match.result}
        </span>
      </div>

      {/* Body */}
      <div className="p-4 space-y-3">
        {/* Date & duration */}
        <div className="flex items-center justify-between text-cs2-muted text-sm">
          <span>{formatDate(match.date)}</span>
          <span>{formatDuration(match.duration)}</span>
        </div>

        {/* Score */}
        <div className="text-center">
          <span className="text-3xl font-bold text-cs2-text">
            {match.score.team}
            <span className="text-cs2-muted mx-2 text-xl">—</span>
            {match.score.enemy}
          </span>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-3 gap-2 text-center text-sm">
          <div className="bg-cs2-bg rounded-lg p-2">
            <div className="text-cs2-text font-semibold">
              {match.stats.kills}/{match.stats.deaths}/{match.stats.assists}
            </div>
            <div className="text-cs2-muted text-xs">K / D / A</div>
          </div>
          <div className="bg-cs2-bg rounded-lg p-2">
            <div className="text-cs2-text font-semibold">{match.stats.hsPct}%</div>
            <div className="text-cs2-muted text-xs">HS%</div>
          </div>
          <div className="bg-cs2-bg rounded-lg p-2">
            <div className="text-cs2-text font-semibold">{match.stats.adr}</div>
            <div className="text-cs2-muted text-xs">ADR</div>
          </div>
          <div className="bg-cs2-bg rounded-lg p-2 col-span-3">
            <div className="text-cs2-accent font-bold">{match.stats.rating.toFixed(2)}</div>
            <div className="text-cs2-muted text-xs">Rating</div>
          </div>
        </div>

        {/* Download button */}
        {match.demoAvailable ? (
          <a
            href={match.demoUrl}
            download
            className="block w-full text-center bg-cs2-accent hover:bg-cs2-accent-hover text-white font-semibold py-2 rounded-lg transition-colors text-sm"
          >
            ⬇ Download Demo
          </a>
        ) : (
          <button
            disabled
            className="block w-full text-center bg-cs2-border text-cs2-muted font-semibold py-2 rounded-lg text-sm cursor-not-allowed"
          >
            Demo Not Available
          </button>
        )}
      </div>
    </div>
  );
}

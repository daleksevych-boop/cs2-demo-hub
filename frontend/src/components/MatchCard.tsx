import { Match } from '../api/client';

interface MatchCardProps {
  match: Match;
}

const MAP_COLORS: Record<string, string> = {
  de_dust2: 'from-yellow-900 to-yellow-800',
  de_mirage: 'from-orange-900 to-orange-800',
  de_inferno: 'from-red-900 to-red-800',
  de_nuke: 'from-blue-900 to-blue-800',
  de_overpass: 'from-green-900 to-green-800',
  de_ancient: 'from-emerald-900 to-emerald-800',
  de_vertigo: 'from-sky-900 to-sky-800',
  de_anubis: 'from-amber-900 to-amber-800',
};

function formatDuration(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, '0')}`;
}

function formatDate(dateStr: string): string {
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

function ResultBadge({ result }: { result: Match['result'] }) {
  const styles = {
    win: 'bg-green-500/20 text-green-400 border border-green-500/40',
    loss: 'bg-red-500/20 text-red-400 border border-red-500/40',
    tie: 'bg-gray-500/20 text-gray-400 border border-gray-500/40',
  };
  return (
    <span className={`px-2 py-0.5 rounded text-xs font-bold uppercase ${styles[result]}`}>
      {result}
    </span>
  );
}

function MatchCard({ match }: MatchCardProps) {
  const mapGradient = MAP_COLORS[match.map] || 'from-gray-800 to-gray-700';
  const mapDisplay = match.map.replace('de_', '').replace(/_/g, ' ');

  return (
    <div className="bg-card rounded-xl overflow-hidden border border-border hover:border-accent/50 transition-all duration-200">
      {/* Map Header */}
      <div className={`bg-gradient-to-r ${mapGradient} px-5 py-4 flex items-center justify-between`}>
        <div>
          <div className="text-white font-bold text-lg capitalize">{mapDisplay}</div>
          <div className="text-white/60 text-sm">{match.map}</div>
        </div>
        <ResultBadge result={match.result} />
      </div>

      {/* Body */}
      <div className="p-5 space-y-4">
        {/* Date + Duration */}
        <div className="flex items-center justify-between text-sm text-text-muted">
          <span>{formatDate(match.date)}</span>
          <span>{formatDuration(match.duration)}</span>
        </div>

        {/* Score */}
        <div className="text-center">
          <span className="text-3xl font-bold text-white">{match.score.team}</span>
          <span className="text-text-muted mx-3 text-xl">—</span>
          <span className="text-3xl font-bold text-white">{match.score.enemy}</span>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-3 gap-2 text-center text-sm">
          <div className="bg-surface rounded-lg p-2">
            <div className="text-text-muted text-xs mb-1">K / D / A</div>
            <div className="text-white font-semibold">
              {match.stats.kills} / {match.stats.deaths} / {match.stats.assists}
            </div>
          </div>
          <div className="bg-surface rounded-lg p-2">
            <div className="text-text-muted text-xs mb-1">HS%</div>
            <div className="text-white font-semibold">{match.stats.hsPct}%</div>
          </div>
          <div className="bg-surface rounded-lg p-2">
            <div className="text-text-muted text-xs mb-1">ADR</div>
            <div className="text-white font-semibold">{match.stats.adr.toFixed(1)}</div>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="text-sm">
            <span className="text-text-muted">Rating </span>
            <span className="text-accent font-bold">{match.stats.rating.toFixed(2)}</span>
          </div>

          {/* Download button */}
          {match.demoAvailable ? (
            <a
              href={match.demoUrl}
              download
              className="px-4 py-2 rounded-lg bg-accent text-black text-sm font-semibold hover:bg-accent-hover transition-colors"
            >
              ⬇ Download Demo
            </a>
          ) : (
            <button
              disabled
              className="px-4 py-2 rounded-lg bg-surface text-text-muted text-sm font-semibold cursor-not-allowed border border-border"
            >
              No Demo
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default MatchCard;

import { getLoginUrl } from '../api/client';

const FEATURES = [
  { icon: '📋', title: 'Match History', desc: 'View your last 8 CS2 matches with full stats' },
  { icon: '⬇', title: 'Download Demos', desc: 'Download .dem files for any available match' },
  { icon: '📊', title: 'Match Stats', desc: 'K/D/A, HS%, ADR, and rating for every game' },
];

export default function Home() {
  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ backgroundColor: '#0F1117' }}
    >
      {/* Hero */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-16 text-center">
        {/* Logo / icon */}
        <div className="text-7xl mb-6 select-none">🎯</div>

        <h1 className="text-5xl font-extrabold text-cs2-text mb-4 tracking-tight">
          CS2 <span className="text-cs2-accent">Demo Hub</span>
        </h1>
        <p className="text-cs2-muted text-xl mb-10 max-w-lg">
          View and download your CS2 match demos
        </p>

        <a
          href={getLoginUrl()}
          className="inline-flex items-center gap-3 bg-cs2-accent hover:bg-cs2-accent-hover text-white font-bold text-lg px-8 py-4 rounded-xl transition-all shadow-lg hover:shadow-cs2-accent/30 hover:scale-105"
        >
          {/* Steam icon */}
          <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M12 0C5.373 0 0 5.373 0 12c0 5.195 3.318 9.622 7.979 11.25l3.064-6.346A3.502 3.502 0 0 1 12 10.5a3.5 3.5 0 0 1 3.5 3.5 3.5 3.5 0 0 1-3.5 3.5 3.5 3.5 0 0 1-2.871-1.491L3.5 19.088A11.946 11.946 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm-1.5 13.997a2 2 0 0 0 2 1.753 2 2 0 0 0 2-2 2 2 0 0 0-2-2 2 2 0 0 0-1.96 1.606l-5.348-2.213A11.955 11.955 0 0 1 12 1.5c5.799 0 10.5 4.701 10.5 10.5 0 5.8-4.701 10.5-10.5 10.5A10.5 10.5 0 0 1 2.25 13.5l7.688 3.183a2.003 2.003 0 0 0 .562.314z" />
          </svg>
          Login with Steam
        </a>

        {/* Features */}
        <div className="mt-20 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl w-full">
          {FEATURES.map((f) => (
            <div
              key={f.title}
              className="bg-cs2-card border border-cs2-border rounded-xl p-6 flex flex-col items-center text-center hover:border-cs2-accent/40 transition-colors"
            >
              <span className="text-4xl mb-3">{f.icon}</span>
              <h3 className="text-cs2-text font-semibold text-lg mb-2">{f.title}</h3>
              <p className="text-cs2-muted text-sm">{f.desc}</p>
            </div>
          ))}
        </div>
      </main>

      <footer className="text-center text-cs2-muted text-xs py-4 border-t border-cs2-border">
        CS2 Demo Hub &mdash; Not affiliated with Valve Corporation
      </footer>
    </div>
  );
}

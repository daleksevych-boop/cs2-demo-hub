export default function Home() {
  const handleLogin = () => {
    window.location.href = '/api/auth/steam';
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Hero section */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-16">
        {/* Logo / Title */}
        <div className="text-center mb-10">
          <div className="text-6xl mb-4">🎯</div>
          <h1 className="text-5xl font-extrabold text-white mb-3">
            CS2 <span className="text-accent">Demo Hub</span>
          </h1>
          <p className="text-gray-400 text-xl max-w-md mx-auto">
            View and download your CS2 match demos
          </p>
        </div>

        {/* Login button */}
        <button
          onClick={handleLogin}
          className="flex items-center gap-3 bg-accent hover:bg-accent-hover text-white font-bold text-lg px-8 py-4 rounded-xl transition-colors shadow-lg shadow-accent/20 mb-16"
        >
          <SteamIcon />
          Login with Steam
        </button>

        {/* Features */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl w-full">
          <FeatureCard
            icon="📋"
            title="Match History"
            description="View your last 8 CS2 competitive matches with detailed stats"
          />
          <FeatureCard
            icon="⬇️"
            title="Download Demos"
            description="Download .dem files directly to review your gameplay"
          />
          <FeatureCard
            icon="📊"
            title="Match Stats"
            description="Track kills, deaths, ADR, HS% and your overall rating"
          />
        </div>
      </main>

      <footer className="text-center text-muted text-sm py-6">
        CS2 Demo Hub — Not affiliated with Valve Corporation
      </footer>
    </div>
  );
}

interface FeatureCardProps {
  icon: string;
  title: string;
  description: string;
}

function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <div className="bg-card border border-border rounded-xl p-5 text-center hover:border-accent/40 transition-colors">
      <div className="text-3xl mb-3">{icon}</div>
      <h3 className="text-white font-semibold mb-1">{title}</h3>
      <p className="text-muted text-sm">{description}</p>
    </div>
  );
}

function SteamIcon() {
  return (
    <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
      <path d="M11.979 0C5.678 0 .511 4.86.064 11.031l6.234 2.576a3.39 3.39 0 0 1 1.92-.588c.064 0 .128.002.191.006l2.775-4.023v-.057a4.284 4.284 0 0 1 4.28-4.279 4.284 4.284 0 0 1 4.279 4.28 4.284 4.284 0 0 1-4.28 4.279l-3.957 2.824c0 .053.003.106.003.16a3.385 3.385 0 0 1-3.381 3.381 3.385 3.385 0 0 1-3.31-2.675L.16 14.396C1.309 19.932 6.283 24 12.021 24 18.628 24 24 18.628 24 12.021 24 5.371 18.628 0 11.979 0zM7.54 18.21l-1.473-.61a2.541 2.541 0 0 0 4.617.228 2.541 2.541 0 0 0-1.39-3.34l1.523.63a1.915 1.915 0 0 1-3.277 3.092zm9.924-8.225a2.857 2.857 0 0 1-2.853 2.853 2.857 2.857 0 0 1-2.853-2.853 2.857 2.857 0 0 1 2.853-2.853 2.857 2.857 0 0 1 2.853 2.853z" />
    </svg>
  );
}

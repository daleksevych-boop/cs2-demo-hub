import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getMe, getMatches, User, Match } from '../api/client';
import Header from '../components/Header';
import MatchList from '../components/MatchList';

export default function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [matches, setMatches] = useState<Match[]>([]);
  const [loadingUser, setLoadingUser] = useState(true);
  const [loadingMatches, setLoadingMatches] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getMe()
      .then((u) => {
        setUser(u);
        setLoadingUser(false);
        return getMatches();
      })
      .then((m) => {
        setMatches(m);
        setLoadingMatches(false);
      })
      .catch((err) => {
        if (err?.response?.status === 401) {
          navigate('/');
        } else {
          setError('Failed to load data. Please try again.');
          setLoadingUser(false);
          setLoadingMatches(false);
        }
      });
  }, [navigate]);

  if (loadingUser) {
    return (
      <div className="min-h-screen bg-cs2-bg flex items-center justify-center">
        <div className="text-cs2-muted text-lg animate-pulse">Loading…</div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen bg-cs2-bg">
      <Header user={user} />

      <main className="max-w-5xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-cs2-text mb-6">
          My Recent <span className="text-cs2-accent">Matches</span>
        </h1>

        {error && (
          <div className="bg-red-900/30 border border-red-700 text-red-300 rounded-lg px-4 py-3 mb-6 text-sm">
            {error}
          </div>
        )}

        <MatchList matches={matches} loading={loadingMatches} />
      </main>
    </div>
  );
}

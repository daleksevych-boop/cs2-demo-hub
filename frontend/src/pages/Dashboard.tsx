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
      .catch(() => {
        // Not authenticated — redirect to home
        navigate('/');
      });
  }, [navigate]);

  const handleLogout = () => {
    window.location.href = '/api/auth/logout';
  };

  if (loadingUser) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-gray-400 text-lg animate-pulse">Loading…</div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen bg-background">
      <Header user={user} onLogout={handleLogout} />
      <main className="max-w-6xl mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold text-white mb-6">My Recent Matches</h2>
        <MatchList matches={matches} loading={loadingMatches} />
      </main>
    </div>
  );
}

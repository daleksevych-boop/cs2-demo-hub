import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getMe, getMatches, UserProfile, Match } from '../api/client';
import Header from '../components/Header';
import MatchList from '../components/MatchList';

function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState<UserProfile | null>(null);
  const [matches, setMatches] = useState<Match[]>([]);
  const [loadingUser, setLoadingUser] = useState(true);
  const [loadingMatches, setLoadingMatches] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function init() {
      const me = await getMe();
      if (!me) {
        navigate('/');
        return;
      }
      setUser(me);
      setLoadingUser(false);

      try {
        const data = await getMatches();
        setMatches(data);
      } catch (err) {
        setError('Failed to load matches. Please try again.');
        console.error(err);
      } finally {
        setLoadingMatches(false);
      }
    }
    init();
  }, [navigate]);

  if (loadingUser) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ backgroundColor: '#0F1117' }}
      >
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-accent border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#0F1117' }}>
      <Header user={user} />

      <main className="max-w-6xl mx-auto px-4 py-10">
        <h2 className="text-3xl font-bold text-white mb-8">My Recent Matches</h2>

        {error && (
          <div className="mb-6 p-4 rounded-lg border border-red-500/40 bg-red-500/10 text-red-400">
            {error}
          </div>
        )}

        <MatchList matches={matches} loading={loadingMatches} />
      </main>
    </div>
  );
}

export default Dashboard;

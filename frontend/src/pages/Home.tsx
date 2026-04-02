import { getLoginUrl } from '../api/client';

function Home() {
  const features = [
    {
      icon: '🏆',
      title: 'Match History',
      description: 'View your last 8 CS2 competitive matches with detailed stats.',
    },
    {
      icon: '⬇️',
      title: 'Download Demos',
      description: 'Download .dem files directly from the dashboard.',
    },
    {
      icon: '📊',
      title: 'Match Stats',
      description: 'Kills, deaths, HS%, ADR, and rating for every match.',
    },
  ];

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-4"
      style={{ backgroundColor: '#0F1117' }}
    >
      {/* Hero */}
      <div className="text-center mb-12">
        <h1 className="text-5xl md:text-7xl font-extrabold mb-4">
          <span style={{ color: '#F6A623' }}>CS2</span>{' '}
          <span className="text-white">Demo Hub</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-400 max-w-xl mx-auto mb-10">
          View and download your CS2 match demos
        </p>

        {/* Steam login button */}
        <a
          href={getLoginUrl()}
          className="inline-flex items-center gap-3 px-8 py-4 rounded-xl text-lg font-bold transition-all duration-200 shadow-lg hover:shadow-accent/25"
          style={{
            backgroundColor: '#F6A623',
            color: '#000000',
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLAnchorElement).style.backgroundColor = '#E09510';
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLAnchorElement).style.backgroundColor = '#F6A623';
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 233 233"
            className="w-6 h-6"
            fill="currentColor"
          >
            <path d="M116.5 0C52.1 0 0 52.1 0 116.5c0 57.2 41.1 104.7 95.6 114.5l39.2-96.4c-2.1.3-4.2.4-6.3.4-23.9 0-43.3-19.4-43.3-43.3s19.4-43.3 43.3-43.3 43.3 19.4 43.3 43.3c0 20.7-14.6 38.1-34.1 42.3l-38.5 94.7c3.4.4 6.9.6 10.4.6 64.4 0 116.5-52.1 116.5-116.5C233 52.1 180.9 0 116.5 0z" />
          </svg>
          Login with Steam
        </a>
      </div>

      {/* Feature cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl w-full">
        {features.map((f) => (
          <div
            key={f.title}
            className="rounded-xl p-6 text-center border"
            style={{ backgroundColor: '#1A1D27', borderColor: '#2E3248' }}
          >
            <div className="text-4xl mb-3">{f.icon}</div>
            <h3 className="text-white font-bold text-lg mb-2">{f.title}</h3>
            <p className="text-gray-400 text-sm">{f.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;

export interface MatchScore {
  team: number;
  enemy: number;
}

export interface MatchStats {
  kills: number;
  deaths: number;
  assists: number;
  headshots: number;
  hsPct: number;
  adr: number;
  rating: number;
}

export interface Match {
  matchId: string;
  map: string;
  date: string;
  duration: number;
  result: 'win' | 'loss' | 'tie';
  score: MatchScore;
  stats: MatchStats;
  demoAvailable: boolean;
  demoUrl: string;
  shareCode?: string;
}

const MOCK_MATCHES: Match[] = [
  {
    matchId: 'MATCH_001',
    map: 'de_dust2',
    date: '2026-04-01T15:30:00Z',
    duration: 2340,
    result: 'win',
    score: { team: 13, enemy: 7 },
    stats: { kills: 24, deaths: 14, assists: 5, headshots: 12, hsPct: 50, adr: 87.3, rating: 1.42 },
    demoAvailable: true,
    demoUrl: '',
    shareCode: 'CSGO-DEMO1-ABCDE-FGHIJ-KLMNO-PQRST',
  },
  {
    matchId: 'MATCH_002',
    map: 'de_mirage',
    date: '2026-03-31T18:00:00Z',
    duration: 3120,
    result: 'loss',
    score: { team: 11, enemy: 13 },
    stats: { kills: 18, deaths: 19, assists: 7, headshots: 8, hsPct: 44, adr: 72.1, rating: 1.05 },
    demoAvailable: true,
    demoUrl: '',
    shareCode: 'CSGO-DEMO2-UVWXY-Z1234-56789-ABCDE',
  },
  {
    matchId: 'MATCH_003',
    map: 'de_inferno',
    date: '2026-03-30T20:15:00Z',
    duration: 2800,
    result: 'win',
    score: { team: 13, enemy: 9 },
    stats: { kills: 21, deaths: 15, assists: 3, headshots: 10, hsPct: 48, adr: 80.5, rating: 1.31 },
    demoAvailable: true,
    demoUrl: '',
    shareCode: 'CSGO-DEMO3-FGHIJ-KLMNO-PQRST-UVWXY',
  },
  {
    matchId: 'MATCH_004',
    map: 'de_nuke',
    date: '2026-03-29T14:45:00Z',
    duration: 3600,
    result: 'win',
    score: { team: 13, enemy: 11 },
    stats: { kills: 29, deaths: 18, assists: 6, headshots: 15, hsPct: 52, adr: 95.2, rating: 1.58 },
    demoAvailable: true,
    demoUrl: '',
    shareCode: 'CSGO-DEMO4-Z1234-56789-ABCDE-FGHIJ',
  },
  {
    matchId: 'MATCH_005',
    map: 'de_overpass',
    date: '2026-03-28T16:00:00Z',
    duration: 2100,
    result: 'loss',
    score: { team: 8, enemy: 13 },
    stats: { kills: 14, deaths: 20, assists: 4, headshots: 6, hsPct: 43, adr: 60.8, rating: 0.88 },
    demoAvailable: true,
    demoUrl: '',
    shareCode: 'CSGO-DEMO5-KLMNO-PQRST-UVWXY-Z1234',
  },
  {
    matchId: 'MATCH_006',
    map: 'de_vertigo',
    date: '2026-03-27T19:30:00Z',
    duration: 2650,
    result: 'tie',
    score: { team: 12, enemy: 12 },
    stats: { kills: 19, deaths: 17, assists: 8, headshots: 9, hsPct: 47, adr: 74.6, rating: 1.18 },
    demoAvailable: true,
    demoUrl: '',
    shareCode: 'CSGO-DEMO6-56789-ABCDE-FGHIJ-KLMNO',
  },
  {
    matchId: 'MATCH_007',
    map: 'de_ancient',
    date: '2026-03-26T21:00:00Z',
    duration: 2950,
    result: 'win',
    score: { team: 13, enemy: 5 },
    stats: { kills: 32, deaths: 12, assists: 9, headshots: 18, hsPct: 56, adr: 102.4, rating: 1.75 },
    demoAvailable: true,
    demoUrl: '',
    shareCode: 'CSGO-DEMO7-PQRST-UVWXY-Z1234-56789',
  },
  {
    matchId: 'MATCH_008',
    map: 'de_anubis',
    date: '2026-03-25T13:00:00Z',
    duration: 3200,
    result: 'loss',
    score: { team: 10, enemy: 13 },
    stats: { kills: 16, deaths: 18, assists: 5, headshots: 7, hsPct: 44, adr: 68.9, rating: 0.97 },
    demoAvailable: true,
    demoUrl: '',
    shareCode: 'CSGO-DEMO8-ABCDE-FGHIJ-KLMNO-PQRST',
  },
];

interface SteamMatchEntry {
  matchid?: string;
  matchtime?: number;
  map?: string;
  roundstatsall?: Array<{
    reservation?: {
      game_type?: number;
    };
    map?: number;
    c4timer?: number;
    score?: number[];
    kills?: number[];
    deaths?: number[];
    assists?: number[];
    headshots?: number[];
    mvps?: number[];
    scores?: number[];
  }>;
}

interface SteamMatchHistoryResponse {
  result?: {
    matches?: SteamMatchEntry[];
    nextcode?: string;
  };
}

async function fetchSteamMatches(steamId: string): Promise<Match[]> {
  const apiKey = process.env.STEAM_API_KEY;
  if (!apiKey) {
    throw new Error('STEAM_API_KEY is not set');
  }

  const url =
    `https://api.steampowered.com/ICSGOMatch_730/GetRecentMatchHistory/v1/` +
    `?key=${encodeURIComponent(apiKey)}&steamid=${encodeURIComponent(steamId)}`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Steam API returned ${response.status}`);
  }

  const data = (await response.json()) as SteamMatchHistoryResponse;
  const matches = data?.result?.matches ?? [];

  return matches.map((m, index) => {
    const roundstats = m.roundstatsall ?? [];
    const lastRound = roundstats[roundstats.length - 1];

    const scores = lastRound?.score ?? [];
    const teamScore = scores[0] ?? 0;
    const enemyScore = scores[1] ?? 0;

    const playerKills = lastRound?.kills?.[0] ?? 0;
    const playerDeaths = lastRound?.deaths?.[0] ?? 0;
    const playerAssists = lastRound?.assists?.[0] ?? 0;
    const playerHeadshots = lastRound?.headshots?.[0] ?? 0;
    const hsPct = playerKills > 0 ? Math.round((playerHeadshots / playerKills) * 100) : 0;

    let result: 'win' | 'loss' | 'tie' = 'tie';
    if (teamScore > enemyScore) result = 'win';
    else if (teamScore < enemyScore) result = 'loss';

    const matchDate = m.matchtime
      ? new Date(m.matchtime * 1000).toISOString()
      : new Date().toISOString();

    return {
      matchId: m.matchid ?? `STEAM_${index}`,
      map: m.map ?? 'unknown',
      date: matchDate,
      duration: 0,
      result,
      score: { team: teamScore, enemy: enemyScore },
      stats: {
        kills: playerKills,
        deaths: playerDeaths,
        assists: playerAssists,
        headshots: playerHeadshots,
        hsPct,
        adr: 0,
        rating: 0,
      },
      demoAvailable: false,
      demoUrl: '',
    };
  });
}

export async function getRecentMatches(steamId: string): Promise<Match[]> {
  if (process.env.NODE_ENV === 'development') {
    return MOCK_MATCHES;
  }
  try {
    return await fetchSteamMatches(steamId);
  } catch (err) {
    console.error('Failed to fetch Steam matches, falling back to mock data:', err);
    return MOCK_MATCHES;
  }
}

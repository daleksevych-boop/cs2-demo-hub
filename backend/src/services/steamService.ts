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
    demoAvailable: false,
    demoUrl: '',
  },
  {
    matchId: 'MATCH_002',
    map: 'de_mirage',
    date: '2026-03-31T18:00:00Z',
    duration: 3120,
    result: 'loss',
    score: { team: 11, enemy: 13 },
    stats: { kills: 18, deaths: 19, assists: 7, headshots: 8, hsPct: 44, adr: 72.1, rating: 1.05 },
    demoAvailable: false,
    demoUrl: '',
  },
  {
    matchId: 'MATCH_003',
    map: 'de_inferno',
    date: '2026-03-30T20:15:00Z',
    duration: 2800,
    result: 'win',
    score: { team: 13, enemy: 9 },
    stats: { kills: 21, deaths: 15, assists: 3, headshots: 10, hsPct: 48, adr: 80.5, rating: 1.31 },
    demoAvailable: false,
    demoUrl: '',
  },
  {
    matchId: 'MATCH_004',
    map: 'de_nuke',
    date: '2026-03-29T14:45:00Z',
    duration: 3600,
    result: 'win',
    score: { team: 13, enemy: 11 },
    stats: { kills: 29, deaths: 18, assists: 6, headshots: 15, hsPct: 52, adr: 95.2, rating: 1.58 },
    demoAvailable: false,
    demoUrl: '',
  },
  {
    matchId: 'MATCH_005',
    map: 'de_overpass',
    date: '2026-03-28T16:00:00Z',
    duration: 2100,
    result: 'loss',
    score: { team: 8, enemy: 13 },
    stats: { kills: 14, deaths: 20, assists: 4, headshots: 6, hsPct: 43, adr: 60.8, rating: 0.88 },
    demoAvailable: false,
    demoUrl: '',
  },
  {
    matchId: 'MATCH_006',
    map: 'de_vertigo',
    date: '2026-03-27T19:30:00Z',
    duration: 2650,
    result: 'tie',
    score: { team: 12, enemy: 12 },
    stats: { kills: 19, deaths: 17, assists: 8, headshots: 9, hsPct: 47, adr: 74.6, rating: 1.18 },
    demoAvailable: false,
    demoUrl: '',
  },
  {
    matchId: 'MATCH_007',
    map: 'de_ancient',
    date: '2026-03-26T21:00:00Z',
    duration: 2950,
    result: 'win',
    score: { team: 13, enemy: 5 },
    stats: { kills: 32, deaths: 12, assists: 9, headshots: 18, hsPct: 56, adr: 102.4, rating: 1.75 },
    demoAvailable: false,
    demoUrl: '',
  },
  {
    matchId: 'MATCH_008',
    map: 'de_anubis',
    date: '2026-03-25T13:00:00Z',
    duration: 3200,
    result: 'loss',
    score: { team: 10, enemy: 13 },
    stats: { kills: 16, deaths: 18, assists: 5, headshots: 7, hsPct: 44, adr: 68.9, rating: 0.97 },
    demoAvailable: false,
    demoUrl: '',
  },
];

export async function getRecentMatches(_steamId: string): Promise<Match[]> {
  if (process.env.NODE_ENV === 'development') {
    return MOCK_MATCHES;
  }
  // TODO: Implement real Steam API fetch when NODE_ENV !== 'development'
  return MOCK_MATCHES;
}

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
  demoUrl?: string;
}

export const MOCK_MATCHES: Match[] = [
  {
    matchId: 'MATCH_001',
    map: 'de_dust2',
    date: '2026-04-01T15:30:00Z',
    duration: 2340,
    result: 'win',
    score: { team: 13, enemy: 7 },
    stats: { kills: 24, deaths: 14, assists: 5, headshots: 12, hsPct: 50, adr: 87.3, rating: 1.42 },
    demoAvailable: true,
    demoUrl: 'https://example.com/demo1.dem',
  },
  {
    matchId: 'MATCH_002',
    map: 'de_mirage',
    date: '2026-03-31T20:10:00Z',
    duration: 3060,
    result: 'loss',
    score: { team: 10, enemy: 13 },
    stats: { kills: 18, deaths: 19, assists: 7, headshots: 8, hsPct: 44, adr: 72.1, rating: 1.05 },
    demoAvailable: true,
    demoUrl: 'https://example.com/demo2.dem',
  },
  {
    matchId: 'MATCH_003',
    map: 'de_inferno',
    date: '2026-03-30T18:45:00Z',
    duration: 2880,
    result: 'win',
    score: { team: 13, enemy: 9 },
    stats: { kills: 21, deaths: 16, assists: 3, headshots: 10, hsPct: 47, adr: 80.5, rating: 1.28 },
    demoAvailable: true,
    demoUrl: 'https://example.com/demo3.dem',
  },
  {
    matchId: 'MATCH_004',
    map: 'de_nuke',
    date: '2026-03-29T14:00:00Z',
    duration: 1920,
    result: 'win',
    score: { team: 13, enemy: 4 },
    stats: { kills: 27, deaths: 10, assists: 6, headshots: 15, hsPct: 55, adr: 105.2, rating: 1.89 },
    demoAvailable: false,
  },
  {
    matchId: 'MATCH_005',
    map: 'de_ancient',
    date: '2026-03-28T22:15:00Z',
    duration: 3300,
    result: 'tie',
    score: { team: 12, enemy: 12 },
    stats: { kills: 16, deaths: 18, assists: 9, headshots: 6, hsPct: 37, adr: 65.8, rating: 0.98 },
    demoAvailable: true,
    demoUrl: 'https://example.com/demo5.dem',
  },
  {
    matchId: 'MATCH_006',
    map: 'de_overpass',
    date: '2026-03-27T17:30:00Z',
    duration: 2700,
    result: 'loss',
    score: { team: 8, enemy: 13 },
    stats: { kills: 14, deaths: 20, assists: 4, headshots: 5, hsPct: 35, adr: 58.4, rating: 0.78 },
    demoAvailable: true,
    demoUrl: 'https://example.com/demo6.dem',
  },
  {
    matchId: 'MATCH_007',
    map: 'de_vertigo',
    date: '2026-03-26T12:00:00Z',
    duration: 2520,
    result: 'win',
    score: { team: 13, enemy: 11 },
    stats: { kills: 22, deaths: 15, assists: 8, headshots: 11, hsPct: 50, adr: 83.7, rating: 1.35 },
    demoAvailable: true,
    demoUrl: 'https://example.com/demo7.dem',
  },
  {
    matchId: 'MATCH_008',
    map: 'de_anubis',
    date: '2026-03-25T19:45:00Z',
    duration: 2160,
    result: 'win',
    score: { team: 13, enemy: 6 },
    stats: { kills: 25, deaths: 11, assists: 4, headshots: 14, hsPct: 56, adr: 96.1, rating: 1.67 },
    demoAvailable: false,
  },
];

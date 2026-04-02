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
    date: '2026-03-31T19:00:00Z',
    duration: 2880,
    result: 'loss',
    score: { team: 10, enemy: 13 },
    stats: { kills: 18, deaths: 19, assists: 6, headshots: 9, hsPct: 50, adr: 72.1, rating: 0.98 },
    demoAvailable: true,
    demoUrl: 'https://example.com/demo2.dem',
  },
  {
    matchId: 'MATCH_003',
    map: 'de_inferno',
    date: '2026-03-30T21:15:00Z',
    duration: 3120,
    result: 'win',
    score: { team: 16, enemy: 12 },
    stats: { kills: 29, deaths: 17, assists: 8, headshots: 15, hsPct: 52, adr: 94.6, rating: 1.55 },
    demoAvailable: false,
    demoUrl: '',
  },
  {
    matchId: 'MATCH_004',
    map: 'de_nuke',
    date: '2026-03-29T18:45:00Z',
    duration: 1980,
    result: 'win',
    score: { team: 13, enemy: 5 },
    stats: { kills: 21, deaths: 10, assists: 4, headshots: 11, hsPct: 52, adr: 91.2, rating: 1.61 },
    demoAvailable: true,
    demoUrl: 'https://example.com/demo4.dem',
  },
  {
    matchId: 'MATCH_005',
    map: 'de_overpass',
    date: '2026-03-28T20:00:00Z',
    duration: 2700,
    result: 'loss',
    score: { team: 9, enemy: 13 },
    stats: { kills: 15, deaths: 18, assists: 3, headshots: 7, hsPct: 47, adr: 64.8, rating: 0.87 },
    demoAvailable: true,
    demoUrl: 'https://example.com/demo5.dem',
  },
  {
    matchId: 'MATCH_006',
    map: 'de_ancient',
    date: '2026-03-27T17:30:00Z',
    duration: 2520,
    result: 'tie',
    score: { team: 12, enemy: 12 },
    stats: { kills: 20, deaths: 16, assists: 7, headshots: 10, hsPct: 50, adr: 79.4, rating: 1.14 },
    demoAvailable: false,
    demoUrl: '',
  },
  {
    matchId: 'MATCH_007',
    map: 'de_vertigo',
    date: '2026-03-26T22:00:00Z',
    duration: 3300,
    result: 'win',
    score: { team: 16, enemy: 14 },
    stats: { kills: 31, deaths: 20, assists: 6, headshots: 16, hsPct: 52, adr: 98.7, rating: 1.48 },
    demoAvailable: true,
    demoUrl: 'https://example.com/demo7.dem',
  },
  {
    matchId: 'MATCH_008',
    map: 'de_anubis',
    date: '2026-03-25T14:00:00Z',
    duration: 2160,
    result: 'loss',
    score: { team: 8, enemy: 13 },
    stats: { kills: 14, deaths: 17, assists: 5, headshots: 6, hsPct: 43, adr: 61.3, rating: 0.82 },
    demoAvailable: true,
    demoUrl: 'https://example.com/demo8.dem',
  },
];

import axios from 'axios';

const apiClient = axios.create({
  baseURL: '/api',
  withCredentials: true,
});

export interface User {
  steamId: string;
  displayName: string;
  avatar: string;
}

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

export const getMe = (): Promise<User> =>
  apiClient.get<User>('/auth/me').then((r) => r.data);

export const getMatches = (): Promise<Match[]> =>
  apiClient.get<Match[]>('/matches').then((r) => r.data);

export const logout = (): Promise<void> =>
  apiClient.get('/auth/logout').then(() => undefined);

export default apiClient;

import axios from 'axios';

const client = axios.create({
  baseURL: '/api',
  withCredentials: true,
});

export interface User {
  steamId: string;
  displayName: string;
  avatar: string;
}

export interface Match {
  matchId: string;
  map: string;
  date: string;
  duration: number;
  result: 'win' | 'loss' | 'tie';
  score: { team: number; enemy: number };
  stats: {
    kills: number;
    deaths: number;
    assists: number;
    headshots: number;
    hsPct: number;
    adr: number;
    rating: number;
  };
  demoAvailable: boolean;
  demoUrl: string;
  shareCode?: string;
}

export async function getMe(): Promise<User> {
  const { data } = await client.get<User>('/auth/me');
  return data;
}

export async function getMatches(): Promise<Match[]> {
  const { data } = await client.get<Match[]>('/matches');
  return data;
}

export function getLoginUrl(): string {
  return '/api/auth/steam';
}

export function getLogoutUrl(): string {
  return '/api/auth/logout';
}

export default client;

import axios from 'axios';

const apiClient = axios.create({
  baseURL: '/api',
  withCredentials: true,
});

export interface UserProfile {
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
}

export async function getMe(): Promise<UserProfile | null> {
  try {
    const res = await apiClient.get<UserProfile>('/auth/me');
    return res.data;
  } catch {
    return null;
  }
}

export async function getMatches(): Promise<Match[]> {
  const res = await apiClient.get<Match[]>('/matches');
  return res.data;
}

export function getLoginUrl(): string {
  return '/api/auth/steam';
}

export async function logout(): Promise<void> {
  await apiClient.post('/auth/logout');
}

export default apiClient;

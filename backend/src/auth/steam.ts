import passport from 'passport';
import { Strategy as SteamStrategy } from 'passport-steam';

const STEAM_API_KEY = process.env.STEAM_API_KEY || '';
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173';
const HOST = process.env.HOST || 'http://localhost:3001';

export interface SteamProfile {
  id: string;
  displayName: string;
  photos: Array<{ value: string }>;
}

passport.serializeUser((user: Express.User, done) => {
  done(null, user);
});

passport.deserializeUser((user: Express.User, done) => {
  done(null, user);
});

passport.use(
  new SteamStrategy(
    {
      returnURL: `${HOST}/api/auth/steam/return`,
      realm: HOST,
      apiKey: STEAM_API_KEY,
    },
    (_identifier: string, profile: SteamProfile, done: (err: Error | null, user?: Express.User) => void) => {
      const user = {
        steamId: profile.id,
        displayName: profile.displayName,
        avatar: profile.photos[2]?.value || profile.photos[0]?.value || '',
      };
      return done(null, user as Express.User);
    }
  )
);

export default passport;

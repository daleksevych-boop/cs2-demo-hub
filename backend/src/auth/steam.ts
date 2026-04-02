import passport from 'passport';
import { Strategy as SteamStrategy } from 'passport-steam';

const STEAM_API_KEY = process.env.STEAM_API_KEY || 'no_key';
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173';
const PORT = process.env.PORT || 3001;

export interface SteamProfile {
  id: string;
  displayName: string;
  photos: { value: string }[];
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
      returnURL: `http://localhost:${PORT}/api/auth/steam/return`,
      realm: `http://localhost:${PORT}/`,
      apiKey: STEAM_API_KEY,
    },
    (_identifier: string, profile: SteamProfile, done: (err: unknown, user?: SteamProfile) => void) => {
      return done(null, profile);
    }
  )
);

export default passport;

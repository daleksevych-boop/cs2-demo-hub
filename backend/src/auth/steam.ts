import passport from 'passport';
import { Strategy as SteamStrategy } from 'passport-steam';
import { Request } from 'express';

export interface SteamProfile {
  steamId: string;
  displayName: string;
  avatar: string;
}

declare global {
  namespace Express {
    interface User extends SteamProfile {}
  }
}

const STEAM_RETURN_URL =
  process.env.STEAM_RETURN_URL || 'http://localhost:3001/api/auth/steam/return';
const STEAM_REALM = process.env.STEAM_REALM || 'http://localhost:3001/';
const STEAM_API_KEY = process.env.STEAM_API_KEY || 'DUMMY_KEY';

passport.use(
  new SteamStrategy(
    {
      returnURL: STEAM_RETURN_URL,
      realm: STEAM_REALM,
      apiKey: STEAM_API_KEY,
    },
    (_identifier: string, profile: passport.Profile, done: (err: Error | null, user?: SteamProfile) => void) => {
      const photos = profile.photos as Array<{ value: string }> | undefined;
      const user: SteamProfile = {
        steamId: profile.id,
        displayName: profile.displayName,
        avatar: photos && photos.length > 0 ? photos[2]?.value || photos[0]?.value : '',
      };
      return done(null, user);
    }
  )
);

passport.serializeUser((user: Express.User, done) => {
  done(null, user);
});

passport.deserializeUser((obj: Express.User, done) => {
  done(null, obj);
});

export default passport;

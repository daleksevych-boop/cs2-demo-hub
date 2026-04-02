import { Router, Request, Response } from 'express';
import rateLimit from 'express-rate-limit';
import passport from '../auth/steam';

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 30,
  standardHeaders: true,
  legacyHeaders: false,
});

const router = Router();

const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173';

// GET /api/auth/steam — redirect to Steam login
router.get('/steam', authLimiter, passport.authenticate('steam', { failureRedirect: '/' }));

// GET /api/auth/steam/return — Steam callback
router.get(
  '/steam/return',
  authLimiter,
  passport.authenticate('steam', { failureRedirect: '/' }),
  (_req: Request, res: Response) => {
    res.redirect(`${FRONTEND_URL}/dashboard`);
  }
);

// GET /api/auth/logout — destroy session
router.get('/logout', authLimiter, (req: Request, res: Response) => {
  req.logout(() => {
    req.session.destroy(() => {
      res.redirect(FRONTEND_URL);
    });
  });
});

// GET /api/auth/me — return current user info or 401
router.get('/me', authLimiter, (req: Request, res: Response) => {
  if (!req.isAuthenticated() || !req.user) {
    res.status(401).json({ error: 'Not authenticated' });
    return;
  }

  const profile = req.user as {
    id: string;
    displayName: string;
    photos: { value: string }[];
  };

  res.json({
    steamId: profile.id,
    displayName: profile.displayName,
    avatar: profile.photos?.[0]?.value || '',
  });
});

export default router;

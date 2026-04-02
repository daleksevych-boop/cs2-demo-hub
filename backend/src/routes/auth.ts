import { Router, Request, Response, NextFunction } from 'express';
import rateLimit from 'express-rate-limit';
import passport from '../auth/steam';

const router = Router();

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 20,
  standardHeaders: true,
  legacyHeaders: false,
});

const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173';

// GET /api/auth/steam — redirect to Steam login
router.get('/steam', authLimiter, passport.authenticate('steam', { failureRedirect: '/' }));

// GET /api/auth/steam/return — Steam callback
router.get(
  '/steam/return',
  passport.authenticate('steam', { failureRedirect: '/' }),
  (_req: Request, res: Response) => {
    res.redirect(`${FRONTEND_URL}/dashboard`);
  }
);

// POST /api/auth/logout
router.post('/logout', authLimiter, (req: Request, res: Response, next: NextFunction) => {
  req.logout((err) => {
    if (err) return next(err);
    req.session.destroy(() => {
      res.redirect(FRONTEND_URL);
    });
  });
});

// GET /api/auth/me
router.get('/me', authLimiter, (req: Request, res: Response) => {
  if (!req.isAuthenticated() || !req.user) {
    return res.status(401).json({ error: 'Not authenticated' });
  }
  return res.json(req.user);
});

export default router;

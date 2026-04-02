import { Router, Request, Response } from 'express';
import rateLimit from 'express-rate-limit';
import passport from '../auth/steam';

const router = Router();

const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173';

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 60,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many requests, please try again later.' },
});

// Redirect to Steam login
router.get('/steam', passport.authenticate('steam', { failureRedirect: '/' }));

// Steam callback
router.get(
  '/steam/return',
  passport.authenticate('steam', { failureRedirect: FRONTEND_URL }),
  (_req: Request, res: Response) => {
    res.redirect(`${FRONTEND_URL}/dashboard`);
  }
);

// Logout
router.get('/logout', (req: Request, res: Response) => {
  req.logout(() => {
    res.redirect(FRONTEND_URL);
  });
});

// Get current user
router.get('/me', authLimiter, (req: Request, res: Response) => {
  if (!req.isAuthenticated() || !req.user) {
    return res.status(401).json({ error: 'Not authenticated' });
  }
  res.json(req.user);
});

export default router;

import { Router, Request, Response } from 'express';
import rateLimit from 'express-rate-limit';
import { requireAuth } from '../middleware/requireAuth';
import { getRecentMatches } from '../services/steamService';

const router = Router();

const matchesLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 30,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many requests, please try again later.' },
});

interface AuthUser {
  steamId: string;
  displayName: string;
  avatar: string;
}

router.get('/', matchesLimiter, requireAuth, async (req: Request, res: Response) => {
  try {
    const user = req.user as AuthUser;
    const matches = await getRecentMatches(user.steamId);
    res.json(matches);
  } catch (err) {
    console.error('Error fetching matches:', err);
    res.status(500).json({ error: 'Failed to fetch matches' });
  }
});

export default router;

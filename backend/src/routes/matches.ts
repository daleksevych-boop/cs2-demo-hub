import { Router, Request, Response } from 'express';
import rateLimit from 'express-rate-limit';
import requireAuth from '../middleware/requireAuth';
import { MOCK_MATCHES } from '../services/steamService';

const router = Router();

const matchesLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 30,
  standardHeaders: true,
  legacyHeaders: false,
});

// GET /api/matches — requires auth, returns last 8 CS2 matches
router.get('/', matchesLimiter, requireAuth, (_req: Request, res: Response) => {
  // In development, return mock data
  if (process.env.NODE_ENV === 'development') {
    res.json(MOCK_MATCHES);
    return;
  }

  // In production, this would call the Steam API
  // For now, return mock data as Steam match history API is limited
  res.json(MOCK_MATCHES);
});

export default router;

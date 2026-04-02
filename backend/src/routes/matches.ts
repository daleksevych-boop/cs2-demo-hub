import { Router, Request, Response } from 'express';
import rateLimit from 'express-rate-limit';
import requireAuth from '../middleware/requireAuth';
import { MOCK_MATCHES } from '../services/steamService';

const router = Router();

const matchesLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 60,
  standardHeaders: true,
  legacyHeaders: false,
});

// GET /api/matches
router.get('/', matchesLimiter, requireAuth, (_req: Request, res: Response) => {
  // In development, return mock data
  if (process.env.NODE_ENV === 'development') {
    return res.json(MOCK_MATCHES);
  }

  // TODO: Real Steam API integration for production
  return res.json(MOCK_MATCHES);
});

export default router;

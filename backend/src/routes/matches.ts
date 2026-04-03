import { Router, Request, Response } from 'express';
import rateLimit from 'express-rate-limit';
import axios from 'axios';
import { requireAuth } from '../middleware/requireAuth';
import { getRecentMatches } from '../services/steamService';
import { decodeMatchShareCode, InvalidShareCode } from 'csgo-sharecode';

const router = Router();

const matchesLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 30,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many requests, please try again later.' },
});

const demoUrlLimiter = rateLimit({
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

router.get('/:shareCode/demo-url', demoUrlLimiter, requireAuth, async (req: Request, res: Response) => {
  try {
    const { shareCode } = req.params;
    const { matchId, reservationId } = decodeMatchShareCode(shareCode);
    const filename = `cs2_demo_${matchId}.dem.bz2`;

    const replayServers = [101, 102, 103, 104, 105];
    let lastError: unknown;

    for (const serverNum of replayServers) {
      const demoUrl = `http://replay${serverNum}.valve.net/730/${matchId}_${reservationId}.dem.bz2`;
      try {
        const response = await axios({
          method: 'GET',
          url: demoUrl,
          responseType: 'stream',
          timeout: 10000,
        });

        res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
        res.setHeader('Content-Type', 'application/octet-stream');

        if (response.headers['content-length']) {
          res.setHeader('Content-Length', response.headers['content-length']);
        }

        response.data.on('error', (streamErr: Error) => {
          console.error(`Stream error from replay${serverNum}.valve.net for shareCode ${req.params.shareCode}:`, streamErr);
          if (!res.headersSent) {
            res.status(500).json({ error: 'Failed to stream demo file' });
          } else {
            res.destroy();
          }
        });

        response.data.pipe(res);
        return;
      } catch (err) {
        lastError = err;
      }
    }

    console.error(`All replay servers (101-105) failed for shareCode ${req.params.shareCode}:`, lastError);
    res.status(404).json({ error: 'Demo not available' });
  } catch (err) {
    if (err instanceof InvalidShareCode) {
      res.status(400).json({ error: 'Invalid share code' });
    } else {
      console.error('Error resolving demo URL:', err);
      res.status(500).json({ error: 'Failed to resolve demo URL' });
    }
  }
});

export default router;

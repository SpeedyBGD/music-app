import { Request, Response } from 'express';
import rateLimit from 'express-rate-limit';

export const rateLimiter = rateLimit({
  windowMs: 6 * 1000, // 6 seconds
  max: 2, // Allow 2 requests per windowMs
  message: { message: 'Previše zahteva za lajkovanje, sačekaj minut.' },
  handler: (req: Request, res: Response) => {
    res.status(429).json({
      error: true,
      message: 'Previše zahteva sa ovog uređaja, sačekajte minut.',
    });
  },
});

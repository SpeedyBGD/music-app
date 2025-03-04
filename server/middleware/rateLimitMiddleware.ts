import { Request, Response } from 'express';
import rateLimit from 'express-rate-limit';

export const rateLimiter = rateLimit({
  windowMs: 6 * 1000,
  max: 2,
  handler: (req: Request, res: Response) => {
    res.status(429).json({
      error: true,
      message: 'Previše zahteva sa ovog uređaja, sačekajte minut.',
    });
  },
});

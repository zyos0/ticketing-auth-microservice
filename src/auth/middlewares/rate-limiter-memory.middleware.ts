import { RateLimiterMemory } from 'rate-limiter-flexible';
import { SecurityConf } from '../config';
import { HttpStatus } from '@nestjs/common';
import { ErrorMessages } from '../responses';

const rateLimiterMemory = new RateLimiterMemory({
  points: SecurityConf.points,
  duration: SecurityConf.duration,
});

export const rateLimiterMiddleware = (req, res, next) => {
  rateLimiterMemory.consume(req.ip)
    .then(() => {
      next();
    })
    .catch(() => {
      res.status(HttpStatus.TOO_MANY_REQUESTS).json({ code: HttpStatus.TOO_MANY_REQUESTS, error: ErrorMessages.GLOBAL_TO_MANY_REQUESTS });
    });
};

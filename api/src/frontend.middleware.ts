/* eslint-disable prettier/prettier */
import { Catch, NestMiddleware, NotFoundException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { join } from 'path';

@Catch(NotFoundException)
export class FrontEndMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    if (!req.url.startsWith('/api')) {
      res.sendFile('index.html', { root: join(__dirname, '..', 'public') });
    }

    next();
  }
}

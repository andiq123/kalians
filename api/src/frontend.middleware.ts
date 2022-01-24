import { NestMiddleware } from '@nestjs/common';
import { NextFunction } from 'express';

export class FrontEndMiddleware implements NestMiddleware {
  use(req: Request, res: any, next: NextFunction) {
    res.sendFile('index.html', { root: './public' });
    next();
  }
}

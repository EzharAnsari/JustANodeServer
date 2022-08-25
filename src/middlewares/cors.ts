import { Request, Response, NextFunction } from 'express';

class CorsAllowMiddleware {
  constructor() {
    // Empty
  }

  async allowCors(req: Request, res: Response, next: NextFunction) {
    const { origin, referer } = req.headers;
    const allowOrigin = origin || referer || '*';

    res.header('Access-Control-Allow-Origin', allowOrigin);
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
    res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Credentials', 'true'); // carry cookies
    res.header('X-Powered-By', 'Express');
    if (req.method == 'OPTIONS') {
      res.sendStatus(200);
    } else {
      next();
    }
  }
}

export default new CorsAllowMiddleware();

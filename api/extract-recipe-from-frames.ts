import app from '../server';

export default function handler(req: any, res: any) {
  req.url = '/api/extract-recipe-from-frames';
  return app(req, res);
}

export { app };

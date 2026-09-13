import app from '../server';

export default function handler(req: any, res: any) {
  // Ensure Express matches the extract-recipe route regardless of Vercel URL stripping
  req.url = '/api/extract-recipe';
  return app(req, res);
}

export { app };

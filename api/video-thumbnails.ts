import app from '../server.ts';

export const config = {
  maxDuration: 30,
};

export default function handler(req: any, res: any) {
  req.url = '/api/video-thumbnails';
  if (req.body && typeof req.body === 'object') {
    (req as any)._body = true;
  }
  return app(req, res);
}

export { app };


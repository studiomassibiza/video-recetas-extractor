import app from '../server.ts';

export const config = {
  maxDuration: 30,
};

export default function handler(req: any, res: any) {
  // Normalize URL for Express
  let targetUrl = req.url || '';

  // 1. Check query parameter from vercel.json rewrite: /api?__route=$1 or ?path=$1
  const routeParam = req.query?.__route || req.query?.path;
  if (routeParam && typeof routeParam === 'string') {
    targetUrl = `/api/${routeParam.replace(/^\/+/, '')}`;
  } else {
    // 2. Check headers provided by Vercel / Proxies
    const xMatchedPath = req.headers['x-matched-path'] || req.headers['x-vercel-matched-path'];
    const xOriginalUrl = req.headers['x-original-url'] || req.headers['x-real-url'] || req.headers['x-forwarded-uri'];

    if (xOriginalUrl && typeof xOriginalUrl === 'string' && xOriginalUrl.startsWith('/api')) {
      targetUrl = xOriginalUrl;
    } else if (xMatchedPath && typeof xMatchedPath === 'string' && xMatchedPath.startsWith('/api') && xMatchedPath !== '/api') {
      targetUrl = xMatchedPath;
    }
  }

  // Ensure valid Express route
  if (!targetUrl || targetUrl === '/' || targetUrl === '/api') {
    if (req.url && req.url !== '/' && req.url !== '/api') {
      targetUrl = req.url.startsWith('/') ? req.url : `/${req.url}`;
    }
  }

  if (targetUrl) {
    req.url = targetUrl;
  }

  if (req.body && typeof req.body === 'object') {
    (req as any)._body = true;
  }

  return app(req, res);
}

export { app };



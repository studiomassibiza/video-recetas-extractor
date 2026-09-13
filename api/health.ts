export default function handler(_req: any, res: any) {
  return res.status(200).json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    env: process.env.VERCEL ? 'vercel' : 'server'
  });
}


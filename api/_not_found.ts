import type { VercelRequest, VercelResponse } from '@vercel/node';
import fs from 'fs';
import path from 'path';

// Fallback handler for SPA routing
// When a path isn't found as a static file, serve index.html
export default async (req: VercelRequest, res: VercelResponse) => {
  const indexPath = path.join(process.cwd(), 'public', 'index.html');
  
  try {
    const html = fs.readFileSync(indexPath, 'utf-8');
    res.setHeader('Content-Type', 'text/html');
    res.status(200).send(html);
  } catch (error) {
    res.status(404).json({ error: 'Not found' });
  }
};

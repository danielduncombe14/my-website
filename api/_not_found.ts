import type { VercelRequest, VercelResponse } from '@vercel/node';
import fs from 'fs';
import path from 'path';

// Fallback handler for SPA routing
// When a path isn't found as a static file, serve index.html
export default async (req: VercelRequest, res: VercelResponse) => {
  try {
    // In Vercel, public folder is at the root after build
    const indexPath = path.join(process.cwd(), 'public', 'index.html');
    
    if (fs.existsSync(indexPath)) {
      const html = fs.readFileSync(indexPath, 'utf-8');
      res.setHeader('Content-Type', 'text/html');
      res.status(200).send(html);
    } else {
      // Fallback if index.html not found
      res.status(404).json({ error: 'Not found' });
    }
  } catch (error) {
    console.error('Error serving index.html:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

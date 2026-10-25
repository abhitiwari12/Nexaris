import express from 'express';
import http from 'node:http';
import cookieParser from 'cookie-parser';
import path from 'node:path';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';
import { createServer as createViteServer } from 'vite';
import { router as apiRouter } from './server/routes.js';
import { ensureOwnerAccount } from './server/auth.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const server = http.createServer(app);
  const PORT = Number(process.env.PORT) || 3000;
  const isProduction = process.env.NODE_ENV === 'production';

  // Seed / ensure owner account is configured
  ensureOwnerAccount();

  // Basic security and parsing middleware
  app.use(express.json({ limit: '10mb' }));
  app.use(express.urlencoded({ extended: true, limit: '10mb' }));
  app.use(cookieParser());

  // Mount API router
  app.use('/api', apiRouter);

  // Serve static assets from public directory
  const publicPath = path.resolve(__dirname, 'public');
  if (fs.existsSync(publicPath)) {
    app.use(express.static(publicPath));
    app.use('/public', express.static(publicPath));
  }

  // Health check endpoint
  app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok', time: new Date().toISOString() });
  });

  if (isProduction) {
    const distPath = path.resolve(__dirname, 'dist');
    if (fs.existsSync(distPath)) {
      app.use(express.static(distPath));
      app.get('*', (_req, res) => {
        res.sendFile(path.resolve(distPath, 'index.html'));
      });
    } else {
      console.warn('Production build dist/ not found. Running in dev fallback.');
    }
  } else {
    // Mount Vite dev server middleware in dev mode
    const vite = await createViteServer({
      server: {
        middlewareMode: true,
        ws: {
          server,
        },
        hmr: {
          server,
        },
      },
      appType: 'spa',
    });
    app.use(vite.middlewares);
    app.use('*', async (req, res, next) => {
      const url = req.originalUrl;
      try {
        let template = fs.readFileSync(path.resolve(__dirname, 'index.html'), 'utf-8');
        template = await vite.transformIndexHtml(url, template);
        res.status(200).set({ 'Content-Type': 'text/html' }).end(template);
      } catch (e) {
        if (vite && typeof vite.ssrFixStacktrace === 'function') {
          vite.ssrFixStacktrace(e as Error);
        }
        next(e);
      }
    });
  }

  server.listen(PORT, '0.0.0.0', () => {
    console.log(`NEXARIS Server active on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Fatal server startup error:', err);
  process.exit(1);
});

import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes.ts";
import { setupVite, serveStatic, log } from "./vite.ts";

const app = express();

declare module 'http' {
  interface IncomingMessage {
    rawBody: unknown
  }
}
app.use(express.json({
  verify: (req, _res, buf) => {
    req.rawBody = buf;
  }
}));
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "…";
      }

      log(logLine);
    }
  });

  next();
});

let appPromise: Promise<Express> | null = null;

async function initializeApp(): Promise<Express> {
  const server = await registerRoutes(app);

  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    // Type-safe status extraction with proper fallback
    const status = typeof err.status === 'number' ? err.status :
                   typeof err.statusCode === 'number' ? err.statusCode :
                   500;
    const message = String(err?.message || "Internal Server Error");

    // Only send response if headers haven't been sent
    if (!res.headersSent) {
      res.status(status).json({ message });
    }
    
    // Log the error for debugging
    console.error("[ERROR]", { status, message, stack: err?.stack });
  });

  // importantly only setup vite in development and after
  // setting up all the other routes so the catch-all route
  // doesn't interfere with the other routes
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  // ALWAYS serve the app on the port specified in the environment variable PORT
  // Other ports are firewalled. Default to 5000 if not specified.
  // this serves both the API and the client.
  // It is the only port that is not firewalled.
  const port = parseInt(process.env.PORT || '5000', 10);
  const host = process.env.HOST || "127.0.0.1";
  
  // Only start the server if not running on Vercel (which handles listening)
  if (!process.env.VERCEL) {
    server.listen({
      port,
      host,
    }, () => {
      log(`serving on http://${host}:${port}`);
    });
  }

  return app;
}

// Lazy initialization - ensures app is ready before handling requests
function getInitializedApp(): Promise<Express> {
  if (!appPromise) {
    appPromise = initializeApp().catch((err) => {
      console.error("[FATAL] Failed to initialize app:", err);
      return app;
    });
  }
  return appPromise;
}

// Initialize app on import
getInitializedApp().catch((err) => {
  console.error("[FATAL] Initialization error:", err);
});

// Export app directly - Vercel/Node will handle it
export default app;
export { app, getInitializedApp };

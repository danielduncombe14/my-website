import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes.ts";

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Error handling middleware
app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
  const status = typeof err.status === 'number' ? err.status :
                 typeof err.statusCode === 'number' ? err.statusCode :
                 500;
  const message = String(err?.message || "Internal Server Error");

  if (!res.headersSent) {
    res.status(status).json({ message });
  }
  
  console.error("[ERROR]", { status, message, stack: err?.stack });
});

// Initialize routes
// Synchronously register routes
registerRoutes(app).catch((err) => {
  console.error("[FATAL] Failed to register routes:", err);
  // Only exit if not on Vercel (Vercel uses serverless functions)
  if (!process.env.VERCEL) {
    process.exit(1);
  }
});

export default app;

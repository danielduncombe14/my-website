import type { Express } from "express";
import { storage } from "./storage.ts";

// Helper to handle async route errors with proper logging
const asyncHandler = (fn: (req: any, res: any) => Promise<void>) => 
  (req: any, res: any) => {
    return Promise.resolve(fn(req, res)).catch((error: any) => {
      // Only send error response if headers haven't been sent
      if (!res.headersSent) {
        console.error("[Route Error]", {
          path: req.path,
          method: req.method,
          error: error?.message || String(error),
          stack: error?.stack,
        });
        res.status(500).json({ error: "Internal server error" });
      } else {
        // Headers already sent, just log
        console.error("[Route Error - Headers Sent]", error?.message || String(error));
      }
    });
  };

// Helper to validate blog type
const isValidBlogType = (type: string): type is "personal" | "business" =>
  type === "personal" || type === "business";

export async function registerRoutes(app: Express): Promise<void> {
  // Blog Posts Routes
  app.get("/api/blog/:type", asyncHandler(async (req, res) => {
    const { type } = req.params;
    if (!isValidBlogType(type)) {
      return res.status(400).json({ error: "Invalid blog type" });
    }
    const posts = await storage.getAllBlogPosts(type);
    res.json(posts);
  }));

  app.get("/api/blog/:type/:id", asyncHandler(async (req, res) => {
    const { type, id } = req.params;
    if (!isValidBlogType(type)) {
      return res.status(400).json({ error: "Invalid blog type" });
    }
    const post = await storage.getBlogPostById(id);
    if (!post) {
      return res.status(404).json({ error: "Blog post not found" });
    }
    if (post.type !== type) {
      return res.status(404).json({ error: "Blog post not found in this category" });
    }
    res.json(post);
  }));

  // Credentials Routes
  app.get("/api/credentials", asyncHandler(async (_req, res) => {
    const credentials = await storage.getAllCredentials();
    res.json(credentials);
  }));

  app.get("/api/credentials/:id", asyncHandler(async (req, res) => {
    const { id } = req.params;
    const credential = await storage.getCredentialById(id);
    if (!credential) {
      return res.status(404).json({ error: "Credential not found" });
    }
    res.json(credential);
  }));

  // Gallery Routes
  app.get("/api/gallery", asyncHandler(async (_req, res) => {
    const items = await storage.getAllGalleryItems();
    res.json(items);
  }));

  app.get("/api/gallery/:id", asyncHandler(async (req, res) => {
    const { id } = req.params;
    const item = await storage.getGalleryItemById(id);
    if (!item) {
      return res.status(404).json({ error: "Gallery item not found" });
    }
    res.json(item);
  }));
}

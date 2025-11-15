import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  // Blog Posts Routes
  app.get("/api/blog/:type", async (req, res) => {
    try {
      const { type } = req.params;
      if (type !== "personal" && type !== "business") {
        return res.status(400).json({ error: "Invalid blog type" });
      }
      const posts = await storage.getAllBlogPosts(type);
      res.json(posts);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch blog posts" });
    }
  });

  app.get("/api/blog/:type/:id", async (req, res) => {
    try {
      const { type, id } = req.params;
      if (type !== "personal" && type !== "business") {
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
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch blog post" });
    }
  });

  // Credentials Routes
  app.get("/api/credentials", async (_req, res) => {
    try {
      const credentials = await storage.getAllCredentials();
      res.json(credentials);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch credentials" });
    }
  });

  app.get("/api/credentials/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const credential = await storage.getCredentialById(id);
      if (!credential) {
        return res.status(404).json({ error: "Credential not found" });
      }
      res.json(credential);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch credential" });
    }
  });

  // Gallery Routes
  app.get("/api/gallery", async (_req, res) => {
    try {
      const items = await storage.getAllGalleryItems();
      res.json(items);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch gallery items" });
    }
  });

  app.get("/api/gallery/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const item = await storage.getGalleryItemById(id);
      if (!item) {
        return res.status(404).json({ error: "Gallery item not found" });
      }
      res.json(item);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch gallery item" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}

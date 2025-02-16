import type { Express } from "express";
import { createServer } from "http";
import { storage } from "./storage";
import { insertInquirySchema } from "@shared/schema";

export async function registerRoutes(app: Express) {
  app.get('/api/services', async (_req, res) => {
    const services = await storage.getServices();
    res.json(services);
  });

  app.get('/api/services/:slug', async (req, res) => {
    const service = await storage.getServiceBySlug(req.params.slug);
    if (!service) {
      res.status(404).json({ message: 'Service not found' });
      return;
    }
    res.json(service);
  });

  app.get('/api/locations', async (_req, res) => {
    const locations = await storage.getLocations();
    res.json(locations);
  });

  app.post('/api/inquiries', async (req, res) => {
    const result = insertInquirySchema.safeParse(req.body);
    if (!result.success) {
      res.status(400).json({ message: 'Invalid inquiry data' });
      return;
    }

    const inquiry = await storage.createInquiry(result.data);
    res.json(inquiry);
  });

  const httpServer = createServer(app);
  return httpServer;
}

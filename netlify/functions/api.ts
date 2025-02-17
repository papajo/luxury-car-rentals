import express, { Router } from "express";
import serverless from "serverless-http";
import { storage } from "../../server/storage";
import { insertInquirySchema } from "../../shared/schema";

const api = express();
const router = Router();

// CORS middleware
api.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

router.get('/services', async (_req, res) => {
  const services = await storage.getServices();
  res.json(services);
});

router.get('/services/:slug', async (req, res) => {
  const service = await storage.getServiceBySlug(req.params.slug);
  if (!service) {
    res.status(404).json({ message: 'Service not found' });
    return;
  }
  res.json(service);
});

router.get('/locations', async (_req, res) => {
  const locations = await storage.getLocations();
  res.json(locations);
});

router.post('/inquiries', async (req, res) => {
  const result = insertInquirySchema.safeParse(req.body);
  if (!result.success) {
    res.status(400).json({ message: 'Invalid inquiry data' });
    return;
  }

  const inquiry = await storage.createInquiry(result.data);
  res.json(inquiry);
});

api.use('/api/', router);

export const handler = serverless(api);

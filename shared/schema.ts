import { pgTable, text, serial, integer, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const services = pgTable("services", {
  id: serial("id").primaryKey(),
  nameEn: text("name_en").notNull(),
  nameIt: text("name_it").notNull(),
  descriptionEn: text("description_en").notNull(),
  descriptionIt: text("description_it").notNull(),
  image: text("image").notNull(),
  slug: text("slug").notNull().unique(),
});

export const locations = pgTable("locations", {
  id: serial("id").primaryKey(),
  nameEn: text("name_en").notNull(),
  nameIt: text("name_it").notNull(),
  province: text("province").notNull(),
  slug: text("slug").notNull().unique(),
});

export const inquiries = pgTable("inquiries", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  serviceId: integer("service_id").references(() => services.id),
  locationId: integer("location_id").references(() => locations.id),
  message: text("message").notNull(),
});

export const insertInquirySchema = createInsertSchema(inquiries);
export type InsertInquiry = z.infer<typeof insertInquirySchema>;
export type Service = typeof services.$inferSelect;
export type Location = typeof locations.$inferSelect;
export type Inquiry = typeof inquiries.$inferSelect;

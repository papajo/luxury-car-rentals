import { services, locations, inquiries, type Service, type Location, type Inquiry, type InsertInquiry } from "@shared/schema";

export interface IStorage {
  getServices(): Promise<Service[]>;
  getServiceBySlug(slug: string): Promise<Service | undefined>;
  getLocations(): Promise<Location[]>;
  getLocationBySlug(slug: string): Promise<Location | undefined>;
  createInquiry(inquiry: InsertInquiry): Promise<Inquiry>;
}

export class MemStorage implements IStorage {
  private services: Map<number, Service>;
  private locations: Map<number, Location>;
  private inquiries: Map<number, Inquiry>;
  private currentServiceId: number;
  private currentLocationId: number;
  private currentInquiryId: number;

  constructor() {
    this.services = new Map();
    this.locations = new Map();
    this.inquiries = new Map();
    this.currentServiceId = 1;
    this.currentLocationId = 1;
    this.currentInquiryId = 1;

    // Initialize with sample data
    this.initializeSampleData();
  }

  private initializeSampleData() {
    // Add sample services
    const sampleServices: Omit<Service, 'id'>[] = [
      {
        nameEn: 'Rolls-Royce Ghost 6.6',
        nameIt: 'Rolls-Royce Ghost 6.6',
        descriptionEn: 'Experience luxury with our Rolls-Royce Ghost rental service.',
        descriptionIt: 'Vivi il lusso con il nostro servizio di noleggio Rolls-Royce Ghost.',
        image: '/images/rolls-royce-ghost.jpg',
        slug: 'rolls-royce-ghost',
      },
      {
        nameEn: 'Wedding Service',
        nameIt: 'Servizio Matrimoni',
        descriptionEn: 'Make your special day even more memorable with our luxury car service.',
        descriptionIt: 'Rendi il tuo giorno speciale ancora più memorabile con il nostro servizio auto di lusso.',
        image: '/images/wedding-service.jpg',
        slug: 'wedding-service',
      },
      {
        nameEn: 'Private Events',
        nameIt: 'Eventi Privati',
        descriptionEn: 'Elevate your private events with our premium car service.',
        descriptionIt: 'Eleva i tuoi eventi privati con il nostro servizio auto premium.',
        image: '/images/private-events.jpg',
        slug: 'private-events',
      },
    ];

    sampleServices.forEach((service) => {
      const id = this.currentServiceId++;
      this.services.set(id, { ...service, id });
    });

    // Add sample locations
    const sampleLocations: Omit<Location, 'id'>[] = [
      {
        nameEn: 'Naples',
        nameIt: 'Napoli',
        province: 'Naples',
        slug: 'naples',
      },
      {
        nameEn: 'Salerno',
        nameIt: 'Salerno',
        province: 'Salerno',
        slug: 'salerno',
      },
      {
        nameEn: 'Caserta',
        nameIt: 'Caserta',
        province: 'Caserta',
        slug: 'caserta',
      },
    ];

    sampleLocations.forEach((location) => {
      const id = this.currentLocationId++;
      this.locations.set(id, { ...location, id });
    });
  }

  async getServices(): Promise<Service[]> {
    return Array.from(this.services.values());
  }

  async getServiceBySlug(slug: string): Promise<Service | undefined> {
    return Array.from(this.services.values()).find(
      (service) => service.slug === slug,
    );
  }

  async getLocations(): Promise<Location[]> {
    return Array.from(this.locations.values());
  }

  async getLocationBySlug(slug: string): Promise<Location | undefined> {
    return Array.from(this.locations.values()).find(
      (location) => location.slug === slug,
    );
  }

  async createInquiry(insertInquiry: InsertInquiry): Promise<Inquiry> {
    const id = this.currentInquiryId++;
    const inquiry: Inquiry = { ...insertInquiry, id };
    this.inquiries.set(id, inquiry);
    return inquiry;
  }
}

export const storage = new MemStorage();
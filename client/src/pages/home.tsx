import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import ServiceCard from '@/components/services/ServiceCard';
import { useQuery } from '@tanstack/react-query';
import { useLocation } from 'wouter';
import type { Service } from '@shared/schema';

export default function Home() {
  const { t } = useLanguage();
  const [, setLocation] = useLocation();
  
  const { data: services } = useQuery<Service[]>({
    queryKey: ['/api/services'],
  });

  return (
    <div>
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center bg-gradient-to-r from-primary/90 to-primary text-primary-foreground">
        <div className="container px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            {t('luxuryCarRental')}
          </h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Experience luxury and comfort with our premium car rental services
          </p>
          <Button size="lg" onClick={() => setLocation('/contact')}>
            {t('bookNow')}
          </Button>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 bg-background">
        <div className="container px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            {t('ourServices')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services?.map((service) => (
              <ServiceCard
                key={service.id}
                service={service}
                onClick={() => setLocation(`/services/${service.slug}`)}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

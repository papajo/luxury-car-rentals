import { useQuery } from '@tanstack/react-query';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import LocationSelector from '@/components/locations/LocationSelector';
import type { Service, Location } from '@shared/schema';
import { useLocation } from 'wouter';

export default function ServicePage({ params }: { params: { service: string } }) {
  const { language, t } = useLanguage();
  const [, setLocation] = useLocation();

  const { data: service } = useQuery<Service>({
    queryKey: ['/api/services', params.service],
  });

  const { data: locations } = useQuery<Location[]>({
    queryKey: ['/api/locations'],
  });

  if (!service) return null;

  return (
    <div className="pt-16">
      <div className="aspect-[21/9] relative">
        <img
          src={service.image}
          alt={language === 'en' ? service.nameEn : service.nameIt}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <h1 className="text-white text-4xl md:text-6xl font-bold">
            {language === 'en' ? service.nameEn : service.nameIt}
          </h1>
        </div>
      </div>

      <div className="container px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <p className="text-lg mb-8">
            {language === 'en' ? service.descriptionEn : service.descriptionIt}
          </p>

          <div className="space-y-4">
            <LocationSelector
              locations={locations || []}
              onChange={(slug) => setLocation(`/locations/${slug}`)}
            />
            <Button
              size="lg"
              className="w-full"
              onClick={() => setLocation('/contact')}
            >
              {t('bookNow')}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import type { Service } from '@shared/schema';

interface ServiceCardProps {
  service: Service;
  onClick: () => void;
}

export default function ServiceCard({ service, onClick }: ServiceCardProps) {
  const { language, t } = useLanguage();
  
  return (
    <Card className="overflow-hidden group hover:shadow-lg transition-shadow">
      <div className="aspect-video overflow-hidden">
        <img
          src={service.image}
          alt={language === 'en' ? service.nameEn : service.nameIt}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <CardHeader>
        <CardTitle>
          {language === 'en' ? service.nameEn : service.nameIt}
        </CardTitle>
        <CardDescription className="line-clamp-2">
          {language === 'en' ? service.descriptionEn : service.descriptionIt}
        </CardDescription>
        <Button onClick={onClick} className="mt-4">
          {t('bookNow')}
        </Button>
      </CardHeader>
    </Card>
  );
}

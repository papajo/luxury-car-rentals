import { useQuery } from '@tanstack/react-query';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import ServiceCard from '@/components/services/ServiceCard';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { MapPin, Phone, Mail, Car, CalendarRange } from 'lucide-react';
import type { Location, Service } from '@shared/schema';
import { useLocation } from 'wouter';
import { motion } from 'framer-motion';

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

export default function LocationPage({ params }: { params: { location: string } }) {
  const { language, t } = useLanguage();
  const [, setLocation] = useLocation();

  const { data: location } = useQuery<Location>({
    queryKey: ['/api/locations', params.location],
  });

  const { data: services } = useQuery<Service[]>({
    queryKey: ['/api/services'],
  });

  if (!location) return null;

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <motion.section 
        className="relative h-[50vh] bg-gradient-to-r from-primary to-primary/80 text-primary-foreground"
        initial="initial"
        animate="animate"
        variants={fadeIn}
      >
        <div className="container h-full px-4 flex flex-col justify-center items-center text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            {language === 'en' ? location.nameEn : location.nameIt}
          </h1>
          <p className="text-xl opacity-90">
            {language === 'en' ? 'Luxury Car Services in' : 'Servizi Auto di Lusso a'} {location.province}
          </p>
        </div>
      </motion.section>

      {/* Location Information */}
      <section className="py-16 bg-background">
        <div className="container px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <motion.div 
              className="col-span-full lg:col-span-2"
              initial="initial"
              animate="animate"
              variants={fadeIn}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5" />
                    {t('locations')}
                  </CardTitle>
                  <CardDescription>
                    {language === 'en' 
                      ? `Discover our premium services in ${location.nameEn}`
                      : `Scopri i nostri servizi premium a ${location.nameIt}`
                    }
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Phone className="h-5 w-5 text-primary" />
                    <span>+39 123 456 789</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-primary" />
                    <span>info@luxurycars.com</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Car className="h-5 w-5 text-primary" />
                    <span>24/7 {language === 'en' ? 'Service Available' : 'Servizio Disponibile'}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CalendarRange className="h-5 w-5 text-primary" />
                    <span>{language === 'en' ? 'Advance Booking Required' : 'Prenotazione Anticipata Richiesta'}</span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div 
              className="col-span-full lg:col-span-1"
              initial="initial"
              animate="animate"
              variants={fadeIn}
            >
              <Button 
                size="lg" 
                className="w-full"
                onClick={() => setLocation('/contact')}
              >
                {t('bookNow')}
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Available Services */}
      <section className="py-16 bg-muted">
        <div className="container px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            {language === 'en' 
              ? `Our Services in ${location.nameEn}`
              : `I Nostri Servizi a ${location.nameIt}`
            }
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services?.map((service) => (
              <motion.div
                key={service.id}
                initial="initial"
                animate="animate"
                variants={fadeIn}
              >
                <ServiceCard
                  service={service}
                  onClick={() => setLocation(`/services/${service.slug}`)}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <motion.section 
        className="py-16 bg-primary text-primary-foreground text-center"
        initial="initial"
        animate="animate"
        variants={fadeIn}
      >
        <div className="container px-4">
          <h2 className="text-3xl font-bold mb-6">
            {language === 'en' 
              ? 'Experience Luxury in'
              : 'Vivi il Lusso a'} {location.nameEn}
          </h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto opacity-90">
            {language === 'en'
              ? 'Book your premium car service today and enjoy an unforgettable experience.'
              : 'Prenota oggi il tuo servizio auto premium e goditi un\'esperienza indimenticabile.'
            }
          </p>
          <Button 
            size="lg"
            variant="secondary"
            onClick={() => setLocation('/contact')}
          >
            {t('contactUs')}
          </Button>
        </div>
      </motion.section>
    </div>
  );
}

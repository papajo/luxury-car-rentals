import { useLanguage } from '@/contexts/LanguageContext';

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-semibold text-lg mb-4">Luxury Cars</h3>
            <p className="text-sm opacity-80">
              Premium luxury car rental services in Campania, Italy.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-4">{t('services')}</h3>
            <ul className="space-y-2">
              <li>{t('rollsRoyceGhost')}</li>
              <li>{t('weddings')}</li>
              <li>{t('privateParties')}</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-4">{t('contact')}</h3>
            <address className="not-italic">
              <p>Email: info@luxurycars.com</p>
              <p>Tel: +39 123 456 789</p>
            </address>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-primary-foreground/20 text-center">
          <p className="text-sm opacity-80">
            © {new Date().getFullYear()} Luxury Cars. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

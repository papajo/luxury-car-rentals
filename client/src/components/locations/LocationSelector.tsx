import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useLanguage } from '@/contexts/LanguageContext';
import type { Location } from '@shared/schema';

interface LocationSelectorProps {
  locations: Location[];
  value?: string;
  onChange: (value: string) => void;
}

export default function LocationSelector({
  locations,
  value,
  onChange,
}: LocationSelectorProps) {
  const { language, t } = useLanguage();

  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger>
        <SelectValue placeholder={t('selectLocation')} />
      </SelectTrigger>
      <SelectContent>
        {locations.map((location) => (
          <SelectItem key={location.id} value={location.slug}>
            {language === 'en' ? location.nameEn : location.nameIt}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

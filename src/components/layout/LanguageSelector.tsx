
import { useLanguage, languages } from '@/contexts/LanguageContext';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Globe } from 'lucide-react';

const LanguageSelector = () => {
  const { currentLanguage, setLanguage } = useLanguage();

  return (
    <div className="flex items-center gap-2">
      <Globe className="h-4 w-4 text-sapp-gray" />
      <Select
        value={currentLanguage.code}
        onValueChange={(value) => {
          const language = languages.find(lang => lang.code === value);
          if (language) setLanguage(language);
        }}
      >
        <SelectTrigger className="h-8 w-[110px] border-none bg-transparent hover:bg-slate-100 focus:ring-0">
          <SelectValue placeholder={currentLanguage.name} />
        </SelectTrigger>
        <SelectContent>
          {languages.map((language) => (
            <SelectItem key={language.code} value={language.code} className="cursor-pointer">
              <div className="flex items-center gap-2">
                <span className="text-base">{language.flag}</span>
                <span>{language.name}</span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default LanguageSelector;


import { useLanguage, languages } from '@/contexts/LanguageContext';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Globe } from 'lucide-react';
import { cn } from '@/lib/utils';

const LanguageSelector = () => {
  const { currentLanguage, setLanguage } = useLanguage();

  return (
    <div className="flex items-center">
      <Select
        value={currentLanguage.code}
        onValueChange={(value) => {
          const language = languages.find(lang => lang.code === value);
          if (language) setLanguage(language);
        }}
      >
        <SelectTrigger 
          className="h-10 w-10 border-none bg-transparent hover:bg-slate-100 focus:ring-0 p-0 overflow-hidden"
          aria-label="Select Language"
        >
          <div className="flex items-center justify-center w-full h-full">
            <Globe 
              className={cn(
                "h-6 w-6 animate-spin-slow",
                currentLanguage.code === 'en' && "text-blue-600",
                currentLanguage.code === 'de' && "text-yellow-600",
                currentLanguage.code === 'nl' && "text-orange-600",
                currentLanguage.code === 'fr' && "text-blue-700"
              )} 
            />
          </div>
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

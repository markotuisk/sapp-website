
import { useLanguage } from '@/hooks/useLanguage';
import { languages } from '@/data/translations';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Globe } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from '@/hooks/use-toast';
import { DebugInfo, useComponentLogger, useDebugContext } from '@/utils/debugTools';

const LanguageSelector = () => {
  const { currentLanguage, setLanguage } = useLanguage();
  const { logEvent } = useComponentLogger('LanguageSelector');
  const { isDebugMode } = useDebugContext();

  const handleLanguageChange = (value: string) => {
    const language = languages.find(lang => lang.code === value);
    if (language) {
      logEvent('LanguageChanged', { 
        from: currentLanguage.code, 
        to: language.code 
      });
      
      setLanguage(language);
      toast({
        title: `Language changed to ${language.name}`,
        description: "The website language has been updated.",
        duration: 3000,
      });
      
      if (process.env.NODE_ENV === 'development' && isDebugMode) {
        const translationCount = Object.keys(currentLanguage?.translations || {}).length;
        toast({
          title: `Debug: Language Resources Loaded`,
          description: `${translationCount} translation keys available`,
          duration: 5000,
          className: "bg-purple-100 text-purple-900",
        });
      }
    }
  };

  const debugData = {
    currentLanguage: currentLanguage.code,
    availableLanguages: languages.map(l => l.code),
    translationCount: Object.keys(currentLanguage?.translations || {}).length || 0
  };

  // Render the component with or without debug info
  const content = (
    <div className="flex items-center">
      <Select
        value={currentLanguage.code}
        onValueChange={handleLanguageChange}
      >
        <SelectTrigger 
          className="h-10 w-10 border-none bg-transparent hover:bg-slate-100 focus:ring-0 p-0 overflow-hidden"
          aria-label="Select Language"
        >
          <div className="flex items-center justify-center w-full h-full">
            <Globe 
              className={cn(
                "h-6 w-6 animate-spin-slow",
                currentLanguage.code === 'en' && "text-[#032B3B]",
                currentLanguage.code === 'de' && "text-[#032B3B]",
                currentLanguage.code === 'nl' && "text-[#032B3B]",
                currentLanguage.code === 'fr' && "text-[#032B3B]"
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

  // Conditionally wrap in debug info
  if (isDebugMode && process.env.NODE_ENV === 'development') {
    return (
      <DebugInfo componentName="LanguageSelector" data={debugData}>
        {content}
      </DebugInfo>
    );
  }

  return content;
};

export default LanguageSelector;

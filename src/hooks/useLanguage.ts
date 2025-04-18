
import { useContext } from 'react';
import { LanguageContext } from '@/contexts/language/LanguageProvider';
import { LanguageContextType } from '@/types/language';

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

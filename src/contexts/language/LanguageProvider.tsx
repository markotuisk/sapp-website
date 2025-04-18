
import React, { createContext, useState, useEffect } from 'react';
import { Language, LanguageContextType, TranslationKey } from '@/types/language';
import { languages, translations } from '@/data/translations';

// Initialize with English as default
const defaultLanguage = languages.find(lang => lang.code === 'en') || languages[0];

// Create the context with proper type
export const LanguageContext = createContext<LanguageContextType>({
  currentLanguage: defaultLanguage,
  setLanguage: () => {},
  t: (key: TranslationKey) => ''
});

interface LanguageProviderProps {
  children: React.ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState<Language>(defaultLanguage);

  // Check for saved language preference in localStorage
  useEffect(() => {
    const savedLanguageCode = localStorage.getItem('language');
    if (savedLanguageCode) {
      const savedLanguage = languages.find(lang => lang.code === savedLanguageCode);
      if (savedLanguage) {
        setCurrentLanguage(savedLanguage);
      }
    }
  }, []);

  // Translation function
  const t = (key: TranslationKey): string => {
    // Try to get the translation in the current language
    const translatedText = translations[currentLanguage.code]?.[key];
    
    // If not found, fallback to English
    if (!translatedText && currentLanguage.code !== 'en') {
      return translations.en[key] || key;
    }
    
    return translatedText || key;
  };

  // Set language and save preference
  const setLanguage = (language: Language) => {
    setCurrentLanguage(language);
    localStorage.setItem('language', language.code);
  };

  const contextValue = {
    currentLanguage,
    setLanguage,
    t
  };

  return (
    <LanguageContext.Provider value={contextValue}>
      {children}
    </LanguageContext.Provider>
  );
};

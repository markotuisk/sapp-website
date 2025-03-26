
import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = {
  code: string;
  name: string;
  flag: string;
};

export const languages: Language[] = [
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'nl', name: 'Nederlands', flag: '🇳🇱' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
];

// Define translation keys and their values for each language
type TranslationKey = 
  | 'home'
  | 'about'
  | 'services'
  | 'contact'
  | 'learnMore'
  | 'contactUs'
  | 'securitySolutions'
  | 'partners';

type Translations = {
  [key in Language['code']]: {
    [key in TranslationKey]: string;
  };
};

export const translations: Translations = {
  en: {
    home: 'Home',
    about: 'About',
    services: 'Services',
    contact: 'Contact',
    learnMore: 'Learn More',
    contactUs: 'Contact Us',
    securitySolutions: 'Security Solutions',
    partners: 'Partners',
  },
  de: {
    home: 'Startseite',
    about: 'Über uns',
    services: 'Dienstleistungen',
    contact: 'Kontakt',
    learnMore: 'Mehr erfahren',
    contactUs: 'Kontaktiere uns',
    securitySolutions: 'Sicherheitslösungen',
    partners: 'Partner',
  },
  nl: {
    home: 'Home',
    about: 'Over ons',
    services: 'Diensten',
    contact: 'Contact',
    learnMore: 'Meer informatie',
    contactUs: 'Neem contact op',
    securitySolutions: 'Beveiligingsoplossingen',
    partners: 'Partners',
  },
  fr: {
    home: 'Accueil',
    about: 'À propos',
    services: 'Services',
    contact: 'Contact',
    learnMore: 'En savoir plus',
    contactUs: 'Contactez-nous',
    securitySolutions: 'Solutions de sécurité',
    partners: 'Partenaires',
  },
};

type LanguageContextType = {
  currentLanguage: Language;
  setLanguage: (language: Language) => void;
  t: (key: TranslationKey) => string;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [currentLanguage, setCurrentLanguage] = useState<Language>(languages[0]);

  const setLanguage = (language: Language) => {
    setCurrentLanguage(language);
    // Here you could add logic to save the language preference to localStorage
  };

  // Translation function
  const t = (key: TranslationKey): string => {
    return translations[currentLanguage.code][key];
  };

  return (
    <LanguageContext.Provider value={{ currentLanguage, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

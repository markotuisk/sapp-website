
export type TranslationKey = 
  | 'home'
  | 'about'
  | 'services'
  | 'contact'
  | 'learnMore'
  | 'contactUs'
  | 'securitySolutions'
  | 'partners'
  | 'headline'
  | 'subheadline'
  | 'exploreServices'
  | 'discoverMore'
  | 'eventSecurity'
  | 'audits'
  | 'securityAudits'
  | 'installations'
  | 'cyberSecurity'
  | 'clientArea'
  | 'getInTouch'
  | 'accessNow'
  | 'brandTagline'
  | 'industryLeaders'
  | 'partnersDescription'
  | 'visitWebsite'
  | 'readMore'
  | 'becomePartner'
  | 'becomePartnerDescription'
  | 'partnerWithUs'
  | 'resources'
  | 'currentLanguage';

export type Language = {
  code: string;
  name: string;
  flag: string;
  translations?: {
    [key in TranslationKey]?: string;
  };
};

export type Translations = {
  [key: string]: {
    [key in TranslationKey]: string;
  };
};

export type LanguageContextType = {
  currentLanguage: Language;
  setLanguage: (language: Language) => void;
  t: (key: TranslationKey) => string;
};

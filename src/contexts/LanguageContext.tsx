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
  | 'becomePartner'
  | 'becomePartnerDescription'
  | 'partnerWithUs';

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
    headline: 'Your trusted technical security and privacy partner',
    subheadline: 'We provide comprehensive technical security services for corporate clients in the United Kingdom and Europe, bringing together compliance, physical and cyber security.',
    exploreServices: 'Explore Services',
    discoverMore: 'Discover More',
    eventSecurity: 'Event Security',
    audits: 'Audits',
    securityAudits: 'Security Audits',
    installations: 'Installations',
    cyberSecurity: 'Cyber Security',
    clientArea: 'Client Area',
    getInTouch: 'Get in Touch',
    accessNow: 'Access Now',
    brandTagline: 'Security and Privacy Partners',
    industryLeaders: 'industry leaders',
    partnersDescription: 'We collaborate with trusted partners to deliver comprehensive security solutions that protect your organization from both physical and cyber threats.',
    visitWebsite: 'Visit Website',
    becomePartner: 'Become a SAPP Security Partner',
    becomePartnerDescription: 'Join our network of technology partners and security experts to deliver cutting-edge security solutions to organizations worldwide.',
    partnerWithUs: 'Partner With Us'
  },
  de: {
    home: 'Startseite',
    about: 'Über uns',
    services: 'Dienste',
    contact: 'Kontakt',
    learnMore: 'Mehr erfahren',
    contactUs: 'Kontaktiere uns',
    securitySolutions: 'Sicherheitslösungen',
    partners: 'Partner',
    headline: 'Ihr vertrauenswürdiger Partner für technische Sicherheit und Datenschutz',
    subheadline: 'Wir bieten umfassende technische Sicherheitsdienste für Firmenkunden im Vereinigten Königreich und Europa und verbinden dabei Compliance, physische und Cybersicherheit.',
    exploreServices: 'Dienste entdecken',
    discoverMore: 'Mehr entdecken',
    eventSecurity: 'Veranstaltungssicherheit',
    audits: 'Audits',
    securityAudits: 'Sicherheitsaudits',
    installations: 'Installationen',
    cyberSecurity: 'Cybersicherheit',
    clientArea: 'Kundenbereich',
    getInTouch: 'Kontakt',
    accessNow: 'Zugreifen',
    brandTagline: 'Security and Privacy Partners',
    industryLeaders: 'Branchenführer',
    partnersDescription: 'Wir arbeiten mit vertrauenswürdigen Partnern zusammen, um umfassende Sicherheitslösungen zu liefern, die Ihre Organisation vor physischen und Cyber-Bedrohungen schützen.',
    visitWebsite: 'Website besuchen',
    becomePartner: 'Werden Sie SAPP Sicherheitspartner',
    becomePartnerDescription: 'Schließen Sie sich unserem Netzwerk von Technologiepartnern und Sicherheitsexperten an, um weltweit hochmoderne Sicherheitslösungen für Organisationen anzubieten.',
    partnerWithUs: 'Partner werden'
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
    headline: 'Uw betrouwbare technische beveiligings- en privacypartner',
    subheadline: 'Wij bieden uitgebreide technische beveiligingsdiensten voor zakelijke klanten in het Verenigd Koninkrijk en Europa, waarbij we compliance, fysieke en cyberbeveiliging samenbrengen.',
    exploreServices: 'Diensten verkennen',
    discoverMore: 'Ontdek meer',
    eventSecurity: 'Evenementbeveiliging',
    audits: 'Audits',
    securityAudits: 'Beveiligingsaudits',
    installations: 'Installaties',
    cyberSecurity: 'Cyberbeveiliging',
    clientArea: 'Klantomgeving',
    getInTouch: 'Contact',
    accessNow: 'Toegang',
    brandTagline: 'Security and Privacy Partners',
    industryLeaders: 'marktleiders',
    partnersDescription: 'We werken samen met betrouwbare partners om uitgebreide beveiligingsoplossingen te leveren die uw organisatie beschermen tegen zowel fysieke als cyberbedreigingen.',
    visitWebsite: 'Website bezoeken',
    becomePartner: 'Word een SAPP Beveiligingspartner',
    becomePartnerDescription: 'Sluit u aan bij ons netwerk van technologiepartners en beveiligingsexperts om geavanceerde beveiligingsoplossingen te leveren aan organisaties wereldwijd.',
    partnerWithUs: 'Partner met ons'
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
    headline: 'Votre partenaire de confiance en matière de sécurité technique et de confidentialité',
    subheadline: 'Nous fournissons des services complets de sécurité technique pour les clients professionnels au Royaume-Uni et en Europe, en associant conformité, sécurité physique et cybersécurité.',
    exploreServices: 'Explorer les services',
    discoverMore: 'Découvrir plus',
    eventSecurity: 'Sécurité événementielle',
    audits: 'Audits',
    securityAudits: 'Audits de sécurité',
    installations: 'Installations',
    cyberSecurity: 'Cybersécurité',
    clientArea: 'Espace client',
    getInTouch: 'Contact',
    accessNow: 'Accéder',
    brandTagline: 'Security and Privacy Partners',
    industryLeaders: 'leaders de l\'industrie',
    partnersDescription: 'Nous collaborons avec des partenaires de confiance pour offrir des solutions de sécurité complètes qui protègent votre organisation contre les menaces physiques et cybernétiques.',
    visitWebsite: 'Visiter le site',
    becomePartner: 'Devenez partenaire de sécurité SAPP',
    becomePartnerDescription: 'Rejoignez notre réseau de partenaires technologiques et d\'experts en sécurité pour fournir des solutions de sécurité de pointe aux organisations du monde entier.',
    partnerWithUs: 'Devenez partenaire'
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

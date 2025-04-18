
// Re-export everything in a single central file
export { LanguageProvider, LanguageContext } from './language/LanguageProvider';
export { useLanguage } from '../hooks/useLanguage';
export { languages, translations } from '../data/translations';
export type { Language, TranslationKey, Translations, LanguageContextType } from '../types/language';


import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

type TranslatedTextProps = {
  textKey: Parameters<ReturnType<typeof useLanguage>['t']>[0];
  defaultText?: string;
  className?: string;
};

const TranslatedText: React.FC<TranslatedTextProps> = ({ textKey, defaultText, className }) => {
  const { t } = useLanguage();
  
  return <span className={className}>{t(textKey) || defaultText}</span>;
};

export default TranslatedText;

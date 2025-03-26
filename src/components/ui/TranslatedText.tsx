
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

type TranslatedTextProps = {
  textKey: Parameters<ReturnType<typeof useLanguage>['t']>[0];
  className?: string;
};

const TranslatedText: React.FC<TranslatedTextProps> = ({ textKey, className }) => {
  const { t } = useLanguage();
  
  return <span className={className}>{t(textKey)}</span>;
};

export default TranslatedText;

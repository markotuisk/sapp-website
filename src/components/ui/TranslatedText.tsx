
import React from 'react';
import { useLanguage } from '@/hooks/useLanguage';
import { TranslationKey } from '@/types/language';

type TranslatedTextProps = {
  textKey: TranslationKey;
  defaultText?: string;
  className?: string;
};

const TranslatedText: React.FC<TranslatedTextProps> = ({ textKey, defaultText, className }) => {
  const { t } = useLanguage();
  
  return <span className={className}>{t(textKey) || defaultText}</span>;
};

export default TranslatedText;

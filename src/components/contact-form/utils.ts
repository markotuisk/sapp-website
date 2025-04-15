
import { ContactFormValues } from './types';

export const formatEmailPreview = (values: ContactFormValues, serviceName?: string) => {
  const parts = [
    `From: ${values.name} <${values.email}>`,
    values.organization ? `Organization: ${values.organization}` : 'Organization: Not provided',
    `Message:\n${values.message}`,
    `\nSent from: Security Audits page`,
    serviceName ? `Regarding: ${serviceName}` : ''
  ];
  
  return parts.filter(Boolean).join('\n');
};

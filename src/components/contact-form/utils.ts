
import { ContactFormValues } from './types';

export const formatEmailPreview = (values: ContactFormValues, serviceName?: string) => {
  return `
From: ${values.name} <${values.email}>
Organization: ${values.organization || 'Not provided'}
Message:
${values.message}

Sent from: Security Audits page
${serviceName ? `Regarding: ${serviceName}` : ''}
  `.trim();
};

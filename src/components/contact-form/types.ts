
import { z } from 'zod';

export const contactFormSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters' }),
  email: z.string().email({ message: 'Please enter a valid email address' }),
  organization: z.string().optional(),
  message: z.string().min(5, { message: 'Message must be at least 5 characters' }),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;

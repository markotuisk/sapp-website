
import { z } from "zod";

// Form validation schema
export const contactFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Invalid email address." }),
  organization: z.string().optional(),
  phone: z.string().optional(),
  topic: z.string({ required_error: "Please select a topic" }).optional(),
  message: z.string().min(10, { message: "Message must be at least 10 characters long." }),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;

export interface UserMetadata {
  datetime: string;
  timezone: string;
  browser: string;
  device: string;
  os?: string;
  referrer?: string;
  screenSize?: string;
}

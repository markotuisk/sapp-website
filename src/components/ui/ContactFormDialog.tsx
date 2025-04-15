
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Mail, User, Building2, Send, Check, AlertTriangle } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const contactFormSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters' }),
  email: z.string().email({ message: 'Please enter a valid email address' }),
  organization: z.string().optional(),
  message: z.string().min(5, { message: 'Message must be at least 5 characters' }),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

interface ContactFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  defaultMessage?: string;
  serviceName?: string;
}

export default function ContactFormDialog({ 
  open, 
  onOpenChange, 
  defaultMessage = '',
  serviceName
}: ContactFormDialogProps) {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formattedEmail, setFormattedEmail] = useState('');
  const [visitedPages, setVisitedPages] = useState<Record<string, number>>({});
  const navigate = useNavigate();
  const location = useLocation();

  // Initialize form with react-hook-form
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: '',
      email: '',
      organization: '',
      message: defaultMessage,
    },
  });

  // Track page visits
  useEffect(() => {
    setVisitedPages(prev => {
      const newPages = { ...prev };
      const currentPath = location.pathname;
      newPages[currentPath] = (newPages[currentPath] || 0) + 1;
      return newPages;
    });
  }, [location.pathname]);

  // Reset form and step when dialog opens
  useEffect(() => {
    if (open) {
      setStep(1);
      form.reset({
        name: '',
        email: '',
        organization: '',
        message: defaultMessage,
      });
    }
  }, [open, form, defaultMessage]);

  // Format the email preview
  const formatEmailPreview = (values: ContactFormValues) => {
    return `
From: ${values.name} <${values.email}>
Organization: ${values.organization || 'Not provided'}
Message:
${values.message}

Sent from: Security Audits page
${serviceName ? `Regarding: ${serviceName}` : ''}
    `.trim();
  };

  // Handle form submission
  const onSubmit = async (values: ContactFormValues) => {
    if (step === 1) {
      // Format the email for preview
      setFormattedEmail(formatEmailPreview(values));
      setStep(2);
      return;
    }

    setIsSubmitting(true);
    try {
      // Submit to Supabase
      const { data, error } = await supabase.rpc('submit_contact_form', {
        name_input: values.name,
        email_input: values.email,
        organization_input: values.organization || null,
        message_input: values.message,
        pages_visited_input: visitedPages
      });

      if (error) throw error;

      // Show success message
      toast({
        title: "Message sent successfully",
        description: "We'll get back to you soon!",
      });
      
      // Close dialog
      onOpenChange(false);
    } catch (error) {
      console.error('Error sending message:', error);
      toast({
        variant: "destructive",
        title: "Failed to send message",
        description: "Please try again later.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle back button in preview
  const handleBackToEdit = () => {
    setStep(1);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>{step === 1 ? "Contact Us" : "Review Your Message"}</DialogTitle>
          <DialogDescription>
            {step === 1 
              ? "Please provide your details and we'll get back to you soon." 
              : "Please review your message before sending."}
          </DialogDescription>
        </DialogHeader>

        {step === 1 ? (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <div className="flex border rounded-md focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
                        <div className="flex items-center p-2 bg-gray-50 border-r rounded-l-md">
                          <User className="h-4 w-4 text-gray-500" />
                        </div>
                        <Input className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0" placeholder="Your name" {...field} />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <div className="flex border rounded-md focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
                        <div className="flex items-center p-2 bg-gray-50 border-r rounded-l-md">
                          <Mail className="h-4 w-4 text-gray-500" />
                        </div>
                        <Input className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0" placeholder="your.email@company.com" type="email" {...field} />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="organization"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Organization (Optional)</FormLabel>
                    <FormControl>
                      <div className="flex border rounded-md focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
                        <div className="flex items-center p-2 bg-gray-50 border-r rounded-l-md">
                          <Building2 className="h-4 w-4 text-gray-500" />
                        </div>
                        <Input className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0" placeholder="Your organization" {...field} />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Message</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Please tell us about your needs..." 
                        className="min-h-[120px]" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <DialogFooter>
                <Button type="submit">
                  Continue
                </Button>
              </DialogFooter>
            </form>
          </Form>
        ) : (
          <div className="space-y-4">
            <div className="border rounded-md p-4 bg-slate-50 font-mono text-sm whitespace-pre-wrap">
              {formattedEmail}
            </div>
            
            <DialogFooter className="flex flex-col gap-2 sm:flex-row sm:justify-between">
              <Button variant="outline" onClick={handleBackToEdit} disabled={isSubmitting}>
                Back to Edit
              </Button>
              <Button 
                onClick={form.handleSubmit(onSubmit)} 
                disabled={isSubmitting}
                className="gap-2"
              >
                {isSubmitting ? (
                  <>Sending...</>
                ) : (
                  <>
                    Send Message
                    <Send className="h-4 w-4" />
                  </>
                )}
              </Button>
            </DialogFooter>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

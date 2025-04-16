
import React from 'react';
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ContactFormValues, contactFormSchema } from './types';
import ContactFormFields from './ContactFormFields';
import { Button } from '@/components/ui/button';
import { TooltipProvider, Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { useToast } from '@/hooks/use-toast';

interface ContactFormSectionProps {
  onSubmit: (data: ContactFormValues) => void;
  topics: string[];
  messageLength: number;
  setMessageLength: (length: number) => void;
}

const ContactFormSection: React.FC<ContactFormSectionProps> = ({ 
  onSubmit, 
  topics, 
  messageLength, 
  setMessageLength 
}) => {
  const { toast } = useToast();
  
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      organization: "",
      phone: "",
      topic: "",
      message: "",
    },
    mode: "onChange",
  });

  React.useEffect(() => {
    const subscription = form.watch((value, { name }) => {
      if (name === 'message' || !name) {
        setMessageLength(value.message?.length || 0);
      }
    });
    return () => subscription.unsubscribe();
  }, [form.watch, setMessageLength]);

  const handleSubmit = (data: ContactFormValues) => {
    onSubmit(data);
  };

  const handleConfirmSubmission = () => {
    toast({
      title: "Message sent!",
      description: "Thank you for contacting us. We'll be in touch shortly.",
      duration: 3000,
    });
    form.reset();
    setMessageLength(0);
  };

  return (
    <div className="p-6 md:p-8 lg:p-10">
      <div className="bg-sapp-blue/10 hover:bg-sapp-blue/20 transition-colors duration-200 ease-in-out p-4 mb-6">
        <h3 className="text-2xl font-display font-semibold text-sapp-dark">Send us a message</h3>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
          <ContactFormFields form={form} messageLength={messageLength} topics={topics} />

          <div className="flex items-center">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="relative inline-block">
                    <Button 
                      type="submit" 
                      size="lg" 
                      className="bg-sapp-blue hover:bg-sapp-blue/90 text-white shadow-lg shadow-sapp-blue/20 group relative overflow-hidden disabled:opacity-50 disabled:pointer-events-none"
                      disabled={!form.formState.isValid}
                    >
                      <span className="relative z-10 transition-transform duration-300 group-hover:translate-y-0 group-hover:scale-110">Submit Message</span>
                      <span className="absolute inset-x-0 -bottom-1 h-1 bg-sapp-dark scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></span>
                    </Button>
                  </div>
                </TooltipTrigger>
                {!form.formState.isValid && (
                  <TooltipContent>
                    <p>Please complete all required fields before submitting</p>
                  </TooltipContent>
                )}
              </Tooltip>
            </TooltipProvider>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default ContactFormSection;

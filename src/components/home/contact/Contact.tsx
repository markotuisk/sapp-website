
import { useInView } from 'react-intersection-observer';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useState, useEffect } from 'react';
import { TooltipProvider, Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { MapPin, Mail, Phone } from 'lucide-react';
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ContactFormValues, contactFormSchema } from './types';
import { useContactForm } from './useContactForm';
import ContactInfoCard from './ContactInfoCard';
import ContactFormFields from './ContactFormFields';
import ContactFormPreview from './ContactFormPreview';

const Contact = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  
  const { toast } = useToast();
  const [showPreview, setShowPreview] = useState(false);
  const [submissionData, setSubmissionData] = useState<ContactFormValues | null>(null);
  
  const {
    copiedEmail,
    copiedPhone,
    messageLength,
    setMessageLength,
    userMetadata,
    copyToClipboard
  } = useContactForm();

  // Initialize form
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
    mode: "onChange", // Enable validation on change for real-time feedback
  });

  // Watch message field for character count
  useEffect(() => {
    const subscription = form.watch((value, { name }) => {
      if (name === 'message' || !name) {
        setMessageLength(value.message?.length || 0);
      }
    });
    return () => subscription.unsubscribe();
  }, [form.watch, setMessageLength]);

  const onSubmit = (data: ContactFormValues) => {
    setSubmissionData(data);
    setShowPreview(true);
  };

  const handleConfirmSubmission = () => {
    // Here you would typically send the data to an API
    toast({
      title: "Message sent!",
      description: "Thank you for contacting us. We'll be in touch shortly.",
      duration: 3000,
    });
    setShowPreview(false);
    form.reset();
    setMessageLength(0); // Reset character counter
  };

  const contactInfo = [
    {
      icon: <MapPin className="h-5 w-5 text-sapp-blue" />,
      title: "Offices",
      details: "United Kingdom (HQ) and Estonia (Engineering)",
    },
    {
      icon: <Mail className="h-5 w-5 text-sapp-blue" />,
      title: "Email",
      details: "contact@sappsecurity.com",
      copyIcon: true,
      copy: () => copyToClipboard("contact@sappsecurity.com", "email"),
      copied: copiedEmail,
    },
    {
      icon: <Phone className="h-5 w-5 text-sapp-blue" />,
      title: "Phone",
      details: "+44 (0) 2070 888 270",
      copyIcon: true,
      copy: () => copyToClipboard("+442070888270", "phone"),
      copied: copiedPhone,
    },
  ];

  const topics = [
    "Event Security",
    "Security Audits",
    "Installations",
    "Counter-Surveillance",
    "Executive Protection",
    "Cyber Security",
    "General Enquiry"
  ];

  return (
    <section id="contact" className="py-24 bg-slate-50 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute w-96 h-96 rounded-full bg-sapp-blue/5 -top-48 -left-48 blur-3xl"></div>
      <div className="absolute w-64 h-64 rounded-full bg-sapp-lightBlue/5 bottom-0 right-0 blur-3xl"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span 
            ref={ref}
            className={cn(
              "inline-block px-4 py-1.5 bg-sapp-blue/10 rounded-full text-sapp-blue text-sm font-medium mb-4 transition-all duration-500",
              inView ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
            )}
          >
            Contact Us
          </span>
          <h2 
            className={cn(
              "text-3xl md:text-4xl font-display font-bold text-sapp-dark mb-6 transition-all duration-500 delay-100",
              inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            )}
          >
            Get in touch with our <span className="text-sapp-blue">security experts</span>
          </h2>
          <p 
            className={cn(
              "text-sapp-gray text-lg transition-all duration-500 delay-200",
              inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            )}
          >
            Have a question about our services or want to discuss your organization's security needs?
            Our team is ready to help you find the right solution.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {contactInfo.map((item, index) => (
            <ContactInfoCard
              key={index}
              icon={item.icon}
              title={item.title}
              details={item.details}
              copyIcon={item.copyIcon}
              copy={item.copy}
              copied={item.copied}
              index={index}
              inView={inView}
            />
          ))}
        </div>

        <div 
          className={cn(
            "bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden transition-all duration-700 hover:shadow-xl",
            inView ? "opacity-100 translate-y-0 delay-300" : "opacity-0 translate-y-10"
          )}
        >
          <div className="p-6 md:p-8 lg:p-10">
            <div className="bg-sapp-blue/10 hover:bg-sapp-blue/20 transition-colors duration-200 ease-in-out p-4 mb-6">
              <h3 className="text-2xl font-display font-semibold text-sapp-dark">Send us a message</h3>
            </div>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
        </div>
      </div>

      {/* Preview Dialog */}
      <ContactFormPreview 
        showPreview={showPreview}
        setShowPreview={setShowPreview}
        submissionData={submissionData}
        userMetadata={userMetadata}
        handleConfirmSubmission={handleConfirmSubmission}
      />
    </section>
  );
};

export default Contact;

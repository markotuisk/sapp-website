
import { useInView } from 'react-intersection-observer';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { MapPin, Mail, Phone, Copy, Check, Asterisk } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

// Form validation schema
const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Invalid email address." }).optional(),
  company: z.string().optional(),
  phone: z.string().optional(),
  topic: z.string({ required_error: "Please select a topic" }),
  message: z.string().min(10, { message: "Message must be at least 10 characters long." }),
}).refine((data) => data.email || data.phone, {
  message: "Either email or phone number is required",
  path: ["email"],
});

type FormValues = z.infer<typeof formSchema>;

const Contact = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  
  const { toast } = useToast();
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [submissionData, setSubmissionData] = useState<FormValues | null>(null);
  const [userMetadata, setUserMetadata] = useState({
    datetime: '',
    timezone: '',
    browser: '',
    device: '',
  });

  // Initialize form
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      company: "",
      phone: "",
      topic: "",
      message: "",
    },
  });

  // Get user metadata on initial render
  useEffect(() => {
    // Browser detection
    const getBrowser = () => {
      const userAgent = navigator.userAgent;
      let browserName = "Unknown";
      let browserVersion = "";
      
      if (userAgent.match(/chrome|chromium|crios/i)) {
        browserName = "Chrome";
      } else if (userAgent.match(/firefox|fxios/i)) {
        browserName = "Firefox";
      } else if (userAgent.match(/safari/i)) {
        browserName = "Safari";
      } else if (userAgent.match(/opr\//i)) {
        browserName = "Opera";
      } else if (userAgent.match(/edg/i)) {
        browserName = "Edge";
      } else if (userAgent.match(/msie|trident/i)) {
        browserName = "IE";
      }
      
      // Simple version extraction
      const match = userAgent.match(/(chrome|firefox|safari|opr|edg|msie|rv)\/?\s*([\d.]+)/i);
      if (match) {
        browserVersion = match[2];
      }
      
      return `${browserName} ${browserVersion}`;
    };
    
    // Device detection (simple)
    const getDevice = () => {
      return /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent) ? "Mobile" : "Desktop";
    };
    
    // Format current date/time
    const now = new Date();
    
    setUserMetadata({
      datetime: now.toLocaleString(),
      timezone: `GMT${now.getTimezoneOffset() > 0 ? '-' : '+'}${Math.abs(now.getTimezoneOffset()/60)}`,
      browser: getBrowser(),
      device: getDevice(),
    });
  }, []);

  const copyToClipboard = (text: string, type: 'email' | 'phone') => {
    navigator.clipboard.writeText(text).then(() => {
      if (type === 'email') {
        setCopiedEmail(true);
        setTimeout(() => setCopiedEmail(false), 2000);
      } else {
        setCopiedPhone(true);
        setTimeout(() => setCopiedPhone(false), 2000);
      }
      
      toast({
        title: "Copied!",
        description: `${text} has been copied to clipboard`,
        duration: 2000,
      });
    }).catch(err => {
      console.error('Failed to copy: ', err);
    });
  };

  const onSubmit = (data: FormValues) => {
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
            <div 
              key={index}
              className={cn(
                "bg-white rounded-xl p-6 shadow-md border border-gray-100 flex items-center transition-all duration-700 hover:shadow-xl hover:scale-[1.02]",
                inView ? `opacity-100 translate-y-0 delay-[${index * 100}ms]` : "opacity-0 translate-y-10"
              )}
            >
              <div className="bg-sapp-blue/10 w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 mr-4">
                {item.icon}
              </div>
              <div className="flex-grow">
                <h3 className="text-lg font-display font-semibold text-sapp-dark">{item.title}</h3>
                <div className="flex items-center justify-between">
                  <p className="text-sapp-gray">{item.details}</p>
                  {item.copyIcon && (
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <button 
                            onClick={item.copy}
                            className="ml-2 p-1 text-sapp-blue/70 hover:text-sapp-blue rounded-md hover:bg-sapp-blue/10 transition-colors"
                            aria-label={`Copy ${item.title.toLowerCase()} to clipboard`}
                          >
                            {item.copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                          </button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>{item.copied ? "Copied!" : "Copy to clipboard"}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  )}
                </div>
              </div>
            </div>
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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem className="space-y-2">
                        <FormLabel className="flex items-center">
                          Full Name
                          <Asterisk className="h-3 w-3 text-destructive ml-1" aria-hidden="true" />
                        </FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Enter your full name" 
                            className="border-gray-200 focus-visible:ring-sapp-blue"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem className="space-y-2">
                        <FormLabel className="flex items-center">
                          Email Address
                          <span className="text-xs text-muted-foreground ml-1">(Email or Phone required)</span>
                        </FormLabel>
                        <FormControl>
                          <Input 
                            type="email" 
                            placeholder="Enter your email address" 
                            className="border-gray-200 focus-visible:ring-sapp-blue"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="company"
                    render={({ field }) => (
                      <FormItem className="space-y-2">
                        <FormLabel>Company</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Enter your company name" 
                            className="border-gray-200 focus-visible:ring-sapp-blue"
                            {...field}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem className="space-y-2">
                        <FormLabel className="flex items-center">
                          Phone Number
                          <span className="text-xs text-muted-foreground ml-1">(Email or Phone required)</span>
                        </FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Enter your phone number" 
                            className="border-gray-200 focus-visible:ring-sapp-blue"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="topic"
                  render={({ field }) => (
                    <FormItem className="space-y-2">
                      <FormLabel className="flex items-center">
                        Select a topic
                        <Asterisk className="h-3 w-3 text-destructive ml-1" aria-hidden="true" />
                      </FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="border-gray-200 focus-visible:ring-sapp-blue">
                            <SelectValue placeholder="Choose a topic for your enquiry" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {topics.map((topic) => (
                            <SelectItem key={topic} value={topic}>
                              {topic}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem className="space-y-2">
                      <FormLabel className="flex items-center">
                        Message
                        <Asterisk className="h-3 w-3 text-destructive ml-1" aria-hidden="true" />
                      </FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Tell us about your security needs" 
                          className="min-h-[120px] border-gray-200 focus-visible:ring-sapp-blue"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex items-center">
                  <Button 
                    type="submit" 
                    size="lg" 
                    className="bg-sapp-blue hover:bg-sapp-blue/90 text-white shadow-lg shadow-sapp-blue/20 group relative overflow-hidden"
                    disabled={!form.formState.isValid}
                  >
                    <span className="relative z-10 transition-transform duration-300 group-hover:translate-y-0 group-hover:scale-110">Submit Message</span>
                    <span className="absolute inset-x-0 -bottom-1 h-1 bg-sapp-dark scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></span>
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </div>

      {/* Submission Preview Dialog */}
      <Dialog open={showPreview} onOpenChange={setShowPreview}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-display">Preview Your Message</DialogTitle>
            <DialogDescription>
              Please review your message details before sending
            </DialogDescription>
          </DialogHeader>

          {submissionData && (
            <div className="mt-4 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <h4 className="font-semibold text-sm text-muted-foreground">Full Name</h4>
                  <p className="text-sapp-dark">{submissionData.name}</p>
                </div>
                
                <div className="space-y-2">
                  <h4 className="font-semibold text-sm text-muted-foreground">Topic</h4>
                  <p className="text-sapp-dark">{submissionData.topic}</p>
                </div>

                {submissionData.email && (
                  <div className="space-y-2">
                    <h4 className="font-semibold text-sm text-muted-foreground">Email</h4>
                    <p className="text-sapp-dark">{submissionData.email}</p>
                  </div>
                )}

                {submissionData.phone && (
                  <div className="space-y-2">
                    <h4 className="font-semibold text-sm text-muted-foreground">Phone</h4>
                    <p className="text-sapp-dark">{submissionData.phone}</p>
                  </div>
                )}

                {submissionData.company && (
                  <div className="space-y-2">
                    <h4 className="font-semibold text-sm text-muted-foreground">Company</h4>
                    <p className="text-sapp-dark">{submissionData.company}</p>
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <h4 className="font-semibold text-sm text-muted-foreground">Message</h4>
                <div className="p-4 bg-slate-50 rounded-md text-sapp-dark whitespace-pre-wrap">
                  {submissionData.message}
                </div>
              </div>

              <div className="border-t pt-4">
                <h4 className="font-semibold text-sm text-muted-foreground mb-2">Submission Metadata</h4>
                <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
                  <div>
                    <span className="font-medium">Date/Time:</span> {userMetadata.datetime}
                  </div>
                  <div>
                    <span className="font-medium">Timezone:</span> {userMetadata.timezone}
                  </div>
                  <div>
                    <span className="font-medium">Browser:</span> {userMetadata.browser}
                  </div>
                  <div>
                    <span className="font-medium">Device:</span> {userMetadata.device}
                  </div>
                </div>
              </div>
            </div>
          )}

          <DialogFooter className="mt-6 gap-2">
            <Button 
              variant="outline" 
              onClick={() => setShowPreview(false)}
            >
              Edit Details
            </Button>
            <Button 
              onClick={handleConfirmSubmission}
              className="bg-sapp-blue hover:bg-sapp-blue/90 text-white"
            >
              Confirm & Send Message
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default Contact;

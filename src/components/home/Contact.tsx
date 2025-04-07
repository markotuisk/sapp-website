
import { useInView } from 'react-intersection-observer';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { MapPin, Mail, Phone, Copy, Check } from 'lucide-react';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const Contact = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  
  const { toast } = useToast();
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);

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
      details: "+44 2 070 888 270",
      copyIcon: true,
      copy: () => copyToClipboard("+442070888270", "phone"),
      copied: copiedPhone,
    },
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
                "bg-white rounded-xl p-6 shadow-md border border-gray-100 flex items-center transition-all duration-700",
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
            "bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden transition-all duration-700",
            inView ? "opacity-100 translate-y-0 delay-300" : "opacity-0 translate-y-10"
          )}
        >
          <div className="p-6 md:p-8 lg:p-10">
            <div className="bg-sapp-blue/10 hover:bg-sapp-blue/20 transition-colors duration-200 ease-in-out p-4 mb-6">
              <h3 className="text-2xl font-display font-semibold text-sapp-dark">Send us a message</h3>
            </div>
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium text-sapp-dark">
                    Full Name
                  </label>
                  <Input 
                    id="name" 
                    placeholder="Enter your full name" 
                    className="border-gray-200 focus-visible:ring-sapp-blue"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-sapp-dark">
                    Email Address
                  </label>
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="Enter your email address" 
                    className="border-gray-200 focus-visible:ring-sapp-blue"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="company" className="text-sm font-medium text-sapp-dark">
                    Company
                  </label>
                  <Input 
                    id="company" 
                    placeholder="Enter your company name" 
                    className="border-gray-200 focus-visible:ring-sapp-blue"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="phone" className="text-sm font-medium text-sapp-dark">
                    Phone Number
                  </label>
                  <Input 
                    id="phone" 
                    placeholder="Enter your phone number" 
                    className="border-gray-200 focus-visible:ring-sapp-blue"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium text-sapp-dark">
                  Message
                </label>
                <Textarea 
                  id="message" 
                  placeholder="Tell us about your security needs" 
                  className="min-h-[120px] border-gray-200 focus-visible:ring-sapp-blue"
                />
              </div>
              <div className="flex items-center">
                <Button 
                  type="submit" 
                  size="lg" 
                  className="bg-sapp-blue hover:bg-sapp-blue/90 text-white shadow-lg shadow-sapp-blue/20 group relative overflow-hidden"
                >
                  <span className="relative z-10 transition-transform duration-300 group-hover:translate-y-0 group-hover:scale-110">Submit Message</span>
                  <span className="absolute inset-x-0 -bottom-1 h-1 bg-sapp-dark scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></span>
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;

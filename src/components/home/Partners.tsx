
import React from 'react';
import { useInView } from 'react-intersection-observer';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ArrowRight, ExternalLink, Sparkles } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import TranslatedText from '@/components/ui/TranslatedText';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Link } from 'react-router-dom';

const Partners = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  
  const { t } = useLanguage();

  const partners = [
    {
      name: "Verkada",
      description: "Cloud based & Software first AI-Powered Security Systems. Point and Click simplicity, to protect at scale.",
      logo: "/lovable-uploads/8bfee868-105d-4df5-9dae-7da224fe25ec.png",
      link: "https://www.verkada.com",
    },
    {
      name: "Ubiquiti",
      description: "Professional Network, Security and Communication systems.",
      logo: "/lovable-uploads/20c3343a-b2d5-4507-8072-c47430f833ae.png",
      link: "https://ui.com",
    },
    {
      name: "SOFT dB",
      description: "Sound Masking, Acoustics & Vibration Experts. Systems that is Network Ready Software first solution.",
      logo: "/lovable-uploads/e1b5532f-5840-4688-b9df-ae2e2926945d.png",
      link: "https://www.softdb.com",
    },
    {
      name: "Inpixon",
      description: "Detect mobile phones and IoT devices, ideal for a fast deployment in off-site meetings monitoring.",
      logo: "/lovable-uploads/2c9bf332-fb77-4577-a92d-afad7565e5b8.png",
      link: "https://www.inpixon.com",
    }
  ];

  return (
    <section id="partners" className="py-24 bg-white relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span 
            ref={ref}
            className={cn(
              "inline-block text-sapp-blue text-[19px] leading-[77px] tracking-[3.62px] font-medium mb-4 transition-all duration-500",
              inView ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
            )}
          >
            PARTNERS WE TRUST
          </span>
          <h2 
            className={cn(
              "text-3xl md:text-4xl font-display font-bold text-sapp-dark mb-6 transition-all duration-500 delay-100",
              inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            )}
          >
            Working with <span className="text-sapp-blue"><TranslatedText textKey="industryLeaders" /></span>
          </h2>
          <p 
            className={cn(
              "text-sapp-gray text-lg transition-all duration-500 delay-200",
              inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            )}
          >
            <TranslatedText textKey="partnersDescription" />
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {partners.map((partner, index) => (
            <Card
              key={index}
              className={cn(
                "overflow-hidden h-full transition-all duration-200 ease-in-out shadow-md hover:shadow-xl hover:scale-[1.02] border border-gray-100 group bg-white rounded-xl",
                inView ? `opacity-100 translate-y-0 delay-[${index * 100}ms]` : "opacity-0 translate-y-10"
              )}
            >
              <div className="bg-white p-4 flex items-center justify-center h-40 overflow-hidden">
                <img 
                  src={partner.logo} 
                  alt={partner.name} 
                  className="max-w-full max-h-[48px] object-contain opacity-70 grayscale transition-all duration-300 transform group-hover:opacity-100 group-hover:grayscale-0 group-hover:scale-150"
                />
              </div>
              <Separator className="mx-auto w-[90%]" />
              <CardContent className="p-6 flex flex-col h-[240px]">
                <h3 className="text-xl font-display font-semibold mb-3 bg-accent-teal/10 text-accent-dark-blue p-3 rounded-md transition-all duration-300 hover:bg-accent-teal/20">
                  {partner.name}
                </h3>
                <p className="text-sapp-gray text-sm mb-6 line-clamp-3">
                  {partner.description}
                </p>
                <div className="mt-auto">
                  <Button 
                    size="sm"
                    className="bg-accent-teal hover:bg-accent-teal/90 text-white transition-colors w-full"
                    onClick={() => window.open(partner.link, '_blank')}
                  >
                    <TranslatedText textKey="visitWebsite" />
                    <ExternalLink className="ml-1 h-3.5 w-3.5" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div 
          className={cn(
            "bg-sapp-dark rounded-xl p-8 md:p-12 shadow-xl relative overflow-hidden transition-all duration-700",
            inView ? "opacity-100 translate-y-0 delay-500" : "opacity-0 translate-y-10"
          )}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-sapp-navy to-transparent opacity-80"></div>
          <div className="absolute top-0 right-0 transform translate-x-1/4 -translate-y-1/4">
            <Sparkles className="h-64 w-64 text-sapp-blue/10" />
          </div>
          
          <div className="relative z-10 md:max-w-xl">
            <h3 className="text-2xl md:text-3xl font-display font-bold text-white mb-4">
              <TranslatedText textKey="becomePartner" />
            </h3>
            <p className="text-gray-300 mb-6">
              <TranslatedText textKey="becomePartnerDescription" />
            </p>
            <Button 
              size="lg"
              className="bg-white text-sapp-dark hover:bg-sapp-blue hover:text-white transition-colors"
              asChild
            >
              <Link to="/client-area">
                <TranslatedText textKey="partnerWithUs" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Partners;

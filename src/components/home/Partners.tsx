
import { useInView } from 'react-intersection-observer';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ArrowRight, ExternalLink, Sparkles } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import TranslatedText from '@/components/ui/TranslatedText';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

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
      logo: "/lovable-uploads/8bfee868-105d-4df5-9dae-7da224fe25ec.png", // Updated logo path
      link: "https://www.verkada.com",
    },
    {
      name: "Ubiquiti",
      description: "Professional Network, Security and Communication systems.",
      logo: "/lovable-uploads/8a5bc35f-ee0e-4cf9-bb62-6f30d769062c.png",
      link: "https://ui.com",
    },
    {
      name: "SOFT dB",
      description: "Sound Masking, Acoustics & Vibration Experts. Systems that is Network Ready Software first solution.",
      logo: "/lovable-uploads/960be1a6-9fbc-4220-84d6-d0777dd009f0.png",
      link: "https://www.softdb.com",
    },
    {
      name: "Inpixon",
      description: "Detect mobile phones and IoT devices, ideal for a fast deployment in off-site meetings monitoring.",
      logo: "/lovable-uploads/ea8614fb-011c-4b29-bc87-2b06d850d822.png",
      link: "https://www.inpixon.com",
    }
  ];

  return (
    <section id="partners" className="py-24 bg-white relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute w-96 h-96 rounded-full bg-sapp-blue/5 -bottom-48 -right-48 blur-3xl"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span 
            ref={ref}
            className={cn(
              "inline-block px-4 py-1.5 bg-sapp-blue/10 rounded-full text-sapp-blue text-sm font-medium mb-4 transition-all duration-500",
              inView ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
            )}
          >
            <TranslatedText textKey="partners" />
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
                "overflow-hidden h-full transition-all duration-700 hover:shadow-lg border border-gray-100 group",
                inView ? `opacity-100 translate-y-0 delay-[${index * 100}ms]` : "opacity-0 translate-y-10"
              )}
            >
              <div className="bg-white p-4 flex items-center justify-center h-64">
                <img 
                  src={partner.logo} 
                  alt={partner.name} 
                  className="max-w-full max-h-full object-contain"
                />
              </div>
              <Separator className="mx-auto w-[90%]" />
              <CardContent className="p-6 flex flex-col h-[280px]">
                <h3 className="text-xl font-display font-semibold mb-3 text-sapp-dark">
                  {partner.name}
                </h3>
                <p className="text-sapp-gray text-sm mb-6 line-clamp-3">
                  {partner.description}
                </p>
                <div className="mt-auto flex gap-4 flex-wrap">
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="border-gray-300 text-sapp-dark hover:bg-gray-50 transition-colors"
                    onClick={() => window.open(`/partners/${partner.name.toLowerCase()}`, '_self')}
                  >
                    <TranslatedText textKey="readMore" />
                    <ArrowRight className="ml-1 h-3.5 w-3.5" />
                  </Button>
                  <Button 
                    size="sm"
                    className="bg-accent-teal hover:bg-accent-teal/90 text-white transition-colors"
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
            >
              <TranslatedText textKey="partnerWithUs" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Partners;

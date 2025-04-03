
import { useInView } from 'react-intersection-observer';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Sparkles, Link } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import TranslatedText from '@/components/ui/TranslatedText';
import { Card, CardContent } from '@/components/ui/card';
import { HoverCard, HoverCardTrigger, HoverCardContent } from '@/components/ui/hover-card';

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
      logo: "/lovable-uploads/41de3450-d5aa-4a60-985b-1c3478dd5763.png",
      link: "https://www.verkada.com"
    },
    {
      name: "Unifi",
      description: "Professional Network, Security and Communication systems.",
      logo: "/lovable-uploads/88b40ea0-3d12-4b33-8bf2-ae619e1dcfe1.png",
      link: "https://www.ui.com"
    },
    {
      name: "SOFT dB",
      description: "Sound Masking, Acoustics & Vibration Experts. Systems that is Network Ready Software first solution.",
      logo: "/lovable-uploads/7bf6f8ff-6cf1-4ab0-abba-6a916c49bfb8.png",
      link: "https://www.softdb.com"
    },
    {
      name: "Rapidwatch",
      description: "detect mobile phones and IoT devices, ideal for a fast deployment in off-site meetings monitoring.",
      logo: "/lovable-uploads/a62c3377-92f5-4834-b6e1-e85d5424dd0d.png",
      link: "https://mobilewatch.eu"
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
                "overflow-hidden h-full transition-all duration-700 hover:shadow-xl border border-gray-100 group",
                inView ? `opacity-100 translate-y-0 delay-[${index * 100}ms]` : "opacity-0 translate-y-10"
              )}
            >
              <div className="relative h-40 bg-gradient-to-b from-gray-100 to-white flex items-center justify-center p-6">
                <img 
                  src={partner.logo} 
                  alt={partner.name} 
                  className="max-h-full max-w-full object-contain"
                />
              </div>
              <CardContent className="p-6">
                <h3 className="text-lg font-display font-semibold mb-2 text-sapp-dark">
                  {partner.name}
                </h3>
                <p className="text-sapp-gray text-sm mb-4 line-clamp-3">
                  {partner.description}
                </p>
                {partner.link && (
                  <div>
                    <a 
                      href={partner.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-sapp-blue text-sm font-medium hover:underline"
                    >
                      <TranslatedText textKey="visitWebsite" defaultText="Visit Website" />
                      <Link className="h-3.5 w-3.5 ml-1" />
                    </a>
                  </div>
                )}
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
              <TranslatedText textKey="becomePartner" defaultText="Become a SAPP Security Partner" />
            </h3>
            <p className="text-gray-300 mb-6">
              <TranslatedText 
                textKey="becomePartnerDescription" 
                defaultText="Join our network of technology partners and security experts to deliver cutting-edge security solutions to organizations worldwide."
              />
            </p>
            <Button 
              size="lg"
              className="bg-white text-sapp-dark hover:bg-sapp-blue hover:text-white transition-colors"
            >
              <TranslatedText textKey="partnerWithUs" defaultText="Partner With Us" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Partners;

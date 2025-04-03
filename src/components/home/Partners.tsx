
import { useInView } from 'react-intersection-observer';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Sparkles, ExternalLink, ArrowRight } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import TranslatedText from '@/components/ui/TranslatedText';
import { Card, CardContent } from '@/components/ui/card';

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
      logo: "/lovable-uploads/69dca9cd-0e56-44b6-b741-8faeebcb21e9.png",
      link: "https://www.verkada.com",
      bgColor: "bg-gradient-to-br from-gray-50 to-gray-100"
    },
    {
      name: "Ubiquiti",
      description: "Professional Network, Security and Communication systems.",
      logo: "/lovable-uploads/cfc046c6-eccb-4753-8308-0566d25909fc.png",
      link: "https://ui.com",
      bgColor: "bg-gradient-to-br from-blue-50 to-gray-100"
    },
    {
      name: "SOFT dB",
      description: "Sound Masking, Acoustics & Vibration Experts. Systems that is Network Ready Software first solution.",
      logo: "/lovable-uploads/6e585a39-33e8-4311-99f6-b7dd9d437e21.png",
      link: "https://www.softdb.com",
      bgColor: "bg-gradient-to-br from-blue-50 to-blue-100"
    },
    {
      name: "Inpixon",
      description: "Detect mobile phones and IoT devices, ideal for a fast deployment in off-site meetings monitoring.",
      logo: "/lovable-uploads/53d3f50f-88a2-4e7c-8b65-5a3c79f001fa.png",
      link: "https://www.inpixon.com",
      bgColor: "bg-gradient-to-br from-amber-50 to-amber-100"
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
              <div className={cn(
                "relative h-52 flex items-center justify-center p-6", 
                partner.bgColor
              )}>
                <div className="absolute inset-0 opacity-10">
                  <div className="w-full h-full bg-grid"></div>
                </div>
                <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-white to-transparent"></div>
                <img 
                  src={partner.logo} 
                  alt={partner.name} 
                  className="max-w-[80%] max-h-[75%] object-contain relative z-10 drop-shadow-sm"
                />
              </div>
              <CardContent className="p-6 flex flex-col h-[calc(100%-13rem)]">
                <div>
                  <h3 className="text-lg font-display font-semibold mb-2 text-sapp-dark">
                    {partner.name}
                  </h3>
                  <p className="text-sapp-gray text-sm mb-6 line-clamp-3">
                    {partner.description}
                  </p>
                </div>
                <div className="mt-auto flex gap-2 flex-wrap">
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="border-sapp-blue text-sapp-dark hover:bg-sapp-blue/10 transition-colors"
                    onClick={() => window.open(`/partners/${partner.name.toLowerCase()}`, '_self')}
                  >
                    <TranslatedText textKey="readMore" />
                    <ArrowRight className="ml-1 h-3.5 w-3.5" />
                  </Button>
                  <Button 
                    size="sm"
                    className="bg-sapp-blue hover:bg-sapp-blue/90 text-white transition-colors"
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

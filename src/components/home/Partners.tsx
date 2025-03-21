
import { useInView } from 'react-intersection-observer';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Sparkles, Link } from 'lucide-react';

const Partners = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const partners = [
    {
      name: "Verkada",
      description: "Cloud-based security systems",
      logo: "/placeholder.svg"
    },
    {
      name: "NCSC",
      description: "National Cyber Security Centre",
      logo: "/placeholder.svg",
      link: "https://www.ncsc.gov.uk/information/ncsc-assured-cyber-security-consultancy"
    },
    {
      name: "Bulletproof",
      description: "Cyber security services",
      logo: "/placeholder.svg",
      link: "https://www.bulletproof.co.uk"
    },
    {
      name: "Redscan",
      description: "Managed security services",
      logo: "/placeholder.svg",
      link: "https://www.redscan.com"
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
            Our Partners
          </span>
          <h2 
            className={cn(
              "text-3xl md:text-4xl font-display font-bold text-sapp-dark mb-6 transition-all duration-500 delay-100",
              inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            )}
          >
            Working with <span className="text-sapp-blue">industry leaders</span>
          </h2>
          <p 
            className={cn(
              "text-sapp-gray text-lg transition-all duration-500 delay-200",
              inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            )}
          >
            We collaborate with trusted partners to deliver comprehensive security solutions that protect
            your organization from both physical and cyber threats.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {partners.map((partner, index) => (
            <div
              key={index}
              className={cn(
                "bg-white rounded-xl p-6 shadow-md border border-gray-100 transition-all duration-700 hover:shadow-xl",
                inView ? `opacity-100 translate-y-0 delay-[${index * 100}ms]` : "opacity-0 translate-y-10"
              )}
            >
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-sapp-blue/10 rounded-lg flex items-center justify-center">
                  <img 
                    src={partner.logo} 
                    alt={partner.name} 
                    className="w-10 h-10 object-contain"
                  />
                </div>
              </div>
              <h3 className="text-lg font-display font-semibold text-center mb-2 text-sapp-dark">
                {partner.name}
              </h3>
              <p className="text-sapp-gray text-sm text-center mb-4">
                {partner.description}
              </p>
              {partner.link && (
                <div className="text-center">
                  <a 
                    href={partner.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-sapp-blue text-sm font-medium hover:underline"
                  >
                    Visit Website
                    <Link className="h-3.5 w-3.5 ml-1" />
                  </a>
                </div>
              )}
            </div>
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
              Become a SAPP Security Partner
            </h3>
            <p className="text-gray-300 mb-6">
              Join our network of technology partners and security experts to deliver 
              cutting-edge security solutions to organizations worldwide.
            </p>
            <Button 
              size="lg"
              className="bg-white text-sapp-dark hover:bg-sapp-blue hover:text-white transition-colors"
            >
              Partner With Us
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Partners;

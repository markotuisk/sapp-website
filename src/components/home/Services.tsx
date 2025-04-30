import { useInView } from 'react-intersection-observer';
import { cn } from '@/lib/utils';
import ServiceCard from '@/components/ui/ServiceCard';
import { Shield, AlertTriangle, MonitorCheck, Wifi, Lock, Server, Database, ChevronRight } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const Services = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  
  const { t } = useLanguage();

  const services = [
    {
      icon: <Shield className="h-6 w-6 text-sapp-blue" />,
      title: t('eventSecurity'),
      description: "Real-time protection for high-profile confidential meetings and events. We coordinate with third-party specialists where required.",
      href: "/event-security",
      imagePath: "/lovable-uploads/fc9a9c2e-5129-4b70-89e2-7617a4e5578a.png"
    },
    {
      icon: <AlertTriangle className="h-6 w-6 text-sapp-blue" />,
      title: t('securityAudits'),
      description: "Certified ISO27001 physical security audits to identify security gaps and provide risk-based recommendations. Coordinated with compliance partners.",
      href: "/security-audits",
      imagePath: "/lovable-uploads/ccaa80f3-bbe5-46f3-a853-d7007fbff022.png"
    },
    {
      icon: <MonitorCheck className="h-6 w-6 text-sapp-blue" />,
      title: t('installations'),
      description: "Implementation of cutting-edge security systems covering CCTV, access control, speech privacy, and more. Seamless integration with existing enterprise systems.",
      href: "/installations",
      imagePath: "/lovable-uploads/85184084-bca0-497c-8950-601f002a465f.png"
    },
    {
      icon: <Wifi className="h-6 w-6 text-sapp-blue" />,
      title: t('cyberSecurity'),
      description: "Enterprise-grade cyber security services protecting digital assets and IoT infrastructure from emerging threats. Partnerships with leading cybersecurity providers.",
      href: "/cyber-security",
      imagePath: "/lovable-uploads/234f523c-dec6-4bb9-8b48-d308fc61a7ec.png"
    }
  ];

  return (
    <section id="services" className="py-24 bg-white relative">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div 
            ref={ref}
            className={cn(
              "inline-block mb-4 transition-all duration-500",
              inView ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
            )}
          >
            <h3 
              className="uppercase text-sapp-blue text-[19px] leading-[77px] tracking-[3.62px] font-medium"
            >
              OUR COMPETENCE
            </h3>
          </div>
          <h2 
            className={cn(
              "text-3xl md:text-4xl font-display font-bold text-sapp-dark mb-6 transition-all duration-500 delay-100",
              inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            )}
          >
            We <span className="text-[#20798C]">secure</span> what's <span className="text-[#20798C]">digital</span>, what's <span className="text-[#20798C]">physical</span>, and everything <span className="text-[#20798C]">in between</span>
          </h2>
          <p 
            className={cn(
              "text-sapp-gray text-lg transition-all duration-500 delay-200",
              inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            )}
          >
            We provide a wide range of technical security services designed to protect
            your organisation's most valuable assets and information, with seamless integration of industry-leading third-party solutions where needed.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <Card key={index} className="border-gray-100 flex flex-col">
              <CardHeader>
                {service.icon}
                <CardTitle className="text-xl text-sapp-dark mt-3">{service.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                <CardDescription className="text-sapp-gray text-sm min-h-[80px]">
                  {service.description}
                </CardDescription>
              </CardContent>
              <CardFooter className="mt-auto">
                <Link to={service.href} className="w-full">
                  <Button className="bg-sapp-blue hover:bg-sapp-blue/90 w-full">
                    Learn More
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;

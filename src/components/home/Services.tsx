
import { useInView } from 'react-intersection-observer';
import { cn } from '@/lib/utils';
import ServiceCard from '@/components/ui/ServiceCard';
import { Shield, AlertTriangle, MonitorCheck, Wifi, Lock, Server, Database } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import TranslatedText from '@/components/ui/TranslatedText';
import { Link } from 'react-router-dom';

const Services = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  
  const { t } = useLanguage();

  const services = [
    {
      icon: <Shield className="h-6 w-6" />,
      title: t('eventSecurity'),
      description: "Real-time protection for high-profile confidential meetings and events. We coordinate with third-party specialists where required.",
      items: [
        "Venue Security Audits",
        "Event Monitoring",
        "Secure Technology",
        "Close Protection",
        "Incident Management",
        "Third-Party Event Security Integration"
      ],
      href: "/event-security",
      delay: 100,
      imagePath: "/lovable-uploads/fc9a9c2e-5129-4b70-89e2-7617a4e5578a.png"
    },
    {
      icon: <AlertTriangle className="h-6 w-6" />,
      title: t('securityAudits'),
      description: "Certified ISO27001 physical security audits to identify security gaps and provide risk-based recommendations. Coordinated with compliance partners.",
      items: [
        "Physical Security Assessments",
        "Security Systems Testing",
        "Penetration Tests",
        "Compliance Audits",
        "TSCM Inspections",
        "Third-Party Certification Support"
      ],
      href: "/security-audits",
      delay: 200,
      imagePath: "/lovable-uploads/ccaa80f3-bbe5-46f3-a853-d7007fbff022.png"
    },
    {
      icon: <MonitorCheck className="h-6 w-6" />,
      title: t('installations'),
      description: "Implementation of cutting-edge security systems covering CCTV, access control, speech privacy, and more. Seamless integration with existing enterprise systems.",
      items: [
        "CCTV Systems",
        "Access Control Systems",
        "Visitor Management Systems",
        "Speech Privacy Systems",
        "Sound Masking Systems",
        "Mobile Security Systems",
        "Network Security Systems",
        "Enterprise System Integration"
      ],
      href: "/installations",
      delay: 300,
      imagePath: "/lovable-uploads/85184084-bca0-497c-8950-601f002a465f.png"
    },
    {
      icon: <Wifi className="h-6 w-6" />,
      title: t('cyberSecurity'),
      description: "Enterprise-grade cyber security services protecting digital assets and IoT infrastructure from emerging threats. Partnerships with leading cybersecurity providers.",
      items: [
        "Threat Detection & Response",
        "Network Security",
        "IoT Device Protection",
        "Data Protection",
        "Security Awareness Training",
        "Third-Party Security Integrations"
      ],
      href: "/cyber-security",
      delay: 400,
      imagePath: "/lovable-uploads/234f523c-dec6-4bb9-8b48-d308fc61a7ec.png"
    }
  ];

  return (
    <section id="services" className="py-24 bg-white relative">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span 
            ref={ref}
            className={cn(
              "inline-block px-4 py-1.5 bg-sapp-blue/10 rounded-full text-sapp-blue text-sm font-medium mb-4 transition-all duration-500",
              inView ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
            )}
          >
            Our Competence
          </span>
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
            your organization's most valuable assets and information, with seamless integration of industry-leading third-party solutions where needed.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <ServiceCard 
              key={index}
              {...service}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;

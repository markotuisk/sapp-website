
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
      icon: <Shield className="h-6 w-6 text-sapp-blue" />,
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
      href: "/event-security", // Updated to use new route
      delay: 100,
    },
    {
      icon: <AlertTriangle className="h-6 w-6 text-sapp-blue" />,
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
      href: "/security-audits", // Updated to use new route
      delay: 200,
    },
    {
      icon: <MonitorCheck className="h-6 w-6 text-sapp-blue" />,
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
      href: "/installations", // Updated to use new route
      delay: 300,
    },
    {
      icon: <Wifi className="h-6 w-6 text-sapp-blue" />,
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
      href: "/cyber-security", // Updated to use new route
      delay: 400,
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
            <TranslatedText textKey="services" />
          </span>
          <h2 
            className={cn(
              "text-3xl md:text-4xl font-display font-bold text-sapp-dark mb-6 transition-all duration-500 delay-100",
              inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            )}
          >
            Comprehensive <span className="text-sapp-blue"><TranslatedText textKey="securitySolutions" /></span> for your business
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
            <Link key={index} to={service.href} className="block">
              <ServiceCard {...service} />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;

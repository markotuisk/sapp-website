
import { useInView } from 'react-intersection-observer';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import FeatureCard from '@/components/ui/FeatureCard';
import { Shield, AlertTriangle, MonitorCheck, Wifi, Lock, Database, Server } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import TranslatedText from '@/components/ui/TranslatedText';

interface ServiceDetailProps {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  featureCards: {
    title: string;
    features: string[];
  }[];
  imagePosition?: 'left' | 'right';
  bgColor?: string;
  highlightText?: string;
}

const ServiceDetail = ({
  id,
  title,
  description,
  icon,
  featureCards,
  imagePosition = 'right',
  bgColor = 'bg-slate-50',
  highlightText,
}: ServiceDetailProps) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id={id} className={`py-24 ${bgColor} relative overflow-hidden`}>
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div 
            ref={ref}
            className={cn(
              "inline-flex items-center justify-center p-3 bg-white rounded-lg shadow-md mb-6 transition-all duration-500",
              inView ? "opacity-100 scale-100" : "opacity-0 scale-90"
            )}
          >
            {icon}
          </div>
          {highlightText && (
            <h3 
              className={cn(
                "text-xl md:text-2xl font-display text-sapp-blue mb-4 transition-all duration-500 delay-75",
                inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              )}
            >
              {highlightText}
            </h3>
          )}
          <h2 
            className={cn(
              "text-3xl md:text-4xl font-display font-bold text-sapp-dark mb-6 transition-all duration-500 delay-100",
              inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            )}
          >
            {title}
          </h2>
          <p 
            className={cn(
              "text-sapp-gray text-lg transition-all duration-500 delay-200",
              inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            )}
          >
            {description}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {featureCards.map((card, index) => (
            <FeatureCard 
              key={index} 
              title={card.title} 
              features={card.features} 
              delay={100 * (index + 1)}
            />
          ))}
        </div>

        <div className="text-center">
          <Button 
            size="lg" 
            className={cn(
              "bg-sapp-blue hover:bg-sapp-blue/90 text-white shadow-lg shadow-sapp-blue/20 transition-all duration-700",
              inView ? "opacity-100 translate-y-0 delay-500" : "opacity-0 translate-y-10"
            )}
          >
            <TranslatedText textKey="learnMore" /> {title}
          </Button>
        </div>
      </div>
    </section>
  );
};

const EventSecurity = () => {
  const { t } = useLanguage();
  
  return (
    <ServiceDetail
      id="event-security"
      title={t('eventSecurity')}
      description="Real-time protection for high-profile confidential meetings and events. We are experienced event security and technical support providers for corporate board and management meetings for over 20 years. We coordinate with specialized third-party providers to ensure comprehensive coverage."
      icon={<Shield className="h-8 w-8 text-sapp-blue" />}
      featureCards={[
        {
          title: "Event Types",
          features: [
            "Board meetings",
            "Management meetings",
            "Results rehearsals",
            "Sports events",
            "Strategy planning",
            "Brainstorming sessions",
            "Negotiations",
            "Both on and off-site events"
          ]
        },
        {
          title: "Security Measures",
          features: [
            "Venue security audits",
            "Event monitoring",
            "Secure technology",
            "Close protection",
            "Incident management",
            "Confidentiality assurance",
            "Real-time protection",
            "Technical security support"
          ]
        },
        {
          title: "Third-Party Integrations",
          features: [
            "Executive protection services",
            "Credentials verification",
            "Specialized threat assessment",
            "Communication security experts",
            "Event security staffing",
            "VIP security coordination",
            "Mobile security units",
            "Temporary secure infrastructure"
          ]
        }
      ]}
      bgColor="bg-slate-50"
    />
  );
};

const SecurityAudits = () => {
  const { t } = useLanguage();
  
  return (
    <ServiceDetail
      id="security-audits"
      title={t('securityAudits')}
      highlightText="Certified ISO27001 physical security audits"
      description="These external audits are on-site service visits to objectively evaluate the state of play of the physical and information security processes and technology at your organisation. The objective of the security audit is to detect and identify any potential gaps and oversights providing detailed risk-based recommendations for improvement. We collaborate with specialized third-party certification bodies to ensure compliance with all relevant standards."
      icon={<AlertTriangle className="h-8 w-8 text-sapp-blue" />}
      featureCards={[
        {
          title: "Audit Types",
          features: [
            "Physical Security Assessments",
            "Security Systems Testing",
            "Penetration Tests",
            "Compliance Audits",
            "Technology Tests",
            "TSCM Inspections",
            "Awareness Trainings"
          ]
        },
        {
          title: "Methodology",
          features: [
            "Comprehensive analysis",
            "Tailored assessments",
            "Risk-based evaluation",
            "Detailed documentation",
            "Actionable recommendations",
            "Follow-up support",
            "Compliance verification"
          ]
        },
        {
          title: "Third-Party Services",
          features: [
            "ISO certification support",
            "Regulatory compliance assistance",
            "Independent verification",
            "Industry-specific compliance",
            "Security clearance facilitation",
            "External pen testing coordination",
            "Specialized vulnerability scanning",
            "Security program development"
          ]
        }
      ]}
      bgColor="bg-white"
      imagePosition="left"
    />
  );
};

const TechnologyInstallations = () => {
  const { t } = useLanguage();
  
  return (
    <ServiceDetail
      id="technology"
      title={t('installations')}
      highlightText="Cutting-edge security technology"
      description="Our installation services cover a multitude of security systems ranging from CCTV, access control and visitor management systems, speech privacy and sound masking systems, mobile and network security systems as well as privacy screen systems. We integrate with leading third-party technology providers to ensure your systems are state-of-the-art."
      icon={<MonitorCheck className="h-8 w-8 text-sapp-blue" />}
      featureCards={[
        {
          title: "Security Technology",
          features: [
            "CCTV systems",
            "Access control systems",
            "Visitor management systems",
            "Speech privacy systems",
            "Sound masking systems",
            "Mobile security systems",
            "Network security systems",
            "Privacy screen systems"
          ]
        },
        {
          title: "Best Practices",
          features: [
            "Layered security approach",
            "Regular system testing",
            "Proactive maintenance",
            "User training programs",
            "Integration of systems",
            "Scalable solutions",
            "Future-proof technology",
            "Compliance with standards"
          ]
        },
        {
          title: "Third-Party Technology Partners",
          features: [
            "Enterprise security platform integration",
            "Corporate identity management systems",
            "Biometric access control solutions",
            "AI-powered surveillance analytics",
            "Cloud security storage solutions",
            "Managed security service providers",
            "Corporate IoT security frameworks",
            "Enterprise systems compatibility"
          ]
        }
      ]}
      bgColor="bg-slate-50"
    />
  );
};

const CyberSecurity = () => {
  const { t } = useLanguage();
  
  return (
    <ServiceDetail
      id="cyber-security"
      title={t('cyberSecurity')}
      highlightText="Enterprise-grade protection for digital assets"
      description="We provide comprehensive cyber security services that protect your organization's digital infrastructure from evolving threats. Our approach focuses on securing IoT devices, which are often the most vulnerable points in corporate networks, with 98% being unencrypted and invisible in company networks. We partner with industry-leading third-party security providers to offer complete protection."
      icon={<Wifi className="h-8 w-8 text-sapp-blue" />}
      featureCards={[
        {
          title: "Core Services",
          features: [
            "Threat Detection & Response",
            "Vulnerability Management",
            "Network Security Architecture",
            "Cloud Security Solutions",
            "Data Protection & Encryption",
            "Identity & Access Management",
            "Security Information & Event Management (SIEM)",
            "Incident Response Planning"
          ]
        },
        {
          title: "IoT & Device Security",
          features: [
            "IoT Device Inventory & Control",
            "Automated Threat Detection",
            "Zero Trust Implementation",
            "Secure Device Configuration",
            "Firmware Security Updates",
            "Network Segmentation",
            "Wireless Security Protocols",
            "Mobile Device Management (MDM)"
          ]
        },
        {
          title: "Compliance & Standards",
          features: [
            "ISO 27001 Compliance",
            "GDPR Data Protection",
            "NIST Cybersecurity Framework",
            "PCI DSS Compliance",
            "Risk Assessment & Management",
            "Security Policy Development",
            "Regular Security Audits",
            "Regulatory Reporting"
          ]
        },
        {
          title: "Security Training",
          features: [
            "Employee Awareness Programs",
            "Phishing Simulation Exercises",
            "Security Best Practices",
            "Social Engineering Defense",
            "Incident Response Training",
            "Executive Security Briefings",
            "Role-based Security Training",
            "Security Culture Development"
          ]
        },
        {
          title: "Third-Party Security Solutions",
          features: [
            "Enterprise-grade SOC services",
            "Managed detection and response (MDR)",
            "Cloud access security brokers (CASB)",
            "Advanced endpoint protection platforms",
            "Next-generation firewall implementation",
            "Third-party penetration testing",
            "Digital forensics capabilities",
            "Security orchestration and automation"
          ]
        }
      ]}
      bgColor="bg-white"
      imagePosition="left"
    />
  );
};

export { EventSecurity, SecurityAudits, TechnologyInstallations, CyberSecurity };

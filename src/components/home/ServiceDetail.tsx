import { useInView } from 'react-intersection-observer';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import FeatureCard from '@/components/ui/FeatureCard';
import { Shield, AlertTriangle, MonitorCheck, Wifi } from 'lucide-react';
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
}

const ServiceDetail = ({
  id,
  title,
  description,
  icon,
  featureCards,
  imagePosition = 'right',
  bgColor = 'bg-slate-50',
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
      description="Real-time protection for high-profile confidential meetings and events. We are experienced event security and technical support providers for corporate board and management meetings for over 20 years."
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
        }
      ]}
      bgColor="bg-slate-50"
    />
  );
};

const SecurityAudits = () => (
  <ServiceDetail
    id="security-audits"
    title="Security Audits"
    description="These external audits are on-site service visits to objectively evaluate the state of play of the physical and information security processes and technology at your organisation. The objective of the security audit is to detect and identify any potential gaps and oversights providing detailed risk-based recommendations for improvement."
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
      }
    ]}
    bgColor="bg-white"
    imagePosition="left"
  />
);

const TechnologyInstallations = () => (
  <ServiceDetail
    id="technology"
    title="Technology Installations"
    description="Our installation services cover a multitude of security systems ranging from CCTV, access control and visitor management systems, speech privacy and sound masking systems, mobile and network security systems as well as privacy screen systems."
    icon={<MonitorCheck className="h-8 w-8 text-sapp-blue" />}
    featureCards={[
      {
        title: "Security Technology",
        features: [
          "Global cloud-based standards",
          "CCTV, intruder alarms",
          "Access control, tailgating",
          "Office technology security",
          "Security for off-network devices",
          "Focus on system integrations",
          "Categorise & prioritise locations",
          "Small-Medium-Large offices"
        ]
      },
      {
        title: "Additional Services",
        features: [
          "Smart Technology Support",
          "Risk Assessments",
          "Security Audits",
          "Security Projects",
          "Compliance Audits",
          "Automated Reporting",
          "On-site v desktop assessments",
          "Ongoing maintenance"
        ]
      }
    ]}
    bgColor="bg-slate-50"
  />
);

const CyberSecurity = () => (
  <ServiceDetail
    id="cyber-security"
    title="Cyber Security"
    description="In the vast landscape of cyber threats and security, IoT devices are often a weak link in the overall cyber security strategy. The primary IoT security challenge is a large volume of diverse devices, 98% of which are unencrypted and not visible in the company network."
    icon={<Wifi className="h-8 w-8 text-sapp-blue" />}
    featureCards={[
      {
        title: "Focus Areas",
        features: [
          "IoT Device Security",
          "WiFi Network Security",
          "Bluetooth Security",
          "Cellular Network Security",
          "Cyber Threat Intelligence",
          "Network segmentation",
          "Security policy implementation",
          "Real-time monitoring"
        ]
      },
      {
        title: "Implementation",
        features: [
          "Automated device inventory",
          "Network protection",
          "Vulnerability assessments",
          "Off-network device security",
          "Personal device management",
          "Cyber-physical convergence",
          "Endpoint security",
          "Threat response planning"
        ]
      }
    ]}
    bgColor="bg-white"
    imagePosition="left"
  />
);

export { EventSecurity, SecurityAudits, TechnologyInstallations, CyberSecurity };


import { useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import ContactFormDialog from '@/components/ui/ContactFormDialog';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronRight } from 'lucide-react';
import { Animated } from '@/components/ui/AnimatedElements';
import SectionLabel from '@/components/ui/SectionLabel';

const ServiceCardsSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [contactDialogOpen, setContactDialogOpen] = useState(false);
  const [selectedService, setSelectedService] = useState('');

  const auditServices = [
    {
      title: "Physical Security Assessments",
      description: "Impartial evaluation of existing and planned security measures to protect organisation's assets from threats and identify vulnerabilities to improve and strengthen organisational resilience. Can include penetration testing.",
      href: "/services/physical-security-assessments",
      delay: 100
    },
    {
      title: "TSCM Inspections",
      description: "Commonly referred to as a bug sweep is a systematic technical and physical inspection that includes scanning and search for unauthorised listening devices to protect the organisation from corporate espionage.",
      href: "/tscm",
      delay: 200
    },
    {
      title: "Compliance Audits",
      description: "ISO27001 certified audit that measures the organisation's compliance with industry standards and international regulations.",
      href: "/services/compliance-audits",
      delay: 300
    },
    {
      title: "Penetration Testing",
      description: "Comprehensive physical security penetration testing to identify vulnerabilities in your security infrastructure through real-world attack simulations and systematic testing methodologies.",
      href: "/services/penetration-testing",
      delay: 400
    }
  ];

  const handleGetDetails = (serviceName: string) => {
    setSelectedService(serviceName);
    setContactDialogOpen(true);
  };

  return (
    <section id="security-audit-services" className="py-16 bg-slate-50" ref={ref}>
      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-screen-xl">
        <div className="text-center mb-12">
          <h3 className="text-sapp-blue text-[19px] leading-[77px] tracking-[3.62px] font-medium">
            WHAT WE DELIVER
          </h3>
          <h2 className="heading-main mb-4">
            Comprehensive Security Audit Services
          </h2>
          <p className="text-sapp-gray max-w-3xl mx-auto">
            Certified security audits detect and identify any potential gaps and oversights, providing detailed risk-based recommendations for improvement. The security audits can be both comprehensive and tailored to the organisation's specific requirement, such as TSCM, assessment of access control systems etc.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6">
          {auditServices.map((service, index) => (
            <Card key={index} className="border-gray-100 flex flex-col lg:col-span-3">
              <CardHeader>
                <CardTitle className="heading-secondary">{service.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                <CardDescription className="text-sapp-gray text-sm min-h-[140px]">
                  {service.description}
                </CardDescription>
              </CardContent>
              <CardFooter className="mt-auto">
                <Button 
                  className="bg-sapp-blue hover:bg-sapp-blue/90 w-full"
                  asChild
                >
                  <Link to={service.href}>
                    Learn More
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>

      <ContactFormDialog 
        open={contactDialogOpen} 
        onOpenChange={setContactDialogOpen}
        defaultMessage={`I'm interested in more information about your ${selectedService} service.`}
        serviceName={selectedService}
      />
    </section>
  );
};

export default ServiceCardsSection;

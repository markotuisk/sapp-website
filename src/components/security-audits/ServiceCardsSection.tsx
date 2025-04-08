
import ServiceCard from '@/components/ui/ServiceCard';

const ServiceCardsSection = () => {
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
      href: "/services/tscm-inspections",
      delay: 200
    },
    {
      title: "Compliance Audits",
      description: "ISO27001 certified audit that measures the organisation's compliance with industry standards and international regulations.",
      href: "/services/compliance-audits",
      delay: 300
    },
    {
      title: "Technology and Systems Testing",
      description: "Technical testing of organisation's existing security and communications technology to identify any gaps and protect against physical security and cyber attacks.",
      href: "/services/technology-systems-testing",
      delay: 400
    }
  ];

  return (
    <section id="security-audit-services" className="py-16 bg-slate-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-block bg-sapp-blue/10 rounded-full px-4 py-1.5 mb-4">
            <h3 className="text-sm font-medium text-sapp-blue tracking-wider">What We Deliver</h3>
          </div>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-sapp-dark mb-4">
            Comprehensive Security Audit Services
          </h2>
          <p className="text-sapp-gray max-w-3xl mx-auto">
            Certified security audits detect and identify any potential gaps and oversights, providing detailed risk-based recommendations for improvement. The security audits can be both comprehensive and tailored to the organisation's specific requirement, such as TSCM, assessment of access control systems etc.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {auditServices.map((service, index) => (
            <ServiceCard 
              key={index}
              title={service.title}
              description={service.description}
              href={service.href}
              delay={service.delay}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServiceCardsSection;

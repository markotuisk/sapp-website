
import React from 'react';
import { useInView } from 'react-intersection-observer';
import { cn } from '@/lib/utils';
import { Shield, FileText, Lock, FileCheck } from 'lucide-react';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Animated } from '@/components/ui/AnimatedElements';
import ContactFormDialog from '@/components/ui/ContactFormDialog';
import SectionLabel from '@/components/ui/SectionLabel';

const WhyIndependentAudits = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [contactDialogOpen, setContactDialogOpen] = React.useState(false);

  const features = [
    {
      title: "Professional Competence",
      description: "Engage with competent and experienced security professionals who understand the complexities of modern security challenges.",
      icon: Shield,
      delay: 100
    },
    {
      title: "Objective Assessment",
      description: "Commission an objective evaluation of your information security status and receive unbiased recommendations for improvement.",
      icon: FileText,
      delay: 200
    },
    {
      title: "Best Industry Practises",
      description: "Benefit from our deep understanding of international security standards and industry best practices to enhance your security posture.",
      icon: FileCheck,
      delay: 300
    },
    {
      title: "Security Resilience",
      description: "Build a robust security framework that ensures compliance with international standards and protects your assets effectively.",
      icon: Lock,
      delay: 400
    }
  ];

  return (
    <section className="py-16 bg-white" ref={ref}>
      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-screen-xl">
        <div className="text-center space-y-4 mb-12">
          <SectionLabel>Improve Your Security Resilience</SectionLabel>
          
          <h2 className="text-3xl md:text-4xl font-display font-bold text-sapp-dark">
            Independent Audits Matter
          </h2>
          
          <p className="text-sapp-gray max-w-3xl mx-auto">
            Comply with international best practises and objectively evaluate the state of play of the physical and information security processes and technology at your organisation.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch max-w-screen-xl mx-auto">
          <div className="lg:col-span-7">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 h-full">
              {features.map((feature, index) => (
                <Animated
                  key={index}
                  animation="fade-up"
                  delay={feature.delay}
                >
                  <div 
                    className={cn(
                      "bg-white h-full rounded-xl border border-gray-100 overflow-hidden transition-all duration-200 ease-in-out p-4",
                      "hover:shadow-xl hover:scale-[1.02]",
                      "shadow-md"
                    )}
                  >
                    <div className="bg-accent-teal/10 text-accent-dark-blue p-3 mb-3 inline-block rounded-md">
                      <feature.icon className="h-6 w-6" />
                    </div>
                    <h3 className="text-xl font-display font-semibold mb-2 text-sapp-dark">
                      {feature.title}
                    </h3>
                    <p className="text-base text-sapp-gray leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </Animated>
              ))}
            </div>
          </div>
          
          <div className="lg:col-span-5 relative flex items-stretch">
            <Animated animation="fade-up" delay={500} className="w-full h-full">
              <div className="relative w-full h-full rounded-xl shadow-xl overflow-hidden bg-white hover:scale-[1.02] transition-all duration-200">
                <AspectRatio ratio={3/4} className="h-full">
                  <img 
                    src="/lovable-uploads/07df3a7d-370a-4b36-b72a-e9311c374a67.png"
                    alt="Compliance and Security Framework" 
                    className="w-full h-full object-cover brightness-95"
                  />
                  <div className="absolute bottom-4 left-4 right-4 text-white text-sm font-medium bg-black/30 backdrop-blur-sm rounded px-3 py-2">
                    Compliance and Security Framework
                  </div>
                </AspectRatio>
              </div>
            </Animated>
          </div>
        </div>

        <ContactFormDialog 
          open={contactDialogOpen}
          onOpenChange={setContactDialogOpen}
          defaultMessage="I'm interested in learning more about your security audit services."
        />
      </div>
    </section>
  );
};

export default WhyIndependentAudits;

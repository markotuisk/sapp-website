
import React from 'react';
import { useInView } from 'react-intersection-observer';
import { cn } from '@/lib/utils';
import { Shield, FileText, Lock, FileCheck } from 'lucide-react';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Animated } from '@/components/ui/AnimatedElements';
import { Button } from '@/components/ui/button';
import ContactFormDialog from '@/components/ui/ContactFormDialog';

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
          <div className="inline-block bg-sapp-blue/10 rounded-full px-4 py-1.5">
            <h3 className="text-sm font-medium text-sapp-blue tracking-wider">
              Improve Your Security Resilience
            </h3>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-display font-bold text-sapp-dark">
            Independent Audits Matter
          </h2>
          
          <p className="text-sapp-gray max-w-3xl mx-auto">
            Comply with international best practises and objectively evaluate the state of play of the physical and information security processes and technology at your organisation.
          </p>
        </div>
        
        <div className="grid lg:grid-cols-12 gap-8 items-stretch max-w-screen-xl mx-auto">
          <div className="lg:col-span-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <Animated
                  key={index}
                  animation="fade-up"
                  delay={feature.delay}
                >
                  <div 
                    className={cn(
                      "bg-white h-full rounded-xl border border-gray-100 overflow-hidden transition-all duration-200 ease-in-out p-6",
                      "hover:shadow-xl hover:scale-[1.02]",
                      "shadow-md"
                    )}
                  >
                    <div className="bg-accent-teal/10 text-accent-dark-blue p-3 mb-4 inline-block rounded-md">
                      <feature.icon className="h-5 w-5" />
                    </div>
                    <h3 className="text-xl font-display font-semibold mb-3 text-sapp-dark">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-sapp-gray leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </Animated>
              ))}
            </div>
            
            <div className="mt-8 text-center">
              <Button 
                size="lg"
                onClick={() => setContactDialogOpen(true)}
                className="bg-sapp-blue hover:bg-sapp-blue/90 text-white shadow-lg shadow-sapp-blue/20"
              >
                Get In Touch
              </Button>
            </div>
          </div>
          
          <div className="lg:col-span-4 relative flex items-stretch">
            <Animated animation="fade-up" delay={500}>
              <div className="absolute -inset-2 bg-sapp-blue/5 rounded-2xl blur-xl"></div>
              <div className="w-full relative z-10 rounded-xl shadow-xl overflow-hidden bg-white hover:scale-[1.02] transition-all duration-200">
                <AspectRatio ratio={3/4} className="h-full">
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/10"></div>
                  <img 
                    src="/lovable-uploads/94d4676f-3535-4967-ab30-0ec0bbc3eeb3.png"
                    alt="Live Security Audits in Practice" 
                    className="w-full h-full object-cover brightness-95"
                  />
                  <div className="absolute bottom-4 left-4 right-4 text-white text-sm font-medium bg-black/30 backdrop-blur-sm rounded px-3 py-2">
                    Live Security Audits in Practice
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

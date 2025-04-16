
import React from 'react';
import { CalendarCheck, ShieldCheck, MonitorCheck, FileSearch } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useInView } from 'react-intersection-observer';

const SecurityProcessSection: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const steps = [
    {
      number: 1,
      title: "Assessment",
      description: "Comprehensive risk assessment of the venue, participants, and event type",
      icon: <FileSearch className="h-8 w-8 text-white" />,
      color: "from-sapp-blue to-sapp-blue/80",
      delay: 100
    },
    {
      number: 2,
      title: "Planning",
      description: "Tailored security plan including technical audits and personnel requirements",
      icon: <CalendarCheck className="h-8 w-8 text-white" />,
      color: "from-sapp-blue/90 to-sapp-blue/70",
      delay: 200
    },
    {
      number: 3,
      title: "Implementation",
      description: "Deployment of security measures and monitoring systems before and during the event",
      icon: <ShieldCheck className="h-8 w-8 text-white" />,
      color: "from-sapp-blue/80 to-sapp-blue/60",
      delay: 300
    },
    {
      number: 4,
      title: "Monitoring",
      description: "Real-time surveillance with immediate incident response capabilities",
      icon: <MonitorCheck className="h-8 w-8 text-white" />,
      color: "from-sapp-blue/70 to-sapp-blue/50",
      delay: 400
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <div className="inline-block bg-sapp-blue/10 rounded-full px-4 py-1.5 mb-4">
            <h3 className="text-sm font-medium text-sapp-blue tracking-wider">Security Process</h3>
          </div>
        </div>
        
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-display font-bold text-sapp-dark mb-6">
            How We Secure Your Events
          </h2>
          <p className="text-sapp-gray">
            Executive level Event Security service delivers specialised and enhanced security at a sensitive event, ensures confidentiality and discretion, being prepared for any eventualities, demonstrating the duty of care to organisation's shareholders, bringing awareness of espionage risks to the staff, and ultimately keeping the reputation and competitive advantage of the organisation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {steps.map((step, index) => (
            <div 
              key={index} 
              className={cn(
                "rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1 group",
                inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              )}
              style={{ transitionDelay: `${step.delay}ms` }}
              ref={ref}
            >
              <div className={`bg-gradient-to-br ${step.color} p-5`}>
                <div className="flex justify-between items-center">
                  <div className="bg-white/20 rounded-full h-12 w-12 flex items-center justify-center backdrop-blur-sm">
                    {step.icon}
                  </div>
                  <span className="text-white text-5xl font-display font-bold opacity-50">{step.number}</span>
                </div>
              </div>
              <div className="p-5 bg-white">
                <h3 className="text-xl font-display font-semibold mb-2 text-sapp-dark group-hover:text-sapp-blue transition-colors duration-300">
                  {step.title}
                </h3>
                <p className="text-sapp-gray text-sm">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SecurityProcessSection;

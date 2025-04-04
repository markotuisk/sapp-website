
import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { cn } from '@/lib/utils';
import { Shield, Users, Sparkles, LineChart } from 'lucide-react';

const AboutCard = ({ icon: Icon, title, description, delay }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <div 
      ref={ref}
      className={cn(
        "bg-white rounded-xl p-6 shadow-lg border border-gray-100 transition-all duration-700",
        "hover:shadow-xl hover:-translate-y-1 transform",
        inView ? `opacity-100 translate-y-0 delay-[${delay}ms]` : "opacity-0 translate-y-10"
      )}
    >
      <div className="bg-sapp-blue/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
        <Icon className="h-6 w-6 text-sapp-blue" />
      </div>
      <h3 className="text-lg font-display font-semibold mb-2 text-sapp-dark">{title}</h3>
      <p className="text-sapp-gray text-sm">{description}</p>
    </div>
  );
};

const About = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const cards = [
    {
      icon: Shield,
      title: "WHO",
      description: "We are an experienced technical security company based in the UK and Estonia with a suite of security support services for corporate organizations worldwide.",
      delay: 100,
    },
    {
      icon: Sparkles,
      title: "WHAT",
      description: "We provide technical security services for corporate clients to protect sensitive meetings, high-value events, audit security processes, and provide innovative IoT device security.",
      delay: 200,
    },
    {
      icon: LineChart,
      title: "HOW",
      description: "Our approach is technical, no-nonsense, practical, bespoke and flexible, applying innovative methodologies developed in Estonia.",
      delay: 300,
    },
    {
      icon: Users,
      title: "WHY",
      description: "We are a one-stop-shop for all your technical security needs, helping organizations to converge their cyber security and physical security functions.",
      delay: 400,
    },
  ];

  return (
    <section id="about" className="py-24 bg-slate-50 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-white to-transparent"></div>
      
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-12 mb-16">
          <div className="lg:w-1/2 order-2 lg:order-1">
            <div 
              className={cn(
                "relative rounded-xl overflow-hidden shadow-2xl transition-all duration-700",
                inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              )}
            >
              <img 
                src="/lovable-uploads/fc9a9c2e-5129-4b70-89e2-7617a4e5578a.png" 
                alt="Security Operations Center" 
                className="w-full h-auto"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-sapp-dark/50 to-transparent"></div>
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <h3 className="text-xl font-bold mb-1">Security Operations Center</h3>
                <p className="text-sm text-white/80">State-of-the-art monitoring and response capabilities</p>
              </div>
            </div>
          </div>
          
          <div className="lg:w-1/2 order-1 lg:order-2">
            <span 
              ref={ref}
              className={cn(
                "inline-block px-4 py-1.5 bg-sapp-blue/10 rounded-full text-sapp-blue text-sm font-medium mb-4 transition-all duration-500",
                inView ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
              )}
            >
              About Us
            </span>
            <h2 
              className={cn(
                "text-3xl md:text-4xl font-display font-bold text-sapp-dark mb-6 transition-all duration-500 delay-100",
                inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              )}
            >
              Security expertise built on <span className="text-sapp-blue">competence, integrity, and clarity</span>
            </h2>
            <p 
              className={cn(
                "text-sapp-gray text-lg mb-6 transition-all duration-500 delay-200",
                inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              )}
            >
              SAPP Security is a natural evolution from a UK-based counter espionage company, 
              now offering wider technical security expertise and automation of multiple security systems.
            </p>
            <p 
              className={cn(
                "text-sapp-gray mb-8 transition-all duration-500 delay-300",
                inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              )}
            >
              Our services range from staple physical and information security audits to complex installations of
              technical security systems. We provide experienced technical security support to high profile corporate
              meetings and other sensitive events.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {cards.map((card, index) => (
            <AboutCard key={index} {...card} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;

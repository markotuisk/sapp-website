
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
        <div className="max-w-3xl mx-auto text-center mb-16">
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
            Security expertise driven by <span className="text-sapp-blue">innovation</span>
          </h2>
          <p 
            className={cn(
              "text-sapp-gray text-lg transition-all duration-500 delay-200",
              inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            )}
          >
            SAPP Security is a natural evolution from a UK-based counter espionage company, 
            now offering wider technical security expertise and automation of multiple security systems.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {cards.map((card, index) => (
            <AboutCard key={index} {...card} />
          ))}
        </div>

        <div 
          className={cn(
            "max-w-3xl mx-auto text-center bg-white rounded-xl p-8 shadow-lg border border-gray-100 transition-all duration-700",
            inView ? "opacity-100 translate-y-0 delay-500" : "opacity-0 translate-y-10"
          )}
        >
          <p className="text-sapp-gray mb-6">
            Our services range from staple physical and information security audits to complex installations of
            technical security systems. We provide experienced technical security support to high profile corporate
            meetings and other sensitive events. Our clients range from multinational corporations to high-net-worth
            individuals.
          </p>
          <p className="text-sapp-gray font-medium">
            We bring together over 20 years of global technical security experience driven by
            analytical data-based strategies and practical Estonian logic.
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;


import React, { useState, useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';
import { cn } from '@/lib/utils';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Shield, MapPin, CalendarCheck, Laptop, Users, ArrowRight } from 'lucide-react';
import ServiceCard from '@/components/ui/ServiceCard';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import LearnMoreModal from '@/components/ui/LearnMoreModal';
import QuoteCard from '@/components/ui/QuoteCard';

const EventSecurity = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedService, setSelectedService] = useState<number | null>(null);
  
  // Scroll to hash on load
  useEffect(() => {
    if (location.hash) {
      const id = location.hash.substring(1);
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [location]);
  
  const services = [
    {
      icon: <MapPin className="h-5 w-5" />,
      title: "Venue Security Audits",
      description: "Comprehensive assessment of event venues to identify and mitigate security vulnerabilities before your event.",
      items: [
        "Physical security assessment",
        "Access point evaluations",
        "Technical vulnerabilities scan",
        "Threat profile creation",
        "Custom security recommendations"
      ],
      href: "/services/venue-security-audits",
      imagePath: "/lovable-uploads/ccaa80f3-bbe5-46f3-a853-d7007fbff022.png"
    },
    {
      icon: <CalendarCheck className="h-5 w-5" />,
      title: "Event Monitoring",
      description: "Real-time surveillance and monitoring throughout your event to ensure immediate response to any security concerns.",
      items: [
        "Live camera monitoring",
        "Access control oversight",
        "Credential verification",
        "Real-time incident response",
        "Post-event security reporting"
      ],
      href: "/services/event-monitoring",
      imagePath: "/lovable-uploads/fc9a9c2e-5129-4b70-89e2-7617a4e5578a.png"
    },
    {
      icon: <Laptop className="h-5 w-5" />,
      title: "Secure Technology",
      description: "Advanced technical solutions to protect sensitive information and communications during confidential meetings.",
      items: [
        "Secure communications setup",
        "Device screening services",
        "Anti-eavesdropping measures",
        "Wireless network security",
        "Technical surveillance countermeasures"
      ],
      href: "/services/secure-technology",
      imagePath: "/lovable-uploads/85184084-bca0-497c-8950-601f002a465f.png"
    },
    {
      icon: <Users className="h-5 w-5" />,
      title: "Close Protection",
      description: "Professional security personnel for high-profile executives and restricted events requiring enhanced security.",
      items: [
        "Executive protection",
        "Threat assessment",
        "Discrete security presence",
        "Travel security planning",
        "VIP handling protocols"
      ],
      href: "/services/close-protection",
      imagePath: "/lovable-uploads/234f523c-dec6-4bb9-8b48-d308fc61a7ec.png"
    }
  ];

  const handleLearnMoreClick = (index: number) => {
    setSelectedService(index);
  };

  const handleCloseModal = () => {
    setSelectedService(null);
  };

  const handleContactClick = () => {
    navigate('/#contact');
    setSelectedService(null);
  };
  
  // Process steps with animations
  const processSteps = [
    {
      number: "01",
      title: "Assessment",
      description: "Thorough evaluation of your event's security requirements",
      delay: 100
    },
    {
      number: "02",
      title: "Planning",
      description: "Custom security strategy based on identified needs",
      delay: 200
    },
    {
      number: "03",
      title: "Implementation",
      description: "Deployment of security measures and technology",
      delay: 300
    },
    {
      number: "04",
      title: "Monitoring",
      description: "Continuous oversight throughout event execution",
      delay: 400
    },
    {
      number: "05",
      title: "After-Action",
      description: "Comprehensive review and security improvement recommendations",
      delay: 500
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main className="pt-32">
        {/* Hero Section */}
        <section className="pb-16 relative bg-gradient-to-b from-slate-50 to-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h1 
                className={cn(
                  "text-4xl md:text-5xl font-display font-bold text-sapp-dark mb-6 text-center transition-all duration-500",
                  inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                )}
              >
                Event Security
              </h1>
              <p 
                className={cn(
                  "text-xl text-sapp-gray text-center mb-10 transition-all duration-500 delay-100",
                  inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                )}
              >
                Real-time protection for high-profile confidential meetings and events
              </p>
              <p className="text-sapp-gray text-center mb-8">
                We are experienced in protecting management and board meetings for over 20 years. 
                Our team provides comprehensive security solutions for corporate executives, 
                ensuring your most sensitive gatherings remain secure and private.
              </p>
            </div>
          </div>
        </section>
        
        {/* Quote Section */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <QuoteCard
                quote="Security is always seen as too much until the day it's not enough."
                author="William H. Webster"
                role="Former FBI Director"
                color="blue"
                delay={100}
              />
              <QuoteCard
                quote="It takes 20 years to build a reputation and a few minutes to ruin it."
                author="Stephane Nappo"
                role="Global Chief Information Security Officer"
                color="dark"
                delay={200}
              />
            </div>
          </div>
        </section>
        
        {/* Event Security Process */}
        <section className="py-16 bg-slate-50" ref={ref}>
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-display font-bold text-sapp-dark mb-12 text-center">
              Our Event Security Process
            </h2>
            
            <div className="flex flex-col md:flex-row justify-between flex-wrap gap-y-6 relative">
              {/* Background connector line */}
              <div className="absolute top-12 left-14 right-14 h-1 bg-gradient-to-r from-sapp-blue/20 via-sapp-blue to-sapp-blue/20 hidden md:block"></div>
              
              {processSteps.map((step, index) => (
                <div 
                  key={index}
                  className={cn(
                    "bg-white p-6 rounded-lg shadow-md border border-gray-100 w-full md:w-[calc(20%-1rem)] relative z-10 transition-all duration-700 hover:shadow-lg hover:-translate-y-1",
                    inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                  )}
                  style={{ transitionDelay: inView ? `${step.delay}ms` : '0ms' }}
                >
                  <div className="w-12 h-12 bg-sapp-blue text-white rounded-full flex items-center justify-center font-display font-bold mb-4 mx-auto">
                    {step.number}
                  </div>
                  <h3 className="font-display font-semibold text-center mb-2">{step.title}</h3>
                  <p className="text-sm text-sapp-gray text-center">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Executive Events Section */}
        <section id="executive-events" className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-display font-bold text-sapp-dark mb-4 text-center">
              How We Secure Executive Events
            </h2>
            <p className="text-sapp-gray text-center max-w-3xl mx-auto mb-12">
              Our specialized services are designed to provide comprehensive protection for sensitive corporate meetings and executive gatherings.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {services.map((service, index) => (
                <div key={index} className="h-full">
                  <ServiceCard 
                    {...service}
                    delay={100 * (index + 1)}
                    onLearnMoreClick={() => handleLearnMoreClick(index)}
                  />
                </div>
              ))}
            </div>
            
            {selectedService !== null && (
              <LearnMoreModal
                title={services[selectedService].title}
                description={services[selectedService].description}
                features={services[selectedService].items}
                isOpen={selectedService !== null}
                onClose={handleCloseModal}
                onContact={handleContactClick}
              />
            )}
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-sapp-dark to-sapp-dark/90 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-display font-bold mb-6">Ready to secure your next event?</h2>
            <p className="max-w-2xl mx-auto mb-8 text-white/80">
              Our team of security experts is ready to ensure your executive meetings and corporate events have the protection they need.
            </p>
            <Link to="/#contact">
              <Button 
                size="lg" 
                className="bg-sapp-blue hover:bg-sapp-blue/90 text-white shadow-lg shadow-sapp-blue/20 transition-all duration-300 hover:scale-105"
              >
                Get in Touch
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default EventSecurity;

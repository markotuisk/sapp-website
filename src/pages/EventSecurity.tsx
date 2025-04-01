
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { MapPin, CalendarCheck, Laptop, Users } from 'lucide-react';
import HeroSection from '@/components/event-security/HeroSection';
import QuotesSection from '@/components/event-security/QuotesSection';
import ProcessSteps from '@/components/event-security/ProcessSteps';
import SecurityServices from '@/components/event-security/SecurityServices';
import CTASection from '@/components/event-security/CTASection';

const EventSecurity = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  
  const location = useLocation();
  
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
        <HeroSection inView={inView} />
        
        {/* Quote Section */}
        <QuotesSection />
        
        {/* Event Security Process */}
        <div ref={ref}>
          <ProcessSteps inView={inView} steps={processSteps} />
        </div>
        
        {/* Executive Events Section */}
        <SecurityServices services={services} />
        
        {/* CTA Section */}
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default EventSecurity;

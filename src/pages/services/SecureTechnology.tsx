import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useLocation } from 'react-router-dom';
import { ArrowLeft, ArrowRight, FileSearch } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { useState } from 'react';
import ContactFormDialog from '@/components/ui/ContactFormDialog';
import { Animated } from '@/components/ui/AnimatedElements';

const SecureTechnology = () => {
  const [contactDialogOpen, setContactDialogOpen] = useState(false);
  const location = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <div className="min-h-screen">
      <Helmet>
        <title>Secure Technology | SAPP Security</title>
        <meta 
          name="description" 
          content="Secure communications technology for corporate events and executive meetings." 
        />
        <link rel="canonical" href="https://sappsecurity.com/services/secure-technology" />
      </Helmet>
      
      <Navbar />
      
      <main>
        <section className="py-16 md:py-24 bg-gradient-to-b from-slate-50 to-white">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center mb-8">
              <Link to="/services/event-monitoring">
                <Button variant="outline" className="flex items-center gap-2 transition-all duration-300 hover:translate-x-[-5px]">
                  <ArrowLeft className="h-4 w-4" />
                  Previous: Event Monitoring
                </Button>
              </Link>
              <Link to="/services/close-protection">
                <Button variant="outline" className="flex items-center gap-2 transition-all duration-300 hover:translate-x-[5px]">
                  Next: Close Protection
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
            
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-block bg-sapp-blue/10 rounded-full px-4 py-1.5 mb-4">
                <h3 className="text-sm font-medium text-sapp-blue tracking-wider">Event Security</h3>
              </div>
              <h1 className="text-4xl md:text-5xl font-display font-bold text-sapp-dark mb-6">
                Secure Technology
              </h1>
              <p className="text-lg text-sapp-gray mb-8 max-w-2xl mx-auto">
                Protecting your sensitive information with hardened technology solutions during corporate events and executive meetings.
              </p>
              <Button 
                size="lg" 
                className="bg-sapp-blue hover:bg-sapp-blue/90 text-white shadow-lg shadow-sapp-blue/20 hover:scale-105 transition-all duration-200"
                onClick={() => setContactDialogOpen(true)}
              >
                Schedule Technology Assessment
              </Button>
            </div>
          </div>
        </section>
        
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <Animated animation="fade-up" delay={100}>
              <div className="text-center mb-12">
                <div className="inline-block bg-sapp-blue/10 rounded-full px-4 py-1.5 mb-4">
                  <h3 className="text-sm font-medium text-sapp-blue tracking-wider">Our Approach</h3>
                </div>
                <h2 className="text-3xl md:text-4xl font-display font-bold text-sapp-dark mb-6">
                  Comprehensive Technology Security Solutions
                </h2>
                <p className="text-sapp-gray max-w-3xl mx-auto">
                  Companies typically use a range of communications technology at most of their sensitive events. Our service includes detailed audit of all technology with recommendations for more secure alternatives.
                </p>
              </div>
            </Animated>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              <Card className="border-gray-100">
                <CardHeader>
                  <CardTitle className="text-xl text-sapp-dark">Technology Assessment</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-sm text-sapp-gray">
                    We comprehensively evaluate all technologies planned for use at your event, identifying potential security vulnerabilities.
                  </CardDescription>
                </CardContent>
              </Card>
              
              <Card className="border-gray-100">
                <CardHeader>
                  <CardTitle className="text-xl text-sapp-dark">Secure Communications Setup</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-sm text-sapp-gray">
                    Our specialists implement encrypted communications systems for sensitive discussions, protecting against eavesdropping.
                  </CardDescription>
                </CardContent>
              </Card>
              
              <Card className="border-gray-100">
                <CardHeader>
                  <CardTitle className="text-xl text-sapp-dark">Network Security Implementation</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-sm text-sapp-gray">
                    We establish secure, isolated networks for your event, with comprehensive monitoring for intrusion attempts.
                  </CardDescription>
                </CardContent>
              </Card>
              
              <Card className="border-gray-100">
                <CardHeader>
                  <CardTitle className="text-xl text-sapp-dark">Device Security Management</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-sm text-sapp-gray">
                    All devices used during your event undergo security hardening to protect against malware and unauthorized access.
                  </CardDescription>
                </CardContent>
              </Card>
            </div>
            
            <div className="mt-12">
              <Card className="border-gray-100">
                <CardHeader>
                  <CardTitle className="text-xl text-sapp-dark">Why Choose Our Secure Technology</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <span className="text-sapp-blue mr-2 text-lg leading-none">•</span>
                      <span className="text-sm text-sapp-gray">State-of-the-art encryption solutions</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-sapp-blue mr-2 text-lg leading-none">•</span>
                      <span className="text-sm text-sapp-gray">Comprehensive cyber threat protection</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-sapp-blue mr-2 text-lg leading-none">•</span>
                      <span className="text-sm text-sapp-gray">Technical surveillance countermeasures</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-sapp-blue mr-2 text-lg leading-none">•</span>
                      <span className="text-sm text-sapp-gray">Secure document handling protocols</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-sapp-blue mr-2 text-lg leading-none">•</span>
                      <span className="text-sm text-sapp-gray">Experienced cybersecurity professionals</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button 
                    className="bg-sapp-blue hover:bg-sapp-blue/90 text-white"
                    onClick={() => setContactDialogOpen(true)}
                  >
                    Request Secure Technology
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </section>
        
        <section className="py-20 bg-gradient-to-r from-sapp-blue to-blue-600 text-white">
          <div className="container mx-auto px-4 text-center">
            <Animated animation="fade-up" delay={100}>
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
                Protect Your Sensitive Communications
              </h2>
              <p className="max-w-2xl mx-auto mb-8 text-white/90">
                Contact our team to implement secure technology solutions for your next corporate event.
              </p>
              <Button 
                variant="outline" 
                size="lg" 
                className="bg-white text-sapp-blue hover:bg-white/90 border-0 shadow-lg hover:scale-105 transition-all duration-200"
                onClick={() => setContactDialogOpen(true)}
              >
                Get Started Today
              </Button>
            </Animated>
          </div>
        </section>
        
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center py-8 border-t border-gray-100">
            <Link to="/services/event-monitoring">
              <Button variant="outline" className="flex items-center gap-2 transition-all duration-300 hover:translate-x-[-5px]">
                <ArrowLeft className="h-4 w-4" />
                Previous: Event Monitoring
              </Button>
            </Link>
            <Link to="/services/close-protection">
              <Button variant="outline" className="flex items-center gap-2 transition-all duration-300 hover:translate-x-[5px]">
                Next: Close Protection
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </main>
      
      <Footer />
      
      <ContactFormDialog 
        open={contactDialogOpen}
        onOpenChange={setContactDialogOpen}
        defaultMessage="I'm interested in learning more about your Secure Technology services."
        serviceName="Secure Technology"
      />
    </div>
  );
};

export default SecureTechnology;

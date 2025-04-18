import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useLocation } from 'react-router-dom';
import { ArrowLeft, ArrowRight, MonitorCheck } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { useState } from 'react';
import ContactFormDialog from '@/components/ui/ContactFormDialog';
import { Animated } from '@/components/ui/AnimatedElements';

const EventMonitoring = () => {
  const [contactDialogOpen, setContactDialogOpen] = useState(false);
  const location = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <div className="min-h-screen">
      <Helmet>
        <title>Event Monitoring | SAPP Security</title>
        <meta 
          name="description" 
          content="Real-time technical and physical monitoring for sensitive corporate meetings and events." 
        />
        <link rel="canonical" href="https://sappsecurity.com/services/event-monitoring" />
      </Helmet>
      
      <Navbar />
      
      <main>
        <section className="py-16 md:py-24 bg-gradient-to-b from-slate-50 to-white">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center mb-8">
              <Link to="/services/venue-security-audits">
                <Button variant="outline" className="flex items-center gap-2 transition-all duration-300 hover:translate-x-[-5px]">
                  <ArrowLeft className="h-4 w-4" />
                  Previous: Venue Security Audits
                </Button>
              </Link>
              <Link to="/services/secure-technology">
                <Button variant="outline" className="flex items-center gap-2 transition-all duration-300 hover:translate-x-[5px]">
                  Next: Secure Technology
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
            
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-block bg-sapp-blue/10 rounded-full px-4 py-1.5 mb-4">
                <h3 className="text-sm font-medium text-sapp-blue tracking-wider">Event Security</h3>
              </div>
              <h1 className="text-4xl md:text-5xl font-display font-bold text-sapp-dark mb-6">
                Event Monitoring
              </h1>
              <p className="text-lg text-sapp-gray mb-8 max-w-2xl mx-auto">
                Real-time technical and physical monitoring for your sensitive meetings, providing protection against corporate espionage and information gatherers.
              </p>
              <Button 
                size="lg" 
                className="bg-sapp-blue hover:bg-sapp-blue/90 text-white shadow-lg shadow-sapp-blue/20 hover:scale-105 transition-all duration-200"
                onClick={() => setContactDialogOpen(true)}
              >
                Schedule Event Monitoring
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
                  Comprehensive Event Monitoring Solutions
                </h2>
                <p className="text-sapp-gray max-w-3xl mx-auto">
                  Real-time technical and physical monitoring should be a standard business process at any confidential, restricted or sensitive meeting. Our monitoring also includes incident management to prevent potential crises and reputational damage.
                </p>
              </div>
            </Animated>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              <Card className="border-gray-100">
                <CardHeader>
                  <CardTitle className="text-xl text-sapp-dark">Pre-Event Security Setup</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-sm text-sapp-gray">
                    We establish comprehensive monitoring systems before your meeting begins, ensuring secure conditions from the start.
                  </CardDescription>
                </CardContent>
              </Card>
              
              <Card className="border-gray-100">
                <CardHeader>
                  <CardTitle className="text-xl text-sapp-dark">Technical Surveillance</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-sm text-sapp-gray">
                    Our specialists use advanced equipment to detect unauthorized recording devices and monitor for electronic intrusions.
                  </CardDescription>
                </CardContent>
              </Card>
              
              <Card className="border-gray-100">
                <CardHeader>
                  <CardTitle className="text-xl text-sapp-dark">Physical Security Presence</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-sm text-sapp-gray">
                    Discreet security personnel maintain vigilance throughout your event, controlling access and monitoring for suspicious activity.
                  </CardDescription>
                </CardContent>
              </Card>
              
              <Card className="border-gray-100">
                <CardHeader>
                  <CardTitle className="text-xl text-sapp-dark">Real-Time Threat Response</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-sm text-sapp-gray">
                    Our team provides immediate intervention for any security concerns, with established protocols for different threat levels.
                  </CardDescription>
                </CardContent>
              </Card>
            </div>
            
            <div className="mt-12">
              <Card className="border-gray-100">
                <CardHeader>
                  <CardTitle className="text-xl text-sapp-dark">Why Choose Our Event Monitoring</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <span className="text-sapp-blue mr-2 text-lg leading-none">•</span>
                      <span className="text-sm text-sapp-gray">24/7 real-time monitoring capabilities</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-sapp-blue mr-2 text-lg leading-none">•</span>
                      <span className="text-sm text-sapp-gray">Advanced detection technologies</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-sapp-blue mr-2 text-lg leading-none">•</span>
                      <span className="text-sm text-sapp-gray">Experienced security professionals</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-sapp-blue mr-2 text-lg leading-none">•</span>
                      <span className="text-sm text-sapp-gray">Immediate incident response protocols</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-sapp-blue mr-2 text-lg leading-none">•</span>
                      <span className="text-sm text-sapp-gray">Customized monitoring solutions</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button 
                    className="bg-sapp-blue hover:bg-sapp-blue/90 text-white"
                    onClick={() => setContactDialogOpen(true)}
                  >
                    Request Event Monitoring
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
                Secure Your Sensitive Meetings
              </h2>
              <p className="max-w-2xl mx-auto mb-8 text-white/90">
                Contact our team to implement real-time monitoring for your next high-profile corporate event.
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
            <Link to="/services/venue-security-audits">
              <Button variant="outline" className="flex items-center gap-2 transition-all duration-300 hover:translate-x-[-5px]">
                <ArrowLeft className="h-4 w-4" />
                Previous: Venue Security Audits
              </Button>
            </Link>
            <Link to="/services/secure-technology">
              <Button variant="outline" className="flex items-center gap-2 transition-all duration-300 hover:translate-x-[5px]">
                Next: Secure Technology
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
        defaultMessage="I'm interested in learning more about your Event Monitoring services."
        serviceName="Event Monitoring"
      />
    </div>
  );
};

export default EventMonitoring;

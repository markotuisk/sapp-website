
import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useLocation } from 'react-router-dom';
import { ArrowLeft, Users } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { useState } from 'react';
import ContactFormDialog from '@/components/ui/ContactFormDialog';
import { Animated } from '@/components/ui/AnimatedElements';

const CloseProtection = () => {
  const [contactDialogOpen, setContactDialogOpen] = useState(false);
  const location = useLocation();
  
  useEffect(() => {
    // Scroll to the top when component mounts or location changes
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <div className="min-h-screen">
      <Helmet>
        <title>Close Protection | SAPP Security</title>
        <meta 
          name="description" 
          content="Professional close protection services for high-profile executives and restricted corporate events." 
        />
        <link rel="canonical" href="https://sappsecurity.com/services/close-protection" />
      </Helmet>
      
      <Navbar />
      
      <main>
        {/* Hero Section */}
        <section className="py-16 md:py-24 bg-gradient-to-b from-slate-50 to-white">
          <div className="container mx-auto px-4">
            {/* Navigation buttons */}
            <div className="flex justify-between items-center mb-8">
              <Link to="/services/secure-technology">
                <Button variant="outline" className="flex items-center gap-2 transition-all duration-300 hover:translate-x-[-5px]">
                  <ArrowLeft className="h-4 w-4" />
                  Previous: Secure Technology
                </Button>
              </Link>
              <Link to="/event-security#executive-events">
                <Button variant="outline" className="flex items-center gap-2 transition-all duration-300 hover:translate-x-[-5px]">
                  <ArrowLeft className="h-4 w-4" />
                  Back to Event Security
                </Button>
              </Link>
            </div>
            
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 mb-10 md:mb-0">
                <Animated animation="fade-up" delay={100}>
                  <div className="inline-block bg-sapp-blue/10 rounded-full px-4 py-1.5 mb-4">
                    <h3 className="text-sm font-medium text-sapp-blue tracking-wider">Event Security</h3>
                  </div>
                  <h1 className="text-4xl md:text-5xl font-display font-bold text-sapp-dark mb-6">
                    Close Protection
                  </h1>
                  <p className="text-lg text-sapp-gray mb-8 max-w-2xl">
                    Professional security for high-profile executives and restricted events, ensuring safety while maintaining a professional atmosphere.
                  </p>
                  <Button 
                    size="lg" 
                    className="bg-sapp-blue hover:bg-sapp-blue/90 text-white shadow-lg shadow-sapp-blue/20 hover:scale-105 transition-all duration-200"
                    onClick={() => setContactDialogOpen(true)}
                  >
                    Request Close Protection
                  </Button>
                </Animated>
              </div>
              <div className="md:w-1/2">
                <Animated animation="fade-up" delay={200} className="relative">
                  <div className="absolute -inset-4 bg-sapp-blue/5 rounded-2xl blur-xl"></div>
                  <div className="relative z-10 rounded-xl overflow-hidden shadow-xl">
                    <img 
                      src="/lovable-uploads/234f523c-dec6-4bb9-8b48-d308fc61a7ec.png" 
                      alt="Close Protection" 
                      className="w-full h-auto"
                    />
                  </div>
                </Animated>
              </div>
            </div>
          </div>
        </section>
        
        {/* Features Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <Animated animation="fade-up" delay={100}>
              <div className="text-center mb-12">
                <div className="inline-block bg-sapp-blue/10 rounded-full px-4 py-1.5 mb-4">
                  <h3 className="text-sm font-medium text-sapp-blue tracking-wider">Our Approach</h3>
                </div>
                <h2 className="text-3xl md:text-4xl font-display font-bold text-sapp-dark mb-6">
                  Comprehensive Close Protection Services
                </h2>
                <p className="text-sapp-gray max-w-3xl mx-auto">
                  For larger restricted events such as AGMs and for high-profile executives, we work with trusted partners to provide professional close protection services.
                </p>
              </div>
            </Animated>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              <Card className="border-gray-100">
                <CardHeader>
                  <CardTitle className="text-xl text-sapp-dark">Risk Assessment</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-sm text-sapp-gray">
                    We conduct a thorough evaluation of security needs based on event type, location, and attendee profiles.
                  </CardDescription>
                </CardContent>
              </Card>
              
              <Card className="border-gray-100">
                <CardHeader>
                  <CardTitle className="text-xl text-sapp-dark">Security Planning</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-sm text-sapp-gray">
                    Our specialists develop a comprehensive protection strategy tailored to your specific requirements.
                  </CardDescription>
                </CardContent>
              </Card>
              
              <Card className="border-gray-100">
                <CardHeader>
                  <CardTitle className="text-xl text-sapp-dark">Professional Deployment</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-sm text-sapp-gray">
                    Experienced security personnel are strategically positioned to maintain discreet yet effective protection.
                  </CardDescription>
                </CardContent>
              </Card>
              
              <Card className="border-gray-100">
                <CardHeader>
                  <CardTitle className="text-xl text-sapp-dark">Coordination with Venue Security</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-sm text-sapp-gray">
                    We work seamlessly with existing security teams to enhance overall protection without duplication of efforts.
                  </CardDescription>
                </CardContent>
              </Card>
            </div>
            
            <div className="mt-12">
              <Card className="border-gray-100">
                <CardHeader>
                  <CardTitle className="text-xl text-sapp-dark">Why Choose Our Close Protection</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <span className="text-sapp-blue mr-2 text-lg leading-none">•</span>
                      <span className="text-sm text-sapp-gray">Highly trained security professionals</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-sapp-blue mr-2 text-lg leading-none">•</span>
                      <span className="text-sm text-sapp-gray">Discreet presence maintaining professional atmosphere</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-sapp-blue mr-2 text-lg leading-none">•</span>
                      <span className="text-sm text-sapp-gray">Experience with high-profile corporate events</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-sapp-blue mr-2 text-lg leading-none">•</span>
                      <span className="text-sm text-sapp-gray">Comprehensive threat assessment and planning</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-sapp-blue mr-2 text-lg leading-none">•</span>
                      <span className="text-sm text-sapp-gray">Seamless integration with other security measures</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button 
                    className="bg-sapp-blue hover:bg-sapp-blue/90 text-white"
                    onClick={() => setContactDialogOpen(true)}
                  >
                    Request Close Protection
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-sapp-blue to-blue-600 text-white">
          <div className="container mx-auto px-4 text-center">
            <Animated animation="fade-up" delay={100}>
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
                Protect Your Executives and Events
              </h2>
              <p className="max-w-2xl mx-auto mb-8 text-white/90">
                Contact our team to arrange professional close protection for your next high-profile corporate event.
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
        
        {/* Bottom navigation */}
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center py-8 border-t border-gray-100">
            <Link to="/services/secure-technology">
              <Button variant="outline" className="flex items-center gap-2 transition-all duration-300 hover:translate-x-[-5px]">
                <ArrowLeft className="h-4 w-4" />
                Previous: Secure Technology
              </Button>
            </Link>
            <Link to="/event-security#executive-events">
              <Button variant="outline" className="flex items-center gap-2 transition-all duration-300 hover:translate-x-[-5px]">
                <ArrowLeft className="h-4 w-4" />
                Back to Event Security
              </Button>
            </Link>
          </div>
        </div>
      </main>
      
      <Footer />
      
      <ContactFormDialog 
        open={contactDialogOpen}
        onOpenChange={setContactDialogOpen}
        defaultMessage="I'm interested in learning more about your Close Protection services."
        serviceName="Close Protection"
      />
    </div>
  );
};

export default CloseProtection;

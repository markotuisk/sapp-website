import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useLocation } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { useState } from 'react';
import ContactFormDialog from '@/components/ui/ContactFormDialog';
import { Animated } from '@/components/ui/AnimatedElements';
import { DebugInfo } from '@/components/debug/DebugInfo';
import CTASection from '@/components/services/venue-security-audits/CTASection';

const VenueSecurityAudits = () => {
  const [contactDialogOpen, setContactDialogOpen] = useState(false);
  const location = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <div className="min-h-screen">
      <Helmet>
        <title>Venue Security Audits | SAPP Security</title>
        <meta 
          name="description" 
          content="Comprehensive venue security assessments for corporate events and executive meetings." 
        />
        <link rel="canonical" href="https://sappsecurity.com/services/venue-security-audits" />
      </Helmet>
      
      <Navbar />
      
      <main>
        {/* Hero Section */}
        <section className="py-16 md:py-24 bg-gradient-to-b from-slate-50 to-white">
          <div className="container mx-auto px-4">
            {/* Navigation buttons */}
            <div className="flex justify-between items-center mb-8">
              <Link to="/event-security#executive-events">
                <Button variant="outline" className="flex items-center gap-2 transition-all duration-300 hover:translate-x-[-5px]">
                  <ArrowLeft className="h-4 w-4" />
                  Back to Event Security
                </Button>
              </Link>
              <Link to="/services/event-monitoring">
                <Button variant="outline" className="flex items-center gap-2 transition-all duration-300 hover:translate-x-[5px]">
                  Next: Event Monitoring
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
            
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-block bg-sapp-blue/10 rounded-full px-4 py-1.5 mb-4">
                <h3 className="text-sm font-medium text-sapp-blue tracking-wider">Event Security</h3>
              </div>
              <h1 className="text-4xl md:text-5xl font-display font-bold text-sapp-dark mb-6">
                Venue Security Audits
              </h1>
              <p className="text-lg text-sapp-gray mb-8 max-w-2xl mx-auto">
                Professional security audits for event venues to ensure baseline security for your sensitive corporate meetings and executive events.
              </p>
              <Button 
                size="lg" 
                className="bg-sapp-blue hover:bg-sapp-blue/90 text-white shadow-lg shadow-sapp-blue/20 hover:scale-105 transition-all duration-200"
                onClick={() => setContactDialogOpen(true)}
              >
                Schedule a Venue Security Audit
              </Button>
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
                  Comprehensive Venue Security Assessment
                </h2>
                <p className="text-sapp-gray max-w-3xl mx-auto">
                  Venues for sensitive and high-profile events typically have weak security. Our security audits ensure that at least minimum security measures are in place to protect your organization's information.
                </p>
              </div>
            </Animated>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              <DebugInfo componentName="SecurityCard-PreAssessment" data={{ cardType: "approach", section: "features" }}>
                <Card className="border-gray-100">
                  <CardHeader>
                    <CardTitle className="text-xl text-sapp-dark">Pre-Assessment Planning</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-sm text-sapp-gray">
                      We develop a tailored assessment plan based on your event's sensitivity, attendee profiles, and specific security concerns.
                    </CardDescription>
                  </CardContent>
                </Card>
              </DebugInfo>
              
              <DebugInfo componentName="SecurityCard-PhysicalEvaluation" data={{ cardType: "approach", section: "features" }}>
                <Card className="border-gray-100">
                  <CardHeader>
                    <CardTitle className="text-xl text-sapp-dark">Physical Security Evaluation</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-sm text-sapp-gray">
                      Our experts perform a thorough inspection of the venue's access points, surveillance capabilities, and potential vulnerabilities.
                    </CardDescription>
                  </CardContent>
                </Card>
              </DebugInfo>
              
              <DebugInfo componentName="SecurityCard-TechnicalSweep" data={{ cardType: "approach", section: "features" }}>
                <Card className="border-gray-100">
                  <CardHeader>
                    <CardTitle className="text-xl text-sapp-dark">Technical Security Sweep</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-sm text-sapp-gray">
                      Using specialized equipment, we detect unauthorized surveillance devices and verify the integrity of meeting spaces.
                    </CardDescription>
                  </CardContent>
                </Card>
              </DebugInfo>
              
              <DebugInfo componentName="SecurityCard-StaffAssessment" data={{ cardType: "approach", section: "features" }}>
                <Card className="border-gray-100">
                  <CardHeader>
                    <CardTitle className="text-xl text-sapp-dark">Staff Security Assessment</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-sm text-sapp-gray">
                      We evaluate venue staff protocols, identify potential insider risks, and establish security-enhancing procedures.
                    </CardDescription>
                  </CardContent>
                </Card>
              </DebugInfo>
            </div>
            
            <div className="mt-12">
              <DebugInfo componentName="SecurityCard-WhyChooseUs" data={{ cardType: "benefits", section: "features" }}>
                <Card className="border-gray-100">
                  <CardHeader>
                    <CardTitle className="text-xl text-sapp-dark">Why Choose Our Venue Security Audits</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <span className="text-sapp-blue mr-2 text-lg leading-none">•</span>
                        <span className="text-sm text-sapp-gray">20+ years of experience securing high-profile events</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-sapp-blue mr-2 text-lg leading-none">•</span>
                        <span className="text-sm text-sapp-gray">Advanced technical surveillance countermeasures</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-sapp-blue mr-2 text-lg leading-none">•</span>
                        <span className="text-sm text-sapp-gray">Discreet professionals with corporate experience</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-sapp-blue mr-2 text-lg leading-none">•</span>
                        <span className="text-sm text-sapp-gray">Customized security plans for each venue</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-sapp-blue mr-2 text-lg leading-none">•</span>
                        <span className="text-sm text-sapp-gray">Comprehensive reporting with actionable insights</span>
                      </li>
                    </ul>
                  </CardContent>
                  <CardFooter className="flex justify-end">
                    <Button 
                      className="bg-sapp-blue hover:bg-sapp-blue/90 text-white"
                      onClick={() => setContactDialogOpen(true)}
                    >
                      Request a Security Audit
                    </Button>
                  </CardFooter>
                </Card>
              </DebugInfo>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <CTASection onRequestAudit={() => setContactDialogOpen(true)} />
        
        {/* Bottom navigation */}
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center py-8 border-t border-gray-100">
            <Link to="/event-security#executive-events">
              <Button variant="outline" className="flex items-center gap-2 transition-all duration-300 hover:translate-x-[-5px]">
                <ArrowLeft className="h-4 w-4" />
                Back to Event Security
              </Button>
            </Link>
            <Link to="/services/event-monitoring">
              <Button variant="outline" className="flex items-center gap-2 transition-all duration-300 hover:translate-x-[5px]">
                Next: Event Monitoring
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
        defaultMessage="I'm interested in learning more about your Venue Security Audit services."
        serviceName="Venue Security Audit"
      />
    </div>
  );
};

export default VenueSecurityAudits;

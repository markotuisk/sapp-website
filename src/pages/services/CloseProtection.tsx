
import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useLocation } from 'react-router-dom';
import { ArrowLeft, Users, Shield, Lock, AlertTriangle } from 'lucide-react';
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
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <div className="min-h-screen">
      <Helmet>
        <title>Close Protection Tailored for Today's Threats | SAPP Security</title>
        <meta 
          name="description" 
          content="Professional close protection services for individuals facing modern threats, from online harassment to physical security concerns. Discreet, personalized protection for you and your family." 
        />
        <link rel="canonical" href="https://sappsecurity.com/services/close-protection" />
      </Helmet>
      
      <Navbar />
      
      <main>
        <section className="py-16 md:py-24 bg-gradient-to-b from-slate-50 to-white">
          <div className="container mx-auto px-4">
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
            
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-block bg-sapp-blue/10 rounded-full px-4 py-1.5 mb-4">
                <h3 className="text-sm font-medium text-sapp-blue tracking-wider">Personal & Executive Protection</h3>
              </div>
              <h1 className="text-4xl md:text-5xl font-display font-bold text-sapp-dark mb-6">
                Close Protection Tailored for Today's Threats
              </h1>
              <p className="text-lg text-sapp-gray mb-8 max-w-2xl mx-auto">
                In a world where a single online comment can spiral into real-world danger, personal safety has never been more crucial—or more complex.
              </p>
              <Button 
                size="lg" 
                className="bg-sapp-blue hover:bg-sapp-blue/90 text-white shadow-lg shadow-sapp-blue/20 hover:scale-105 transition-all duration-200"
                onClick={() => setContactDialogOpen(true)}
              >
                Regain Your Peace of Mind
              </Button>
            </div>
          </div>
        </section>
        
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <Animated animation="fade-up" delay={100}>
              <div className="max-w-3xl mx-auto mb-12">
                <p className="text-sapp-gray text-lg mb-6">
                  Whether you're facing harassment, unwanted attention, or subtle threats to your privacy and well-being, knowing you and your loved ones are secure isn't a luxury—it's a necessity.
                </p>
                <p className="text-sapp-gray text-lg">
                  SAPP Security's Close Protection Services are built for the realities of modern life. We understand that threats today don't always wear obvious faces. They can lurk in a direct message, a viral video, or a silent observer who knows too much. That's why our approach is discreet, adaptive, and deeply personal.
                </p>
              </div>
            </Animated>
            
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-display font-bold text-sapp-dark mb-8 text-center">
                Why Choose Close Protection?
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                <Card className="border-gray-100">
                  <CardHeader>
                    <div className="w-12 h-12 bg-sapp-blue/10 rounded-full flex items-center justify-center mb-4">
                      <Users className="h-5 w-5 text-sapp-blue" />
                    </div>
                    <CardTitle className="text-xl text-sapp-dark">For You and Your Family</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base text-sapp-gray">
                      Safety isn't just about you—it's about ensuring your children, partner, and inner circle are shielded from harm.
                    </CardDescription>
                  </CardContent>
                </Card>
                
                <Card className="border-gray-100">
                  <CardHeader>
                    <div className="w-12 h-12 bg-sapp-blue/10 rounded-full flex items-center justify-center mb-4">
                      <Shield className="h-5 w-5 text-sapp-blue" />
                    </div>
                    <CardTitle className="text-xl text-sapp-dark">Visible or Invisible</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base text-sapp-gray">
                      Our professionals blend into your lifestyle, providing either a visible deterrent or completely covert protection, depending on your needs.
                    </CardDescription>
                  </CardContent>
                </Card>
                
                <Card className="border-gray-100">
                  <CardHeader>
                    <div className="w-12 h-12 bg-sapp-blue/10 rounded-full flex items-center justify-center mb-4">
                      <Lock className="h-5 w-5 text-sapp-blue" />
                    </div>
                    <CardTitle className="text-xl text-sapp-dark">Beyond the Physical</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base text-sapp-gray">
                      Threats often start in the digital realm. Our specialists are trained to manage both physical and cyber risks, giving you full-spectrum peace of mind.
                    </CardDescription>
                  </CardContent>
                </Card>
                
                <Card className="border-gray-100">
                  <CardHeader>
                    <div className="w-12 h-12 bg-sapp-blue/10 rounded-full flex items-center justify-center mb-4">
                      <AlertTriangle className="h-5 w-5 text-sapp-blue" />
                    </div>
                    <CardTitle className="text-xl text-sapp-dark">Personalized Approach</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base text-sapp-gray">
                      We listen. We assess. We act—quietly but decisively. Every operation is tailored, emotionally intelligent, and grounded in respect for your privacy and dignity.
                    </CardDescription>
                  </CardContent>
                </Card>
              </div>
              
              <div className="bg-slate-50 p-8 rounded-xl mb-12">
                <h3 className="text-xl font-display font-semibold text-sapp-dark mb-6">Typical Clients</h3>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <span className="text-sapp-blue mr-2 text-lg leading-none">•</span>
                    <span className="text-base text-sapp-gray">Individuals facing harassment or stalking</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-sapp-blue mr-2 text-lg leading-none">•</span>
                    <span className="text-base text-sapp-gray">Families under media or public scrutiny</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-sapp-blue mr-2 text-lg leading-none">•</span>
                    <span className="text-base text-sapp-gray">Executives and business owners exposed to hostile attention</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-sapp-blue mr-2 text-lg leading-none">•</span>
                    <span className="text-base text-sapp-gray">Private individuals experiencing unexpected threats</span>
                  </li>
                </ul>
              </div>
              
              <div className="text-center mb-8">
                <h3 className="text-2xl font-display font-semibold text-sapp-dark mb-4">Our Promise</h3>
                <p className="text-sapp-gray mb-6">
                  You'll never feel like "just another client" because, to us, protection is personal.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        <section className="py-20 bg-gradient-to-r from-sapp-blue to-blue-600 text-white">
          <div className="container mx-auto px-4 text-center">
            <Animated animation="fade-up" delay={100}>
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
                Ready to Regain Control?
              </h2>
              <p className="max-w-2xl mx-auto mb-8 text-white/90">
                If you've ever felt that gut-wrenching fear when someone crosses the line—or worried about a loved one's safety—we're here to turn uncertainty into reassurance.
              </p>
              <Button 
                variant="outline" 
                size="lg" 
                className="bg-white text-sapp-blue hover:bg-white/90 border-0 shadow-lg hover:scale-105 transition-all duration-200"
                onClick={() => setContactDialogOpen(true)}
              >
                Contact Us Today
              </Button>
            </Animated>
          </div>
        </section>
        
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
        defaultMessage="I'm interested in discussing Close Protection services for a personal situation."
        serviceName="Close Protection"
      />
    </div>
  );
};

export default CloseProtection;

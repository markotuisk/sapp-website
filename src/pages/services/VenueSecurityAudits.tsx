
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, ShieldCheck } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';

const VenueSecurityAudits = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-32 pb-16">
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
          
          {/* Hero */}
          <div className="bg-gradient-to-b from-slate-50 to-white rounded-xl overflow-hidden shadow-md mb-10">
            <div className="relative h-64 md:h-96">
              <img 
                src="/lovable-uploads/fc9a9c2e-5129-4b70-89e2-7617a4e5578a.png" 
                alt="Venue Security Audits" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-8">
                <div className="bg-sapp-blue/90 backdrop-blur-sm w-16 h-16 rounded-lg flex items-center justify-center mb-4 text-white">
                  <ShieldCheck className="h-8 w-8" />
                </div>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-white mb-2">Venue Security Audits</h1>
                <p className="text-white/90 text-lg max-w-2xl">Protecting your most sensitive meetings from physical security threats</p>
              </div>
            </div>
          </div>
          
          {/* Content to be replaced with actual content */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2 space-y-6">
              <h2 className="text-2xl font-display font-semibold text-sapp-dark">Comprehensive Venue Security Assessment</h2>
              <p>Venues for sensitive and high-profile events typically have weak security. This applies especially for public venues such as hotels, conference centers, where security gaps are readily used by bad actors. Security audits the event venue prior to at an event ensure that at least minimum security measures are in place and organisation's information intact and protected.</p>
              
              <h3 className="text-xl font-display font-semibold text-sapp-dark mt-8">Our Venue Security Audit Process</h3>
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                  <h4 className="font-semibold text-sapp-dark mb-2">1. Pre-Assessment Planning</h4>
                  <p className="text-sm text-sapp-gray">We develop a tailored assessment plan based on your event's sensitivity, attendee profiles, and specific security concerns.</p>
                </div>
                
                <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                  <h4 className="font-semibold text-sapp-dark mb-2">2. Physical Security Evaluation</h4>
                  <p className="text-sm text-sapp-gray">Our experts perform a thorough inspection of the venue's access points, surveillance capabilities, and potential vulnerabilities.</p>
                </div>
                
                <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                  <h4 className="font-semibold text-sapp-dark mb-2">3. Technical Security Sweep</h4>
                  <p className="text-sm text-sapp-gray">Using specialized equipment, we detect unauthorized surveillance devices and verify the integrity of meeting spaces.</p>
                </div>
                
                <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                  <h4 className="font-semibold text-sapp-dark mb-2">4. Staff Security Assessment</h4>
                  <p className="text-sm text-sapp-gray">We evaluate venue staff protocols, identify potential insider risks, and establish security-enhancing procedures.</p>
                </div>
                
                <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                  <h4 className="font-semibold text-sapp-dark mb-2">5. Detailed Reporting & Recommendations</h4>
                  <p className="text-sm text-sapp-gray">You receive a comprehensive security report with actionable recommendations to address identified vulnerabilities.</p>
                </div>
              </div>
            </div>
            
            <div className="md:col-span-1">
              <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100 sticky top-24">
                <h3 className="text-xl font-display font-semibold text-sapp-dark mb-4">Why Choose Our Venue Security Audits</h3>
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
                
                <div className="mt-6">
                  <Link to="/event-security">
                    <Button className="w-full bg-sapp-blue hover:bg-sapp-blue/90 text-white transition-all duration-300 hover:scale-105">
                      Request a Security Audit
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          
          {/* Bottom navigation */}
          <div className="flex justify-between items-center mt-12 pt-8 border-t border-gray-100">
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
    </div>
  );
};

export default VenueSecurityAudits;

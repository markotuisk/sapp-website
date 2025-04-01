
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, FileSearch } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';

const SecureTechnology = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-32 pb-16">
        <div className="container mx-auto px-4">
          {/* Navigation buttons */}
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
          
          {/* Hero */}
          <div className="bg-gradient-to-b from-slate-50 to-white rounded-xl overflow-hidden shadow-md mb-10">
            <div className="relative h-64 md:h-96">
              <img 
                src="/lovable-uploads/ccaa80f3-bbe5-46f3-a853-d7007fbff022.png" 
                alt="Secure Technology" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-8">
                <div className="bg-sapp-blue/90 backdrop-blur-sm w-16 h-16 rounded-lg flex items-center justify-center mb-4 text-white">
                  <FileSearch className="h-8 w-8" />
                </div>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-white mb-2">Secure Technology</h1>
                <p className="text-white/90 text-lg max-w-2xl">Protecting your sensitive information with hardened technology solutions</p>
              </div>
            </div>
          </div>
          
          {/* Content */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2 space-y-6">
              <h2 className="text-2xl font-display font-semibold text-sapp-dark">Comprehensive Technology Security Solutions</h2>
              <p>Companies typically use a range of communications technology at most of their sensitive events. From security perspective, this leaves them vulnerable to an array of cyber and espionage attacks. Our Event Security service includes the detailed audit of all technology that is used at a sensitive meeting with recommendations for more secure alternatives.</p>
              
              <h3 className="text-xl font-display font-semibold text-sapp-dark mt-8">Our Secure Technology Process</h3>
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                  <h4 className="font-semibold text-sapp-dark mb-2">1. Technology Assessment</h4>
                  <p className="text-sm text-sapp-gray">We comprehensively evaluate all technologies planned for use at your event, identifying potential security vulnerabilities.</p>
                </div>
                
                <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                  <h4 className="font-semibold text-sapp-dark mb-2">2. Secure Communications Setup</h4>
                  <p className="text-sm text-sapp-gray">Our specialists implement encrypted communications systems for sensitive discussions, protecting against eavesdropping.</p>
                </div>
                
                <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                  <h4 className="font-semibold text-sapp-dark mb-2">3. Network Security Implementation</h4>
                  <p className="text-sm text-sapp-gray">We establish secure, isolated networks for your event, with comprehensive monitoring for intrusion attempts.</p>
                </div>
                
                <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                  <h4 className="font-semibold text-sapp-dark mb-2">4. Device Security Management</h4>
                  <p className="text-sm text-sapp-gray">All devices used during your event undergo security hardening to protect against malware and unauthorized access.</p>
                </div>
                
                <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                  <h4 className="font-semibold text-sapp-dark mb-2">5. Post-Event Security Cleanup</h4>
                  <p className="text-sm text-sapp-gray">After your event, we ensure all sensitive data is securely removed from systems and devices, preventing future leaks.</p>
                </div>
              </div>
            </div>
            
            <div className="md:col-span-1">
              <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100 sticky top-24">
                <h3 className="text-xl font-display font-semibold text-sapp-dark mb-4">Why Choose Our Secure Technology</h3>
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
                
                <div className="mt-6">
                  <Link to="/event-security">
                    <Button className="w-full bg-sapp-blue hover:bg-sapp-blue/90 text-white transition-all duration-300 hover:scale-105">
                      Request Secure Technology
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          
          {/* Bottom navigation */}
          <div className="flex justify-between items-center mt-12 pt-8 border-t border-gray-100">
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
    </div>
  );
};

export default SecureTechnology;

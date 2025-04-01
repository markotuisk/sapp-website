
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Users } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';

const CloseProtection = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-32 pb-16">
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
              <Button variant="outline" className="flex items-center gap-2 transition-all duration-300 hover:translate-x-[5px]">
                Back to Event Security
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
          
          {/* Hero */}
          <div className="bg-gradient-to-b from-slate-50 to-white rounded-xl overflow-hidden shadow-md mb-10">
            <div className="relative h-64 md:h-96">
              <img 
                src="/lovable-uploads/234f523c-dec6-4bb9-8b48-d308fc61a7ec.png" 
                alt="Close Protection" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-8">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-white mb-2">Close Protection</h1>
                <p className="text-white/90 text-lg max-w-2xl">Professional security for high-profile executives and restricted events</p>
              </div>
            </div>
          </div>
          
          {/* Content */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2 space-y-6">
              <h2 className="text-2xl font-display font-semibold text-sapp-dark">Comprehensive Close Protection Services</h2>
              <p>For larger restricted events such as AGMs and for high-profile executives as well as at venues where there is no on-site security, we work with trusted partners to provide professional close protection services. Our discrete security professionals ensure the safety of your executives and the integrity of your event while maintaining a professional atmosphere.</p>
              
              <h3 className="text-xl font-display font-semibold text-sapp-dark mt-8">Our Close Protection Process</h3>
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 transition-all duration-300 hover:shadow-md">
                  <h4 className="font-semibold text-sapp-dark mb-2">1. Risk Assessment</h4>
                  <p className="text-sm text-sapp-gray">We conduct a thorough evaluation of security needs based on event type, location, and attendee profiles.</p>
                </div>
                
                <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 transition-all duration-300 hover:shadow-md">
                  <h4 className="font-semibold text-sapp-dark mb-2">2. Security Planning</h4>
                  <p className="text-sm text-sapp-gray">Our specialists develop a comprehensive protection strategy tailored to your specific requirements.</p>
                </div>
                
                <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 transition-all duration-300 hover:shadow-md">
                  <h4 className="font-semibold text-sapp-dark mb-2">3. Professional Deployment</h4>
                  <p className="text-sm text-sapp-gray">Experienced security personnel are strategically positioned to maintain discreet yet effective protection.</p>
                </div>
                
                <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 transition-all duration-300 hover:shadow-md">
                  <h4 className="font-semibold text-sapp-dark mb-2">4. Coordination with Venue Security</h4>
                  <p className="text-sm text-sapp-gray">We work seamlessly with existing security teams to enhance overall protection without duplication of efforts.</p>
                </div>
                
                <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 transition-all duration-300 hover:shadow-md">
                  <h4 className="font-semibold text-sapp-dark mb-2">5. Incident Response Protocols</h4>
                  <p className="text-sm text-sapp-gray">Clear procedures are established for various security scenarios, ensuring rapid and appropriate response.</p>
                </div>
              </div>
            </div>
            
            <div className="md:col-span-1">
              <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100 sticky top-24">
                <h3 className="text-xl font-display font-semibold text-sapp-dark mb-4">Why Choose Our Close Protection</h3>
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
                
                <div className="mt-6">
                  <Link to="/#contact">
                    <Button className="w-full bg-sapp-blue hover:bg-sapp-blue/90 text-white transition-all duration-300 hover:scale-105">
                      Request Close Protection
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          
          {/* Bottom navigation */}
          <div className="flex justify-between items-center mt-12 pt-8 border-t border-gray-100">
            <Link to="/services/secure-technology">
              <Button variant="outline" className="flex items-center gap-2 transition-all duration-300 hover:translate-x-[-5px]">
                <ArrowLeft className="h-4 w-4" />
                Previous: Secure Technology
              </Button>
            </Link>
            <Link to="/event-security#executive-events">
              <Button variant="outline" className="flex items-center gap-2 transition-all duration-300 hover:translate-x-[5px]">
                Back to Event Security
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

export default CloseProtection;

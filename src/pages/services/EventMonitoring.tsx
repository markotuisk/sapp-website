
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, MonitorCheck } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';

const EventMonitoring = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-32 pb-16">
        <div className="container mx-auto px-4">
          {/* Navigation buttons */}
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
          
          {/* Hero */}
          <div className="bg-gradient-to-b from-slate-50 to-white rounded-xl overflow-hidden shadow-md mb-10">
            <div className="relative h-64 md:h-96">
              <img 
                src="/lovable-uploads/85184084-bca0-497c-8950-601f002a465f.png" 
                alt="Event Monitoring" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-8">
                <div className="bg-sapp-blue/90 backdrop-blur-sm w-16 h-16 rounded-lg flex items-center justify-center mb-4 text-white">
                  <MonitorCheck className="h-8 w-8" />
                </div>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-white mb-2">Event Monitoring</h1>
                <p className="text-white/90 text-lg max-w-2xl">Real-time protection for your sensitive meetings and discussions</p>
              </div>
            </div>
          </div>
          
          {/* Content */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2 space-y-6">
              <h2 className="text-2xl font-display font-semibold text-sapp-dark">Comprehensive Event Monitoring Solutions</h2>
              <p>Live sensitive meetings are usually insufficiently protected against corporate espionage and other information gatherers. Real-time technical and physical monitoring should be a standard business process at any confidential, restricted or sensitive meeting. Event monitoring also includes the incident management service ensuring swift and professional handling of a potentially embarrassing situation avoiding a potential crisis and reputational damage.</p>
              
              <h3 className="text-xl font-display font-semibold text-sapp-dark mt-8">Our Event Monitoring Process</h3>
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                  <h4 className="font-semibold text-sapp-dark mb-2">1. Pre-Event Security Setup</h4>
                  <p className="text-sm text-sapp-gray">We establish comprehensive monitoring systems before your meeting begins, ensuring secure conditions from the start.</p>
                </div>
                
                <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                  <h4 className="font-semibold text-sapp-dark mb-2">2. Technical Surveillance</h4>
                  <p className="text-sm text-sapp-gray">Our specialists use advanced equipment to detect unauthorized recording devices and monitor for electronic intrusions.</p>
                </div>
                
                <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                  <h4 className="font-semibold text-sapp-dark mb-2">3. Physical Security Presence</h4>
                  <p className="text-sm text-sapp-gray">Discreet security personnel maintain vigilance throughout your event, controlling access and monitoring for suspicious activity.</p>
                </div>
                
                <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                  <h4 className="font-semibold text-sapp-dark mb-2">4. Real-Time Threat Response</h4>
                  <p className="text-sm text-sapp-gray">Our team provides immediate intervention for any security concerns, with established protocols for different threat levels.</p>
                </div>
                
                <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                  <h4 className="font-semibold text-sapp-dark mb-2">5. Post-Event Security Review</h4>
                  <p className="text-sm text-sapp-gray">After your event, we provide a comprehensive report detailing any incidents and recommendations for future security improvements.</p>
                </div>
              </div>
            </div>
            
            <div className="md:col-span-1">
              <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100 sticky top-24">
                <h3 className="text-xl font-display font-semibold text-sapp-dark mb-4">Why Choose Our Event Monitoring</h3>
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
                
                <div className="mt-6">
                  <Link to="/event-security">
                    <Button className="w-full bg-sapp-blue hover:bg-sapp-blue/90 text-white transition-all duration-300 hover:scale-105">
                      Request Event Monitoring
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          
          {/* Bottom navigation */}
          <div className="flex justify-between items-center mt-12 pt-8 border-t border-gray-100">
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
    </div>
  );
};

export default EventMonitoring;

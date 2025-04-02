
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Wifi } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';

const SpeechPrivacy = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-32 pb-16">
        <div className="container mx-auto px-4">
          {/* Navigation buttons */}
          <div className="flex justify-between items-center mb-8">
            <Link to="/installations/cctv-access">
              <Button variant="outline" className="flex items-center gap-2 transition-all duration-300 hover:translate-x-[-5px]">
                <ArrowLeft className="h-4 w-4" />
                Back to CCTV & Access
              </Button>
            </Link>
            <Link to="/installations/counter-surveillance">
              <Button variant="outline" className="flex items-center gap-2 transition-all duration-300 hover:translate-x-[5px]">
                Next: Counter-Surveillance
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
          
          {/* Hero */}
          <div className="bg-gradient-to-b from-slate-50 to-white rounded-xl overflow-hidden shadow-md mb-10">
            <div className="relative h-64 md:h-96">
              <img 
                src="/lovable-uploads/85184084-bca0-497c-8950-601f002a465f.png" 
                alt="Speech Privacy & Sound Masking" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-8">
                <div className="bg-sapp-blue/90 backdrop-blur-sm w-16 h-16 rounded-lg flex items-center justify-center mb-4 text-white">
                  <Wifi className="h-8 w-8" />
                </div>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-white mb-2">Speech Privacy & Sound Masking</h1>
                <p className="text-white/90 text-lg max-w-2xl">Protect conversations and reduce acoustic exposure in sensitive or shared environments.</p>
              </div>
            </div>
          </div>
          
          {/* Content */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2 space-y-6">
              <h2 className="text-2xl font-display font-semibold text-sapp-dark">Speech Privacy Solutions for Confidential Environments</h2>
              <p>Acoustic security is often overlooked, but in sensitive environments, spoken conversations can be your most vulnerable information channel. Our speech privacy and sound masking installations create protected acoustic environments where confidential discussions remain confidential.</p>
              
              <h3 className="text-xl font-display font-semibold text-sapp-dark mt-8">Our Speech Privacy Solutions</h3>
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                  <h4 className="font-semibold text-sapp-dark mb-2">Sound Masking Systems</h4>
                  <p className="text-sm text-sapp-gray">We install advanced sound masking technology that makes speech unintelligible beyond designated perimeters while remaining comfortable for occupants.</p>
                </div>
                
                <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                  <h4 className="font-semibold text-sapp-dark mb-2">Smart Privacy Film</h4>
                  <p className="text-sm text-sapp-gray">For glass partitions, windows, and high-sensitivity meeting spaces, our smart privacy film installations provide on-demand visual privacy through electronic control.</p>
                </div>
                
                <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                  <h4 className="font-semibold text-sapp-dark mb-2">Microphone Nullification Technology</h4>
                  <p className="text-sm text-sapp-gray">We deploy specialized systems that prevent electronic eavesdropping by actively countering recording devices in rooms, venues, and secure vehicles.</p>
                </div>
                
                <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                  <h4 className="font-semibold text-sapp-dark mb-2">Acoustic Treatment</h4>
                  <p className="text-sm text-sapp-gray">Our acoustic paneling and treatment solutions enhance speech privacy while improving the overall acoustic quality of sensitive spaces.</p>
                </div>
              </div>
            </div>
            
            <div className="md:col-span-1">
              <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100 sticky top-24">
                <h3 className="text-xl font-display font-semibold text-sapp-dark mb-4">Why Choose Our Speech Privacy Solutions</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="text-sapp-blue mr-2 text-lg leading-none">•</span>
                    <span className="text-sm text-sapp-gray">Protection against both human and electronic eavesdropping</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-sapp-blue mr-2 text-lg leading-none">•</span>
                    <span className="text-sm text-sapp-gray">Customised to your specific architectural environment</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-sapp-blue mr-2 text-lg leading-none">•</span>
                    <span className="text-sm text-sapp-gray">Improves workplace concentration and productivity</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-sapp-blue mr-2 text-lg leading-none">•</span>
                    <span className="text-sm text-sapp-gray">Simple controls and management interfaces</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-sapp-blue mr-2 text-lg leading-none">•</span>
                    <span className="text-sm text-sapp-gray">Supports compliance with data protection requirements</span>
                  </li>
                </ul>
                
                <div className="mt-6">
                  <Link to="/installations">
                    <Button className="w-full bg-sapp-blue hover:bg-sapp-blue/90 text-white transition-all duration-300 hover:scale-105">
                      Request a Consultation
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          
          {/* Bottom navigation */}
          <div className="flex justify-between items-center mt-12 pt-8 border-t border-gray-100">
            <Link to="/installations/cctv-access">
              <Button variant="outline" className="flex items-center gap-2 transition-all duration-300 hover:translate-x-[-5px]">
                <ArrowLeft className="h-4 w-4" />
                Back to CCTV & Access
              </Button>
            </Link>
            <Link to="/installations/counter-surveillance">
              <Button variant="outline" className="flex items-center gap-2 transition-all duration-300 hover:translate-x-[5px]">
                Next: Counter-Surveillance
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

export default SpeechPrivacy;


import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, FileText } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';

const CounterSurveillance = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-32 pb-16">
        <div className="container mx-auto px-4">
          {/* Navigation buttons */}
          <div className="flex justify-between items-center mb-8">
            <Link to="/installations/speech-privacy">
              <Button variant="outline" className="flex items-center gap-2 transition-all duration-300 hover:translate-x-[-5px]">
                <ArrowLeft className="h-4 w-4" />
                Back to Speech Privacy
              </Button>
            </Link>
            <Link to="/installations/network-infrastructure">
              <Button variant="outline" className="flex items-center gap-2 transition-all duration-300 hover:translate-x-[5px]">
                Next: Network Infrastructure
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
          
          {/* Hero */}
          <div className="bg-gradient-to-b from-slate-50 to-white rounded-xl overflow-hidden shadow-md mb-10">
            <div className="relative h-64 md:h-96">
              <img 
                src="/lovable-uploads/85184084-bca0-497c-8950-601f002a465f.png" 
                alt="Counter-Surveillance & RF Monitoring" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-8">
                <div className="bg-sapp-blue/90 backdrop-blur-sm w-16 h-16 rounded-lg flex items-center justify-center mb-4 text-white">
                  <FileText className="h-8 w-8" />
                </div>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-white mb-2">Counter-Surveillance & RF Monitoring</h1>
                <p className="text-white/90 text-lg max-w-2xl">Identify and neutralise unauthorised surveillance activity across acoustic, RF, and electromagnetic vectors.</p>
              </div>
            </div>
          </div>
          
          {/* Content */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2 space-y-6">
              <h2 className="text-2xl font-display font-semibold text-sapp-dark">Counter-Surveillance Protection Against Espionage</h2>
              <p>In today's world of sophisticated surveillance technology, protecting sensitive information requires proactive counter-measures. Our counter-surveillance and RF monitoring installations provide active protection against both casual and targeted attempts to gather your confidential information.</p>
              
              <h3 className="text-xl font-display font-semibold text-sapp-dark mt-8">Our Counter-Surveillance Solutions</h3>
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                  <h4 className="font-semibold text-sapp-dark mb-2">Technical Surveillance Countermeasures</h4>
                  <p className="text-sm text-sapp-gray">Our TSCM installations provide regular or ad-hoc sweeping capabilities to detect unauthorised surveillance devices within your sensitive environments.</p>
                </div>
                
                <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                  <h4 className="font-semibold text-sapp-dark mb-2">RF Spectrum Monitoring</h4>
                  <p className="text-sm text-sapp-gray">We deploy spectrum analysis systems that continuously monitor for suspicious wireless transmissions and alert security personnel to potential threats.</p>
                </div>
                
                <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                  <h4 className="font-semibold text-sapp-dark mb-2">Electromagnetic Detection</h4>
                  <p className="text-sm text-sapp-gray">Our installations can detect both active and passive electromagnetic surveillance technologies that might be used against your organisation.</p>
                </div>
                
                <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                  <h4 className="font-semibold text-sapp-dark mb-2">Protective Monitoring Systems</h4>
                  <p className="text-sm text-sapp-gray">We install permanent counter-surveillance infrastructure that provides continuous detection of unauthorised signals and recording attempts.</p>
                </div>
              </div>
            </div>
            
            <div className="md:col-span-1">
              <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100 sticky top-24">
                <h3 className="text-xl font-display font-semibold text-sapp-dark mb-4">Why Choose Our Counter-Surveillance Solutions</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="text-sapp-blue mr-2 text-lg leading-none">•</span>
                    <span className="text-sm text-sapp-gray">Protection against sophisticated surveillance threats</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-sapp-blue mr-2 text-lg leading-none">•</span>
                    <span className="text-sm text-sapp-gray">Advanced detection of covert listening devices</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-sapp-blue mr-2 text-lg leading-none">•</span>
                    <span className="text-sm text-sapp-gray">Continuous monitoring and alert capabilities</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-sapp-blue mr-2 text-lg leading-none">•</span>
                    <span className="text-sm text-sapp-gray">Tailored to your specific threat profile</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-sapp-blue mr-2 text-lg leading-none">•</span>
                    <span className="text-sm text-sapp-gray">Expert installation by security professionals</span>
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
            <Link to="/installations/speech-privacy">
              <Button variant="outline" className="flex items-center gap-2 transition-all duration-300 hover:translate-x-[-5px]">
                <ArrowLeft className="h-4 w-4" />
                Back to Speech Privacy
              </Button>
            </Link>
            <Link to="/installations/network-infrastructure">
              <Button variant="outline" className="flex items-center gap-2 transition-all duration-300 hover:translate-x-[5px]">
                Next: Network Infrastructure
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

export default CounterSurveillance;

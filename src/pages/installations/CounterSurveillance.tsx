import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Radio, Shield, Scan, FileText } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Animated } from '@/components/ui/AnimatedElements';
import { useDebugContext } from '@/contexts/DebugContext';
import { DebugInfo, DebugToggle } from '@/components/debug';
import QuoteCard from '@/components/ui/QuoteCard';

const CounterSurveillance = () => {
  const { isDebugMode } = useDebugContext();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen">
      <Helmet>
        <title>Counter-Surveillance & RF Monitoring | SAPP Security</title>
        <meta name="description" content="Professional counter-surveillance and RF monitoring solutions for comprehensive security." />
      </Helmet>
      <Navbar />
      <DebugToggle />
      <main className="pt-32 pb-16">
        <div className="container mx-auto px-4">
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
          
          <div className="bg-[#022B3A] rounded-xl p-8 md:p-12 shadow-xl relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-sapp-navy to-transparent opacity-80"></div>
            <div className="absolute top-0 right-0 transform translate-x-1/4 -translate-y-1/4">
              <Shield className="h-64 w-64 text-sapp-blue/10" />
            </div>
            
            <div className="relative z-10 md:max-w-xl">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-white mb-2">Counter-Surveillance & RF Monitoring</h1>
              <p className="text-white/90 text-lg max-w-2xl">Detect and neutralize unauthorized surveillance attempts across all vectors.</p>
            </div>
          </div>
          
          <section className="py-16">
            <div className="text-center mb-12">
              <div className="inline-block bg-sapp-blue/10 rounded-full px-4 py-1.5 mb-4">
                <h3 className="text-sm font-medium text-sapp-blue tracking-wider">Key Features & Benefits</h3>
              </div>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-sapp-dark mb-4">
                Advanced Counter-Surveillance Solutions
              </h2>
              <p className="text-sapp-gray max-w-3xl mx-auto">
                Our counter-surveillance and RF monitoring solutions provide comprehensive protection against espionage and unauthorized surveillance.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="p-6 border border-gray-100 hover:shadow-lg transition-all">
                <Radio className="h-10 w-10 text-sapp-blue mb-4" />
                <h3 className="text-lg font-semibold mb-2">RF Spectrum Monitoring</h3>
                <p className="text-sapp-gray text-sm">Continuous monitoring for suspicious wireless transmissions with real-time alerts.</p>
              </Card>
              
              <Card className="p-6 border border-gray-100 hover:shadow-lg transition-all">
                <Shield className="h-10 w-10 text-sapp-blue mb-4" />
                <h3 className="text-lg font-semibold mb-2">Protective Monitoring</h3>
                <p className="text-sapp-gray text-sm">Permanent infrastructure that provides continuous detection of unauthorized signals.</p>
              </Card>
              
              <Card className="p-6 border border-gray-100 hover:shadow-lg transition-all">
                <Scan className="h-10 w-10 text-sapp-blue mb-4" />
                <h3 className="text-lg font-semibold mb-2">EM Detection</h3>
                <p className="text-sapp-gray text-sm">Detection of both active and passive electromagnetic surveillance technologies.</p>
              </Card>
            </div>
          </section>

          <section className="py-16">
            <QuoteCard
              quote="Modern security threats require comprehensive counter-surveillance measures. Our solutions protect against both traditional and emerging surveillance technologies."
              author="Technical Director"
              position="SAPP Security"
            />
          </section>

          <section className="py-16">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="md:col-span-2 space-y-6">
                <h2 className="text-2xl font-display font-semibold text-sapp-dark">Comprehensive Counter-Surveillance Solutions</h2>
                <p className="text-sapp-gray">Our counter-surveillance and RF monitoring installations deliver integrated, scalable solutions that provide security without obstructing legitimate activities or creating operational friction.</p>
                
                <div className="space-y-4 mt-8">
                  <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                    <h4 className="font-semibold text-sapp-dark mb-2">Technical Surveillance Countermeasures</h4>
                    <p className="text-sm text-sapp-gray">Our TSCM installations provide regular or ad-hoc sweeping capabilities to detect unauthorized surveillance devices within your sensitive environments.</p>
                  </div>
                  
                  <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                    <h4 className="font-semibold text-sapp-dark mb-2">RF Spectrum Monitoring</h4>
                    <p className="text-sm text-sapp-gray">We deploy spectrum analysis systems that continuously monitor for suspicious wireless transmissions and alert security personnel to potential threats.</p>
                  </div>
                  
                  <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                    <h4 className="font-semibold text-sapp-dark mb-2">Electromagnetic Detection</h4>
                    <p className="text-sm text-sapp-gray">Our installations can detect both active and passive electromagnetic surveillance technologies that might be used against your organization.</p>
                  </div>
                </div>
              </div>

              <div className="md:col-span-1">
                <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100 sticky top-24">
                  <h3 className="text-xl font-display font-semibold text-sapp-dark mb-4">Why Choose Our Solutions</h3>
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
                  </ul>
                  
                  <Button className="w-full bg-sapp-blue hover:bg-sapp-blue/90 text-white mt-6">
                    Request Consultation
                  </Button>
                </div>
              </div>
            </div>
          </section>

          <section className="py-8">
            <div className="bg-sapp-dark rounded-xl p-8 md:p-12 shadow-xl relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-sapp-navy to-transparent opacity-80"></div>
              <div className="absolute top-0 right-0 transform translate-x-1/4 -translate-y-1/4">
                <Shield className="h-64 w-64 text-sapp-blue/10" />
              </div>
              
              <div className="relative z-10 md:max-w-xl">
                <h3 className="text-2xl md:text-3xl font-display font-bold text-white mb-4">
                  Enhance Your Security Infrastructure
                </h3>
                <p className="text-gray-300 mb-6">
                  Our comprehensive counter-surveillance and RF monitoring solutions help you protect your assets and information effectively.
                </p>
                <Button className="bg-white text-sapp-dark hover:bg-sapp-blue hover:text-white transition-colors">
                  Get Started Today
                </Button>
              </div>
            </div>
          </section>

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

import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Wifi, Volume2, ShieldOff, Headphones } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Animated } from '@/components/ui/AnimatedElements';
import { useDebugContext } from '@/contexts/DebugContext';
import { DebugInfo, DebugToggle } from '@/components/debug';
import QuoteCard from '@/components/ui/QuoteCard';

const SpeechPrivacy = () => {
  const { isDebugMode } = useDebugContext();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen">
      <Helmet>
        <title>Speech Privacy & Sound Masking | SAPP Security</title>
        <meta name="description" content="Advanced speech privacy and sound masking solutions for secure environments." />
      </Helmet>
      <Navbar />
      <DebugToggle />
      <main className="pt-32 pb-16">
        <div className="container mx-auto px-4">
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
          
          <div className="bg-[#022B3A] rounded-xl p-8 md:p-12 shadow-xl relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-sapp-navy to-transparent opacity-80"></div>
            <div className="absolute top-0 right-0 transform translate-x-1/4 -translate-y-1/4">
              <Volume2 className="h-64 w-64 text-sapp-blue/10" />
            </div>
            
            <div className="relative z-10 md:max-w-xl">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-white mb-2">Speech Privacy & Sound Masking</h1>
              <p className="text-white/90 text-lg max-w-2xl">Protect conversations and secure sensitive discussions with advanced acoustic solutions.</p>
            </div>
          </div>
          
          <section className="py-16">
            <div className="text-center mb-12">
              <div className="inline-block bg-sapp-blue/10 rounded-full px-4 py-1.5 mb-4">
                <h3 className="text-sm font-medium text-sapp-blue tracking-wider">Key Features & Benefits</h3>
              </div>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-sapp-dark mb-4">
                Advanced Speech Privacy Solutions
              </h2>
              <p className="text-sapp-gray max-w-3xl mx-auto">
                Our sound masking and speech privacy solutions ensure confidential conversations remain private while maintaining acoustic comfort.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="p-6 border border-gray-100 hover:shadow-lg transition-all">
                <Volume2 className="h-10 w-10 text-sapp-blue mb-4" />
                <h3 className="text-lg font-semibold mb-2">Sound Masking Technology</h3>
                <p className="text-sapp-gray text-sm">Advanced sound masking that makes speech unintelligible beyond designated perimeters.</p>
              </Card>
              
              <Card className="p-6 border border-gray-100 hover:shadow-lg transition-all">
                <ShieldOff className="h-10 w-10 text-sapp-blue mb-4" />
                <h3 className="text-lg font-semibold mb-2">Anti-Eavesdropping Protection</h3>
                <p className="text-sapp-gray text-sm">Protection against both human and electronic eavesdropping in sensitive environments.</p>
              </Card>
              
              <Card className="p-6 border border-gray-100 hover:shadow-lg transition-all">
                <Headphones className="h-10 w-10 text-sapp-blue mb-4" />
                <h3 className="text-lg font-semibold mb-2">Improved Acoustics</h3>
                <p className="text-sapp-gray text-sm">Enhanced acoustic quality that improves workplace concentration and productivity.</p>
              </Card>
            </div>
          </section>

          <section className="py-16">
            <QuoteCard
              quote="In today's open workspaces, speech privacy isn't just about confidentiality—it's about creating an environment where sensitive discussions can happen naturally and securely."
              author="Acoustics Director"
              position="SAPP Security"
            />
          </section>

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

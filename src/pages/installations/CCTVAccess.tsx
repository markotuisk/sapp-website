import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, MonitorCheck, Shield, Lock, BarChart } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Animated } from '@/components/ui/AnimatedElements';
import { useDebugContext } from '@/contexts/DebugContext';
import { DebugInfo, DebugToggle } from '@/components/debug';
import QuoteCard from '@/components/ui/QuoteCard';

const CCTVAccess = () => {
  const { isDebugMode } = useDebugContext();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen">
      <Helmet>
        <title>CCTV & Access Control Systems | SAPP Security</title>
        <meta name="description" content="Enterprise-grade CCTV and access control systems for comprehensive security solutions." />
      </Helmet>
      <Navbar />
      <DebugToggle />
      <main className="pt-32 pb-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <Link to="/installations">
              <Button variant="outline" className="flex items-center gap-2 transition-all duration-300 hover:translate-x-[-5px]">
                <ArrowLeft className="h-4 w-4" />
                Back to Installations
              </Button>
            </Link>
            <Link to="/installations/speech-privacy">
              <Button variant="outline" className="flex items-center gap-2 transition-all duration-300 hover:translate-x-[5px]">
                Next: Speech Privacy & Sound Masking
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
          
          <div className="bg-[#333333] rounded-xl p-8 md:p-12 shadow-xl relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-sapp-navy to-transparent opacity-80"></div>
            <div className="absolute top-0 right-0 transform translate-x-1/4 -translate-y-1/4">
              <Shield className="h-64 w-64 text-sapp-blue/10" />
            </div>
            
            <div className="relative z-10 md:max-w-xl">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-white mb-2">CCTV, Access & Visitor Systems</h1>
              <p className="text-white/90 text-lg max-w-2xl">Control visibility, movement, and presence — with systems that scale from single sites to global estates.</p>
            </div>
          </div>
          
          <section className="py-16">
            <div className="text-center mb-12">
              <div className="inline-block bg-sapp-blue/10 rounded-full px-4 py-1.5 mb-4">
                <h3 className="text-sm font-medium text-sapp-blue tracking-wider">Key Features & Benefits</h3>
              </div>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-sapp-dark mb-4">
                Comprehensive Security Solutions
              </h2>
              <p className="text-sapp-gray max-w-3xl mx-auto">
                Our CCTV and access control solutions deliver integrated, scalable systems that provide security without compromising operational efficiency.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="p-6 border border-gray-100 hover:shadow-lg transition-all">
                <Shield className="h-10 w-10 text-sapp-blue mb-4" />
                <h3 className="text-lg font-semibold mb-2">Enterprise-Grade Security</h3>
                <p className="text-sapp-gray text-sm">Advanced security systems with simplified management interfaces suitable for organisations of all sizes.</p>
              </Card>
              
              <Card className="p-6 border border-gray-100 hover:shadow-lg transition-all">
                <Lock className="h-10 w-10 text-sapp-blue mb-4" />
                <h3 className="text-lg font-semibold mb-2">Encrypted Access Control</h3>
                <p className="text-sapp-gray text-sm">Skimmer-resistant technology deployable via cloud or local infrastructure, tailored to your security policies.</p>
              </Card>
              
              <Card className="p-6 border border-gray-100 hover:shadow-lg transition-all">
                <BarChart className="h-10 w-10 text-sapp-blue mb-4" />
                <h3 className="text-lg font-semibold mb-2">Analytics & Reporting</h3>
                <p className="text-sapp-gray text-sm">AI-powered analytics that capture critical events while minimising false positives and providing actionable insights.</p>
              </Card>
            </div>
          </section>

          <section className="py-16">
            <QuoteCard
              quote="Modern security demands more than just cameras and card readers. Our integrated CCTV and access control solutions provide comprehensive protection while maintaining operational efficiency."
              author="Technical Director"
              position="SAPP Security"
            />
          </section>

          <section className="py-16">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="md:col-span-2 space-y-6">
                <h2 className="text-2xl font-display font-semibold text-sapp-dark">Comprehensive Security Solutions</h2>
                <p className="text-sapp-gray">Our CCTV, access control and visitor management installations deliver integrated, scalable solutions that provide security without obstructing legitimate movement or creating operational friction.</p>
                
                <div className="space-y-4 mt-8">
                  <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                    <h4 className="font-semibold text-sapp-dark mb-2">AI-Powered CCTV Systems</h4>
                    <p className="text-sm text-sapp-gray">From cloud-based surveillance with advanced analytics to modest, localised deployments, we install camera systems that capture critical events while minimising false positives.</p>
                  </div>
                  
                  <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                    <h4 className="font-semibold text-sapp-dark mb-2">Encrypted Access Control</h4>
                    <p className="text-sm text-sapp-gray">Our access solutions use encrypted, skimmer-resistant technology deployable via cloud or local infrastructure, tailored to site-specific operational requirements and security policies.</p>
                  </div>
                  
                  <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                    <h4 className="font-semibold text-sapp-dark mb-2">Integration & Automation</h4>
                    <p className="text-sm text-sapp-gray">Connect your physical security systems to your wider operational environment with API-driven integrations that enhance control, reporting and emergency response.</p>
                  </div>
                </div>
              </div>

              <div className="md:col-span-1">
                <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100 sticky top-24">
                  <h3 className="text-xl font-display font-semibold text-sapp-dark mb-4">Why Choose Our Solutions</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <span className="text-sapp-blue mr-2 text-lg leading-none">•</span>
                      <span className="text-sm text-sapp-gray">Enterprise-grade security with simplified management</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-sapp-blue mr-2 text-lg leading-none">•</span>
                      <span className="text-sm text-sapp-gray">Scalable from single site to global deployments</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-sapp-blue mr-2 text-lg leading-none">•</span>
                      <span className="text-sm text-sapp-gray">Cloud, hybrid or on-premise architecture options</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-sapp-blue mr-2 text-lg leading-none">•</span>
                      <span className="text-sm text-sapp-gray">Advanced integration capabilities</span>
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
                  Our comprehensive CCTV and access control solutions help you protect your assets and people effectively.
                </p>
                <Button className="bg-white text-sapp-dark hover:bg-sapp-blue hover:text-white transition-colors">
                  Get Started Today
                </Button>
              </div>
            </div>
          </section>

          <div className="flex justify-between items-center mt-12 pt-8 border-t border-gray-100">
            <Link to="/installations">
              <Button variant="outline" className="flex items-center gap-2 transition-all duration-300 hover:translate-x-[-5px]">
                <ArrowLeft className="h-4 w-4" />
                Back to Installations
              </Button>
            </Link>
            <Link to="/installations/speech-privacy">
              <Button variant="outline" className="flex items-center gap-2 transition-all duration-300 hover:translate-x-[5px]">
                Next: Speech Privacy & Sound Masking
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

export default CCTVAccess;

import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useLocation } from 'react-router-dom';
import { ArrowLeft, ArrowRight, MonitorCheck, Shield, Lock, BarChart } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Animated } from '@/components/ui/AnimatedElements';
import { DebugInfo } from '@/utils/debugTools';

const CCTVAccess = () => {
  useEffect(() => {
    // Scroll to the top when component mounts
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen">
      <Helmet>
        <title>CCTV & Access Control Systems | SAPP Security</title>
        <meta name="description" content="Enterprise-grade CCTV and access control systems for comprehensive security solutions." />
      </Helmet>
      <Navbar />
      <main className="pt-32 pb-16">
        <div className="container mx-auto px-4">
          {/* Navigation buttons */}
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
          
          {/* Hero Section */}
          <DebugInfo
            componentName="CCTVHeroCard"
            data={{
              section: 'Hero',
              backgroundColor: 'gradient-to-b from-slate-50 to-white',
              dimensions: { height: '64px md:96px' },
              imageUrl: '/lovable-uploads/85184084-bca0-497c-8950-601f002a465f.png'
            }}
          >
            <div className="bg-gradient-to-b from-white to-slate-50 rounded-xl overflow-hidden shadow-md mb-10">
              <div className="relative h-64 md:h-96">
                <img 
                  src="/lovable-uploads/85184084-bca0-497c-8950-601f002a465f.png" 
                  alt="CCTV & Access Control Systems" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-8">
                  <div className="bg-sapp-blue/90 backdrop-blur-sm w-16 h-16 rounded-lg flex items-center justify-center mb-4 text-white">
                    <MonitorCheck className="h-8 w-8" />
                  </div>
                  <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-white mb-2">CCTV, Access & Visitor Systems</h1>
                  <p className="text-white/90 text-lg max-w-2xl">Control visibility, movement, and presence — with systems that scale from single sites to global estates.</p>
                </div>
              </div>
            </div>
          </DebugInfo>
          
          {/* Feature Cards */}
          <Animated animation="fade-up" delay={100}>
            <h2 className="text-2xl font-display font-semibold text-sapp-dark mb-6">Key Features & Benefits</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
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
          </Animated>
          
          {/* Content */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2 space-y-6">
              <h2 className="text-2xl font-display font-semibold text-sapp-dark">Comprehensive Security Visibility and Access Control</h2>
              <p>Modern security demands more than just cameras and card readers. Our CCTV, access control and visitor management installations deliver integrated, scalable solutions that provide security without obstructing legitimate movement or creating operational friction.</p>
              
              <h3 className="text-xl font-display font-semibold text-sapp-dark mt-8">Our CCTV & Access Control Solutions</h3>
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                  <h4 className="font-semibold text-sapp-dark mb-2">AI-Powered CCTV Systems</h4>
                  <p className="text-sm text-sapp-gray">From cloud-based surveillance with advanced analytics to modest, localised deployments, we install camera systems that capture critical events while minimising false positives.</p>
                </div>
                
                <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                  <h4 className="font-semibold text-sapp-dark mb-2">Encrypted Access Control</h4>
                  <p className="text-sm text-sapp-gray">Our access solutions use encrypted, skimmer-resistant technology deployable via cloud or local infrastructure, tailored to site-specific operational requirements and security policies.</p>
                </div>
                
                <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                  <h4 className="font-semibold text-sapp-dark mb-2">Visitor Management Systems</h4>
                  <p className="text-sm text-sapp-gray">Create structured, secure visitor experiences with standalone or physically integrated systems that improve security, compliance and operational efficiency.</p>
                </div>
                
                <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                  <h4 className="font-semibold text-sapp-dark mb-2">Integration & Automation</h4>
                  <p className="text-sm text-sapp-gray">Connect your physical security systems to your wider operational environment with API-driven integrations that enhance control, reporting and emergency response.</p>
                </div>
              </div>
            </div>
            
            <div className="md:col-span-1">
              <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100 sticky top-24">
                <h3 className="text-xl font-display font-semibold text-sapp-dark mb-4">Why Choose Our CCTV & Access Solutions</h3>
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
                    <span className="text-sm text-sapp-gray">Advanced integration with existing business systems</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-sapp-blue mr-2 text-lg leading-none">•</span>
                    <span className="text-sm text-sapp-gray">Comprehensive training and ongoing support</span>
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

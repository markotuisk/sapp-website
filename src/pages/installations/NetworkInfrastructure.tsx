import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Server, Network, Database, Users } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Animated } from '@/components/ui/AnimatedElements';
import { useDebugContext } from '@/contexts/DebugContext';
import { DebugInfo, DebugToggle } from '@/components/debug';
import QuoteCard from '@/components/ui/QuoteCard';

const NetworkInfrastructure = () => {
  const { isDebugMode } = useDebugContext();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen">
      <Helmet>
        <title>Network Infrastructure & Communication | SAPP Security</title>
        <meta name="description" content="Enterprise-grade network infrastructure and communication solutions for secure environments." />
      </Helmet>
      <Navbar />
      <DebugToggle />
      <main className="pt-32 pb-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <Link to="/installations/counter-surveillance">
              <Button variant="outline" className="flex items-center gap-2 transition-all duration-300 hover:translate-x-[-5px]">
                <ArrowLeft className="h-4 w-4" />
                Back to Counter-Surveillance
              </Button>
            </Link>
            <Link to="/installations">
              <Button variant="outline" className="flex items-center gap-2 transition-all duration-300 hover:translate-x-[5px]">
                Back to All Installations
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
          
          <div className="bg-[#022B3A] rounded-xl p-8 md:p-12 shadow-xl relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-sapp-navy to-transparent opacity-80"></div>
            <div className="absolute top-0 right-0 transform translate-x-1/4 -translate-y-1/4">
              <Network className="h-64 w-64 text-sapp-blue/10" />
            </div>
            
            <div className="relative z-10 md:max-w-xl">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-white mb-2">Network Infrastructure & Communication</h1>
              <p className="text-white/90 text-lg max-w-2xl">Build secure foundations for your organization's communication and control systems.</p>
            </div>
          </div>
          
          <section className="py-16">
            <div className="text-center mb-12">
              <div className="inline-block bg-sapp-blue/10 rounded-full px-4 py-1.5 mb-4">
                <h3 className="text-sm font-medium text-sapp-blue tracking-wider">Key Features & Benefits</h3>
              </div>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-sapp-dark mb-4">
                Advanced Network Solutions
              </h2>
              <p className="text-sapp-gray max-w-3xl mx-auto">
                Our network infrastructure solutions provide secure, resilient foundations for your security operations and critical communications.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="p-6 border border-gray-100 hover:shadow-lg transition-all">
                <Server className="h-10 w-10 text-sapp-blue mb-4" />
                <h3 className="text-lg font-semibold mb-2">Secure Infrastructure</h3>
                <p className="text-sapp-gray text-sm">Advanced network architecture designed for maximum security and reliability.</p>
              </Card>
              
              <Card className="p-6 border border-gray-100 hover:shadow-lg transition-all">
                <Network className="h-10 w-10 text-sapp-blue mb-4" />
                <h3 className="text-lg font-semibold mb-2">System Integration</h3>
                <p className="text-sapp-gray text-sm">Seamless integration between security systems for comprehensive protection.</p>
              </Card>
              
              <Card className="p-6 border border-gray-100 hover:shadow-lg transition-all">
                <Database className="h-10 w-10 text-sapp-blue mb-4" />
                <h3 className="text-lg font-semibold mb-2">Redundant Systems</h3>
                <p className="text-sapp-gray text-sm">Failover and backup systems ensuring continuous operation of critical infrastructure.</p>
              </Card>
            </div>
          </section>
          
          <section className="py-16">
            <QuoteCard
              quote="A robust and secure network infrastructure is the foundation of modern security systems. Our solutions ensure reliability while maintaining the highest security standards."
              author="Infrastructure Director"
              position="SAPP Security"
            />
          </section>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2 space-y-6">
              <h2 className="text-2xl font-display font-semibold text-sapp-dark">Secure Network Foundations</h2>
              <p className="text-sapp-gray">Our network infrastructure solutions create hardened foundations for your security operations, ensuring continuity, integrity and availability across all operational environments.</p>
              
              <div className="space-y-4 mt-8">
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                  <h4 className="font-semibold text-sapp-dark mb-2">Secure Network Architecture</h4>
                  <p className="text-sm text-sapp-gray">We design and implement hardened network infrastructures that protect against both digital and physical threats while supporting operational requirements.</p>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                  <h4 className="font-semibold text-sapp-dark mb-2">Custom System Integration</h4>
                  <p className="text-sm text-sapp-gray">Our team creates software and sensor-based solutions for task automation and integration, connecting your security systems into a cohesive whole.</p>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                  <h4 className="font-semibold text-sapp-dark mb-2">Secure Communication Systems</h4>
                  <p className="text-sm text-sapp-gray">We deploy encrypted, reliable communication systems for sensitive environments where standard channels might be compromised.</p>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                  <h4 className="font-semibold text-sapp-dark mb-2">Redundant Systems</h4>
                  <p className="text-sm text-sapp-gray">Our installations include failover and backup systems to ensure continuous operation of critical security infrastructure during disruptions.</p>
                </div>
              </div>
            </div>
            
            <div className="md:col-span-1">
              <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100 sticky top-24">
                <h3 className="text-xl font-display font-semibold text-sapp-dark mb-4">Why Choose Our Solutions</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="text-sapp-blue mr-2 text-lg leading-none">•</span>
                    <span className="text-sm text-sapp-gray">Built-in security from the foundation up</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-sapp-blue mr-2 text-lg leading-none">•</span>
                    <span className="text-sm text-sapp-gray">Seamless integration capabilities</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-sapp-blue mr-2 text-lg leading-none">•</span>
                    <span className="text-sm text-sapp-gray">Designed for scalability and expansion</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-sapp-blue mr-2 text-lg leading-none">•</span>
                    <span className="text-sm text-sapp-gray">Advanced monitoring and analytics</span>
                  </li>
                </ul>
                
                <Button className="w-full bg-sapp-blue hover:bg-sapp-blue/90 text-white mt-6 transition-all duration-300 hover:scale-105">
                  Request Consultation
                </Button>
              </div>
            </div>
          </div>
          
          <section className="py-8">
            <div className="bg-sapp-dark rounded-xl p-8 md:p-12 shadow-xl relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-sapp-navy to-transparent opacity-80"></div>
              <div className="absolute top-0 right-0 transform translate-x-1/4 -translate-y-1/4">
                <Network className="h-64 w-64 text-sapp-blue/10" />
              </div>
              
              <div className="relative z-10 md:max-w-xl">
                <h3 className="text-2xl md:text-3xl font-display font-bold text-white mb-4">
                  Enhance Your Network Security
                </h3>
                <p className="text-gray-300 mb-6">
                  Our comprehensive network infrastructure solutions help protect your critical systems and communications.
                </p>
                <Button className="bg-white text-sapp-dark hover:bg-sapp-blue hover:text-white transition-colors">
                  Get Started Today
                </Button>
              </div>
            </div>
          </section>
          
          <div className="flex justify-between items-center mt-12 pt-8 border-t border-gray-100">
            <Link to="/installations/counter-surveillance">
              <Button variant="outline" className="flex items-center gap-2 transition-all duration-300 hover:translate-x-[-5px]">
                <ArrowLeft className="h-4 w-4" />
                Back to Counter-Surveillance
              </Button>
            </Link>
            <Link to="/installations">
              <Button variant="outline" className="flex items-center gap-2 transition-all duration-300 hover:translate-x-[5px]">
                Back to All Installations
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

export default NetworkInfrastructure;

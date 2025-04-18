import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import QuoteCard from '@/components/ui/QuoteCard';
import { useState } from 'react';
import ContactFormDialog from '@/components/ui/ContactFormDialog';
import FeatureCard from '@/components/ui/FeatureCard';
import { Link, useLocation } from 'react-router-dom';
import { useComponentLogger, useDebugContext, DebugInfo } from '@/utils/debugTools';

const PhysicalSecurityAssessments = () => {
  const [contactDialogOpen, setContactDialogOpen] = useState(false);
  const location = useLocation();
  const { logEvent } = useComponentLogger('PhysicalSecurityAssessments');
  const { isDebugMode } = useDebugContext();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  const content = (
    <div className="min-h-screen">
      <Helmet>
        <title>Physical Security Assessments | SAPP Security</title>
        <meta 
          name="description" 
          content="Comprehensive physical security assessments to identify vulnerabilities and strengthen your organization's security posture." 
        />
        <link rel="canonical" href="https://sappsecurity.com/services/physical-security-assessments" />
      </Helmet>
      
      <Navbar />
      
      <main>
        <section className="py-16 md:py-24 bg-gradient-to-b from-slate-50 to-white relative">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center mb-8">
              <Link to="/security-audits">
                <Button variant="outline" className="flex items-center gap-2 transition-all duration-300 hover:translate-x-[-5px]">
                  <ArrowLeft className="h-4 w-4" />
                  Back to Security Audits
                </Button>
              </Link>
              <Link to="/services/tscm-inspections">
                <Button variant="outline" className="flex items-center gap-2 transition-all duration-300 hover:translate-x-[5px]">
                  Next: TSCM Inspections
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
            
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-block bg-sapp-blue/10 rounded-full px-4 py-1.5 mb-4">
                <h3 className="text-sm font-medium text-sapp-blue tracking-wider">Security Assessment</h3>
              </div>
              <h1 className="text-4xl md:text-5xl font-display font-bold text-sapp-dark mb-6">
                Physical Security Assessments
              </h1>
              <p className="text-lg text-sapp-gray mb-8 max-w-2xl mx-auto">
                Comprehensive evaluation of your organization's physical security measures to identify vulnerabilities and strengthen your security posture against potential threats.
              </p>
              <Button 
                size="lg" 
                className="bg-sapp-blue hover:bg-sapp-blue/90 text-white shadow-lg shadow-sapp-blue/20 hover:scale-105 transition-all duration-200"
                onClick={() => setContactDialogOpen(true)}
              >
                Request an Assessment
              </Button>
            </div>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <div className="inline-block bg-sapp-blue/10 rounded-full px-4 py-1.5 mb-4">
                <h3 className="text-sm font-medium text-sapp-blue tracking-wider">Our Approach</h3>
              </div>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-sapp-dark mb-6">
                Comprehensive Security Evaluation
              </h2>
              <p className="text-sapp-gray max-w-3xl mx-auto">
                Our physical security assessments provide a thorough evaluation of your organization's security infrastructure, identifying vulnerabilities and recommending solutions.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              <div className="flex flex-col">
                <div className="bg-white rounded-xl shadow-md p-6 flex items-start gap-4 h-full">
                  <Shield className="text-sapp-blue h-6 w-6 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-sapp-dark mb-2">Threat Assessment</h3>
                    <p className="text-sm text-sapp-gray">Comprehensive analysis of potential threats specific to your organization and environment.</p>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col">
                <div className="bg-white rounded-xl shadow-md p-6 flex items-start gap-4 h-full">
                  <Lock className="text-sapp-blue h-6 w-6 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-sapp-dark mb-2">Access Control Evaluation</h3>
                    <p className="text-sm text-sapp-gray">Assessment of current access control systems and identification of potential security breaches.</p>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col">
                <div className="bg-white rounded-xl shadow-md p-6 flex items-start gap-4 h-full">
                  <Search className="text-sapp-blue h-6 w-6 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-sapp-dark mb-2">Vulnerability Detection</h3>
                    <p className="text-sm text-sapp-gray">Identification of physical security vulnerabilities through comprehensive examination of premises.</p>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col">
                <div className="bg-white rounded-xl shadow-md p-6 flex items-start gap-4 h-full">
                  <FileCheck className="text-sapp-blue h-6 w-6 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-sapp-dark mb-2">Detailed Reporting</h3>
                    <p className="text-sm text-sapp-gray">Comprehensive reports with actionable recommendations to improve security posture.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-12">
              <FeatureCard
                title="Our Physical Security Assessment Services"
                features={[
                  "Comprehensive site security surveys",
                  "Access control system evaluation",
                  "Surveillance system assessment",
                  "Alarm system testing",
                  "Security personnel procedures review",
                  "Physical barrier assessment",
                  "Security lighting evaluation",
                  "Emergency response planning",
                  "Penetration testing",
                  "Critical infrastructure protection",
                  "Executive protection assessments",
                  "Security policy development"
                ]}
              />
            </div>
          </div>
        </section>
        
        <section className="py-16 bg-slate-50">
          <div className="container mx-auto px-6">
            <QuoteCard
              quote="Physical security assessments are the foundation of any comprehensive security program. Without understanding your current vulnerabilities, it's impossible to build an effective security strategy that protects your most valuable assets."
              author="Marko Tuisk"
              position="SAPP Founder and Technical Director"
            />
          </div>
        </section>
        
        <section className="py-8">
          <div className="container mx-auto px-4">
            <div className="bg-sapp-dark rounded-xl p-8 md:p-12 shadow-xl relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-sapp-navy to-transparent opacity-80"></div>
              <div className="absolute top-0 right-0 transform translate-x-1/4 -translate-y-1/4">
                <Shield className="h-64 w-64 text-sapp-blue/10" />
              </div>
              
              <div className="relative z-10 md:max-w-xl">
                <h3 className="text-2xl md:text-3xl font-display font-bold text-white mb-4">
                  Identify Security Vulnerabilities
                </h3>
                <p className="text-gray-300 mb-6">
                  Our comprehensive security assessments help you identify and address vulnerabilities before they can be exploited.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button 
                    className="bg-white text-sapp-dark hover:bg-sapp-blue hover:text-white transition-colors"
                    onClick={() => setContactDialogOpen(true)}
                  >
                    Request Assessment
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center py-8 border-t border-gray-100">
            <Link to="/security-audits">
              <Button variant="outline" className="flex items-center gap-2 transition-all duration-300 hover:translate-x-[-5px]">
                <ArrowLeft className="h-4 w-4" />
                Back to Security Audits
              </Button>
            </Link>
            <Link to="/services/tscm-inspections">
              <Button variant="outline" className="flex items-center gap-2 transition-all duration-300 hover:translate-x-[5px]">
                Next: TSCM Inspections
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </main>
      
      <Footer />
      
      <ContactFormDialog 
        open={contactDialogOpen}
        onOpenChange={setContactDialogOpen}
        defaultMessage="I'm interested in learning more about your Physical Security Assessment services."
        serviceName="Physical Security Assessment"
      />
    </div>
  );

  if (isDebugMode && process.env.NODE_ENV === 'development') {
    return (
      <DebugInfo 
        componentName="PhysicalSecurityAssessments"
        data={{
          route: "/services/physical-security-assessments",
          sections: ['Hero', 'Features', 'Quote', 'CTA'],
          animations: ['fade-up', 'scale-in', 'slide-in'],
        }}
      >
        {content}
      </DebugInfo>
    );
  }

  return content;
};

export default PhysicalSecurityAssessments;

import { Shield, Lock, Search, FileCheck } from 'lucide-react';

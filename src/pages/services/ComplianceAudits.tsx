import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { ClipboardCheck, FileCheck, CheckSquare, Briefcase } from 'lucide-react';
import { Animated } from '@/components/ui/AnimatedElements';
import QuoteCard from '@/components/ui/QuoteCard';
import { useState } from 'react';
import ContactFormDialog from '@/components/ui/ContactFormDialog';
import FeatureCard from '@/components/ui/FeatureCard';
import { Link, useLocation } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import ImageDebugInfo from '@/components/ui/ImageDebugInfo';

const ComplianceAudits = () => {
  const [contactDialogOpen, setContactDialogOpen] = useState(false);
  const location = useLocation();
  const isDebugMode = process.env.NODE_ENV === 'development';

  useEffect(() => {
    // Scroll to the top when component mounts or location changes
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <div className="min-h-screen">
      <Helmet>
        <title>Compliance Audits | SAPP Security</title>
        <meta 
          name="description" 
          content="ISO27001 certified compliance audits to measure your organization's adherence to industry standards and international regulations." 
        />
        <link rel="canonical" href="https://sappsecurity.com/services/compliance-audits" />
      </Helmet>
      
      <Navbar />
      
      <main>
        {/* Hero Section */}
        <section className="py-16 md:py-24 bg-gradient-to-b from-slate-50 to-white">
          <div className="container mx-auto px-4">
            {/* Navigation buttons */}
            <div className="flex justify-between items-center mb-8">
              <Link to="/services/tscm-inspections">
                <Button variant="outline" className="flex items-center gap-2 transition-all duration-300 hover:translate-x-[-5px]">
                  <ArrowLeft className="h-4 w-4" />
                  Back to TSCM Inspections
                </Button>
              </Link>
              <Link to="/services/technology-systems-testing">
                <Button variant="outline" className="flex items-center gap-2 transition-all duration-300 hover:translate-x-[5px]">
                  Next: Technology & Systems Testing
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
            
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 mb-10 md:mb-0">
                <div className="inline-block bg-sapp-blue/10 rounded-full px-4 py-1.5 mb-4">
                  <h3 className="text-sm font-medium text-sapp-blue tracking-wider">ISO27001 Certified</h3>
                </div>
                <h1 className="text-4xl md:text-5xl font-display font-bold text-sapp-dark mb-6">
                  Compliance Audits
                </h1>
                <p className="text-lg text-sapp-gray mb-8 max-w-2xl">
                  ISO27001 certified audits that measure your organization's compliance with industry standards and international regulations to ensure security and regulatory conformity.
                </p>
                <Button 
                  size="lg" 
                  className="bg-sapp-blue hover:bg-sapp-blue/90 text-white shadow-lg shadow-sapp-blue/20 hover:scale-105 transition-all duration-200"
                  onClick={() => setContactDialogOpen(true)}
                >
                  Schedule a Compliance Audit
                </Button>
              </div>
              <div className="md:w-1/2 relative">
                <div className="w-[684px] h-[380px] flex items-center justify-center">
                  {isDebugMode && (
                    <ImageDebugInfo
                      src="/lovable-uploads/8d818889-c5eb-43f6-8a63-3b0310802bdd.png"
                      dimensions={{ width: 380, height: 380 }}
                      aspectRatio={1}
                    />
                  )}
                  <img 
                    src="/lovable-uploads/8d818889-c5eb-43f6-8a63-3b0310802bdd.png" 
                    alt="Compliance Audit" 
                    className="w-[380px] h-[380px] object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Features Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <Animated animation="fade-up" delay={100}>
              <div className="text-center mb-12">
                <div className="inline-block bg-sapp-blue/10 rounded-full px-4 py-1.5 mb-4">
                  <h3 className="text-sm font-medium text-sapp-blue tracking-wider">Our Approach</h3>
                </div>
                <h2 className="text-3xl md:text-4xl font-display font-bold text-sapp-dark mb-6">
                  Comprehensive Compliance Solutions
                </h2>
                <p className="text-sapp-gray max-w-3xl mx-auto">
                  Our compliance audit services ensure your organization meets international standards and regulatory requirements through rigorous assessment and guidance.
                </p>
              </div>
            </Animated>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              <Animated animation="fade-up" delay={150} className="flex flex-col">
                <div className="bg-white rounded-xl shadow-md p-6 flex items-start gap-4 h-full">
                  <ClipboardCheck className="text-sapp-blue h-6 w-6 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-sapp-dark mb-2">Gap Analysis</h3>
                    <p className="text-sm text-sapp-gray">Identification of differences between current practices and compliance requirements.</p>
                  </div>
                </div>
              </Animated>
              
              <Animated animation="fade-up" delay={200} className="flex flex-col">
                <div className="bg-white rounded-xl shadow-md p-6 flex items-start gap-4 h-full">
                  <FileCheck className="text-sapp-blue h-6 w-6 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-sapp-dark mb-2">Documentation Review</h3>
                    <p className="text-sm text-sapp-gray">Thorough examination of policies, procedures, and security documentation.</p>
                  </div>
                </div>
              </Animated>
              
              <Animated animation="fade-up" delay={250} className="flex flex-col">
                <div className="bg-white rounded-xl shadow-md p-6 flex items-start gap-4 h-full">
                  <CheckSquare className="text-sapp-blue h-6 w-6 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-sapp-dark mb-2">Compliance Assessment</h3>
                    <p className="text-sm text-sapp-gray">Evaluation of security controls against relevant standards and regulations.</p>
                  </div>
                </div>
              </Animated>
              
              <Animated animation="fade-up" delay={300} className="flex flex-col">
                <div className="bg-white rounded-xl shadow-md p-6 flex items-start gap-4 h-full">
                  <Briefcase className="text-sapp-blue h-6 w-6 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-sapp-dark mb-2">Remediation Planning</h3>
                    <p className="text-sm text-sapp-gray">Development of action plans to address compliance gaps and vulnerabilities.</p>
                  </div>
                </div>
              </Animated>
            </div>
            
            <div className="mt-12">
              <FeatureCard
                title="Our Compliance Audit Services"
                features={[
                  "ISO 27001 compliance audits",
                  "GDPR compliance assessments",
                  "PCI DSS certification support",
                  "NIST framework alignment",
                  "Regulatory compliance verification",
                  "Industry-specific requirement analysis",
                  "Security policy review and development",
                  "Risk assessment and management",
                  "Compliance documentation assistance",
                  "Security awareness training",
                  "Remediation guidance and support",
                  "Continuous compliance monitoring"
                ]}
              />
            </div>
          </div>
        </section>
        
        {/* Quote Section */}
        <section className="py-16 bg-slate-50">
          <div className="container mx-auto px-6">
            <QuoteCard
              quote="In today's complex regulatory environment, compliance isn't optional—it's essential. Organizations that view compliance as merely a checkbox exercise miss the opportunity to strengthen their security posture and build stakeholder trust. A comprehensive compliance audit provides not just certification, but genuine security improvement."
              author="Marko Tuisk"
              position="SAPP Founder and Technical Director"
            />
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-sapp-blue to-blue-600 text-white">
          <div className="container mx-auto px-4 text-center">
            <Animated animation="fade-up" delay={100}>
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
                Ensure Your Regulatory Compliance
              </h2>
              <p className="max-w-2xl mx-auto mb-8 text-white/90">
                Contact our team to schedule a comprehensive compliance audit for your organization.
              </p>
              <Button 
                variant="outline" 
                size="lg" 
                className="bg-white text-sapp-blue hover:bg-white/90 border-0 shadow-lg hover:scale-105 transition-all duration-200"
                onClick={() => setContactDialogOpen(true)}
              >
                Request a Compliance Audit
              </Button>
            </Animated>
          </div>
        </section>
        
        {/* Bottom navigation */}
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center py-8 border-t border-gray-100">
            <Link to="/services/tscm-inspections">
              <Button variant="outline" className="flex items-center gap-2 transition-all duration-300 hover:translate-x-[-5px]">
                <ArrowLeft className="h-4 w-4" />
                Back to TSCM Inspections
              </Button>
            </Link>
            <Link to="/services/technology-systems-testing">
              <Button variant="outline" className="flex items-center gap-2 transition-all duration-300 hover:translate-x-[5px]">
                Next: Technology & Systems Testing
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
        defaultMessage="I'm interested in learning more about your Compliance Audit services."
        serviceName="Compliance Audit"
      />
    </div>
  );
};

export default ComplianceAudits;

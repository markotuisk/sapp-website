
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { AcronymsResource } from '@/components/resources/AcronymsResource';

const Acronyms = () => {
  return (
    <>
      <Helmet>
        <title>Security Acronyms Dictionary - SAPP Security</title>
        <meta name="description" content="Comprehensive security acronyms dictionary covering technical security terms, TSCM, cyber security, and physical security terminology." />
        <meta name="keywords" content="security acronyms, TSCM acronyms, cyber security terms, physical security terminology" />
      </Helmet>
      
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <Navbar />
        
        <main className="pt-20">
          <div className="container mx-auto px-4 py-12">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Security Acronyms Dictionary
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Your comprehensive guide to security terminology, technical acronyms, 
                and industry-specific language used in cyber security, TSCM, and physical security.
              </p>
            </div>
            
            <AcronymsResource />
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Acronyms;

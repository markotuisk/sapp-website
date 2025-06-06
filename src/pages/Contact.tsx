
import React from 'react';
import { Helmet } from 'react-helmet-async';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const Contact = () => {
  return (
    <>
      <Helmet>
        <title>Contact - SAPP Security</title>
        <meta name="description" content="Get in touch with SAPP Security for professional security services and consultation." />
      </Helmet>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow pt-32 pb-20">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <h1 className="text-4xl font-bold text-center mb-8">Contact Us</h1>
              <p className="text-lg text-center text-gray-600 mb-12">
                Get in touch with our security experts to discuss your requirements.
              </p>
              <div className="bg-white rounded-lg shadow-lg p-8">
                <p className="text-center text-gray-600">
                  Contact form coming soon. Please email us directly for now.
                </p>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Contact;


import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

const OurApproach = () => {
  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 text-sapp-dark">Our Approach</h2>
          <p className="text-sapp-gray">We believe security should be comprehensive, understandable and tailored to unique requirements.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card>
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-accent-teal/10 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-accent-teal">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-display font-semibold mb-2 text-accent-dark-blue">Fresh Perspective</h3>
              <p className="text-sapp-gray text-sm">
                We believe in demystifying security. Our experts communicate clearly, avoiding storytelling and jargon bringing our technical expertise into a practical engagement that validates your needs.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-accent-teal/10 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-accent-teal">
                  <path d="M2 12h20"></path>
                  <path d="M12 2v20"></path>
                </svg>
              </div>
              <h3 className="text-xl font-display font-semibold mb-2 text-accent-dark-blue">Comprehensive Protection</h3>
              <p className="text-sapp-gray text-sm">
                We take a holistic view of security, addressing physical, technical, and cyber vulnerabilities as interconnected aspects of your overall security posture.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-accent-teal/10 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-accent-teal">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                  <path d="M12 8v4"></path>
                  <path d="M12 16h.01"></path>
                </svg>
              </div>
              <h3 className="text-xl font-display font-semibold mb-2 text-accent-dark-blue">Business Validation</h3>
              <p className="text-sapp-gray text-sm">
                We recognise that security is a cost item and a hard sell. Our commercial skills and expertise are embedded into our core service delivery supporting your internal security sell.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default OurApproach;

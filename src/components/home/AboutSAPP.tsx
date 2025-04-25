
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const AboutSAPP = () => {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-6 text-sapp-dark">
            Founders on a Mission
          </h2>
          <p className="text-sapp-gray text-lg mb-8 max-w-2xl mx-auto">
            SAPP Security brings together versatile backgrounds and security expertise with a vision to converge physical and digital security.
          </p>
          
          <Button 
            size="lg" 
            className="bg-sapp-blue hover:bg-sapp-blue/90 text-white font-semibold"
            asChild
          >
            <Link to="/about">About Founders & Team</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default AboutSAPP;

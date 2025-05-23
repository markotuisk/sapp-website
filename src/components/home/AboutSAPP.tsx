
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const AboutSAPP = () => {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-sapp-blue text-[19px] leading-[77px] tracking-[3.62px] font-medium uppercase mb-2 block">
              Our Mission and Vision
            </span>
            <h2 
              title="Our Mission and Vision" 
              className="text-3xl md:text-4xl font-display font-bold mb-6 text-sapp-dark"
            >
              Founders on a Mission
            </h2>
            <p className="text-sapp-gray text-lg mb-8 max-w-2xl mx-auto">
              SAPP Security brings together versatile backgrounds and security expertise with a vision to converge physical and digital security.
            </p>
          </div>
          
          <div className="text-center">
            <Button 
              size="lg" 
              className="bg-sapp-blue hover:bg-sapp-blue/90 text-white font-semibold"
              asChild
            >
              <Link to="/about">About Founders & Team</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSAPP;


import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Animated } from '@/components/ui/AnimatedElements';

const ImageBannerSection = () => {
  return (
    <section className="py-8">
      <div className="container mx-auto px-4">
        <Animated animation="fade-up">
          <div 
            className="bg-sapp-dark rounded-xl p-8 md:p-12 shadow-xl relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-sapp-navy to-transparent opacity-80"></div>
            <div className="absolute top-0 right-0 transform translate-x-1/4 -translate-y-1/4">
              <Sparkles className="h-64 w-64 text-sapp-blue/10" />
            </div>
            
            <div className="relative z-10 md:max-w-xl">
              <h3 className="text-2xl md:text-3xl font-display font-bold text-white mb-4">
                Identify Security Vulnerabilities
              </h3>
              <p className="text-gray-300 mb-6">
                Our comprehensive audits help you identify and address security gaps before they can be exploited.
              </p>
              <Button 
                size="lg" 
                className="bg-white text-sapp-dark hover:bg-sapp-blue hover:text-white transition-colors"
                asChild
              >
                <Link to="/">
                  Back to Home
                </Link>
              </Button>
            </div>
          </div>
        </Animated>
      </div>
    </section>
  );
};

export default ImageBannerSection;

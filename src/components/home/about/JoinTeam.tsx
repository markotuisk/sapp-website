
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Animated } from '@/components/ui/AnimatedElements';

const JoinTeam = () => {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <Animated animation="fade-up" delay={200}>
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 text-sapp-dark">
              Become a SAPP Security Innovator
            </h2>
            <p className="text-sapp-gray text-lg mb-8 mx-auto max-w-2xl">
              Join our growing team of innovative thinkers and no-nonsense shakers to create the next-gen security offering
            </p>
            <Button 
              size="lg" 
              className="bg-accent-teal hover:bg-accent-teal/90 text-white font-semibold"
              asChild
            >
              <Link to="/careers">WORK WITH US</Link>
            </Button>
          </Animated>
        </div>
      </div>
    </section>
  );
};

export default JoinTeam;

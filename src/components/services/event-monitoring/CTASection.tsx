
import React from 'react';
import { Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Animated } from '@/components/ui/AnimatedElements';
import { Link } from 'react-router-dom';

interface CTASectionProps {
  onRequestMonitoring: () => void;
}

const CTASection: React.FC<CTASectionProps> = ({ onRequestMonitoring }) => {
  return (
    <section className="py-20 bg-gradient-to-r from-accent-dark-blue to-sapp-blue text-white">
      <div className="container mx-auto px-4 text-center">
        <Animated animation="fade-up" delay={100}>
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
            Protect Your Events in Real-Time
          </h2>
          <p className="max-w-2xl mx-auto mb-8 text-white/90">
            Ensure your sensitive meetings and events are secure with our comprehensive monitoring services.
          </p>
          <Button 
            variant="outline" 
            size="lg" 
            className="bg-white text-sapp-blue hover:bg-white/90 border-0 shadow-lg hover:scale-105 transition-all duration-200"
            onClick={onRequestMonitoring}
          >
            Request Monitoring Service
          </Button>
        </Animated>
      </div>
    </section>
  );
};

export default CTASection;

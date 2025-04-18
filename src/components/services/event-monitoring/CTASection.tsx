
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
    <section className="py-8">
      <div className="container mx-auto px-4">
        <Animated animation="fade-up">
          <div className="bg-sapp-dark rounded-xl p-8 md:p-12 shadow-xl relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-accent-dark-blue to-transparent opacity-80"></div>
            <div className="absolute top-0 right-0 transform translate-x-1/4 -translate-y-1/4">
              <Eye className="h-64 w-64 text-sapp-blue/10" />
            </div>
            
            <div className="relative z-10 md:max-w-xl">
              <h3 className="text-2xl md:text-3xl font-display font-bold text-white mb-4">
                Protect Your Events in Real-Time
              </h3>
              <p className="text-gray-300 mb-6">
                Ensure your sensitive meetings and events are secure with our comprehensive monitoring services. We provide real-time protection against technical and physical threats.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg" 
                  className="bg-white text-sapp-dark hover:bg-sapp-blue hover:text-white transition-colors"
                  asChild
                >
                  <Link to="/">
                    Back to Home
                  </Link>
                </Button>
                <Button 
                  size="lg" 
                  className="bg-sapp-blue hover:bg-sapp-blue/90 text-white"
                  onClick={onRequestMonitoring}
                >
                  Request Monitoring Service
                </Button>
              </div>
            </div>
          </div>
        </Animated>
      </div>
    </section>
  );
};

export default CTASection;

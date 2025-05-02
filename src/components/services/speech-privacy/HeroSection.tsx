
import React from 'react';
import { Button } from '@/components/ui/button';
import { Volume2, Shield } from 'lucide-react';
import { Animated } from '@/components/ui/AnimatedElements';

interface HeroSectionProps {
  onContactClick: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onContactClick }) => {
  return (
    <section className="relative min-h-[80vh] flex items-center bg-gradient-to-b from-[#022B3A] to-[#053F5E] overflow-hidden">
      {/* Animated sound wave pattern background */}
      <div className="absolute inset-0 opacity-10">
        {[...Array(20)].map((_, i) => (
          <div 
            key={i} 
            className="absolute w-full h-[2px] bg-white transform"
            style={{ 
              top: `${10 + (i * 5)}%`,
              left: 0,
              animation: `waveBounce ${3 + (i % 5)}s ease-in-out infinite`, 
              animationDelay: `${i * 0.1}s`, 
              opacity: 0.3 + (i % 10) / 10
            }}
          />
        ))}
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-7 text-white">
            <Animated animation="fade-up" delay={100}>
              <div className="inline-block bg-sapp-blue/20 rounded-full px-4 py-1.5 mb-6">
                <h3 className="text-sm font-medium text-white tracking-wider flex items-center gap-2">
                  <Shield className="h-4 w-4" /> Speech Privacy Solutions
                </h3>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6 leading-tight">
                Beyond Walls: <span className="text-gradient bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent">True Speech Privacy</span> with Smart Soundmasking
              </h1>
              
              <p className="text-lg md:text-xl text-blue-50/90 mb-8 max-w-2xl">
                In open offices, medical centres, legal firms, or any environment where sensitive conversations take place, 
                the risk of being overheard is more than an inconvenience—it's a potential breach of trust, compliance, and confidentiality.
              </p>
              
              <Button 
                size="lg" 
                className="bg-white hover:bg-blue-50 text-sapp-blue hover:text-sapp-dark shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
                onClick={onContactClick}
              >
                Get Speech Privacy Consultation
              </Button>
            </Animated>
          </div>
          
          <div className="md:col-span-5 relative hidden md:block">
            <Animated animation="fade-left" delay={300}>
              <div className="relative">
                <div className="absolute top-0 right-0 w-64 h-64 bg-sapp-blue/30 rounded-full filter blur-3xl"></div>
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full filter blur-2xl"></div>
                
                <div className="relative bg-gradient-to-br from-white/10 to-transparent backdrop-blur-sm border border-white/10 rounded-2xl p-8">
                  <Volume2 className="h-32 w-32 mx-auto text-white opacity-50" />
                  
                  {/* Animated sound waves */}
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    {[...Array(4)].map((_, i) => (
                      <div 
                        key={i}
                        className="absolute rounded-full border border-white/30"
                        style={{
                          width: `${(i+1) * 40}px`,
                          height: `${(i+1) * 40}px`,
                          animation: `pulse ${2 + i}s infinite`,
                          animationDelay: `${i * 0.5}s`,
                          opacity: 1 - (i * 0.2)
                        }}
                      ></div>
                    ))}
                  </div>
                </div>
              </div>
            </Animated>
          </div>
        </div>
      </div>
      
      {/* CSS for animations */}
      <style>
        {`
        @keyframes pulse {
          0% { transform: translate(-50%, -50%) scale(0.8); opacity: 0.8; }
          50% { transform: translate(-50%, -50%) scale(1.2); opacity: 0.2; }
          100% { transform: translate(-50%, -50%) scale(0.8); opacity: 0.8; }
        }
        
        @keyframes waveBounce {
          0%, 100% { transform: scaleY(1) translateX(-5%); }
          50% { transform: scaleY(1.5) translateX(5%); }
        }
        
        .text-gradient {
          background-size: 200% auto;
          animation: shine 4s linear infinite;
        }
        
        @keyframes shine {
          to {
            background-position: 200% center;
          }
        }
        `}
      </style>
    </section>
  );
};

export default HeroSection;

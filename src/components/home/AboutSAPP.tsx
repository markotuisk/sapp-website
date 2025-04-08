
import React from 'react';
import { useInView } from 'react-intersection-observer';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Animated } from '@/components/ui/AnimatedElements';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { useIsMobile } from '@/hooks/use-mobile';
import { Separator } from '@/components/ui/separator';

const AboutSAPP = () => {
  const [sectionRef, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  
  const isMobile = useIsMobile();

  return (
    <section 
      ref={sectionRef}
      className="section-padding bg-gradient-to-b from-white to-gray-50"
      id="about-sapp"
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <Animated animation="fade-up" delay={0}>
            <div className="inline-block bg-sapp-blue/10 rounded-full px-4 py-1.5 mb-4">
              <h3 className="text-sm font-medium text-sapp-blue tracking-wider">Why Us</h3>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-sapp-dark mb-2">About SAPP Security Team</h2>
            <div className="w-16 h-1 bg-sapp-blue mx-auto rounded-full"></div>
          </Animated>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <Animated 
            animation="fade-up" 
            delay={100} 
            className="lg:col-span-5"
          >
            <div className="overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-all duration-300 h-full">
              <AspectRatio ratio={4/3} className="bg-gray-100">
                <img 
                  src="/lovable-uploads/6f587483-b32f-47e3-9ac6-08777e22c860.png" 
                  alt="SAPP Security Team Building Bridges Between Security Teams" 
                  className="object-cover w-full h-full transition-transform duration-500 hover:scale-105"
                />
              </AspectRatio>
            </div>
          </Animated>
          
          <Animated 
            animation="fade-up" 
            delay={200}
            className="lg:col-span-7 space-y-6"
          >
            <div className="space-y-6 p-2 flex flex-col h-full">
              <div>
                <h3 className="text-xl font-semibold text-sapp-dark mb-3">Our Expertise</h3>
                <p className="text-sapp-gray leading-relaxed">
                  SAPP Security brings together versatile backgrounds and security expertise with a vision to converge physical and digital security. Our 30 years of global technical security experience is driven by analytical, data-based strategies and practical Estonian logic.
                </p>
              </div>
              
              <Separator className="my-4" />
              
              <div className="mt-auto">
                <h3 className="text-xl font-semibold text-sapp-dark mb-3">Our Approach</h3>
                <p className="text-sapp-gray leading-relaxed mb-6">
                  Organisations need both physical and digital security. Companies need this equally, so both fields must break their bubbles, embrace collaboration, and work together. The SAPP Vision is to lead by example by creating a unique security offering to assist corporations in converging their physical and cyber security.
                </p>
                
                <Button 
                  variant="default" 
                  className="bg-sapp-blue hover:bg-sapp-blue/90 text-white rounded-md group relative overflow-hidden mt-auto"
                  asChild
                >
                  <Link to="/about" className="inline-flex items-center justify-center gap-2">
                    <span className="relative z-10 transition-all duration-300 group-hover:translate-x-1">
                      Read More About Us
                    </span>
                  </Link>
                </Button>
              </div>
            </div>
          </Animated>
        </div>
      </div>
    </section>
  );
};

export default AboutSAPP;


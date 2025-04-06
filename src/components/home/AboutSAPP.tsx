
import { useInView } from 'react-intersection-observer';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Animated } from '@/components/ui/AnimatedElements';

const AboutSAPP = () => {
  const [sectionRef, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section 
      ref={sectionRef}
      className="section-padding bg-white"
      id="about-sapp"
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Text Content */}
          <Animated 
            animation="fade-up" 
            delay={100} 
            className="space-y-4"
          >
            <div className="inline-block bg-sapp-blue/10 hover:bg-sapp-blue/20 transition-colors duration-200 ease-in-out px-4 py-2 rounded-lg mb-2">
              <h3 className="text-lg font-semibold text-sapp-dark">About SAPP Security</h3>
            </div>
            
            <div className="space-y-4 text-sapp-gray">
              <p className="text-base leading-relaxed">
                SAPP Security brings together versatile backgrounds and security expertise with a vision to converge physical and digital security. Our 30 years of global technical security experience is driven by analytical, data-based strategies and practical Estonian logic.
              </p>
              <p className="text-base leading-relaxed">
                Organisations need both physical and digital security. Companies need this equally, so both fields must break their bubbles, embrace collaboration, and work together. The SAPP Vision is to lead by example by creating a unique security offering to assist corporations in converging their physical and cyber security.
              </p>
            </div>
            
            <div className="pt-2">
              <Button 
                variant="default" 
                className="bg-sapp-blue hover:bg-sapp-blue/90 text-white rounded-md group relative overflow-hidden"
                asChild
              >
                <Link to="/about" className="inline-flex items-center justify-center gap-2">
                  <span className="relative z-10 transition-all duration-300 group-hover:translate-x-1">
                    Read More About Us
                  </span>
                </Link>
              </Button>
            </div>
          </Animated>
          
          {/* Image */}
          <Animated 
            animation="fade-up" 
            delay={200} 
            className="w-full h-full"
          >
            <div className="overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-all duration-300 h-full">
              <img 
                src="/lovable-uploads/8d818889-c5eb-43f6-8a63-3b0310802bdd.png" 
                alt="SAPP Security Team" 
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
              />
            </div>
          </Animated>
        </div>
      </div>
    </section>
  );
};

export default AboutSAPP;


import { useInView } from 'react-intersection-observer';
import { cn } from '@/lib/utils';
import { Animated } from '@/components/ui/AnimatedElements';
import { Card, CardContent } from '@/components/ui/card';

const AboutHero = () => {
  const [heroRef, heroInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section ref={heroRef} className="relative pt-32 pb-16 md:pt-36 md:pb-24 overflow-hidden bg-gradient-to-b from-white to-gray-50">
      {/* Abstract Background Pattern */}
      <div className="absolute inset-0 bg-grid opacity-50 pointer-events-none"></div>
      
      {/* Accent Color Element */}
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-accent-teal/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-accent-teal/5 rounded-full blur-3xl pointer-events-none"></div>
      
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
          <div className="order-2 lg:order-1">
            <div className="max-w-2xl">
              <Animated animation="fade-up" delay={200}>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold leading-tight mb-6 text-sapp-dark tracking-normal">
                  Security expertise built on competence, integrity and experience
                </h1>
              </Animated>
              
              <Animated
                animation="fade-up"
                delay={400}
                className="text-sapp-gray text-lg mb-8"
              >
                <p>SAPP Security unifies combined backgrounds in corporate security, technology, counter espionage, law, banking, engineering and information security.</p>
              </Animated>
            </div>
          </div>
          
          <div className="order-1 lg:order-2">
            <Animated
              animation="fade-left"
              delay={300}
              className="relative"
            >
              <Card className="overflow-hidden bg-white border-0 shadow-xl h-full">
                <CardContent className="p-0">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img 
                      src="/lovable-uploads/fc9a9c2e-5129-4b70-89e2-7617a4e5578a.png" 
                      alt="SAPP Security Team" 
                      className="w-full h-full object-cover object-center transition-transform duration-700 hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-sapp-dark/30 to-transparent"></div>
                  </div>
                  <div className="p-6 bg-white">
                    <h3 className="font-display font-semibold text-xl mb-2 text-accent-dark-blue">Trusted Professionals</h3>
                    <p className="text-sapp-gray text-sm">Our team combines industry expertise with innovative approach and personalized service to ensure your security needs are met with excellence.</p>
                  </div>
                </CardContent>
              </Card>
            </Animated>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutHero;

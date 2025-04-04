
import { useInView } from 'react-intersection-observer';
import { cn } from '@/lib/utils';
import { Shield, Check, Info, Users } from 'lucide-react';
import { Animated } from '../ui/AnimatedElements';

const AboutUs = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [principlesRef, principlesInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const values = [
    {
      title: "Lorem Ipsum",
      description: "Dolor sit amet consectetur adipiscing elit sed do eiusmod tempor.",
      icon: <Shield className="h-6 w-6 text-sapp-blue" />
    },
    {
      title: "Consectetur",
      description: "Adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore.",
      icon: <Check className="h-6 w-6 text-sapp-blue" />
    },
    {
      title: "Adipiscing",
      description: "Elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      icon: <Info className="h-6 w-6 text-sapp-blue" />
    },
    {
      title: "Eiusmod",
      description: "Tempor incididunt ut labore et dolore magna aliqua ut enim ad.",
      icon: <Users className="h-6 w-6 text-sapp-blue" />
    }
  ];

  return (
    <section id="about-us" className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-4xl mx-auto">
          <Animated animation="fade-up" delay={100}>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-center mb-12 text-sapp-dark">
              <span className="text-sapp-blue">About</span> SAPP Security
            </h2>
          </Animated>

          <div className="space-y-16">
            <div ref={ref} className="space-y-4">
              <h3 className={cn(
                "text-2xl font-display font-semibold text-sapp-dark transition-all duration-700 delay-200",
                inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              )}>
                What We Believe
              </h3>
              <p className={cn(
                "text-lg text-sapp-gray leading-relaxed transition-all duration-700 delay-300",
                inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              )}>
                Lorem ipsum dolor sit amet consectetur adipiscing elit.
              </p>
              <p className={cn(
                "text-lg text-sapp-gray leading-relaxed transition-all duration-700 delay-400",
                inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              )}>
                Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.
              </p>
            </div>

            <div className="space-y-6">
              <h3 className={cn(
                "text-2xl font-display font-semibold text-sapp-dark transition-all duration-700 delay-200",
                inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              )}>
                Our Values
              </h3>
              <p className={cn(
                "text-lg text-sapp-gray leading-relaxed transition-all duration-700 delay-300",
                inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              )}>
                Consectetur adipiscing elit sed do eiusmod tempor.
              </p>
              <p className={cn(
                "text-lg text-sapp-gray leading-relaxed transition-all duration-700 delay-400",
                inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              )}>
                Incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip.
              </p>
              
              <div className="mt-8">
                <p className={cn(
                  "text-lg font-medium text-sapp-dark mb-6 transition-all duration-700 delay-500",
                  inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                )}>
                  Adipiscing elit sed do eiusmod tempor
                </p>
                
                <div 
                  ref={principlesRef} 
                  className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6"
                >
                  {values.map((value, index) => (
                    <div 
                      key={value.title}
                      className={cn(
                        "flex items-start space-x-4 transition-all duration-700",
                        principlesInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                      )}
                      style={{ transitionDelay: principlesInView ? `${(index * 150) + 200}ms` : '0ms' }}
                    >
                      <div className="bg-gray-50 p-3 rounded-lg">
                        {value.icon}
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold text-sapp-dark mb-2">{value.title}</h4>
                        <p className="text-sapp-gray">{value.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <p className={cn(
                "text-lg text-sapp-gray leading-relaxed mt-8 transition-all duration-700 delay-900",
                principlesInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              )}>
                Tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className={cn(
                "text-2xl font-display font-semibold text-sapp-dark transition-all duration-700 delay-200",
                principlesInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              )}>
                Our Approach
              </h3>
              <p className={cn(
                "text-lg text-sapp-gray leading-relaxed transition-all duration-700 delay-300",
                principlesInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              )}>
                Adipiscing elit sed do eiusmod tempor incididunt.
              </p>
              <p className={cn(
                "text-lg text-sapp-gray leading-relaxed transition-all duration-700 delay-400",
                principlesInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              )}>
                Ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className={cn(
                "text-2xl font-display font-semibold text-sapp-dark transition-all duration-700 delay-200",
                principlesInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              )}>
                Our Mission
              </h3>
              <p className={cn(
                "text-lg text-sapp-gray leading-relaxed transition-all duration-700 delay-300",
                principlesInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              )}>
                Lorem ipsum dolor sit amet consectetur adipiscing elit.
              </p>
              <p className={cn(
                "text-lg text-sapp-gray leading-relaxed transition-all duration-700 delay-400",
                principlesInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              )}>
                Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;


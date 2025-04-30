
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
            <h3 className="text-sapp-blue text-[19px] leading-[77px] tracking-[3.62px] font-medium text-center mb-4">
              ABOUT SAPP SECURITY
            </h3>
            <div className="space-y-8">
              {/* The Vision card */}
              <div 
                className="rounded-lg shadow-sm hover:shadow-md transition-all duration-200 ease-in-out cursor-pointer"
              >
                <h3 className="text-2xl font-display font-semibold text-sapp-dark p-3 bg-sapp-blue/10 rounded-t-lg hover:bg-sapp-blue/20 transition-colors duration-200 ease-in-out">
                  The Vision
                </h3>
                <div className="p-4 bg-white rounded-b-lg">
                  <p className="text-lg text-sapp-gray leading-relaxed">
                    Lorem ipsum dolor sit amet consectetur adipiscing elit.
                  </p>
                  <p className="text-lg text-sapp-gray leading-relaxed mt-2">
                    Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.
                  </p>
                </div>
              </div>

              {/* What We Believe card */}
              <div 
                ref={ref} 
                className="rounded-lg shadow-sm hover:shadow-md transition-all duration-200 ease-in-out cursor-pointer"
              >
                <h3 className={cn(
                  "text-2xl font-display font-semibold text-sapp-dark p-3 bg-sapp-blue/10 rounded-t-lg hover:bg-sapp-blue/20 transition-colors duration-200 ease-in-out",
                  inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                )}>
                  What We Believe
                </h3>
                <div className="p-4 bg-white rounded-b-lg">
                  <p className={cn(
                    "text-lg text-sapp-gray leading-relaxed transition-all duration-700 delay-300",
                    inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                  )}>
                    Lorem ipsum dolor sit amet consectetur adipiscing elit.
                  </p>
                  <p className={cn(
                    "text-lg text-sapp-gray leading-relaxed transition-all duration-700 delay-400 mt-2",
                    inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                  )}>
                    Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.
                  </p>
                </div>
              </div>

              {/* Our Values card */}
              <div className="rounded-lg shadow-sm hover:shadow-md transition-all duration-200 ease-in-out cursor-pointer">
                <h3 className={cn(
                  "text-2xl font-display font-semibold text-sapp-dark p-3 bg-sapp-blue/10 rounded-t-lg hover:bg-sapp-blue/20 transition-colors duration-200 ease-in-out",
                  inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                )}>
                  Our Values
                </h3>
                <div className="p-4 bg-white rounded-b-lg">
                  <p className={cn(
                    "text-lg text-sapp-gray leading-relaxed transition-all duration-700 delay-300",
                    inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                  )}>
                    Consectetur adipiscing elit sed do eiusmod tempor.
                  </p>
                  <p className={cn(
                    "text-lg text-sapp-gray leading-relaxed transition-all duration-700 delay-400 mt-2",
                    inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                  )}>
                    Incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip.
                  </p>
              
                  <p className={cn(
                    "text-lg font-medium text-sapp-dark mb-6 transition-all duration-700 delay-500 mt-4",
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
                          "flex items-start space-x-4 p-4 rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors duration-200 ease-in-out",
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
              
                  <p className={cn(
                    "text-lg text-sapp-gray leading-relaxed mt-8 transition-all duration-700 delay-900",
                    principlesInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                  )}>
                    Tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.
                  </p>
                </div>
              </div>

              {/* Our Approach card */}
              <div className="rounded-lg shadow-sm hover:shadow-md transition-all duration-200 ease-in-out cursor-pointer">
                <h3 className={cn(
                  "text-2xl font-display font-semibold text-sapp-dark p-3 bg-sapp-blue/10 rounded-t-lg hover:bg-sapp-blue/20 transition-colors duration-200 ease-in-out",
                  principlesInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                )}>
                  Our Approach
                </h3>
                <div className="p-4 bg-white rounded-b-lg">
                  <p className={cn(
                    "text-lg text-sapp-gray leading-relaxed transition-all duration-700 delay-300",
                    principlesInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                  )}>
                    Adipiscing elit sed do eiusmod tempor incididunt.
                  </p>
                  <p className={cn(
                    "text-lg text-sapp-gray leading-relaxed transition-all duration-700 delay-400 mt-2",
                    principlesInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                  )}>
                    Ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                  </p>
                </div>
              </div>

              {/* Our Mission card */}
              <div className="rounded-lg shadow-sm hover:shadow-md transition-all duration-200 ease-in-out cursor-pointer">
                <h3 className={cn(
                  "text-2xl font-display font-semibold text-accent-dark-blue p-3 bg-accent-teal/10 rounded-t-lg hover:bg-accent-teal/20 transition-colors duration-200 ease-in-out",
                  principlesInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                )}>
                  Our Mission
                </h3>
                <div className="p-4 bg-white rounded-b-lg">
                  <p className={cn(
                    "text-lg text-sapp-gray leading-relaxed transition-all duration-700 delay-300",
                    principlesInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                  )}>
                    The SAPP technical security services are for corporate clients to protect their sensitive meetings and high-value events, audit security processes at their workplace, install and maintain security systems, and provide innovative security for IoT devices.
                  </p>
                </div>
              </div>
            </div>
          </Animated>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;


import { useInView } from 'react-intersection-observer';
import { cn } from '@/lib/utils';
import { Shield, Check, Info, Users } from 'lucide-react';
import { Animated, AnimatedText } from '../ui/AnimatedElements';
import { Separator } from '@/components/ui/separator';

const About = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [contentRef, contentInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [principlesRef, principlesInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [storyRef, storyInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const values = [
    {
      title: "Competence",
      description: "We bring depth of knowledge and technical accuracy to every task.",
      icon: <Shield className="h-6 w-6 text-sapp-blue" />
    },
    {
      title: "Integrity",
      description: "We act responsibly, consistently, and without pretence.",
      icon: <Check className="h-6 w-6 text-sapp-blue" />
    },
    {
      title: "Clarity",
      description: "We communicate plainly and work without ambiguity.",
      icon: <Info className="h-6 w-6 text-sapp-blue" />
    },
    {
      title: "Discretion",
      description: "We stay out of the spotlight, and always within reach.",
      icon: <Users className="h-6 w-6 text-sapp-blue" />
    }
  ];

  return (
    <section id="about" className="py-24 bg-gradient-to-b from-white to-slate-100 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute w-[800px] h-[800px] rounded-full bg-sapp-blue/5 -top-1/2 -right-1/4 blur-3xl"></div>
      <div className="absolute w-[600px] h-[600px] rounded-full bg-sapp-blue/3 bottom-0 -left-1/4 blur-3xl"></div>
      <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-white to-transparent z-10"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-20">
          <span 
            ref={ref}
            className={cn(
              "inline-block px-4 py-1.5 bg-sapp-blue/10 rounded-full text-sapp-blue text-sm font-medium mb-4 transition-all duration-500",
              inView ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
            )}
          >
            About Us
          </span>
          <h2 
            className={cn(
              "text-3xl md:text-4xl font-display font-bold text-sapp-dark mb-6 transition-all duration-500 delay-100",
              inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            )}
          >
            Security expertise built on <span className="text-sapp-blue">competence, integrity, and clarity</span>
          </h2>
          <p 
            className={cn(
              "text-sapp-gray text-lg transition-all duration-500 delay-200",
              inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            )}
          >
            SAPP Security is a natural evolution from a UK-based counter espionage company, 
            now offering wider technical security expertise and automation of multiple security systems.
          </p>
        </div>

        {/* The SAPP Story Section */}
        <div 
          ref={storyRef} 
          className={cn(
            "max-w-7xl mx-auto mb-20 transition-all duration-700",
            storyInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          )}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="p-10 md:p-14 flex flex-col justify-center order-2 lg:order-1">
              <h3 className={cn(
                "text-3xl font-display font-bold text-sapp-dark mb-6 transition-all duration-700",
                storyInView ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-8"
              )}>
                THE SAPP STORY
              </h3>
              <p className={cn(
                "text-sapp-gray leading-relaxed mb-8 transition-all duration-700 delay-100",
                storyInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              )}>
                Founded in 2015 by security experts Raili Maripuu and Marko Tuisk, SAPP Security was born from the vision of reimagining how organizations approach physical and digital security.
              </p>
              <div className={cn(
                "grid grid-cols-3 gap-4 transition-all duration-700 delay-200",
                storyInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              )}>
                <div className="text-center p-4 rounded-lg bg-slate-50">
                  <span className="text-3xl font-display font-bold text-sapp-blue">2015</span>
                  <p className="text-sm text-sapp-gray mt-1">Year founded</p>
                </div>
                <div className="text-center p-4 rounded-lg bg-slate-50">
                  <span className="text-3xl font-display font-bold text-sapp-blue">27+</span>
                  <p className="text-sm text-sapp-gray mt-1">Countries served</p>
                </div>
                <div className="text-center p-4 rounded-lg bg-slate-50">
                  <span className="text-3xl font-display font-bold text-sapp-blue">100%</span>
                  <p className="text-sm text-sapp-gray mt-1">Integrated</p>
                </div>
              </div>
            </div>
            <div className="relative h-[300px] lg:h-auto order-1 lg:order-2">
              <div className="absolute inset-0 bg-gradient-to-t from-sapp-dark/80 to-transparent z-10"></div>
              <img 
                src="/lovable-uploads/8d818889-c5eb-43f6-8a63-3b0310802bdd.png" 
                alt="The SAPP Security founders" 
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute bottom-6 left-6 right-6 z-20">
                <AnimatedText 
                  text="Our approach bridges the gap between physical and digital security, creating comprehensive protection that others simply can't match."
                  tag="p"
                  className="text-white text-xl font-display font-medium"
                  delay={300}
                />
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
            <div className={cn(
              "bg-white rounded-xl shadow-md p-8 transition-all duration-700 delay-300",
              storyInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            )}>
              <h4 className="text-xl font-display font-semibold text-sapp-dark mb-4">The Beginning</h4>
              <p className="text-sapp-gray">
                They met while working on opposite sides of security: Raili specialized in developing secure systems as a cybersecurity expert, while Marko led physical security operations for high-profile diplomatic events. Both Estonian nationals, they frequently collaborated on projects requiring both physical and digital protection.
              </p>
            </div>
            
            <div className={cn(
              "bg-white rounded-xl shadow-md p-8 transition-all duration-700 delay-400",
              storyInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            )}>
              <h4 className="text-xl font-display font-semibold text-sapp-dark mb-4">The Vision</h4>
              <p className="text-sapp-gray">
                Today, SAPP Security has grown from two founders with a vision to an international team of security specialists, trusted by organizations worldwide to protect their most valuable assets and operations. Our holistic approach to security continues to set the standard for the industry.
              </p>
            </div>
          </div>
        </div>
        
        {/* About SAPP Security Section */}
        <div className="max-w-4xl mx-auto mt-20">
          <div className="space-y-16" ref={contentRef}>
            <div className="space-y-12 relative">
              {/* Background shape */}
              <div className="absolute -left-4 top-0 w-1 h-full bg-gradient-to-b from-sapp-blue/50 to-sapp-blue/0 rounded-full"></div>
              
              {/* What We Believe */}
              <div className="pl-8 space-y-4 relative">
                <div className="absolute -left-12 top-0 w-8 h-8 rounded-full bg-white shadow-md flex items-center justify-center">
                  <div className="w-3 h-3 rounded-full bg-sapp-blue"></div>
                </div>
                <h3 className={cn(
                  "text-2xl font-display font-semibold text-sapp-dark transition-all duration-700 delay-200",
                  contentInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                )}>
                  What We Believe
                </h3>
                <p className={cn(
                  "text-lg text-sapp-gray leading-relaxed transition-all duration-700 delay-300",
                  contentInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                )}>
                  Security should be discreet, effective, and grounded in integrity.
                </p>
                <p className={cn(
                  "text-lg text-sapp-gray leading-relaxed transition-all duration-700 delay-400",
                  contentInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                )}>
                  We believe protection is not about posturing — it's about clarity, competence, and control. Real security works quietly. It fits the environment, reflects the risks, and supports the people tasked with serious decisions.
                </p>
              </div>

              {/* Our Values */}
              <div className="pl-8 space-y-6 relative">
                <div className="absolute -left-12 top-0 w-8 h-8 rounded-full bg-white shadow-md flex items-center justify-center">
                  <div className="w-3 h-3 rounded-full bg-sapp-blue"></div>
                </div>
                <h3 className={cn(
                  "text-2xl font-display font-semibold text-sapp-dark transition-all duration-700 delay-200",
                  contentInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                )}>
                  Our Values
                </h3>
                <p className={cn(
                  "text-lg text-sapp-gray leading-relaxed transition-all duration-700 delay-300",
                  contentInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                )}>
                  SAPP is about trust, not tech alone.
                </p>
                <p className={cn(
                  "text-lg text-sapp-gray leading-relaxed transition-all duration-700 delay-400",
                  contentInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                )}>
                  We operate in environments where discretion matters, where silence protects strategy, and where good decisions depend on clear, honest advice.
                </p>
                
                <div className="mt-8">
                  <p className={cn(
                    "text-lg font-medium text-sapp-dark mb-6 transition-all duration-700 delay-500",
                    contentInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                  )}>
                    We're guided by four principles:
                  </p>
                  
                  <div 
                    ref={principlesRef} 
                    className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6"
                  >
                    {values.map((value, index) => (
                      <div 
                        key={value.title}
                        className={cn(
                          "bg-white rounded-xl p-6 shadow-md transition-all duration-700 hover:shadow-lg hover:-translate-y-1",
                          principlesInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                        )}
                        style={{ transitionDelay: principlesInView ? `${(index * 150) + 200}ms` : '0ms' }}
                      >
                        <div className="flex items-start space-x-4">
                          <div className="bg-sapp-blue/10 p-3 rounded-lg">
                            {value.icon}
                          </div>
                          <div>
                            <h4 className="text-lg font-semibold text-sapp-dark mb-2">{value.title}</h4>
                            <p className="text-sapp-gray">{value.description}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <p className={cn(
                  "text-lg text-sapp-gray leading-relaxed mt-8 transition-all duration-700 delay-900",
                  principlesInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                )}>
                  These aren't just ideals — they're how we work every day, and why clients trust us with their most sensitive spaces and moments.
                </p>
              </div>

              {/* Our Approach */}
              <div className="pl-8 space-y-4 relative">
                <div className="absolute -left-12 top-0 w-8 h-8 rounded-full bg-white shadow-md flex items-center justify-center">
                  <div className="w-3 h-3 rounded-full bg-sapp-blue"></div>
                </div>
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
                  We apply sharp thinking, calm execution, and total discretion.
                </p>
                <p className={cn(
                  "text-lg text-sapp-gray leading-relaxed transition-all duration-700 delay-400",
                  principlesInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                )}>
                  SAPP teams combine backgrounds in counter-espionage, law, banking, engineering, and information security. This diversity helps us see risk clearly — and solve it precisely. We don't just install or audit — we think, we challenge assumptions, and we stay aligned to our client's priorities at all times.
                </p>
              </div>

              {/* Our Mission */}
              <div className="pl-8 space-y-4 relative">
                <div className="absolute -left-12 top-0 w-8 h-8 rounded-full bg-white shadow-md flex items-center justify-center">
                  <div className="w-3 h-3 rounded-full bg-sapp-blue"></div>
                </div>
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
                  To make technical and physical security work for the people who carry real responsibility.
                </p>
                <p className={cn(
                  "text-lg text-sapp-gray leading-relaxed transition-all duration-700 delay-400",
                  principlesInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                )}>
                  From cloud infrastructure to physical access and counter-surveillance, we help our clients protect their operations, environments, and reputations. Our role is to strengthen the function of those already under pressure — with systems that hold, guidance that's honest, and outcomes that matter.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;

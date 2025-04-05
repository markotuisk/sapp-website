import { useInView } from 'react-intersection-observer';
import { cn } from '@/lib/utils';
import { Animated, AnimatedText } from '../ui/AnimatedElements';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent } from '@/components/ui/card';
import { Shield, Check, Info, Users } from 'lucide-react';

const About = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [storyRef, storyInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [gridRef, gridInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const values = [
    {
      title: "Competence",
      description: "We bring depth of knowledge and technical accuracy to every task.",
      icon: <Shield className="h-6 w-6 text-white" />
    },
    {
      title: "Integrity",
      description: "We act responsibly, consistently, and without pretence.",
      icon: <Check className="h-6 w-6 text-white" />
    },
    {
      title: "Clarity",
      description: "We communicate plainly and work without ambiguity.",
      icon: <Info className="h-6 w-6 text-white" />
    },
    {
      title: "Discretion",
      description: "We stay out of the spotlight, and always within reach.",
      icon: <Users className="h-6 w-6 text-white" />
    }
  ];

  return (
    <section id="about" className="py-24 bg-white relative overflow-hidden">
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
            SAPP Security is a natural evolution from a UK-based counter espionage company, now offering wider technical security expertise and automation of multiple security systems
          </p>
        </div>

        <div 
          ref={storyRef} 
          className={cn(
            "max-w-7xl mx-auto mb-20 transition-all duration-700",
            storyInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          )}
        >
          <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden transition-all duration-200 ease-in-out hover:shadow-xl hover:scale-[1.02]">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
              <div className="order-2 lg:order-1 p-10 md:p-14 flex flex-col justify-center">
                <h3 className={cn(
                  "text-3xl font-display font-bold text-sapp-blue mb-6 transition-all duration-700",
                  storyInView ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-8"
                )}>
                  The SAPP Story
                </h3>
                <p className={cn(
                  "text-sapp-gray leading-relaxed mb-6 transition-all duration-700 delay-100",
                  storyInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                )}>
                  SAPP Security brings together versatile backgrounds and security expertise with a vision to converge physical and digital security.
                </p>
                <p className={cn(
                  "text-sapp-gray leading-relaxed mb-6 transition-all duration-700 delay-150",
                  storyInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                )}>
                  Our two founders, Raili and Marko, are native Estonians with a combined 30-years expertise in a global technical security industry. They share a common professional frustration in corporations with physical and cyber security working in silos. As a result, security threats that need expertise from both fields, are left overlooked. Mobile devices in unlocked executive desk drawers, accessible control panels in unsecured boardrooms, incorrectly positioned security cameras and the list goes on.
                </p>
                <p className={cn(
                  "text-sapp-gray leading-relaxed mb-8 transition-all duration-700 delay-200",
                  storyInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                )}>
                  Organisations need both physical and digital security. Companies need this equally, so both fields need to break their bubbles, embrace the collaboration and work together. The SAPP Vision is to lead by example by creating unique security offering to assist corporations to converge their physical and cyber security.
                </p>
                
                <div className={cn(
                  "grid grid-cols-3 gap-4 transition-all duration-700 delay-300",
                  storyInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                )}>
                  <div className="text-center p-4 rounded-lg bg-slate-50 border border-slate-100 transition-all hover:shadow-md hover:-translate-y-1 duration-300">
                    <span className="text-3xl font-display font-bold text-sapp-blue">2015</span>
                    <p className="text-sm text-sapp-gray mt-1">Year founded</p>
                  </div>
                  <div className="text-center p-4 rounded-lg bg-slate-50 border border-slate-100 transition-all hover:shadow-md hover:-translate-y-1 duration-300">
                    <span className="text-3xl font-display font-bold text-sapp-blue">27+</span>
                    <p className="text-sm text-sapp-gray mt-1">Countries served</p>
                  </div>
                  <div className="text-center p-4 rounded-lg bg-slate-50 border border-slate-100 transition-all hover:shadow-md hover:-translate-y-1 duration-300">
                    <span className="text-3xl font-display font-bold text-sapp-blue">100%</span>
                    <p className="text-sm text-sapp-gray mt-1">Integrated</p>
                  </div>
                </div>
              </div>
              
              <div className="relative h-[400px] lg:h-auto order-1 lg:order-2">
                <div className="absolute inset-0 bg-gradient-to-tr from-sapp-blue/90 to-transparent z-10"></div>
                <img 
                  src="/lovable-uploads/8d818889-c5eb-43f6-8a63-3b0310802bdd.png" 
                  alt="The SAPP Security founders" 
                  className="w-full h-full object-cover object-center"
                />
                <div className="absolute bottom-10 left-10 right-10 z-20">
                  <Separator className="bg-white/30 h-0.5 w-16 mb-6" />
                  <AnimatedText 
                    text="Our approach bridges the gap between physical and digital security, creating comprehensive protection that others simply can't match."
                    tag="p"
                    className="text-white text-xl font-display font-medium"
                    delay={300}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div 
          ref={gridRef} 
          className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 mb-20"
        >
          <Card 
            className={cn(
              "transition-all duration-200 ease-in-out shadow-md hover:shadow-xl hover:scale-[1.02] border border-gray-100 bg-white rounded-xl overflow-hidden",
              gridInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            )}
            style={{ transitionDelay: gridInView ? "100ms" : "0ms" }}
          >
            <div className="relative overflow-hidden h-32 bg-accent-teal/10">
              <div className="absolute bottom-6 left-6">
                <h3 className="text-2xl font-display font-bold text-accent-dark-blue">The Vision</h3>
              </div>
            </div>
            <CardContent className="p-6">
              <p className="text-sapp-gray transition-all duration-300 hover:translate-y-[-5px]">
                The SAPP Vision is for organisations to have a turnkey solution to converge their cyber, compliance and physical security functions.
              </p>
            </CardContent>
          </Card>
          
          <Card 
            className={cn(
              "transition-all duration-200 ease-in-out shadow-md hover:shadow-xl hover:scale-[1.02] border border-gray-100 bg-white rounded-xl overflow-hidden",
              gridInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            )}
            style={{ transitionDelay: gridInView ? "200ms" : "0ms" }}
          >
            <div className="relative overflow-hidden h-32 bg-accent-teal/10">
              <div className="absolute bottom-6 left-6">
                <h3 className="text-2xl font-display font-bold text-accent-dark-blue">What We Believe</h3>
              </div>
            </div>
            <CardContent className="p-6">
              <p className="text-sapp-gray mb-4">
                Security should be discreet, effective, and grounded in integrity.
              </p>
              <p className="text-sapp-gray">
                We believe protection is not about posturing — it's about clarity, competence, and control. Real security works quietly. It fits the environment, reflects the risks, and supports the people tasked with serious decisions.
              </p>
            </CardContent>
          </Card>
          
          <div 
            className={cn(
              "col-span-1 md:col-span-2 transition-all duration-200 ease-in-out shadow-md hover:shadow-xl hover:scale-[1.02] border border-gray-100 bg-white rounded-2xl overflow-hidden",
              gridInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            )}
            style={{ transitionDelay: gridInView ? "300ms" : "0ms" }}
          >
            <div className="bg-accent-teal/10 p-10 text-sapp-dark">
              <div className="flex flex-col md:flex-row gap-8 items-start">
                <div className="md:w-1/3">
                  <h3 className="text-2xl font-display font-bold mb-4 text-accent-dark-blue">Our Values</h3>
                  <Separator className="bg-accent-teal h-0.5 w-16 mb-6" />
                  <p className="text-sapp-gray mb-4">
                    SAPP is about trust, not tech alone.
                  </p>
                  <p className="text-sapp-gray">
                    We operate in environments where discretion matters, where silence protects strategy, and where good decisions depend on clear, honest advice.
                  </p>
                </div>
                
                <div className="md:w-2/3">
                  <p className="text-lg font-medium text-accent-dark-blue mb-6">
                    We're guided by four principles:
                  </p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {values.map((value, index) => (
                      <div 
                        key={value.title}
                        className="bg-white border border-gray-100 rounded-xl p-6 transition-all duration-500 hover:shadow-sm"
                        style={{ transitionDelay: gridInView ? `${(index * 100) + 400}ms` : '0ms' }}
                      >
                        <h4 className="text-lg font-semibold text-accent-dark-blue mb-2">{value.title}</h4>
                        <p className="text-sapp-gray text-sm">{value.description}</p>
                      </div>
                    ))}
                  </div>
                  
                  <p className="text-sapp-gray mt-6">
                    These aren't just ideals — they're how we work every day, and why clients trust us with their most sensitive spaces and moments.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <Card 
            className={cn(
              "transition-all duration-200 ease-in-out shadow-md hover:shadow-xl hover:scale-[1.02] border border-gray-100 bg-white rounded-xl overflow-hidden",
              gridInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            )}
            style={{ transitionDelay: gridInView ? "400ms" : "0ms" }}
          >
            <div className="relative overflow-hidden h-32 bg-accent-teal/10">
              <div className="absolute bottom-6 left-6">
                <h3 className="text-2xl font-display font-bold text-accent-dark-blue">Our Approach</h3>
              </div>
            </div>
            <CardContent className="p-6">
              <p className="text-sapp-gray mb-4">
                We apply sharp thinking, calm execution, and total discretion.
              </p>
              <p className="text-sapp-gray">
                SAPP teams combine backgrounds in counter-espionage, law, banking, engineering, and information security. This diversity helps us see risk clearly — and solve it precisely. We don't just install or audit — we think, we challenge assumptions, and we stay aligned to our client's priorities at all times.
              </p>
            </CardContent>
          </Card>
          
          <Card 
            className={cn(
              "transition-all duration-200 ease-in-out shadow-md hover:shadow-xl hover:scale-[1.02] border border-gray-100 bg-white rounded-xl overflow-hidden",
              gridInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            )}
            style={{ transitionDelay: gridInView ? "500ms" : "0ms" }}
          >
            <div className="relative overflow-hidden h-32 bg-accent-teal/10">
              <div className="absolute bottom-6 left-6">
                <h3 className="text-2xl font-display font-bold text-accent-dark-blue">Our Mission</h3>
              </div>
            </div>
            <CardContent className="p-6">
              <p className="text-sapp-gray mb-4">
                To make technical and physical security work for the people who carry real responsibility.
              </p>
              <p className="text-sapp-gray">
                From cloud infrastructure to physical access and counter-surveillance, we help our clients protect their operations, environments, and reputations. Our role is to strengthen the function of those already under pressure — with systems that hold, guidance that's honest, and outcomes that matter.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default About;

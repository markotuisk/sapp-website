
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
    <section id="about" className="py-24 bg-slate-50 relative overflow-hidden">
      {/* Background gradient and elements */}
      <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-white to-transparent"></div>
      <div className="absolute w-96 h-96 rounded-full bg-sapp-blue/5 -top-48 -left-48 blur-3xl"></div>
      <div className="absolute w-64 h-64 rounded-full bg-sapp-blue/5 bottom-24 right-24 blur-3xl"></div>
      
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-16">
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
          <div className="bg-sapp-dark rounded-t-2xl overflow-hidden">
            <div className="px-8 py-16 md:px-16 md:py-20">
              <h2 className={cn(
                "text-4xl md:text-5xl font-display font-bold text-white uppercase tracking-tight mb-6 transition-all duration-700",
                storyInView ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-8"
              )}>
                THE SAPP STORY
              </h2>
              <p className={cn(
                "text-white/80 text-lg md:text-xl max-w-3xl transition-all duration-700 delay-100",
                storyInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              )}>
                Founded in 2015 by security experts Raili Maripuu and Marko Tuisk, SAPP Security was born from the vision of reimagining how organizations approach physical and digital security. Today, our comprehensive protection solutions safeguard some of the world's most sensitive events and venues. Here's how it all began.
              </p>
            </div>
            <div className="w-full aspect-[16/9] bg-gradient-to-b from-gray-900 to-black relative overflow-hidden">
              <img 
                src="/lovable-uploads/8d818889-c5eb-43f6-8a63-3b0310802bdd.png" 
                alt="The SAPP Security founders" 
                className="w-full h-full object-cover object-center opacity-90"
              />
            </div>
          </div>
          
          <div className="bg-white rounded-b-2xl shadow-lg p-8 md:p-12 lg:p-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
              <div className={cn(
                "transition-all duration-700 delay-200",
                storyInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              )}>
                <h3 className="text-3xl font-display font-bold text-sapp-dark mb-6">
                  Like all great stories,<br />
                  this one begins with a challenge.
                </h3>
                <p className="text-sapp-gray mb-4">
                  They met while working on opposite sides of security: Raili specialized in developing secure systems as a cybersecurity expert, while Marko led physical security operations for high-profile diplomatic events. Both Estonian nationals, they frequently collaborated on projects requiring both physical and digital protection.
                </p>
                <p className="text-sapp-gray">
                  Despite their different backgrounds, they shared a common frustration: existing security solutions were fragmented, with physical and digital protections treated as entirely separate domains. They knew there had to be a more integrated approach to security challenges.
                </p>
              </div>
              
              <div className={cn(
                "transition-all duration-700 delay-300",
                storyInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              )}>
                <div className="mb-8">
                  <Separator className="bg-sapp-blue/20 h-0.5 w-16 mb-6" />
                  <AnimatedText 
                    text="Our approach bridges the gap between physical and digital security, creating comprehensive protection that others simply can't match."
                    tag="p"
                    className="text-xl font-display font-medium text-sapp-blue"
                  />
                </div>
                
                <p className="text-sapp-gray mb-4">
                  In 2015, after securing a high-risk diplomatic conference that faced both cyber and physical threats, Raili and Marko decided to combine their expertise officially. They founded SAPP Security with a clear mission: to pioneer integrated security solutions that address the complete threat landscape.
                </p>
                <p className="text-sapp-gray">
                  Today, SAPP Security has grown from two founders with a vision to an international team of security specialists, trusted by organizations worldwide to protect their most valuable assets and operations. Our holistic approach to security continues to set the standard for the industry.
                </p>
              </div>
            </div>
            
            <div className={cn(
              "mt-12 pt-8 border-t border-gray-200 grid grid-cols-1 md:grid-cols-3 gap-8 text-center transition-all duration-700 delay-400",
              storyInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            )}>
              <div>
                <h4 className="text-4xl font-display font-bold text-sapp-dark mb-2">2015</h4>
                <p className="text-sapp-gray">Year founded</p>
              </div>
              <div>
                <h4 className="text-4xl font-display font-bold text-sapp-dark mb-2">27+</h4>
                <p className="text-sapp-gray">Countries served</p>
              </div>
              <div>
                <h4 className="text-4xl font-display font-bold text-sapp-dark mb-2">100%</h4>
                <p className="text-sapp-gray">Integrated approach</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* About SAPP Security Section */}
        <div className="max-w-4xl mx-auto mt-20">
          <Animated animation="fade-up" delay={100}>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-center mb-12 text-sapp-dark">
              <span className="text-sapp-blue">About</span> SAPP Security
            </h2>
          </Animated>

          <div className="space-y-16" ref={contentRef}>
            {/* What We Believe */}
            <div className="space-y-4">
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
            <div className="space-y-6">
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
                These aren't just ideals — they're how we work every day, and why clients trust us with their most sensitive spaces and moments.
              </p>
            </div>

            {/* Our Approach */}
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
    </section>
  );
};

export default About;


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
    <section id="about-us" className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-4xl mx-auto">
          <Animated animation="fade-up" delay={100}>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-center mb-12 text-sapp-dark">
              <span className="text-sapp-blue">About</span> SAPP Security
            </h2>
          </Animated>

          <div className="space-y-16">
            {/* What We Believe */}
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
                Security should be discreet, effective, and grounded in integrity.
              </p>
              <p className={cn(
                "text-lg text-sapp-gray leading-relaxed transition-all duration-700 delay-400",
                inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              )}>
                We believe protection is not about posturing — it's about clarity, competence, and control. Real security works quietly. It fits the environment, reflects the risks, and supports the people tasked with serious decisions.
              </p>
            </div>

            {/* Our Values */}
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
                SAPP is about trust, not tech alone.
              </p>
              <p className={cn(
                "text-lg text-sapp-gray leading-relaxed transition-all duration-700 delay-400",
                inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              )}>
                We operate in environments where discretion matters, where silence protects strategy, and where good decisions depend on clear, honest advice.
              </p>
              
              <div className="mt-8">
                <p className={cn(
                  "text-lg font-medium text-sapp-dark mb-6 transition-all duration-700 delay-500",
                  inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
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

export default AboutUs;

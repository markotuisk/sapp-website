
import { useInView } from 'react-intersection-observer';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/contexts/LanguageContext';
import TranslatedText from '@/components/ui/TranslatedText';
import { Separator } from '@/components/ui/separator';
import { AnimatedText } from '@/components/ui/AnimatedElements';

const Story = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  
  const { t } = useLanguage();
  
  return (
    <section ref={ref} className="py-24 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute w-96 h-96 rounded-full bg-sapp-blue/5 -top-48 -left-48 blur-3xl"></div>
      <div className="absolute w-64 h-64 rounded-full bg-sapp-blue/5 bottom-24 right-24 blur-3xl"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Top section */}
          <div className="bg-sapp-dark rounded-t-2xl overflow-hidden">
            <div className="px-8 py-16 md:px-16 md:py-20">
              <h2 className={cn(
                "text-4xl md:text-5xl font-display font-bold text-white uppercase tracking-tight mb-6 transition-all duration-700",
                inView ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-8"
              )}>
                THE SAPP STORY
              </h2>
              <p className={cn(
                "text-white/80 text-lg md:text-xl max-w-3xl transition-all duration-700 delay-100",
                inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
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
          
          {/* Bottom section */}
          <div className="bg-white rounded-b-2xl shadow-lg p-8 md:p-12 lg:p-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
              <div className={cn(
                "transition-all duration-700 delay-200",
                inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
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
                inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
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
              inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
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
      </div>
    </section>
  );
};

export default Story;

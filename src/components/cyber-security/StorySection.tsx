
import { useInView } from 'react-intersection-observer';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/contexts/LanguageContext';
import { Separator } from '@/components/ui/separator';
import { AnimatedText } from '@/components/ui/AnimatedElements';

const StorySection = () => {
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
          {/* Top section with heading */}
          <div className="text-center mb-16">
            <h2 className={cn(
              "text-3xl md:text-4xl font-display font-bold text-sapp-dark mb-4 transition-all duration-700",
              inView ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-8"
            )}>
              Founders Story
            </h2>
            <p className={cn(
              "text-sapp-gray text-lg max-w-3xl mx-auto transition-all duration-700 delay-100",
              inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            )}>
              From our origins in counter-espionage to becoming a comprehensive security partner
            </p>
          </div>
          
          {/* Main content */}
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
                SAPP Security brings together versatile backgrounds and security expertise with a vision to converge physical and digital security.
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
                <p className="text-sapp-gray mb-4">
                  Our two founders, Raili and Marko, are native Estonians with a combined 30-years expertise in a global technical security industry based in the UK. With their practical evidence-led and no-nonsense engagement, they bring fresh perspective to the corporate security function that is often inundated with covert wizardly tales from storytellers.
                </p>
                <p className="text-sapp-gray">
                  The SAPP Founders share a common professional frustration with physical and cyber security in corporations working in silos. As a result, security threats that need expertise from both fields, are left overlooked. Mobile devices in unlocked executive desk drawers, accessible control panels in unsecured boardrooms, incorrectly positioned security cameras and the list goes on.
                </p>
              </div>
              
              <div className={cn(
                "transition-all duration-700 delay-300",
                inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              )}>
                <div className="mb-8">
                  <Separator className="bg-sapp-blue/20 h-0.5 w-16 mb-6" />
                  <AnimatedText 
                    text="Organisations need both physical and digital security. Companies need this equally, so both fields need to break their bubbles, embrace their collaboration and work together."
                    tag="p"
                    className="text-xl font-display font-medium text-sapp-blue"
                  />
                </div>
                
                <p className="text-sapp-gray">
                  The SAPP Vision is to lead by example by creating unique security offering to assist corporations in converging their physical and cyber security.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StorySection;

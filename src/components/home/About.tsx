import { useInView } from 'react-intersection-observer';
import { cn } from '@/lib/utils';
import { Animated, AnimatedText } from '@/components/ui/AnimatedElements';
import { Card, CardContent } from '@/components/ui/card';

const AboutContent = () => {
  const [heroRef, heroInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <div className="min-h-screen">
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
      
      <section id="our-story" className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 text-sapp-dark">Founders Story</h2>
            <p className="text-sapp-gray">We brings together versatile backgrounds and security expertise with a vision to converge physical and digital security</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <img 
                src="/lovable-uploads/7505824c-c5d3-4ba5-b867-ae9d71c13965.png" 
                alt="SAPP Security History" 
                className="rounded-lg shadow-lg w-full"
              />
            </div>
            <div>
              <h3 className="text-xl font-display font-semibold mb-4 text-accent-dark-blue">The SAPP Story</h3>
              <p className="text-sapp-gray mb-4">
                Our two founders, Raili and Marko, are native Estonians with a combined 30-years expertise in the global technical security industry. They share a common professional frustration in corporations where physical and cyber security operate in silos. As a result, security threats requiring both disciplines are left overlooked — mobile devices in unlocked executive desk drawers, accessible control panels in unsecured boardrooms, incorrectly positioned security cameras, and so on.
              </p>
              <p className="text-sapp-gray mb-4">
                Organisations need both physical and digital security. Companies require this equally, so both fields must break their bubbles, embrace collaboration, and work together. The SAPP Vision is to lead by example — creating a unique security offering to assist corporations in converging their physical and cyber security.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 text-sapp-dark">Our Approach</h2>
            <p className="text-sapp-gray">We believe security should be comprehensive, understandable, and tailored to your needs</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-accent-teal/10 rounded-full flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-accent-teal">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-display font-semibold mb-2 text-accent-dark-blue">Comprehensive Protection</h3>
                <p className="text-sapp-gray text-sm">
                  We take a holistic view of security, addressing physical, technical, and cyber vulnerabilities as interconnected aspects of your overall security posture.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-accent-teal/10 rounded-full flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-accent-teal">
                    <path d="M2 12h20"></path>
                    <path d="M12 2v20"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-display font-semibold mb-2 text-accent-dark-blue">Clarity & Transparency</h3>
                <p className="text-sapp-gray text-sm">
                  We believe in demystifying security. Our experts communicate clearly, avoiding jargon and ensuring you understand the solutions we implement.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-accent-teal/10 rounded-full flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-accent-teal">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                    <path d="M12 8v4"></path>
                    <path d="M12 16h.01"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-display font-semibold mb-2 text-accent-dark-blue">Tailored Solutions</h3>
                <p className="text-sapp-gray text-sm">
                  We recognize that every client has unique security needs. Our solutions are customized to address your specific risks, environment, and objectives.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 text-sapp-dark">Our Team</h2>
            <p className="text-sapp-gray">Led by experts with decades of experience in security, technology, and risk management</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card>
              <CardContent className="p-6 text-center">
                <div className="w-24 h-24 rounded-full overflow-hidden mx-auto mb-4">
                  <img 
                    src="/lovable-uploads/team-member-1.jpg" 
                    alt="James Wilson" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-display font-semibold mb-1 text-accent-dark-blue">James Wilson</h3>
                <p className="text-accent-teal text-sm font-medium mb-3">Chief Executive Officer</p>
                <p className="text-sapp-gray text-sm">
                  Former head of technical operations at MI5 with over 20 years of experience in counter-intelligence and security systems integration.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6 text-center">
                <div className="w-24 h-24 rounded-full overflow-hidden mx-auto mb-4">
                  <img 
                    src="/lovable-uploads/team-member-2.jpg" 
                    alt="Sarah Chen" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-display font-semibold mb-1 text-accent-dark-blue">Sarah Chen</h3>
                <p className="text-accent-teal text-sm font-medium mb-3">Chief Technology Officer</p>
                <p className="text-sapp-gray text-sm">
                  Cybersecurity expert with background in developing secure systems for financial institutions and critical infrastructure protection.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6 text-center">
                <div className="w-24 h-24 rounded-full overflow-hidden mx-auto mb-4">
                  <img 
                    src="/lovable-uploads/team-member-3.jpg" 
                    alt="Marcus Johnson" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-display font-semibold mb-1 text-accent-dark-blue">Marcus Johnson</h3>
                <p className="text-accent-teal text-sm font-medium mb-3">Head of Physical Security</p>
                <p className="text-sapp-gray text-sm">
                  Former military specialist with expertise in threat assessment, security system design, and implementation for high-risk environments.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutContent;

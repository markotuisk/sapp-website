
import { AlertTriangle } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import TranslatedText from '@/components/ui/TranslatedText';
import { useInView } from 'react-intersection-observer';
import { cn } from '@/lib/utils';

const SecurityAudits = () => {
  const { t } = useLanguage();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        {/* Hero Section */}
        <section className="pt-36 pb-20 bg-gradient-to-b from-slate-50 to-white relative overflow-hidden">
          <div className="absolute inset-0 bg-cover bg-center opacity-5" 
            style={{ 
              backgroundImage: "url('/lovable-uploads/ccaa80f3-bbe5-46f3-a853-d7007fbff022.png')",
              backgroundBlendMode: "overlay"
            }}
          ></div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <div 
                ref={ref}
                className={cn(
                  "inline-flex items-center justify-center p-3 bg-white rounded-lg shadow-md mb-6 transition-all duration-500",
                  inView ? "opacity-100 scale-100" : "opacity-0 scale-90"
                )}
              >
                <AlertTriangle className="h-8 w-8 text-sapp-blue" />
              </div>
              <h3 
                className={cn(
                  "text-xl md:text-2xl font-display text-sapp-blue mb-4 transition-all duration-500 delay-75",
                  inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                )}
              >
                Certified ISO27001 physical security audits
              </h3>
              <h1 
                className={cn(
                  "text-4xl md:text-5xl font-display font-bold text-sapp-dark mb-6 transition-all duration-500 delay-100",
                  inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                )}
              >
                {t('securityAudits')}
              </h1>
              <p 
                className={cn(
                  "text-sapp-gray text-lg mb-8 transition-all duration-500 delay-200",
                  inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                )}
              >
                These external audits are on-site service visits to objectively evaluate the state of play of the physical and information security processes and technology at your organisation.
              </p>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="relative order-2 md:order-1">
                <div className="absolute -inset-2 bg-sapp-blue/5 rounded-2xl blur-xl"></div>
                <img 
                  src="/lovable-uploads/ccaa80f3-bbe5-46f3-a853-d7007fbff022.png"
                  alt="Security Audit Process" 
                  className="relative z-10 rounded-xl shadow-2xl w-full h-auto object-cover"
                />
              </div>
              <div className="order-1 md:order-2">
                <h2 className="text-2xl md:text-3xl font-display font-bold text-sapp-dark mb-6">
                  Comprehensive Security Audit Services
                </h2>
                <p className="text-sapp-gray mb-6">
                  The objective of our security audit is to detect and identify any potential gaps and oversights providing detailed risk-based recommendations for improvement. We use a methodical approach to ensure all aspects of your security are thoroughly evaluated.
                </p>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start">
                    <AlertTriangle className="h-5 w-5 text-sapp-blue mr-3 mt-0.5" />
                    <span>Physical Security Assessments</span>
                  </li>
                  <li className="flex items-start">
                    <AlertTriangle className="h-5 w-5 text-sapp-blue mr-3 mt-0.5" />
                    <span>Security Systems Testing</span>
                  </li>
                  <li className="flex items-start">
                    <AlertTriangle className="h-5 w-5 text-sapp-blue mr-3 mt-0.5" />
                    <span>Penetration Tests</span>
                  </li>
                  <li className="flex items-start">
                    <AlertTriangle className="h-5 w-5 text-sapp-blue mr-3 mt-0.5" />
                    <span>Compliance Audits</span>
                  </li>
                </ul>
                <Button 
                  size="lg" 
                  className="bg-sapp-blue hover:bg-sapp-blue/90 text-white shadow-lg shadow-sapp-blue/20"
                >
                  <TranslatedText textKey="contactUs" />
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Image Banner Section */}
        <section className="py-16 bg-slate-50">
          <div className="container mx-auto px-4">
            <div className="relative rounded-xl overflow-hidden">
              <img 
                src="/lovable-uploads/234f523c-dec6-4bb9-8b48-d308fc61a7ec.png"
                alt="Security Audit Technology" 
                className="w-full h-64 object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-sapp-dark/70 to-transparent flex items-center">
                <div className="px-10 max-w-lg">
                  <h3 className="text-2xl md:text-3xl font-display font-bold text-white mb-4">
                    Identify Security Vulnerabilities
                  </h3>
                  <p className="text-white/90">
                    Our comprehensive audits help you identify and address security gaps before they can be exploited.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-display font-bold text-sapp-dark mb-6">Ready to improve your security posture?</h2>
            <p className="text-sapp-gray max-w-2xl mx-auto mb-8">
              Our team of security audit experts is ready to help you identify vulnerabilities and enhance your overall security posture.
            </p>
            <Button 
              size="lg" 
              className="bg-sapp-blue hover:bg-sapp-blue/90 text-white shadow-lg shadow-sapp-blue/20"
            >
              <TranslatedText textKey="getInTouch" />
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default SecurityAudits;

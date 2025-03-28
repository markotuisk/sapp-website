
import { Shield } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import TranslatedText from '@/components/ui/TranslatedText';
import { useInView } from 'react-intersection-observer';
import { cn } from '@/lib/utils';

const EventSecurity = () => {
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
        <section className="pt-36 pb-20 bg-gradient-to-b from-slate-50 to-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <div 
                ref={ref}
                className={cn(
                  "inline-flex items-center justify-center p-3 bg-white rounded-lg shadow-md mb-6 transition-all duration-500",
                  inView ? "opacity-100 scale-100" : "opacity-0 scale-90"
                )}
              >
                <Shield className="h-8 w-8 text-sapp-blue" />
              </div>
              <h1 
                className={cn(
                  "text-4xl md:text-5xl font-display font-bold text-sapp-dark mb-6 transition-all duration-500 delay-100",
                  inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                )}
              >
                {t('eventSecurity')}
              </h1>
              <p 
                className={cn(
                  "text-sapp-gray text-lg mb-8 transition-all duration-500 delay-200",
                  inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                )}
              >
                Real-time protection for high-profile confidential meetings and events. We are experienced event security and technical support providers for corporate board and management meetings for over 20 years.
              </p>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div>
                <h2 className="text-2xl md:text-3xl font-display font-bold text-sapp-dark mb-6">
                  Comprehensive Event Security
                </h2>
                <p className="text-sapp-gray mb-6">
                  We provide comprehensive security solutions for corporate events, ensuring confidentiality and protection throughout. Our experienced team has been providing security for board meetings, management meetings, and high-profile corporate events for over two decades.
                </p>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start">
                    <Shield className="h-5 w-5 text-sapp-blue mr-3 mt-0.5" />
                    <span>Board meetings security protocols</span>
                  </li>
                  <li className="flex items-start">
                    <Shield className="h-5 w-5 text-sapp-blue mr-3 mt-0.5" />
                    <span>Results rehearsals confidentiality</span>
                  </li>
                  <li className="flex items-start">
                    <Shield className="h-5 w-5 text-sapp-blue mr-3 mt-0.5" />
                    <span>Strategy planning security</span>
                  </li>
                  <li className="flex items-start">
                    <Shield className="h-5 w-5 text-sapp-blue mr-3 mt-0.5" />
                    <span>Negotiations protection</span>
                  </li>
                </ul>
                <Button 
                  size="lg" 
                  className="bg-sapp-blue hover:bg-sapp-blue/90 text-white shadow-lg shadow-sapp-blue/20"
                >
                  <TranslatedText textKey="contactUs" />
                </Button>
              </div>
              <div className="bg-slate-100 p-8 rounded-xl">
                <h3 className="text-xl font-display font-bold text-sapp-dark mb-4">Third-Party Integrations</h3>
                <p className="text-sapp-gray mb-6">
                  We seamlessly integrate with specialized third-party security providers to ensure comprehensive coverage for your events.
                </p>
                <ul className="space-y-4">
                  <li className="bg-white p-4 rounded-lg shadow-sm">
                    <h4 className="font-semibold text-sapp-dark mb-2">Executive Protection Services</h4>
                    <p className="text-sm text-sapp-gray">Specialized close protection for executives and VIPs during events.</p>
                  </li>
                  <li className="bg-white p-4 rounded-lg shadow-sm">
                    <h4 className="font-semibold text-sapp-dark mb-2">Credentials Verification</h4>
                    <p className="text-sm text-sapp-gray">Advanced identity verification and access control systems.</p>
                  </li>
                  <li className="bg-white p-4 rounded-lg shadow-sm">
                    <h4 className="font-semibold text-sapp-dark mb-2">Technical Security Support</h4>
                    <p className="text-sm text-sapp-gray">Specialized equipment and technical expertise for complex security requirements.</p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-slate-50">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-display font-bold text-sapp-dark mb-6">Ready to secure your next event?</h2>
            <p className="text-sapp-gray max-w-2xl mx-auto mb-8">
              Our team of event security experts is ready to create a tailored security plan for your upcoming corporate events.
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

export default EventSecurity;

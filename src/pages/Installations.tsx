
import { MonitorCheck } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import TranslatedText from '@/components/ui/TranslatedText';
import { useInView } from 'react-intersection-observer';
import { cn } from '@/lib/utils';

const Installations = () => {
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
                <MonitorCheck className="h-8 w-8 text-sapp-blue" />
              </div>
              <h3 
                className={cn(
                  "text-xl md:text-2xl font-display text-sapp-blue mb-4 transition-all duration-500 delay-75",
                  inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                )}
              >
                Cutting-edge security technology
              </h3>
              <h1 
                className={cn(
                  "text-4xl md:text-5xl font-display font-bold text-sapp-dark mb-6 transition-all duration-500 delay-100",
                  inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                )}
              >
                {t('installations')}
              </h1>
              <p 
                className={cn(
                  "text-sapp-gray text-lg mb-8 transition-all duration-500 delay-200",
                  inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                )}
              >
                Our installation services cover a multitude of security systems ranging from CCTV, access control and visitor management systems, speech privacy and sound masking systems, mobile and network security systems.
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
                  Comprehensive Installation Services
                </h2>
                <p className="text-sapp-gray mb-6">
                  We provide end-to-end installation services for a wide range of security technologies. Our experienced team ensures that your security systems are properly installed, configured, and integrated with your existing infrastructure.
                </p>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start">
                    <MonitorCheck className="h-5 w-5 text-sapp-blue mr-3 mt-0.5" />
                    <span>CCTV systems</span>
                  </li>
                  <li className="flex items-start">
                    <MonitorCheck className="h-5 w-5 text-sapp-blue mr-3 mt-0.5" />
                    <span>Access control systems</span>
                  </li>
                  <li className="flex items-start">
                    <MonitorCheck className="h-5 w-5 text-sapp-blue mr-3 mt-0.5" />
                    <span>Speech privacy systems</span>
                  </li>
                  <li className="flex items-start">
                    <MonitorCheck className="h-5 w-5 text-sapp-blue mr-3 mt-0.5" />
                    <span>Network security systems</span>
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
                <h3 className="text-xl font-display font-bold text-sapp-dark mb-4">Third-Party Technology Partners</h3>
                <p className="text-sapp-gray mb-6">
                  We integrate with leading third-party technology providers to ensure your systems are state-of-the-art.
                </p>
                <ul className="space-y-4">
                  <li className="bg-white p-4 rounded-lg shadow-sm">
                    <h4 className="font-semibold text-sapp-dark mb-2">Enterprise security platform integration</h4>
                    <p className="text-sm text-sapp-gray">Seamless integration with leading enterprise security management platforms.</p>
                  </li>
                  <li className="bg-white p-4 rounded-lg shadow-sm">
                    <h4 className="font-semibold text-sapp-dark mb-2">Biometric access control solutions</h4>
                    <p className="text-sm text-sapp-gray">Advanced biometric identification systems for enhanced access security.</p>
                  </li>
                  <li className="bg-white p-4 rounded-lg shadow-sm">
                    <h4 className="font-semibold text-sapp-dark mb-2">AI-powered surveillance analytics</h4>
                    <p className="text-sm text-sapp-gray">Cutting-edge AI systems for intelligent monitoring and threat detection.</p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-slate-50">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-display font-bold text-sapp-dark mb-6">Ready to upgrade your security infrastructure?</h2>
            <p className="text-sapp-gray max-w-2xl mx-auto mb-8">
              Our team of installation experts is ready to help you implement the latest security technologies for your organization.
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

export default Installations;

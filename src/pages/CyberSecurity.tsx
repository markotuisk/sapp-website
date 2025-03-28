
import { Wifi, Server, Database, Lock } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import TranslatedText from '@/components/ui/TranslatedText';
import { useInView } from 'react-intersection-observer';
import { cn } from '@/lib/utils';

const CyberSecurity = () => {
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
                <Wifi className="h-8 w-8 text-sapp-blue" />
              </div>
              <h3 
                className={cn(
                  "text-xl md:text-2xl font-display text-sapp-blue mb-4 transition-all duration-500 delay-75",
                  inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                )}
              >
                Enterprise-grade protection for digital assets
              </h3>
              <h1 
                className={cn(
                  "text-4xl md:text-5xl font-display font-bold text-sapp-dark mb-6 transition-all duration-500 delay-100",
                  inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                )}
              >
                {t('cyberSecurity')}
              </h1>
              <p 
                className={cn(
                  "text-sapp-gray text-lg mb-8 transition-all duration-500 delay-200",
                  inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                )}
              >
                We provide comprehensive cyber security services that protect your organization's digital infrastructure from evolving threats. Our approach focuses on securing IoT devices, which are often the most vulnerable points in corporate networks.
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
                  Comprehensive Cyber Security Services
                </h2>
                <p className="text-sapp-gray mb-6">
                  Our cyber security services are designed to protect your digital assets from a wide range of threats. We focus on securing IoT devices, which are often the most vulnerable points in corporate networks, with 98% being unencrypted and invisible in company networks.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                  <div className="bg-slate-50 p-4 rounded-lg">
                    <Server className="h-6 w-6 text-sapp-blue mb-2" />
                    <h4 className="font-semibold text-sapp-dark mb-1">Network Security</h4>
                    <p className="text-sm text-sapp-gray">Comprehensive protection for your network infrastructure.</p>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-lg">
                    <Lock className="h-6 w-6 text-sapp-blue mb-2" />
                    <h4 className="font-semibold text-sapp-dark mb-1">Data Protection</h4>
                    <p className="text-sm text-sapp-gray">Robust encryption and data security solutions.</p>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-lg">
                    <Database className="h-6 w-6 text-sapp-blue mb-2" />
                    <h4 className="font-semibold text-sapp-dark mb-1">Cloud Security</h4>
                    <p className="text-sm text-sapp-gray">Secure cloud infrastructure and applications.</p>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-lg">
                    <Wifi className="h-6 w-6 text-sapp-blue mb-2" />
                    <h4 className="font-semibold text-sapp-dark mb-1">IoT Security</h4>
                    <p className="text-sm text-sapp-gray">Protection for Internet of Things devices.</p>
                  </div>
                </div>
                <Button 
                  size="lg" 
                  className="bg-sapp-blue hover:bg-sapp-blue/90 text-white shadow-lg shadow-sapp-blue/20"
                >
                  <TranslatedText textKey="contactUs" />
                </Button>
              </div>
              <div className="bg-slate-100 p-8 rounded-xl">
                <h3 className="text-xl font-display font-bold text-sapp-dark mb-4">Third-Party Security Solutions</h3>
                <p className="text-sapp-gray mb-6">
                  We partner with industry-leading third-party security providers to offer complete protection.
                </p>
                <ul className="space-y-4">
                  <li className="bg-white p-4 rounded-lg shadow-sm">
                    <h4 className="font-semibold text-sapp-dark mb-2">Enterprise-grade SOC services</h4>
                    <p className="text-sm text-sapp-gray">24/7 Security Operations Center monitoring and response capabilities.</p>
                  </li>
                  <li className="bg-white p-4 rounded-lg shadow-sm">
                    <h4 className="font-semibold text-sapp-dark mb-2">Managed detection and response (MDR)</h4>
                    <p className="text-sm text-sapp-gray">Advanced threat detection and incident response services.</p>
                  </li>
                  <li className="bg-white p-4 rounded-lg shadow-sm">
                    <h4 className="font-semibold text-sapp-dark mb-2">Digital forensics capabilities</h4>
                    <p className="text-sm text-sapp-gray">Expert digital forensics for incident investigation and recovery.</p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-slate-50">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-display font-bold text-sapp-dark mb-6">Ready to enhance your cyber security?</h2>
            <p className="text-sapp-gray max-w-2xl mx-auto mb-8">
              Our team of cyber security experts is ready to help you protect your digital assets from evolving threats.
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

export default CyberSecurity;

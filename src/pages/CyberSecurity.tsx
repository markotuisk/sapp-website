
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
        <section className="pt-36 pb-20 bg-gradient-to-b from-slate-50 to-white relative overflow-hidden">
          <div className="absolute inset-0 bg-cover bg-center opacity-5" 
            style={{ 
              backgroundImage: "url('/lovable-uploads/234f523c-dec6-4bb9-8b48-d308fc61a7ec.png')",
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
              <div className="order-2 md:order-1">
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
              <div className="relative order-1 md:order-2">
                <div className="absolute -inset-2 bg-sapp-blue/5 rounded-2xl blur-xl"></div>
                <img 
                  src="/lovable-uploads/234f523c-dec6-4bb9-8b48-d308fc61a7ec.png"
                  alt="Cyber Security Services" 
                  className="relative z-10 rounded-xl shadow-2xl w-full h-auto object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Features with Images Section */}
        <section className="py-16 bg-slate-50">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-display font-bold text-sapp-dark mb-12 text-center">
              Comprehensive Digital Protection
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white rounded-xl shadow-md overflow-hidden group">
                <div className="h-48 overflow-hidden">
                  <img 
                    src="/lovable-uploads/ccaa80f3-bbe5-46f3-a853-d7007fbff022.png"
                    alt="Threat Detection" 
                    className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-display font-bold text-sapp-dark mb-3">Threat Detection & Response</h3>
                  <p className="text-sapp-gray text-sm">
                    Our advanced threat detection systems identify and neutralize cyber threats before they can impact your business.
                  </p>
                </div>
              </div>
              <div className="bg-white rounded-xl shadow-md overflow-hidden group">
                <div className="h-48 overflow-hidden">
                  <img 
                    src="/lovable-uploads/fc9a9c2e-5129-4b70-89e2-7617a4e5578a.png"
                    alt="Data Encryption" 
                    className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-display font-bold text-sapp-dark mb-3">Data Encryption & Protection</h3>
                  <p className="text-sapp-gray text-sm">
                    We implement robust encryption protocols to ensure your sensitive data remains secure at all times.
                  </p>
                </div>
              </div>
              <div className="bg-white rounded-xl shadow-md overflow-hidden group">
                <div className="h-48 overflow-hidden">
                  <img 
                    src="/lovable-uploads/85184084-bca0-497c-8950-601f002a465f.png"
                    alt="Security Training" 
                    className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-display font-bold text-sapp-dark mb-3">Security Awareness Training</h3>
                  <p className="text-sapp-gray text-sm">
                    We provide comprehensive security training to help your team recognize and avoid potential security threats.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-white">
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

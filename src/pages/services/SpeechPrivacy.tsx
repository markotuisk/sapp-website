
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowLeft, Volume2, ShieldOff, Headphones, Wifi, Layers } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Animated } from '@/components/ui/AnimatedElements';
import ContactFormDialog from '@/components/ui/ContactFormDialog';
import { useDebugContext } from '@/contexts/DebugContext';
import { DebugInfo } from '@/components/debug';
import QuoteCard from '@/components/ui/QuoteCard';
import NavigationButtons from '@/components/services/speech-privacy/NavigationButtons';
import HeroSection from '@/components/services/speech-privacy/HeroSection';
import BenefitsSection from '@/components/services/speech-privacy/BenefitsSection';
import SoundmaskingExplainedSection from '@/components/services/speech-privacy/SoundmaskingExplainedSection';
import CTASection from '@/components/services/speech-privacy/CTASection';

const SpeechPrivacy = () => {
  const [showContactForm, setShowContactForm] = useState(false);
  const { isDebugMode } = useDebugContext();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleContactClick = () => {
    setShowContactForm(true);
  };

  return (
    <div className="min-h-screen">
      <Helmet>
        <title>Speech Privacy & Soundmasking | SAPP Security</title>
        <meta name="description" content="Protect sensitive conversations with advanced speech privacy and soundmasking solutions from SAPP Security." />
        <meta name="keywords" content="speech privacy, soundmasking, acoustic security, confidential conversations, anti-eavesdropping" />
      </Helmet>
      <Navbar />
      
      <main className="pt-20">
        <HeroSection onContactClick={handleContactClick} />
        
        <SoundmaskingExplainedSection />
        
        <BenefitsSection />
        
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <Animated animation="fade-up">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-display font-bold mb-8 text-sapp-dark">The Challenge</h2>
                <p className="text-lg text-sapp-gray mb-6">
                  Even the best-insulated walls can't fully protect against the clarity of human speech. Whether it's a private consultation, 
                  a boardroom strategy meeting, or a personal phone call, speech can travel—unintentionally reaching ears it was never meant for. 
                  Modern architecture's love of glass, hard surfaces, and open-plan designs only worsens this risk.
                </p>
                
                <h3 className="text-xl font-display font-bold mb-4 text-sapp-dark mt-10">Two Key Eavesdropping Threats:</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                  <Card className="p-6 border border-gray-100 hover:shadow-lg transition-all bg-gradient-to-br from-slate-50 to-white">
                    <h4 className="text-lg font-semibold mb-2 text-sapp-dark">Casual Listening</h4>
                    <p className="text-sapp-gray">Where someone overhears unintentionally or out of curiosity.</p>
                  </Card>
                  <Card className="p-6 border border-gray-100 hover:shadow-lg transition-all bg-gradient-to-br from-slate-50 to-white">
                    <h4 className="text-lg font-semibold mb-2 text-sapp-dark">Intentional Listening</h4>
                    <p className="text-sapp-gray">Where someone actively tries to listen in, potentially for malicious reasons.</p>
                  </Card>
                </div>
                <p className="text-sapp-gray italic">
                  Both can compromise privacy, confidentiality, and your organisation's reputation.
                </p>
              </div>
            </Animated>
          </div>
        </section>
        
        <section className="py-20 bg-gradient-to-r from-slate-50 to-white">
          <div className="container mx-auto px-4">
            <Animated animation="fade-up">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-display font-bold mb-8 text-sapp-dark">Speech Privacy vs. Soundmasking: Understanding the Difference</h2>
                <p className="text-lg text-sapp-gray mb-8">
                  A critical distinction is that speech privacy is the ultimate goal—the assurance that conversations cannot be understood beyond a controlled area. 
                  Soundmasking is a tool to help achieve that goal. While soundmasking systems create a controlled ambient noise to make speech less intelligible, 
                  true speech privacy often requires a combination of acoustic design, secure layouts, and behavioural protocols.
                </p>
                
                <div className="bg-white rounded-xl p-8 shadow-sm mb-10 border border-gray-100">
                  <h3 className="text-xl font-display font-bold mb-4 text-sapp-dark">In simple terms:</h3>
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <div className="bg-sapp-blue/10 rounded-full p-2 mr-4">
                        <ShieldOff className="h-6 w-6 text-sapp-blue" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-sapp-dark mb-1">Speech Privacy:</h4>
                        <p className="text-sapp-gray">The desired state where confidential speech is protected from unintended listeners.</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="bg-sapp-blue/10 rounded-full p-2 mr-4">
                        <Volume2 className="h-6 w-6 text-sapp-blue" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-sapp-dark mb-1">Soundmasking:</h4>
                        <p className="text-sapp-gray">A sophisticated method to assist in achieving speech privacy.</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <p className="text-sapp-gray bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
                  While soundmasking greatly enhances privacy, high-security environments may need a layered approach, integrating physical barriers and electronic countermeasures.
                </p>
              </div>
            </Animated>
          </div>
        </section>
        
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <Animated animation="fade-up">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-display font-bold mb-8 text-sapp-dark">The Solution: Smart Soundmasking Systems</h2>
                <p className="text-lg text-sapp-gray mb-8">
                  Soundmasking offers a subtle but powerful way to safeguard conversations. Unlike intrusive white noise, 
                  soundmasking systems are precisely engineered to blend into the background—covering speech frequencies 
                  and ensuring conversations stay private.
                </p>
                
                <h3 className="text-xl font-display font-bold mb-4 text-sapp-dark">How It Works</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                  <Card className="p-6 border border-gray-100 hover:shadow-md transition-all bg-gradient-to-b from-white to-slate-50">
                    <div className="rounded-full bg-sapp-blue/10 w-12 h-12 flex items-center justify-center mb-4">
                      <Layers className="h-6 w-6 text-sapp-blue" />
                    </div>
                    <h4 className="text-lg font-semibold mb-2 text-sapp-dark">Consistent Coverage</h4>
                    <p className="text-sapp-gray text-sm">Delivers a tailored sound environment that makes speech unintelligible at a distance.</p>
                  </Card>
                  <Card className="p-6 border border-gray-100 hover:shadow-md transition-all bg-gradient-to-b from-white to-slate-50">
                    <div className="rounded-full bg-sapp-blue/10 w-12 h-12 flex items-center justify-center mb-4">
                      <Wifi className="h-6 w-6 text-sapp-blue" />
                    </div>
                    <h4 className="text-lg font-semibold mb-2 text-sapp-dark">Smart Adjustment</h4>
                    <p className="text-sapp-gray text-sm">Advanced technology adapts to the room's acoustics and fluctuating noise levels for consistent results.</p>
                  </Card>
                  <Card className="p-6 border border-gray-100 hover:shadow-md transition-all bg-gradient-to-b from-white to-slate-50">
                    <div className="rounded-full bg-sapp-blue/10 w-12 h-12 flex items-center justify-center mb-4">
                      <Headphones className="h-6 w-6 text-sapp-blue" />
                    </div>
                    <h4 className="text-lg font-semibold mb-2 text-sapp-dark">Flexible Configurations</h4>
                    <p className="text-sapp-gray text-sm">Systems are customised for entire floors, key rooms, or sensitive zones.</p>
                  </Card>
                </div>
              </div>
            </Animated>
          </div>
        </section>
        
        <section className="py-16">
          <QuoteCard
            quote="In today's open workspaces, speech privacy isn't just about confidentiality—it's about creating an environment where sensitive discussions can happen naturally and securely, without concern for who might be listening."
            author="Acoustic Security Director"
            position="SAPP Security"
          />
        </section>
        
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <Animated animation="fade-up">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-display font-bold mb-8 text-sapp-dark">Why Choose SAPP Security?</h2>
                <p className="text-lg text-sapp-gray mb-10">
                  At SAPP Security, we go beyond simple installations. We craft integrated speech privacy strategies combining 
                  acoustic science with our security expertise. From the initial assessment to precision implementation, 
                  we ensure your private conversations remain protected.
                </p>
                
                <div className="bg-slate-50 rounded-xl p-8 border border-gray-100 shadow-sm mb-10">
                  <h3 className="text-xl font-display font-bold mb-6 text-sapp-dark">Key Benefits</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="text-sapp-blue font-bold text-xl">•</span>
                        <h4 className="font-semibold text-sapp-dark">Stronger Privacy</h4>
                      </div>
                      <p className="text-sapp-gray text-sm">Ensures confidential discussions stay private.</p>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="text-sapp-blue font-bold text-xl">•</span>
                        <h4 className="font-semibold text-sapp-dark">Increased Comfort</h4>
                      </div>
                      <p className="text-sapp-gray text-sm">Reduces distractions and creates a more productive environment.</p>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="text-sapp-blue font-bold text-xl">•</span>
                        <h4 className="font-semibold text-sapp-dark">Compliance Assurance</h4>
                      </div>
                      <p className="text-sapp-gray text-sm">Supports privacy regulations across various industries.</p>
                    </div>
                  </div>
                </div>
                
                <p className="text-lg text-sapp-gray">
                  Whether it's boardroom talks, medical disclosures, or legal consultations, our Speech Privacy & Soundmasking 
                  services provide essential protection in today's interconnected world.
                </p>
              </div>
            </Animated>
          </div>
        </section>
        
        <CTASection onRequestConsultation={handleContactClick} />

        <section className="py-8 bg-white">
          <div className="container mx-auto px-4">
            <NavigationButtons />
          </div>
        </section>
      </main>
      
      <ContactFormDialog 
        open={showContactForm} 
        onOpenChange={setShowContactForm}
        defaultMessage="I'm interested in learning more about Speech Privacy & Soundmasking solutions."
        serviceName="Speech Privacy & Soundmasking"
      />
      
      <Footer />
    </div>
  );
};

export default SpeechPrivacy;

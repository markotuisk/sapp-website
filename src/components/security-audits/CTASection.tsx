
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import TranslatedText from '@/components/ui/TranslatedText';
import ContactFormDialog from '@/components/ui/ContactFormDialog';
import { Animated } from '@/components/ui/AnimatedElements';

const CTASection = () => {
  const [contactDialogOpen, setContactDialogOpen] = useState(false);

  return (
    <section className="py-16 bg-slate-50">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-screen-xl text-center">
        <Animated animation="fade-up">
          <h3 
            className="text-[19px] leading-[77px] tracking-[3.62px] text-sapp-blue font-medium uppercase mb-4"
          >
            GET STARTED
          </h3>
        </Animated>
        <h2 className="text-3xl font-display font-bold text-sapp-dark mb-6">Ready to improve your security posture?</h2>
        <p className="text-sapp-gray max-w-2xl mx-auto mb-8">
          Our team of security audit experts is ready to help you identify vulnerabilities and enhance your overall security posture.
        </p>
        <Button 
          size="lg" 
          className="bg-sapp-blue hover:bg-sapp-blue/90 text-white shadow-lg shadow-sapp-blue/20"
          onClick={() => setContactDialogOpen(true)}
        >
          <TranslatedText textKey="getInTouch" />
        </Button>
        
        <ContactFormDialog 
          open={contactDialogOpen} 
          onOpenChange={setContactDialogOpen}
          defaultMessage="I'm interested in learning more about your security audit services and would like to discuss how SAPP Security can help improve our organisation's security posture."
          serviceName="Security Audits"
        />
      </div>
    </section>
  );
};

export default CTASection;

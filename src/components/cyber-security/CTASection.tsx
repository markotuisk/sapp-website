
import { Button } from '@/components/ui/button';
import TranslatedText from '@/components/ui/TranslatedText';
import { useState } from 'react';
import ContactFormDialog from '@/components/ui/ContactFormDialog';

const CTASection = () => {
  const [contactDialogOpen, setContactDialogOpen] = useState(false);

  return (
    <section className="py-16 md:py-24 bg-gradient-to-r from-accent-dark-blue to-sapp-blue text-white">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
            Enhance Your Cyber Security Infrastructure
          </h2>
          
          <p className="text-white/90 max-w-2xl mx-auto mb-8">
            Our team of experts is ready to help you protect your digital assets with comprehensive cyber security solutions.
          </p>
          
          <Button 
            variant="outline" 
            size="lg" 
            className="bg-white text-sapp-blue hover:bg-white/90 border-0 shadow-lg hover:scale-105 transition-all duration-200"
            onClick={() => setContactDialogOpen(true)}
          >
            <TranslatedText textKey="getInTouch" />
          </Button>

          <ContactFormDialog 
            open={contactDialogOpen}
            onOpenChange={setContactDialogOpen}
            defaultMessage="I'm interested in discussing cyber security solutions for my organization."
            serviceName="Cyber Security"
          />
        </div>
      </div>
    </section>
  );
};

export default CTASection;

import { Button } from '@/components/ui/button';
import TranslatedText from '@/components/ui/TranslatedText';

const CTASection = () => {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-r from-sapp-blue to-blue-600 text-white">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-block bg-sapp-blue/10 rounded-full px-4 py-1.5 mb-4">
            <h3 className="text-sm font-medium text-sapp-blue tracking-wider">Get Started</h3>
          </div>
          
          <h2 className="text-3xl font-display font-bold text-sapp-dark mb-6">
            Ready to enhance your cyber security?
          </h2>
          
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
      </div>
    </section>
  );
};

export default CTASection;

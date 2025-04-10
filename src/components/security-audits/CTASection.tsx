
import { Button } from '@/components/ui/button';
import TranslatedText from '@/components/ui/TranslatedText';
import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogCancel, AlertDialogAction } from '@/components/ui/alert-dialog';

const CTASection = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-display font-bold text-sapp-dark mb-6">Ready to improve your security posture?</h2>
        <p className="text-sapp-gray max-w-2xl mx-auto mb-8">
          Our team of security audit experts is ready to help you identify vulnerabilities and enhance your overall security posture.
        </p>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button 
              size="lg" 
              className="bg-sapp-blue hover:bg-sapp-blue/90 text-white shadow-lg shadow-sapp-blue/20"
            >
              <TranslatedText textKey="getInTouch" />
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent className="bg-white">
            <AlertDialogHeader>
              <AlertDialogTitle>Contact Our Security Audit Team</AlertDialogTitle>
              <AlertDialogDescription>
                Fill out the form below to request information about our security audit services.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <div className="py-4">
              <form className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="name2" className="text-sm font-medium">Full Name</label>
                    <input id="name2" className="w-full p-2 border border-gray-300 rounded-md" />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="company2" className="text-sm font-medium">Company</label>
                    <input id="company2" className="w-full p-2 border border-gray-300 rounded-md" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label htmlFor="email2" className="text-sm font-medium">Email</label>
                  <input id="email2" type="email" className="w-full p-2 border border-gray-300 rounded-md" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="message2" className="text-sm font-medium">Message</label>
                  <textarea id="message2" rows={4} className="w-full p-2 border border-gray-300 rounded-md"></textarea>
                </div>
              </form>
            </div>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction className="bg-sapp-blue hover:bg-sapp-blue/90 text-white">Send Request</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </section>
  );
};

export default CTASection;

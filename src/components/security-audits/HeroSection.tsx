
import { useInView } from 'react-intersection-observer';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import TranslatedText from '@/components/ui/TranslatedText';
import { Link } from 'react-router-dom';
import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogCancel, AlertDialogAction, AlertDialogTrigger } from '@/components/ui/alert-dialog';

const HeroSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-b from-white to-slate-50">
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col items-center justify-center text-center">
          <h1 
            className={cn(
              "text-4xl md:text-5xl lg:text-6xl font-display font-bold text-sapp-dark mb-6 transition-all duration-500 delay-100 leading-tight",
              inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            )}
            ref={ref}
          >
            Certified <span className="text-sapp-blue">targeted</span> and <span className="text-sapp-blue">comprehensive</span><br /> 
            physical security <span className="text-sapp-blue">audits</span>
          </h1>
          <p 
            className={cn(
              "text-sapp-gray text-lg md:text-xl mb-8 transition-all duration-500 delay-200 max-w-3xl mx-auto",
              inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            )}
          >
            Helping you to comply with international best practises and improve your information security resilience
          </p>
          
          <div 
            className={cn(
              "flex flex-col sm:flex-row items-center justify-center gap-4 transition-all duration-500 delay-300",
              inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            )}
          >
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button 
                  size="lg" 
                  className="bg-sapp-blue hover:bg-sapp-blue/90 text-white shadow-lg shadow-sapp-blue/20 w-full sm:w-auto transition-all duration-300 group relative overflow-hidden"
                >
                  <span className="relative z-10 transition-transform duration-300 group-hover:scale-110">
                    <TranslatedText textKey="exploreServices" />
                  </span>
                  <span className="absolute inset-0 bg-gradient-to-r from-sapp-dark to-sapp-blue opacity-0 transition-opacity duration-300 group-hover:opacity-100"></span>
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
                        <label htmlFor="name" className="text-sm font-medium">Full Name</label>
                        <input id="name" className="w-full p-2 border border-gray-300 rounded-md" />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="company" className="text-sm font-medium">Company</label>
                        <input id="company" className="w-full p-2 border border-gray-300 rounded-md" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium">Email</label>
                      <input id="email" type="email" className="w-full p-2 border border-gray-300 rounded-md" />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="message" className="text-sm font-medium">Message</label>
                      <textarea id="message" rows={4} className="w-full p-2 border border-gray-300 rounded-md"></textarea>
                    </div>
                  </form>
                </div>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction className="bg-sapp-blue hover:bg-sapp-blue/90 text-white">Send Request</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>

            <Button 
              variant="outline" 
              size="lg" 
              className="border-sapp-dark text-sapp-dark hover:bg-sapp-dark/10 w-full sm:w-auto transition-all duration-300 group relative overflow-hidden"
              asChild
            >
              <Link to="/#contact">
                <span className="relative z-10 transition-transform duration-300 group-hover:scale-110 group-hover:text-white">
                  <TranslatedText textKey="contactUs" />
                </span>
                <span className="absolute inset-0 bg-gradient-to-r from-sapp-dark to-sapp-blue opacity-0 transition-opacity duration-300 group-hover:opacity-100"></span>
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;


import { FileSearch, ArrowLeft } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';
import { cn } from '@/lib/utils';

const SecureTechnology = () => {
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
              backgroundImage: "url('/lovable-uploads/ccaa80f3-bbe5-46f3-a853-d7007fbff022.png')",
              backgroundBlendMode: "overlay"
            }}
          ></div>
          
          <div className="container mx-auto px-4 relative z-10">
            <Link to="/event-security" className="inline-flex items-center text-sapp-blue hover:underline mb-6">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Event Security
            </Link>
            
            <div className="max-w-4xl mx-auto">
              <div 
                ref={ref}
                className={cn(
                  "inline-flex items-center justify-center p-3 bg-white rounded-lg shadow-md mb-6 transition-all duration-500",
                  inView ? "opacity-100 scale-100" : "opacity-0 scale-90"
                )}
              >
                <FileSearch className="h-8 w-8 text-sapp-blue" />
              </div>
              <h1 
                className={cn(
                  "text-4xl md:text-5xl font-display font-bold text-sapp-dark mb-6 transition-all duration-500 delay-100",
                  inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                )}
              >
                Secure Technology
              </h1>
              <p 
                className={cn(
                  "text-sapp-gray text-lg md:text-xl mb-8 transition-all duration-500 delay-200",
                  inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                )}
              >
                Companies typically use a range of communications technology at most of their sensitive events. From security perspective, this leaves them vulnerable to an array of cyber and espionage attacks. Our Event Security service includes the detailed audit of all technology that is used at a sensitive meeting with recommendations for more secure alternatives.
              </p>
            </div>
          </div>
        </section>

        {/* Content Section - Placeholder */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-display font-bold text-sapp-dark mb-6">
                Secure Communications Technology
              </h2>
              <p className="text-sapp-gray mb-6">
                Detailed content about secure technology solutions will be placed here. This is a placeholder for the full service description.
              </p>
              
              <div className="mt-12">
                <Link to="/event-security">
                  <Button 
                    className="bg-sapp-blue hover:bg-sapp-blue/90 text-white"
                  >
                    <ArrowLeft className="mr-2 h-4 w-4" /> Back to Event Security Services
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default SecureTechnology;

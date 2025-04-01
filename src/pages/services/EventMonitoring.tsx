
import { MonitorCheck, ArrowLeft } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';
import { cn } from '@/lib/utils';

const EventMonitoring = () => {
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
              backgroundImage: "url('/lovable-uploads/85184084-bca0-497c-8950-601f002a465f.png')",
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
                <MonitorCheck className="h-8 w-8 text-sapp-blue" />
              </div>
              <h1 
                className={cn(
                  "text-4xl md:text-5xl font-display font-bold text-sapp-dark mb-6 transition-all duration-500 delay-100",
                  inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                )}
              >
                Event Monitoring
              </h1>
              <p 
                className={cn(
                  "text-sapp-gray text-lg md:text-xl mb-8 transition-all duration-500 delay-200",
                  inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                )}
              >
                Live sensitive meetings are usually insufficiently protected against corporate espionage and other information gatherers. Real-time technical and physical monitoring should be a standard business process at any confidential, restricted or sensitive meeting. Event monitoring also includes the incident management service ensuring swift and professional handling of a potentially embarrassing situation avoiding a potential crisis and reputational damage.
              </p>
            </div>
          </div>
        </section>

        {/* Content Section - Placeholder */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-display font-bold text-sapp-dark mb-6">
                Advanced Event Monitoring Solutions
              </h2>
              <p className="text-sapp-gray mb-6">
                Detailed content about event monitoring services will be placed here. This is a placeholder for the full service description.
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

export default EventMonitoring;

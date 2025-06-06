
import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { PublicLayout } from '@/components/layout/PublicLayout';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowLeft, Shield, Search, Monitor, Wifi } from 'lucide-react';

const ServiceNavigator = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const services = [
    {
      title: "Security Audits",
      description: "Comprehensive security assessments and vulnerability testing",
      href: "/security-audits",
      icon: Shield
    },
    {
      title: "Event Security", 
      description: "Professional security services for corporate events",
      href: "/event-security",
      icon: Monitor
    },
    {
      title: "Installations",
      description: "Security system installations and deployments",
      href: "/installations", 
      icon: Search
    },
    {
      title: "Cyber Security",
      description: "Digital security solutions and threat protection",
      href: "/cyber-security",
      icon: Wifi
    }
  ];

  return (
    <div className="min-h-screen">
      <Helmet>
        <title>Service Navigator | SAPP Security</title>
        <meta 
          name="description" 
          content="Navigate through SAPP Security's comprehensive range of security services and solutions." 
        />
        <link rel="canonical" href="https://www.sappsecurity.com/service-navigator" />
      </Helmet>
      <PublicLayout>
        <section className="py-16 bg-slate-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h1 className="text-4xl font-display font-bold text-sapp-dark mb-4">
                  Service Navigator
                </h1>
                <p className="text-sapp-gray text-lg">
                  Find the right security solution for your organisation
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {services.map((service, index) => {
                  const IconComponent = service.icon;
                  return (
                    <Link
                      key={index}
                      to={service.href}
                      className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-200 group"
                    >
                      <div className="flex items-start space-x-4">
                        <div className="flex-shrink-0">
                          <IconComponent className="h-8 w-8 text-sapp-blue" />
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold text-sapp-dark mb-2 group-hover:text-sapp-blue transition-colors">
                            {service.title}
                          </h3>
                          <p className="text-sapp-gray">
                            {service.description}
                          </p>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
              
              <div className="text-center">
                <Button variant="outline" asChild>
                  <Link to="/">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to Homepage
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </PublicLayout>
    </div>
  );
};

export default ServiceNavigator;


import { Shield, Calendar, FileText, Users, CalendarCheck, ShieldCheck, MonitorCheck, FileSearch, FileLock, ArrowLeft, ArrowRight } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import TranslatedText from '@/components/ui/TranslatedText';
import { useInView } from 'react-intersection-observer';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import ServiceCard from '@/components/ui/ServiceCard';
import { Card } from '@/components/ui/card';

const EventSecurity = () => {
  const { t } = useLanguage();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [openDialog, setOpenDialog] = useState<string | null>(null);
  const [dialogStep, setDialogStep] = useState<'form' | 'preview'>('form');
  const [formData, setFormData] = useState({
    name: '',
    organisation: '',
    email: '',
    phone: '',
    notes: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Email validation
    if (!formData.email.includes('@') || !formData.email.includes('.')) {
      toast.error('Please enter a valid email address');
      return;
    }
    
    // Move to preview step
    setDialogStep('preview');
  };
  
  const handleSendEmail = () => {
    // Create mailto link with formatted body
    const subject = `Enquiry about ${openDialog} Event Security Services`;
    const body = `
Name: ${formData.name}
Organisation: ${formData.organisation}
Email: ${formData.email}
Phone: ${formData.phone}
Service: ${openDialog}
${formData.notes ? `\nAdditional Notes:\n${formData.notes}` : ''}
    `;
    
    // Open email client
    window.location.href = `mailto:contact@sappsecurity.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    
    // Show success message
    toast.success('Your email client should open shortly with your request details.');
    
    // Reset form and close dialog
    setFormData({ name: '', organisation: '', email: '', phone: '', notes: '' });
    setDialogStep('form');
    setOpenDialog(null);
  };

  const handleBack = () => {
    setDialogStep('form');
  };

  const handleCancel = () => {
    setDialogStep('form');
    setOpenDialog(null);
    setFormData({ name: '', organisation: '', email: '', phone: '', notes: '' });
  };

  const serviceDetails = [
    {
      title: "Venue Security Audits",
      description: "Venues for sensitive and high-profile events typically have weak security. Our audits ensure minimum security measures are in place and your organisation's information remains protected.",
      href: "/services/venue-security-audits",
      imagePath: "/lovable-uploads/fc9a9c2e-5129-4b70-89e2-7617a4e5578a.png"
    },
    {
      title: "Event Monitoring",
      description: "Real-time technical and physical monitoring for confidential meetings, with incident management to handle potential security breaches swiftly and professionally.",
      href: "/services/event-monitoring",
      imagePath: "/lovable-uploads/85184084-bca0-497c-8950-601f002a465f.png"
    },
    {
      title: "Secure Technology",
      description: "Comprehensive audit of all technology used at sensitive meetings with recommendations for more secure alternatives to protect against cyber and espionage attacks.",
      href: "/services/secure-technology",
      imagePath: "/lovable-uploads/ccaa80f3-bbe5-46f3-a853-d7007fbff022.png"
    },
    {
      title: "Close Protection",
      description: "Professional close protection services for larger restricted events like AGMs and high-profile executives, especially at venues without on-site security.",
      href: "/services/close-protection",
      imagePath: "/lovable-uploads/234f523c-dec6-4bb9-8b48-d308fc61a7ec.png"
    }
  ];

  const handleServiceLearnMore = (serviceTitle: string) => {
    setOpenDialog(serviceTitle);
    setDialogStep('form');
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        {/* Section 1: Hero Section with WHAT - Updated with solid color background */}
        <section className="pt-36 pb-20 bg-slate-100 relative overflow-hidden">
          <div 
            className="container mx-auto px-4 relative z-10"
            ref={ref}
          >
            <div className="max-w-4xl mx-auto text-center">
              <h1 
                className={cn(
                  "text-4xl md:text-5xl lg:text-6xl font-display font-bold text-sapp-dark mb-6 transition-all duration-500 delay-100 leading-tight",
                  inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                )}
              >
                Real-time protection for high-profile confidential meetings and events
              </h1>
              <p 
                className={cn(
                  "text-sapp-gray text-lg md:text-xl mb-8 transition-all duration-500 delay-200 max-w-3xl mx-auto",
                  inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                )}
              >
                Specialised executive-level Event Security and technical support provider protecting corporate board and management meetings. SAPP Security is experienced in protecting management and board meetings, results rehearsals, sports events, brainstorming and strategy planning meetings with technical security for 20 years.
              </p>
            </div>
          </div>
        </section>

        {/* Section 2: WHY - The Problem & Solution */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="flex flex-col justify-center">
                <h2 className="text-2xl md:text-3xl font-display font-bold text-sapp-dark mb-6">
                  Why Event Security Matters
                </h2>
                <p className="text-sapp-gray mb-6">
                  Protect any meetings or events that are classified confidential, restricted or sensitive with real-time monitoring as live discussions are most vulnerable to potential espionage attacks. Information gatherers always target the weakest link in the organisation and sensitive strategic meetings are usually an easy choice.
                </p>
                <p className="text-sapp-gray mb-6">
                  Public areas and hotels are often booked in advance advising the competition where organisation is vulnerable. Unauthorised surveillance devices can be planted days before business takes control of the rooms. Hotel staff can be easily persuaded to help gather sensitive information and the level of hotel security is usually low.
                </p>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start">
                    <Shield className="h-5 w-5 text-sapp-blue mr-3 mt-0.5" />
                    <span>Board meetings security protocols</span>
                  </li>
                  <li className="flex items-start">
                    <Calendar className="h-5 w-5 text-sapp-blue mr-3 mt-0.5" />
                    <span>Results rehearsals confidentiality</span>
                  </li>
                  <li className="flex items-start">
                    <FileText className="h-5 w-5 text-sapp-blue mr-3 mt-0.5" />
                    <span>Strategy planning security</span>
                  </li>
                  <li className="flex items-start">
                    <Users className="h-5 w-5 text-sapp-blue mr-3 mt-0.5" />
                    <span>Negotiations protection</span>
                  </li>
                </ul>
              </div>
              <div className="relative">
                <div className="absolute -inset-2 bg-sapp-blue/5 rounded-2xl blur-xl"></div>
                <img 
                  src="/lovable-uploads/fc9a9c2e-5129-4b70-89e2-7617a4e5578a.png"
                  alt="Event Security Services" 
                  className="relative z-10 rounded-xl shadow-2xl w-full h-auto object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Quote Banner - Added animations */}
        <section className="py-16 bg-slate-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-all duration-500 transform hover:-translate-y-1 animate-[fade-in_0.6s_ease-out]">
                  <div className="relative">
                    <div className="absolute -top-6 -left-6 text-gray-200 opacity-30">
                      <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M12 12a1 1 0 0 0 1-1V8.558c0-1.156-.616-1.867-1.823-2.470V5c0-1.105-.87-2-1.948-2H4.292c-1.077 0-1.948.895-1.948 2v6a1 1 0 0 0 1 1h1.5v3l2.948-3H12Z"/>
                      </svg>
                    </div>
                    <blockquote className="text-xl font-display font-medium text-sapp-dark italic">
                      "Security is always seen as too much until the day it's not enough."
                    </blockquote>
                    <div className="mt-4">
                      <div className="text-sapp-blue font-semibold">William H. Webster</div>
                      <div className="text-sapp-gray text-sm">Former FBI Director</div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-all duration-500 transform hover:-translate-y-1 animate-[fade-in_0.6s_ease-out_0.2s]">
                  <div className="relative">
                    <div className="absolute -top-6 -left-6 text-gray-200 opacity-30">
                      <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M12 12a1 1 0 0 0 1-1V8.558c0-1.156-.616-1.867-1.823-2.470V5c0-1.105-.87-2-1.948-2H4.292c-1.077 0-1.948.895-1.948 2v6a1 1 0 0 0 1 1h1.5v3l2.948-3H12Z"/>
                      </svg>
                    </div>
                    <blockquote className="text-xl font-display font-medium text-sapp-dark italic">
                      "It takes 20 years to build a reputation and a few minutes to ruin it."
                    </blockquote>
                    <div className="mt-4">
                      <div className="text-sapp-blue font-semibold">Stephane Nappo</div>
                      <div className="text-sapp-gray text-sm">Global Chief Information Security Officer</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 4: HOW - Our Approach - Updated layout to grid */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="text-3xl font-display font-bold text-sapp-dark mb-6">
                How We Secure Your Events
              </h2>
              <p className="text-sapp-gray">
                Executive level Event Security service delivers specialised and enhanced security at a sensitive event, ensures confidentiality and discretion, being prepared for any eventualities, demonstrating the duty of care to organisation's shareholders, bringing awareness of espionage risks to the staff, and ultimately keeping the reputation and competitive advantage of the organisation.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
              {[
                {
                  number: 1,
                  title: "Assessment",
                  description: "Comprehensive risk assessment of the venue, participants, and event type",
                  delay: 0
                },
                {
                  number: 2,
                  title: "Planning",
                  description: "Tailored security plan including technical audits and personnel requirements",
                  delay: 150
                },
                {
                  number: 3,
                  title: "Implementation",
                  description: "Deployment of security measures and monitoring systems before and during the event",
                  delay: 300
                },
                {
                  number: 4,
                  title: "Monitoring",
                  description: "Real-time surveillance with immediate incident response capabilities",
                  delay: 450
                }
              ].map((step, index) => (
                <div 
                  key={index} 
                  className="bg-white p-6 rounded-lg shadow-md border border-gray-100 transition-all duration-500 transform hover:-translate-y-1 hover:shadow-lg"
                  style={{ 
                    animationDelay: `${step.delay}ms`,
                    animation: "fade-in 0.6s ease-out forwards",
                    opacity: 0
                  }}
                >
                  <div className="bg-sapp-blue/10 w-14 h-14 rounded-full flex items-center justify-center mb-4">
                    <span className="text-sapp-blue font-bold text-xl">{step.number}</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-sapp-dark">{step.title}</h3>
                  <p className="text-gray-600 text-sm">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 5: Service Columns - Updated to remove icons and align buttons */}
        <section className="py-16 bg-slate-50" id="executive-events">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="text-3xl font-display font-bold text-sapp-dark mb-6">
                How We Secure Executive Events
              </h2>
              <p className="text-sapp-gray">
                Comprehensive protection of sensitive corporate meetings
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {serviceDetails.map((service, index) => (
                <ServiceCard 
                  key={index}
                  title={service.title}
                  description={service.description}
                  items={[]}
                  href={service.href}
                  imagePath={service.imagePath}
                  onLearnMoreClick={() => handleServiceLearnMore(service.title)}
                />
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section - Updated routing to /contact */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-display font-bold text-sapp-dark mb-6">Ready to secure your next event?</h2>
            <p className="text-sapp-gray max-w-2xl mx-auto mb-8">
              Our team of event security experts is ready to create a tailored security plan for your upcoming corporate events.
            </p>
            <Link to="/contact">
              <Button 
                size="lg" 
                className="bg-sapp-blue hover:bg-sapp-blue/90 text-white shadow-lg shadow-sapp-blue/20 transition-transform duration-300 hover:scale-105"
              >
                <TranslatedText textKey="getInTouch" />
              </Button>
            </Link>
          </div>
        </section>

        {/* Dialog for service inquiry */}
        <Dialog open={!!openDialog} onOpenChange={(open) => {
          if (!open) {
            setOpenDialog(null);
            setDialogStep('form');
            setFormData({ name: '', organisation: '', email: '', phone: '', notes: '' });
          }
        }}>
          <DialogContent className="sm:max-w-md">
            {dialogStep === 'form' ? (
              <>
                <DialogHeader>
                  <DialogTitle>Request Information: {openDialog}</DialogTitle>
                  <DialogDescription>
                    Please provide your details and we'll contact you with more information about our {openDialog?.toLowerCase()} services.
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Your Name</Label>
                      <Input id="name" value={formData.name} onChange={handleInputChange} required 
                        className="transition-all duration-300 focus:ring-2 focus:ring-sapp-blue focus:border-transparent" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="organisation">Organisation</Label>
                      <Input id="organisation" value={formData.organisation} onChange={handleInputChange} required 
                        className="transition-all duration-300 focus:ring-2 focus:ring-sapp-blue focus:border-transparent" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input id="email" type="email" value={formData.email} onChange={handleInputChange} required 
                        className="transition-all duration-300 focus:ring-2 focus:ring-sapp-blue focus:border-transparent" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input id="phone" value={formData.phone} onChange={handleInputChange} 
                        className="transition-all duration-300 focus:ring-2 focus:ring-sapp-blue focus:border-transparent" />
                    </div>
                  </div>
                  <DialogFooter className="mt-4">
                    <Button type="submit" 
                      className="transition-all duration-300 hover:scale-105 bg-sapp-blue hover:bg-sapp-blue/90">
                      Continue to Preview
                    </Button>
                  </DialogFooter>
                </form>
              </>
            ) : (
              <>
                <DialogHeader>
                  <DialogTitle>Preview Your Request</DialogTitle>
                  <DialogDescription>
                    Please review your information below before sending. Your default email client will open with this information.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 mt-4">
                  <div className="bg-slate-50 p-4 rounded-md border border-gray-100">
                    <h4 className="font-semibold text-sm text-slate-600 mb-2">REQUEST DETAILS</h4>
                    <div className="space-y-2 text-sm">
                      <div className="grid grid-cols-3">
                        <span className="text-slate-500 font-medium">Service:</span>
                        <span className="col-span-2">{openDialog}</span>
                      </div>
                      <div className="grid grid-cols-3">
                        <span className="text-slate-500 font-medium">Name:</span>
                        <span className="col-span-2">{formData.name}</span>
                      </div>
                      <div className="grid grid-cols-3">
                        <span className="text-slate-500 font-medium">Organisation:</span>
                        <span className="col-span-2">{formData.organisation}</span>
                      </div>
                      <div className="grid grid-cols-3">
                        <span className="text-slate-500 font-medium">Email:</span>
                        <span className="col-span-2">{formData.email}</span>
                      </div>
                      {formData.phone && (
                        <div className="grid grid-cols-3">
                          <span className="text-slate-500 font-medium">Phone:</span>
                          <span className="col-span-2">{formData.phone}</span>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="notes">Additional Notes (Optional)</Label>
                    <Textarea 
                      id="notes" 
                      placeholder="Add any specific questions or requirements" 
                      value={formData.notes}
                      onChange={handleInputChange}
                      className="min-h-[100px] border-gray-200 focus-visible:ring-sapp-blue transition-all duration-300"
                    />
                  </div>
                </div>
                <DialogFooter className="flex flex-col sm:flex-row gap-2 mt-4">
                  <Button variant="outline" type="button" onClick={handleBack} className="sm:mr-auto transition-all duration-300 hover:bg-slate-100">
                    Back to Form
                  </Button>
                  <Button variant="outline" type="button" onClick={handleCancel} className="transition-all duration-300 hover:bg-slate-100">
                    Cancel
                  </Button>
                  <Button type="button" onClick={handleSendEmail} className="transition-all duration-300 hover:scale-105 bg-sapp-blue hover:bg-sapp-blue/90">
                    Open Email Client
                  </Button>
                </DialogFooter>
              </>
            )}
          </DialogContent>
        </Dialog>
      </main>
      <Footer />
    </div>
  );
};

export default EventSecurity;

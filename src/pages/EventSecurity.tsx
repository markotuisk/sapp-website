import { Shield, Calendar, FileText, Users, CalendarCheck, ShieldCheck, MonitorCheck, FileSearch, FileLock } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import TranslatedText from '@/components/ui/TranslatedText';
import { useInView } from 'react-intersection-observer';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';

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
      icon: <ShieldCheck className="h-10 w-10 text-sapp-blue" />,
      description: "Venues for sensitive and high-profile events in most cases have weak security. This applies especially for public venues such as hotels, conference centres, where security gaps are readily used by bad actors. Security audits the event venue prior to at an event ensure that at least minimum security measures are in place and organisation's information intact and protected."
    },
    {
      title: "Event Monitoring",
      icon: <MonitorCheck className="h-10 w-10 text-sapp-blue" />,
      description: "Live sensitive meetings are usually insufficiently protected against corporate espionage and other information gatherers. Real-time technical and physical monitoring should be a standard business process at any confidential, restricted or sensitive meeting. Event monitoring also includes the incident management service ensuring swift and professional handling of a potentially embarrassing situation avoiding a potential crisis and reputational damage."
    },
    {
      title: "Secure Technology",
      icon: <FileSearch className="h-10 w-10 text-sapp-blue" />,
      description: "Companies typically use a range of communications technology at most of their sensitive events. From security perspective, this leaves them vulnerable to an array of cyber and espionage attacks. Our Event Security service includes the detailed audit of all technology that is used at a sensitive meeting with recommendations for more secure alternatives."
    },
    {
      title: "Close Protection",
      icon: <Users className="h-10 w-10 text-sapp-blue" />,
      description: "For larger restricted events such as AGMs and for high-profile executives as well as at venues where there is no on-site security, we work with trusted partners to provide professional close protection services."
    }
  ];

  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        {/* Section 1: Hero Section with WHAT */}
        <section className="pt-36 pb-20 bg-gradient-to-b from-slate-50 to-white relative overflow-hidden">
          <div className="absolute inset-0 bg-cover bg-center opacity-5" 
            style={{ 
              backgroundImage: "url('/lovable-uploads/fc9a9c2e-5129-4b70-89e2-7617a4e5578a.png')",
              backgroundBlendMode: "overlay"
            }}
          ></div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <div 
                ref={ref}
                className={cn(
                  "inline-flex items-center justify-center p-3 bg-white rounded-lg shadow-md mb-6 transition-all duration-500",
                  inView ? "opacity-100 scale-100" : "opacity-0 scale-90"
                )}
              >
                <Shield className="h-8 w-8 text-sapp-blue" />
              </div>
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
                Specialised executive-level Event Security and technical support provider for corporate board and management meetings. SAPP Security is experienced in supporting management and board meetings, results rehearsals, sports events, brainstorming and strategy planning meetings with technical security for 20 years.
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

        {/* Section 3: Quote Banner */}
        <section className="py-16 bg-slate-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="relative">
                <div className="absolute -top-8 -left-8 text-gray-200 opacity-30">
                  <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M12 12a1 1 0 0 0 1-1V8.558c0-1.156-.616-1.867-1.823-2.470V5c0-1.105-.87-2-1.948-2H4.292c-1.077 0-1.948.895-1.948 2v6a1 1 0 0 0 1 1h1.5v3l2.948-3H12Z"/>
                  </svg>
                </div>
                <blockquote className="text-2xl md:text-3xl font-display font-medium text-sapp-dark italic">
                  "Sensitive strategic off-site meetings are usually the weakest link in organisation's information security strategy."
                </blockquote>
                <div className="mt-6 text-sapp-blue font-semibold">
                  - John Smith, Chief Information Security Officer at Fortune 500 Company
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 4: HOW - Our Approach */}
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

            <div className="relative py-8">
              <div className="absolute left-1/2 transform -translate-x-1/2 top-0 bottom-0 w-1 bg-gray-100"></div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="relative">
                  <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100 relative z-10">
                    <div className="absolute right-0 md:left-full top-1/2 transform translate-x-0 md:translate-x-1/2 -translate-y-1/2 bg-sapp-blue w-8 h-8 rounded-full flex items-center justify-center text-white font-bold">1</div>
                    <h3 className="text-xl font-semibold mb-3 text-sapp-dark">Assessment</h3>
                    <p className="text-gray-600">Comprehensive risk assessment of the venue, participants, and event type</p>
                  </div>
                </div>
                <div className="relative md:mt-24">
                  <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100 relative z-10">
                    <div className="absolute right-0 md:left-full top-1/2 transform translate-x-0 md:translate-x-1/2 -translate-y-1/2 bg-sapp-blue w-8 h-8 rounded-full flex items-center justify-center text-white font-bold">2</div>
                    <h3 className="text-xl font-semibold mb-3 text-sapp-dark">Planning</h3>
                    <p className="text-gray-600">Tailored security plan including technical audits and personnel requirements</p>
                  </div>
                </div>
                <div className="relative">
                  <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100 relative z-10">
                    <div className="absolute right-0 md:left-full top-1/2 transform translate-x-0 md:translate-x-1/2 -translate-y-1/2 bg-sapp-blue w-8 h-8 rounded-full flex items-center justify-center text-white font-bold">3</div>
                    <h3 className="text-xl font-semibold mb-3 text-sapp-dark">Implementation</h3>
                    <p className="text-gray-600">Deployment of security measures and monitoring systems before and during the event</p>
                  </div>
                </div>
                <div className="relative md:mt-24">
                  <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100 relative z-10">
                    <div className="absolute right-0 md:left-full top-1/2 transform translate-x-0 md:translate-x-1/2 -translate-y-1/2 bg-sapp-blue w-8 h-8 rounded-full flex items-center justify-center text-white font-bold">4</div>
                    <h3 className="text-xl font-semibold mb-3 text-sapp-dark">Monitoring & Response</h3>
                    <p className="text-gray-600">Real-time surveillance with immediate incident response capabilities</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 5: Service Columns */}
        <section className="py-16 bg-slate-50">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="text-3xl font-display font-bold text-sapp-dark mb-6">
                Our Event Security Services
              </h2>
              <p className="text-sapp-gray">
                Comprehensive protection for your most sensitive corporate gatherings
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {serviceDetails.map((service, index) => (
                <Card key={index} className="border border-gray-100 transition-all duration-300 hover:shadow-lg">
                  <CardHeader>
                    <div className="mb-4 bg-sapp-blue/10 w-16 h-16 rounded-lg flex items-center justify-center">
                      {service.icon}
                    </div>
                    <CardTitle className="text-xl font-display">{service.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sapp-gray text-sm mb-6">{service.description}</p>
                  </CardContent>
                  <CardFooter>
                    <Dialog open={openDialog === service.title} onOpenChange={(open) => {
                      if (open) {
                        setOpenDialog(service.title);
                        setDialogStep('form');
                      } else {
                        setOpenDialog(null);
                        setDialogStep('form');
                        setFormData({ name: '', organisation: '', email: '', phone: '', notes: '' });
                      }
                    }}>
                      <DialogTrigger asChild>
                        <Button variant="outline" className="w-full">LEARN MORE</Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-md">
                        {dialogStep === 'form' ? (
                          <>
                            <DialogHeader>
                              <DialogTitle>Request Information: {service.title}</DialogTitle>
                              <DialogDescription>
                                Please provide your details and we'll contact you with more information about our {service.title.toLowerCase()} services.
                              </DialogDescription>
                            </DialogHeader>
                            <form onSubmit={handleSubmit} className="space-y-4">
                              <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                  <Label htmlFor="name">Your Name</Label>
                                  <Input id="name" value={formData.name} onChange={handleInputChange} required />
                                </div>
                                <div className="space-y-2">
                                  <Label htmlFor="organisation">Organisation</Label>
                                  <Input id="organisation" value={formData.organisation} onChange={handleInputChange} required />
                                </div>
                              </div>
                              <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                  <Label htmlFor="email">Email Address</Label>
                                  <Input id="email" type="email" value={formData.email} onChange={handleInputChange} required />
                                </div>
                                <div className="space-y-2">
                                  <Label htmlFor="phone">Phone Number</Label>
                                  <Input id="phone" value={formData.phone} onChange={handleInputChange} />
                                </div>
                              </div>
                              <DialogFooter className="mt-4">
                                <Button type="submit">Continue to Preview</Button>
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
                                  className="min-h-[100px] border-gray-200 focus-visible:ring-sapp-blue"
                                />
                              </div>
                            </div>
                            <DialogFooter className="flex flex-col sm:flex-row gap-2 mt-4">
                              <Button variant="outline" type="button" onClick={handleBack} className="sm:mr-auto">
                                Back to Form
                              </Button>
                              <Button variant="outline" type="button" onClick={handleCancel}>
                                Cancel
                              </Button>
                              <Button type="button" onClick={handleSendEmail}>
                                Open Email Client
                              </Button>
                            </DialogFooter>
                          </>
                        )}
                      </DialogContent>
                    </Dialog>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-display font-bold text-sapp-dark mb-6">Ready to secure your next event?</h2>
            <p className="text-sapp-gray max-w-2xl mx-auto mb-8">
              Our team of event security experts is ready to create a tailored security plan for your upcoming corporate events.
            </p>
            <Button 
              size="lg" 
              className="bg-sapp-blue hover:bg-sapp-blue/90 text-white shadow-lg shadow-sapp-blue/20"
            >
              <TranslatedText textKey="getInTouch" />
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default EventSecurity;

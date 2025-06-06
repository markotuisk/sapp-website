
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useInView } from 'react-intersection-observer';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { ContactHeader } from '@/components/home/contact/ContactHeader';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

const Contact = () => {
  const { ref: headerRef, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    organization: '',
    phone: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Contact form submitted:', formData);
    // Handle form submission logic here
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: "Office",
      details: "United Kingdom (HQ) and Estonia (Engineering)"
    },
    {
      icon: Mail,
      title: "Email",
      details: "contact@sappsecurity.com"
    },
    {
      icon: Phone,
      title: "Phone",
      details: "+44 (0) 2070 888 270"
    },
    {
      icon: Clock,
      title: "Business Hours",
      details: "Mon-Fri: 9:00 AM - 6:00 PM GMT"
    }
  ];

  return (
    <>
      <Helmet>
        <title>Contact SAPP Security - Get Expert Security Consultation</title>
        <meta name="description" content="Contact SAPP Security for professional security services, TSCM inspections, and security assessments. Expert consultation available." />
      </Helmet>
      
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <Navbar />
        
        <main className="pt-20">
          <div ref={headerRef}>
            <ContactHeader inView={inView} />
          </div>
          
          <div className="container mx-auto px-4 py-12">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <Card>
                <CardHeader>
                  <CardTitle>Send us a message</CardTitle>
                  <CardDescription>
                    Fill out the form below and we'll get back to you as soon as possible.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name">Name *</Label>
                        <Input
                          id="name"
                          name="name"
                          type="text"
                          required
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder="Your full name"
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">Email *</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          required
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="your@email.com"
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="organization">Organization</Label>
                        <Input
                          id="organization"
                          name="organization"
                          type="text"
                          value={formData.organization}
                          onChange={handleInputChange}
                          placeholder="Your organization"
                        />
                      </div>
                      <div>
                        <Label htmlFor="phone">Phone</Label>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder="+44 123 456 7890"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="message">Message *</Label>
                      <Textarea
                        id="message"
                        name="message"
                        required
                        value={formData.message}
                        onChange={handleInputChange}
                        placeholder="Tell us about your security requirements..."
                        rows={6}
                      />
                    </div>

                    <Button type="submit" className="w-full">
                      Send Message
                    </Button>
                  </form>
                </CardContent>
              </Card>

              {/* Contact Information */}
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Get in Touch</CardTitle>
                    <CardDescription>
                      Ready to discuss your security needs? Contact us through any of these channels.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {contactInfo.map((info, index) => (
                      <div key={index} className="flex items-start space-x-4">
                        <div className="flex-shrink-0">
                          <info.icon className="h-6 w-6 text-sapp-blue" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900">{info.title}</h4>
                          <p className="text-gray-600">{info.details}</p>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Our Services</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li>• Technical Surveillance Countermeasures (TSCM)</li>
                      <li>• Security Audits & Assessments</li>
                      <li>• Event Security Services</li>
                      <li>• Installation Services</li>
                      <li>• Cyber Security Solutions</li>
                      <li>• Executive Protection</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Contact;

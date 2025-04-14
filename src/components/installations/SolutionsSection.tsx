
import React from 'react';
import { MonitorCheck, Wifi, Lock, Database } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Animated } from '@/components/ui/AnimatedElements';
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction
} from '@/components/ui/alert-dialog';

const SolutionsSection = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-block bg-sapp-blue/10 rounded-full px-4 py-1.5 mb-4">
            <h3 className="text-sm font-medium text-sapp-blue tracking-wider">Why Choose Our Solutions</h3>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <Animated animation="fade-up" delay={100} className="relative order-2 md:order-1">
            <div className="absolute -inset-2 bg-sapp-blue/5 rounded-2xl blur-xl"></div>
            <img 
              src="/lovable-uploads/85184084-bca0-497c-8950-601f002a465f.png"
              alt="Security Installation Services" 
              className="relative z-10 rounded-xl shadow-2xl w-full h-auto object-cover hover:scale-[1.02] transition-all duration-300"
            />
          </Animated>
          <div className="order-1 md:order-2">
            <Animated animation="fade-up" delay={150}>
              <h2 className="text-2xl md:text-3xl font-display font-bold text-sapp-dark mb-6">
                Next Generation AI Security Integration
              </h2>
              <p className="text-sapp-gray mb-6">
                There is a notable shift towards AI-driven security systems with strengthened defence and improved user experience. Organisations are increasingly replacing their legacy access control, CCTV and other systems with data-driven scalable security systems to automate across various interfaces and improve their security posture whilst optimising costs and reduce manual work. New security systems provide a perfect interface for bringing together the physical and cyber security expertise in organisations.
              </p>
            </Animated>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              <Animated animation="fade-up" delay={200} className="bg-white rounded-lg shadow-md hover:shadow-xl hover:scale-[1.02] border border-gray-100 p-4 transition-all duration-200">
                <MonitorCheck className="h-6 w-6 text-sapp-blue mb-2" />
                <h4 className="font-semibold text-sapp-dark mb-1">CCTV & Access</h4>
                <p className="text-sm text-sapp-gray">Comprehensive video surveillance and access control systems.</p>
              </Animated>
              <Animated animation="fade-up" delay={250} className="bg-white rounded-lg shadow-md hover:shadow-xl hover:scale-[1.02] border border-gray-100 p-4 transition-all duration-200">
                <Wifi className="h-6 w-6 text-sapp-blue mb-2" />
                <h4 className="font-semibold text-sapp-dark mb-1">Speech & Sound Masking</h4>
                <p className="text-sm text-sapp-gray">Advanced sound masking and speech protection solutions.</p>
              </Animated>
              <Animated animation="fade-up" delay={300} className="bg-white rounded-lg shadow-md hover:shadow-xl hover:scale-[1.02] border border-gray-100 p-4 transition-all duration-200">
                <Lock className="h-6 w-6 text-sapp-blue mb-2" />
                <h4 className="font-semibold text-sapp-dark mb-1">Counter Surveillance</h4>
                <p className="text-sm text-sapp-gray">Protection against unauthorized surveillance activities.</p>
              </Animated>
              <Animated animation="fade-up" delay={350} className="bg-white rounded-lg shadow-md hover:shadow-xl hover:scale-[1.02] border border-gray-100 p-4 transition-all duration-200">
                <Database className="h-6 w-6 text-sapp-blue mb-2" />
                <h4 className="font-semibold text-sapp-dark mb-1">Network Security</h4>
                <p className="text-sm text-sapp-gray">Secure network infrastructure and communications.</p>
              </Animated>
            </div>
            <Animated animation="fade-up" delay={400}>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button 
                    size="lg" 
                    className="bg-sapp-blue hover:bg-sapp-blue/90 text-white shadow-lg shadow-sapp-blue/20 hover:scale-105 transition-all duration-200"
                  >
                    Request a Consultation
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent className="bg-white">
                  <AlertDialogHeader>
                    <AlertDialogTitle>Request a Security Consultation</AlertDialogTitle>
                    <AlertDialogDescription>
                      Fill out the form below to schedule a consultation with our installation experts.
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
            </Animated>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SolutionsSection;

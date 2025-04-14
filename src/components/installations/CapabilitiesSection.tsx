
import React from 'react';
import ServiceCard from '@/components/ui/ServiceCard';
import { Button } from '@/components/ui/button';
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

const CapabilitiesSection = () => {
  return (
    <section className="py-16 bg-slate-50">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-block bg-sapp-blue/10 rounded-full px-4 py-1.5 mb-4">
            <h3 className="text-sm font-medium text-sapp-blue tracking-wider">Our Security Expertise</h3>
          </div>
        </div>
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-display font-bold text-sapp-dark mb-3">Our Installation Capabilities</h2>
          <p className="text-sapp-gray">Our Technical team works with major system manufacturers requiring both physical and cyber security expertise.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-12">
          {/* Services cards */}
          <ServiceCard 
            title="Physical Security"
            description="Control visibility, movement, and presence with CCTV, access and visitor management systems."
            delay={100}
            href="/installations/cctv-access"
          />
          
          {/* Speech Privacy & Sound Masking */}
          <ServiceCard 
            title="Speech & Sound Masking"
            description="Protect conversations and reduce acoustic exposure in sensitive or shared environments."
            delay={200}
            href="/installations/speech-privacy"
          />
          
          {/* Counter Surveillance TSCM */}
          <ServiceCard 
            title="Counter Surveillance TSCM"
            description="Identify and neutralise unauthorised surveillance activity across acoustic, RF, and electromagnetic vectors."
            delay={300}
            href="/installations/counter-surveillance"
          />
          
          {/* IT Network Systems */}
          <ServiceCard 
            title="IT Network Systems"
            description="Implement secure foundation for communication and control, whether is local or distributed cloud or hybrid solution."
            delay={400}
            href="/installations/network-infrastructure"
          />
        </div>

        <div className="text-center">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                size="lg"
                className="bg-sapp-blue hover:bg-sapp-blue/90 text-white shadow-lg shadow-sapp-blue/20 transition-all duration-300 hover:scale-105"
              >
                Talk to Our Installation Team
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="bg-white">
              <AlertDialogHeader>
                <AlertDialogTitle>Talk to Our Installation Team</AlertDialogTitle>
                <AlertDialogDescription>
                  Fill out the form below to get in touch with our expert installation team.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <div className="py-4">
                <form className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="name3" className="text-sm font-medium">Full Name</label>
                      <input id="name3" className="w-full p-2 border border-gray-300 rounded-md" />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="company3" className="text-sm font-medium">Company</label>
                      <input id="company3" className="w-full p-2 border border-gray-300 rounded-md" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email3" className="text-sm font-medium">Email</label>
                    <input id="email3" type="email" className="w-full p-2 border border-gray-300 rounded-md" />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="message3" className="text-sm font-medium">Message</label>
                    <textarea id="message3" rows={4} className="w-full p-2 border border-gray-300 rounded-md"></textarea>
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
      </div>
    </section>
  );
};

export default CapabilitiesSection;

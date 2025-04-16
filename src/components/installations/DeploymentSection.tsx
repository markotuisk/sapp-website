import React from 'react';
import { FileText, Lock, Users } from 'lucide-react';
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

const DeploymentSection = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <Animated animation="fade-up" delay={100}>
          <div className="text-center mb-12">
            <div className="inline-block bg-sapp-blue/10 rounded-full px-4 py-1.5 mb-4">
              <h3 className="text-sm font-medium text-sapp-blue tracking-wider">Our Deployment Process</h3>
            </div>
          </div>
        </Animated>
        <Animated animation="fade-up" delay={200}>
          <div className="max-w-3xl mx-auto text-center mb-10">
            <h2 className="text-3xl font-display font-bold text-sapp-dark mb-3">How We Deliver Security Solutions</h2>
            <p className="text-sapp-gray">Every installation is unique, requiring careful planning and coordination across departments and stakeholders.</p>
          </div>
        </Animated>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {/* Assessment & Planning */}
          <Animated animation="fade-up" delay={300} className="bg-white rounded-xl shadow-md hover:shadow-xl hover:scale-[1.02] border border-gray-100 p-6 transition-all duration-200 ease-in-out">
            <div className="h-12 w-12 bg-sapp-blue/10 rounded-full flex items-center justify-center mb-4">
              <FileText className="h-6 w-6 text-sapp-blue" />
            </div>
            <h3 className="text-xl font-display font-semibold mb-3 text-sapp-dark">Assessment & Planning</h3>
            <p className="text-sapp-gray text-sm">
              We begin with a comprehensive site assessment and requirements gathering, followed by detailed project planning and documentation. This phase includes risk assessment, stakeholder consultation, and technical feasibility studies.
            </p>
          </Animated>

          {/* Implementation & Integration */}
          <Animated animation="fade-up" delay={400} className="bg-white rounded-xl shadow-md hover:shadow-xl hover:scale-[1.02] border border-gray-100 p-6 transition-all duration-200 ease-in-out">
            <div className="h-12 w-12 bg-sapp-blue/10 rounded-full flex items-center justify-center mb-4">
              <Lock className="h-6 w-6 text-sapp-blue" />
            </div>
            <h3 className="text-xl font-display font-semibold mb-3 text-sapp-dark">Implementation & Integration</h3>
            <p className="text-sapp-gray text-sm">
              Our technical teams handle the physical installation, system configuration, and integration with existing infrastructure. We coordinate with IT, facilities, and security departments to ensure minimal disruption during deployment.
            </p>
          </Animated>

          {/* Testing & Handover */}
          <Animated animation="fade-up" delay={500} className="bg-white rounded-xl shadow-md hover:shadow-xl hover:scale-[1.02] border border-gray-100 p-6 transition-all duration-200 ease-in-out">
            <div className="h-12 w-12 bg-sapp-blue/10 rounded-full flex items-center justify-center mb-4">
              <Users className="h-6 w-6 text-sapp-blue" />
            </div>
            <h3 className="text-xl font-display font-semibold mb-3 text-sapp-dark">Testing & Handover</h3>
            <p className="text-sapp-gray text-sm">
              We conduct rigorous testing, user training, and system documentation before handover. Our comprehensive approach includes acceptance testing, user training sessions, and complete documentation for future reference and maintenance.
            </p>
          </Animated>
        </div>

        <AlertDialog>
          <Animated animation="fade-up" delay={600} className="max-w-3xl mx-auto text-center">
            <AlertDialogTrigger asChild>
              <Button 
                size="lg" 
                className="bg-sapp-blue hover:bg-sapp-blue/90 text-white shadow-lg shadow-sapp-blue/20 transition-all duration-300 hover:scale-105"
              >
                Request Deployment Consultation
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="bg-white">
              <AlertDialogHeader>
                <AlertDialogTitle>Request Deployment Consultation</AlertDialogTitle>
                <AlertDialogDescription>
                  Fill out the form below to discuss your deployment requirements with our team.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <div className="py-4">
                <form className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="name4" className="text-sm font-medium">Full Name</label>
                      <input id="name4" className="w-full p-2 border border-gray-300 rounded-md" />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="company4" className="text-sm font-medium">Company</label>
                      <input id="company4" className="w-full p-2 border border-gray-300 rounded-md" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email4" className="text-sm font-medium">Email</label>
                    <input id="email4" type="email" className="w-full p-2 border border-gray-300 rounded-md" />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="project" className="text-sm font-medium">Project Description</label>
                    <textarea id="project" rows={4} className="w-full p-2 border border-gray-300 rounded-md" placeholder="Please describe your security installation needs..."></textarea>
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
    </section>
  );
};

export default DeploymentSection;

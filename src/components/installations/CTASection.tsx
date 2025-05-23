
import React from 'react';
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

const CTASection = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-screen-xl">
        <div className="max-w-3xl mx-auto text-center">
          <h3 className="text-sapp-blue text-[19px] leading-[77px] tracking-[3.62px] font-medium uppercase mb-4">
            GET STARTED
          </h3>
          <h2 className="text-3xl font-display font-bold text-sapp-dark mb-4">Ready to upgrade your security infrastructure?</h2>
          <p className="text-sapp-gray mb-8">
            Our team of installation experts is ready to help you implement the latest security technologies for your organisation.
          </p>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button 
                size="lg" 
                className="bg-sapp-blue hover:bg-sapp-blue/90 text-white shadow-lg shadow-sapp-blue/20"
              >
                Get a System Assessment
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="bg-white">
              <AlertDialogHeader>
                <AlertDialogTitle>Request a System Assessment</AlertDialogTitle>
                <AlertDialogDescription>
                  Fill out the form below to have our experts evaluate your current security infrastructure.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <div className="py-4">
                <form className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="name2" className="text-sm font-medium">Full Name</label>
                      <input id="name2" className="w-full p-2 border border-gray-300 rounded-md" />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="company2" className="text-sm font-medium">Company</label>
                      <input id="company2" className="w-full p-2 border border-gray-300 rounded-md" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email2" className="text-sm font-medium">Email</label>
                    <input id="email2" type="email" className="w-full p-2 border border-gray-300 rounded-md" />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="phone" className="text-sm font-medium">Phone</label>
                    <input id="phone" type="tel" className="w-full p-2 border border-gray-300 rounded-md" />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="message2" className="text-sm font-medium">Current Security Setup</label>
                    <textarea id="message2" rows={4} className="w-full p-2 border border-gray-300 rounded-md" placeholder="Briefly describe your current security systems..."></textarea>
                  </div>
                </form>
              </div>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction className="bg-sapp-blue hover:bg-sapp-blue/90 text-white">Request Assessment</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
    </section>
  );
};

export default CTASection;

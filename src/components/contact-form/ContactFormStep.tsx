
import { useState } from 'react';
import { Mail, User, Building2 } from 'lucide-react';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { DialogFooter } from '@/components/ui/dialog';
import { UseFormReturn } from 'react-hook-form';
import { ContactFormValues } from './types';

interface ContactFormStepProps {
  form: UseFormReturn<ContactFormValues>;
  onSubmit: (values: ContactFormValues) => void;
}

export default function ContactFormStep({ form, onSubmit }: ContactFormStepProps) {
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="bg-gradient-to-br from-slate-50 to-white p-4 rounded-lg mb-6 border border-slate-100">
          <h3 className="text-lg font-medium text-sapp-dark">Step 1: Your Details</h3>
          <p className="text-sm text-sapp-gray">Please fill in your contact information</p>
        </div>
        
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <div className="flex border rounded-md focus-within:ring-2 focus-within:ring-sapp-blue focus-within:ring-offset-2">
                  <div className="flex items-center p-2 bg-slate-50 border-r rounded-l-md">
                    <User className="h-4 w-4 text-sapp-blue" />
                  </div>
                  <Input className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0" placeholder="Your name" {...field} />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <div className="flex border rounded-md focus-within:ring-2 focus-within:ring-sapp-blue focus-within:ring-offset-2">
                  <div className="flex items-center p-2 bg-slate-50 border-r rounded-l-md">
                    <Mail className="h-4 w-4 text-sapp-blue" />
                  </div>
                  <Input className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0" placeholder="your.email@company.com" type="email" {...field} />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="organization"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Organization (Optional)</FormLabel>
              <FormControl>
                <div className="flex border rounded-md focus-within:ring-2 focus-within:ring-sapp-blue focus-within:ring-offset-2">
                  <div className="flex items-center p-2 bg-slate-50 border-r rounded-l-md">
                    <Building2 className="h-4 w-4 text-sapp-blue" />
                  </div>
                  <Input className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0" placeholder="Your organization" {...field} />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Message</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Please tell us about your needs..." 
                  className="min-h-[120px] border-slate-200 focus-visible:ring-sapp-blue" 
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <DialogFooter>
          <Button 
            type="submit"
            className="bg-sapp-blue hover:bg-sapp-blue/90 text-white"
          >
            Continue to Preview
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
}

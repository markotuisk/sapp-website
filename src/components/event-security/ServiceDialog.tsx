
import React from 'react';
import { AlertCircle, ArrowLeft, ArrowRight } from 'lucide-react';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface ServiceDialogProps {
  openDialog: string | null;
  setOpenDialog: (value: string | null) => void;
  formData: {
    name: string;
    organisation: string;
    email: string;
    phone: string;
    notes: string;
  };
  setFormData: React.Dispatch<React.SetStateAction<{
    name: string;
    organisation: string;
    email: string;
    phone: string;
    notes: string;
  }>>;
  dialogStep: 'form' | 'preview';
  setDialogStep: React.Dispatch<React.SetStateAction<'form' | 'preview'>>;
}

const ServiceDialog: React.FC<ServiceDialogProps> = ({
  openDialog,
  setOpenDialog,
  formData,
  setFormData,
  dialogStep,
  setDialogStep
}) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.email.includes('@') || !formData.email.includes('.')) {
      toast.error('Please enter a valid email address');
      return;
    }
    
    setDialogStep('preview');
  };
  
  const handleSendEmail = () => {
    const subject = `Enquiry about ${openDialog} Event Security Services`;
    const body = `
Name: ${formData.name}
Organisation: ${formData.organisation}
Email: ${formData.email}
Phone: ${formData.phone}
Service: ${openDialog}
${formData.notes ? `\nAdditional Notes:\n${formData.notes}` : ''}
    `;
    
    window.location.href = `mailto:contact@sappsecurity.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    
    toast.success('Your email client should open shortly with your request details.');
    
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

  return (
    <Dialog open={!!openDialog} onOpenChange={(open) => {
      if (!open) {
        setOpenDialog(null);
        setDialogStep('form');
        setFormData({ name: '', organisation: '', email: '', phone: '', notes: '' });
      }
    }}>
      <DialogContent className="sm:max-w-3xl">
        {dialogStep === 'form' ? (
          <>
            <DialogHeader>
              <DialogTitle className="text-2xl font-display font-bold text-sapp-dark">Request Information: {openDialog}</DialogTitle>
              <DialogDescription className="text-sapp-gray">
                Please provide your details and we'll contact you with more information about our {openDialog?.toLowerCase()} services.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-6 mt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-sapp-dark">Your Name</Label>
                  <Input id="name" value={formData.name} onChange={handleInputChange} required 
                    className="transition-all duration-300 focus:ring-2 focus:ring-sapp-blue focus:border-transparent" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="organisation" className="text-sapp-dark">Organisation</Label>
                  <Input id="organisation" value={formData.organisation} onChange={handleInputChange} required 
                    className="transition-all duration-300 focus:ring-2 focus:ring-sapp-blue focus:border-transparent" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sapp-dark">Email Address</Label>
                  <Input id="email" type="email" value={formData.email} onChange={handleInputChange} required 
                    className="transition-all duration-300 focus:ring-2 focus:ring-sapp-blue focus:border-transparent" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-sapp-dark">Phone Number</Label>
                  <Input id="phone" value={formData.phone} onChange={handleInputChange} 
                    className="transition-all duration-300 focus:ring-2 focus:ring-sapp-blue focus:border-transparent" />
                </div>
              </div>
              <div className="flex items-start gap-3 mb-4 bg-blue-50 p-4 rounded-md">
                <AlertCircle className="h-6 w-6 text-sapp-blue flex-shrink-0 mt-0.5" />
                <p className="text-sm text-sapp-dark">
                  Your information will not be shared with third parties or used for advertising purposes. We'll only contact you about the requested service.
                </p>
              </div>
              <DialogFooter className="mt-6 flex-col space-y-2 sm:space-y-0">
                <Button type="submit" 
                  className="w-full sm:w-auto transition-all duration-300 hover:scale-105 bg-sapp-blue hover:bg-sapp-blue/90 text-white text-center justify-center group relative overflow-hidden">
                  <span className="relative z-10 transition-transform duration-300 group-hover:scale-105">
                    Continue to Preview
                  </span>
                  <span className="absolute inset-0 bg-gradient-to-r from-sapp-dark to-sapp-blue opacity-0 transition-opacity duration-300 group-hover:opacity-100"></span>
                </Button>
              </DialogFooter>
            </form>
          </>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className="text-2xl font-display font-bold text-sapp-dark">Preview Your Request</DialogTitle>
              <DialogDescription className="text-sapp-gray">
                Please review your information below before sending. Your default email client will open with this information.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-6 mt-4">
              <div className="bg-slate-50 p-6 rounded-lg border border-gray-100">
                <h4 className="font-semibold text-sm text-slate-600 mb-3">REQUEST DETAILS</h4>
                <div className="space-y-3 text-sm">
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
                <Label htmlFor="notes" className="text-sapp-dark">Additional Notes (Optional)</Label>
                <Textarea 
                  id="notes" 
                  placeholder="Add any specific questions or requirements" 
                  value={formData.notes}
                  onChange={handleInputChange}
                  className="min-h-[100px] border-gray-200 focus-visible:ring-sapp-blue transition-all duration-300"
                />
              </div>
            </div>
            <DialogFooter className="flex flex-col sm:flex-row gap-3 mt-6">
              <Button variant="outline" type="button" onClick={handleBack} className="sm:mr-auto transition-all duration-300 hover:bg-slate-100">
                Back to Form
              </Button>
              <Button variant="outline" type="button" onClick={handleCancel} className="transition-all duration-300 hover:bg-slate-100">
                Cancel
              </Button>
              <Button 
                type="button" 
                onClick={handleSendEmail} 
                className="transition-all duration-300 hover:scale-105 bg-sapp-blue hover:bg-sapp-blue/90 text-white group relative overflow-hidden"
              >
                <span className="relative z-10 transition-transform duration-300 group-hover:scale-105">
                  Open Email Client
                </span>
                <span className="absolute inset-0 bg-gradient-to-r from-sapp-dark to-sapp-blue opacity-0 transition-opacity duration-300 group-hover:opacity-100"></span>
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ServiceDialog;


import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogClose } from '@/components/ui/dialog';
import { X } from 'lucide-react';
import ContactFormStep from '@/components/contact-form/ContactFormStep';
import ContactFormReview from '@/components/contact-form/ContactFormReview';
import ContactFormSuccess from '@/components/contact-form/ContactFormSuccess';
import { useContactFormDialog } from '@/hooks/useContactFormDialog';

interface ContactFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  defaultMessage?: string;
  serviceName?: string;
}

export default function ContactFormDialog({ 
  open, 
  onOpenChange, 
  defaultMessage = '',
  serviceName
}: ContactFormDialogProps) {
  const {
    step,
    form,
    isSubmitting,
    formattedEmail,
    leadId,
    handleFormSubmit,
    handleFinalSubmit,
    handleDialogClose,
    handleBackToEdit,
    handleSuccessClose
  } = useContactFormDialog(onOpenChange, defaultMessage, serviceName);

  // Determine dialog content classes based on step
  const getDialogContentClass = () => {
    switch(step) {
      case 3: return "sm:max-w-md"; // Success view is more compact
      default: return "sm:max-w-[525px]"; // Default width for form and preview
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleDialogClose}>
      <DialogContent className={`bg-gradient-to-b from-white to-slate-50 ${getDialogContentClass()}`}>
        {step < 3 && (
          <DialogHeader>
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <DialogTitle className="text-sapp-dark">
                  {step === 1 ? "Contact Us" : "Review Your Message"}
                  <span className="text-sm font-normal text-sapp-gray ml-2">
                    (Step {step} of 2)
                  </span>
                </DialogTitle>
              </div>
              <DialogClose className="rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
                <X className="h-4 w-4" />
                <span className="sr-only">Close</span>
              </DialogClose>
            </div>
            <DialogDescription>
              {step === 1 
                ? "Please provide your details and we'll get back to you soon." 
                : "Please review your message before sending."}
            </DialogDescription>
          </DialogHeader>
        )}

        {step === 1 ? (
          <ContactFormStep 
            form={form} 
            onSubmit={handleFormSubmit} 
          />
        ) : step === 2 ? (
          <ContactFormReview 
            formattedEmail={formattedEmail}
            onBackToEdit={handleBackToEdit}
            onSubmit={handleFinalSubmit}
            isSubmitting={isSubmitting}
          />
        ) : (
          <ContactFormSuccess 
            leadId={leadId} 
            onClose={handleSuccessClose}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}

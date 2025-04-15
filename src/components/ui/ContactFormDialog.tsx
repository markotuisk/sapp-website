
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
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
              <DialogTitle className="text-sapp-dark">{step === 1 ? "Contact Us" : "Review Your Message"}</DialogTitle>
              <div className="flex items-center gap-1.5">
                <span className={`h-2.5 w-2.5 rounded-full ${step === 1 ? 'bg-sapp-blue' : 'bg-slate-200'}`}></span>
                <span className={`h-2.5 w-2.5 rounded-full ${step === 2 ? 'bg-sapp-blue' : 'bg-slate-200'}`}></span>
              </div>
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

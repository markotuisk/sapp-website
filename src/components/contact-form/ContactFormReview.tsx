
import { Button } from '@/components/ui/button';
import { DialogFooter } from '@/components/ui/dialog';
import { Send } from 'lucide-react';

interface ContactFormReviewProps {
  formattedEmail: string;
  onBackToEdit: () => void;
  onSubmit: () => void;
  isSubmitting: boolean;
}

export default function ContactFormReview({ 
  formattedEmail, 
  onBackToEdit, 
  onSubmit, 
  isSubmitting 
}: ContactFormReviewProps) {
  return (
    <div className="space-y-4">
      <div className="border rounded-md p-4 bg-slate-50 font-mono text-sm whitespace-pre-wrap">
        {formattedEmail}
      </div>
      
      <DialogFooter className="flex flex-col gap-2 sm:flex-row sm:justify-between">
        <Button variant="outline" onClick={onBackToEdit} disabled={isSubmitting}>
          Back to Edit
        </Button>
        <Button 
          onClick={onSubmit} 
          disabled={isSubmitting}
          className="gap-2"
        >
          {isSubmitting ? (
            <>Sending...</>
          ) : (
            <>
              Send Message
              <Send className="h-4 w-4" />
            </>
          )}
        </Button>
      </DialogFooter>
    </div>
  );
}

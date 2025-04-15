
import { Button } from '@/components/ui/button';
import { DialogFooter } from '@/components/ui/dialog';
import { Send, ArrowLeft, Eye } from 'lucide-react';

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
      <div className="bg-gradient-to-br from-slate-50 to-white p-4 rounded-lg mb-6 border border-slate-100">
        <h3 className="text-lg font-medium text-sapp-dark">Step 2: Review Your Message</h3>
        <p className="text-sm text-sapp-gray">Please check your details before sending</p>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4 divide-y divide-slate-100">
        <div className="pb-3">
          <div className="flex items-center space-x-2 mb-2">
            <Eye className="h-4 w-4 text-sapp-blue" />
            <h4 className="font-semibold text-sm text-sapp-dark">Message Preview</h4>
          </div>
          <p className="text-xs text-sapp-gray mb-2">This is how your message will appear to our team:</p>
        </div>
        
        <div className="font-mono text-sm whitespace-pre-wrap pt-3 text-sapp-dark overflow-auto max-h-[240px]">
          {formattedEmail}
        </div>
      </div>
      
      <DialogFooter className="flex flex-col gap-2 sm:flex-row sm:justify-between pt-4">
        <Button 
          variant="outline" 
          onClick={onBackToEdit} 
          disabled={isSubmitting}
          className="border-slate-200 text-sapp-dark flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Edit
        </Button>
        <Button 
          onClick={onSubmit} 
          disabled={isSubmitting}
          className="bg-sapp-blue hover:bg-sapp-blue/90 text-white flex items-center gap-2 transition duration-300 ease-in-out"
        >
          {isSubmitting ? (
            <>
              <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
              Sending...
            </>
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

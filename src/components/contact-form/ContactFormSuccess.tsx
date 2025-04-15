
import { Button } from '@/components/ui/button';
import { DialogFooter } from '@/components/ui/dialog';
import { CheckCircle2, Mail, Copy, AlertCircle } from 'lucide-react';
import { useState } from 'react';

interface ContactFormSuccessProps {
  leadId: string;
  onClose: () => void;
}

export default function ContactFormSuccess({ 
  leadId, 
  onClose 
}: ContactFormSuccessProps) {
  const [copied, setCopied] = useState(false);
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(leadId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col items-center justify-center py-6">
        <div className="rounded-full bg-green-50 p-3 mb-4">
          <CheckCircle2 className="h-10 w-10 text-green-500" />
        </div>
        <h3 className="text-xl font-medium text-sapp-dark">Message Sent Successfully</h3>
        <p className="text-sm text-center text-sapp-gray mt-2 max-w-sm">
          Thank you for your inquiry. Our team will review your message and get back to you shortly.
        </p>
      </div>
      
      <div className="bg-slate-50 rounded-lg p-5 border border-slate-100">
        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center">
            <AlertCircle className="h-4 w-4 text-sapp-blue mr-2" />
            <h4 className="text-sm font-medium text-sapp-dark">Your Reference Number</h4>
          </div>
          <button 
            onClick={copyToClipboard}
            className="text-xs flex items-center gap-1 text-sapp-blue hover:text-sapp-blue/80 transition-colors"
          >
            {copied ? (
              <>Copied<CheckCircle2 className="h-3 w-3" /></>
            ) : (
              <>Copy<Copy className="h-3 w-3" /></>
            )}
          </button>
        </div>
        <div className="bg-white rounded p-2 border border-slate-200 font-mono text-sm">
          {leadId}
        </div>
      </div>
      
      <div className="rounded-lg p-4 border border-blue-100 bg-blue-50">
        <div className="flex">
          <Mail className="h-5 w-5 text-sapp-blue flex-shrink-0 mt-0.5 mr-3" />
          <div>
            <h4 className="text-sm font-medium text-sapp-dark">Check Your Inbox</h4>
            <p className="text-xs text-sapp-gray mt-1">
              We've sent a confirmation email to your address. If you don't see it within a few minutes, please check your spam folder.
            </p>
          </div>
        </div>
      </div>
      
      <DialogFooter>
        <Button 
          onClick={onClose} 
          className="bg-sapp-blue hover:bg-sapp-blue/90 text-white w-full sm:w-auto"
        >
          Close
        </Button>
      </DialogFooter>
    </div>
  );
}

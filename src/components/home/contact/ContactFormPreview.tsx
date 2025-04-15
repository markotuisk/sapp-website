
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ContactFormValues } from "./types";
import { UserMetadata } from "./types";

interface ContactFormPreviewProps {
  showPreview: boolean;
  setShowPreview: (show: boolean) => void;
  submissionData: ContactFormValues | null;
  userMetadata: UserMetadata;
  handleConfirmSubmission: () => void;
}

export default function ContactFormPreview({
  showPreview,
  setShowPreview,
  submissionData,
  userMetadata,
  handleConfirmSubmission
}: ContactFormPreviewProps) {
  return (
    <Dialog open={showPreview} onOpenChange={setShowPreview}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-display">Preview Your Message</DialogTitle>
          <DialogDescription>
            Please review your message details before sending
          </DialogDescription>
        </DialogHeader>

        {submissionData && (
          <div className="mt-4 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <h4 className="font-semibold text-sm text-muted-foreground">Full Name</h4>
                <p className="text-sapp-dark">{submissionData.name}</p>
              </div>
              
              <div className="space-y-2">
                <h4 className="font-semibold text-sm text-muted-foreground">Topic</h4>
                <p className="text-sapp-dark">{submissionData.topic}</p>
              </div>

              {submissionData.email && (
                <div className="space-y-2">
                  <h4 className="font-semibold text-sm text-muted-foreground">Email</h4>
                  <p className="text-sapp-dark">{submissionData.email}</p>
                </div>
              )}

              {submissionData.phone && (
                <div className="space-y-2">
                  <h4 className="font-semibold text-sm text-muted-foreground">Phone</h4>
                  <p className="text-sapp-dark">{submissionData.phone}</p>
                </div>
              )}

              {submissionData.company && (
                <div className="space-y-2">
                  <h4 className="font-semibold text-sm text-muted-foreground">Company</h4>
                  <p className="text-sapp-dark">{submissionData.company}</p>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <h4 className="font-semibold text-sm text-muted-foreground">Message</h4>
              <div className="p-4 bg-slate-50 rounded-md text-sapp-dark whitespace-pre-wrap">
                {submissionData.message}
              </div>
            </div>

            <div className="border-t pt-4">
              <h4 className="font-semibold text-sm text-muted-foreground mb-2">Submission Metadata</h4>
              <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
                <div>
                  <span className="font-medium">Date/Time:</span> {userMetadata.datetime}
                </div>
                <div>
                  <span className="font-medium">Timezone:</span> {userMetadata.timezone}
                </div>
                <div>
                  <span className="font-medium">Browser:</span> {userMetadata.browser}
                </div>
                <div>
                  <span className="font-medium">Device:</span> {userMetadata.device}
                </div>
              </div>
            </div>
          </div>
        )}

        <DialogFooter className="mt-6 gap-2">
          <Button 
            variant="outline" 
            onClick={() => setShowPreview(false)}
          >
            Edit Details
          </Button>
          <Button 
            onClick={handleConfirmSubmission}
            className="bg-sapp-blue hover:bg-sapp-blue/90 text-white"
          >
            Confirm & Send Message
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

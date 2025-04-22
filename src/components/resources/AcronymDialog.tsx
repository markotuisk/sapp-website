
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

interface AcronymDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  acronym: {
    acronym: string;
    full_name: string;
    description: string;
    category: string;
  } | null;
}

const AcronymDialog = ({ open, onOpenChange, acronym }: AcronymDialogProps) => {
  if (!acronym) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            {acronym.acronym} - {acronym.full_name}
          </DialogTitle>
          <div className="inline-block px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
            {acronym.category}
          </div>
        </DialogHeader>
        <DialogDescription className="text-base leading-relaxed">
          {acronym.description}
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
};

export default AcronymDialog;

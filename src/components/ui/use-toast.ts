
// Re-export the toast implementation from hooks
export { useToast, toast, type ToastOptions } from "@/hooks/use-toast";

// For compatibility with existing code
export const toast = {
  dismiss: (toastId?: string) => {
    const { toast } = require("@/hooks/use-toast");
    toast.dismiss(toastId);
  }
};

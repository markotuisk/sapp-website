
import { type ToastProps, ToastActionElement } from "@/components/ui/toast";
import { useToast as useToastOriginal, toast as toastOriginal } from "@/components/ui/use-toast";
import { toast as sonnerToast } from 'sonner';

type ToastType = 'default' | 'success' | 'error' | 'warning' | 'info' | 'debug';

const isDev = process.env.NODE_ENV === 'development';

// Enhanced toast with debug type
export const useToast = () => {
  const baseToast = useToastOriginal();
  
  return {
    ...baseToast,
    debug: (title: string, description?: string) => {
      if (isDev) {
        baseToast.toast({
          title,
          description,
          variant: "default",
          className: "bg-purple-100 border-purple-400 text-purple-900",
        });
      }
    }
  };
};

// Create our enhanced toast object
const toastEnhanced = {
  ...toastOriginal,
  debug: (title: string, description?: string) => {
    if (isDev) {
      toastOriginal({
        title,
        description,
        variant: "default",
        className: "bg-purple-100 border-purple-400 text-purple-900",
      });
    }
  },
  sonner: {
    ...sonnerToast,
    debug: (message: string, options?: any) => {
      if (isDev) {
        sonnerToast(message, {
          ...options,
          className: "bg-purple-100 text-purple-900",
          icon: "🐞",
        });
      }
    }
  }
};

// Export the enhanced toast object
export const toast = toastEnhanced;

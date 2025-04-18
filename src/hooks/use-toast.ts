
import { useToast as useToastUI, toast as toastUI } from "@/components/ui/toast";
import { toast as sonnerToast } from 'sonner';

type ToastType = 'default' | 'success' | 'error' | 'warning' | 'info' | 'debug';

const isDev = process.env.NODE_ENV === 'development';

// Enhanced toast with debug type
export const useToast = () => {
  const baseToast = useToastUI();
  
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

// Enhanced toast function with debug type
export const toast = {
  ...toastUI,
  debug: (title: string, description?: string) => {
    if (isDev) {
      toastUI({
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

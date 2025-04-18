
import { type ToastProps, ToastActionElement } from "@/components/ui/toast";
import { toast as originalToast } from "@/components/ui/use-toast";
import { useToast as useToastOriginal } from "@/components/ui/use-toast";
import { toast as sonnerToast } from 'sonner';

type ToastType = 'default' | 'success' | 'error' | 'warning' | 'info' | 'debug';

const isDev = process.env.NODE_ENV === 'development';

// First define any helper functions (no dependencies on other functions in this file)
const createDebugToast = (title: string, description?: string) => {
  if (isDev) {
    originalToast({
      title,
      description,
      variant: "default",
      className: "bg-purple-100 border-purple-400 text-purple-900",
    });
  }
};

const createSonnerDebugToast = (message: string, options?: any) => {
  if (isDev) {
    sonnerToast(message, {
      ...options,
      className: "bg-purple-100 text-purple-900",
      icon: "🐞",
    });
  }
};

// Enhanced useToast hook
export const useToast = () => {
  const baseToast = useToastOriginal();
  
  return {
    ...baseToast,
    debug: (title: string, description?: string) => {
      createDebugToast(title, description);
    }
  };
};

// Create enhanced toast object
export const toast = {
  ...originalToast,
  debug: createDebugToast,
  sonner: {
    ...sonnerToast,
    debug: createSonnerDebugToast
  }
};

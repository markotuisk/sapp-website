
import { type ToastProps, ToastActionElement } from "@/components/ui/toast";
import { useToast as useToastOriginal } from "@/components/ui/use-toast";
import { toast as originalToast } from "@/components/ui/use-toast"; 
import { toast as sonnerToast } from 'sonner';

type ToastType = 'default' | 'success' | 'error' | 'warning' | 'info' | 'debug';

const isDev = process.env.NODE_ENV === 'development';

// Helper functions that don't depend on any other functions in this file
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

// First, define the base toast object that doesn't depend on other objects
const toastEnhanced = {
  ...originalToast,
  debug: createDebugToast,
  sonner: {
    ...sonnerToast,
    debug: createSonnerDebugToast
  }
};

// Then define the enhanced useToast hook
const useToastEnhanced = () => {
  const baseToast = useToastOriginal();
  
  return {
    ...baseToast,
    debug: (title: string, description?: string) => {
      createDebugToast(title, description);
    }
  };
};

// Finally export everything
export const toast = toastEnhanced;
export const useToast = useToastEnhanced;

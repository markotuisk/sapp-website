
import { type ToastProps } from "@/components/ui/toast";
import { useToast as useToastUI } from "@/components/ui/use-toast";
import { toast as sonnerToast } from 'sonner';

type ToastType = 'default' | 'success' | 'error' | 'warning' | 'info' | 'debug';

const isDev = process.env.NODE_ENV === 'development';

// Define functions before using them
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

// Create the base toast function
const originalToast = (props: ToastProps) => {
  // This will be extended when the actual toast system initializes
  console.log('Toast triggered:', props);
};

// Enhanced toast object with proper types
const toast = {
  ...originalToast,
  debug: createDebugToast,
  sonner: sonnerToast,
  dismiss: (toastId?: string) => {
    console.log('Toast dismissed:', toastId);
  }
};

// Add debug method to sonnerToast
toast.sonner.debug = createSonnerDebugToast;

// Enhanced useToast hook
const useToast = () => {
  const baseHook = useToastUI();
  
  return {
    ...baseHook,
    debug: (title: string, description?: string) => {
      createDebugToast(title, description);
    }
  };
};

export { toast, useToast };


import { type ToastProps, ToastActionElement } from "@/components/ui/toast";
import { useToast as useToastOriginal } from "@radix-ui/react-toast";
import { toast as sonnerToast } from 'sonner';

type ToastType = 'default' | 'success' | 'error' | 'warning' | 'info' | 'debug';

const isDev = process.env.NODE_ENV === 'development';

// Define base toast functionality (we'll build our enhanced toast on top of this)
type ToastFunction = {
  (props: ToastProps): void;
  dismiss: (toastId?: string) => void;
};

// Create a simple base toast function to avoid circular imports
const baseToast: ToastFunction = (props) => {
  // This will be overridden when the actual toast system initializes
  console.log('Toast triggered:', props);
};
baseToast.dismiss = (toastId) => {
  // This will be overridden when the actual toast system initializes
  console.log('Toast dismissed:', toastId);
};

// Helper functions that don't depend on other functions or imports
const createDebugToast = (title: string, description?: string) => {
  if (isDev) {
    baseToast({
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

// Define our enhanced toast object
const toast = {
  ...baseToast,
  debug: createDebugToast,
  sonner: {
    ...sonnerToast,
    debug: createSonnerDebugToast
  }
};

// Enhanced useToast hook
const useToast = () => {
  const baseHook = useToastOriginal();
  
  return {
    ...baseHook,
    debug: (title: string, description?: string) => {
      createDebugToast(title, description);
    }
  };
};

export { toast, useToast };

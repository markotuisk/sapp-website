
import * as React from "react";
import { toast as sonnerToast } from 'sonner';
import { 
  ToastProps, 
  ToastActionElement,
  toast as radixToast 
} from "@/components/ui/toast";

const isDev = process.env.NODE_ENV === 'development';

export interface ToastOptions extends Omit<ToastProps, "variant"> {
  title?: string;
  description?: string;
  variant?: "default" | "destructive";
  action?: ToastActionElement;
}

export function useToast() {
  const toast = React.useCallback((options: ToastOptions) => {
    const { title, description, variant, ...props } = options;
    
    // Use Sonner toast as primary implementation
    sonnerToast(title || description || '', {
      description: description && title ? description : undefined,
      className: variant === 'destructive' 
        ? 'bg-red-500 text-white' 
        : 'bg-blue-500 text-white'
    });

    // Optional: Also trigger Radix toast if needed
    if (radixToast) {
      radixToast({
        title,
        description,
        variant: variant || "default",
        ...props
      });
    }
  }, []);

  const debug = React.useCallback((message: string, options?: any) => {
    if (isDev) {
      sonnerToast.info(message, {
        description: options?.description,
        className: 'bg-purple-100 text-purple-900'
      });
    }
  }, []);

  return {
    toast,
    debug
  };
}

// Direct toast function
export const toast = (options: ToastOptions) => {
  const { title, description, variant, ...props } = options;
  
  sonnerToast(title || description || '', {
    description: description && title ? description : undefined,
    className: variant === 'destructive' 
      ? 'bg-red-500 text-white' 
      : 'bg-blue-500 text-white'
  });
};

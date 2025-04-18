
import * as React from "react";
import { toast as sonnerToast } from 'sonner';
import { type ToastActionElement, type ToastProps } from "@/components/ui/toast";
import {
  useToast as useToastPrimitive,
} from "@/components/ui/toast";

const isDev = process.env.NODE_ENV === 'development';

// Define types
export interface ToastOptions extends Omit<ToastProps, "variant"> {
  title?: string;
  description?: string;
  variant?: "default" | "destructive";
  action?: ToastActionElement;
}

// Radix UI toast implementation
export function useToast() {
  const { toast: toastPrimitive, ...methods } = useToastPrimitive();

  // Don't reference useToast again to avoid recursion
  const toast = React.useCallback(
    ({ title, description, variant, ...props }: ToastOptions) => {
      toastPrimitive({
        title,
        description,
        variant: variant || "default",
        ...props,
      });
    },
    [toastPrimitive]
  );

  // Debug toast wrapper
  const debug = React.useCallback(
    (title: string, description?: string) => {
      if (isDev) {
        toastPrimitive({
          title,
          description,
          variant: "default",
          className: "bg-purple-100 border-purple-400 text-purple-900",
        });
      }
    },
    [toastPrimitive]
  );

  return {
    ...methods,
    toast,
    debug,
  };
}

// Direct toast function implementation
const toast = (options: ToastOptions) => {
  const { title, description, variant, ...props } = options;
  
  console.log('Toast triggered:', options);
  
  // Add additional toast implementations here if needed
};

// Debug toast helper
const debug = (title: string, description?: string) => {
  if (isDev) {
    console.log(`DEBUG TOAST: ${title}`, description);
    // We only log in console, no UI toast in the direct implementation
  }
};

// Enhanced toast object with proper types
const enhancedToast = Object.assign(toast, {
  debug,
  sonner: sonnerToast,
  dismiss: (toastId?: string) => {
    console.log('Toast dismissed:', toastId);
  }
});

// Export the enhanced toast object
export { enhancedToast as toast };

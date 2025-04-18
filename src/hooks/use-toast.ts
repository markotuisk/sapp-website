
import * as React from "react";
import { toast as sonnerToast } from 'sonner';
import { 
  ToastProps, 
  ToastActionElement,
  Toast
} from "@/components/ui/toast";

const isDev = process.env.NODE_ENV === 'development';

export interface ToastOptions extends Omit<ToastProps, "variant"> {
  title?: string;
  description?: string;
  variant?: "default" | "destructive";
  action?: ToastActionElement;
}

// This stores toast state when using the hook version
const TOAST_STORE = {
  toasts: [] as { id: string; title?: string; description?: string; action?: ToastActionElement; variant?: "default" | "destructive" }[],
  listeners: new Set<() => void>(),
  
  subscribe(listener: () => void) {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  },
  
  addToast(toast: { id: string; title?: string; description?: string; action?: ToastActionElement; variant?: "default" | "destructive" }) {
    this.toasts = [...this.toasts, toast];
    this.listeners.forEach(listener => listener());
  },
  
  dismissToast(toastId: string) {
    this.toasts = this.toasts.filter(t => t.id !== toastId);
    this.listeners.forEach(listener => listener());
  }
};

// Utility to generate a unique ID
const generateId = () => Math.random().toString(36).substring(2, 9);

export function useToast() {
  const [toasts, setToasts] = React.useState(TOAST_STORE.toasts);
  
  React.useEffect(() => {
    const unsubscribe = TOAST_STORE.subscribe(() => {
      setToasts([...TOAST_STORE.toasts]);
    });
    return unsubscribe;
  }, []);

  const toast = React.useCallback((options: ToastOptions) => {
    const { title, description, variant, ...props } = options;
    const id = generateId();
    
    // Use Sonner toast as primary implementation
    sonnerToast(title || description || '', {
      description: description && title ? description : undefined,
      className: variant === 'destructive' 
        ? 'bg-red-500 text-white' 
        : 'bg-blue-500 text-white'
    });
    
    // Also add to our toast store for Radix UI toast
    TOAST_STORE.addToast({
      id,
      title,
      description,
      variant,
      ...props
    });
  }, []);

  const debug = React.useCallback((message: string, options?: any) => {
    if (isDev) {
      sonnerToast.info(message, {
        description: options?.description,
        className: 'bg-purple-100 text-purple-900'
      });
    }
  }, []);

  const dismiss = React.useCallback((toastId?: string) => {
    if (toastId) {
      TOAST_STORE.dismissToast(toastId);
    }
  }, []);

  return {
    toast,
    debug,
    dismiss,
    toasts
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
  
  // Also add to our toast store for potential Radix UI toast usage
  const id = generateId();
  TOAST_STORE.addToast({
    id,
    title,
    description,
    variant,
    ...props
  });
  
  return id;
};

// For compatibility with both APIs
toast.dismiss = (toastId?: string) => {
  if (toastId) {
    TOAST_STORE.dismissToast(toastId);
  }
};

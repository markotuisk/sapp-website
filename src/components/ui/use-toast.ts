
// Re-export the toast implementation from hooks
import { useToast } from "@/hooks/use-toast";
import { toast as hookToast } from "@/hooks/use-toast";
import type { ToastOptions } from "@/hooks/use-toast";

// Export the hook
export { useToast, ToastOptions };

// Export the toast function
export const toast = hookToast;

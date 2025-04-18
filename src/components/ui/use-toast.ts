
import { toast as toastImpl, useToast as useToastImpl } from "@/hooks/use-toast";

// Re-export the toast implementation
export const toast = toastImpl;
export const useToast = useToastImpl;


import { UseFormReturn } from "react-hook-form";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { ContactFormValues } from "../types";

export interface FieldValidationStatus {
  isTouched: boolean;
  isValid: boolean;
  hasError: boolean;
}

export function getFieldValidationStatus(
  form: UseFormReturn<ContactFormValues>,
  fieldName: keyof ContactFormValues
): FieldValidationStatus {
  const fieldState = form.getFieldState(fieldName);
  const isTouched = fieldState.isDirty || fieldState.isTouched;
  const isValid = !fieldState.invalid;
  
  return {
    isTouched,
    isValid,
    hasError: fieldState.invalid && isTouched
  };
}

export interface ValidationIndicatorProps {
  status: FieldValidationStatus;
  showCheck?: boolean;
}

export function ValidationIndicator({ status, showCheck = true }: ValidationIndicatorProps) {
  if (status.isTouched && status.isValid && showCheck) {
    return <Check className="h-3 w-3 ml-1 text-green-600" aria-hidden="true" />;
  }
  return null;
}

export function getFieldClasses(status: FieldValidationStatus, value?: string) {
  return {
    label: cn(
      "flex items-center",
      {
        "text-green-600": status.isTouched && status.isValid && value,
        "text-destructive": status.hasError
      }
    ),
    input: cn(
      "border-gray-200 focus-visible:ring-sapp-blue",
      {
        "border-green-600": status.isTouched && status.isValid && value,
        "border-destructive": status.hasError
      }
    )
  };
}

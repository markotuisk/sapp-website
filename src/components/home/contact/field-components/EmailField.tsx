
import React from "react";
import { UseFormReturn } from "react-hook-form";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { ContactFormValues } from "../types";
import { getFieldValidationStatus, ValidationIndicator } from "./FormField";

interface EmailFieldProps {
  form: UseFormReturn<ContactFormValues>;
}

export default function EmailField({ form }: EmailFieldProps) {
  return (
    <FormField
      control={form.control}
      name="email"
      render={({ field }) => {
        const status = getFieldValidationStatus(form, "email");
        const emailPhoneFieldState = form.getFieldState("email");
        const phoneFieldState = form.getFieldState("phone");
        const phoneValue = form.getValues("phone");
        
        // Either email or phone is valid
        const isEmailOrPhoneValid = 
          (status.isTouched && status.isValid && field.value) || 
          (phoneFieldState.isDirty && phoneValue);

        return (
          <FormItem className="space-y-2">
            <FormLabel className={cn(
              "flex items-center",
              {
                "text-green-600": isEmailOrPhoneValid,
                "text-destructive": emailPhoneFieldState.error && !phoneValue
              }
            )}>
              Email Address
              <span className="text-xs text-destructive ml-1">(Email or Phone required)</span>
              {isEmailOrPhoneValid && (
                <Check className="h-3 w-3 ml-1 text-green-600" aria-hidden="true" />
              )}
            </FormLabel>
            <FormControl>
              <Input 
                type="email" 
                placeholder="Enter your email address" 
                className={cn(
                  "border-gray-200 focus-visible:ring-sapp-blue",
                  {
                    "border-green-600": isEmailOrPhoneValid && field.value,
                    "border-destructive": emailPhoneFieldState.error && !phoneValue
                  }
                )}
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
}

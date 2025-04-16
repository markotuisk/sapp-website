
import React from "react";
import { UseFormReturn } from "react-hook-form";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { ContactFormValues } from "../types";
import { getFieldValidationStatus } from "./FormField";

interface PhoneFieldProps {
  form: UseFormReturn<ContactFormValues>;
}

export default function PhoneField({ form }: PhoneFieldProps) {
  return (
    <FormField
      control={form.control}
      name="phone"
      render={({ field }) => {
        const status = getFieldValidationStatus(form, "phone");
        const emailFieldState = form.getFieldState("email");
        const emailValue = form.getValues("email");
        
        // Either email or phone is valid
        const isEmailOrPhoneValid = 
          (status.isTouched && status.isValid && field.value) || 
          (emailFieldState.isDirty && emailValue);

        return (
          <FormItem className="space-y-2">
            <FormLabel className={cn(
              "flex items-center",
              {
                "text-green-600": isEmailOrPhoneValid,
                "text-destructive": status.hasError && !emailValue
              }
            )}>
              Phone Number
              <span className="text-xs text-destructive ml-1">(Email or Phone required)</span>
              {isEmailOrPhoneValid && (
                <Check className="h-3 w-3 ml-1 text-green-600" aria-hidden="true" />
              )}
            </FormLabel>
            <FormControl>
              <Input 
                placeholder="Enter your phone number" 
                className={cn(
                  "border-gray-200 focus-visible:ring-sapp-blue",
                  {
                    "border-green-600": isEmailOrPhoneValid && field.value,
                    "border-destructive": status.hasError && !emailValue
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

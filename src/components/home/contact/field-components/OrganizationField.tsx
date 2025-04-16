
import React from "react";
import { UseFormReturn } from "react-hook-form";
import { FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { ContactFormValues } from "../types";
import { getFieldValidationStatus, ValidationIndicator, getFieldClasses } from "./FormField";

interface OrganizationFieldProps {
  form: UseFormReturn<ContactFormValues>;
}

export default function OrganizationField({ form }: OrganizationFieldProps) {
  return (
    <FormField
      control={form.control}
      name="organization"
      render={({ field }) => {
        const status = getFieldValidationStatus(form, "organization");
        
        return (
          <FormItem className="space-y-2">
            <FormLabel className={cn(
              "flex items-center",
              {
                "text-green-600": status.isTouched && status.isValid && field.value,
              }
            )}>
              Company
              <ValidationIndicator status={status} showCheck={!!field.value} />
            </FormLabel>
            <FormControl>
              <Input 
                placeholder="Enter your company name" 
                className={cn(
                  "border-gray-200 focus-visible:ring-sapp-blue",
                  {
                    "border-green-600": status.isTouched && status.isValid && field.value,
                  }
                )}
                {...field}
              />
            </FormControl>
          </FormItem>
        );
      }}
    />
  );
}

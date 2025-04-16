
import React from "react";
import { UseFormReturn } from "react-hook-form";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Asterisk } from "lucide-react";
import { ContactFormValues } from "../types";
import { getFieldValidationStatus, ValidationIndicator, getFieldClasses } from "./FormField";

interface NameFieldProps {
  form: UseFormReturn<ContactFormValues>;
}

export default function NameField({ form }: NameFieldProps) {
  return (
    <FormField
      control={form.control}
      name="name"
      render={({ field }) => {
        const status = getFieldValidationStatus(form, "name");
        const classes = getFieldClasses(status, field.value);
        
        return (
          <FormItem className="space-y-2">
            <FormLabel className={classes.label}>
              Full Name
              <Asterisk className="h-3 w-3 text-destructive ml-1" aria-hidden="true" />
              <ValidationIndicator status={status} />
            </FormLabel>
            <FormControl>
              <Input 
                placeholder="Enter your full name" 
                className={classes.input}
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

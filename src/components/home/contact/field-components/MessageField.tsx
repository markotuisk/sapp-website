
import React from "react";
import { UseFormReturn } from "react-hook-form";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Asterisk } from "lucide-react";
import { cn } from "@/lib/utils";
import { ContactFormValues } from "../types";
import { getFieldValidationStatus, ValidationIndicator } from "./FormField";

interface MessageFieldProps {
  form: UseFormReturn<ContactFormValues>;
  messageLength: number;
}

export default function MessageField({ form, messageLength }: MessageFieldProps) {
  return (
    <FormField
      control={form.control}
      name="message"
      render={({ field }) => {
        const status = getFieldValidationStatus(form, "message");
        
        return (
          <FormItem className="space-y-2">
            <FormLabel className={cn(
              "flex items-center",
              {
                "text-green-600": status.isTouched && status.isValid && messageLength >= 10,
                "text-destructive": status.hasError
              }
            )}>
              Message
              <Asterisk className="h-3 w-3 text-destructive ml-1" aria-hidden="true" />
              {status.isTouched && status.isValid && messageLength >= 10 && (
                <ValidationIndicator status={status} />
              )}
            </FormLabel>
            <FormControl>
              <Textarea 
                placeholder="Tell us about your security needs" 
                className={cn(
                  "min-h-[120px] border-gray-200 focus-visible:ring-sapp-blue",
                  {
                    "border-green-600": status.isTouched && status.isValid && messageLength >= 10,
                    "border-destructive": status.hasError
                  }
                )}
                {...field}
                aria-describedby="message-counter"
              />
            </FormControl>
            <div 
              id="message-counter" 
              className={cn(
                "text-xs flex justify-end", 
                messageLength < 10 ? "text-destructive" : "text-sapp-gray"
              )}
            >
              {messageLength}/120 characters (minimum 10)
            </div>
            <FormMessage aria-live="polite" />
          </FormItem>
        );
      }}
    />
  );
}

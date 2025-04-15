
import { UseFormReturn } from "react-hook-form";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { SelectTrigger, SelectValue, SelectContent, SelectItem, Select } from "@/components/ui/select";
import { Check, Asterisk } from "lucide-react";
import { cn } from "@/lib/utils";
import { ContactFormValues } from "./types";

interface ContactFormFieldsProps {
  form: UseFormReturn<ContactFormValues>;
  messageLength: number;
  topics: string[];
}

export default function ContactFormFields({ form, messageLength, topics }: ContactFormFieldsProps) {
  // Helper function to determine field validation status
  const getFieldValidationStatus = (fieldName: keyof ContactFormValues) => {
    const fieldState = form.getFieldState(fieldName);
    const isTouched = fieldState.isDirty || fieldState.isTouched;
    const isValid = !fieldState.invalid;
    
    return {
      isTouched,
      isValid,
      hasError: fieldState.invalid && isTouched
    };
  };
  
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => {
            const status = getFieldValidationStatus("name");
            return (
              <FormItem className="space-y-2">
                <FormLabel className={cn(
                  "flex items-center",
                  {
                    "text-green-600": status.isTouched && status.isValid,
                    "text-destructive": status.hasError
                  }
                )}>
                  Full Name
                  <Asterisk className="h-3 w-3 text-destructive ml-1" aria-hidden="true" />
                  {status.isTouched && status.isValid && (
                    <Check className="h-3 w-3 ml-1 text-green-600" aria-hidden="true" />
                  )}
                </FormLabel>
                <FormControl>
                  <Input 
                    placeholder="Enter your full name" 
                    className={cn(
                      "border-gray-200 focus-visible:ring-sapp-blue",
                      {
                        "border-green-600": status.isTouched && status.isValid,
                        "border-destructive": status.hasError
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

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => {
            const status = getFieldValidationStatus("email");
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

        <FormField
          control={form.control}
          name="company"
          render={({ field }) => {
            const status = getFieldValidationStatus("company");
            return (
              <FormItem className="space-y-2">
                <FormLabel className={cn(
                  "flex items-center",
                  {
                    "text-green-600": status.isTouched && status.isValid && field.value,
                  }
                )}>
                  Company
                  {status.isTouched && status.isValid && field.value && (
                    <Check className="h-3 w-3 ml-1 text-green-600" aria-hidden="true" />
                  )}
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

        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => {
            const status = getFieldValidationStatus("phone");
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
      </div>

      <FormField
        control={form.control}
        name="topic"
        render={({ field }) => {
          const status = getFieldValidationStatus("topic");
          return (
            <FormItem className="space-y-2">
              <FormLabel className={cn(
                "flex items-center",
                {
                  "text-green-600": status.isTouched && status.isValid,
                  "text-destructive": status.hasError
                }
              )}>
                Select a topic
                <Asterisk className="h-3 w-3 text-destructive ml-1" aria-hidden="true" />
                {status.isTouched && status.isValid && (
                  <Check className="h-3 w-3 ml-1 text-green-600" aria-hidden="true" />
                )}
              </FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className={cn(
                    "border-gray-200 focus-visible:ring-sapp-blue",
                    {
                      "border-green-600": status.isTouched && status.isValid,
                      "border-destructive": status.hasError
                    }
                  )}>
                    <SelectValue placeholder="Choose a topic for your enquiry" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {topics.map((topic) => (
                    <SelectItem key={topic} value={topic}>
                      {topic}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          );
        }}
      />

      <FormField
        control={form.control}
        name="message"
        render={({ field }) => {
          const status = getFieldValidationStatus("message");
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
                  <Check className="h-3 w-3 ml-1 text-green-600" aria-hidden="true" />
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
    </>
  );
}


import React from "react";
import { UseFormReturn } from "react-hook-form";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { SelectTrigger, SelectValue, SelectContent, SelectItem, Select } from "@/components/ui/select";
import { Asterisk } from "lucide-react";
import { cn } from "@/lib/utils";
import { ContactFormValues } from "../types";
import { getFieldValidationStatus, ValidationIndicator, getFieldClasses } from "./FormField";

interface TopicFieldProps {
  form: UseFormReturn<ContactFormValues>;
  topics: string[];
}

export default function TopicField({ form, topics }: TopicFieldProps) {
  return (
    <FormField
      control={form.control}
      name="topic"
      render={({ field }) => {
        const status = getFieldValidationStatus(form, "topic");
        const classes = getFieldClasses(status, field.value);
        
        return (
          <FormItem className="space-y-2">
            <FormLabel className={classes.label}>
              Select a topic
              <Asterisk className="h-3 w-3 text-destructive ml-1" aria-hidden="true" />
              <ValidationIndicator status={status} />
            </FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger className={classes.input}>
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
  );
}

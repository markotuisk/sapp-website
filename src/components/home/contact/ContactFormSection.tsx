
import React from 'react';
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ContactFormValues, contactFormSchema } from './types';
import ContactFormFields from './ContactFormFields';
import ContactFormHeader from './form-components/ContactFormHeader';
import SubmitButton from './form-components/SubmitButton';
import { useContactFormSubmission } from './form-components/useContactFormSubmission';

interface ContactFormSectionProps {
  onSubmit: (data: ContactFormValues) => void;
  topics: string[];
  messageLength: number;
  setMessageLength: (length: number) => void;
}

const ContactFormSection: React.FC<ContactFormSectionProps> = ({ 
  onSubmit, 
  topics, 
  messageLength, 
  setMessageLength 
}) => {
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      organization: "",
      phone: "",
      topic: "",
      message: "",
    },
    mode: "onChange",
  });

  React.useEffect(() => {
    const subscription = form.watch((value, { name }) => {
      if (name === 'message' || !name) {
        setMessageLength(value.message?.length || 0);
      }
    });
    return () => subscription.unsubscribe();
  }, [form.watch, setMessageLength]);

  const { handleSubmit } = useContactFormSubmission({
    onSubmit,
    resetForm: form.reset,
    setMessageLength
  });

  return (
    <div className="p-6 md:p-8 lg:p-10">
      <ContactFormHeader />

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
          <ContactFormFields form={form} messageLength={messageLength} topics={topics} />
          <SubmitButton isValid={form.formState.isValid} />
        </form>
      </Form>
    </div>
  );
};

export default ContactFormSection;

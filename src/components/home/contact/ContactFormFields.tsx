
import { UseFormReturn } from "react-hook-form";
import { ContactFormValues } from "./types";
import NameField from "./field-components/NameField";
import EmailField from "./field-components/EmailField";
import OrganizationField from "./field-components/OrganizationField";
import PhoneField from "./field-components/PhoneField";
import TopicField from "./field-components/TopicField";
import MessageField from "./field-components/MessageField";

interface ContactFormFieldsProps {
  form: UseFormReturn<ContactFormValues>;
  messageLength: number;
  topics: string[];
}

export default function ContactFormFields({ form, messageLength, topics }: ContactFormFieldsProps) {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <NameField form={form} />
        <EmailField form={form} />
        <OrganizationField form={form} />
        <PhoneField form={form} />
      </div>

      <TopicField form={form} topics={topics} />
      <MessageField form={form} messageLength={messageLength} />
    </>
  );
}

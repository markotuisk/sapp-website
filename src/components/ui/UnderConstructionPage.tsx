
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import ContactFormDialog from "@/components/ui/ContactFormDialog";

const UnderConstructionPage = ({
  title = "Service Under Construction",
  description = "This page is currently under review. For more information, please contact our team."
}: {
  title?: string;
  description?: string;
}) => {
  const [contactOpen, setContactOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center px-4 py-16">
      <div className="max-w-xl mx-auto w-full py-12 px-6 bg-white rounded-xl shadow-lg flex flex-col items-center gap-8">
        <div className="flex flex-col items-center">
          <h1 className="text-4xl md:text-5xl font-bold text-[#DB2626] mb-3 text-center">{title}</h1>
          <p className="text-lg text-sapp-gray text-center">{description}</p>
        </div>
        <Button 
          className="bg-[#DB2626] hover:bg-[#DB2626]/90 text-white text-lg px-8 py-4 rounded"
          onClick={() => setContactOpen(true)}
        >
          Contact Us for More Info
        </Button>
      </div>
      <ContactFormDialog 
        open={contactOpen} 
        onOpenChange={setContactOpen} 
        defaultMessage="I'm interested in updates about this service." 
      />
    </div>
  );
};

export default UnderConstructionPage;


import React from 'react';
import { cn } from '@/lib/utils';

interface ContactHeaderProps {
  inView: boolean;
}

const ContactHeader: React.FC<ContactHeaderProps> = ({ inView }) => {
  return (
    <div className="max-w-3xl mx-auto text-center mb-16">
      <span 
        className={cn(
          "inline-block text-sapp-blue text-[19px] leading-[77px] tracking-[3.62px] font-medium mb-4 transition-all duration-500",
          inView ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
        )}
      >
        CONTACT US
      </span>
      <h2 
        className={cn(
          "text-3xl md:text-4xl font-display font-bold text-sapp-dark mb-6 transition-all duration-500 delay-100",
          inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        )}
      >
        Get in touch with <span className="text-sapp-blue">Team</span>
      </h2>
      <p 
        className={cn(
          "text-sapp-gray text-lg transition-all duration-500 delay-200",
          inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        )}
      >
        Have a question about our services or want to discuss your organization's security needs?
        Our team is ready to help you find the right solution.
      </p>
    </div>
  );
};

export default ContactHeader;

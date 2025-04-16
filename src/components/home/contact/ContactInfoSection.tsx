
import React from 'react';
import ContactInfoCard from './ContactInfoCard';
import { MapPin, Mail, Phone } from 'lucide-react';

interface ContactInfoItem {
  icon: string;
  title: string;
  details: string;
  copyIcon?: boolean;
  copy?: () => void;
  copied?: boolean;
}

interface ContactInfoSectionProps {
  contactInfo: ContactInfoItem[];
  inView: boolean;
}

const ContactInfoSection: React.FC<ContactInfoSectionProps> = ({ contactInfo, inView }) => {
  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case 'mapPin':
        return <MapPin className="h-5 w-5 text-sapp-blue" />;
      case 'mail':
        return <Mail className="h-5 w-5 text-sapp-blue" />;
      case 'phone':
        return <Phone className="h-5 w-5 text-sapp-blue" />;
      default:
        return <MapPin className="h-5 w-5 text-sapp-blue" />;
    }
  };

  return (
    <>
      {contactInfo.map((item, index) => (
        <ContactInfoCard
          key={index}
          icon={getIconComponent(item.icon)}
          title={item.title}
          details={item.details}
          copyIcon={item.copyIcon}
          copy={item.copy}
          copied={item.copied}
          index={index}
          inView={inView}
        />
      ))}
    </>
  );
};

export default ContactInfoSection;

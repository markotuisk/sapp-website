
import React from "react";

interface SectionLabelProps {
  children: React.ReactNode;
  className?: string;
}

const SectionLabel: React.FC<SectionLabelProps> = ({ children, className }) => (
  <h3
    className={`uppercase text-sapp-blue text-base tracking-wider mb-4 font-normal ${className || ""}`}
  >
    {children}
  </h3>
);

export default SectionLabel;

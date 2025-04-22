
import React from "react";

interface SectionLabelProps {
  children: React.ReactNode;
  className?: string;
}

const SectionLabel: React.FC<SectionLabelProps> = ({ children, className }) => (
  <div>
    <h3
      className={`uppercase font-bold text-sapp-blue text-base tracking-wider ${className || ""}`}
      style={{ margin: 0 }}
    >
      {children}
    </h3>
  </div>
);

export default SectionLabel;

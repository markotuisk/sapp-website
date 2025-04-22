
import React from "react";

interface SectionLabelProps {
  children: React.ReactNode;
  className?: string;
}

const SectionLabel: React.FC<SectionLabelProps> = ({ children, className }) => (
  <div className={`inline-block bg-sapp-blue/10 rounded-full px-4 py-1.5 mb-4`}>
    <h3
      className={`text-sm font-medium text-sapp-blue tracking-wider ${className || ""}`}
      style={{ margin: 0 }}
    >
      {children}
    </h3>
  </div>
);

export default SectionLabel;

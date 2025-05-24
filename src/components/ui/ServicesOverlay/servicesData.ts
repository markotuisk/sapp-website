
export interface ServiceItem {
  title: string;
  description: string;
  href: string;
  category?: string;
}

export interface ResourceItem {
  title: string;
  description: string;
  href: string;
  type: 'guide' | 'tool' | 'documentation' | 'resource';
}

export const services: ServiceItem[] = [
  // Event Security Services
  {
    title: "Event Security",
    description: "Comprehensive security solutions for events of all sizes",
    href: "/event-security",
    category: "event-security"
  },
  {
    title: "Event Monitoring",
    description: "Real-time monitoring and threat detection for live events",
    href: "/services/event-monitoring",
    category: "event-security"
  },
  
  // Physical Security Services
  {
    title: "Close Protection",
    description: "Personal protection services for high-profile individuals",
    href: "/services/close-protection",
    category: "physical-security"
  },
  {
    title: "Physical Security Assessments",
    description: "Comprehensive evaluation of physical security measures",
    href: "/services/physical-security-assessments",
    category: "physical-security"
  },
  {
    title: "Venue Security Audits",
    description: "Detailed security assessments for venues and facilities",
    href: "/services/venue-security-audits",
    category: "physical-security"
  },
  
  // Technical Security Services
  {
    title: "TSCM Inspections",
    description: "Technical Surveillance Countermeasures and bug sweeping",
    href: "/tscm",
    category: "technical-security"
  },
  {
    title: "Security Audits",
    description: "Comprehensive security assessments and vulnerability testing",
    href: "/security-audits",
    category: "technical-security"
  },
  {
    title: "Penetration Testing",
    description: "Ethical hacking and vulnerability assessment services",
    href: "/services/penetration-testing",
    category: "technical-security"
  },
  {
    title: "Compliance Audits",
    description: "Regulatory compliance assessment and certification support",
    href: "/services/compliance-audits",
    category: "technical-security"
  },
  
  // Cyber Security Services
  {
    title: "Cyber Security",
    description: "Digital security solutions and threat protection",
    href: "/cyber-security",
    category: "cyber-security"
  },
  {
    title: "Secure Technology",
    description: "Implementation of secure technology solutions",
    href: "/services/secure-technology",
    category: "cyber-security"
  },
  
  // Installation Services
  {
    title: "Security Installations",
    description: "Professional installation of security systems and equipment",
    href: "/installations",
    category: "installations"
  },
  {
    title: "CCTV & Access Control",
    description: "Installation and configuration of surveillance and access systems",
    href: "/installations/cctv-access",
    category: "installations"
  },
  {
    title: "Speech Privacy Systems",
    description: "Sound masking and speech privacy installation services",
    href: "/installations/speech-privacy",
    category: "installations"
  },
  {
    title: "Counter Surveillance",
    description: "Advanced counter-surveillance systems and privacy protection solutions",
    href: "/installations/counter-surveillance",
    category: "installations"
  }
];

export const resources: ResourceItem[] = [
  {
    title: "Security Planning Guide",
    description: "Comprehensive guide for planning security measures",
    href: "/resources/security-planning-guide",
    type: "guide"
  },
  {
    title: "Threat Assessment Tool",
    description: "Interactive tool for assessing security threats",
    href: "/resources/threat-assessment-tool",
    type: "tool"
  },
  {
    title: "Security Acronyms Database",
    description: "Comprehensive database of security industry acronyms",
    href: "/service-navigator/acronyms",
    type: "resource"
  },
  {
    title: "Compliance Checklist",
    description: "Regulatory compliance verification checklist",
    href: "/resources/compliance-checklist",
    type: "documentation"
  },
  {
    title: "Emergency Response Procedures",
    description: "Standard operating procedures for security incidents",
    href: "/resources/emergency-response",
    type: "documentation"
  }
];

export const filterItems = (items: (ServiceItem | ResourceItem)[], query: string) => {
  if (!query.trim()) return items;
  
  const searchTerm = query.toLowerCase();
  return items.filter(item => 
    item.title.toLowerCase().includes(searchTerm) ||
    item.description.toLowerCase().includes(searchTerm)
  );
};

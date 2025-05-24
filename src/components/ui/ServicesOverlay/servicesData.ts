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

// Types expected by the existing components
export interface ServiceCategory {
  category: string;
  items: {
    name: string;
    description: string;
    link: string;
    isActive?: boolean;
  }[];
}

export interface ResourceCategory {
  category: string;
  items: {
    name: string;
    description: string;
    link: string;
    isActive?: boolean;
  }[];
}

// Raw services data for internal use
export const rawServices: ServiceItem[] = [
  // Event Security Services
  {
    title: "Venue Security Audits",
    description: "Pre-event security assessment and planning",
    href: "/services/venue-security-audits",
    category: "event-security"
  },
  {
    title: "Event Monitoring",
    description: "Real-time surveillance and protection with advanced threat detection and device isolation capabilities",
    href: "/services/event-monitoring",
    category: "event-security"
  },
  {
    title: "Secure Technology",
    description: "Encrypted communications, secure networks, and comprehensive technology protection for sensitive events",
    href: "/services/secure-technology",
    category: "event-security"
  },
  {
    title: "Close Protection",
    description: "Personalised protection for individuals facing modern threats, from online harassment to physical security concerns",
    href: "/services/close-protection",
    category: "event-security"
  },
  
  // Security Audits Services
  {
    title: "Physical Security Assessments",
    description: "Comprehensive evaluation of physical security measures and vulnerabilities",
    href: "/services/physical-security-assessments",
    category: "security-audits"
  },
  {
    title: "Compliance Audits",
    description: "ISO27001 certified compliance audits to measure your organization's adherence to industry standards and regulatory requirements",
    href: "/services/compliance-audits",
    category: "security-audits"
  },
  {
    title: "TSCM Inspections",
    description: "Technical surveillance countermeasures to detect and prevent eavesdropping",
    href: "/tscm",
    category: "security-audits"
  },
  {
    title: "Penetration Tests",
    description: "Identifying vulnerabilities in your security infrastructure through ethical hacking and comprehensive testing",
    href: "/services/penetration-testing",
    category: "security-audits"
  },
  
  // Installations Services
  {
    title: "CCTV & Access Control",
    description: "Modern surveillance and access systems",
    href: "/installations/cctv-access",
    category: "installations"
  },
  {
    title: "Speech Privacy & Soundmasking",
    description: "Protecting sensitive conversations from eavesdropping through advanced acoustic solutions",
    href: "/services/speech-privacy",
    category: "installations"
  },
  {
    title: "Counter-Surveillance",
    description: "Protection against unwanted monitoring",
    href: "/installations/counter-surveillance",
    category: "installations"
  },
  {
    title: "Network Infrastructure",
    description: "Secure network design and deployment",
    href: "/installations/network-infrastructure",
    category: "installations"
  },
  
  // Cyber Security Services
  {
    title: "Threat Detection",
    description: "Identification of digital security risks",
    href: "/cyber-security/threat-detection",
    category: "cyber-security"
  },
  {
    title: "Network Security",
    description: "Protection for your digital infrastructure",
    href: "/cyber-security/network-security",
    category: "cyber-security"
  },
  {
    title: "IoT Device Protection",
    description: "Securing connected devices",
    href: "/cyber-security/iot-protection",
    category: "cyber-security"
  },
  {
    title: "Data Protection",
    description: "Safeguarding sensitive information",
    href: "/cyber-security/data-protection",
    category: "cyber-security"
  }
];

export const rawResources: ResourceItem[] = [
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

// Transform raw services into grouped categories for components
export const services: ServiceCategory[] = [
  {
    category: "Event Security",
    items: rawServices
      .filter(service => service.category === "event-security")
      .map(service => ({
        name: service.title,
        description: service.description,
        link: service.href,
        isActive: true
      }))
  },
  {
    category: "Security Audits",
    items: rawServices
      .filter(service => service.category === "security-audits")
      .map(service => ({
        name: service.title,
        description: service.description,
        link: service.href,
        isActive: true
      }))
  },
  {
    category: "Installations",
    items: rawServices
      .filter(service => service.category === "installations")
      .map(service => ({
        name: service.title,
        description: service.description,
        link: service.href,
        isActive: true
      }))
  },
  {
    category: "Cyber Security",
    items: rawServices
      .filter(service => service.category === "cyber-security")
      .map(service => ({
        name: service.title,
        description: service.description,
        link: service.href,
        isActive: true
      }))
  }
];

// Transform raw resources into grouped categories for components
export const resources: ResourceCategory[] = [
  {
    category: "Guides",
    items: rawResources
      .filter(resource => resource.type === "guide")
      .map(resource => ({
        name: resource.title,
        description: resource.description,
        link: resource.href,
        isActive: true
      }))
  },
  {
    category: "Tools",
    items: rawResources
      .filter(resource => resource.type === "tool")
      .map(resource => ({
        name: resource.title,
        description: resource.description,
        link: resource.href,
        isActive: true
      }))
  },
  {
    category: "Documentation",
    items: rawResources
      .filter(resource => resource.type === "documentation")
      .map(resource => ({
        name: resource.title,
        description: resource.description,
        link: resource.href,
        isActive: true
      }))
  },
  {
    category: "Resources",
    items: rawResources
      .filter(resource => resource.type === "resource")
      .map(resource => ({
        name: resource.title,
        description: resource.description,
        link: resource.href,
        isActive: true
      }))
  }
];

// Filter function that works with categorized data
export const filterItems = (categories: (ServiceCategory | ResourceCategory)[], query: string) => {
  if (!query.trim()) return categories;
  
  const searchTerm = query.toLowerCase();
  
  return categories.map(category => ({
    ...category,
    items: category.items.filter(item => 
      item.name.toLowerCase().includes(searchTerm) ||
      item.description.toLowerCase().includes(searchTerm)
    )
  })).filter(category => category.items.length > 0);
};

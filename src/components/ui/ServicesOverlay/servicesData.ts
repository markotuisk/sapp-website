

import { Shield, AlertTriangle, MonitorCheck, Wifi, Lock, Server, Database } from 'lucide-react';

export const servicesData = {
  installations: {
    title: "Installations & Technology",
    description: "Physical security installations and technology integration",
    services: [
      {
        title: "CCTV & Access Control",
        path: "/installations/cctv-access",
        description: "Modern surveillance and access systems"
      },
      {
        title: "Speech Privacy & Soundmasking",
        path: "/services/speech-privacy",
        description: "Protecting sensitive conversations from eavesdropping through advanced acoustic solutions"
      },
      {
        title: "Counter-Surveillance",
        path: "/installations/counter-surveillance", 
        description: "Protection against unwanted monitoring"
      },
      {
        title: "Network Infrastructure",
        path: "/installations/network-infrastructure",
        description: "Secure network design and deployment for small to medium offices and home network infrastructure installation support and management"
      }
    ]
  },
  security: {
    title: "Security Services",
    description: "Comprehensive security solutions for all environments",
    services: [
      {
        title: "Event Security",
        path: "/event-security",
        description: "Real-time protection for high-profile confidential meetings and events"
      },
      {
        title: "Venue Security Audits",
        path: "/services/venue-security-audits",
        description: "Pre-event security assessment and planning"
      },
      {
        title: "Event Monitoring",
        path: "/services/event-monitoring",
        description: "Real-time surveillance and protection with advanced threat detection and device isolation capabilities"
      },
      {
        title: "Secure Technology",
        path: "/services/secure-technology",
        description: "Encrypted communications, secure networks, and comprehensive technology protection for sensitive events"
      },
      {
        title: "Close Protection",
        path: "/services/close-protection",
        description: "Personalised protection for individuals facing modern threats, from online harassment to physical security"
      },
      {
        title: "Security Audits",
        path: "/security-audits",
        description: "Comprehensive evaluation of physical security measures and vulnerabilities"
      },
      {
        title: "Physical Security Assessments",
        path: "/services/physical-security-assessments",
        description: "On-site security evaluations and risk assessments"
      },
      {
        title: "Compliance Audits",
        path: "/services/compliance-audits",
        description: "ISO27001 certified compliance audits to measure your organization's adherence to industry standards and regulations"
      },
      {
        title: "TSCM Inspections",
        path: "/tscm",
        description: "Technical surveillance countermeasures to detect and prevent eavesdropping"
      },
      {
        title: "Penetration Tests",
        path: "/services/penetration-testing",
        description: "Identifying vulnerabilities in your security"
      }
    ]
  },
  cyber: {
    title: "Cyber Security",
    description: "Enterprise-grade cyber security services protecting digital assets",
    services: [
      {
        title: "Threat Detection",
        path: "/cyber-security",
        description: "Identification of digital security risks"
      },
      {
        title: "Network Security",
        path: "/cyber-security",
        description: "Protection for your digital infrastructure"
      },
      {
        title: "IoT Device Protection",
        path: "/cyber-security",
        description: "Securing connected devices"
      },
      {
        title: "Data Protection",
        path: "/cyber-security",
        description: "Safeguarding sensitive information"
      }
    ]
  }
};

export const resourcesData = [
  {
    title: "News",
    path: "/news",
    description: "Stay up-to-date with the latest security news and insights"
  },
  {
    title: "Acronyms",
    path: "/service-navigator/acronyms",
    description: "Learn about common security acronyms and terms"
  },
  {
    title: "Version Info",
    path: "/version-info",
    description: "See what's new in the latest version of our platform"
  }
];

// Transform servicesData into the format expected by other components
export const services = Object.values(servicesData).map(category => ({
  category: category.title,
  items: category.services.map(service => ({
    name: service.title,
    description: service.description,
    link: service.path,
    isActive: true // Mark all services as active
  }))
}));

// Transform resourcesData into the format expected by other components
export const resources = [{
  category: "Resources",
  items: resourcesData.map(resource => ({
    name: resource.title,
    description: resource.description,
    link: resource.path,
    isActive: true // Mark all resources as active
  }))
}];

// Filter function expected by other components
export const filterItems = (items: any[], searchQuery: string) => {
  if (!searchQuery) return items;
  
  return items.map(category => ({
    ...category,
    items: category.items.filter((item: any) => 
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(category => category.items.length > 0);
};


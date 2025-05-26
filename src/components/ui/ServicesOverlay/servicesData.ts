
import { Shield, AlertTriangle, MonitorCheck, Wifi, Lock, Server, Database } from 'lucide-react';

export const servicesData = {
  installations: {
    title: "Installations & Technology",
    description: "Physical security installations and technology integration",
    services: [
      {
        title: "CCTV & Access Control",
        path: "/installations/cctv-access",
        description: "Professional installation of surveillance and access control systems"
      },
      {
        title: "Counter-Surveillance Systems",
        path: "/installations/counter-surveillance", 
        description: "Advanced counter-surveillance and privacy protection technology"
      },
      {
        title: "Network Infrastructure",
        path: "/installations/network-infrastructure",
        description: "Secure network design and installation for small offices and integration projects"
      },
      {
        title: "Speech Privacy & Soundmasking",
        path: "/services/speech-privacy",
        description: "Sound masking and speech privacy solutions for confidential environments"
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
        title: "Security Audits",
        path: "/security-audits",
        description: "Certified ISO27001 physical security audits to identify security gaps"
      },
      {
        title: "Close Protection",
        path: "/services/close-protection",
        description: "Executive protection and personal security services"
      },
      {
        title: "Physical Security Assessments",
        path: "/services/physical-security-assessments",
        description: "On-site security evaluations and risk assessments"
      },
      {
        title: "Venue Security Audits",
        path: "/services/venue-security-audits",
        description: "Specialized security audits for venues and public spaces"
      },
      {
        title: "Event Monitoring",
        path: "/services/event-monitoring",
        description: "Real-time monitoring and security management for events"
      }
    ]
  },
  cyber: {
    title: "Cyber Security",
    description: "Enterprise-grade cyber security services protecting digital assets",
    services: [
      {
        title: "Penetration Testing",
        path: "/services/penetration-testing",
        description: "Ethical hacking and vulnerability assessments"
      },
      {
        title: "Compliance Audits",
        path: "/services/compliance-audits",
        description: "Compliance audits to meet regulatory requirements"
      },
    ]
  },
  tscm: {
    title: "TSCM Services",
    description: "Technical Surveillance Counter-Measures",
    services: [
      {
        title: "TSCM",
        path: "/tscm",
        description: "Technical Surveillance Counter-Measures"
      },
    ]
  },
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

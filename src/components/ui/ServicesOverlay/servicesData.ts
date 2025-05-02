
export interface ServiceItem {
  name: string;
  description: string;
  link: string;
  isActive?: boolean;
}

export interface ServiceCategory {
  category: string;
  items: ServiceItem[];
}

export const services: ServiceCategory[] = [
  {
    category: 'Event Security',
    items: [
      { name: 'Venue Security Audits', description: 'Pre-event security assessment and planning', link: '/services/venue-security-audits', isActive: false },
      { name: 'Event Monitoring', description: 'Real-time surveillance during high-profile events', link: '/services/event-monitoring', isActive: false },
      { name: 'Secure Technology', description: 'Secure communications for event organizers', link: '/services/secure-technology', isActive: false },
      { name: 'Close Protection', description: 'Personalized protection for individuals facing modern threats, from online harassment to physical security concerns.', link: '/services/close-protection', isActive: true }
    ]
  },
  {
    category: 'Security Audits',
    items: [
      { name: 'Physical Security Assessments', description: 'Comprehensive evaluation of physical security measures and vulnerabilities.', link: '/services/physical-security-assessments', isActive: false },
      { name: 'Compliance Audits', description: 'ISO27001 and regulatory compliance checks', link: '/security-audits#compliance', isActive: false },
      { name: 'TSCM Inspections', description: 'Technical surveillance countermeasures to detect and prevent eavesdropping.', link: '/tscm', isActive: true },
      { name: 'Penetration Tests', description: 'Identifying vulnerabilities in your security', link: '/security-audits#penetration', isActive: false }
    ]
  },
  {
    category: 'Installations',
    items: [
      { name: 'CCTV & Access Control', description: 'Modern surveillance and access systems', link: '/installations/cctv-access', isActive: false },
      { name: 'Speech Privacy & Soundmasking', description: 'Protecting sensitive conversations from eavesdropping through advanced acoustic solutions', link: '/services/speech-privacy', isActive: true },
      { name: 'Counter-Surveillance', description: 'Protection against unwanted monitoring', link: '/installations/counter-surveillance', isActive: false },
      { name: 'Network Infrastructure', description: 'Secure network design and deployment', link: '/installations/network-infrastructure', isActive: false }
    ]
  },
  {
    category: 'Cyber Security',
    items: [
      { name: 'Threat Detection', description: 'Identification of digital security risks', link: '/cyber-security#threat-detection', isActive: false },
      { name: 'Network Security', description: 'Protection for your digital infrastructure', link: '/cyber-security#network', isActive: false },
      { name: 'IoT Device Protection', description: 'Securing connected devices', link: '/cyber-security#iot', isActive: false },
      { name: 'Data Protection', description: 'Safeguarding sensitive information', link: '/cyber-security#data', isActive: false }
    ]
  }
];

export const resources: ServiceCategory[] = [
  {
    category: 'Knowledge Base',
    items: [
      { name: 'Security Guides', description: 'Best practices and implementation guides', link: '#', isActive: false },
      { name: 'Industry Standards', description: 'Overview of relevant security standards', link: '#', isActive: false }
    ]
  },
  {
    category: 'Media',
    items: [
      { name: 'Case Studies', description: 'Real-world security implementation examples', link: '#', isActive: false },
      { name: 'Articles', description: 'Insights on security trends and technologies', link: '#', isActive: false }
    ]
  }
];

export const filterItems = (categories: ServiceCategory[], query: string): ServiceCategory[] => {
  if (!query) return categories;
  
  return categories
    .map(category => ({
      ...category,
      items: category.items.filter(item => 
        item.name.toLowerCase().includes(query.toLowerCase()) ||
        item.description.toLowerCase().includes(query.toLowerCase())
      )
    }))
    .filter(category => category.items.length > 0);
};

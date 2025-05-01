export interface ServiceItem {
  name: string;
  description: string;
  link: string;
}

export interface ServiceCategory {
  category: string;
  items: ServiceItem[];
}

export const services: ServiceCategory[] = [
  {
    category: 'Event Security',
    items: [
      { name: 'Venue Security Audits', description: 'Pre-event security assessment and planning', link: '/services/venue-security-audits' },
      { name: 'Event Monitoring', description: 'Real-time surveillance during high-profile events', link: '/services/event-monitoring' },
      { name: 'Secure Technology', description: 'Secure communications for event organizers', link: '/services/secure-technology' },
      { name: 'Close Protection', description: 'Executive protection for high-profile individuals at events and during travel.', link: '/services/close-protection' }
    ]
  },
  {
    category: 'Security Audits',
    items: [
      { name: 'Physical Security Assessments', description: 'Comprehensive evaluation of physical security measures and vulnerabilities.', link: '/services/physical-security-assessments' },
      { name: 'Compliance Audits', description: 'ISO27001 and regulatory compliance checks', link: '/security-audits#compliance' },
      { name: 'TSCM Inspections', description: 'Technical surveillance countermeasures to detect and prevent eavesdropping.', link: '/tscm' },
      { name: 'Penetration Tests', description: 'Identifying vulnerabilities in your security', link: '/security-audits#penetration' }
    ]
  },
  {
    category: 'Installations',
    items: [
      { name: 'CCTV & Access Control', description: 'Modern surveillance and access systems', link: '/installations/cctv-access' },
      { name: 'Speech Privacy Systems', description: 'Protecting sensitive conversations', link: '/installations/speech-privacy' },
      { name: 'Counter-Surveillance', description: 'Protection against unwanted monitoring', link: '/installations/counter-surveillance' },
      { name: 'Network Infrastructure', description: 'Secure network design and deployment', link: '/installations/network-infrastructure' }
    ]
  },
  {
    category: 'Cyber Security',
    items: [
      { name: 'Threat Detection', description: 'Identification of digital security risks', link: '/cyber-security#threat-detection' },
      { name: 'Network Security', description: 'Protection for your digital infrastructure', link: '/cyber-security#network' },
      { name: 'IoT Device Protection', description: 'Securing connected devices', link: '/cyber-security#iot' },
      { name: 'Data Protection', description: 'Safeguarding sensitive information', link: '/cyber-security#data' }
    ]
  }
];

export const resources: ServiceCategory[] = [
  {
    category: 'Knowledge Base',
    items: [
      { name: 'Security Guides', description: 'Best practices and implementation guides', link: '#' },
      { name: 'Industry Standards', description: 'Overview of relevant security standards', link: '#' }
    ]
  },
  {
    category: 'Media',
    items: [
      { name: 'Case Studies', description: 'Real-world security implementation examples', link: '#' },
      { name: 'Articles', description: 'Insights on security trends and technologies', link: '#' }
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


// Define the type for the service data
export interface ServiceData {
  title: string;
  description: string;
  items?: string[];
  href: string;
  imagePath?: string;
  delay?: number;
}

// Export the services data
export const servicesData: ServiceData[] = [
  {
    title: "Event Security",
    description: "Comprehensive security solutions for events of all sizes, ensuring safety while maintaining a positive attendee experience.",
    href: "/event-security",
    delay: 100
  },
  {
    title: "Security Audits",
    description: "Independent security assessments to identify vulnerabilities and provide actionable recommendations for improvement.",
    href: "/security-audits",
    delay: 200
  },
  {
    title: "Installations",
    description: "Professional installation of security systems, including CCTV, access control, and counter-surveillance equipment.",
    href: "/installations",
    delay: 300
  },
  {
    title: "Cyber Security",
    description: "Protecting your digital assets with comprehensive cyber security solutions, from threat detection to data protection.",
    href: "/cyber-security",
    delay: 400
  }
];


interface ServiceData {
  title: string;
  description: string;
  items?: string[];
  href: string;
  delay?: number;
  imagePath?: string;
}

export const servicesData: ServiceData[] = [
  {
    title: "Event Security",
    description: "Comprehensive security solutions for events of all sizes, including venue audits, monitoring, and VIP protection.",
    href: "/event-security",
    delay: 100
  },
  {
    title: "Security Audits",
    description: "Professional security assessments including physical evaluations, compliance checks, and vulnerability testing.",
    href: "/security-audits",
    delay: 200
  },
  {
    title: "Installations",
    description: "Advanced security installations including CCTV, access control, speech privacy, and counter-surveillance systems.",
    href: "/installations",
    delay: 300
  },
  {
    title: "Cyber Security",
    description: "Digital security solutions including threat detection, network security, and data protection services.",
    href: "/cyber-security",
    delay: 400
  }
];

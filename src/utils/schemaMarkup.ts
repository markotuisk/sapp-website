
export interface OrganizationSchema {
  "@context": "https://schema.org";
  "@type": "Organization";
  name: string;
  url: string;
  logo?: string;
  contactPoint?: {
    "@type": "ContactPoint";
    telephone?: string;
    contactType: string;
    email?: string;
  };
  address?: {
    "@type": "PostalAddress";
    streetAddress?: string;
    addressLocality?: string;
    addressCountry?: string;
  };
  sameAs?: string[];
}

export interface WebPageSchema {
  "@context": "https://schema.org";
  "@type": "WebPage";
  name: string;
  description?: string;
  url: string;
  mainEntity?: any;
  breadcrumb?: {
    "@type": "BreadcrumbList";
    itemListElement: Array<{
      "@type": "ListItem";
      position: number;
      name: string;
      item?: string;
    }>;
  };
}

export interface ServiceSchema {
  "@context": "https://schema.org";
  "@type": "Service";
  name: string;
  description: string;
  provider: {
    "@type": "Organization";
    name: string;
  };
  serviceType: string;
  areaServed?: string[];
}

export const generateOrganizationSchema = (): OrganizationSchema => ({
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "SAPP Security",
  url: "https://sappsecurity.com",
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer service",
    email: "info@sappsecurity.com"
  },
  sameAs: [
    "https://linkedin.com/company/sapp-security",
    "https://twitter.com/sappsecurity"
  ]
});

export const generateWebPageSchema = (
  name: string,
  description: string,
  url: string,
  breadcrumbs?: Array<{ name: string; url?: string }>
): WebPageSchema => {
  const schema: WebPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name,
    description,
    url
  };

  if (breadcrumbs && breadcrumbs.length > 1) {
    schema.breadcrumb = {
      "@type": "BreadcrumbList",
      itemListElement: breadcrumbs.map((crumb, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: crumb.name,
        ...(crumb.url && { item: crumb.url })
      }))
    };
  }

  return schema;
};

export const generateServiceSchema = (
  name: string,
  description: string,
  serviceType: string
): ServiceSchema => ({
  "@context": "https://schema.org",
  "@type": "Service",
  name,
  description,
  serviceType,
  provider: {
    "@type": "Organization",
    name: "SAPP Security"
  },
  areaServed: ["United Kingdom", "Europe"]
});

export const injectSchemaMarkup = (schema: any) => {
  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.textContent = JSON.stringify(schema);
  
  // Remove any existing schema of the same type
  const existingScript = document.querySelector(
    `script[type="application/ld+json"]`
  );
  if (existingScript) {
    existingScript.remove();
  }
  
  document.head.appendChild(script);
};

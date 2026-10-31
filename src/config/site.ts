/**
 * NEXARIS Site & Brand Configuration
 * Consumer Retail Food Brand & Global Agricultural Export House
 * Spices · Dal & Pulses · Dry Fruits & Nuts
 * Institutional Palette: Deep Navy (#0A192F / #0F172A), Warm Ivory (#FAF8F5), Warm Gold (#D4AF37 / #C5A059)
 */

export interface Founder {
  name: string;
  role: string;
  email: string;
  linkedIn: string;
  description: string;
  initials: string;
}

export const SITE_CONFIG = {
  brandName: 'NEXARIS',
  domain: 'https://nexaris.co.in',
  tagline: 'Quality and Excellence in Every Product',
  primaryBrandIdentity: 'NEXARIS',
  heroEyebrow: 'PREMIUM SPICES, PULSES & DRY FRUITS',
  heroHeadline: 'NEXARIS',
  heroSubheadline:
    'NEXARIS has consistently aimed to provide quality products. From the beginning, our goal and vision have been clear, focusing on delivering excellence in every product we offer.',

  // Business Divisions
  divisions: {
    spices: {
      name: 'Spices & Whole Seeds',
      slug: 'spices',
      path: '/products?division=spices',
      headline: 'Aromatic Whole & Ground Spices',
      description: 'Cumin, Fennel, Coriander, Turmeric, Red Chilli, and Mustard directly procured from premier Gujarat and Rajasthan APMC yards.',
    },
    pulses: {
      name: 'Dal & Pulses',
      slug: 'pulses',
      path: '/products?division=pulses',
      headline: 'Sortex Cleaned Pulses & Lentils',
      description: 'Premium Toor Dal, Chana Dal, Moong Dal, Kabuli Chana, Urad, and Masoor Dal with high protein and clean-label purity.',
    },
    dryFruits: {
      name: 'Dry Fruits & Nuts',
      slug: 'dry-fruits',
      path: '/products?division=dry-fruits',
      headline: 'Finest Hand-Selected Dry Fruits',
      description: 'California Almonds, Whole Cashews (W240/W320), Roasted Pistachios, Golden Raisins, and Kashmiri Walnuts.',
    },
    export: {
      name: 'Global Export Division',
      slug: 'export',
      path: '/export',
      headline: 'Containerized Cargo & Port Logistics',
      description: 'FCL & bulk shipments dispatched via Mundra and Kandla Ports with global phytosanitary, APEDA, and SGS inspection.',
    },
  },

  // Verifiable Agro Export & Retail Capabilities
  capabilities: [
    {
      title: 'Farm Origin & APMC Sourcing',
      description:
        'Procuring directly from verified farmer clusters and Saurashtra / Unjha APMC yards for maximum freshness and origin traceability.',
    },
    {
      title: 'Multi-Stage Sortex Cleaning',
      description:
        'Bühler optical colour sorters, gravity separators, and destoners ensure 99.5% purity free from stones, dust, and foreign seeds.',
    },
    {
      title: 'Consumer Retail Packaging',
      description:
        'Attractive stand-up barrier pouches (100g, 250g, 500g, 1kg) with nitrogen flushing and zip-locks for retail shelf longevity.',
    },
    {
      title: 'Mundra & Kandla Port Logistics',
      description:
        'Container stuffing and logistics directly from Gujarat gateway terminals (Mundra Port & Deendayal Port Kandla) under FOB, CIF, CFR, and EXW terms.',
    },
  ],

  // Official PDF Product Catalogue
  cataloguePdfUrl: '/assets/aistudio/Jaggery_Catalogue_a997405a.pdf',

  // Verified Business Contact Details & Registered Office
  contact: {
    businessName: 'NEXARIS',
    companyShort: 'NEXARIS',
    phone: '+91 85119 12115',
    altPhone: '+91 98246 18484',
    phoneTel: '+918511912115',
    whatsappNumber: '+918511912115',
    whatsappClean: '918511912115',
    whatsappUrl: 'https://wa.me/918511912115',
    email: 'contact@nexaris.co.in',
    registeredOffice: 'Gandhinagar, Gujarat, India',
    location: 'Gandhinagar, Gujarat, India',
    city: 'Gandhinagar',
    state: 'Gujarat',
    country: 'India',
    website: 'https://nexaris.co.in',
    companyLinkedIn: 'https://www.linkedin.com/company/nexaris1/home/?viewAsMember=true',
    loadingPorts: ['Mundra Port (INMUN)', 'Deendayal Port Kandla (IXY)'],
  },

  // Leadership Team (Managing Partners)
  founders: [
    {
      name: 'Mr. Abhi Nilesh Tiwari',
      role: 'Managing Partner — Strategy & Global Supply Chain',
      email: 'abhi@nexaris.co.in',
      linkedIn: 'https://www.linkedin.com/in/abhi-tiwari-18715727b/',
      description:
        'Leads institutional brand strategy, international food retail packaging, and commodity traceability.',
      initials: 'AT',
    },
    {
      name: 'Mr. Krishnapalsinh Rajendrasinh Parmar',
      role: 'Partner — International Business Development',
      email: 'krishnapalsinh@nexaris.co.in',
      linkedIn: 'https://www.linkedin.com/in/parmar-krishnapalsinh-r-658431376/',
      description:
        'Drives international distributor and supermarket retail partnerships across the GCC, Europe, and Southeast Asia.',
      initials: 'KP',
    },
    {
      name: 'Mr. Rudra Aniruddhkumar Pandya',
      role: 'Partner — Sourcing & Processing Operations',
      email: 'rudrapandya@nexaris.co.in',
      linkedIn: 'https://www.linkedin.com/in/rudra-pandya-925875446/',
      description:
        'Oversees Gujarat APMC farm procurement, Sortex cleaning operations, retail packaging quality, and container stuffing.',
      initials: 'RP',
    },
  ] as Founder[],

  // Compliance Alignment
  compliance: {
    statutoryAlignment: [
      { name: 'FSSAI', full: 'Food Safety and Standards Authority of India (Food Safety License)' },
      { name: 'APEDA', full: 'Agricultural and Processed Food Products Export Development Authority' },
      { name: 'Spices Board India', full: 'Spices Board (Ministry of Commerce and Industry, Govt. of India)' },
      { name: 'Halal Certified', full: 'Halal Quality Certification for GCC and Global Islamic Markets' },
      { name: 'US FDA', full: 'Food and Drug Administration Facility Registration Compliance' },
      { name: 'IAF / ISO', full: 'International Accreditation Forum ISO 22000 / HACCP Standard' },
      { name: 'GMP Quality', full: 'Good Manufacturing Practices for Clean Food Processing' },
      { name: 'MSME', full: 'Ministry of Micro, Small and Medium Enterprises Registration' },
    ],
  },
};

/**
 * Generates an encoded WhatsApp chat URL
 */
export function getWhatsAppUrl(productName?: string, hsCode?: string): string {
  const number = SITE_CONFIG.contact.whatsappClean;
  const defaultText = productName
    ? `Hello NEXARIS Desk, I would like to request an RFQ / Technical Specification for ${productName}${hsCode ? ` (HS: ${hsCode})` : ''}. Sourcing volume / destination city: `
    : 'Hello NEXARIS Desk, I would like to enquire about your retail and bulk range of Spices, Dal & Pulses, and Dry Fruits.';

  return `https://wa.me/${number}?text=${encodeURIComponent(defaultText)}`;
}

/**
 * Generates an encoded WhatsApp chat URL for TDS specification requests.
 */
export function getTdsWhatsAppUrl(productName: string, hsCode?: string): string {
  const number = SITE_CONFIG.contact.whatsappClean;
  const message = `Hello NEXARIS Desk, I am requesting the official Technical Data Sheet (TDS) and batch lab COA for: ${productName}${hsCode ? ` (HS Code: ${hsCode})` : ''}. Sourcing destination / city: `;
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

/**
 * Returns the telephone link for direct dialing.
 */
export function getTelLink(): string {
  return `tel:${SITE_CONFIG.contact.phoneTel}`;
}

/**
 * Returns the mailto link for direct emailing.
 */
export function getMailtoLink(subject?: string): string {
  if (subject) {
    return `mailto:${SITE_CONFIG.contact.email}?subject=${encodeURIComponent(subject)}`;
  }
  return `mailto:${SITE_CONFIG.contact.email}`;
}

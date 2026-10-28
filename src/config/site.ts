/**
 * NEXARIS Site & Brand Configuration
 * Exclusively Dedicated to Natural Sugarcane Sweeteners & Export-Grade Jaggery (HS Code Chapter 17)
 * Institutional Palette: Deep Navy (#0A192F / #0F172A), Ivory/Off-White (#FAF8F5), Warm Gold (#D4AF37 / #C5A059)
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
  tagline: 'One Partner. Many Possibilities.',
  primaryBrandIdentity: 'NEXARIS — Natural Sugarcane Sweeteners Export House',
  heroEyebrow: 'NATURAL SUGARCANE SWEETENERS · HS CODE CHAPTER 17',
  heroHeadline: 'One Partner. Many Possibilities.',
  heroSubheadline:
    'B2B Sourcing & Export Coordination for Certified Natural Sugarcane Sweeteners & Export-Grade Jaggery.',

  // Business Division: Jaggery & Natural Cane Sugars
  divisions: {
    jaggery: {
      name: 'Natural Jaggery Sweeteners',
      slug: 'jaggery',
      path: '/jaggery',
      count: '4 Export Grades',
      hsCodeChapter: 'Chapter 17',
      headline: 'Export-Grade Unrefined Jaggery & Sugarcane Sweeteners',
      description:
        '100% Sulphur-free organic jaggery powder, uniform portion cubes, traditional bheli blocks, and high-Brix pourable cane syrup under HS Code Chapter 17.',
    },
  },

  // Verifiable Jaggery Export Capabilities
  capabilities: [
    {
      title: 'Direct Sugarcane Origin Sourcing',
      description:
        'Procuring directly from verified sugarcane farming tracts and certified processing khandsaris in Western India for maximum purity and fresh-crush aroma.',
    },
    {
      title: '100% Sulphur-Free Processing',
      description:
        'Zero chemical bleaching agents (no sodium hydrosulphite / SO₂). Clarified using natural botanical extracts (okra mucilage) to safeguard clean-label integrity.',
    },
    {
      title: 'Export Packaging Customization',
      description:
        'Custom packaging solutions from 500g/1kg retail-ready stand-up zip pouches and food-grade jars to 25kg multi-wall bags, 20kg HDPE pails, and 250kg steel drums.',
    },
    {
      title: 'Mundra & Kandla Port Logistics',
      description:
        'Ocean container freight coordination directly from Gujarat gateway container terminals (Mundra Port & Deendayal Port Kandla) under FOB, CIF, CFR, and Ex-Works terms.',
    },
  ],

  // Official PDF Product Catalogue
  cataloguePdfUrl: '/assets/aistudio/Jaggery_Catalogue_a997405a.pdf',

  // Verified Business Contact Details & Registered Office
  contact: {
    businessName: 'NEXARIS',
    phone: '+91 85119 12115',
    phoneTel: '+918511912115',
    whatsappNumber: '+918511912115',
    whatsappClean: '918511912115',
    whatsappUrl: 'https://wa.me/918511912115',
    email: 'contact@nexaris.co.in',
    registeredOffice: 'Gandhinagar, Gujarat, India',
    location: 'Gandhinagar, Gujarat, India',
    website: 'https://nexaris.co.in',
    companyLinkedIn: 'https://www.linkedin.com/company/nexaris1/home/?viewAsMember=true',
    loadingPorts: ['Mundra Port (INMUN)', 'Deendayal Port Kandla (IXY)'],
  },

  // Leadership Team (Managing Partners)
  founders: [
    {
      name: 'Mr. Abhi Nilesh Tiwari',
      role: 'Managing Partner — Strategy & Technology',
      email: 'abhi@nexaris.co.in',
      linkedIn: 'https://www.linkedin.com/in/abhi-tiwari-18715727b/',
      description:
        'Leads institutional strategy, international digital infrastructure, buyer specification compliance, and Jaggery commodity traceability.',
      initials: 'AT',
    },
    {
      name: 'Mr. Krishnapalsinh Rajendrasinh Parmar',
      role: 'Partner — Business Development',
      email: 'krishnapalsinh@nexaris.co.in',
      linkedIn: 'https://www.linkedin.com/in/parmar-krishnapalsinh-r-658431376/',
      description:
        'Drives international buyer relationships across the GCC, Europe, North America, and Southeast Asia for natural unrefined sweeteners.',
      initials: 'KP',
    },
    {
      name: 'Mr. Rudra Aniruddhkumar Pandya',
      role: 'Partner — Operations',
      email: 'rudrapandya@nexaris.co.in',
      linkedIn: 'https://www.linkedin.com/in/rudra-pandya-925875446/',
      description:
        'Oversees cane tract procurement, khandsari processing quality assurance, moisture testing, packaging customization, and port container stuffing.',
      initials: 'RP',
    },
  ] as Founder[],

  // Compliance Alignment
  compliance: {
    statutoryAlignment: [
      { name: 'APEDA', full: 'Agricultural and Processed Food Products Export Development Authority' },
      { name: 'FSSAI', full: 'Food Safety and Standards Authority of India (Food Safety Alignment)' },
      { name: 'Phytosanitary', full: 'Directorate of Plant Protection, Quarantine & Storage Certification' },
      { name: 'Certificate of Origin', full: 'Chamber of Commerce & DGFT Authorized Origin Issuance' },
    ],
  },
};

/**
 * Generates an encoded WhatsApp chat URL using the primary verified business WhatsApp number.
 */
export function getWhatsAppUrl(productName?: string, hsCode?: string): string {
  const number = SITE_CONFIG.contact.whatsappClean;
  const defaultText = productName
    ? `Hello NEXARIS Commercial Desk, I would like to request an RFQ / Technical Data Sheet for ${productName}${hsCode ? ` (HS: ${hsCode})` : ''}. Sourcing volume / discharge port: `
    : 'Hello NEXARIS Commercial Desk, I would like to enquire about your export-grade natural jaggery sweeteners (HS Code Chapter 17).';

  return `https://wa.me/${number}?text=${encodeURIComponent(defaultText)}`;
}

/**
 * Generates an encoded WhatsApp chat URL for TDS specification sheet requests.
 */
export function getTdsWhatsAppUrl(productName: string, hsCode?: string): string {
  const number = SITE_CONFIG.contact.whatsappClean;
  const message = `Hello NEXARIS Commercial Desk, I am requesting the official Technical Data Sheet (TDS) and batch lab COA for: ${productName}${hsCode ? ` (HS Code: ${hsCode})` : ''}. Sourcing destination / port: `;
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

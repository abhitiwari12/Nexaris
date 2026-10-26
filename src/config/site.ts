/**
 * NEXARIS Site & Brand Configuration
 * Centralized settings for business data, domain, founders, and external communication channels.
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
  primaryBrandIdentity: 'NEXARIS — One Partner. Many Possibilities.',
  heroEyebrow: 'B2B COMMODITY SOURCING & EXPORT HOUSE',
  heroHeadline: 'One Partner. Many Possibilities.',
  heroSubheadline:
    'B2B Sourcing & Export Coordination for Indian Spices, Graded Oilseeds, and Natural Cane Sweeteners.',

  // Business Divisions (3 Core Agri Divisions)
  divisions: {
    spices: {
      name: 'Wholesale Spices',
      slug: 'spices',
      path: '/spices-oilseeds?category=spices',
      count: '13 Items',
      hsCodeChapter: 'Chapter 09',
      headline: 'Wholesale Indian Spices for Global Food Processors',
      description:
        'Turmeric, Cumin, Coriander, Red Chilli, Fennel, Cardamom, and whole/ground spices sourced directly from Gujarat, Rajasthan & Southern growing belts.',
    },
    oilseeds: {
      name: 'Graded Oilseeds',
      slug: 'oilseeds',
      path: '/spices-oilseeds?category=oilseeds',
      count: '4 Items',
      hsCodeChapter: 'Chapter 12',
      headline: 'Sortex-Cleaned Oilseeds & Grains for Milling and Pressing',
      description:
        'Groundnut kernels, Hulled & Natural Sesame Seeds, Brown & Yellow Mustard Seeds, and Castor Seeds with certified purity and oil content.',
    },
    jaggery: {
      name: 'Natural Sweeteners (Jaggery)',
      slug: 'jaggery',
      path: '/jaggery',
      count: '4 Items',
      hsCodeChapter: 'Chapter 17',
      headline: 'Export-Grade Unrefined Jaggery & Sugarcane Sweeteners',
      description:
        '100% Sulphur-free organic jaggery powder, uniform portion cubes, traditional bheli blocks, and high-Brix pourable cane syrup.',
    },
  },

  // Verifiable Operating Capabilities
  capabilities: [
    {
      title: 'Direct Origin Sourcing',
      description:
        'Direct procurement relationships with growers and farmer producer organizations (FPOs) across Gujarat, Rajasthan, and Western India.',
    },
    {
      title: 'Third-Party Lab Certification',
      description:
        'Independent batch inspection and analytical testing via accredited agencies (SGS / Geo-Chem / Intertek) for moisture, pesticide residue, and active content upon request.',
    },
    {
      title: 'Export Packaging Customization',
      description:
        'Tailored packaging from 500g/1kg retail-ready stand-up pouches with OEM private label to 25kg/50kg multi-wall bags and 1 MT FIBC jumbo totes.',
    },
    {
      title: 'Mundra & Kandla Port Logistics',
      description:
        'Dedicated ocean freight coordination from Gujarat gateway container terminals (Mundra Port & Deendayal Port Kandla) under FOB, CIF, CFR, and Ex-Works Incoterms 2020.',
    },
  ],

  // Verified Business Contact Details & Registered Office
  contact: {
    businessName: 'NEXARIS',
    phone: '+91 98246 18484',
    secondaryPhone: '+91 85119 12115',
    phoneTel: '+919824618484',
    whatsappNumber: '+919824618484',
    whatsappClean: '919824618484',
    secondaryWhatsappClean: '918511912115',
    whatsappUrl: 'https://wa.me/919824618484',
    email: 'contact@nexaris.co.in',
    registeredOffice: 'F-203, Sarthak Safal-2, Vavol, Gandhinagar – 382016, Gujarat, India.',
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
        'Leads institutional strategy, digital trade infrastructure, buyer qualification protocols, and commodity specification management.',
      initials: 'AT',
    },
    {
      name: 'Mr. Krishnapalsinh Rajendrasinh Parmar',
      role: 'Partner — Business Development',
      email: 'krishnapalsinh@nexaris.co.in',
      linkedIn: 'https://www.linkedin.com/in/parmar-krishnapalsinh-r-658431376/',
      description:
        'Drives international buyer relationships, global market penetration across GCC/Europe/SE Asia, and structured contract execution.',
      initials: 'KP',
    },
    {
      name: 'Mr. Rudra Aniruddhkumar Pandya',
      role: 'Partner — Operations',
      email: 'rudrapandya@nexaris.co.in',
      linkedIn: 'https://www.linkedin.com/in/rudra-pandya-925875446/',
      description:
        'Oversees Gujarat origin procurement, warehouse quality assurance, lot sampling, packaging customization, and port terminal dispatch.',
      initials: 'RP',
    },
  ] as Founder[],

  // Compliance Alignment
  compliance: {
    statutoryAlignment: [
      { name: 'APEDA', full: 'Agricultural and Processed Food Products Export Development Authority' },
      { name: 'Spices Board India', full: 'Ministry of Commerce & Industry, Government of India' },
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
    ? `Hello NEXARIS Trade Desk, I would like to request an RFQ / Technical Data Sheet for ${productName}${hsCode ? ` (HS: ${hsCode})` : ''}. Please share lot specifications and FOB Mundra / CIF indicative pricing.`
    : 'Hello NEXARIS Trade Desk, I would like to enquire about your wholesale spices, oilseeds, and natural jaggery sweetener export lots.';

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

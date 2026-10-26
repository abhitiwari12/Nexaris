/**
 * NEXARIS Site & Brand Configuration
 * Centralized settings for business data, domain, founders, and external communication channels.
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
  heroEyebrow: 'COMMODITY TRADING & SOURCING',
  heroHeadline: 'One Partner. Many Possibilities.',
  heroSubheadline:
    'NEXARIS connects commercial opportunities across spices, oilseeds and organic jaggery products (natural sugarcane sweeteners), working with buyers and suppliers to explore sourcing and trading requirements.',

  // Business Divisions
  divisions: {
    spicesOilseeds: {
      name: 'Spices & Oilseeds',
      slug: 'spices-oilseeds',
      path: '/spices-oilseeds',
      headline: 'Spices & Oilseeds for B2B Trade',
      description:
        'Explore our range of spices and oilseeds for wholesale trade, food processing and commodity sourcing.',
    },
    jaggery: {
      name: 'Jaggery (Natural Sweeteners)',
      slug: 'jaggery',
      path: '/jaggery',
      headline: 'Jaggery & Natural Sugarcane Sweeteners for Export',
      description:
        'Explore our export-grade organic jaggery powder, uniform sweetener cubes, traditional blocks, and liquid syrup under HS Code Chapter 17.',
    },
  },

  // Practical approach operating principles
  operatingPrinciples: [
    {
      title: 'Clear Communication',
      description:
        'We aim to understand requirements and communicate expectations clearly.',
    },
    {
      title: 'Relationship-Focused',
      description:
        'We value professional relationships and long-term business opportunities.',
    },
    {
      title: 'Multiple Commodity Categories',
      description:
        'Our current business scope includes spices, oilseeds and natural jaggery sweeteners.',
    },
    {
      title: 'Business-Oriented Approach',
      description:
        'We focus on understanding commercial requirements and exploring suitable opportunities.',
    },
  ],

  // Verified Business Contact Details
  contact: {
    businessName: 'NEXARIS',
    phone: '+91 85119 12115',
    phoneTel: '+918511912115',
    whatsappNumber: '+918511912115',
    whatsappClean: '918511912115',
    email: 'contact@nexaris.co.in',
    location: 'Gandhinagar, Gujarat, India',
    website: 'https://nexaris.co.in',
    companyLinkedIn: 'https://www.linkedin.com/company/nexaris1/home/?viewAsMember=true',
  },

  // Founders (Always full names with "Mr." prefix, official emails and LinkedIn profiles)
  founders: [
    {
      name: 'Mr. Abhi Nilesh Tiwari',
      role: 'Managing Partner — Strategy & Technology',
      email: 'abhi@nexaris.co.in',
      linkedIn: 'https://www.linkedin.com/in/abhi-tiwari-18715727b/',
      description:
        'Responsible for strategic direction and technology-related initiatives, supporting NEXARIS\'s business development and long-term growth.',
      initials: 'AT',
    },
    {
      name: 'Mr. Krishnapalsinh Rajendrasinh Parmar',
      role: 'Partner — Business Development',
      email: 'krishnapalsinh@nexaris.co.in',
      linkedIn: 'https://www.linkedin.com/in/parmar-krishnapalsinh-r-658431376/',
      description:
        'Focuses on business development, identifying commercial opportunities and developing professional relationships with prospective trading partners.',
      initials: 'KP',
    },
    {
      name: 'Mr. Rudra Aniruddhkumar Pandya',
      role: 'Partner — Operations',
      email: 'rudrapandya@nexaris.co.in',
      linkedIn: 'https://www.linkedin.com/in/rudra-pandya-925875446/',
      description:
        'Focuses on operational coordination and supporting the practical execution of NEXARIS\'s business activities.',
      initials: 'RP',
    },
  ] as Founder[],
};

/**
 * Generates an encoded WhatsApp chat URL using the verified business WhatsApp number.
 */
export function getWhatsAppUrl(productName?: string): string {
  const number = SITE_CONFIG.contact.whatsappClean;
  const defaultText = productName
    ? `Hello NEXARIS, I am interested in ${productName}. Please share the available details and quotation process.`
    : 'Hello NEXARIS, I would like to enquire about your commodity trading services and available lots.';

  return `https://wa.me/${number}?text=${encodeURIComponent(defaultText)}`;
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

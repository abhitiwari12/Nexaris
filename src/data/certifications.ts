export interface CertificationLogoCard {
  id: string;
  name: string;
  imageSrc: string;
  portalUrl?: string;
}

export const OFFICIAL_CERTIFICATION_CARDS: CertificationLogoCard[] = [
  {
    id: 'spices-board',
    name: 'Spices Board India — Ministry of Commerce & Industry',
    imageSrc: '/assets/certifications/spices_board_card.png',
    portalUrl: 'http://www.indianspices.com',
  },
  {
    id: 'fssai',
    name: 'Food Safety and Standards Authority of India (FSSAI)',
    imageSrc: '/assets/certifications/fssai_card.png',
    portalUrl: 'https://foscos.fssai.gov.in',
  },
  {
    id: 'iec-dgft',
    name: 'Importer Exporter Code (IEC) — DGFT India',
    imageSrc: '/assets/certifications/iec_card.png',
    portalUrl: 'https://www.dgft.gov.in',
  },
  {
    id: 'iopepc',
    name: 'Indian Oilseeds and Produce Export Promotion Council (IOPEPC)',
    imageSrc: '/assets/certifications/iopepc_card.png',
    portalUrl: 'https://www.iopepc.org',
  },
  {
    id: 'fda',
    name: 'FDA Approved Registration Standards',
    imageSrc: '/assets/certifications/fda_card.png',
    portalUrl: 'https://www.fda.gov',
  },
  {
    id: 'iso-22000',
    name: 'ISO 22000:2005 Food Safety Management System',
    imageSrc: '/assets/certifications/iso_card.png',
    portalUrl: 'https://www.iso.org',
  },
  {
    id: 'halal',
    name: 'HALAL — Jamiat Ulama-i-Hind Halal Trust',
    imageSrc: '/assets/certifications/halal_card.png',
    portalUrl: 'https://www.jamiathalaltrust.org',
  },
];

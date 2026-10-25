export type Division = 'spices-oilseeds' | 'aluminium-scrap';

export type CommodityCategory = 'spices' | 'oilseeds' | 'aluminium-scrap';

export interface CommoditySpecification {
  label: string;
  value: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  division: Division;
  category: CommodityCategory;
  shortDescription: string;
  overview?: string;
  commercialApplications?: string[];
  standardPackaging?: string[];
  specifications?: CommoditySpecification[];
  image: string;
  featured?: boolean;
  subCategories?: string[];
  forms?: string[];
}

export type QuantityUnit = 'Metric Tons (MT)' | 'Kilograms (kg)' | '20ft FCL' | '40ft FCL';

export type Incoterm = 'FOB Mundra' | 'CIF (Destination Port)' | 'CFR' | 'EXW Gujarat';

export type EnquiryType = 'buyer' | 'supplier';

export interface EnquiryFormData {
  fullName: string;
  companyName: string;
  businessEmail: string;
  phoneOrWhatsApp: string;
  buyerLocation: string;
  destinationPort?: string;
  incoterm?: Incoterm;
  enquiryType?: EnquiryType;
  division: Division;
  productSlug: string;
  productName: string;
  selectedSubCategory?: string;
  selectedForm?: string;
  requiredQuantity: string;
  quantityUnit: QuantityUnit;
  packagingPreference?: string;
  sampleRequested?: boolean;
  additionalRequirements: string;
  consentAccepted: boolean;
}

export interface EnquirySubmissionResult {
  id: string;
  timestamp: string;
  data: EnquiryFormData;
}


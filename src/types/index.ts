export type Division = 'spices' | 'oilseeds' | 'jaggery' | 'spices-oilseeds';

export type CommodityCategory = 'spices' | 'oilseeds' | 'jaggery';

export interface CommoditySpecification {
  label: string;
  value: string;
}

export interface TechnicalDrawerSpecs {
  moisture: string;
  purity: string;
  activeContent: string; // Curcumin / Sucrose / Oil content / Piperine
  packaging: string;
  loadingPort: string; // FOB Mundra / Kandla Port
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  tagline?: string;
  hsCode?: string;
  division: Division;
  category: CommodityCategory;
  shortDescription: string;
  overview?: string;
  commercialApplications?: string[];
  standardPackaging?: string[];
  specifications?: CommoditySpecification[];
  technicalDrawer?: TechnicalDrawerSpecs;
  image: string;
  featured?: boolean;
  subCategories?: string[];
  forms?: string[];
}

export type QuantityUnit = 'Metric Tons (MT)' | 'Kilograms (kg)' | '20ft FCL' | '40ft FCL';

export type Incoterm = 'FOB Mundra' | 'FOB Kandla' | 'CIF (Destination Port)' | 'CFR' | 'Ex-Works' | 'EXW Gujarat';

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

export interface SupplierRegistrationFormData {
  supplierName: string;
  locationDistrictState: string;
  commodityOffered: string;
  availableLotSizeMt: string;
  moistureLabReportAvailable: string;
  contactNumber: string;
  additionalNotes?: string;
}

export interface EnquirySubmissionResult {
  id: string;
  timestamp: string;
  data: EnquiryFormData;
}

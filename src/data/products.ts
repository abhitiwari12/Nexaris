import { Product } from '../types';

/**
 * NEXARIS Product Catalogue — Pure Sugarcane Jaggery
 * Source of truth: Official NEXARIS Jaggery Catalogue
 * 100% Natural · Chemical-Free · Export Quality
 * 3 Colours × 3 Forms + Specialty Spiced Jaggery
 */

export const ALL_PRODUCTS: Product[] = [
  {
    id: 'jaggery-powder',
    slug: 'jaggery-powder',
    name: 'Jaggery Powder',
    tagline: 'Free-flowing fine powder for retail, beverages & daily sweetening',
    hsCode: '17011420',
    division: 'jaggery',
    category: 'jaggery',
    shortDescription:
      'Free-flowing fine jaggery powder available in 3 natural colour grades (Golden Yellow, Light Brown, Dark Brown). 100% natural, chemical-free, zero sulphur and zero bleaching with moisture max 3% and sucrose min 80%.',
    subCategories: ['Golden Yellow (Clean, mild sweetness)', 'Light Brown (Balanced & versatile)', 'Dark Brown (Bold, full-bodied flavour)'],
    forms: ['Free-Flowing Fine Powder', '40/60/80 Mesh Granulation'],
    overview:
      'NEXARIS Jaggery Powder is produced from clarified, pure sugarcane juice. Processed at low boiling temperatures without chemical additives, sodium hydrosulphite, or synthetic bleaching agents. Mechanically pulverized and sifted into a smooth, free-flowing powder that dissolves easily in tea, coffee, baking mixes, and health drinks.',
    commercialApplications: [
      'Retail Stand-Up Consumer Pouches & Table Dispenser Jars',
      'Tea, Coffee, Herbal Infusions & Beverage Sweetener',
      'Industrial Bakery, Biscuits & Healthy Confectionery',
      'Nutraceutical Powders, Granola & Breakfast Cereals',
    ],
    standardPackaging: [
      '250 g, 500 g & 1 kg Stand-up zip pouches & food-grade jars (Retail Packs)',
      '5 kg Poly-lined bags in master cartons',
      '25 kg Poly-lined bulk bags & master corrugated export cartons',
      'Custom White Labeling with buyer brand, barcodes & nutritional facts',
    ],
    technicalDrawer: {
      moisture: 'Max 3.0% (Export Grade - Free Flowing)',
      purity: '100% Natural Sweet — Chemical-Free (Zero Sulphur & Zero Bleaching)',
      activeContent: 'Sucrose Content: Min 80% | Minerals: Iron, Calcium, Magnesium, Potassium',
      packaging: '250g / 500g / 1kg Retail & 5kg / 25kg Bulk Bags',
      loadingPort: 'Mundra Port (INMUN) & Kandla Port (IXY), Gujarat',
    },
    specifications: [
      { label: 'Product Type', value: 'Sugarcane Jaggery Powder' },
      { label: 'HS Code', value: '17011420' },
      { label: 'Colours Available', value: 'Golden Yellow, Light Brown, Dark Brown' },
      { label: 'Taste & Purity', value: '100% Natural Sweet — Chemical-Free (Zero Sulphur & Zero Bleaching)' },
      { label: 'Sucrose Content', value: 'Min 80%' },
      { label: 'Moisture', value: 'Max 3%' },
      { label: 'Minerals', value: 'Naturally rich in Iron, Calcium, Magnesium & Potassium' },
      { label: 'Shelf Life', value: '12 Months' },
      { label: 'Storage', value: 'Cool, dry place away from moisture' },
      { label: 'Pack Sizes', value: '250 g, 500 g, 1 kg (Retail) | 5 kg, 25 kg (Bulk)' },
      { label: 'Certifications', value: 'FSSAI, APEDA, FDA Registered, Laboratory Tested' },
    ],
    image: '/assets/catalogue_images/catalogue_jaggery_powder.png',
    featured: true,
  },
  {
    id: 'small-solid-blocks',
    slug: 'small-solid-blocks',
    name: 'Small Solid Blocks (Jaggery Cubes & Pieces)',
    tagline: 'Bite-sized cubes & pieces for easy portioning and direct tabletop use',
    hsCode: '17011410',
    division: 'jaggery',
    category: 'jaggery',
    shortDescription:
      'Uniform bite-sized sweetener cubes and pieces for easy portioning. Available in Golden Yellow, Light Brown, and Dark Brown colour grades. Moisture max 5%–7%, sucrose min 75%–82%, 100% chemical-free.',
    subCategories: ['Golden Yellow Cubes', 'Light Brown Pieces', 'Dark Brown Cubes'],
    forms: ['Bite-Sized Cubes (15mm x 15mm / 20mm x 20mm)', 'Small Portioned Solid Pieces'],
    overview:
      'Engineered for hospitality, cafes, and consumer convenience, NEXARIS Small Solid Blocks provide perfect single-serving sweetness without requiring crushing or chopping. Cast in food-grade moulds from concentrated pure sugarcane syrup without chemical binders or artificial hardeners.',
    commercialApplications: [
      'HORECA (Hotels, Cafes, Restaurants & Lounges Tabletop Sweetener)',
      'Direct Table Sweetener for Tea, Coffee & Herbal Decoctions',
      'Retail Plastic Tubs, Food Jars & Consumer Gift Boxes',
      'Artisanal Sweets, Snack Mixes & Energy Bites',
    ],
    standardPackaging: [
      '250 g, 500 g & 1 kg Food-grade plastic tubs, jars and consumer boxes',
      '5 kg Poly-lined master export cartons',
      '25 kg Poly-lined bulk export cartons with inner moisture barrier',
      'Custom White Labeling & Private Label Branding',
    ],
    technicalDrawer: {
      moisture: 'Max 5.0% – 7.0%',
      purity: '100% Natural Sweet — Chemical-Free (Zero Sulphur & Zero Bleaching)',
      activeContent: 'Sucrose Content: Min 75% – 82% | Minerals: Iron, Calcium, Magnesium, Potassium',
      packaging: '250g / 500g / 1kg Tubs & Jars | 5kg / 25kg Master Cartons',
      loadingPort: 'Mundra Port (INMUN) & Kandla Port (IXY), Gujarat',
    },
    specifications: [
      { label: 'Product Type', value: 'Small Solid Jaggery Blocks (Cubes & Pieces)' },
      { label: 'HS Code', value: '17011410' },
      { label: 'Colours Available', value: 'Golden Yellow, Light Brown, Dark Brown' },
      { label: 'Taste & Purity', value: '100% Natural Sweet — Chemical-Free (Zero Sulphur & Zero Bleaching)' },
      { label: 'Sucrose Content', value: 'Min 75% – 82%' },
      { label: 'Moisture', value: 'Max 5% – 7%' },
      { label: 'Minerals', value: 'Naturally rich in Iron, Calcium, Magnesium & Potassium' },
      { label: 'Dimensions', value: 'Uniform 15mm x 15mm / 20mm x 20mm bite-sized pieces' },
      { label: 'Shelf Life', value: '12 Months' },
      { label: 'Storage', value: 'Cool, dry place away from moisture' },
      { label: 'Pack Sizes', value: '250 g, 500 g, 1 kg (Retail) | 5 kg, 25 kg (Bulk)' },
      { label: 'Certifications', value: 'FSSAI, APEDA, FDA Registered, Laboratory Tested' },
    ],
    image: '/assets/catalogue_images/catalogue_small_solid_blocks.png',
    featured: true,
  },
  {
    id: 'whole-jaggery-blocks',
    slug: 'whole-jaggery-blocks',
    name: 'Whole Jaggery Blocks',
    tagline: 'Traditional solid blocks for wholesale distribution, repackers & food processing',
    hsCode: '17011410',
    division: 'jaggery',
    category: 'jaggery',
    shortDescription:
      'Solid traditional cane jaggery blocks available in Golden Yellow, Light Brown, and Dark Brown colour grades. Produced via traditional open-pan boiling, with moisture max 5%–7%, sucrose min 75%–82%, and rich mineral profile.',
    subCategories: ['Golden Yellow Whole Blocks', 'Light Brown Whole Blocks', 'Dark Brown Whole Blocks'],
    forms: ['Traditional Solid Round Blocks', '1 kg, 5 kg, 10 kg Bheli Blocks'],
    overview:
      'The authentic cornerstone of Indian sugarcane sweetening, NEXARIS Whole Jaggery Blocks are cooked in open pans using fresh sugarcane juice clarified with natural vegetable extracts. Cooled into dense, nutrient-dense solid blocks that offer deep caramel notes and long shelf life.',
    commercialApplications: [
      'Wholesale Commodity Distribution & Ethnic Importers',
      'Commercial Repackers, Supermarket Chains & Cash-and-Carry Stores',
      'Industrial Food Processors, Traditional Indian Sweets & Bakeries',
      'Ayurvedic Medicines, Herbal Tonics & Fermentation Feedstock',
    ],
    standardPackaging: [
      'Individual food-grade shrink-wrap per block for moisture barrier protection',
      '5 kg Poly-lined master boxes',
      '25 kg Heavy-duty export master cartons with inner poly-lining',
      'Full Container Loads (20ft FCL: approx. 18–20 MT palletized)',
    ],
    technicalDrawer: {
      moisture: 'Max 5.0% – 7.0%',
      purity: '100% Natural Sweet — Chemical-Free (Zero Sulphur & Zero Bleaching)',
      activeContent: 'Sucrose Content: Min 75% – 82% | Minerals: Iron, Calcium, Magnesium, Potassium',
      packaging: 'Individually Wrapped in 5kg / 25kg Poly-Lined Cartons',
      loadingPort: 'Mundra Port (INMUN) & Kandla Port (IXY), Gujarat',
    },
    specifications: [
      { label: 'Product Type', value: 'Traditional Whole Jaggery Blocks' },
      { label: 'HS Code', value: '17011410' },
      { label: 'Colours Available', value: 'Golden Yellow, Light Brown, Dark Brown' },
      { label: 'Taste & Purity', value: '100% Natural Sweet — Chemical-Free (Zero Sulphur & Zero Bleaching)' },
      { label: 'Sucrose Content', value: 'Min 75% – 82%' },
      { label: 'Moisture', value: 'Max 5% – 7%' },
      { label: 'Minerals', value: 'Naturally rich in Iron, Calcium, Magnesium & Potassium' },
      { label: 'Shelf Life', value: '12 Months' },
      { label: 'Storage', value: 'Cool, dry place away from moisture' },
      { label: 'Pack Sizes', value: '5 kg Bulk Boxes | 25 kg Master Cartons' },
      { label: 'Certifications', value: 'FSSAI, APEDA, FDA Registered, Laboratory Tested' },
    ],
    image: '/assets/catalogue_images/catalogue_whole_block.png',
    featured: true,
  },
  {
    id: 'spiced-jaggery',
    slug: 'spiced-jaggery',
    name: 'Spiced Jaggery (Specialty Range)',
    tagline: 'Natural sugarcane jaggery blended with traditional spices & nuts',
    hsCode: '17011490',
    division: 'jaggery',
    category: 'jaggery',
    shortDescription:
      'Specialty export blend of natural sugarcane jaggery infused with traditional spices and nuts: Ginger (Sonth), Cardamom (Elaichi), Fennel (Saunf), and Sesame & Peanuts. Available in both Solid Blocks and Powder forms.',
    subCategories: ['Ginger (Sonth)', 'Cardamom (Elaichi)', 'Fennel (Saunf)', 'Sesame & Peanuts'],
    forms: ['Spiced Jaggery Powder', 'Spiced Jaggery Small Blocks / Bites'],
    overview:
      'NEXARIS Spiced Jaggery represents the pinnacle of traditional Indian functional sweeteners. We blend freshly ground premium culinary spices and roasted nuts into clarified sugarcane syrup before setting, creating a fragrant, immunity-boosting digestive sweetener beloved for winter wellness, tea infusions, and artisanal confectionery.',
    commercialApplications: [
      'Gourmet Health Retail & Supermarket Premium Sweetener Aisles',
      'Artisanal Chai, Coffee & Herbal Tea Infusions',
      'Winter Wellness, Ayurvedic Diets & Natural Digestives',
      'Specialty Confectionery, Energy Chikki & Gourmet Gift Packs',
    ],
    standardPackaging: [
      '250 g, 500 g & 1 kg Stand-up zip pouches & food-grade jars',
      '5 kg Poly-lined master cartons',
      '25 kg Bulk export packing',
      'Private Label OEM Packaging with custom branding',
    ],
    technicalDrawer: {
      moisture: 'Max 3.0% (Powder) | Max 5%–7% (Blocks)',
      purity: '100% Natural Sweet — Chemical-Free (Zero Sulphur & Zero Bleaching)',
      activeContent: 'Natural Jaggery with Real Ginger, Cardamom, Fennel, Sesame & Peanuts',
      packaging: '250g / 500g / 1kg Retail & 5kg / 25kg Bulk Packs',
      loadingPort: 'Mundra Port (INMUN) & Kandla Port (IXY), Gujarat',
    },
    specifications: [
      { label: 'Product Type', value: 'Specialty Spiced Sugarcane Jaggery' },
      { label: 'HS Code', value: '17011490' },
      { label: 'Spiced Varieties', value: 'Ginger (Sonth), Cardamom (Elaichi), Fennel (Saunf), Sesame & Peanuts' },
      { label: 'Forms Available', value: 'Solid Blocks & Fine Powder' },
      { label: 'Taste & Purity', value: '100% Natural Sweet — Chemical-Free (Zero Sulphur & Zero Bleaching)' },
      { label: 'Sucrose Content', value: 'Min 75% – 85%' },
      { label: 'Moisture', value: 'Max 3% (Powder) | Max 5% – 7% (Blocks)' },
      { label: 'Minerals', value: 'Naturally rich in Iron, Calcium, Magnesium & Potassium' },
      { label: 'Shelf Life', value: '12 Months' },
      { label: 'Storage', value: 'Cool, dry place away from moisture' },
      { label: 'Pack Sizes', value: '250 g, 500 g, 1 kg (Retail) | 5 kg, 25 kg (Bulk)' },
      { label: 'Certifications', value: 'FSSAI, APEDA, FDA Registered, Laboratory Tested' },
    ],
    image: '/assets/catalogue_images/catalogue_spiced_specialty.png',
    featured: true,
  },
];

// Aliases and helpers for backward compatibility
export const JAGGERY_PRODUCTS = ALL_PRODUCTS;
export const FEATURED_PRODUCTS = ALL_PRODUCTS.filter((p) => p.featured);
export const SPICES_PRODUCTS: Product[] = [];
export const OILSEEDS_PRODUCTS: Product[] = [];
export const SPICES_AND_OILSEEDS_PRODUCTS: Product[] = [];

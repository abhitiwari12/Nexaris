import { Product } from '../types';

/**
 * NEXARIS Natural Sugarcane Sweeteners Division
 * Customs Classification: HS Code Chapter 17 (Sugars and Sugar Confectionery)
 * Processing Standards: 100% Sulphur-Free, Non-Centrifugal, Zero Chemical Bleaching
 */

export const ORGANIC_JAGGERY_POWDER: Product = {
  id: 'jaggery-01',
  slug: 'organic-jaggery-powder',
  name: 'Organic Jaggery Powder',
  tagline: 'Free-flowing, premium alternative to refined sugar',
  hsCode: '17011420',
  division: 'jaggery',
  category: 'jaggery',
  shortDescription:
    'Certified organic, free-flowing unrefined cane sweetener with zero chemical additives. 100% sulphur-free with export-premium moisture levels.',
  subCategories: ['40 Mesh (Standard Bakery)', '60 Mesh (Fine Dissolving)', '80 Mesh (Ultra Fine Micro-Powder)'],
  forms: ['Free-Flowing Granular Powder', 'Unrefined Cane Sugar Alternative'],
  overview:
    'NEXARIS Organic Jaggery Powder is produced from clarified, unrefined sugar cane juice grown in prime agrarian belts. Processed at strictly controlled low boiling temperatures to preserve natural polyphenols, magnesium, potassium, and iron. Mechanically pulverized and graded to uniform 40/60/80 mesh standards, delivering a golden-hued, non-caking sweetener ideal for industrial bakery, health beverage formulations, and clean-label retail packaging.',
  commercialApplications: [
    'Industrial Bakery, Cookies & Biscuit Manufacturing',
    'Healthy Ready-to-Drink (RTD) Beverages & Instant Teas',
    'Retail Stand-Up Consumer Pouches & Supermarket Private Labeling',
    'Nutraceutical Formulations, Granola & Organic Energy Bars',
  ],
  standardPackaging: [
    '500g & 1 kg Stand-up zip pouches (Retail Ready)',
    '25 kg Multi-wall kraft paper bags with food-grade inner LDPE liner',
    '25 kg Virgin woven PP bags with heat-sealed food-grade liner',
    '1,000 kg Bulk Container FIBC Liners (Industrial Sourcing)',
  ],
  specifications: [
    { label: 'HS Code', value: '17011420' },
    { label: 'Moisture', value: '≤ 2.0% (Export Premium Grade)' },
    { label: 'Sucrose Content', value: '80% – 90%' },
    { label: 'Color Index', value: 'Light Golden to Golden Brown' },
    { label: 'Chemical Bleaching', value: '100% Sulphur-Free (Zero Sodium Hydrosulphite / SO₂)' },
    { label: 'Granulation / Mesh', value: 'Uniform 40 / 60 / 80 Mesh (Free-Flowing)' },
    { label: 'Total Ash', value: '≤ 2.5%' },
    { label: 'Acid Insoluble Ash', value: '≤ 0.25%' },
    { label: 'Origin', value: 'Western India Sugarcane Belt (APEDA & FSSAI Registered)' },
  ],
  image: '/src/assets/images/real_jaggery_powder_1793217606180.jpg',
  featured: true,
};

export const PREMIUM_JAGGERY_CUBES: Product = {
  id: 'jaggery-02',
  slug: 'premium-jaggery-cubes',
  name: 'Premium Jaggery Cubes',
  tagline: 'Perfectly portioned unrefined sweetener cubes',
  hsCode: '17011410',
  division: 'jaggery',
  category: 'jaggery',
  shortDescription:
    'Evenly portioned, chemical-free raw jaggery cubes engineered for table service, hot beverages, and gourmet confectionery.',
  subCategories: ['15mm x 15mm Uniform Cubes', '20mm x 20mm Uniform Cubes'],
  forms: ['Moulded Precision Cubes', 'Single-Serve Beverage Portions'],
  overview:
    'Engineered specifically for hospitality, HORECA, and retail presentation, NEXARIS Jaggery Cubes offer uniform dimensions, excellent structural integrity, and rapid dissolution in warm liquids without curdling milk. Made by casting concentrated sugarcane syrup into food-grade geometric moulds without synthetic binding agents, chemical hardeners, or artificial preservatives.',
  commercialApplications: [
    'HORECA (Hotels, Specialty Cafes & Lounges Tabletop Sweetener)',
    'Table Sweetener for Herbal Infusions, Traditional Chai & Specialty Coffee',
    'Retail Gourmet Confectionery & Gift Hampers',
    'Artisanal Chocolates & Nutrient Energy Bites',
  ],
  standardPackaging: [
    '500g & 1 kg Food-grade tamper-evident plastic jars & boxes',
    '10 kg Heavy-duty corrugated master cartons with poly-liners',
    'Individual flow-wrap single-serve portions for hospitality amenity trays',
  ],
  specifications: [
    { label: 'HS Code', value: '17011410' },
    { label: 'Moisture', value: '≤ 5.0%' },
    { label: 'Sucrose Content', value: '≥ 85.0%' },
    { label: 'Color Profile', value: 'Golden Yellow to Dark Amber Brown' },
    { label: 'Cube Dimensions', value: '15mm x 15mm / 20mm x 20mm uniform cubes' },
    { label: 'Chemical Additives', value: '100% Chemical-free (Zero synthetic binders / SO₂)' },
    { label: 'Insoluble Matter', value: '≤ 1.0%' },
    { label: 'Shelf Life', value: '12 Months in dry, cool conditions' },
  ],
  image: '/src/assets/images/real_jaggery_cubes_1793217620230.jpg',
  featured: true,
};

export const TRADITIONAL_JAGGERY_BLOCKS: Product = {
  id: 'jaggery-03',
  slug: 'traditional-jaggery-blocks',
  name: 'Traditional Jaggery Blocks',
  tagline: 'Solid non-centrifugal traditional cane sugar blocks',
  hsCode: '17011410',
  division: 'jaggery',
  category: 'jaggery',
  shortDescription:
    'Solid non-centrifugal cane sugar blocks produced through traditional open-pan boiling. High Brix value and rich caramel aroma for bulk processing.',
  subCategories: ['1 kg Solid Round Block', '5 kg Conical Mould (Bheli)', '10 kg Master Commercial Block'],
  forms: ['Solid Non-Centrifugal Block', 'Traditional Conical Bheli Mould'],
  overview:
    'The timeless benchmark of traditional Indian cane processing, NEXARIS Jaggery Blocks (Gur/Bheli) are prepared by slow-simmering fresh sugarcane juice in open pans with vegetable-based clarificants (such as okra stalk extract). Hand-poured into conical and circular moulds, each block delivers authentic caramel-molasses depth, high thermal stability, and dense mineral content.',
  commercialApplications: [
    'Commercial Food Processing & Indian Traditional Sweets (Mithai)',
    'Ayurvedic Pharmaceuticals, Herbal Decoctions & Chyawanprash',
    'Bulk Culinary Formulations, Distilleries & Fermentation Feedstock',
    'Ethnic Wholesale & Distribution Across Global Diaspora Markets',
  ],
  standardPackaging: [
    'Individual food-grade vacuum heat-shrink film wrapping per block',
    '10 kg / 25 kg 5-ply export master cartons with moisture barrier film',
    'Solid wooden palletized container lots with corner protectors',
  ],
  specifications: [
    { label: 'HS Code', value: '17011410' },
    { label: 'Moisture', value: '≤ 7.0%' },
    { label: 'Brix Value', value: '≥ 85.0° Brix' },
    { label: 'Sucrose Content', value: '80% – 90%' },
    { label: 'Reducing Sugars', value: '5.0% – 10.0%' },
    { label: 'Weight Variants', value: '1 kg / 5 kg / 10 kg solid blocks' },
    { label: 'Clarification', value: '100% natural vegetable-based clarification (Okra mucilage)' },
    { label: 'Preservatives', value: 'Nil / No artificial chemicals or bleaching agents' },
  ],
  image: '/src/assets/images/real_jaggery_blocks_1793217633798.jpg',
  featured: true,
};

/**
 * Array of the three primary Jaggery products
 */
export const THREE_JAGGERY_PRODUCTS: Product[] = [
  ORGANIC_JAGGERY_POWDER,
  PREMIUM_JAGGERY_CUBES,
  TRADITIONAL_JAGGERY_BLOCKS,
];

export default THREE_JAGGERY_PRODUCTS;

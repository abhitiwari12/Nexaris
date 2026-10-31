export interface ArikaProduct {
  id: string;
  name: string;
  category: 'spices' | 'pulses' | 'dry-fruits';
  categoryLabel: string;
  netWeight: string;
  tagline: string;
  shelf: 1 | 2 | 3;
  spriteStyle: {
    backgroundSize: string;
    backgroundPosition: string;
  };
}

export const MASTER_SHELF_IMAGE = '/assets/aistudio/ARIKA_Spice_and_Pantry_Collection__1__7c2a57bd.png';

export const ALL_ARIKA_PRODUCTS: ArikaProduct[] = [
  // --- SHELF 1: SPICES & SEEDS (7 Items, 700% 300%, y = 0%) ---
  {
    id: 'arika-turmeric-powder',
    name: 'Turmeric Powder',
    category: 'spices',
    categoryLabel: 'Pure Ground Spices',
    netWeight: '200 g',
    tagline: 'High curcumin, vibrant golden purity',
    shelf: 1,
    spriteStyle: {
      backgroundSize: '700% 300%',
      backgroundPosition: '0% 0%',
    },
  },
  {
    id: 'arika-red-chilli-powder',
    name: 'Red Chilli Powder',
    category: 'spices',
    categoryLabel: 'Pure Ground Spices',
    netWeight: '200 g',
    tagline: 'Sun-dried chillies for natural heat & deep red colour',
    shelf: 1,
    spriteStyle: {
      backgroundSize: '700% 300%',
      backgroundPosition: '16.66% 0%',
    },
  },
  {
    id: 'arika-coriander-powder',
    name: 'Coriander Powder',
    category: 'spices',
    categoryLabel: 'Pure Ground Spices',
    netWeight: '200 g',
    tagline: 'Gujarat Dhana seeds, fresh earthy aroma',
    shelf: 1,
    spriteStyle: {
      backgroundSize: '700% 300%',
      backgroundPosition: '33.33% 0%',
    },
  },
  {
    id: 'arika-cumin-seeds',
    name: 'Cumin Seeds (Jeera)',
    category: 'spices',
    categoryLabel: 'Whole Spices & Seeds',
    netWeight: '200 g',
    tagline: 'Sortex-cleaned bold cumin seeds with rich aroma',
    shelf: 1,
    spriteStyle: {
      backgroundSize: '700% 300%',
      backgroundPosition: '50% 0%',
    },
  },
  {
    id: 'arika-mustard-seeds',
    name: 'Mustard Seeds (Rai)',
    category: 'spices',
    categoryLabel: 'Whole Spices & Seeds',
    netWeight: '200 g',
    tagline: 'Machine-cleaned black mustard seeds for authentic tempering',
    shelf: 1,
    spriteStyle: {
      backgroundSize: '700% 300%',
      backgroundPosition: '66.66% 0%',
    },
  },
  {
    id: 'arika-whole-red-chilli',
    name: 'Whole Red Chilli',
    category: 'spices',
    categoryLabel: 'Whole Spices',
    netWeight: '100 g',
    tagline: 'Hand-sorted stemless whole dry red chillies',
    shelf: 1,
    spriteStyle: {
      backgroundSize: '700% 300%',
      backgroundPosition: '83.33% 0%',
    },
  },
  {
    id: 'arika-whole-spices',
    name: 'Whole Spices (Khada Masala)',
    category: 'spices',
    categoryLabel: 'Specialty Blend',
    netWeight: '100 g',
    tagline: 'Royal blend of whole cinnamon, cloves, bay leaves & cardamom',
    shelf: 1,
    spriteStyle: {
      backgroundSize: '700% 300%',
      backgroundPosition: '100% 0%',
    },
  },

  // --- SHELF 2: DAL & PULSES (7 Items, 700% 300%, y = 50%) ---
  {
    id: 'arika-toor-dal',
    name: 'Toor Dal (Arhar)',
    category: 'pulses',
    categoryLabel: 'Unpolished Dal',
    netWeight: '1 kg',
    tagline: 'Protein-rich, unpolished yellow lentils',
    shelf: 2,
    spriteStyle: {
      backgroundSize: '700% 300%',
      backgroundPosition: '0% 50%',
    },
  },
  {
    id: 'arika-moong-dal',
    name: 'Moong Dal (Whole Green)',
    category: 'pulses',
    categoryLabel: 'Unpolished Pulses',
    netWeight: '1 kg',
    tagline: 'Nutritious whole green moong, machine-cleaned',
    shelf: 2,
    spriteStyle: {
      backgroundSize: '700% 300%',
      backgroundPosition: '16.66% 50%',
    },
  },
  {
    id: 'arika-masoor-dal',
    name: 'Masoor Dal (Red)',
    category: 'pulses',
    categoryLabel: 'Unpolished Dal',
    netWeight: '1 kg',
    tagline: 'Quick-cooking, iron-rich split red lentils',
    shelf: 2,
    spriteStyle: {
      backgroundSize: '700% 300%',
      backgroundPosition: '33.33% 50%',
    },
  },
  {
    id: 'arika-chana-dal',
    name: 'Chana Dal (Bengal Gram)',
    category: 'pulses',
    categoryLabel: 'Unpolished Dal',
    netWeight: '1 kg',
    tagline: 'Plump golden split gram lentils with nutty taste',
    shelf: 2,
    spriteStyle: {
      backgroundSize: '700% 300%',
      backgroundPosition: '50% 50%',
    },
  },
  {
    id: 'arika-urad-dal',
    name: 'Urad Dal (White)',
    category: 'pulses',
    categoryLabel: 'Unpolished Dal',
    netWeight: '1 kg',
    tagline: 'Sortex-cleaned white lentils for idli, dosa & dal makhani',
    shelf: 2,
    spriteStyle: {
      backgroundSize: '700% 300%',
      backgroundPosition: '66.66% 50%',
    },
  },
  {
    id: 'arika-rajma',
    name: 'Rajma (Red Kidney Beans)',
    category: 'pulses',
    categoryLabel: 'Whole Pulses',
    netWeight: '1 kg',
    tagline: 'Plump Kashmiri-grade red kidney beans with rich texture',
    shelf: 2,
    spriteStyle: {
      backgroundSize: '700% 300%',
      backgroundPosition: '83.33% 50%',
    },
  },
  {
    id: 'arika-chana',
    name: 'Desi Chana (Brown Chickpeas)',
    category: 'pulses',
    categoryLabel: 'Whole Pulses',
    netWeight: '1 kg',
    tagline: 'High-fiber authentic brown chickpeas for daily nutrition',
    shelf: 2,
    spriteStyle: {
      backgroundSize: '700% 300%',
      backgroundPosition: '100% 50%',
    },
  },

  // --- SHELF 3: DRY FRUITS & AROMATIC SPICES (9 Items, 900% 300%, y = 100%) ---
  {
    id: 'arika-almonds',
    name: 'California Almonds (Badam)',
    category: 'dry-fruits',
    categoryLabel: 'Premium Dry Fruits',
    netWeight: '200 g',
    tagline: 'Handpicked crunchy whole almonds rich in Vitamin E',
    shelf: 3,
    spriteStyle: {
      backgroundSize: '900% 300%',
      backgroundPosition: '0% 100%',
    },
  },
  {
    id: 'arika-cashews',
    name: 'Cashews (Kaju)',
    category: 'dry-fruits',
    categoryLabel: 'Premium Dry Fruits',
    netWeight: '200 g',
    tagline: 'Whole white creamy cashews, perfectly graded',
    shelf: 3,
    spriteStyle: {
      backgroundSize: '900% 300%',
      backgroundPosition: '12.5% 100%',
    },
  },
  {
    id: 'arika-raisins',
    name: 'Golden Raisins (Kishmish)',
    category: 'dry-fruits',
    categoryLabel: 'Premium Dry Fruits',
    netWeight: '200 g',
    tagline: 'Naturally sun-dried sweet golden seedless raisins',
    shelf: 3,
    spriteStyle: {
      backgroundSize: '900% 300%',
      backgroundPosition: '25% 100%',
    },
  },
  {
    id: 'arika-walnuts',
    name: 'Walnut Kernels (Akhrot)',
    category: 'dry-fruits',
    categoryLabel: 'Premium Dry Fruits',
    netWeight: '200 g',
    tagline: 'Crisp light-colored walnut halves rich in Omega-3',
    shelf: 3,
    spriteStyle: {
      backgroundSize: '900% 300%',
      backgroundPosition: '37.5% 100%',
    },
  },
  {
    id: 'arika-pistachios',
    name: 'Pistachios (Pista)',
    category: 'dry-fruits',
    categoryLabel: 'Premium Dry Fruits',
    netWeight: '200 g',
    tagline: 'Lightly roasted, naturally opened savory pistachios',
    shelf: 3,
    spriteStyle: {
      backgroundSize: '900% 300%',
      backgroundPosition: '50% 100%',
    },
  },
  {
    id: 'arika-black-pepper',
    name: 'Black Pepper (Kali Mirch)',
    category: 'spices',
    categoryLabel: 'Whole Spices',
    netWeight: '100 g',
    tagline: 'High-piperine Malabar black peppercorns with bold heat',
    shelf: 3,
    spriteStyle: {
      backgroundSize: '900% 300%',
      backgroundPosition: '62.5% 100%',
    },
  },
  {
    id: 'arika-cardamom',
    name: 'Green Cardamom (Elaichi)',
    category: 'spices',
    categoryLabel: 'Whole Spices',
    netWeight: '50 g',
    tagline: '8mm bold green cardamom pods bursting with sweet aroma',
    shelf: 3,
    spriteStyle: {
      backgroundSize: '900% 300%',
      backgroundPosition: '75% 100%',
    },
  },
  {
    id: 'arika-cinnamon',
    name: 'Cinnamon Sticks (Dalchini)',
    category: 'spices',
    categoryLabel: 'Whole Spices',
    netWeight: '50 g',
    tagline: 'Pure aromatic rolled cinnamon quills with warm fragrance',
    shelf: 3,
    spriteStyle: {
      backgroundSize: '900% 300%',
      backgroundPosition: '87.5% 100%',
    },
  },
  {
    id: 'arika-cloves',
    name: 'Whole Cloves (Laung)',
    category: 'spices',
    categoryLabel: 'Whole Spices',
    netWeight: '50 g',
    tagline: 'Full-headed hand-selected spicy aromatic cloves',
    shelf: 3,
    spriteStyle: {
      backgroundSize: '900% 300%',
      backgroundPosition: '100% 100%',
    },
  },
];

import React, { useState } from 'react';
import { Check, ArrowRight, Sparkles, Package, Layers, FileDown } from 'lucide-react';
import { useEnquiry } from '../context/EnquiryContext';
import { SITE_CONFIG } from '../config/site';

interface ColourGrade {
  id: 'golden' | 'light' | 'dark';
  name: 'Golden Yellow' | 'Light Brown' | 'Dark Brown';
  colorHex: string;
  textColor: string;
  borderHex: string;
  description: string;
  flavorNote: string;
}

const COLOUR_GRADES: ColourGrade[] = [
  {
    id: 'golden',
    name: 'Golden Yellow',
    colorHex: 'bg-amber-300',
    textColor: 'text-amber-950',
    borderHex: 'border-amber-400',
    description: 'Bright golden colour with a clean, mild sweetness.',
    flavorNote: 'Subtle delicate cane notes, light caramel, ideal for everyday tea & table use.',
  },
  {
    id: 'light',
    name: 'Light Brown',
    colorHex: 'bg-amber-600',
    textColor: 'text-amber-900',
    borderHex: 'border-amber-500',
    description: 'Soft light-brown shade, balanced and versatile.',
    flavorNote: 'Well-rounded molasses richness, versatile for bakery, beverages & confectioneries.',
  },
  {
    id: 'dark',
    name: 'Dark Brown',
    colorHex: 'bg-amber-900',
    textColor: 'text-amber-950',
    borderHex: 'border-amber-950',
    description: 'Deep, rich colour with a bold, full-bodied flavour.',
    flavorNote: 'Intense earthy molasses sweetness, high mineral profile, ideal for traditional recipes.',
  },
];

interface ProductType {
  id: 'powder' | 'small-blocks' | 'whole-block';
  name: string;
  tagline: string;
  application: string;
  image: string;
  specs: string;
}

const PRODUCT_TYPES: ProductType[] = [
  {
    id: 'powder',
    name: 'Jaggery Powder',
    tagline: 'Free-flowing fine powder',
    application: 'For retail pouches, table use, beverages & daily sweetening.',
    image: '/src/assets/images/real_jaggery_powder_1793217606180.jpg',
    specs: 'Moisture Max 3% | Sucrose Min 80% | 40/60/80 Mesh',
  },
  {
    id: 'small-blocks',
    name: 'Small Solid Blocks',
    tagline: 'Bite-sized cubes & pieces',
    application: 'Easy portioning for direct use, retail tubs & consumer boxes.',
    image: '/src/assets/images/real_jaggery_cubes_1793217620230.jpg',
    specs: 'Moisture Max 5%–7% | Sucrose Min 75%–82% | 15mm/20mm Pieces',
  },
  {
    id: 'whole-block',
    name: 'Whole Block',
    tagline: 'Traditional solid blocks',
    application: 'For wholesale distribution, repackers & food processing.',
    image: '/src/assets/images/real_jaggery_blocks_1793217633798.jpg',
    specs: 'Moisture Max 5%–7% | Sucrose Min 75%–82% | Brix ≥ 85°',
  },
];

const SPICED_VARIETIES = [
  { name: 'Ginger (Sonth)', benefit: 'Warming, digestion & immunity', icon: '🫚' },
  { name: 'Cardamom (Elaichi)', benefit: 'Fragrant royal aroma & refreshment', icon: '🌿' },
  { name: 'Fennel (Saunf)', benefit: 'Cooling digestive sweetness & soothing palate', icon: '🌱' },
  { name: 'Sesame & Peanuts', benefit: 'Energy-dense protein, crunch & iron richness', icon: '🥜' },
];

export function RangeMatrixSection() {
  const { openEnquiryModal } = useEnquiry();
  const [selectedColour, setSelectedColour] = useState<'golden' | 'light' | 'dark'>('golden');
  const [selectedType, setSelectedType] = useState<'powder' | 'small-blocks' | 'whole-block'>('powder');

  const currentColourObj = COLOUR_GRADES.find((c) => c.id === selectedColour)!;
  const currentTypeObj = PRODUCT_TYPES.find((t) => t.id === selectedType)!;

  return (
    <section className="py-16 sm:py-24 bg-[#FAF8F5] border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-stone-200">
          <div className="max-w-3xl">
            <div className="text-xs font-bold uppercase tracking-widest text-[#C5A059] mb-2 flex items-center gap-1.5">
              <span>OUR RANGE</span>
              <span aria-hidden="true" className="text-stone-300">·</span>
              <span className="text-stone-500">OFFICIAL CATALOGUE MATRIX</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-black text-[#0A192F] tracking-tight">
              Colours, Forms &amp; Spiced Jaggery
            </h2>
            <p className="mt-3 text-sm sm:text-base text-stone-600 leading-relaxed">
              Every variant is 100% natural, chemical-free, and crafted to international export parameters. Explore our 3 natural colour grades across all 3 product forms, plus our specialty spiced jaggery blends.
            </p>
          </div>

          <div className="shrink-0 flex items-center gap-3">
            <a
              href={SITE_CONFIG.cataloguePdfUrl}
              download="NEXARIS_Jaggery_Product_Catalogue.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 text-xs font-bold uppercase tracking-wider text-[#0A192F] bg-white hover:bg-stone-50 border border-stone-300 rounded-lg transition-colors shadow-xs"
            >
              <FileDown className="w-4 h-4 text-[#C5A059]" />
              <span>Download PDF Catalogue</span>
            </a>
          </div>
        </div>

        {/* 1. THREE JAGGERY COLOURS (AVAILABLE IN ALL 3 TYPES) */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold uppercase tracking-wider text-stone-700 flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-[#0A192F] text-white text-[10px] flex items-center justify-center font-mono">1</span>
              <span>THREE JAGGERY COLOURS (AVAILABLE IN ALL 3 TYPES)</span>
            </h3>
            <span className="text-xs text-stone-500 hidden sm:inline">Select a colour grade to inspect:</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {COLOUR_GRADES.map((colour) => {
              const isSelected = selectedColour === colour.id;
              return (
                <div
                  key={colour.id}
                  onClick={() => setSelectedColour(colour.id)}
                  className={`p-6 rounded-xl border transition-all cursor-pointer bg-white relative flex flex-col justify-between space-y-4 ${
                    isSelected
                      ? 'border-[#0A192F] ring-2 ring-[#0A192F]/10 shadow-md'
                      : 'border-stone-200 hover:border-stone-400 shadow-xs'
                  }`}
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className={`w-8 h-8 rounded-full shadow-inner border border-black/10 shrink-0 ${colour.colorHex}`} />
                        <div>
                          <h4 className="font-serif font-bold text-lg text-[#0A192F]">{colour.name}</h4>
                          <span className="text-[11px] font-semibold text-[#C5A059] uppercase tracking-wider">Natural Cane Hue</span>
                        </div>
                      </div>

                      {isSelected && (
                        <span className="w-6 h-6 rounded-full bg-[#0A192F] text-[#D4AF37] flex items-center justify-center">
                          <Check className="w-3.5 h-3.5" />
                        </span>
                      )}
                    </div>

                    <p className="text-xs text-stone-600 leading-relaxed font-medium">
                      {colour.description}
                    </p>

                    <div className="p-3 bg-[#FAF8F5] rounded-lg text-[11px] text-stone-500 border border-stone-100">
                      <strong className="text-stone-800">Flavor profile: </strong>
                      {colour.flavorNote}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-stone-100 text-[11px] font-semibold text-stone-700 flex items-center justify-between">
                    <span>Available in:</span>
                    <span className="text-emerald-700 flex items-center gap-1">
                      ✓ Powder ✓ Small Blocks ✓ Whole Block
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 2. THREE PRODUCT TYPES */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold uppercase tracking-wider text-stone-700 flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-[#0A192F] text-white text-[10px] flex items-center justify-center font-mono">2</span>
              <span>THREE PRODUCT TYPES</span>
            </h3>
            <span className="text-xs text-stone-500 hidden sm:inline">Select a product form:</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PRODUCT_TYPES.map((type) => {
              const isSelected = selectedType === type.id;
              return (
                <div
                  key={type.id}
                  onClick={() => setSelectedType(type.id)}
                  className={`bg-white rounded-xl overflow-hidden border transition-all cursor-pointer flex flex-col justify-between group ${
                    isSelected
                      ? 'border-[#0A192F] ring-2 ring-[#0A192F]/10 shadow-lg'
                      : 'border-stone-200 hover:border-stone-400 shadow-xs'
                  }`}
                >
                  <div>
                    <div className="h-44 bg-stone-100 overflow-hidden relative">
                      <img
                        src={type.image}
                        alt={type.name}
                        className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-300"
                      />
                      <div className="absolute top-3 left-3 bg-[#0A192F]/90 backdrop-blur-md px-2.5 py-1 text-white text-xs font-serif font-bold rounded">
                        {type.name}
                      </div>

                      <div className="absolute bottom-3 left-3 right-3 bg-white/95 backdrop-blur-md px-2.5 py-1 text-[11px] font-medium text-stone-700 rounded border border-stone-200">
                        {type.specs}
                      </div>
                    </div>

                    <div className="p-6 space-y-2">
                      <div className="text-xs font-bold uppercase tracking-wider text-[#C5A059]">
                        {type.tagline}
                      </div>
                      <h4 className="text-lg font-serif font-bold text-[#0A192F] group-hover:text-[#C5A059] transition-colors">
                        {type.name}
                      </h4>
                      <p className="text-xs text-stone-600 leading-relaxed">
                        {type.application}
                      </p>
                    </div>
                  </div>

                  <div className="p-6 pt-0">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        openEnquiryModal(undefined, 'jaggery', 'buyer');
                      }}
                      className="w-full inline-flex items-center justify-center gap-1.5 px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-[#0A192F] bg-[#FAF8F5] hover:bg-[#D4AF37] border border-stone-200 hover:border-[#D4AF37] rounded-lg transition-colors cursor-pointer"
                    >
                      <span>Request {type.name} RFQ</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 3. SPECIALTY RANGE — SPICED JAGGERY */}
        <div className="bg-[#0A192F] text-white rounded-2xl p-6 sm:p-10 lg:p-12 relative overflow-hidden shadow-xl border border-white/10">
          <div className="absolute inset-0 bg-[radial-gradient(#D4AF37_1px,transparent_1px)] [background-size:28px_28px] opacity-10 pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-6">
              <div>
                <div className="text-xs font-bold uppercase tracking-widest text-[#D4AF37] mb-1">
                  SPECIALTY RANGE
                </div>
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-white">
                  Spiced Jaggery Blends
                </h3>
                <p className="mt-2 text-xs sm:text-sm text-stone-300 leading-relaxed max-w-xl">
                  Natural sugarcane jaggery blended with pure culinary whole spices &amp; nuts. Available in both <strong className="text-white">Solid Blocks &amp; Fine Powder</strong> for gourmet retail, digestive candies, and hot beverage formulations.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                {SPICED_VARIETIES.map((spice) => (
                  <div
                    key={spice.name}
                    className="p-3.5 rounded-xl bg-white/5 border border-white/10 hover:border-[#D4AF37]/50 transition-colors space-y-1.5"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-xl" aria-hidden="true">{spice.icon}</span>
                      <h4 className="font-serif font-bold text-sm text-white">{spice.name}</h4>
                    </div>
                    <p className="text-[11px] text-stone-300 leading-relaxed">{spice.benefit}</p>
                  </div>
                ))}
              </div>

              <div className="pt-4 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 text-xs">
                <span className="text-stone-300 text-[11px]">
                  100% Natural · Zero Chemical Additives · Available in Retail Tubs &amp; Master Cartons
                </span>

                <button
                  type="button"
                  onClick={() => openEnquiryModal(undefined, 'jaggery', 'buyer')}
                  className="inline-flex items-center gap-2 px-6 py-3 text-xs font-bold uppercase tracking-wider text-[#0A192F] bg-[#D4AF37] hover:bg-[#C5A059] rounded-lg transition-colors cursor-pointer shadow-md"
                >
                  <span>Request Spiced Jaggery Samples</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="relative rounded-xl overflow-hidden border border-white/15 shadow-2xl aspect-4/3 bg-stone-900 group">
                <img
                  src="/src/assets/images/real_spiced_jaggery_1793217647577.jpg"
                  alt="Authentic Spiced Jaggery Cubes and Powder with whole cardamom, ginger, fennel and sesame"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A192F]/80 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-3 left-3 right-3 bg-[#0A192F]/90 backdrop-blur-md px-3 py-2 rounded-lg border border-white/10 text-xs">
                  <span className="font-bold text-[#D4AF37] block">Culinary Whole Spices Infused</span>
                  <span className="text-[11px] text-stone-300">Pure Sonth, Elaichi, Saunf &amp; Til on authentic Gur</span>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

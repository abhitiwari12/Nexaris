import React, { useState } from 'react';
import { Link } from '../context/RouterContext';
import { ArrowRight, Globe, Sparkles, FileText, CheckCircle2 } from 'lucide-react';
import { useEnquiry } from '../context/EnquiryContext';
import { TdsModal } from './TdsModal';
import { Product } from '../types';
import { ALL_PRODUCTS } from '../data/products';

interface JaggeryGalleryItem {
  id: string;
  slug: string;
  title: string;
  category: string;
  hsCode: string;
  description: string;
  image: string;
  badge: string;
  keySpecs: string[];
}

const JAGGERY_GALLERY: JaggeryGalleryItem[] = [
  {
    id: 'powder',
    slug: 'jaggery-powder',
    title: 'Organic Jaggery Powder',
    category: 'Natural Free-Flowing Sweetener',
    hsCode: '17011420',
    description: 'Free-flowing granulated alternative to refined cane sugar. Moisture ≤ 2.0% – 3.0%, 100% sulphur-free with zero chemical bleaching.',
    image: '/src/assets/images/real_jaggery_powder_1793217606180.jpg',
    badge: 'Moisture ≤ 3.0%',
    keySpecs: ['Sucrose: Min 80%', 'Mesh: 40/60/80', 'Packaging: 250g to 25kg'],
  },
  {
    id: 'cubes',
    slug: 'small-solid-blocks',
    title: 'Small Solid Blocks (Cubes)',
    category: 'Portion-Controlled Sweeteners',
    hsCode: '17011410',
    description: 'Precision molded 15mm & 20mm uniform sweetener cubes for HORECA table service, cafes, and premium retail packaging.',
    image: '/src/assets/images/real_jaggery_cubes_1793217620230.jpg',
    badge: 'Uniform 15mm / 20mm',
    keySpecs: ['Sucrose: 75%–82%', 'Moisture: ≤ 5.0%–7.0%', 'Packaging: Food Jars / Cartons'],
  },
  {
    id: 'blocks',
    slug: 'whole-jaggery-blocks',
    title: 'Traditional Whole Jaggery Blocks',
    category: 'Solid Unrefined Cane Sugar',
    hsCode: '17011410',
    description: 'Solid traditional bheli blocks cooked to Brix ≥ 85°. Ideal for wholesale distribution, commercial food processors, and confectioners.',
    image: '/src/assets/images/real_jaggery_blocks_1793217633798.jpg',
    badge: 'Brix ≥ 85°',
    keySpecs: ['Weights: 1kg / 5kg / 10kg', 'Moisture: ≤ 7.0%', 'Shrink-wrapped blocks'],
  },
  {
    id: 'spiced',
    slug: 'spiced-jaggery',
    title: 'Spiced Jaggery (Specialty Range)',
    category: 'Cane Sweetener with Whole Spices',
    hsCode: '17011490',
    description: 'Handcrafted jaggery infused with pure culinary spices: Ginger (Sonth), Cardamom (Elaichi), Fennel (Saunf), and Sesame & Peanuts.',
    image: '/src/assets/images/real_spiced_jaggery_1793217647577.jpg',
    badge: 'Whole Spices Infused',
    keySpecs: ['Ginger, Cardamom, Fennel & Sesame', 'Forms: Blocks & Powder', '100% Chemical-Free'],
  },
];

interface DivisionImageGalleryProps {
  className?: string;
  title?: string;
  subtitle?: string;
}

export function DivisionImageGallery({
  className = '',
  title = 'Export-Grade Jaggery Variants (HS Code Ch. 17)',
  subtitle = 'Discover our full range of 100% sulphur-free sugarcane sweeteners with certified technical specifications and international container logistics.',
}: DivisionImageGalleryProps) {
  const { openEnquiryModal } = useEnquiry();
  const [activeTab, setActiveTab] = useState<'all' | 'powder' | 'cubes' | 'blocks' | 'spiced'>('all');
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});
  const [tdsModalProduct, setTdsModalProduct] = useState<Product | null>(null);

  const filteredItems = JAGGERY_GALLERY.filter((item) => {
    if (activeTab === 'all') return true;
    return item.id === activeTab;
  });

  const handleOpenTds = (itemSlug: string) => {
    const prod = ALL_PRODUCTS.find((p) => p.slug === itemSlug);
    if (prod) {
      setTdsModalProduct(prod);
    }
  };

  return (
    <section id="products" className={`py-16 sm:py-20 bg-[#FAF8F5] border-b border-stone-200 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div className="max-w-2xl">
            <div className="text-xs font-bold uppercase tracking-wider text-[#C5A059] mb-2">
              NATURAL CANE SWEETENERS SHOWCASE
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-[#0A192F] tracking-tight">
              {title}
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-stone-600 leading-relaxed">
              {subtitle}
            </p>
          </div>

          {/* Interactive Filter Tabs */}
          <div className="flex items-center gap-1.5 p-1 bg-white rounded-lg border border-stone-200 shadow-xs overflow-x-auto no-scrollbar shrink-0 max-w-full">
            <button
              type="button"
              onClick={() => setActiveTab('all')}
              className={`px-3.5 py-2 text-xs font-semibold rounded-md transition-colors cursor-pointer whitespace-nowrap min-h-[38px] ${
                activeTab === 'all'
                  ? 'bg-[#0A192F] text-[#D4AF37]'
                  : 'text-stone-600 hover:text-[#0A192F]'
              }`}
            >
              All Variants ({JAGGERY_GALLERY.length})
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('powder')}
              className={`px-3.5 py-2 text-xs font-semibold rounded-md transition-colors cursor-pointer whitespace-nowrap min-h-[38px] ${
                activeTab === 'powder'
                  ? 'bg-[#0A192F] text-[#D4AF37]'
                  : 'text-stone-600 hover:text-[#0A192F]'
              }`}
            >
              Organic Powder
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('cubes')}
              className={`px-3.5 py-2 text-xs font-semibold rounded-md transition-colors cursor-pointer whitespace-nowrap min-h-[38px] ${
                activeTab === 'cubes'
                  ? 'bg-[#0A192F] text-[#D4AF37]'
                  : 'text-stone-600 hover:text-[#0A192F]'
              }`}
            >
              Sweetener Cubes
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('blocks')}
              className={`px-3.5 py-2 text-xs font-semibold rounded-md transition-colors cursor-pointer whitespace-nowrap min-h-[38px] ${
                activeTab === 'blocks'
                  ? 'bg-[#0A192F] text-[#D4AF37]'
                  : 'text-stone-600 hover:text-[#0A192F]'
              }`}
            >
              Traditional Blocks
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('spiced')}
              className={`px-3.5 py-2 text-xs font-semibold rounded-md transition-colors cursor-pointer whitespace-nowrap min-h-[38px] ${
                activeTab === 'spiced'
                  ? 'bg-[#0A192F] text-[#D4AF37]'
                  : 'text-stone-600 hover:text-[#0A192F]'
              }`}
            >
              Spiced Jaggery
            </button>
          </div>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-xl border border-stone-200 hover:border-[#C5A059] transition-all duration-200 overflow-hidden flex flex-col justify-between shadow-xs hover:shadow-md group"
            >
              <div>
                {/* Image Container with Fallback */}
                <div className="relative aspect-4/3 bg-stone-100 overflow-hidden">
                  {!imageErrors[item.id] ? (
                    <img
                      src={item.image}
                      alt={item.title}
                      referrerPolicy="no-referrer"
                      onError={() => setImageErrors((prev) => ({ ...prev, [item.id]: true }))}
                      className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-300"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center bg-[#0A192F]/10 p-6 text-center">
                      <Globe className="w-8 h-8 text-[#0A192F]/40 mb-2" />
                      <span className="text-xs font-semibold text-[#0A192F]">{item.title}</span>
                    </div>
                  )}

                  {/* HS Code Badge */}
                  <div className="absolute top-3 left-3 bg-[#0A192F]/90 backdrop-blur-md px-2.5 py-1 text-[#D4AF37] text-xs font-mono font-bold rounded border border-white/10 shadow-xs">
                    HS: {item.hsCode}
                  </div>

                  {/* Quality Highlight */}
                  <div className="absolute bottom-3 right-3 bg-emerald-950/80 backdrop-blur-md px-2 py-0.5 text-emerald-300 text-[10px] font-semibold rounded border border-emerald-500/20">
                    {item.badge}
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 space-y-3">
                  <div>
                    <span className="text-[11px] text-[#C5A059] font-bold uppercase tracking-wider block">
                      {item.category}
                    </span>
                    <h3 className="text-lg font-serif font-bold text-[#0A192F] mt-0.5 group-hover:text-[#C5A059] transition-colors">
                      {item.title}
                    </h3>
                  </div>

                  <p className="text-xs text-stone-600 leading-relaxed line-clamp-3">
                    {item.description}
                  </p>

                  {/* Specs Quick Strip */}
                  <div className="pt-2 border-t border-stone-100 space-y-1">
                    {item.keySpecs.map((spec, sIdx) => (
                      <div key={sIdx} className="flex items-center gap-1.5 text-[11px] text-stone-600 font-medium">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>{spec}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Actions Footer */}
              <div className="p-5 pt-0 grid grid-cols-2 gap-2 border-t border-stone-100 mt-2">
                <button
                  type="button"
                  onClick={() => handleOpenTds(item.slug)}
                  className="inline-flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-semibold text-stone-700 bg-stone-100 hover:bg-stone-200 rounded-lg transition-colors cursor-pointer"
                >
                  <FileText className="w-3.5 h-3.5 text-[#C5A059]" />
                  <span>Spec Sheet</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    const prod = ALL_PRODUCTS.find((p) => p.slug === item.slug);
                    openEnquiryModal(prod, 'jaggery', 'buyer');
                  }}
                  className="inline-flex items-center justify-center gap-1 px-3 py-2 text-xs font-bold uppercase tracking-wider text-[#0A192F] bg-[#D4AF37] hover:bg-[#C5A059] rounded-lg transition-colors cursor-pointer shadow-xs"
                >
                  <span>RFQ</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* TDS Specification Modal */}
      {tdsModalProduct && (
        <TdsModal
          product={tdsModalProduct}
          isOpen={!!tdsModalProduct}
          onClose={() => setTdsModalProduct(null)}
        />
      )}
    </section>
  );
}

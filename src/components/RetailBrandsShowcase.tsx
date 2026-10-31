import React, { useState } from 'react';
import { ALL_ARIKA_PRODUCTS, ArikaProduct, MASTER_SHELF_IMAGE } from '../data/arikaProducts';
import { ArikaPouchCard } from './ArikaPouchCard';
import { ArikaLightboxModal } from './ArikaLightboxModal';
import { Eye, ArrowRight, Sparkles, CheckCircle } from 'lucide-react';
import { useEnquiry } from '../context/EnquiryContext';

export function RetailBrandsShowcase() {
  const [activeCategory, setActiveCategory] = useState<'all' | 'spices' | 'pulses' | 'dry-fruits'>('all');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<ArikaProduct | undefined>(undefined);
  const { openEnquiryModal } = useEnquiry();

  const handleOpenZoom = (product: ArikaProduct) => {
    setSelectedProduct(product);
    setLightboxOpen(true);
  };

  const filteredProducts = ALL_ARIKA_PRODUCTS.filter((product) => {
    if (activeCategory === 'all') return true;
    return product.category === activeCategory;
  });

  const categoryTabs = [
    { id: 'all', label: `All Products (${ALL_ARIKA_PRODUCTS.length})` },
    { id: 'spices', label: 'Spices & Seeds (11)' },
    { id: 'pulses', label: 'Dal & Pulses (7)' },
    { id: 'dry-fruits', label: 'Dry Fruits & Nuts (5)' },
  ];

  return (
    <section className="py-16 sm:py-20 bg-[#FAF8F5] border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Clean Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#D4AF37] block mb-2">
            CONSUMER RETAIL RANGE
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#0A192F] tracking-tight">
            ARIKA <span className="text-[#D4AF37] font-sans font-light">by NEXARIS</span>
          </h2>
          <p className="text-sm text-slate-600 mt-3 leading-relaxed">
            Our complete retail pantry collection: aromatic ground spices, machine-cleaned unpolished pulses, and vacuum-sealed dry fruits.
          </p>
          <div className="w-16 h-0.5 bg-[#D4AF37] mx-auto mt-4" />
        </div>

        {/* Clean Master Shelf Banner */}
        <div className="mb-10 bg-[#0A192F] rounded-lg p-5 sm:p-6 text-white flex flex-col sm:flex-row items-center justify-between gap-4 border border-[#1E293B] shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded bg-[#D4AF37]/20 border border-[#D4AF37] flex items-center justify-center text-[#D4AF37] font-serif font-black text-lg">
              A
            </div>
            <div>
              <h3 className="font-serif font-bold text-base text-white">
                23 Shelf-Ready Stand-Up Pouches
              </h3>
              <p className="text-xs text-slate-300">
                Aroma-locked foil & clear-window packs for modern grocery retail & supermarkets
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => {
                setSelectedProduct(undefined);
                setLightboxOpen(true);
              }}
              className="px-4 py-2 bg-[#D4AF37] hover:bg-[#C5A059] text-[#0A192F] text-xs font-bold uppercase tracking-wider rounded transition-colors flex items-center gap-2"
            >
              <Eye className="w-4 h-4" />
              <span>View Full Shelf Artwork</span>
            </button>
            <button
              type="button"
              onClick={() => openEnquiryModal(undefined, 'spices', 'buyer', 'ARIKA Retail Distribution Enquiry')}
              className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white text-xs font-bold uppercase tracking-wider rounded transition-colors"
            >
              Request Retail Kit
            </button>
          </div>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {categoryTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveCategory(tab.id as any)}
              className={`px-5 py-2 text-xs font-bold uppercase tracking-wider rounded-full transition-all ${
                activeCategory === tab.id
                  ? 'bg-[#0A192F] text-[#D4AF37] shadow-sm'
                  : 'bg-white text-slate-600 hover:text-[#0A192F] hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* 23 Product Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
          {filteredProducts.map((product) => (
            <ArikaPouchCard
              key={product.id}
              product={product}
              onOpenZoom={handleOpenZoom}
            />
          ))}
        </div>

        {/* Quick Bulk Inquiry Footer */}
        <div className="mt-12 text-center">
          <p className="text-xs text-slate-500 mb-3">
            Interested in institutional bulk quantities or custom supermarket retail displays?
          </p>
          <button
            type="button"
            onClick={() => openEnquiryModal(undefined, 'spices', 'buyer', 'ARIKA Retail Display & Supermarket Supply')}
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#0A192F] text-white hover:bg-[#1E293B] text-xs font-bold uppercase tracking-wider rounded transition-colors shadow-sm"
          >
            <span>Request Trade Quotation</span>
            <ArrowRight className="w-4 h-4 text-[#D4AF37]" />
          </button>
        </div>
      </div>

      {/* Lightbox Modal */}
      <ArikaLightboxModal
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        selectedProduct={selectedProduct}
      />
    </section>
  );
}

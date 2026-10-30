import React, { useState } from 'react';
import { ALL_PRODUCTS } from '../data/products';
import { Product, Division } from '../types';
import { Package, ArrowRight, Check, Sparkles } from 'lucide-react';
import { useEnquiry } from '../context/EnquiryContext';
import { Link } from '../context/RouterContext';

export function RetailBrandsShowcase() {
  const [selectedTab, setSelectedTab] = useState<'all' | 'spices' | 'pulses' | 'dry-fruits'>('all');
  const { openEnquiryModal } = useEnquiry();

  // Filter products that have retail packaging
  const filteredProducts = ALL_PRODUCTS.filter((product) => {
    if (selectedTab === 'all') return product.featured || product.pouchImage;
    return product.division === selectedTab;
  });

  const tabs = [
    { id: 'all', label: 'All Retail Range' },
    { id: 'spices', label: 'Spices & Seeds' },
    { id: 'pulses', label: 'Dal & Pulses' },
    { id: 'dry-fruits', label: 'Dry Fruits & Nuts' },
  ];

  return (
    <section className="py-20 lg:py-24 bg-[#FAF8F5] border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header matching Screenshot 2 & 3 */}
        <div className="text-center mb-12">
          <span className="text-xs uppercase tracking-widest text-[#D4AF37] font-bold block mb-2 font-mono">
            CONSUMER PACKAGING · SUPERMARKETS & GROCERIES
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#0A192F] tracking-tight">
            OUR <span className="text-[#D4AF37]">BRANDS</span>
          </h2>
          <p className="text-sm text-slate-600 font-sans max-w-xl mx-auto mt-3">
            Premium multi-layer barrier stand-up pouches designed for retail freshness, shelf longevity, and direct household culinary delight.
          </p>
          <div className="w-16 h-0.5 bg-[#D4AF37] mx-auto mt-4" />
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedTab(tab.id as any)}
              className={`px-5 py-2 text-xs font-bold uppercase tracking-wider rounded-full transition-all ${
                selectedTab === tab.id
                  ? 'bg-[#0A192F] text-[#D4AF37] shadow-sm'
                  : 'bg-white text-slate-600 hover:text-[#0A192F] hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Product Pouch Cards Grid matching Screenshot 2 & 3 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.slice(0, 8).map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-sm border border-slate-200 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col group"
            >
              {/* Product Pouch Presentation Container */}
              <div className="relative p-6 bg-gradient-to-b from-[#F8FAFC] to-[#F1F5F9] flex items-center justify-center h-64 overflow-hidden border-b border-slate-100">
                <img
                  src={product.pouchImage || product.image}
                  alt={product.name}
                  className="max-h-56 w-auto object-contain drop-shadow-lg group-hover:scale-105 transition-transform duration-500"
                />
                {product.featured && (
                  <span className="absolute top-3 left-3 bg-[#D4AF37] text-[#0A192F] text-[10px] font-bold uppercase px-2 py-0.5 rounded tracking-wider shadow-xs">
                    Popular
                  </span>
                )}
                <span className="absolute top-3 right-3 text-[11px] font-mono text-slate-400 bg-white/80 px-2 py-0.5 rounded border border-slate-200">
                  {product.category.toUpperCase()}
                </span>
              </div>

              {/* Card Body */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-baseline justify-between mb-1">
                    <h3 className="font-serif font-bold text-base text-[#0A192F] group-hover:text-[#D4AF37] transition-colors">
                      {product.name}
                    </h3>
                    {product.hindiName && (
                      <span className="text-xs text-slate-500 font-medium">({product.hindiName})</span>
                    )}
                  </div>
                  <p className="text-xs text-slate-600 line-clamp-2 mb-3">
                    {product.shortDescription}
                  </p>

                  {/* Pack Sizes */}
                  <div className="pt-2 border-t border-slate-100">
                    <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block mb-1">
                      Available Retail Packs:
                    </span>
                    <div className="flex flex-wrap gap-1 text-[11px] text-[#0A192F] font-mono">
                      {(product.retailPackaging || ['100g', '250g', '500g', '1kg']).map((size, idx) => (
                        <span key={idx} className="bg-slate-100 px-1.5 py-0.5 rounded text-slate-700">
                          {size.replace(' Pouch', '').replace(' Zip Pouch', '')}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Card Action */}
                <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => openEnquiryModal(product, product.division)}
                    className="text-xs font-bold text-[#0A192F] hover:text-[#D4AF37] transition-colors uppercase tracking-wider flex items-center gap-1"
                  >
                    <span>Request Quotation</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                  <span className="text-[11px] text-emerald-600 font-semibold flex items-center gap-0.5">
                    <Check className="w-3 h-3" /> FSSAI
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA to View Complete Product Matrix */}
        <div className="mt-12 text-center">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#0A192F] text-white hover:bg-[#1E293B] text-xs font-bold uppercase tracking-wider rounded-sm transition-colors shadow-sm"
          >
            <span>Explore Complete Retail & Export Catalogue ({ALL_PRODUCTS.length} Products)</span>
            <ArrowRight className="w-4 h-4 text-[#D4AF37]" />
          </Link>
        </div>
      </div>
    </section>
  );
}

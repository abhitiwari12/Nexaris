import React, { useState } from 'react';
import { ArrowRight, Sparkles, ShoppingBag } from 'lucide-react';
import { ALL_ARIKA_PRODUCTS, ArikaProduct, MASTER_SHELF_IMAGE } from '../data/arikaProducts';
import { useEnquiry } from '../context/EnquiryContext';
import { Link } from '../context/RouterContext';

export function KitchenRangeSection() {
  const [activeFilter, setActiveFilter] = useState<'all' | 'spices' | 'pulses' | 'dry-fruits'>('all');
  const { openEnquiryModal } = useEnquiry();

  const filterTabs = [
    { id: 'all', label: 'All' },
    { id: 'spices', label: 'Powder spices & Seeds' },
    { id: 'pulses', label: 'Dal & pulses' },
    { id: 'dry-fruits', label: 'Dry fruits & nuts' },
  ];

  const filteredItems = ALL_ARIKA_PRODUCTS.filter((product) => {
    if (activeFilter === 'all') return true;
    return product.category === activeFilter;
  });

  return (
    <section className="py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header matching Video 00:05 - 00:08 */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4 pb-4 border-b border-slate-200">
          <div>
            <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#991B1B] font-bold block mb-1">
              OVER 20+ KITCHEN ESSENTIALS
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#0A192F] tracking-tight">
              The NEXARIS range for your kitchen
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => openEnquiryModal(undefined, 'spices', 'buyer', 'Kitchen Range Complete Order')}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#15803D] hover:bg-[#166534] text-white text-xs font-bold uppercase tracking-wider rounded-lg shadow-sm transition-transform hover:scale-105"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Order now</span>
            </button>
          </div>
        </div>

        {/* Filter Pills matching Video */}
        <div className="flex flex-wrap items-center gap-2 mb-10">
          {filterTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveFilter(tab.id as any)}
              className={`px-4 py-1.5 text-xs font-medium rounded-full transition-all ${
                activeFilter === tab.id
                  ? 'bg-[#0A192F] text-white shadow-xs'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Shelf Subheader */}
        <div className="flex items-center justify-between mb-6 pb-2 border-b border-slate-100 text-xs text-slate-500 font-mono">
          <div className="flex items-center gap-2">
            <span className="font-bold uppercase tracking-wider text-[#0A192F]">
              {activeFilter === 'spices'
                ? 'Powder Spices & Whole Aromatics'
                : activeFilter === 'pulses'
                ? 'Unpolished Dal & Staple Pulses'
                : activeFilter === 'dry-fruits'
                ? 'Handpicked Dry Fruits & Nuts'
                : 'Pantry Range'}
            </span>
            <span>—</span>
            <span>Single packs & kitchen portions</span>
          </div>
          <span>Showing {filteredItems.length} products</span>
        </div>

        {/* Product Cards Shelf Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-5">
          {filteredItems.map((product) => (
            <div
              key={product.id}
              className="bg-[#FAF8F5] rounded-xl border border-slate-200 p-3 sm:p-4 flex flex-col justify-between hover:shadow-lg transition-all group"
            >
              {/* Product Pack Visual from Master Shelf */}
              <div className="relative aspect-[3/4] w-full flex items-center justify-center p-2 mb-2">
                <div
                  className="w-full h-full transition-transform duration-300 group-hover:scale-105"
                  style={{
                    backgroundImage: `url(${MASTER_SHELF_IMAGE})`,
                    backgroundSize: product.spriteStyle.backgroundSize,
                    backgroundPosition: product.spriteStyle.backgroundPosition,
                    backgroundRepeat: 'no-repeat',
                    filter: 'drop-shadow(0 6px 10px rgba(0,0,0,0.12))',
                  }}
                  role="img"
                  aria-label={product.name}
                />
              </div>

              {/* Product Details */}
              <div className="text-center pt-2 border-t border-slate-200/60 flex-1 flex flex-col justify-between">
                <div>
                  <h4 className="font-serif font-bold text-sm text-[#0A192F] group-hover:text-[#D4AF37] transition-colors leading-tight truncate">
                    {product.name}
                  </h4>
                  <p className="text-[10px] text-slate-500 font-mono mt-0.5">
                    {product.netWeight} packet
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    openEnquiryModal(
                      undefined,
                      product.category,
                      'buyer',
                      `Kitchen Pack: ${product.name} (${product.netWeight})`
                    )
                  }
                  className="mt-3 w-full py-1.5 px-2 bg-white hover:bg-[#0A192F] text-slate-700 hover:text-white border border-slate-200 text-[10px] font-semibold uppercase tracking-wider rounded transition-colors"
                >
                  Order / RFQ
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* The NEXARIS Purity Promise Banner */}
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-4 p-6 bg-gradient-to-r from-[#0A192F] to-[#1E293B] text-white rounded-xl border border-slate-700 shadow-md">
          <div className="space-y-1">
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#D4AF37] font-bold block">
              THE NEXARIS BRAND PROMISE
            </span>
            <h4 className="font-serif font-bold text-base sm:text-lg text-white">
              100% Pure, Unadulterated & Aromatic In Every Meal
            </h4>
            <p className="text-xs text-slate-300 max-w-xl">
              Zero preservatives, no artificial food colorings, and no fillers. Farm-fresh spices and Sortex-cleaned dals packed to preserve natural culinary aroma.
            </p>
          </div>

          <Link
            href="/products"
            className="px-6 py-3 bg-[#D4AF37] hover:bg-[#C5A059] text-[#0A192F] text-xs font-bold uppercase tracking-wider rounded-lg transition-transform hover:scale-105 shrink-0 shadow-sm"
          >
            Explore Complete Range
          </Link>
        </div>
      </div>
    </section>
  );
}

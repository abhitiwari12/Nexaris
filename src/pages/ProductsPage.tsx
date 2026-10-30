import React, { useState } from 'react';
import { ALL_PRODUCTS, OTHER_PRODUCTS_MATRIX } from '../data/products';
import { Product, Division } from '../types';
import { Package, ArrowRight, CheckCircle2, ShieldCheck, Download, Filter } from 'lucide-react';
import { useEnquiry } from '../context/EnquiryContext';
import { SITE_CONFIG } from '../config/site';
import { ConnectedSection } from '../components/ConnectedSection';

export function ProductsPage() {
  const [activeDivision, setActiveDivision] = useState<string>('all');
  const { openEnquiryModal } = useEnquiry();

  const filteredProducts = ALL_PRODUCTS.filter((item) => {
    if (activeDivision === 'all') return true;
    return item.division === activeDivision;
  });

  return (
    <div className="flex flex-col min-h-screen bg-[#FAF8F5]">
      {/* 1. Header Banner matching Screenshot 7 */}
      <section className="relative py-24 bg-[#0A192F] text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="/images/brand/hero_spices_pulses.jpg"
            alt="NEXARIS Products Range"
            className="w-full h-full object-cover opacity-25 filter contrast-125"
          />
          <div className="absolute inset-0 bg-[#0A192F]/85" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="text-xs font-mono uppercase tracking-widest text-[#D4AF37] font-bold block mb-3">
              RETAIL & BULK EXPORT PORTFOLIO
            </span>
            <h1 className="text-3xl sm:text-5xl font-serif font-bold text-white tracking-tight uppercase mb-4">
              OUR PRODUCTS
            </h1>
            <p className="text-base text-slate-300 font-sans leading-relaxed">
              NEXARIS provides unadulterated whole & ground spices, sortex-cleaned pulses, and premium dry fruits. From retail stand-up zip pouches for grocery shelves to 25kg–50kg export bags, each lot is machine cleaned and tested for culinary purity.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Filter Navigation Bar */}
      <section className="sticky top-20 z-30 bg-white border-b border-slate-200 shadow-xs py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-[#D4AF37]" />
            <span className="text-xs font-bold uppercase tracking-wider text-[#0A192F] font-mono">
              Categories:
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {[
              { id: 'all', label: 'All Products' },
              { id: 'spices', label: 'Spices & Whole Seeds' },
              { id: 'pulses', label: 'Dal & Pulses' },
              { id: 'dry-fruits', label: 'Dry Fruits & Nuts' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveDivision(tab.id)}
                className={`px-4 py-1.5 text-xs font-bold uppercase tracking-wider rounded-sm transition-all ${
                  activeDivision === tab.id
                    ? 'bg-[#0A192F] text-[#D4AF37] shadow-xs'
                    : 'bg-[#FAF8F5] text-slate-600 hover:text-[#0A192F] hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <a
            href={SITE_CONFIG.cataloguePdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#0A192F] hover:text-[#D4AF37]"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Catalogue PDF</span>
          </a>
        </div>
      </section>

      {/* 3. Section Title matching Screenshot 7 */}
      <section className="pt-16 pb-8 bg-[#FAF8F5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-xs uppercase tracking-widest text-[#D4AF37] font-bold block mb-2 font-mono">
            CERTIFIED HYGIENIC PACKAGING
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#0A192F] tracking-tight">
            OUR DIVERSE <span className="text-[#D4AF37]">PORTFOLIO</span>
          </h2>
          <div className="w-16 h-0.5 bg-[#D4AF37] mx-auto mt-4" />
        </div>
      </section>

      {/* 4. Alternating Product Cards matching Screenshot 7 & 8 */}
      <section className="pb-20 bg-[#FAF8F5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          {filteredProducts.map((product, index) => {
            const isReversed = index % 2 === 1;

            return (
              <div
                key={product.id}
                className={`bg-white rounded-sm border border-slate-200 shadow-sm p-6 sm:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center ${
                  isReversed ? 'lg:grid-flow-dense' : ''
                }`}
              >
                {/* Product Text Column */}
                <div className={`lg:col-span-7 space-y-4 ${isReversed ? 'lg:col-start-6' : ''}`}>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#D4AF37] bg-[#0A192F] px-2.5 py-0.5 rounded">
                      {product.division.toUpperCase()}
                    </span>
                    {product.hsCode && (
                      <span className="text-xs font-mono text-slate-500">
                        HS: {product.hsCode}
                      </span>
                    )}
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#0A192F] uppercase tracking-tight">
                    {product.name} {product.hindiName && <span className="text-slate-500 font-sans font-normal text-xl">({product.hindiName})</span>}
                  </h3>

                  <p className="text-slate-700 font-sans text-sm sm:text-base leading-relaxed">
                    {product.shortDescription}
                  </p>

                  {product.overview && (
                    <p className="text-slate-600 font-sans text-xs sm:text-sm leading-relaxed">
                      {product.overview}
                    </p>
                  )}

                  {/* Highlights / Features */}
                  {product.specifications && (
                    <div className="pt-2 grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
                      {product.specifications.slice(0, 3).map((spec, i) => (
                        <div key={i} className="p-2 bg-[#FAF8F5] rounded border border-slate-200">
                          <span className="text-slate-400 block text-[10px] uppercase font-bold">{spec.label}</span>
                          <span className="font-semibold text-[#0A192F]">{spec.value}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Packaging Size Label matching Screenshot 7 & 8 */}
                  <div className="pt-3 border-t border-slate-100">
                    <span className="font-bold text-xs uppercase tracking-wider text-[#0A192F] block mb-1">
                      Packaging Size:
                    </span>
                    <div className="font-mono text-xs text-slate-700 font-semibold bg-slate-50 p-2.5 rounded border border-slate-200">
                      {product.standardPackaging?.join(' · ') || '100gm / 250gm / 500gm / 1kg / 25kg / 50kg'}
                    </div>
                  </div>

                  {/* Quick RFQ CTA */}
                  <div className="pt-2 flex flex-wrap items-center gap-4">
                    <button
                      type="button"
                      onClick={() => openEnquiryModal({ division: product.division, productSlug: product.slug, productName: product.name })}
                      className="px-5 py-2.5 bg-[#0A192F] hover:bg-[#1E293B] text-white text-xs font-bold uppercase tracking-wider rounded-sm transition-colors flex items-center gap-2 shadow-xs"
                    >
                      <span>Request Quotation</span>
                      <ArrowRight className="w-3.5 h-3.5 text-[#D4AF37]" />
                    </button>
                    <span className="text-xs font-medium text-emerald-700 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Direct APMC Origin Certified
                    </span>
                  </div>
                </div>

                {/* Product Image Presentation matching Screenshot 7 & 8 */}
                <div className={`lg:col-span-5 flex items-center justify-center ${isReversed ? 'lg:col-start-1' : ''}`}>
                  <div className="relative w-full max-w-sm aspect-square bg-[#FAF8F5] p-6 rounded-sm border-2 border-slate-200 flex items-center justify-center shadow-md group hover:border-[#D4AF37] transition-all">
                    <img
                      src={product.pouchImage || product.image}
                      alt={product.name}
                      className="max-h-64 sm:max-h-72 w-auto object-contain drop-shadow-xl group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-xs px-2.5 py-0.5 rounded border border-slate-200 text-[10px] font-bold uppercase text-[#0A192F]">
                      Sortex 99.5%
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 5. Matrix Table: "OUR OTHER PRODUCTS" matching Screenshot 8 */}
      <section className="py-20 bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-xs uppercase tracking-widest text-[#D4AF37] font-bold block mb-2 font-mono">
              EXTENDED AGRO SUPPLY CAPABILITY
            </span>
            <h2 className="text-3xl font-serif font-bold text-[#0A192F] tracking-tight">
              OUR OTHER <span className="text-[#D4AF37]">PRODUCTS</span>
            </h2>
            <div className="w-16 h-0.5 bg-[#D4AF37] mx-auto mt-4" />
          </div>

          {/* Matrix Grid Table matching Screenshot 8 */}
          <div className="border border-slate-300 rounded-sm overflow-hidden shadow-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-slate-300">
              {OTHER_PRODUCTS_MATRIX.map((group, idx) => (
                <div key={idx} className="p-6 bg-[#FAF8F5]">
                  <h4 className="font-serif font-bold text-sm text-[#0A192F] uppercase tracking-wider pb-3 mb-4 border-b border-slate-300">
                    {group.category}
                  </h4>
                  <ul className="space-y-2.5 text-xs text-slate-700">
                    {group.items.map((item, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 6. Connected Section */}
      <ConnectedSection />
    </div>
  );
}

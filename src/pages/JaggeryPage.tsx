import React, { useState, useMemo } from 'react';
import { Search, ArrowUpRight, Sparkles, X, Check, FileText, FileDown, ShieldCheck } from 'lucide-react';
import { ALL_PRODUCTS } from '../data/products';
import { ProductCard } from '../components/ProductCard';
import { RangeMatrixSection } from '../components/RangeMatrixSection';
import { WhiteLabelingSection } from '../components/WhiteLabelingSection';
import { CertificationsSection } from '../components/CertificationsSection';
import { useEnquiry } from '../context/EnquiryContext';
import { SITE_CONFIG } from '../config/site';

export function JaggeryPage() {
  const { openEnquiryModal } = useEnquiry();
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'powder' | 'cubes' | 'blocks' | 'spiced'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProducts = useMemo(() => {
    return ALL_PRODUCTS.filter((product) => {
      // Sub-filter
      if (selectedFilter !== 'all') {
        if (selectedFilter === 'powder' && !product.slug.includes('powder')) return false;
        if (selectedFilter === 'cubes' && !product.slug.includes('cubes') && !product.slug.includes('small-solid-blocks')) return false;
        if (selectedFilter === 'blocks' && !product.slug.includes('whole-jaggery-blocks') && !product.slug.includes('traditional-jaggery-blocks')) return false;
        if (selectedFilter === 'spiced' && !product.slug.includes('spiced')) return false;
      }
      // Search filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = product.name.toLowerCase().includes(query);
        const matchesDesc = product.shortDescription.toLowerCase().includes(query);
        const matchesTagline = product.tagline?.toLowerCase().includes(query) || false;
        const matchesHs = product.hsCode?.includes(query) || false;
        return matchesName || matchesDesc || matchesTagline || matchesHs;
      }
      return true;
    });
  }, [selectedFilter, searchQuery]);

  return (
    <div className="pb-24 space-y-16 bg-[#FAF8F5]">
      {/* Hero Section with Official Catalogue Branding */}
      <section className="bg-[#0A192F] text-white py-14 sm:py-20 border-b border-white/10 overflow-hidden relative">
        <div className="absolute inset-0 bg-[radial-gradient(#D4AF37_1px,transparent_1px)] [background-size:32px_32px] opacity-10 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            <div className="lg:col-span-7 space-y-4">
              <div className="text-xs font-bold tracking-widest uppercase text-[#D4AF37] flex flex-wrap items-center gap-2">
                <span>PRODUCT CATALOGUE</span>
                <span aria-hidden="true" className="text-white/30">·</span>
                <span>PURE SUGARCANE JAGGERY</span>
                <span aria-hidden="true" className="text-white/30">·</span>
                <span className="text-emerald-400 font-bold">100% NATURAL • CHEMICAL-FREE • EXPORT QUALITY</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-black tracking-tight text-white leading-tight">
                Sugarcane Jaggery
              </h1>

              <p className="text-base sm:text-lg text-stone-300 leading-relaxed max-w-2xl">
                3 natural colour grades available across Powder, Small Solid Blocks, and Whole Blocks, alongside our Spiced Jaggery range and custom white labeling.
              </p>

              {/* 3 Core Highlights (Matching PDF Cover) */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                <div className="p-3 bg-white/5 rounded-lg border border-white/10">
                  <span className="block text-xs font-bold text-[#D4AF37]">3 Colours × 3 Forms</span>
                  <span className="text-[11px] text-stone-300">Golden, Light &amp; Dark Brown</span>
                </div>
                <div className="p-3 bg-white/5 rounded-lg border border-white/10">
                  <span className="block text-xs font-bold text-[#D4AF37]">Spiced Jaggery</span>
                  <span className="text-[11px] text-stone-300">Ginger, Cardamom, Fennel &amp; Nut</span>
                </div>
                <div className="p-3 bg-white/5 rounded-lg border border-white/10">
                  <span className="block text-xs font-bold text-[#D4AF37]">Custom Packaging</span>
                  <span className="text-[11px] text-stone-300">250 g Retail Packs to 25 kg Bulk</span>
                </div>
              </div>

              <div className="pt-3 flex flex-wrap gap-4">
                <button
                  type="button"
                  onClick={() => openEnquiryModal(undefined, 'jaggery', 'buyer')}
                  className="inline-flex items-center gap-2 px-6 py-3 text-xs font-bold uppercase tracking-wider text-[#0A192F] bg-[#D4AF37] hover:bg-[#C5A059] rounded-lg transition-colors cursor-pointer shadow-md"
                >
                  <span>Request Jaggery Quotation</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>

                <a
                  href={SITE_CONFIG.cataloguePdfUrl}
                  download="NEXARIS_Jaggery_Product_Catalogue.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-3 text-xs font-bold uppercase tracking-wider text-white bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg transition-colors shadow-xs"
                >
                  <FileDown className="w-4 h-4 text-[#D4AF37]" />
                  <span>Download PDF Catalogue</span>
                </a>
              </div>

              <div className="pt-3 border-t border-white/10 flex flex-wrap gap-x-4 gap-y-1.5 text-xs text-stone-400">
                <span>Moisture Max 3% (Powder)</span>
                <span aria-hidden="true">·</span>
                <span>Sucrose Min 80%</span>
                <span aria-hidden="true">·</span>
                <span>FSSAI • APEDA • FDA Registered</span>
                <span aria-hidden="true">·</span>
                <span className="text-[#D4AF37] font-semibold">Ocean Port Mundra / Kandla</span>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="relative rounded-2xl overflow-hidden border border-white/15 shadow-2xl bg-stone-900 aspect-4/3">
                <img
                  src="/src/assets/images/real_jaggery_hero_export_1793217661972.jpg"
                  alt="NEXARIS Pure Sugarcane Jaggery Export Processing & Aggregation"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A192F]/90 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-4 left-4 right-4 text-xs text-white bg-[#0A192F]/90 backdrop-blur-md p-3.5 rounded-xl border border-white/10 flex items-center justify-between">
                  <div>
                    <span className="font-bold text-[#D4AF37] block font-serif">100% Chemical-Free Jaggery</span>
                    <span className="text-[11px] text-stone-300">
                      Zero Sulphur &amp; Zero Bleaching • Direct Origin Dispatch
                    </span>
                  </div>
                  <a
                    href={SITE_CONFIG.cataloguePdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-[#D4AF37]"
                    title="View PDF"
                  >
                    <FileDown className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Range Matrix: 3 Colours × 3 Forms + Spiced Jaggery (Matching PDF Page 2) */}
      <RangeMatrixSection />

      {/* Main Product Cards & Search Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Controls Bar: Category Segmented Switch & Search */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 p-4 bg-white rounded-xl border border-stone-200 shadow-xs">
          
          {/* Variant Filter Buttons */}
          <div className="flex items-center gap-1.5 p-1 bg-[#FAF8F5] rounded-lg overflow-x-auto no-scrollbar border border-stone-200">
            <button
              type="button"
              onClick={() => setSelectedFilter('all')}
              className={`px-3.5 py-2 text-xs font-semibold rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                selectedFilter === 'all'
                  ? 'bg-[#0A192F] text-[#D4AF37] shadow-xs'
                  : 'text-stone-600 hover:text-[#0A192F]'
              }`}
            >
              All Varieties ({ALL_PRODUCTS.length})
            </button>
            <button
              type="button"
              onClick={() => setSelectedFilter('powder')}
              className={`px-3.5 py-2 text-xs font-semibold rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                selectedFilter === 'powder'
                  ? 'bg-[#0A192F] text-[#D4AF37] shadow-xs'
                  : 'text-stone-600 hover:text-[#0A192F]'
              }`}
            >
              Jaggery Powder
            </button>
            <button
              type="button"
              onClick={() => setSelectedFilter('cubes')}
              className={`px-3.5 py-2 text-xs font-semibold rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                selectedFilter === 'cubes'
                  ? 'bg-[#0A192F] text-[#D4AF37] shadow-xs'
                  : 'text-stone-600 hover:text-[#0A192F]'
              }`}
            >
              Small Solid Blocks
            </button>
            <button
              type="button"
              onClick={() => setSelectedFilter('blocks')}
              className={`px-3.5 py-2 text-xs font-semibold rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                selectedFilter === 'blocks'
                  ? 'bg-[#0A192F] text-[#D4AF37] shadow-xs'
                  : 'text-stone-600 hover:text-[#0A192F]'
              }`}
            >
              Whole Blocks
            </button>
            <button
              type="button"
              onClick={() => setSelectedFilter('spiced')}
              className={`px-3.5 py-2 text-xs font-semibold rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                selectedFilter === 'spiced'
                  ? 'bg-[#0A192F] text-[#D4AF37] shadow-xs'
                  : 'text-stone-600 hover:text-[#0A192F]'
              }`}
            >
              Spiced Jaggery
            </button>
          </div>

          {/* Search Box */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search powder, cubes, blocks, spiced, ginger..."
              className="w-full pl-9 pr-8 py-2 text-xs border border-stone-300 rounded-lg bg-stone-50/50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#0A192F] text-stone-900"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700"
                aria-label="Clear search query"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Product Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="p-12 text-center bg-white rounded-xl border border-stone-200">
            <Sparkles className="w-8 h-8 text-[#C5A059] mx-auto mb-3" />
            <h3 className="text-base font-serif font-bold text-[#0A192F]">No matching jaggery variants found</h3>
            <p className="mt-1 text-xs text-stone-500">
              Try searching for "powder", "cubes", "blocks", or "spiced".
            </p>
            <button
              onClick={() => {
                setSelectedFilter('all');
                setSearchQuery('');
              }}
              type="button"
              className="mt-4 px-4 py-2 text-xs font-semibold text-[#0A192F] bg-[#D4AF37] hover:bg-[#C5A059] rounded-lg cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        )}

      </section>

      {/* Official Specifications & Comparative Table (PDF Page 3) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl border border-stone-200 shadow-xs overflow-hidden">
          <div className="px-6 py-5 bg-[#0A192F] text-white flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#D4AF37] block">
                QUALITY ASSURED
              </span>
              <h3 className="text-xl font-serif font-bold text-white">
                Official Product Specifications (Sugarcane Jaggery)
              </h3>
            </div>
            <a
              href={SITE_CONFIG.cataloguePdfUrl}
              download="NEXARIS_Jaggery_Product_Catalogue.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/10 hover:bg-white/20 text-[#D4AF37] rounded-lg text-xs font-semibold transition-colors"
            >
              <FileDown className="w-3.5 h-3.5" />
              <span>Full Spec PDF</span>
            </a>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-[#FAF8F5] text-[#0A192F] border-b border-stone-200 font-serif font-bold">
                  <th className="p-4">Parameter</th>
                  <th className="p-4">Jaggery Powder</th>
                  <th className="p-4">Small Solid Blocks</th>
                  <th className="p-4">Whole Jaggery Blocks</th>
                  <th className="p-4">Spiced Jaggery</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-200 text-stone-700">
                <tr className="hover:bg-stone-50">
                  <td className="p-4 font-bold text-[#0A192F]">Colours Available</td>
                  <td className="p-4">Golden Yellow, Light Brown, Dark Brown</td>
                  <td className="p-4">Golden Yellow, Light Brown, Dark Brown</td>
                  <td className="p-4">Golden Yellow, Light Brown, Dark Brown</td>
                  <td className="p-4">Infused Natural Cane Hue</td>
                </tr>
                <tr className="hover:bg-stone-50 bg-[#FAF8F5]/50">
                  <td className="p-4 font-bold text-[#0A192F]">Taste &amp; Purity</td>
                  <td className="p-4 text-emerald-800 font-semibold" colSpan={4}>
                    100% Natural Sweet — Chemical-Free (Zero Sulphur &amp; Zero Bleaching)
                  </td>
                </tr>
                <tr className="hover:bg-stone-50">
                  <td className="p-4 font-bold text-[#0A192F]">Sucrose</td>
                  <td className="p-4 font-mono font-medium text-stone-900">Min 80%</td>
                  <td className="p-4 font-mono font-medium text-stone-900">Min 75% – 82%</td>
                  <td className="p-4 font-mono font-medium text-stone-900">Min 75% – 82%</td>
                  <td className="p-4 font-mono font-medium text-stone-900">Min 75% – 85%</td>
                </tr>
                <tr className="hover:bg-stone-50 bg-[#FAF8F5]/50">
                  <td className="p-4 font-bold text-[#0A192F]">Moisture</td>
                  <td className="p-4 font-mono font-semibold text-emerald-700">Max 3%</td>
                  <td className="p-4 font-mono font-semibold text-emerald-700">Max 5% – 7%</td>
                  <td className="p-4 font-mono font-semibold text-emerald-700">Max 5% – 7%</td>
                  <td className="p-4 font-mono font-semibold text-emerald-700">Max 3% (Powder) / 5%-7% (Blocks)</td>
                </tr>
                <tr className="hover:bg-stone-50">
                  <td className="p-4 font-bold text-[#0A192F]">Minerals</td>
                  <td className="p-4 text-stone-600" colSpan={4}>
                    Naturally rich in Iron, Calcium, Magnesium &amp; Potassium
                  </td>
                </tr>
                <tr className="hover:bg-stone-50 bg-[#FAF8F5]/50">
                  <td className="p-4 font-bold text-[#0A192F]">Shelf Life &amp; Storage</td>
                  <td className="p-4" colSpan={4}>
                    12 Months • Store in a cool, dry place away from moisture
                  </td>
                </tr>
                <tr className="hover:bg-stone-50">
                  <td className="p-4 font-bold text-[#0A192F]">Pack Sizes</td>
                  <td className="p-4" colSpan={4}>
                    250 g, 500 g, 1 kg (Retail) | 5 kg, 25 kg (Bulk)
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Custom Packing & White Labeling Section (Matching PDF Page 4) */}
      <WhiteLabelingSection />

      {/* Certifications Section (Matching PDF Page 3) */}
      <CertificationsSection />

      {/* Direct Contact Banner (Matching PDF Page 5) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#0A192F] text-white rounded-2xl p-8 sm:p-12 shadow-xl border border-white/10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-3">
              <span className="text-xs font-bold uppercase tracking-widest text-[#D4AF37]">
                LET US WORK TOGETHER
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white">
                Get in Touch with NEXARIS
              </h2>
              <p className="text-sm text-stone-300 leading-relaxed max-w-xl">
                Share your requirement and we will send you samples, specifications, and a formal quotation within 24 hours.
              </p>
            </div>

            <div className="lg:col-span-5 flex flex-col sm:flex-row lg:flex-col gap-3 text-xs">
              <a
                href={SITE_CONFIG.contact.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg transition-colors shadow-xs"
              >
                <span>WhatsApp: {SITE_CONFIG.contact.phone}</span>
              </a>
              <div className="flex items-center gap-2">
                <a
                  href={`tel:${SITE_CONFIG.contact.phoneTel}`}
                  className="flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-3 font-semibold text-[#0A192F] bg-white hover:bg-stone-100 rounded-lg transition-colors border border-stone-200"
                >
                  <span>Call: {SITE_CONFIG.contact.phone}</span>
                </a>
                <a
                  href={`mailto:${SITE_CONFIG.contact.email}?subject=Jaggery%20Export%20Enquiry`}
                  className="flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-3 font-semibold text-white bg-white/10 hover:bg-white/20 rounded-lg transition-colors border border-white/20 font-mono"
                >
                  <span>{SITE_CONFIG.contact.email}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}

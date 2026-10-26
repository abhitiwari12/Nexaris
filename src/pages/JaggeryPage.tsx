import React, { useState, useMemo } from 'react';
import { Search, ArrowUpRight, Sparkles, Droplets, Leaf, X, Check, FileText } from 'lucide-react';
import { JAGGERY_PRODUCTS } from '../data/products';
import { ProductCard } from '../components/ProductCard';
import { CertificationsSection } from '../components/CertificationsSection';
import { DivisionImageGallery } from '../components/DivisionImageGallery';
import { useEnquiry } from '../context/EnquiryContext';

export function JaggeryPage() {
  const { openEnquiryModal } = useEnquiry();
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'powder' | 'cubes' | 'blocks' | 'syrup'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProducts = useMemo(() => {
    return JAGGERY_PRODUCTS.filter((product) => {
      // Sub-filter
      if (selectedFilter !== 'all') {
        if (selectedFilter === 'powder' && !product.slug.includes('powder')) return false;
        if (selectedFilter === 'cubes' && !product.slug.includes('cubes')) return false;
        if (selectedFilter === 'blocks' && !product.slug.includes('blocks')) return false;
        if (selectedFilter === 'syrup' && !product.slug.includes('syrup')) return false;
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
    <div className="pb-24 space-y-12 bg-[#F8FAFC]">
      {/* Hero Section with Photographic Division Banner */}
      <section className="bg-[#10243D] text-white py-12 sm:py-16 border-b border-[#183653] overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            <div className="lg:col-span-7 space-y-4">
              <div className="text-xs font-semibold tracking-wider uppercase text-[#C7A45B] flex items-center gap-2">
                <span>Natural Sweeteners Division</span>
                <span aria-hidden="true" className="text-[#AEB8C4]">·</span>
                <span className="text-[#AEB8C4]">HS Code Chapter 17</span>
                <span aria-hidden="true" className="text-[#AEB8C4]">·</span>
                <span className="text-emerald-400 font-bold">100% Sulphur-Free</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight font-display">
                Premium Jaggery for Global Export
              </h1>

              <p className="text-base sm:text-lg text-[#AEB8C4] leading-relaxed max-w-2xl">
                Export-grade Indian sugarcane sweeteners: ultra-dry organic jaggery powder, precision-cut cubes, traditional solid blocks, and concentrated liquid cane syrup. Certified chemical-free, zero bleaching agents, and lab-tested for international food safety standards.
              </p>

              <div className="pt-2 flex flex-wrap gap-4">
                <button
                  type="button"
                  onClick={() => openEnquiryModal(undefined, 'jaggery')}
                  className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-[#10243D] bg-[#C7A45B] hover:bg-[#B89347] rounded-md transition-colors cursor-pointer shadow-md"
                >
                  <span>Request Jaggery Quotation</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>

              <div className="pt-4 border-t border-white/10 flex flex-wrap gap-x-4 gap-y-2 text-xs text-[#AEB8C4]">
                <span>Moisture Controlled (≤ 2.0% for Powder)</span>
                <span aria-hidden="true">·</span>
                <span>Brix 75°–85°</span>
                <span aria-hidden="true">·</span>
                <span>APEDA &amp; FSSAI Registered</span>
                <span aria-hidden="true">·</span>
                <span className="text-[#C7A45B] font-semibold">Container FCL Ocean Dispatch</span>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="relative rounded-lg overflow-hidden border border-white/15 shadow-xl bg-slate-900 aspect-16/10">
                <img
                  src="/src/assets/images/jaggery_division_banner_1793009935414.jpg"
                  alt="NEXARIS Natural Jaggery Sugarcane Sweeteners Export Division"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#10243D]/80 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-3 left-3 right-3 text-xs text-white bg-[#10243D]/90 backdrop-blur-md p-2.5 rounded border border-white/10">
                  <span className="font-semibold text-[#C7A45B]">Natural Sweeteners Export Desk</span>
                  <div className="text-[11px] text-[#AEB8C4]">
                    Direct cane harvest sourcing, zero sodium hydrosulphite bleaching, FCL ocean shipping.
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Controls Bar: Category Segmented Switch & Search */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 p-3 bg-white rounded-lg border border-[#DCE2E8] shadow-sm">
          
          {/* Variant Filter Buttons */}
          <div className="flex items-center gap-1.5 p-1 bg-[#F1F4F7] rounded-md overflow-x-auto no-scrollbar">
            <button
              type="button"
              onClick={() => setSelectedFilter('all')}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded transition-colors whitespace-nowrap cursor-pointer ${
                selectedFilter === 'all'
                  ? 'bg-[#10243D] text-white shadow-xs'
                  : 'text-[#344256] hover:text-[#10243D]'
              }`}
            >
              All Jaggery ({JAGGERY_PRODUCTS.length})
            </button>
            <button
              type="button"
              onClick={() => setSelectedFilter('powder')}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded transition-colors whitespace-nowrap cursor-pointer ${
                selectedFilter === 'powder'
                  ? 'bg-[#10243D] text-white shadow-xs'
                  : 'text-[#344256] hover:text-[#10243D]'
              }`}
            >
              Organic Powder
            </button>
            <button
              type="button"
              onClick={() => setSelectedFilter('cubes')}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded transition-colors whitespace-nowrap cursor-pointer ${
                selectedFilter === 'cubes'
                  ? 'bg-[#10243D] text-white shadow-xs'
                  : 'text-[#344256] hover:text-[#10243D]'
              }`}
            >
              Cubes (HORECA)
            </button>
            <button
              type="button"
              onClick={() => setSelectedFilter('blocks')}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded transition-colors whitespace-nowrap cursor-pointer ${
                selectedFilter === 'blocks'
                  ? 'bg-[#10243D] text-white shadow-xs'
                  : 'text-[#344256] hover:text-[#10243D]'
              }`}
            >
              Traditional Blocks
            </button>
            <button
              type="button"
              onClick={() => setSelectedFilter('syrup')}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded transition-colors whitespace-nowrap cursor-pointer ${
                selectedFilter === 'syrup'
                  ? 'bg-[#10243D] text-white shadow-xs'
                  : 'text-[#344256] hover:text-[#10243D]'
              }`}
            >
              Liquid Syrup
            </button>
          </div>

          {/* Search Box */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-[#5E6D82] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search jaggery powder, cubes, blocks, syrup, brix..."
              className="w-full pl-9 pr-8 py-2 text-xs border border-[#DCE2E8] rounded-md bg-white focus:outline-none focus:ring-1 focus:ring-[#10243D] text-[#344256]"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#5E6D82] hover:text-[#10243D]"
                aria-label="Clear search query"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Results Metadata */}
        <div className="mt-6 flex items-center justify-between text-xs text-[#5E6D82] px-1">
          <div>
            Showing <span className="font-semibold text-[#10243D] tabular-nums">{filteredProducts.length}</span> export jaggery grades
            {searchQuery && <span> matching "{searchQuery}"</span>}
          </div>
          <div className="text-[11px] font-medium text-[#10243D]">
            HS Code Chapter 17 · Direct Farmgate Sourcing · 20ft / 40ft FCL Dispatch
          </div>
        </div>

        {/* Product Grid */}
        {filteredProducts.length > 0 ? (
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="mt-12 p-12 text-center bg-white rounded-lg border border-[#DCE2E8]">
            <Sparkles className="w-8 h-8 text-[#C7A45B] mx-auto mb-3" />
            <h3 className="text-base font-bold text-[#10243D]">No matching jaggery variants found</h3>
            <p className="mt-1 text-xs text-[#5E6D82]">
              Try searching for "powder", "cubes", "blocks", or "syrup".
            </p>
            <button
              onClick={() => {
                setSelectedFilter('all');
                setSearchQuery('');
              }}
              type="button"
              className="mt-4 px-4 py-2 text-xs font-semibold text-white bg-[#10243D] hover:bg-[#183653] rounded"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Export Specification Matrix Comparison Table */}
        <div className="mt-16 bg-white rounded-lg border border-[#DCE2E8] shadow-sm overflow-hidden">
          <div className="px-6 py-4 bg-[#10243D] text-white flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold font-display">
                NEXARIS Export Jaggery Technical Standards
              </h3>
              <p className="text-xs text-[#AEB8C4] mt-0.5">
                Comparative export specification table under HS Code Chapter 17
              </p>
            </div>
            <span className="hidden sm:inline-block px-2.5 py-1 bg-white/10 text-[#C7A45B] rounded text-xs font-mono font-semibold">
              APEDA / FSSAI Tested
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-[#F1F4F7] text-[#10243D] border-b border-[#DCE2E8] font-bold">
                  <th className="p-3.5">Product Grade</th>
                  <th className="p-3.5">HS Code</th>
                  <th className="p-3.5">Moisture</th>
                  <th className="p-3.5">Sucrose / Brix</th>
                  <th className="p-3.5">Color &amp; Clarity</th>
                  <th className="p-3.5">Export Packaging</th>
                  <th className="p-3.5">Primary Commercial Use</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E2E8F0] text-[#334155]">
                <tr className="hover:bg-slate-50 transition-colors">
                  <td className="p-3.5 font-bold text-[#10243D]">Organic Jaggery Powder</td>
                  <td className="p-3.5 font-mono text-[#C7A45B] font-semibold">17011420</td>
                  <td className="p-3.5 font-semibold text-emerald-700">≤ 2.0% (Export Premium)</td>
                  <td className="p-3.5">Sucrose 80%–90%</td>
                  <td className="p-3.5">Light Golden / Golden Brown (Zero Sulphur)</td>
                  <td className="p-3.5">500g/1kg pouches, 25kg inner-lined PP bags</td>
                  <td className="p-3.5">Industrial Bakery, Healthy Beverages, Retail</td>
                </tr>
                <tr className="hover:bg-slate-50 transition-colors">
                  <td className="p-3.5 font-bold text-[#10243D]">Premium Jaggery Cubes</td>
                  <td className="p-3.5 font-mono text-[#C7A45B] font-semibold">17011410</td>
                  <td className="p-3.5 font-semibold text-emerald-700">≤ 5.0%</td>
                  <td className="p-3.5">Sucrose ≥ 85%</td>
                  <td className="p-3.5">Golden Yellow to Dark Brown (15mm / 20mm)</td>
                  <td className="p-3.5">500g/1kg food jars, 10kg master cartons</td>
                  <td className="p-3.5">HORECA, Table Sweetener, Gourmet Confectionery</td>
                </tr>
                <tr className="hover:bg-slate-50 transition-colors">
                  <td className="p-3.5 font-bold text-[#10243D]">Traditional Jaggery Blocks</td>
                  <td className="p-3.5 font-mono text-[#C7A45B] font-semibold">17011410</td>
                  <td className="p-3.5 font-semibold text-emerald-700">≤ 7.0%</td>
                  <td className="p-3.5">Brix ≥ 85° | Sucrose 80%–90%</td>
                  <td className="p-3.5">Deep Amber Solid Bheli (1kg, 5kg, 10kg)</td>
                  <td className="p-3.5">Individual shrink wrap, 10kg/25kg cartons</td>
                  <td className="p-3.5">Food Processing, Traditional Sweets, Ayurvedic</td>
                </tr>
                <tr className="hover:bg-slate-50 transition-colors">
                  <td className="p-3.5 font-bold text-[#10243D]">Liquid Jaggery (Syrup)</td>
                  <td className="p-3.5 font-mono text-[#C7A45B] font-semibold">17029090</td>
                  <td className="p-3.5 font-semibold text-emerald-700">Ash ≤ 4.0%</td>
                  <td className="p-3.5 font-semibold">Brix 75°–80° | Sugars 60%–65%</td>
                  <td className="p-3.5">Smooth, highly viscous pourable syrup</td>
                  <td className="p-3.5">500g PET squeeze, 20kg pails, 250kg steel drums</td>
                  <td className="p-3.5">Craft Breweries, Distilleries, Glazes, Confectionery</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Division Gallery */}
        <DivisionImageGallery className="mt-16 rounded-lg border border-[#DCE2E8] bg-white" title="Agricultural Commodities Visual Gallery" />

        {/* Certifications & Export Compliance */}
        <CertificationsSection className="mt-16 rounded-lg border border-[#DCE2E8]" />

        {/* Jaggery Procurement & Verified Contact Strip */}
        <div className="mt-16 p-6 sm:p-8 bg-white rounded-lg border border-[#DCE2E8] shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#5E6D82]">
                Direct Natural Sweeteners Trade Desk · Gandhinagar, Gujarat
              </span>
              <h3 className="text-xl font-bold text-[#10243D] font-display">
                Looking to Source Export-Grade Indian Jaggery?
              </h3>
              <p className="text-xs sm:text-sm text-[#344256] leading-relaxed">
                Connect directly with our commodity trade desk for lot availability, moisture certificates, custom private label retail packaging, and FOB Mundra / CIF destination pricing.
              </p>
            </div>

            <div className="lg:col-span-5 flex flex-col sm:flex-row lg:flex-col gap-2.5">
              <a
                href="https://wa.me/918511912115?text=Hello%20NEXARIS%2C%20I%20am%20enquiring%20about%20Natural%20Jaggery%20export%20lots."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-md transition-colors"
              >
                <span>WhatsApp: +91 85119 12115</span>
              </a>
              <div className="flex items-center gap-2">
                <a
                  href="tel:+918511912115"
                  className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-semibold text-[#10243D] bg-[#F1F4F7] hover:bg-[#DCE2E8] rounded border border-[#DCE2E8] transition-colors"
                >
                  <span>Call Desk</span>
                </a>
                <a
                  href="mailto:contact@nexaris.co.in?subject=Jaggery%20Export%20Enquiry"
                  className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-semibold text-[#10243D] bg-[#F1F4F7] hover:bg-[#DCE2E8] rounded border border-[#DCE2E8] transition-colors font-mono"
                >
                  <span>Email Desk</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

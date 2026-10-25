import React, { useState, useMemo } from 'react';
import { Search, ArrowUpRight, Shield, Layers, X, SlidersHorizontal } from 'lucide-react';
import { ALUMINIUM_PRODUCTS } from '../data/products';
import { ProductCard } from '../components/ProductCard';
import { CertificationsSection } from '../components/CertificationsSection';
import { DivisionImageGallery } from '../components/DivisionImageGallery';
import { useEnquiry } from '../context/EnquiryContext';

export function AluminiumScrapPage() {
  const { openEnquiryModal } = useEnquiry();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProducts = useMemo(() => {
    if (!searchQuery.trim()) return ALUMINIUM_PRODUCTS;
    const query = searchQuery.toLowerCase();
    return ALUMINIUM_PRODUCTS.filter((product) => {
      const matchesName = product.name.toLowerCase().includes(query);
      const matchesDesc = product.shortDescription.toLowerCase().includes(query);
      return matchesName || matchesDesc;
    });
  }, [searchQuery]);

  return (
    <div className="pb-24 space-y-12">
      {/* Industrial Hero Section with Photographic Division Banner */}
      <section className="bg-[#10243D] text-white py-12 sm:py-16 border-b border-[#183653] overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            <div className="lg:col-span-7 space-y-4">
              <div className="text-xs font-semibold tracking-wider uppercase text-[#C7A45B] flex items-center gap-2">
                <span>Industrial Non-Ferrous Division</span>
                <span aria-hidden="true" className="text-[#AEB8C4]">·</span>
                <span className="text-[#AEB8C4]">Secondary Smelting Feedstock</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight font-display">
                Aluminium Scrap for Industrial Trade
              </h1>

              <p className="text-base sm:text-lg text-[#AEB8C4] leading-relaxed max-w-2xl">
                Explore aluminium scrap categories for remelting, recycling and industrial material sourcing including Taint Tabor, Wire, 6061 Extrusions, and Rods.
              </p>

              <div className="pt-2 flex flex-wrap gap-4">
                <button
                  type="button"
                  onClick={() => openEnquiryModal(undefined, 'aluminium-scrap')}
                  className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-[#10243D] bg-[#C7A45B] hover:bg-[#B89347] rounded-md transition-colors cursor-pointer"
                >
                  <span>Request Scrap Quotation</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>

              <div className="pt-4 border-t border-white/10 flex flex-wrap gap-4 text-xs text-[#AEB8C4]">
                <span>6 Scrap Grades</span>
                <span aria-hidden="true">·</span>
                <span>Containerized Ocean Freight</span>
                <span aria-hidden="true">·</span>
                <span>Furnace Ready Charging Feedstock</span>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="relative rounded-lg overflow-hidden border border-white/15 shadow-xl bg-slate-900 aspect-16/10">
                <img
                  src="/images/commodities/aluminium_division_banner_1792832351480.jpg"
                  alt="NEXARIS Secondary Aluminium Scrap and Industrial Remelting Division"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#10243D]/80 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-3 left-3 right-3 text-xs text-white bg-[#10243D]/90 backdrop-blur-md p-2.5 rounded border border-white/10">
                  <span className="font-semibold text-[#C7A45B]">Industrial Metals Desk</span>
                  <div className="text-[11px] text-[#AEB8C4]">ISRI specifications, bale inspection, and customs clearance.</div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Search & Overview Strip */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 p-3 bg-white rounded-lg border border-[#DCE2E8] shadow-sm">
          <div className="flex items-center gap-2 px-2 text-xs font-semibold text-[#10243D]">
            <Layers className="w-4 h-4 text-[#183653]" />
            <span>Industrial Scrap Grades (6 Products)</span>
          </div>

          {/* Search box */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-[#5E6D82] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search wire, taint tabor, 6061, 6063, extrusion..."
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
            Showing <span className="font-semibold text-[#10243D] tabular-nums">{filteredProducts.length}</span> industrial scrap categories
            {searchQuery && <span> matching "{searchQuery}"</span>}
          </div>
          <div className="text-[11px]">
            Containerized Lots & Bulk Secondary Feedstock
          </div>
        </div>

        {/* Product Grid */}
        {filteredProducts.length > 0 ? (
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="mt-12 p-12 text-center bg-white rounded-lg border border-[#DCE2E8]">
            <Layers className="w-8 h-8 text-[#5E6D82] mx-auto mb-3" />
            <h3 className="text-base font-bold text-[#10243D]">No matching scrap products</h3>
            <p className="mt-1 text-xs text-[#5E6D82]">
              Try searching for "wire", "extrusion", "6061", or "taint tabor".
            </p>
            <button
              onClick={() => setSearchQuery('')}
              type="button"
              className="mt-4 px-4 py-2 text-xs font-semibold text-white bg-[#10243D] hover:bg-[#183653] rounded"
            >
              Show All Scrap Products
            </button>
          </div>
        )}

        {/* Visual Product & Division Gallery */}
        <DivisionImageGallery className="mt-16 rounded-lg border border-[#DCE2E8] bg-white" title="Aluminium Scrap & Metals Visual Gallery" />

        {/* Certifications & Export Compliance */}
        <CertificationsSection className="mt-16 rounded-lg border border-[#DCE2E8]" />

        {/* Industry Commercial Sourcing Notice */}
        <div className="mt-16 p-6 sm:p-8 bg-white rounded-lg border border-[#DCE2E8] shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#5E6D82]">
                Industrial Metals Procurement Desk · Gandhinagar, Gujarat
              </span>
              <h3 className="text-xl font-bold text-[#10243D] font-display">
                Industrial Scrap Supply & Remelting Feedstock
              </h3>
              <p className="text-xs sm:text-sm text-[#344256] leading-relaxed">
                Aluminium scrap lots are supplied subject to mutual verification of physical form, bale dimensions, container payload constraints, and required customs documentation. Contact our trade team directly for quotes and specifications.
              </p>
            </div>

            <div className="lg:col-span-5 flex flex-col sm:flex-row lg:flex-col gap-2.5">
              <a
                href="https://wa.me/919824618484?text=Hello%20NEXARIS%2C%20I%20am%20enquiring%20about%20Aluminium%20Scrap%20procurement."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-md transition-colors"
              >
                <span>WhatsApp: +91 98246 18484</span>
              </a>
              <div className="flex items-center gap-2">
                <a
                  href="tel:+919824618484"
                  className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-semibold text-[#10243D] bg-[#F1F4F7] hover:bg-[#DCE2E8] rounded border border-[#DCE2E8] transition-colors"
                >
                  <span>Call +91 98246 18484</span>
                </a>
                <a
                  href="mailto:contact@nexaris.co.in?subject=Aluminium%20Scrap%20Procurement%20Enquiry"
                  className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-semibold text-[#10243D] bg-[#F1F4F7] hover:bg-[#DCE2E8] rounded border border-[#DCE2E8] transition-colors font-mono"
                >
                  <span>contact@nexaris.co.in</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

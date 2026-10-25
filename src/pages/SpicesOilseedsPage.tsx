import React, { useState, useMemo } from 'react';
import { Search, Filter, ArrowUpRight, Check, X } from 'lucide-react';
import { SPICES_AND_OILSEEDS_PRODUCTS } from '../data/products';
import { ProductCard } from '../components/ProductCard';
import { CertificationsSection } from '../components/CertificationsSection';
import { DivisionImageGallery } from '../components/DivisionImageGallery';
import { useEnquiry } from '../context/EnquiryContext';

export function SpicesOilseedsPage() {
  const { openEnquiryModal } = useEnquiry();
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'spices' | 'oilseeds'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Read initial filter from URL query if present
  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      const categoryParam = urlParams.get('category');
      if (categoryParam === 'spices' || categoryParam === 'oilseeds') {
        setSelectedFilter(categoryParam);
      }
    }
  }, []);

  const filteredProducts = useMemo(() => {
    return SPICES_AND_OILSEEDS_PRODUCTS.filter((product) => {
      // Category filter
      if (selectedFilter !== 'all' && product.category !== selectedFilter) {
        return false;
      }
      // Search filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = product.name.toLowerCase().includes(query);
        const matchesDesc = product.shortDescription.toLowerCase().includes(query);
        return matchesName || matchesDesc;
      }
      return true;
    });
  }, [selectedFilter, searchQuery]);

  const spicesCount = SPICES_AND_OILSEEDS_PRODUCTS.filter((p) => p.category === 'spices').length;
  const oilseedsCount = SPICES_AND_OILSEEDS_PRODUCTS.filter((p) => p.category === 'oilseeds').length;

  return (
    <div className="pb-24 space-y-12">
      {/* Hero Section with Photographic Division Banner */}
      <section className="bg-[#10243D] text-white py-12 sm:py-16 border-b border-[#183653] overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            <div className="lg:col-span-7 space-y-4">
              <div className="text-xs font-semibold tracking-wider uppercase text-[#C7A45B] flex items-center gap-2">
                <span>Agricultural Trading Division</span>
                <span aria-hidden="true" className="text-[#AEB8C4]">·</span>
                <span className="text-[#AEB8C4]">Bulk Commercial Lots</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight font-display">
                Spices & Oilseeds for B2B Trade
              </h1>

              <p className="text-base sm:text-lg text-[#AEB8C4] leading-relaxed max-w-2xl">
                Wholesale Indian spices including Kashmiri, Guntur S4 &amp; Teja S17 chillies, Lakadong (6-7.5% curcumin) &amp; Salem turmeric, cumin, oregano, black pepper, cloves, star anise, cinnamon &amp; bay leaf. Gujarat-origin groundnuts and graded sesame seeds. Complete custom retail packing &amp; bulk export packaging.
              </p>

              <div className="pt-2 flex flex-wrap gap-4">
                <button
                  type="button"
                  onClick={() => openEnquiryModal(undefined, 'spices-oilseeds')}
                  className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-[#10243D] bg-[#C7A45B] hover:bg-[#B89347] rounded-md transition-colors cursor-pointer"
                >
                  <span>Request Custom Lot Quotation</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>

              <div className="pt-4 border-t border-white/10 flex flex-wrap gap-x-4 gap-y-2 text-xs text-[#AEB8C4]">
                <span>10 Spice Varieties (Kashmiri / Guntur / Lakadong)</span>
                <span aria-hidden="true">·</span>
                <span>Gujarat Origin Groundnut &amp; Sesame 99.95%</span>
                <span aria-hidden="true">·</span>
                <span className="text-[#C7A45B] font-semibold">Custom Packing &amp; Bulk Containers</span>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="relative rounded-lg overflow-hidden border border-white/15 shadow-xl bg-slate-900 aspect-16/10">
                <img
                  src="/images/commodities/spices_division_banner_1792832350716.jpg"
                  alt="NEXARIS Agricultural Commodities and Wholesale Spices Trading"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#10243D]/80 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-3 left-3 right-3 text-xs text-white bg-[#10243D]/90 backdrop-blur-md p-2.5 rounded border border-white/10">
                  <span className="font-semibold text-[#C7A45B]">Agricultural Export Desk</span>
                  <div className="text-[11px] text-[#AEB8C4]">Farmgate sourcing, APEDA & Spices Board registered lots.</div>
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
          
          {/* Category Filter Buttons (Interactive buttons allowed by design constitution) */}
          <div className="flex items-center gap-1.5 p-1 bg-[#F1F4F7] rounded-md overflow-x-auto">
            <button
              type="button"
              onClick={() => setSelectedFilter('all')}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded transition-colors whitespace-nowrap cursor-pointer ${
                selectedFilter === 'all'
                  ? 'bg-[#10243D] text-white shadow-xs'
                  : 'text-[#344256] hover:text-[#10243D]'
              }`}
            >
              All Products ({SPICES_AND_OILSEEDS_PRODUCTS.length})
            </button>
            <button
              type="button"
              onClick={() => setSelectedFilter('spices')}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded transition-colors whitespace-nowrap cursor-pointer ${
                selectedFilter === 'spices'
                  ? 'bg-[#10243D] text-white shadow-xs'
                  : 'text-[#344256] hover:text-[#10243D]'
              }`}
            >
              Spices ({spicesCount})
            </button>
            <button
              type="button"
              onClick={() => setSelectedFilter('oilseeds')}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded transition-colors whitespace-nowrap cursor-pointer ${
                selectedFilter === 'oilseeds'
                  ? 'bg-[#10243D] text-white shadow-xs'
                  : 'text-[#344256] hover:text-[#10243D]'
              }`}
            >
              Oilseeds ({oilseedsCount})
            </button>
          </div>

          {/* Search Box */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-[#5E6D82] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search spices, seeds, chillies, cumin..."
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

        {/* Results Metadata Bar */}
        <div className="mt-6 flex items-center justify-between text-xs text-[#5E6D82] px-1">
          <div>
            Showing <span className="font-semibold text-[#10243D] tabular-nums">{filteredProducts.length}</span> commodities
            {selectedFilter !== 'all' && (
              <span> in <strong className="text-[#10243D] capitalize">{selectedFilter}</strong></span>
            )}
            {searchQuery && <span> matching "{searchQuery}"</span>}
          </div>
          <div className="text-[11px]">
            Wholesale B2B Lots · Bags & Container Loads
          </div>
        </div>

        {/* Product Cards Grid */}
        {filteredProducts.length > 0 ? (
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="mt-12 p-12 text-center bg-white rounded-lg border border-[#DCE2E8]">
            <Filter className="w-8 h-8 text-[#5E6D82] mx-auto mb-3" />
            <h3 className="text-base font-bold text-[#10243D]">No commodities found</h3>
            <p className="mt-1 text-xs text-[#5E6D82]">
              Try adjusting your search query or reset your category filter.
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

        {/* Visual Product & Division Gallery */}
        <DivisionImageGallery className="mt-16 rounded-lg border border-[#DCE2E8] bg-white" title="Spices & Oilseeds Visual Gallery" />

        {/* Certifications & Export Compliance */}
        <CertificationsSection className="mt-16 rounded-lg border border-[#DCE2E8]" />

        {/* Spices & Oilseeds Procurement & Verified Contact Strip */}
        <div className="mt-16 p-6 sm:p-8 bg-white rounded-lg border border-[#DCE2E8] shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#5E6D82]">
                Direct Agricultural Trade Desk
              </span>
              <h3 className="text-xl font-bold text-[#10243D] font-display">
                Need Custom Spices or Oilseeds Quotation?
              </h3>
              <p className="text-xs sm:text-sm text-[#344256] leading-relaxed">
                Connect directly with our agricultural desk in Gandhinagar, Gujarat for container lot availability, ASTA colour grades, purity certifications, and FOB/CIF shipping schedules.
              </p>
            </div>

            <div className="lg:col-span-5 flex flex-col sm:flex-row lg:flex-col gap-2.5">
              <a
                href="https://wa.me/919824618484?text=Hello%20NEXARIS%2C%20I%20am%20enquiring%20about%20Spices%20%26%20Oilseeds%20wholesale%20lots."
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
                  <span>Call Desk</span>
                </a>
                <a
                  href="mailto:contact@nexaris.co.in?subject=Spices%20and%20Oilseeds%20Enquiry"
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

import React, { useState } from 'react';
import { ArrowUpRight, MessageSquare, Leaf, Sparkles, ChevronDown, ChevronUp, FileText, Anchor, ShieldCheck } from 'lucide-react';
import { Product } from '../types';
import { Link } from '../context/RouterContext';
import { useEnquiry } from '../context/EnquiryContext';
import { TdsModal } from './TdsModal';

export interface ProductCardProps {
  product: Product;
  onOpenTds?: (product: Product) => void;
  onQuickQuote?: (product: Product) => void;
}

export function ProductCard({ product, onOpenTds, onQuickQuote }: ProductCardProps) {
  const { openEnquiryModal } = useEnquiry();
  const [imageError, setImageError] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [localTdsOpen, setLocalTdsOpen] = useState(false);

  const detailPath =
    product.category === 'jaggery'
      ? `/jaggery/${product.slug}`
      : `/spices-oilseeds/${product.slug}`;

  // Division clean label
  const categoryLabel =
    product.category === 'spices'
      ? 'Wholesale Spice'
      : product.category === 'oilseeds'
      ? 'Graded Oilseed'
      : 'Natural Sweetener';

  const handleOpenRfq = () => {
    if (onQuickQuote) {
      onQuickQuote(product);
    } else {
      openEnquiryModal(product, product.division, 'buyer');
    }
  };

  const handleOpenTdsModal = () => {
    if (onOpenTds) {
      onOpenTds(product);
    } else {
      setLocalTdsOpen(true);
    }
  };

  // Determine drawer fields from product data
  const moistureValue = product.technicalDrawer?.moisture || product.specifications?.find(s => s.label.toLowerCase().includes('moisture'))?.value || '≤ 10.0% max';
  const purityValue = product.technicalDrawer?.purity || product.specifications?.find(s => s.label.toLowerCase().includes('purity') || s.label.toLowerCase().includes('bleaching'))?.value || 'Export Grade Certified';
  const activeContentValue = product.technicalDrawer?.activeContent || product.specifications?.find(s => s.label.toLowerCase().includes('curcumin') || s.label.toLowerCase().includes('sucrose') || s.label.toLowerCase().includes('oil') || s.label.toLowerCase().includes('piperine'))?.value || 'Standard Active Assay';
  const packagingValue = product.technicalDrawer?.packaging || product.standardPackaging?.slice(0, 2).join(' · ') || '25kg Kraft / PP Bags & 1 MT FIBC';
  const loadingPortValue = product.technicalDrawer?.loadingPort || 'Mundra Port (INMUN) & Kandla Port (IXY), Gujarat';

  return (
    <>
      <article className="group bg-white rounded-xl border border-stone-200/90 hover:border-[#C5A059] transition-all duration-200 overflow-hidden flex flex-col justify-between shadow-xs hover:shadow-md">
        <div>
          {/* Product Image Slot with zero-broken-image fallback */}
          <Link href={detailPath} className="block relative aspect-4/3 overflow-hidden bg-stone-100">
            {!imageError ? (
              <img
                src={product.image}
                alt={product.name}
                referrerPolicy="no-referrer"
                onError={() => setImageError(true)}
                className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300 ease-out"
                loading="lazy"
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-[#0A192F]/5 to-[#C5A059]/15 p-6 text-center">
                {product.category === 'jaggery' ? (
                  <Sparkles className="w-10 h-10 text-[#C5A059] mb-2" />
                ) : (
                  <Leaf className="w-10 h-10 text-[#0A192F]/40 mb-2" />
                )}
                <span className="text-xs font-semibold text-[#0A192F]">{product.name}</span>
                <span className="text-[11px] text-stone-500 mt-0.5">{categoryLabel}</span>
              </div>
            )}

            {/* Prominent HS Code Badge */}
            {product.hsCode && (
              <div className="absolute top-3 left-3 bg-[#0A192F]/90 backdrop-blur-md px-2.5 py-1 rounded text-[11px] font-mono font-bold text-[#D4AF37] border border-[#D4AF37]/30 shadow-xs">
                HS: {product.hsCode}
              </div>
            )}

            {/* Origin indicator overlay */}
            <div className="absolute bottom-2.5 right-3 text-[10px] font-semibold text-white/90 bg-black/60 px-2 py-0.5 rounded backdrop-blur-xs">
              Gujarat / India Origin
            </div>
          </Link>

          {/* Card Body */}
          <div className="p-5">
            {/* Unboxed metadata with typographic dot separator (Strict Zero-Pill Rule) */}
            <div className="flex items-center gap-1.5 text-xs text-stone-500 mb-1.5 font-medium">
              <span className="text-[#0A192F] font-semibold">{categoryLabel}</span>
              <span aria-hidden="true">·</span>
              <span>Direct Origin</span>
              {product.hsCode && (
                <>
                  <span aria-hidden="true">·</span>
                  <span className="font-mono text-stone-600">
                    {product.category === 'jaggery' ? 'Ch. 17' : product.category === 'spices' ? 'Ch. 09' : 'Ch. 12'}
                  </span>
                </>
              )}
            </div>

            <h3 className="text-base sm:text-lg font-bold text-[#0A192F] font-serif group-hover:text-[#10243D] transition-colors leading-snug">
              <Link href={detailPath}>{product.name}</Link>
            </h3>

            {/* Tagline / Subtitle */}
            {product.tagline && (
              <p className="text-xs font-medium text-[#C5A059] mt-0.5 leading-snug italic">
                "{product.tagline}"
              </p>
            )}

            <p className="mt-2 text-xs sm:text-sm text-stone-600 leading-relaxed line-clamp-2">
              {product.shortDescription}
            </p>

            {/* Compact Key Spec Strip */}
            <div className="mt-3 py-1.5 px-3 bg-[#FAF8F5] border border-stone-200/80 rounded-md text-[11px] flex items-center justify-between">
              <span className="text-stone-500 font-medium">Active Assay:</span>
              <span className="font-semibold text-[#0A192F] truncate max-w-[170px]" title={activeContentValue}>
                {activeContentValue}
              </span>
            </div>

            {/* Expandable Technical Specifications Drawer Toggle */}
            <div className="mt-3.5 pt-3 border-t border-stone-100">
              <button
                type="button"
                onClick={() => setIsDrawerOpen(!isDrawerOpen)}
                className="w-full flex items-center justify-between text-xs font-semibold text-[#0A192F] hover:text-[#C5A059] py-1 cursor-pointer transition-colors"
                aria-expanded={isDrawerOpen}
              >
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#C5A059]" />
                  <span>Technical Specifications</span>
                </span>
                {isDrawerOpen ? (
                  <ChevronUp className="w-3.5 h-3.5 text-stone-400" />
                ) : (
                  <ChevronDown className="w-3.5 h-3.5 text-stone-400" />
                )}
              </button>

              {/* Collapsible Drawer Content */}
              {isDrawerOpen && (
                <div className="mt-2.5 p-3 bg-stone-50 rounded-lg border border-stone-200 text-xs space-y-2 animate-in fade-in duration-150">
                  <div className="grid grid-cols-2 gap-2 pb-2 border-b border-stone-200">
                    <div>
                      <span className="text-stone-400 text-[10px] uppercase font-bold block">Moisture %</span>
                      <span className="font-mono text-stone-900 font-semibold text-[11px]">{moistureValue}</span>
                    </div>
                    <div>
                      <span className="text-stone-400 text-[10px] uppercase font-bold block">Purity / Grade</span>
                      <span className="font-medium text-stone-900 text-[11px]">{purityValue}</span>
                    </div>
                  </div>

                  <div className="pb-2 border-b border-stone-200">
                    <span className="text-stone-400 text-[10px] uppercase font-bold block">Active Content</span>
                    <span className="font-mono text-stone-900 font-semibold text-[11px]">{activeContentValue}</span>
                  </div>

                  <div className="pb-2 border-b border-stone-200">
                    <span className="text-stone-400 text-[10px] uppercase font-bold block">Export Packaging</span>
                    <span className="text-stone-800 text-[11px] leading-tight block">{packagingValue}</span>
                  </div>

                  <div>
                    <span className="text-stone-400 text-[10px] uppercase font-bold flex items-center gap-1">
                      <Anchor className="w-3 h-3 text-[#0A192F]" />
                      Loading Port
                    </span>
                    <span className="text-[#0A192F] font-semibold text-[11px] block mt-0.5">
                      {loadingPortValue}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Card Action Footer with Two Primary Actions */}
        <div className="px-5 pb-5 pt-3 border-t border-stone-100 flex items-center justify-between gap-2">
          {/* Action 2: Request Spec Sheet (TDS) */}
          <button
            onClick={handleOpenTdsModal}
            type="button"
            className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-semibold text-stone-700 bg-stone-100 hover:bg-stone-200 rounded-lg transition-colors cursor-pointer"
            title="Download or Preview Technical Data Sheet"
          >
            <FileText className="w-3.5 h-3.5 text-[#C5A059]" />
            <span className="truncate">Request TDS</span>
          </button>

          {/* Action 1: Request Quote (RFQ) */}
          <button
            onClick={handleOpenRfq}
            type="button"
            className="flex-1 inline-flex items-center justify-center gap-1.5 px-3.5 py-2 text-xs font-bold text-white bg-[#0A192F] hover:bg-[#10243D] rounded-lg transition-all shadow-xs hover:shadow cursor-pointer"
            title="Open Buyer Quotation Request"
          >
            <MessageSquare className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span className="truncate">Request RFQ</span>
          </button>
        </div>
      </article>

      {/* Embedded TDS Modal instance if managed locally */}
      {localTdsOpen && (
        <TdsModal
          product={product}
          isOpen={localTdsOpen}
          onClose={() => setLocalTdsOpen(false)}
          onRequestRfq={handleOpenRfq}
        />
      )}
    </>
  );
}

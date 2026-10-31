import React from 'react';
import { ArrowRight, ZoomIn } from 'lucide-react';
import { ArikaProduct, MASTER_SHELF_IMAGE } from '../data/arikaProducts';
import { useEnquiry } from '../context/EnquiryContext';

interface ArikaPouchCardProps {
  product: ArikaProduct;
  onOpenZoom?: (product: ArikaProduct) => void;
}

export function ArikaPouchCard({ product, onOpenZoom }: ArikaPouchCardProps) {
  const { openEnquiryModal } = useEnquiry();

  return (
    <div className="group flex flex-col bg-white rounded-lg border border-slate-200 shadow-xs hover:shadow-lg transition-all duration-300 overflow-hidden">
      {/* Top Card Badge Bar */}
      <div className="px-3.5 py-2 bg-[#FAF8F5] border-b border-slate-100 flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          {/* FSSAI Green Vegetarian Mark */}
          <div
            className="w-3.5 h-3.5 border border-emerald-600 p-[2px] flex items-center justify-center rounded-xs bg-white"
            title="100% Vegetarian (FSSAI Compliant)"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
          </div>
          <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 font-semibold">
            {product.categoryLabel}
          </span>
        </div>

        <span className="font-mono text-xs font-bold text-[#0A192F] bg-white px-2 py-0.5 rounded border border-slate-200 shadow-2xs">
          {product.netWeight}
        </span>
      </div>

      {/* Pouch Image Container using CSS Sprite from Master Collection */}
      <div
        className="relative w-full aspect-[3/4] bg-neutral-100 overflow-hidden cursor-pointer"
        onClick={() => onOpenZoom?.(product)}
      >
        <div
          className="w-full h-full transition-transform duration-500 group-hover:scale-105"
          style={{
            backgroundImage: `url(${MASTER_SHELF_IMAGE})`,
            backgroundSize: product.spriteStyle.backgroundSize,
            backgroundPosition: product.spriteStyle.backgroundPosition,
            backgroundRepeat: 'no-repeat',
          }}
          role="img"
          aria-label={`${product.name} ARIKA by NEXARIS Pack`}
        />

        {/* Hover Zoom Hint */}
        <div className="absolute inset-0 bg-[#0A192F]/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
          <span className="px-3 py-1 bg-[#0A192F]/90 text-white text-xs font-semibold rounded-full flex items-center gap-1.5 shadow-md">
            <ZoomIn className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>View Pack</span>
          </span>
        </div>
      </div>

      {/* Card Content (Clean, No Clutter) */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
        <div>
          <h3 className="font-serif font-bold text-base text-[#0A192F] group-hover:text-[#D4AF37] transition-colors leading-snug">
            {product.name}
          </h3>
          <p className="text-xs text-slate-600 line-clamp-2 mt-1 leading-relaxed">
            {product.tagline}
          </p>
        </div>

        {/* Action Button */}
        <div className="pt-2 border-t border-slate-100">
          <button
            type="button"
            onClick={() =>
              openEnquiryModal(
                undefined,
                product.category,
                'buyer',
                `ARIKA by NEXARIS — ${product.name} (${product.netWeight})`
              )
            }
            className="w-full py-2 px-3 bg-[#0A192F] hover:bg-[#1E293B] text-white text-xs font-bold uppercase tracking-wider rounded transition-colors flex items-center justify-center gap-1.5 shadow-xs"
          >
            <span>Enquire / Sample</span>
            <ArrowRight className="w-3 h-3 text-[#D4AF37]" />
          </button>
        </div>
      </div>
    </div>
  );
}

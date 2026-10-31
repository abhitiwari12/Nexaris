import React, { useEffect } from 'react';
import { X, ZoomIn, ExternalLink, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { MASTER_SHELF_IMAGE, ArikaProduct } from '../data/arikaProducts';
import { useEnquiry } from '../context/EnquiryContext';

interface ArikaLightboxModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedProduct?: ArikaProduct;
}

export function ArikaLightboxModal({ isOpen, onClose, selectedProduct }: ArikaLightboxModalProps) {
  const { openEnquiryModal } = useEnquiry();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-[#0A192F]/90 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-6xl max-h-[92vh] bg-white rounded-lg shadow-2xl overflow-hidden flex flex-col border border-slate-700">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#0A192F] text-white border-b border-[#1E293B]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-[#D4AF37]/20 border border-[#D4AF37] flex items-center justify-center text-[#D4AF37] font-serif font-black text-sm">
              A
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-serif font-bold text-base text-white tracking-wide">
                  ARIKA by NEXARIS — Full Pantry & Spice Collection
                </h3>
                <span className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-mono font-semibold uppercase bg-[#D4AF37] text-[#0A192F] rounded">
                  23 Shelf-Ready Consumer Products
                </span>
              </div>
              <p className="text-xs text-slate-300">
                Ground Spices (200g) · Whole Pulses (1kg Window Pouches) · Dry Fruits & Aromatics
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                onClose();
                openEnquiryModal(
                  undefined,
                  'spices',
                  'buyer',
                  selectedProduct ? `ARIKA Sample — ${selectedProduct.name}` : 'ARIKA Full Retail Kit'
                );
              }}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#D4AF37] hover:bg-[#C5A059] text-[#0A192F] text-xs font-bold uppercase tracking-wider rounded transition-colors"
            >
              <span>Request Sample Kit</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={onClose}
              className="p-2 text-slate-300 hover:text-white rounded hover:bg-slate-800 transition-colors"
              aria-label="Close modal"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Modal Image Viewer with scroll & zoom */}
        <div className="flex-1 overflow-auto bg-neutral-900 p-4 sm:p-6 flex items-center justify-center">
          <div className="relative max-w-full">
            <img
              src={MASTER_SHELF_IMAGE}
              alt="ARIKA by NEXARIS Complete 23 Product Collection"
              className="w-full h-auto max-h-[70vh] object-contain rounded shadow-lg border border-slate-700"
            />
          </div>
        </div>

        {/* Modal Footer Strip */}
        <div className="px-6 py-3 bg-[#FAF8F5] border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-600">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-1.5 text-emerald-800 font-semibold">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Multi-Layer Aroma Barrier Stand-Up Pouches</span>
            </div>
            <div className="flex items-center gap-1.5 text-slate-700">
              <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
              <span>100% Pure & Sortex Cleaned</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <a
              href={MASTER_SHELF_IMAGE}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-[#0A192F] hover:text-[#D4AF37] font-semibold"
            >
              <ZoomIn className="w-3.5 h-3.5" />
              <span>Open Full High-Res</span>
            </a>
            <button
              type="button"
              onClick={() => {
                onClose();
                openEnquiryModal(undefined, 'spices');
              }}
              className="px-4 py-2 bg-[#0A192F] hover:bg-[#1E293B] text-white text-xs font-bold uppercase tracking-wider rounded transition-colors"
            >
              Retail Distribution Enquiry
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

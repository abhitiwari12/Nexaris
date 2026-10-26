import React from 'react';
import { Product } from '../types';
import { X, Printer, Download, MessageSquare, ShieldCheck, CheckCircle2, FileText, Anchor } from 'lucide-react';
import { SITE_CONFIG, getTdsWhatsAppUrl } from '../config/site';

interface TdsModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onRequestRfq?: (product: Product) => void;
}

export const TdsModal: React.FC<TdsModalProps> = ({
  product,
  isOpen,
  onClose,
  onRequestRfq,
}) => {
  if (!isOpen || !product) return null;

  const handlePrint = () => {
    window.print();
  };

  const whatsappTdsUrl = getTdsWhatsAppUrl(product.name, product.hsCode);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="tds-modal-title"
      className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 print:p-0 print:bg-white print:static"
    >
      <div className="relative bg-white rounded-xl max-w-3xl w-full shadow-2xl border border-stone-200 overflow-hidden my-6 print:shadow-none print:border-none print:max-w-none print:m-0">
        
        {/* Top Action Bar (Hidden during print) */}
        <div className="bg-[#0A192F] text-white px-6 py-4 flex items-center justify-between border-b border-white/10 print:hidden">
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-[#C5A059]" />
            <span className="text-xs font-bold uppercase tracking-wider text-[#C5A059]">
              Technical Data Sheet (TDS)
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white rounded text-xs font-semibold transition-all cursor-pointer"
              title="Print or Save as PDF"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save PDF</span>
            </button>
            <button
              onClick={onClose}
              className="text-stone-400 hover:text-white p-1.5 rounded-lg transition-colors cursor-pointer"
              aria-label="Close TDS Modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Specification Certificate Content */}
        <div className="p-6 sm:p-8 space-y-6 text-stone-900 bg-white" id="printable-tds">
          
          {/* Header Block with Institutional Branding */}
          <div className="border-b border-stone-200 pb-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <div className="text-2xl font-serif font-black tracking-tight text-[#0A192F]">
                NEXARIS
              </div>
              <p className="text-xs text-stone-500 font-medium">
                B2B Agricultural Commodity Sourcing & Export Coordination
              </p>
              <p className="text-[11px] text-stone-400 mt-0.5">
                {SITE_CONFIG.contact.registeredOffice}
              </p>
            </div>
            <div className="text-left sm:text-right text-xs">
              <span className="inline-block bg-[#0A192F] text-[#D4AF37] text-[11px] font-mono font-bold px-2.5 py-1 rounded">
                HS CODE: {product.hsCode || 'Chapter 09/12/17'}
              </span>
              <p className="text-stone-500 text-[11px] mt-1 font-mono">
                REF: TDS-{product.id.toUpperCase()}-2026
              </p>
              <p className="text-stone-400 text-[10px]">
                Standards: APEDA · Spices Board · FSSAI
              </p>
            </div>
          </div>

          {/* Product Headline & Category */}
          <div className="space-y-1">
            <div className="text-xs font-bold uppercase tracking-wider text-[#C5A059]">
              {product.category === 'jaggery'
                ? 'Natural Sugarcane Sweetener (HS Chapter 17)'
                : product.category === 'spices'
                ? 'Wholesale Indian Spices (HS Chapter 09)'
                : 'Graded Oilseeds & Grains (HS Chapter 12)'}
            </div>
            <h1 id="tds-modal-title" className="text-2xl sm:text-3xl font-serif font-bold text-[#0A192F]">
              {product.name}
            </h1>
            {product.tagline && (
              <p className="text-sm text-stone-600 italic">
                "{product.tagline}"
              </p>
            )}
          </div>

          {/* Overview Prose */}
          <div className="text-xs text-stone-600 leading-relaxed bg-[#FAF8F5] p-4 rounded-lg border border-stone-200/80">
            {product.overview || product.shortDescription}
          </div>

          {/* Core Technical Specifications Table */}
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-[#0A192F] mb-3 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#C5A059]" />
              Export Grade Technical Parameters
            </h2>
            <div className="border border-stone-200 rounded-lg overflow-hidden">
              <table className="w-full text-left text-xs border-collapse">
                <tbody>
                  {product.technicalDrawer && (
                    <>
                      <tr className="border-b border-stone-100 bg-stone-50/70">
                        <td className="py-2.5 px-4 font-semibold text-stone-700 w-1/3">Moisture Threshold</td>
                        <td className="py-2.5 px-4 font-mono font-medium text-stone-900">{product.technicalDrawer.moisture}</td>
                      </tr>
                      <tr className="border-b border-stone-100">
                        <td className="py-2.5 px-4 font-semibold text-stone-700">Purity / Sortex Rating</td>
                        <td className="py-2.5 px-4 font-medium text-stone-900">{product.technicalDrawer.purity}</td>
                      </tr>
                      <tr className="border-b border-stone-100 bg-stone-50/70">
                        <td className="py-2.5 px-4 font-semibold text-stone-700">Active Compound / Content</td>
                        <td className="py-2.5 px-4 font-mono font-medium text-stone-900">{product.technicalDrawer.activeContent}</td>
                      </tr>
                    </>
                  )}
                  {product.specifications?.map((spec, i) => (
                    <tr key={i} className={`border-b border-stone-100 ${i % 2 === 1 ? 'bg-stone-50/70' : ''}`}>
                      <td className="py-2.5 px-4 font-semibold text-stone-700">{spec.label}</td>
                      <td className="py-2.5 px-4 text-stone-900 font-mono text-[11px]">{spec.value}</td>
                    </tr>
                  ))}
                  <tr className="border-b border-stone-100 bg-stone-50/70">
                    <td className="py-2.5 px-4 font-semibold text-stone-700">Port of Loading</td>
                    <td className="py-2.5 px-4 font-medium text-stone-900 flex items-center gap-1.5">
                      <Anchor className="w-3.5 h-3.5 text-[#0A192F]" />
                      Mundra Port (INMUN) & Kandla Port (IXY), Gujarat, India
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-4 font-semibold text-stone-700">Standard Packaging</td>
                    <td className="py-2.5 px-4 text-stone-800">
                      {product.technicalDrawer?.packaging || product.standardPackaging?.join(' · ')}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Commercial Applications & Packing Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            {product.commercialApplications && (
              <div className="p-3.5 rounded-lg border border-stone-200">
                <h3 className="font-bold text-[#0A192F] uppercase text-[11px] mb-2 tracking-wide">
                  Approved Industrial Applications
                </h3>
                <ul className="space-y-1 text-stone-600">
                  {product.commercialApplications.map((app, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{app}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="p-3.5 rounded-lg border border-stone-200 bg-[#FAF8F5]">
              <h3 className="font-bold text-[#0A192F] uppercase text-[11px] mb-2 tracking-wide">
                Quality & Inspection Protocol
              </h3>
              <p className="text-stone-600 leading-relaxed text-[11px]">
                Each container lot is sampled prior to stuffing. Independent pre-shipment inspection certificates from SGS, Geo-Chem, or Intertek for pesticide residues, aflatoxins, and microbial limits are furnished on buyer request.
              </p>
              <div className="mt-3 pt-2 border-t border-stone-200 flex flex-wrap gap-2 text-[10px] font-semibold text-stone-700">
                <span>✓ Non-GMO</span>
                <span>✓ Phytosanitary Certificate</span>
                <span>✓ Certificate of Origin</span>
              </div>
            </div>
          </div>

          {/* Footer Note */}
          <div className="pt-4 border-t border-stone-200 text-stone-400 text-[10px] flex flex-col sm:flex-row justify-between gap-2">
            <div>
              Commercial Desk: contact@nexaris.co.in | +91 98246 18484 / +91 85119 12115
            </div>
            <div>
              Official export document valid for container quotation purposes.
            </div>
          </div>
        </div>

        {/* Modal Actions Footer (Hidden during print) */}
        <div className="bg-stone-50 px-6 py-4 border-t border-stone-200 flex flex-wrap items-center justify-between gap-3 print:hidden">
          <a
            href={whatsappTdsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 hover:text-emerald-800 bg-emerald-50 hover:bg-emerald-100 px-3.5 py-2 rounded-lg border border-emerald-200 transition-colors"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Request Certified Lab COA (WhatsApp)</span>
          </a>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-4 py-2 border border-stone-300 text-stone-700 hover:bg-stone-100 rounded-lg text-xs font-semibold transition-all cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download PDF TDS</span>
            </button>

            {onRequestRfq && (
              <button
                onClick={() => {
                  onClose();
                  onRequestRfq(product);
                }}
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#0A192F] hover:bg-[#10243D] text-[#D4AF37] rounded-lg text-xs font-bold transition-all shadow-sm cursor-pointer"
              >
                <span>Request Container Quote (RFQ)</span>
              </button>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

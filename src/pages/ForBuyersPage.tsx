import React, { useState } from 'react';
import { ArrowRight, ShieldCheck, Ship, CheckCircle2, FileText, ChevronDown, ChevronUp, Package, HelpCircle } from 'lucide-react';
import { useEnquiry } from '../context/EnquiryContext';
import { ALL_PRODUCTS } from '../data/products';
import { Link } from '../context/RouterContext';
import { TdsModal } from '../components/TdsModal';
import { Product } from '../types';

export function ForBuyersPage() {
  const { openEnquiryModal, addToBasket } = useEnquiry();
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [tdsModalProduct, setTdsModalProduct] = useState<Product | null>(null);

  const buyerFaqs = [
    {
      q: 'How does NEXARIS guarantee chemical-free, 100% sulphur-free jaggery?',
      a: 'All our jaggery variants are processed without synthetic bleaching agents or Sodium Hydrosulphite (Hydrose). We use natural organic clarifying agents (such as herbal extracts of deola or bhendi) during cane juice clarification. Every export consignment is certified with a 100% Sulphur-Free Certificate and full laboratory Certificate of Analysis (COA).',
    },
    {
      q: 'What are the moisture specifications for ocean container export?',
      a: 'Moisture control is paramount for international shipping. Our Organic Jaggery Powder is dried to an export-grade moisture level of ≤ 2.0% to prevent caking and ensure long shelf life in humid container transits. Premium Cubes maintain moisture ≤ 5.0%, and Traditional Blocks ≤ 7.0%. All containers are packed with food-grade inner moisture barriers.',
    },
    {
      q: 'What shipping terms and ocean gateways do you support?',
      a: 'We routinely export out of Mundra Port and Kandla Port in Gujarat, India. We execute contracts under FOB Mundra/Kandla, CIF (Cost, Insurance, Freight) to destination discharge ports worldwide, or CFR terms.',
    },
    {
      q: 'Can I request custom retail packaging or private labeling (OEM)?',
      a: 'Yes. We support custom private label packaging for international supermarket chains, health brands, and distributors. Available options include 500g and 1kg stand-up zipper pouches with custom branding, nutritional facts, and barcodes, as well as 500g/1kg food-grade jars for jaggery cubes.',
    },
    {
      q: 'What export documentation and lab certifications are provided?',
      a: 'Every export consignment is accompanied by APEDA export documentation, FSSAI compliance certification, Phytosanitary Quarantine Certificate, Certificate of Origin (Chamber of Commerce), Bill of Lading, and third-party laboratory inspection reports (SGS / Geo-Chem upon request).',
    },
  ];

  return (
    <div className="bg-[#FAF8F5] text-stone-900">
      {/* Hero Banner */}
      <section className="bg-[#0A192F] text-white py-16 lg:py-20 border-b border-white/10 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl space-y-4">
            <div className="text-xs font-bold uppercase tracking-widest text-[#D4AF37]">
              FOR INTERNATIONAL COMMODITY BUYERS · NATURAL CANE SWEETENERS
            </div>
            <h1 className="text-3xl sm:text-5xl font-serif font-black tracking-tight leading-tight text-white">
              Direct Sourcing from Western Indian Sugarcane Belts &amp; Jaggery Processors.
            </h1>
            <p className="text-sm sm:text-base text-stone-300 leading-relaxed">
              NEXARIS acts as your dedicated B2B procurement partner for export-grade organic jaggery powder, portioned sweetener cubes, solid traditional blocks, and pure cane syrup. Dispatched directly through Mundra Port &amp; Kandla Port with complete quality assurance.
            </p>

            <div className="pt-4 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => openEnquiryModal(undefined, 'jaggery', 'buyer')}
                className="inline-flex items-center gap-2 px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-[#0A192F] bg-[#D4AF37] hover:bg-[#C5A059] rounded-lg transition-colors shadow-md min-h-[44px] cursor-pointer"
              >
                <span>Submit Buyer RFQ</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <Link
                href="/jaggery"
                className="inline-flex items-center gap-2 px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-white border border-white/20 hover:bg-white/10 rounded-lg transition-colors min-h-[44px]"
              >
                <span>Explore Jaggery Catalogue</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Sourcing & Procurement Workflow */}
      <section className="py-16 lg:py-20 bg-white border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
            <div className="text-xs font-bold uppercase tracking-widest text-[#C5A059]">
              TRANSPARENT SOURCING PIPELINE
            </div>
            <h2 className="text-2xl sm:text-4xl font-serif font-bold text-[#0A192F]">
              How the NEXARIS Jaggery Export Process Works
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="p-6 rounded-xl bg-[#FAF8F5] border border-stone-200 space-y-3">
              <div className="w-8 h-8 rounded-full bg-[#0A192F] text-[#D4AF37] font-bold flex items-center justify-center text-sm font-mono">
                01
              </div>
              <h3 className="text-base font-serif font-bold text-[#0A192F]">Submit Sweetener RFQ</h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                Specify your desired variant (Powder, Cubes, Blocks, Syrup), volume in MT or FCL, packaging format, and discharge port.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-[#FAF8F5] border border-stone-200 space-y-3">
              <div className="w-8 h-8 rounded-full bg-[#0A192F] text-[#D4AF37] font-bold flex items-center justify-center text-sm font-mono">
                02
              </div>
              <h3 className="text-base font-serif font-bold text-[#0A192F]">Commercial Quotation</h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                Our trade desk evaluates processing cluster lot availability and provides a competitive FOB Mundra or CIF commercial proforma within 24 hours.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-[#FAF8F5] border border-stone-200 space-y-3">
              <div className="w-8 h-8 rounded-full bg-[#0A192F] text-[#D4AF37] font-bold flex items-center justify-center text-sm font-mono">
                03
              </div>
              <h3 className="text-base font-serif font-bold text-[#0A192F]">100% Pre-Shipment Inspection</h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                Consignments undergo moisture testing, sucrose assay, zero-chemical verification, and third-party inspection (SGS / Geo-Chem).
              </p>
            </div>

            <div className="p-6 rounded-xl bg-[#FAF8F5] border border-stone-200 space-y-3">
              <div className="w-8 h-8 rounded-full bg-[#0A192F] text-[#D4AF37] font-bold flex items-center justify-center text-sm font-mono">
                04
              </div>
              <h3 className="text-base font-serif font-bold text-[#0A192F]">Container Dispatch &amp; Docs</h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                Container stuffing at Mundra Port with full phytosanitary quarantine, certificate of origin, and international Bill of Lading.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Available Jaggery Variants Grid */}
      <section className="py-16 lg:py-20 bg-[#FAF8F5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <div className="text-xs font-bold uppercase tracking-widest text-[#C5A059]">
                EXPORT GRADE SWEETENERS
              </div>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#0A192F] mt-1">
                4 Jaggery Export Products (HS Code Ch. 17)
              </h2>
            </div>
            <Link
              href="/jaggery"
              className="text-xs font-bold text-[#0A192F] hover:text-[#C5A059] flex items-center gap-1"
            >
              <span>View Full Specifications</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {ALL_PRODUCTS.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-xl border border-stone-200 overflow-hidden hover:border-[#C5A059] transition-all duration-200 flex flex-col justify-between p-5 space-y-4 shadow-xs"
              >
                <div className="space-y-3">
                  <div className="h-44 rounded-lg overflow-hidden bg-stone-100 relative">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2.5 left-2.5 bg-[#0A192F]/90 backdrop-blur-md px-2.5 py-1 text-[#D4AF37] text-xs font-mono font-bold rounded">
                      HS: {product.hsCode}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-base font-serif font-bold text-[#0A192F]">
                      {product.name}
                    </h3>
                    <p className="text-xs text-stone-500 line-clamp-2 mt-1">
                      {product.shortDescription}
                    </p>
                  </div>
                </div>

                <div className="pt-3 border-t border-stone-100 flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setTdsModalProduct(product)}
                    className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-semibold text-stone-700 bg-stone-100 hover:bg-stone-200 rounded-lg transition-colors cursor-pointer"
                  >
                    <FileText className="w-3.5 h-3.5 text-[#C5A059]" />
                    <span>Spec Sheet</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => openEnquiryModal(product, 'jaggery', 'buyer')}
                    className="px-3 py-2 text-xs font-bold uppercase text-[#0A192F] bg-[#D4AF37] hover:bg-[#C5A059] rounded-lg transition-colors cursor-pointer shadow-xs"
                  >
                    RFQ
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Buyer FAQs Accordion */}
      <section className="py-16 lg:py-20 bg-white border-t border-stone-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center space-y-2">
            <div className="text-xs font-bold uppercase tracking-widest text-[#C5A059]">
              FREQUENTLY ASKED QUESTIONS
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#0A192F]">
              Information for International Food Sweetener Importers
            </h2>
          </div>

          <div className="space-y-4">
            {buyerFaqs.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={faq.q}
                  className="rounded-xl border border-stone-200 overflow-hidden transition-colors bg-[#FAF8F5]"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    className="w-full text-left p-4 sm:p-5 font-bold text-sm text-[#0A192F] font-serif flex items-center justify-between gap-4 cursor-pointer"
                  >
                    <span>{faq.q}</span>
                    {isOpen ? (
                      <ChevronUp className="w-5 h-5 text-[#C5A059] shrink-0" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-stone-500 shrink-0" />
                    )}
                  </button>
                  {isOpen && (
                    <div className="px-4 sm:px-5 pb-5 text-xs text-stone-600 leading-relaxed border-t border-stone-200 pt-3 bg-white">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* TDS Modal */}
      {tdsModalProduct && (
        <TdsModal
          product={tdsModalProduct}
          isOpen={!!tdsModalProduct}
          onClose={() => setTdsModalProduct(null)}
        />
      )}
    </div>
  );
}

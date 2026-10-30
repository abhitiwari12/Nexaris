import React from 'react';
import { Ship, Anchor, Globe2, ShieldCheck, FileCheck, Package, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useEnquiry } from '../context/EnquiryContext';
import { SITE_CONFIG } from '../config/site';
import { CertificateGridSection } from '../components/CertificateGridSection';
import { ConnectedSection } from '../components/ConnectedSection';

export function ExportPage() {
  const { openEnquiryModal } = useEnquiry();

  const exportSpecs = [
    {
      title: 'Ocean Ports & Gateways',
      value: 'FOB Mundra Port (INMUN) & Kandla Port (IXY), Gujarat',
      description: 'Direct maritime access with minimal transit time to Middle East, Africa, Europe, and Asia.',
    },
    {
      title: 'Container Formats',
      value: '20ft FCL (18–24 MT) & 40ft High Cube FCL (26–28 MT)',
      description: 'Heavy payload container stuffing with kraft paper lining, moisture traps, and container seals.',
    },
    {
      title: 'Incoterms Supported',
      value: 'FOB, CIF, CFR, EXW (Gujarat Plant)',
      description: 'Flexible international commercial terms tailored to importer customs and vessel scheduling.',
    },
    {
      title: 'Quality & Phytosanitary Inspection',
      value: 'SGS, Geo-Chem, APEDA & Spices Board Inspection',
      description: 'Pre-shipment batch testing, fumigation certificates, certificate of origin, and bill of lading issuance.',
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-[#FAF8F5]">
      {/* 1. Header Banner */}
      <section className="relative py-24 bg-[#0A192F] text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="/images/brand/logistics_handshake.jpg"
            alt="International Ocean Freight Logistics"
            className="w-full h-full object-cover opacity-25 filter contrast-125"
          />
          <div className="absolute inset-0 bg-[#0A192F]/85" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="text-xs font-mono uppercase tracking-widest text-[#D4AF37] font-bold block mb-3">
              GLOBAL MARITIME DISPATCH
            </span>
            <h1 className="text-3xl sm:text-5xl font-serif font-bold text-white tracking-tight uppercase mb-4">
              EXPORT & LOGISTICS DESK
            </h1>
            <p className="text-base text-slate-300 font-sans leading-relaxed">
              While NEXARIS is a household consumer brand across Indian markets, our institutional export desk coordinates reliable containerized consignments of Spices, Pulses, and Dry Fruits to overseas seaports worldwide.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Key Port & Cargo Capabilities */}
      <section className="py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-xs uppercase tracking-widest text-slate-500 font-bold block mb-2 font-mono">
              STANDARDIZED PORT CLEARANCE
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#0A192F] tracking-tight">
              MUNDRA & KANDLA <span className="text-[#D4AF37]">PORT LOGISTICS</span>
            </h2>
            <div className="w-16 h-0.5 bg-[#D4AF37] mx-auto mt-4" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {exportSpecs.map((spec, idx) => (
              <div
                key={idx}
                className="p-8 rounded-sm bg-[#FAF8F5] border border-slate-200 hover:border-[#D4AF37] transition-all shadow-2xs"
              >
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#D4AF37] uppercase tracking-wider mb-2">
                  <Anchor className="w-4 h-4 text-[#0A192F]" />
                  <span>{spec.title}</span>
                </div>
                <h3 className="font-serif font-bold text-lg text-[#0A192F] mb-2">
                  {spec.value}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans">
                  {spec.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Export Bulk Packaging Formats */}
      <section className="py-20 bg-[#FAF8F5] border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-xs uppercase tracking-widest text-[#D4AF37] font-bold block mb-2 font-mono">
                INSTITUTIONAL PACKAGING
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#0A192F] tracking-tight mb-6">
                BULK CARGO <span className="text-[#D4AF37]">STANDARDS</span>
              </h2>

              <div className="space-y-4 text-slate-700 font-sans text-sm leading-relaxed">
                <p>
                  Export consignments are packed according to international food import regulations. We use heavy-duty multi-ply woven polypropylene (PP) bags, food-grade jute bags with inner polythene liners, and 1000kg FIBC jumbo tote bags.
                </p>
                <p>
                  All pallets comply with ISPM-15 heat-treated wood regulations, shrink-wrapped and strapped for safe ocean transport across high-humidity tropical routes.
                </p>
              </div>

              <div className="mt-8 space-y-3">
                <div className="flex items-center gap-2 text-xs font-semibold text-[#0A192F]">
                  <CheckCircle2 className="w-4 h-4 text-[#D4AF37]" />
                  <span>25kg / 50kg Heavy-Duty Woven PP Bags</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-semibold text-[#0A192F]">
                  <CheckCircle2 className="w-4 h-4 text-[#D4AF37]" />
                  <span>1000kg (1 MT) FIBC Jumbo Big Bags</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-semibold text-[#0A192F]">
                  <CheckCircle2 className="w-4 h-4 text-[#D4AF37]" />
                  <span>Custom Buyer Labeling & Bilingual Printing Available</span>
                </div>
              </div>

              <div className="mt-8">
                <button
                  type="button"
                  onClick={() => openEnquiryModal({ division: 'export' })}
                  className="px-6 py-3 bg-[#0A192F] hover:bg-[#1E293B] text-white text-xs font-bold uppercase tracking-wider rounded-sm transition-colors shadow-sm flex items-center gap-2"
                >
                  <span>Request Export Container RFQ</span>
                  <ArrowRight className="w-4 h-4 text-[#D4AF37]" />
                </button>
              </div>
            </div>

            <div className="rounded-sm overflow-hidden border border-slate-200 shadow-xl">
              <img
                src="/images/brand/processing_facility.jpg"
                alt="Container Loading Facility Gujarat"
                className="w-full h-[400px] object-cover"
              />
              <div className="p-4 bg-white border-t border-slate-200 flex items-center justify-between text-xs">
                <span className="font-serif font-bold text-[#0A192F]">Container Terminal Stuffing Bay</span>
                <span className="text-[#D4AF37] font-mono font-bold">GUJARAT, INDIA</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Statutory Certificates */}
      <CertificateGridSection />

      {/* 5. Connected Section */}
      <ConnectedSection />
    </div>
  );
}

import React from 'react';
import {
  Boxes,
  PackageCheck,
  ShieldCheck,
  FileCheck2,
  ArrowRight,
} from 'lucide-react';
import { useEnquiry } from '../context/EnquiryContext';

interface ServiceCard {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  points: string[];
}

const SERVICES: ServiceCard[] = [
  {
    icon: Boxes,
    title: 'Origin Sourcing',
    description: 'Direct procurement from Gujarat farming belts, Sortex mills in Unjha, and verified sugarcane tracts for transparent pricing.',
    points: ['Direct farmgate procurement', 'Sortex 99%+ cleaned seeds', 'Organic sugarcane clarification'],
  },
  {
    icon: PackageCheck,
    title: 'Custom Packaging & OEM',
    description: 'Export packaging tailored to destination regulations, from retail-ready branded pouches to bulk multi-wall bags.',
    points: ['Private label branding & barcodes', '25kg & 50kg PP / HDPE sacks', '1 MT jumbo FIBC bags'],
  },
  {
    icon: ShieldCheck,
    title: 'Quality & Lab Inspection',
    description: 'Pre-shipment verification with accredited testing agencies (SGS, Geo-Chem) and certified Certificate of Analysis (COA).',
    points: ['Moisture & purity checks', 'Pesticide & aflatoxin testing', 'Sucrose & Brix refractometry analysis'],
  },
  {
    icon: FileCheck2,
    title: 'Export Documentation',
    description: 'Complete regulatory paperwork and customs clearance for seamless port dispatch under FOB, CIF, or CFR terms.',
    points: ['Certificate of Origin (CoO)', 'Phytosanitary certification', 'Bill of Lading & shipping docs'],
  },
];

export function ExportServicesSection() {
  const { openEnquiryModal } = useEnquiry();

  return (
    <section id="export-services" className="py-16 sm:py-20 bg-white border-b border-[#E2E8F0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header - Clean & Grounded */}
        <div className="max-w-3xl mb-12">
          <div className="text-xs font-semibold tracking-wider uppercase text-[#C7A45B] mb-2">
            EXPORT SERVICES
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#0B1730] font-display tracking-tight">
            What We Do for Importers &amp; Sourcing Teams
          </h2>
          <p className="mt-2 text-sm sm:text-base text-[#64748B] leading-relaxed">
            From farmgate and mandi procurement to final port container dispatch, we manage each stage with verified quality and clear documentation.
          </p>
        </div>

        {/* Mobile Swipe Hint */}
        <div className="lg:hidden flex items-center justify-between text-[11px] text-[#C7A45B] font-semibold mb-3 px-1">
          <span>Sourcing Capabilities</span>
          <span>Swipe horizontally →</span>
        </div>

        {/* 4 Clean Service Cards — Mobile First Horizontal Touch Snap */}
        <div className="flex lg:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 overflow-x-auto snap-x snap-mandatory no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0 pb-4">
          {SERVICES.map((service) => {
            const Icon = service.icon;
            return (
              <div
                key={service.title}
                className="p-6 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] hover:border-[#C7A45B]/60 transition-all flex flex-col justify-between min-w-[80vw] sm:min-w-[300px] lg:min-w-0 snap-start"
              >
                <div>
                  <div className="w-10 h-10 rounded-md bg-[#0B1730] text-[#C7A45B] flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5" />
                  </div>

                  <h3 className="text-lg font-bold text-[#0B1730] font-display mb-2">
                    {service.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed mb-4">
                    {service.description}
                  </p>
                </div>

                <ul className="pt-4 border-t border-[#E2E8F0] space-y-1.5 text-xs text-[#475569]">
                  {service.points.map((point) => (
                    <li key={point} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#C7A45B] shrink-0" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        {/* Simple Bottom Action Bar */}
        <div className="mt-10 p-5 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="text-xs sm:text-sm text-[#475569]">
            <span className="font-semibold text-[#0B1730]">Need specific packing sizes, private labeling, or inspection protocols?</span>{' '}
            <span>Share your specifications with our trade desk.</span>
          </div>

          <button
            type="button"
            onClick={() => openEnquiryModal()}
            className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-white bg-[#0B1730] hover:bg-[#162444] rounded-md transition-colors shrink-0 cursor-pointer"
          >
            <span>Request Service Details</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </section>
  );
}

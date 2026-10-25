import React from 'react';
import {
  FileText,
  FlaskConical,
  FileSignature,
  PackageSearch,
  Ship,
  FileCheck,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';
import { useEnquiry } from '../context/EnquiryContext';

const WORKFLOW_STEPS = [
  {
    step: '01',
    icon: FileText,
    title: 'RFQ & Specification Review',
    description:
      'Buyer submits requirements including destination port, volume (FCL/LCL), Incoterms (FOB/CIF), and quality grading parameters. We issue a formal commercial proforma within 24 hours.',
  },
  {
    step: '02',
    icon: FlaskConical,
    title: 'Sample Dispatch & Lab Analysis',
    description:
      'Representative lot samples dispatched via express courier (DHL / FedEx) accompanied by preliminary lab Certificate of Analysis (COA) for buyer inspection and approval.',
  },
  {
    step: '03',
    icon: FileSignature,
    title: 'Contract & Trade Terms Finalization',
    description:
      'Mutual agreement on sales contract, confirmed Incoterms (FOB Mundra / CIF / CFR), shipment timelines, and international payment mechanics (Irrevocable L/C at sight, CAD, or T/T).',
  },
  {
    step: '04',
    icon: PackageSearch,
    title: 'Procurement, Grading & Packaging',
    description:
      'Meticulous Sortex cleaning, optical sorting, and customized export packing (PP sacks, vacuum pouches, or jumbo FIBCs) bearing custom buyer branding and biosecurity markings.',
  },
  {
    step: '05',
    icon: ShieldCheck,
    title: 'Third-Party Inspection & Port Stuffing',
    description:
      'Pre-shipment audit by accredited surveyors (SGS / Geo-Chem) verifying quality, count, and weight. Supervised container stuffing at Mundra Port or Hazira Port CFS.',
  },
  {
    step: '06',
    icon: Ship,
    title: 'Vessel Sailing & Documentation Release',
    description:
      'Container loading onto ocean liner, issuance of Bill of Lading (B/L), Certificate of Origin (CoO), Phytosanitary certificate, and bank document dispatch with tracking.',
  },
];

export function ExportWorkflowSection() {
  const { openEnquiryModal } = useEnquiry();

  return (
    <section className="py-20 lg:py-24 bg-[#F5F7FA] border-b border-[#E2E8F0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="text-xs font-bold uppercase tracking-wider text-[#C7A45B]">
            OPERATIONAL EXCELLENCE &amp; TRACEABILITY
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B1730] font-display tracking-tight">
            How We Execute International Orders
          </h2>
          <p className="text-sm sm:text-base text-[#64748B] leading-relaxed">
            Our structured 6-step export execution workflow ensures transparency, verified specifications, biosecurity compliance, and on-time ocean dispatch.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {WORKFLOW_STEPS.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.step}
                className="bg-white rounded-xl p-6 sm:p-7 border border-[#E2E8F0] hover:border-[#0B1730]/40 hover:shadow-lg transition-all duration-200 relative group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <span className="text-2xl font-black text-[#C7A45B]/80 font-display">
                      {item.step}
                    </span>
                    <div className="w-10 h-10 rounded-lg bg-[#0B1730]/5 group-hover:bg-[#0B1730] text-[#0B1730] group-hover:text-[#C7A45B] transition-colors flex items-center justify-center">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-[#0B1730] font-display mb-2 group-hover:text-[#0B1730]">
                    {item.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="mt-5 pt-4 border-t border-[#F5F7FA] flex items-center justify-between text-[11px] font-semibold text-[#0B1730]">
                  <span>Step {item.step} of 06</span>
                  <span className="text-[#C7A45B]">Verified Protocol</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Call to Action Banner */}
        <div className="mt-12 bg-[#0B1730] rounded-xl p-8 sm:p-10 border border-[#162444] text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="text-xl font-bold font-display text-white">
              Ready to Discuss Sourcing Requirements?
            </h4>
            <p className="text-xs sm:text-sm text-[#94A3B8]">
              Connect with our Gandhinagar trade desk for official price indications, samples, and specification sheets.
            </p>
          </div>
          <button
            type="button"
            onClick={() => openEnquiryModal()}
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg text-xs font-bold uppercase tracking-wider text-[#0B1730] bg-[#C7A45B] hover:bg-[#B89347] transition-colors shadow-sm shrink-0 cursor-pointer"
          >
            <span>Start Trade Inquiry</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
}

import React from 'react';
import { ShieldCheck, CheckCircle2, FileText, ArrowRight, ExternalLink } from 'lucide-react';
import { useEnquiry } from '../context/EnquiryContext';

interface CertificationsSectionProps {
  className?: string;
}

export function CertificationsSection({ className = '' }: CertificationsSectionProps) {
  const { openEnquiryModal } = useEnquiry();

  const certifications = [
    {
      code: 'FSSAI',
      title: 'Food Safety License',
      description: 'Manufactured and packed under strict Food Safety and Standards Authority of India hygiene protocols.',
      badge: 'Food Safety License',
    },
    {
      code: 'APEDA',
      title: 'Export Certification',
      description: 'Authorized by the Agricultural & Processed Food Products Export Development Authority (Ministry of Commerce).',
      badge: 'Export Certification',
    },
    {
      code: 'FDA',
      title: 'Food Facility Registration',
      description: 'Compliant with international food facility registration requirements for US and global market clearance.',
      badge: 'Food Facility Registration',
    },
    {
      code: 'LAB REPORT',
      title: 'Laboratory Tested',
      description: '100% pre-shipment laboratory analysis testing moisture, sucrose, brix, and zero sulphur / zero bleaching validation.',
      badge: 'Laboratory Tested',
    },
  ];

  return (
    <section id="certifications" className={`py-16 sm:py-20 bg-white border-y border-stone-200 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading: Specifications & Certifications */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <div className="text-xs font-bold uppercase tracking-wider text-[#C5A059]">
            QUALITY ASSURED
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-[#0A192F] tracking-tight">
            Specifications &amp; Certifications
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-stone-600">
            Official statutory licenses and accredited laboratory quality protocols protecting every consignment.
          </p>
        </div>

        {/* 4 Core Certification Cards Matching PDF Page 3 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {certifications.map((item) => (
            <div
              key={item.code}
              className="bg-[#0A192F] text-white rounded-xl p-6 flex flex-col justify-between space-y-4 shadow-sm hover:shadow-md transition-all duration-200 border border-white/10 group"
            >
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-[#D4AF37] flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6 text-[#D4AF37]" />
                </div>

                <div>
                  <h3 className="text-xl font-bold font-mono tracking-wide text-white group-hover:text-[#D4AF37] transition-colors">
                    {item.code}
                  </h3>
                  <div className="text-xs font-semibold text-[#D4AF37] mt-0.5">
                    {item.badge}
                  </div>
                </div>

                <p className="text-xs text-stone-300 leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="pt-3 border-t border-white/10 flex items-center justify-between text-[11px] text-stone-400">
                <span>Verified Standard</span>
                <span className="text-[#D4AF37] font-semibold">Active</span>
              </div>
            </div>
          ))}
        </div>

        {/* Verification Note Matching PDF Page 3 */}
        <div className="mt-10 p-5 bg-[#FAF8F5] rounded-xl border border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-4 max-w-4xl mx-auto">
          <div className="flex items-center gap-3 text-xs text-stone-700">
            <FileText className="w-5 h-5 text-[#C5A059] shrink-0" />
            <div>
              <strong className="text-[#0A192F] font-semibold">Copies of certificates and laboratory reports are available on request.</strong>
              <div className="text-stone-500 text-[11px]">Contact our trade desk for accredited SGS / Geo-Chem COA and statutory filings.</div>
            </div>
          </div>

          <button
            type="button"
            onClick={() => openEnquiryModal(undefined, 'jaggery', 'buyer')}
            className="px-4 py-2 text-xs font-bold text-[#0A192F] bg-[#D4AF37] hover:bg-[#C5A059] rounded-lg transition-colors cursor-pointer shrink-0 shadow-xs"
          >
            Request Certificate Copies
          </button>
        </div>

      </div>
    </section>
  );
}

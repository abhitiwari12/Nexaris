import React, { useState } from 'react';
import { OFFICIAL_CERTIFICATION_CARDS, CertificationLogoCard } from '../data/certifications';

interface CertificationsSectionProps {
  className?: string;
}

export function CertificationsSection({ className = '' }: CertificationsSectionProps) {
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});

  const handleImageError = (id: string) => {
    setImageErrors((prev) => ({ ...prev, [id]: true }));
  };

  return (
    <section id="certifications" className={`py-16 sm:py-20 bg-white border-y border-[#E2E8F0] ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading: "Certifications & Compliance" */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#0B1730] font-display tracking-tight">
            Certifications &amp; Compliance
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-[#64748B]">
            Official regulatory registrations, quality standards, and export authority memberships.
          </p>
        </div>

        {/* Mobile Swipe Hint */}
        <div className="sm:hidden flex items-center justify-between text-[11px] text-[#C7A45B] font-semibold mb-3 px-1">
          <span>Official Registrations</span>
          <span>Swipe →</span>
        </div>

        {/* Clean Grid / Mobile Horizontal Swipe displaying Official Certification Cards */}
        <div className="flex sm:grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-6 items-center justify-start sm:justify-center overflow-x-auto snap-x no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0 pb-2">
          {OFFICIAL_CERTIFICATION_CARDS.map((item: CertificationLogoCard) => (
            <a
              key={item.id}
              href={item.portalUrl || '#'}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white rounded-xl overflow-hidden border border-emerald-700/30 hover:border-emerald-600 hover:shadow-md hover:-translate-y-1 transition-all duration-200 p-2 sm:p-3 flex items-center justify-center group focus-visible:ring-2 focus-visible:ring-[#0B1730] focus-visible:outline-none min-w-[140px] sm:min-w-0 snap-start"
              title={`View ${item.name} information (opens in new tab)`}
            >
              {!imageErrors[item.id] ? (
                <img
                  src={item.imageSrc}
                  alt={item.name}
                  referrerPolicy="no-referrer"
                  onError={() => handleImageError(item.id)}
                  className="w-full h-auto object-contain rounded group-hover:scale-102 transition-transform duration-200"
                  loading="lazy"
                />
              ) : (
                <div className="p-4 text-center">
                  <span className="text-xs font-bold text-[#0B1730] font-display uppercase tracking-wider block">
                    {item.name}
                  </span>
                </div>
              )}
            </a>
          ))}
        </div>

        {/* Verification & Compliance Disclaimer Note */}
        <div className="mt-8 p-4 bg-[#F8FAFC] rounded-lg border border-[#E2E8F0] text-center max-w-3xl mx-auto">
          <p className="text-[11px] sm:text-xs text-[#64748B] leading-relaxed">
            <strong className="text-[#0B1730]">Export Compliance Note:</strong> Specific registrations, statutory memberships (FSSAI, Spices Board CRES, IOPEPC, IEC), and consignment certificates (SGS test reports, Phytosanitary, Halal, ISO parameters) are verified and issued per shipment lot based on buyer destination and regulatory requirements.
          </p>
        </div>

      </div>
    </section>
  );
}

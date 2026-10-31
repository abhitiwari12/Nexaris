import React from 'react';
import { Award, ShieldCheck, CheckCircle2 } from 'lucide-react';

export function CertificateGridSection() {
  const certificates = [
    {
      name: 'GMP Quality',
      subtitle: 'Good Manufacturing Practice',
      code: 'GMP-2024-QC',
      badgeClass: 'border-emerald-600 text-emerald-800 bg-emerald-50/60',
      symbol: 'GMP',
    },
    {
      name: 'APEDA',
      subtitle: 'Agri Export Authority of India',
      code: 'RCMC / APEDA',
      badgeClass: 'border-green-700 text-green-900 bg-green-50/60',
      symbol: 'एपीडा',
    },
    {
      name: 'Spices Board India',
      subtitle: 'Ministry of Commerce & Industry',
      code: 'CRES / Spices India',
      badgeClass: 'border-blue-800 text-blue-900 bg-blue-50/60',
      symbol: 'SPICES',
    },
    {
      name: 'Halal Certified',
      subtitle: 'Global Islamic Food Compliance',
      code: 'HAL-GCC-STD',
      badgeClass: 'border-amber-700 text-amber-900 bg-amber-50/60',
      symbol: 'حلال',
    },
    {
      name: 'US FDA',
      subtitle: 'Food Facility Registration',
      code: 'US-FDA-REG',
      badgeClass: 'border-slate-800 text-slate-900 bg-slate-50',
      symbol: 'FDA',
    },
    {
      name: 'IAF / ISO 22000',
      subtitle: 'International Accreditation Forum',
      code: 'ISO 22000:2018',
      badgeClass: 'border-indigo-800 text-indigo-900 bg-indigo-50/60',
      symbol: 'IAF',
    },
    {
      name: 'FSSAI',
      subtitle: 'Food Safety & Standards Authority',
      code: 'Central Lic. Certified',
      badgeClass: 'border-orange-600 text-orange-900 bg-orange-50/60',
      symbol: 'fssai',
    },
    {
      name: 'MSME Registered',
      subtitle: 'Govt. of India Enterprise',
      code: 'Udyam Registration',
      badgeClass: 'border-slate-700 text-slate-900 bg-slate-50',
      symbol: 'MSME',
    },
  ];

  return (
    <section className="py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header matching Screenshot image_aebec4ac.png */}
        <div className="text-center mb-16">
          <span className="text-sm font-sans font-light tracking-widest text-[#D4AF37] block uppercase">
            OUR
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#0A192F] tracking-tight uppercase">
            CERTIFICATE
          </h2>
        </div>

        {/* 8 Certification Badges Grid matching Screenshot 3 */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-4 gap-6">
          {certificates.map((cert, index) => (
            <div
              key={index}
              className="p-6 rounded-sm bg-white border border-slate-200 shadow-2xs hover:shadow-md hover:border-[#D4AF37] transition-all duration-300 flex flex-col items-center text-center group"
            >
              {/* Seal Emblem */}
              <div className={`w-20 h-20 rounded-full border-2 ${cert.badgeClass} flex flex-col items-center justify-center mb-4 group-hover:scale-105 transition-transform shadow-xs`}>
                <span className="font-serif font-black text-sm tracking-wider uppercase">
                  {cert.symbol}
                </span>
                <span className="text-[9px] uppercase font-bold tracking-tight opacity-75">
                  CERTIFIED
                </span>
              </div>

              {/* Title & Authority */}
              <h3 className="font-serif font-bold text-sm text-[#0A192F] group-hover:text-[#D4AF37] transition-colors mb-1">
                {cert.name}
              </h3>
              <p className="text-[11px] text-slate-500 font-sans mb-3">
                {cert.subtitle}
              </p>

              {/* Verified Tag */}
              <div className="mt-auto inline-flex items-center gap-1 text-[10px] font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                <CheckCircle2 className="w-3 h-3" />
                <span>{cert.code}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

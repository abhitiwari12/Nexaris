import React from 'react';

export function NumbersLedgerSection() {
  const metrics = [
    {
      value: '50+',
      label: 'TONS OF AGRI PRODUCTS',
      description: 'Our modern processing facilities handle up to 50 tonnes of agro commodities everyday.',
    },
    {
      value: '15+',
      label: 'GLOBAL & DOMESTIC MARKETS',
      description: 'Proudly servicing retail supermarkets and commercial importers across 15+ countries and states.',
    },
    {
      value: '100%',
      label: 'QUALITY CERTIFIED',
      description: '100% lab-verified food safety backed by FSSAI, APEDA, Halal, US FDA, and Spices Board.',
    },
    {
      value: '02',
      label: 'MODERN AGRO MILLS',
      description: 'Gujarat state-of-the-art optical Sortex cleaning, cryogenic grinding, and packaging plants.',
    },
  ];

  return (
    <section className="py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title matching Screenshot 2 & 5 */}
        <div className="text-center mb-16">
          <span className="text-xs uppercase tracking-widest text-slate-500 font-bold block mb-2 font-mono">
            VERIFIED INSTITUTIONAL SCALE
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#0A192F] tracking-tight">
            NUMBERS AT <span className="text-[#D4AF37]">NEXARIS GROUP</span>
          </h2>
          <div className="w-16 h-0.5 bg-[#D4AF37] mx-auto mt-4" />
        </div>

        {/* 4 Metric Columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 text-center">
          {metrics.map((item, index) => (
            <div
              key={index}
              className="p-6 rounded-sm bg-[#FAF8F5] border border-slate-200 hover:border-[#D4AF37] transition-all duration-300 group hover:-translate-y-1 shadow-2xs hover:shadow-md"
            >
              <div className="text-4xl sm:text-5xl font-serif font-bold text-[#D4AF37] mb-3 group-hover:scale-105 transition-transform">
                {item.value}
              </div>
              <div className="text-xs sm:text-sm font-bold text-[#0A192F] tracking-wider uppercase mb-2 font-sans">
                {item.label}
              </div>
              <p className="text-xs text-slate-600 font-sans leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

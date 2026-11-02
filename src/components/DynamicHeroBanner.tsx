import React, { useState } from 'react';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { useEnquiry } from '../context/EnquiryContext';
import { MASTER_SHELF_IMAGE } from '../data/arikaProducts';

interface HeroSpice {
  id: 'haldi' | 'kashmiri' | 'dhaniya' | 'jeera';
  name: string;
  hindiName: string;
  outlineText: string;
  subtitle: string;
  netWeight: string;
  gradientClass: string;
  accentColor: string;
  spritePosition: string; // for the pouch crop
  thumbSpritePosition: string;
}

const HERO_SPICES: HeroSpice[] = [
  {
    id: 'kashmiri',
    name: 'Kashmiri',
    hindiName: 'लाल मिर्च',
    outlineText: 'KASHMIRI',
    subtitle: 'PREMIUM CHILLY POWDER',
    netWeight: '200 G',
    gradientClass: 'from-[#8B1E1E] via-[#991B1B] to-[#450A0A]',
    accentColor: '#DC2626',
    spritePosition: '16.66% 0%',
    thumbSpritePosition: '16.66% 0%',
  },
  {
    id: 'haldi',
    name: 'Haldi',
    hindiName: 'हल्दी',
    outlineText: 'HALDI',
    subtitle: 'PREMIUM TURMERIC POWDER',
    netWeight: '200 G',
    gradientClass: 'from-[#A16207] via-[#854D0E] to-[#451A03]',
    accentColor: '#D97706',
    spritePosition: '0% 0%',
    thumbSpritePosition: '0% 0%',
  },
  {
    id: 'dhaniya',
    name: 'Dhaniya',
    hindiName: 'धनिया',
    outlineText: 'DHANIYA',
    subtitle: 'PREMIUM CORIANDER POWDER',
    netWeight: '200 G',
    gradientClass: 'from-[#15803D] via-[#166534] to-[#14532D]',
    accentColor: '#16A34A',
    spritePosition: '33.33% 0%',
    thumbSpritePosition: '33.33% 0%',
  },
  {
    id: 'jeera',
    name: 'Jeera',
    hindiName: 'जीरा',
    outlineText: 'JEERA',
    subtitle: 'SORTEX-CLEANED CUMIN SEEDS',
    netWeight: '200 G',
    gradientClass: 'from-[#78350F] via-[#5C2E0B] to-[#3B1F0B]',
    accentColor: '#854D0E',
    spritePosition: '50% 0%',
    thumbSpritePosition: '50% 0%',
  },
];

export function DynamicHeroBanner() {
  const [activeSpiceId, setActiveSpiceId] = useState<HeroSpice['id']>('haldi');
  const { openEnquiryModal } = useEnquiry();

  const activeSpice = HERO_SPICES.find((s) => s.id === activeSpiceId) || HERO_SPICES[1];

  const marqueeItems = [
    '100% NATURAL & PURE',
    'GROUND SPICES',
    'SORTEX-CLEANED DALS',
    'WHOLE AROMATIC SEEDS',
    'PREMIUM DRY FRUITS',
    'NO ADDED COLOURS',
    'AROMA-LOCKED FRESHNESS',
    'FSSAI CERTIFIED',
    'DIRECT FROM GUJARAT FARMS',
  ];

  return (
    <div className="relative overflow-hidden">
      {/* Dynamic Background Container with Smooth Color Transition */}
      <section
        className={`relative min-h-[600px] lg:min-h-[660px] flex items-center bg-gradient-to-br ${activeSpice.gradientClass} text-white transition-colors duration-700 ease-in-out overflow-hidden`}
      >
        {/* Subtle radial lighting / texture */}
        <div className="absolute inset-0 bg-radial-gradient from-white/10 via-transparent to-black/40 pointer-events-none" />

        {/* Giant Hollow Outline Typography Behind the Pouch (Matching Screenshots 1 & 2) */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 overflow-hidden">
          <span
            className="font-serif font-black tracking-wider text-transparent select-none whitespace-nowrap opacity-30 sm:opacity-40 transition-all duration-700"
            style={{
              WebkitTextStroke: '2px rgba(255, 255, 255, 0.45)',
              fontSize: 'clamp(5rem, 18vw, 15rem)',
              lineHeight: 1,
            }}
          >
            {activeSpice.outlineText}
          </span>
        </div>

        {/* Main Content Layout */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Content Column */}
            <div className="lg:col-span-6 space-y-6 text-left">
              {/* Location & Heritage Kicker */}
              <div className="inline-block text-[11px] sm:text-xs font-mono uppercase tracking-[0.25em] text-white/80 font-semibold">
                GANDHINAGAR · GUJARAT
              </div>

              {/* Headline */}
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif font-bold text-white tracking-tight leading-[1.05]">
                NEXARIS
              </h1>

              {/* Vision & Quality Statement */}
              <p className="text-sm sm:text-base lg:text-lg text-white/90 font-sans font-light leading-relaxed max-w-lg">
                NEXARIS has consistently aimed to provide quality products. From the beginning, our goal and vision have been clear, focusing on delivering excellence in every product we offer.
              </p>

              {/* Pill Button CTA matching reference screenshot */}
              <div className="pt-2">
                <a
                  href="#signature-range"
                  className="inline-flex items-center gap-3 px-7 py-3.5 bg-white hover:bg-slate-100 text-[#0A192F] font-semibold text-xs sm:text-sm uppercase tracking-wider rounded-full transition-all shadow-xl hover:scale-105 active:scale-95"
                >
                  <span>Explore our range</span>
                  <ArrowRight className="w-4 h-4 text-[#0A192F]" />
                </a>
              </div>
            </div>

            {/* Center Floating 3D Pouch Presentation */}
            <div className="lg:col-span-6 relative flex flex-col items-center justify-center">
              {/* Floating Pouch with Realistic Soft Drop Shadow */}
              <div className="relative w-64 sm:w-72 md:w-80 aspect-[3/4] transition-all duration-700 ease-out transform hover:rotate-0 hover:scale-105 group">
                {/* 3D Tilted Pouch Graphic */}
                <div
                  className="w-full h-full rounded-md shadow-2xl transition-all duration-700 rotate-[4deg] group-hover:rotate-0"
                  style={{
                    backgroundImage: `url(${MASTER_SHELF_IMAGE})`,
                    backgroundSize: '700% 300%',
                    backgroundPosition: activeSpice.spritePosition,
                    backgroundRepeat: 'no-repeat',
                    filter: 'drop-shadow(0 25px 35px rgba(0, 0, 0, 0.45))',
                  }}
                  role="img"
                  aria-label={`${activeSpice.name} ARIKA by NEXARIS Pack`}
                />

                {/* Soft ground shadow beneath pouch */}
                <div className="absolute -bottom-6 inset-x-8 h-8 bg-black/40 blur-xl rounded-full pointer-events-none" />
              </div>

              {/* Bottom Right Product Name & Thumbnail Switcher (Matching Screenshot) */}
              <div className="mt-8 lg:mt-6 w-full flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-white/20">
                {/* Active Product Title & Weight */}
                <div className="text-center sm:text-left">
                  <h3 className="font-serif font-bold text-xl sm:text-2xl text-white tracking-wide">
                    {activeSpice.name}
                  </h3>
                  <p className="text-[11px] font-mono uppercase tracking-wider text-white/80">
                    {activeSpice.subtitle} · {activeSpice.netWeight}
                  </p>
                </div>

                {/* 4 Circular Thumbnail Switcher Buttons */}
                <div className="flex items-center gap-3">
                  {HERO_SPICES.map((spice) => {
                    const isSelected = spice.id === activeSpiceId;
                    return (
                      <button
                        key={spice.id}
                        type="button"
                        onClick={() => setActiveSpiceId(spice.id)}
                        className={`relative w-12 h-12 rounded-full overflow-hidden transition-all duration-300 transform focus:outline-none ${
                          isSelected
                            ? 'ring-3 ring-white ring-offset-2 ring-offset-black/50 scale-110 shadow-lg'
                            : 'opacity-70 hover:opacity-100 hover:scale-105 border border-white/40'
                        }`}
                        title={`Switch to ${spice.name}`}
                        aria-label={`View ${spice.name}`}
                      >
                        <div
                          className="w-full h-full"
                          style={{
                            backgroundImage: `url(${MASTER_SHELF_IMAGE})`,
                            backgroundSize: '700% 300%',
                            backgroundPosition: spice.thumbSpritePosition,
                            backgroundRepeat: 'no-repeat',
                          }}
                        />
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Pill Indicator at Bottom */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 hidden sm:block">
          <a
            href="#signature-range"
            className="w-6 h-10 rounded-full border-2 border-white/40 flex items-start justify-center p-1 hover:border-white transition-colors"
            aria-label="Scroll to Signature Range"
          >
            <div className="w-1.5 h-2.5 rounded-full bg-white animate-bounce mt-1" />
          </a>
        </div>
      </section>

      {/* Continuous Scrolling Marquee Ticker (Matching Reference Ribbon) */}
      <div className="bg-[#450A0A] text-white py-3 overflow-hidden border-y border-white/10 select-none">
        <div className="flex items-center whitespace-nowrap animate-marquee font-mono text-xs font-semibold uppercase tracking-widest text-amber-200">
          {[...marqueeItems, ...marqueeItems, ...marqueeItems].map((item, idx) => (
            <span key={idx} className="flex items-center">
              <span className="mx-4">{item}</span>
              <span className="text-white/40 font-bold">•</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

import React, { useState } from 'react';
import { 
  Sparkles, 
  ShieldCheck, 
  Leaf, 
  Check, 
  ArrowRight, 
  Flame, 
  Layers, 
  HeartHandshake, 
  Clock, 
  Sparkle
} from 'lucide-react';
import { Link } from '../context/RouterContext';
import { useEnquiry } from '../context/EnquiryContext';
import { MASTER_SHELF_IMAGE } from '../data/arikaProducts';

interface StoryChapter {
  id: string;
  stepNumber: string;
  year: string;
  title: string;
  subtitle: string;
  body: string[];
  metrics: { label: string; value: string }[];
  accentColor: string;
  bgLight: string;
  pouchSpritePos: string;
}

const STORY_CHAPTERS: StoryChapter[] = [
  {
    id: 'roots',
    stepNumber: '01',
    year: 'THE FOUNDATION',
    title: 'Rooted in Gujarat’s Spice Heartlands',
    subtitle: 'From Unjha’s cumin markets to Saurashtra’s red chilly fields',
    body: [
      'Our journey started with a deep admiration for the agricultural richness of Gujarat. Operating in close proximity to the historic markets of Unjha, Gondal, and Rajkot, we witnessed first-hand the vibrant aroma of hand-harvested whole spices and sun-ripened pulses.',
      'Yet we noticed a troubling reality in everyday households: while the best export grades left India, consumer kitchen shelves were too often stocked with mass-market spices diluted with fillers, synthetic colorants, or exhausted husk powders that had lost their natural fragrance.'
    ],
    metrics: [
      { label: 'Origin', value: 'Gandhinagar, Gujarat' },
      { label: 'Commodity Insight', value: '15+ Years' },
      { label: 'Cultivator Connect', value: '100% Direct' }
    ],
    accentColor: '#B45309',
    bgLight: 'bg-amber-50/70',
    pouchSpritePos: '50% 0%', // Jeera seeds
  },
  {
    id: 'pivot',
    stepNumber: '02',
    year: 'THE STRATEGIC SHIFT',
    title: 'The Evolution into a Pure Retail Brand',
    subtitle: 'Building ARIKA by NEXARIS for modern home pantries',
    body: [
      'We took a conscious, defining decision: we moved beyond bulk commodity logistics to establish our own dedicated consumer retail brand.',
      'We asked ourselves: why should families settle for ordinary, unhygienic loose supplies or industrial powders? We invested heavily in automated Sortex cleaning, gentle stone-milling lines, and multi-layer barrier stand-up pouches with airtight zip closures. Thus, ARIKA by NEXARIS was born — packaging the authentic richness of India’s spice cabinet directly for everyday kitchen counters.'
    ],
    metrics: [
      { label: 'Retail Brand', value: 'ARIKA by NEXARIS' },
      { label: 'Kitchen Formats', value: 'Stand-up Zipper Pouches' },
      { label: 'Pantry Range', value: '23+ Products' }
    ],
    accentColor: '#991B1B',
    bgLight: 'bg-red-50/70',
    pouchSpritePos: '16.66% 0%', // Kashmiri chilly
  },
  {
    id: 'promise',
    stepNumber: '03',
    year: 'OUR PRESENT PROMISE',
    title: 'Uncompromising Purity in Every Kitchen',
    subtitle: 'Zero fillers, zero artificial dyes, 100% culinary integrity',
    body: [
      'Today, every NEXARIS pack in your kitchen represents our iron-clad purity standard. We never use Sudan dyes, lead chromate, metanil yellow, or artificial anti-caking agents. Our ground spices are cold-milled below 42°C to safeguard volatile essential oils, while our dals are 100% unpolished to retain natural dietary fiber and plant protein.',
      'When you open a pouch of ARIKA by NEXARIS, the rich, authentic aroma fills the kitchen — proof of unadulterated freshness that honors the dishes you cook for your family.'
    ],
    metrics: [
      { label: 'Added Colors', value: '0% Strict Zero' },
      { label: 'Sortex Optical Purity', value: '99.8%' },
      { label: 'Statutory Trust', value: 'FSSAI Certified' }
    ],
    accentColor: '#854D0E',
    bgLight: 'bg-yellow-50/70',
    pouchSpritePos: '0% 0%', // Haldi
  },
];

const CRAFTSMANSHIP_PILLARS = [
  {
    icon: Flame,
    title: 'Cold Stone-Milled Aroma',
    description: 'Ground slowly under controlled temperatures below 42°C so natural volatile oils, aromas, and antioxidants never burn away in the mill.',
  },
  {
    icon: ShieldCheck,
    title: 'Multi-Stage Laser Sortex',
    description: 'High-speed optical sorters analyze each grain and seed, removing chalk, discolored pods, and impurities to guarantee 99.8% purity.',
  },
  {
    icon: Layers,
    title: 'Aroma-Lock Barrier Pouches',
    description: 'Triple-layer metalized foil safeguards against oxygen, UV light, and kitchen humidity with an airtight resealable zipper for lasting freshness.',
  },
  {
    icon: Leaf,
    title: '100% Unpolished & Pure',
    description: 'Our dals are never treated with artificial water/marble polishing or synthetic shine oils, keeping nutritional integrity intact.',
  },
];

export function OurStorySection() {
  const [activeTab, setActiveTab] = useState<string>('roots');
  const { openEnquiryModal } = useEnquiry();

  const currentChapter = STORY_CHAPTERS.find((c) => c.id === activeTab) || STORY_CHAPTERS[0];

  return (
    <section id="our-story" className="py-20 lg:py-28 bg-[#FAF8F5] border-b border-slate-200 relative overflow-hidden">
      {/* Subtle background ornamentation */}
      <div className="absolute top-0 right-0 -mr-24 -mt-24 w-96 h-96 rounded-full bg-amber-100/40 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-24 -mb-24 w-96 h-96 rounded-full bg-red-100/30 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-14 lg:mb-18">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-[0.25em] text-[#D4AF37] font-bold mb-3">
            <span>OUR JOURNEY</span>
            <span aria-hidden="true">·</span>
            <span>HERITAGE TO HOME</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#0A192F] tracking-tight leading-[1.15] mb-5">
            Crafted for the Modern Kitchen. <br className="hidden sm:inline" />
            <span className="italic font-normal text-slate-700">Rooted in Gujarat.</span>
          </h2>

          <p className="text-sm sm:text-base text-slate-600 font-sans leading-relaxed">
            How NEXARIS evolved from sourcing raw harvests into a trusted consumer retail brand — bringing farm-gate purity, aroma-locked barrier packaging, and laboratory-tested safety straight to your pantry.
          </p>
        </div>

        {/* Interactive Story Timeline Stepper */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start mb-20">
          {/* Left Column: Interactive Chapter Navigation & Content */}
          <div className="lg:col-span-7 space-y-6">
            {/* Step Selector Buttons */}
            <div className="flex flex-wrap sm:flex-nowrap gap-2 p-1.5 bg-slate-200/70 rounded-xl border border-slate-300/60">
              {STORY_CHAPTERS.map((chapter) => {
                const isActive = chapter.id === activeTab;
                return (
                  <button
                    key={chapter.id}
                    type="button"
                    onClick={() => setActiveTab(chapter.id)}
                    className={`flex-1 py-3 px-4 rounded-lg text-left transition-all duration-200 focus:outline-none ${
                      isActive
                        ? 'bg-white text-[#0A192F] shadow-sm font-semibold'
                        : 'text-slate-600 hover:text-[#0A192F] hover:bg-white/50'
                    }`}
                  >
                    <div className="flex items-center justify-between text-[11px] font-mono uppercase tracking-wider mb-0.5">
                      <span className={isActive ? 'text-[#D4AF37] font-bold' : 'text-slate-400'}>
                        Step {chapter.stepNumber}
                      </span>
                    </div>
                    <div className="text-xs sm:text-sm truncate font-medium">
                      {chapter.year}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Active Chapter Card */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-10 shadow-sm transition-all duration-300">
              <div className="flex items-center gap-3 text-xs font-mono uppercase tracking-wider text-slate-500 mb-3">
                <span className="font-bold text-[#D4AF37]">CHAPTER {currentChapter.stepNumber}</span>
                <span aria-hidden="true">/</span>
                <span>{currentChapter.year}</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#0A192F] tracking-tight mb-2">
                {currentChapter.title}
              </h3>

              <p className="text-xs sm:text-sm font-sans font-medium text-[#991B1B] mb-6">
                {currentChapter.subtitle}
              </p>

              <div className="space-y-4 text-slate-700 font-sans text-sm sm:text-base leading-relaxed mb-8">
                {currentChapter.body.map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>

              {/* Chapter Key Highlights */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-slate-100">
                {currentChapter.metrics.map((metric, idx) => (
                  <div key={idx} className="p-3 bg-[#FAF8F5] rounded-lg border border-slate-200/70">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 block mb-1">
                      {metric.label}
                    </span>
                    <span className="font-serif font-bold text-sm sm:text-base text-[#0A192F]">
                      {metric.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Visual Pack & Purity Verification Showcase */}
          <div className="lg:col-span-5">
            <div className="bg-gradient-to-br from-[#0A192F] to-[#1E293B] text-white rounded-2xl p-6 sm:p-8 shadow-xl relative overflow-hidden border border-slate-800">
              {/* Decorative background glow */}
              <div className="absolute top-0 right-0 w-48 h-48 bg-[#D4AF37]/15 rounded-full blur-2xl pointer-events-none" />

              <div className="flex items-center justify-between text-xs font-mono uppercase tracking-widest text-[#D4AF37] mb-4">
                <span>RETAIL INNOVATION</span>
                <span>ARIKA BY NEXARIS</span>
              </div>

              {/* Floating Pack Graphic with Sprite from Master Image */}
              <div className="py-6 flex items-center justify-center">
                <div className="relative group">
                  <div
                    className="w-52 sm:w-60 aspect-[3/4] transition-transform duration-500 transform group-hover:scale-105"
                    style={{
                      backgroundImage: `url(${MASTER_SHELF_IMAGE})`,
                      backgroundSize: '700% 300%',
                      backgroundPosition: currentChapter.pouchSpritePos,
                      backgroundRepeat: 'no-repeat',
                      filter: 'drop-shadow(0 20px 30px rgba(0, 0, 0, 0.6))',
                    }}
                    role="img"
                    aria-label="ARIKA by NEXARIS Retail Pack"
                  />
                  {/* Subtle reflection */}
                  <div className="absolute -bottom-4 inset-x-6 h-6 bg-black/40 blur-md rounded-full pointer-events-none" />
                </div>
              </div>

              {/* Pack Feature Callouts */}
              <div className="space-y-3 pt-6 border-t border-slate-800/80 text-xs">
                <div className="flex items-start gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-[#15803D]/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3 h-3" />
                  </div>
                  <div>
                    <span className="font-semibold text-white">Triple-Layer Barrier Film:</span>
                    <span className="text-slate-300 ml-1">Protects volatile spice aromatics from light and humidity.</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-[#15803D]/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3 h-3" />
                  </div>
                  <div>
                    <span className="font-semibold text-white">Resealable Airtight Zip:</span>
                    <span className="text-slate-300 ml-1">Preserves first-day freshness through the very last pinch.</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-[#15803D]/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3 h-3" />
                  </div>
                  <div>
                    <span className="font-semibold text-white">Transparent Nutritional Backing:</span>
                    <span className="text-slate-300 ml-1">FSSAI laboratory certified macros and origin traceability.</span>
                  </div>
                </div>
              </div>

              {/* Action Link to Products */}
              <div className="mt-6 pt-4 border-t border-slate-800/60 flex items-center justify-between">
                <span className="text-xs text-slate-400">Available across all 23 staples</span>
                <Link
                  href="/products"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#D4AF37] hover:text-white transition-colors"
                >
                  <span>View All Packs</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Pillars of Kitchen Quality */}
        <div className="mb-20">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#D4AF37] font-bold block mb-2">
              THE FOUR PILLARS
            </span>
            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#0A192F]">
              How We Guarantee Purity in Every Kitchen
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {CRAFTSMANSHIP_PILLARS.map((pillar, idx) => {
              const IconComp = pillar.icon;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-xl p-6 border border-slate-200/80 shadow-2xs hover:shadow-md transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between"
                >
                  <div>
                    <div className="w-12 h-12 rounded-lg bg-[#FAF8F5] border border-slate-200 text-[#0A192F] flex items-center justify-center mb-5 shadow-inner">
                      <IconComp className="w-6 h-6 text-[#854D0E]" />
                    </div>

                    <h4 className="font-serif font-bold text-lg text-[#0A192F] mb-2">
                      {pillar.title}
                    </h4>

                    <p className="text-xs sm:text-sm text-slate-600 font-sans leading-relaxed">
                      {pillar.description}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-2 text-[11px] font-mono text-slate-400 uppercase tracking-wider">
                    <span>Standard #{idx + 1}</span>
                    <span aria-hidden="true">·</span>
                    <span className="text-emerald-700 font-semibold">Verified</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Founder / Kitchen Quality Quote Banner */}
        <div className="p-8 sm:p-12 bg-white rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <div className="w-10 h-10 rounded-full bg-[#FAF8F5] border border-[#D4AF37] flex items-center justify-center mx-auto text-[#D4AF37]">
              <Sparkles className="w-5 h-5" />
            </div>

            <blockquote className="font-serif italic text-lg sm:text-2xl text-[#0A192F] leading-snug">
              &ldquo;We realized Indian families deserve the exact same uncompromising quality that top connoisseurs demand: pure, fragrant, untainted spices that smell like home the instant you tear open the pouch.&rdquo;
            </blockquote>

            <div className="text-xs font-sans text-slate-600">
              <div className="font-bold text-[#0A192F] uppercase tracking-wider">
                The NEXARIS Quality Desk
              </div>
              <div className="text-slate-500 font-mono text-[11px]">
                Gandhinagar, Gujarat, India
              </div>
            </div>

            {/* CTAs */}
            <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
              <button
                type="button"
                onClick={() => openEnquiryModal(undefined, 'spices', 'buyer', 'Retail Pack Quality & Distribution Sample Request')}
                className="px-6 py-3 bg-[#0A192F] hover:bg-[#1E293B] text-white text-xs font-bold uppercase tracking-wider rounded-lg transition-transform hover:scale-105 active:scale-95 shadow-md"
              >
                Request Product Samples
              </button>

              <Link
                href="/products"
                className="px-6 py-3 bg-[#FAF8F5] hover:bg-slate-200 text-[#0A192F] text-xs font-bold uppercase tracking-wider rounded-lg border border-slate-300 transition-colors"
              >
                Explore Full 23-Pack Pantry
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

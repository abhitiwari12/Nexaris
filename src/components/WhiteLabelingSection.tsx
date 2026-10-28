import React from 'react';
import { Package, Send, CheckCircle2, ShieldCheck, ArrowRight, Sparkles, Layers } from 'lucide-react';
import { useEnquiry } from '../context/EnquiryContext';

interface WhiteLabelingSectionProps {
  className?: string;
}

export function WhiteLabelingSection({ className = '' }: WhiteLabelingSectionProps) {
  const { openEnquiryModal } = useEnquiry();

  const packSizes = [
    { weight: '250 g', type: 'Retail', visualHeight: 'h-24', sub: 'Stand-up pouches & consumer jars' },
    { weight: '500 g', type: 'Retail', visualHeight: 'h-28', sub: 'E-commerce & supermarket packs' },
    { weight: '1 kg', type: 'Retail', visualHeight: 'h-32', sub: 'Family size & food service tubs' },
    { weight: '5 kg', type: 'Bulk', visualHeight: 'h-36', sub: 'Poly-lined boxes & catering bags' },
    { weight: '25 kg', type: 'Bulk', visualHeight: 'h-44', sub: 'Heavy-duty export master cartons' },
  ];

  const steps = [
    {
      step: '1',
      title: 'Share brand',
      description: 'Send your logo, artwork and label details.',
      highlight: 'Full OEM support',
    },
    {
      step: '2',
      title: 'Choose product',
      description: 'Select colour, form or spiced blend & size.',
      highlight: '3 Colours × 3 Forms',
    },
    {
      step: '3',
      title: 'Pack & seal',
      description: 'Packed hygienically under your own label.',
      highlight: 'Food-grade certified',
    },
    {
      step: '4',
      title: 'Dispatch',
      description: 'Shipped directly to your destination.',
      highlight: 'FOB Mundra / CIF',
    },
  ];

  return (
    <section id="packaging" className={`py-16 sm:py-24 bg-white border-b border-stone-200 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="text-xs font-bold uppercase tracking-widest text-[#C5A059]">
            PACKAGING
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#0A192F] tracking-tight">
            Custom Packing &amp; White Labeling
          </h2>
          <p className="text-sm sm:text-base text-stone-600 leading-relaxed">
            Five pack sizes from retail to bulk, with your own branding if you wish. Certified hygienic packing for global supermarkets, distributors, and brands.
          </p>
        </div>

        {/* Five Pack Sizes Graphic (Matching PDF Page 4) */}
        <div className="p-8 sm:p-12 bg-[#FAF8F5] rounded-2xl border border-stone-200 shadow-xs">
          <div className="text-center mb-8">
            <span className="text-xs font-bold uppercase tracking-wider text-stone-500">
              5 Standard Pack Sizes Available Across All Varieties
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 items-end justify-center">
            {packSizes.map((pack) => (
              <div key={pack.weight} className="flex flex-col items-center text-center space-y-3 group">
                {/* Visual Pouch / Sack Graphic */}
                <div
                  className={`w-28 sm:w-32 ${pack.visualHeight} bg-gradient-to-b from-[#C5A059] to-[#A37B34] rounded-lg shadow-sm p-3 flex flex-col justify-between items-center text-white border border-[#8C6728] relative group-hover:scale-105 transition-transform duration-200`}
                >
                  <div className="text-[10px] font-bold uppercase tracking-wider text-amber-100/90 bg-black/15 px-2 py-0.5 rounded">
                    NEXARIS
                  </div>
                  <div className="text-center">
                    <span className="text-[10px] uppercase tracking-widest font-mono text-amber-200 block">JAGGERY</span>
                    <span className="text-xs font-extrabold text-white">{pack.weight}</span>
                  </div>
                  <div className="w-8 h-1 bg-white/30 rounded-full" />
                </div>

                <div>
                  <div className="font-serif font-bold text-lg text-[#0A192F]">
                    {pack.weight}
                  </div>
                  <div className="text-xs font-bold uppercase tracking-wider text-[#C5A059]">
                    {pack.type}
                  </div>
                  <p className="text-[11px] text-stone-500 mt-1 max-w-[120px]">
                    {pack.sub}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Packing Options: Retail Packs vs Bulk Packing (Matching PDF Page 4) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Retail Packs */}
          <div className="p-8 rounded-xl bg-white border border-stone-200 hover:border-[#C5A059] transition-all shadow-xs space-y-4">
            <div className="w-10 h-10 rounded-lg bg-[#FAF8F5] text-[#C5A059] flex items-center justify-center font-bold">
              <Package className="w-5 h-5 text-[#C5A059]" />
            </div>
            <h3 className="text-2xl font-serif font-bold text-[#0A192F]">
              Retail Packs
            </h3>
            <p className="text-sm text-stone-600 leading-relaxed">
              250 g, 500 g and 1 kg pouches, jars and boxes for supermarkets, retail stores and e-commerce.
            </p>
            <ul className="pt-3 border-t border-stone-100 space-y-2 text-xs text-stone-600">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Stand-up zip pouches with transparent viewing window</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Food-grade tamper-evident PET plastic jars and tubs</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Custom artwork, barcode printing &amp; international nutritional labeling</span>
              </li>
            </ul>
          </div>

          {/* Bulk Packing */}
          <div className="p-8 rounded-xl bg-white border border-stone-200 hover:border-[#C5A059] transition-all shadow-xs space-y-4">
            <div className="w-10 h-10 rounded-lg bg-[#FAF8F5] text-[#0A192F] flex items-center justify-center font-bold">
              <Layers className="w-5 h-5 text-[#0A192F]" />
            </div>
            <h3 className="text-2xl font-serif font-bold text-[#0A192F]">
              Bulk Packing
            </h3>
            <p className="text-sm text-stone-600 leading-relaxed">
              5 kg and 25 kg poly-lined bags and master cartons for distributors, repackers and food industry.
            </p>
            <ul className="pt-3 border-t border-stone-100 space-y-2 text-xs text-stone-600">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Multi-wall food-grade poly-lined kraft bags (moisture-barrier)</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Heavy-duty 5-ply corrugated master export cartons</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Palletized container lots with strapping &amp; stretch film wrapping</span>
              </li>
            </ul>
          </div>
        </div>

        {/* WHITE LABELING — HOW IT WORKS (Matching PDF Page 4) */}
        <div className="space-y-8 pt-4">
          <div className="text-center space-y-1">
            <div className="text-xs font-bold uppercase tracking-wider text-[#C5A059]">
              4 SIMPLE STEPS
            </div>
            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#0A192F]">
              WHITE LABELING — HOW IT WORKS
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((item) => (
              <div
                key={item.step}
                className="p-6 rounded-xl bg-[#FAF8F5] border border-stone-200 space-y-3 relative flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-full bg-[#0A192F] text-[#D4AF37] font-bold flex items-center justify-center text-sm font-mono mb-4">
                    {item.step}
                  </div>
                  <h4 className="text-lg font-serif font-bold text-[#0A192F]">
                    {item.title}
                  </h4>
                  <p className="text-xs text-stone-600 leading-relaxed mt-1">
                    {item.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-stone-200/60 text-[11px] font-semibold text-[#C5A059]">
                  {item.highlight}
                </div>
              </div>
            ))}
          </div>

          {/* Action Trigger */}
          <div className="text-center pt-4">
            <button
              type="button"
              onClick={() => openEnquiryModal(undefined, 'jaggery', 'buyer')}
              className="inline-flex items-center gap-2 px-8 py-3.5 text-xs font-bold uppercase tracking-wider text-[#0A192F] bg-[#D4AF37] hover:bg-[#C5A059] rounded-lg transition-colors cursor-pointer shadow-md"
            >
              <span>Inquire About White Labeling</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}

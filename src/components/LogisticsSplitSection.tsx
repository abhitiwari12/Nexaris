import React from 'react';
import { Ship, Anchor, CheckCircle } from 'lucide-react';
import { Link } from '../context/RouterContext';

export function LogisticsSplitSection() {
  return (
    <section className="py-20 lg:py-24 bg-[#FAF8F5] border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Column: Transition from Heritage to Modern Retail & Global Logistics */}
          <div>
            <span className="text-xs uppercase tracking-widest text-[#D4AF37] font-bold block mb-2 font-mono">
              EVOLUTION & MODERN CONVENIENCE
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#0A192F] tracking-tight mb-6 leading-tight">
              FROM TRADITIONAL HOMES <br />
              <span className="text-[#D4AF37]">TO GLOBAL SHIPPING TERMINALS</span>
            </h2>

            <div className="space-y-4 text-slate-700 font-sans text-sm sm:text-base leading-relaxed">
              <p>
                Several decades ago, families used to grind their spices manually at home and sort pulses by hand for daily meals. While preserving tradition, it was time-intensive and vulnerable to batch-to-batch variations in purity and moisture.
              </p>
              <p>
                Spices and pulses have an ancient history, especially in India, where they represent culinary soul and wellness. In every home and in every province across the country, different spices and pulse blends are used to create distinctive aroma and wholesome nutrition.
              </p>
              <p>
                To make this process effortless for modern households and international markets, <strong>NEXARIS</strong> visualised the concept of ready-to-use, aromatic ground spices, machine-cleaned pulses, and vacuum-sealed dry fruits. We combine domestic retail convenience with ocean freight container execution via Mundra and Kandla ports.
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-200 space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-[#D4AF37]/20 flex items-center justify-center text-[#D4AF37] shrink-0 mt-0.5">
                  <CheckCircle className="w-3.5 h-3.5" />
                </div>
                <div className="text-xs sm:text-sm text-slate-700">
                  <strong className="text-[#0A192F]">Consumer Retail Division:</strong> Multi-layer barrier pouches (100g, 250g, 500g, 1kg) retaining essential oils and freshness.
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-[#D4AF37]/20 flex items-center justify-center text-[#D4AF37] shrink-0 mt-0.5">
                  <CheckCircle className="w-3.5 h-3.5" />
                </div>
                <div className="text-xs sm:text-sm text-slate-700">
                  <strong className="text-[#0A192F]">Global Export Desk:</strong> 20ft & 40ft FCL container consolidation, palletization, fumigation, and Phytosanitary documentation.
                </div>
              </div>
            </div>

            <div className="mt-8">
              <Link
                href="/export"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#0A192F] hover:bg-[#1E293B] text-white text-xs font-bold uppercase tracking-wider rounded-sm transition-colors shadow-sm"
              >
                <span>Learn About Export Division</span>
                <Ship className="w-3.5 h-3.5 text-[#D4AF37]" />
              </Link>
            </div>
          </div>

          {/* Right Column: Handshake photo with shipping containers matching Screenshot 2 */}
          <div className="relative">
            <div className="relative rounded-sm overflow-hidden shadow-xl border border-slate-200">
              <img
                src="/images/brand/logistics_handshake.jpg"
                alt="NEXARIS International Trade Logistics and Handshake"
                className="w-full h-[380px] sm:h-[450px] object-cover hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A192F]/80 via-transparent to-transparent pointer-events-none" />
              
              <div className="absolute bottom-4 left-4 right-4 bg-[#0A192F]/90 backdrop-blur-xs p-4 rounded-sm border border-slate-700 text-white shadow-lg">
                <div className="flex items-center gap-3">
                  <Anchor className="w-6 h-6 text-[#D4AF37] shrink-0" />
                  <div>
                    <div className="font-serif font-bold text-sm text-white">Direct Seaport Cargo Dispatch</div>
                    <div className="text-xs text-slate-300">FOB Mundra (INMUN) & Kandla (IXY) with verified container loading audits</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

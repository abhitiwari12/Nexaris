import React from 'react';
import { Globe2, ShieldCheck, MapPin, Building2 } from 'lucide-react';
import { Link } from '../context/RouterContext';

export function GlobalPresenceSection() {
  return (
    <section className="py-20 lg:py-24 bg-white border-b border-slate-200 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Column: World Map Graphic / Trade Reach */}
          <div className="relative">
            <div className="bg-[#0A192F] p-8 sm:p-10 rounded-sm border border-slate-800 shadow-xl relative overflow-hidden">
              {/* Subtle background glow */}
              <div className="absolute top-0 right-0 -mt-12 -mr-12 w-64 h-64 bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none" />
              
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-800">
                <div className="flex items-center gap-2 text-white">
                  <Globe2 className="w-5 h-5 text-[#D4AF37]" />
                  <span className="font-serif font-bold text-sm tracking-wider uppercase">GLOBAL REACH & DOMESTIC RETAIL</span>
                </div>
                <span className="text-xs font-mono text-[#D4AF37] font-semibold bg-[#D4AF37]/10 px-2 py-0.5 rounded">
                  EST. GUJARAT
                </span>
              </div>

              {/* Styled Vector Map Representation */}
              <div className="relative my-4 aspect-[16/10] bg-[#0F172A] rounded border border-slate-800 p-4 flex flex-col justify-between">
                <div className="grid grid-cols-3 gap-2 text-center text-xs">
                  <div className="p-3 bg-[#1E293B]/70 rounded border border-slate-700/60">
                    <span className="text-[#D4AF37] font-bold text-sm block">15+</span>
                    <span className="text-slate-400 text-[11px]">Indian States</span>
                  </div>
                  <div className="p-3 bg-[#1E293B]/70 rounded border border-slate-700/60">
                    <span className="text-[#D4AF37] font-bold text-sm block">12+</span>
                    <span className="text-slate-400 text-[11px]">Export Markets</span>
                  </div>
                  <div className="p-3 bg-[#1E293B]/70 rounded border border-slate-700/60">
                    <span className="text-[#D4AF37] font-bold text-sm block">02</span>
                    <span className="text-slate-400 text-[11px]">Gujarat Seaports</span>
                  </div>
                </div>

                {/* Key Corridors */}
                <div className="space-y-2 py-2">
                  <div className="flex items-center justify-between text-xs text-slate-300">
                    <span className="font-medium">Mundra Port & Kandla</span>
                    <span className="text-[#D4AF37] font-mono">FOB Gateway</span>
                  </div>
                  <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-[#D4AF37] h-full w-[85%]" />
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-slate-400">
                    <span>GCC (UAE, Saudi, Oman) · Southeast Asia · Europe</span>
                    <span className="text-emerald-400 font-semibold">Active Lanes</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-2 text-[11px] text-slate-400 border-t border-slate-800">
                  <MapPin className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
                  <span>Headquartered in Gandhinagar, Gujarat, India</span>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
                <span>Direct Container Stuffing</span>
                <span className="text-slate-200 font-medium">SGS / Geo-Chem Inspection</span>
              </div>
            </div>
          </div>

          {/* Right Column: About Us Story matching Screenshot 1 & 2 */}
          <div>
            <span className="text-xs uppercase tracking-widest text-[#D4AF37] font-bold block mb-2 font-mono">
              HERITAGE & VISION
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#0A192F] tracking-tight mb-6 leading-tight">
              ABOUT <span className="text-[#D4AF37]">US</span>
            </h2>

            <div className="space-y-4 text-slate-700 font-sans text-sm sm:text-base leading-relaxed">
              <p>
                NEXARIS operates with deep roots across Indian agricultural markets and over 15 states nationwide. We are pleased to connect consumers and commercial food enterprises with authentic, unadulterated spices, staple pulses, and handpicked dry fruits.
              </p>
              <p>
                Spices and pulses have an ancient history, especially in India, where they are central to lifestyle, wellness, and culinary heritage. In every home and province, diverse aromatic blends and nutrient-dense lentils create distinct flavor profiles and vital daily sustenance.
              </p>
              <p>
                To make this experience seamless for modern households, NEXARIS visualised ready-to-use, airtight stand-up retail packs alongside standard commercial bulk shipments for international traders.
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-200 flex flex-wrap items-center gap-6">
              <Link
                href="/products"
                className="px-6 py-3 bg-[#0A192F] text-white hover:bg-[#1E293B] text-xs font-bold uppercase tracking-wider rounded-sm transition-colors"
              >
                View Retail Range
              </Link>
              <Link
                href="/contact"
                className="text-xs font-bold uppercase tracking-wider text-[#0A192F] hover:text-[#D4AF37] transition-colors"
              >
                Speak with Trade Desk →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

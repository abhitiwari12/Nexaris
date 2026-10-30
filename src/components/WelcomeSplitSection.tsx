import React from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { Link } from '../context/RouterContext';

export function WelcomeSplitSection() {
  return (
    <section className="py-20 lg:py-24 bg-[#FAF8F5] border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Column: Brand Story */}
          <div>
            <span className="text-xs uppercase tracking-widest text-[#D4AF37] font-bold block mb-2 font-mono">
              WELCOME TO
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#0A192F] tracking-tight mb-6 leading-tight">
              NEXARIS GROUP <br />
              <span className="text-[#D4AF37]">OF COMPANIES</span>
            </h2>

            <div className="space-y-4 text-slate-700 font-sans text-sm sm:text-base leading-relaxed">
              <p>
                NEXARIS emerged onto the agricultural scene with a clear mission: to deliver pure, top-notch food products directly to consumer households and global import markets. Our journey began with a steadfast commitment to origin purity and farmer-level transparency.
              </p>
              <p>
                As we steadily expanded our infrastructure, we ventured across three high-demand food verticals: <strong>Whole & Ground Spices</strong>, <strong>Protein-Rich Dal & Pulses</strong>, and <strong>Finest Grade Dry Fruits & Nuts</strong>. Our retail consumer packaging sits proudly on supermarket shelves, while our export desk executes reliable container consignments worldwide.
              </p>
              <p>
                Over time, our relentless pursuit of uncompromising quality has established NEXARIS as a trusted household and commercial brand, operating out of Gandhinagar, Gujarat, with modern processing mills and nationwide distribution.
              </p>
            </div>

            {/* Core Pillars */}
            <div className="mt-8 pt-6 border-t border-slate-200 grid grid-cols-2 gap-3 text-xs sm:text-sm font-semibold text-[#0A192F]">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <span>Sortex 99.5% Machine Cleaned</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <span>Zero Synthetic Adulteration</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <span>Modern Stand-up Retail Pouches</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <span>Direct APMC Farm Procurement</span>
              </div>
            </div>

            <div className="mt-8">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#0A192F] hover:text-[#D4AF37] transition-colors group"
              >
                <span>Read Full Company Profile</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Right Column: High Quality Photographic Asset */}
          <div className="relative">
            <div className="relative rounded-sm overflow-hidden shadow-xl border border-slate-200">
              <img
                src="/images/brand/spices_pulses_bowls.jpg"
                alt="NEXARIS Ceramic Spice and Pulse Bowls"
                className="w-full h-[400px] sm:h-[480px] object-cover hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A192F]/60 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-xs p-4 rounded-sm border border-slate-200 shadow-md">
                <div className="flex items-center justify-between text-xs">
                  <div>
                    <span className="font-bold text-[#0A192F] block font-serif">Clean Origin Spices & Pulses</span>
                    <span className="text-slate-500 text-[11px]">Sourced directly from Gujarat and Rajasthan farming tracts</span>
                  </div>
                  <span className="text-[#D4AF37] font-mono font-bold">100% PURE</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

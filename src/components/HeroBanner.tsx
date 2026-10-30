import React from 'react';
import { Download, ArrowRight, ShieldCheck, Award } from 'lucide-react';
import { Link } from '../context/RouterContext';
import { useEnquiry } from '../context/EnquiryContext';
import { SITE_CONFIG } from '../config/site';

export function HeroBanner() {
  const { openEnquiryModal } = useEnquiry();

  return (
    <section className="relative min-h-[580px] lg:min-h-[640px] flex items-center bg-[#0A192F] overflow-hidden">
      {/* Background image with gradient overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/brand/hero_spices_pulses.jpg"
          alt="Premium Spices and Pulses Assortment"
          className="w-full h-full object-cover object-center"
        />
        {/* Navy gradient vignette to ensure high legibility */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A192F]/95 via-[#0A192F]/80 to-[#0A192F]/60" />
        <div className="absolute inset-0 bg-radial-gradient from-transparent to-[#0A192F]/40" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
        <div className="max-w-3xl">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#D4AF37]/15 border border-[#D4AF37]/30 rounded text-[#D4AF37] text-xs font-bold tracking-widest uppercase mb-6">
            <Award className="w-3.5 h-3.5" />
            <span>CONSUMER RETAIL BRAND & GLOBAL AGRI EXPORT</span>
          </div>

          {/* Main Title matching Screenshot 1 */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-bold text-white tracking-tight uppercase leading-[1.1] mb-6">
            NEXARIS FOODS AND <span className="text-[#D4AF37]">AGRI EXPORT</span>
          </h1>

          {/* Subtext matching Screenshot 1 */}
          <p className="text-base sm:text-lg text-slate-200 font-sans leading-relaxed mb-8 max-w-2xl font-light">
            Dedicated to providing premier quality agro commodities to consumer retail shelves and global seaports. From farm origin sourcing to automated Sortex grading, our vision is delivering unadulterated excellence in every pack.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-4">
            <a
              href={SITE_CONFIG.cataloguePdfUrl}
              download="NEXARIS_Product_Catalogue.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-6 py-3.5 bg-[#D4AF37] hover:bg-[#C5A059] text-[#0A192F] font-bold text-xs uppercase tracking-wider rounded-sm transition-all shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
            >
              <Download className="w-4 h-4" />
              <span>Download Brochure</span>
            </a>

            <Link
              href="/products"
              className="inline-flex items-center gap-2.5 px-6 py-3.5 bg-white/10 hover:bg-white/20 text-white font-semibold text-xs uppercase tracking-wider rounded-sm border border-white/20 transition-all backdrop-blur-xs"
            >
              <span>Explore Products</span>
              <ArrowRight className="w-4 h-4 text-[#D4AF37]" />
            </Link>

            <button
              type="button"
              onClick={() => openEnquiryModal(undefined, 'spices')}
              className="inline-flex items-center gap-2 px-5 py-3.5 text-xs font-semibold text-slate-300 hover:text-white uppercase tracking-wider transition-colors"
            >
              <span>Quick Trade RFQ →</span>
            </button>
          </div>

          {/* Trust Highlights */}
          <div className="mt-12 pt-8 border-t border-white/15 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs text-slate-300 font-medium">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#D4AF37] shrink-0" />
              <span>99.5% Sortex Cleaned</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#D4AF37] shrink-0" />
              <span>Consumer Retail Pouches</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#D4AF37] shrink-0" />
              <span>FOB Mundra & Kandla</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#D4AF37] shrink-0" />
              <span>FSSAI & APEDA Certified</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

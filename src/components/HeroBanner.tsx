import React from 'react';
import { Download, ArrowRight, MessageSquare } from 'lucide-react';
import { Link } from '../context/RouterContext';
import { useEnquiry } from '../context/EnquiryContext';
import { SITE_CONFIG } from '../config/site';

export function HeroBanner() {
  const { openEnquiryModal } = useEnquiry();

  return (
    <section className="relative min-h-[520px] lg:min-h-[580px] flex items-center bg-[#0A192F] overflow-hidden">
      {/* Background Image: Clay and ceramic bowls of authentic spices */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/brand/spices_pulses_bowls.jpg"
          alt="NEXARIS Spices & Agricultural Produce"
          className="w-full h-full object-cover object-center filter brightness-90 contrast-110"
        />
        {/* Cinematic gradient overlay for optimal text contrast matching reference */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A192F]/95 via-[#0A192F]/75 to-transparent" />
        <div className="absolute inset-0 bg-black/25" />
      </div>

      {/* Floating Vertical "Enquiry Now" Side Tab (Matching Screenshot Left Edge) */}
      <button
        type="button"
        onClick={() => openEnquiryModal(undefined, 'spices')}
        className="fixed left-0 top-1/2 -translate-y-1/2 z-40 bg-[#0A192F] hover:bg-[#D4AF37] text-white hover:text-[#0A192F] border-r border-y border-[#D4AF37] shadow-xl py-4 px-2 rounded-r-md transition-all group flex flex-col items-center gap-2 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
        title="Open Trade Enquiry Form"
        aria-label="Enquiry Now"
      >
        <span
          className="text-xs font-bold uppercase tracking-widest font-mono text-[#D4AF37] group-hover:text-[#0A192F] [writing-mode:vertical-rl] rotate-180 select-none py-1"
        >
          Enquiry Now
        </span>
        <MessageSquare className="w-4 h-4 text-[#D4AF37] group-hover:text-[#0A192F] shrink-0" />
      </button>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="max-w-2xl pl-4 sm:pl-8">
          {/* Main Headline: NEXARIS */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif font-black text-white tracking-tight uppercase leading-tight mb-4">
            NEXARIS
          </h1>

          {/* Statement matching reference screenshot */}
          <p className="text-sm sm:text-base lg:text-lg text-slate-200 font-sans leading-relaxed mb-8 font-normal max-w-xl text-shadow-sm">
            NEXARIS has consistently aimed to provide quality products. From the beginning, our goal and vision have been clear, focusing on delivering excellence in every product we offer.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-4">
            <a
              href="#categories"
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#D4AF37] hover:bg-[#C5A059] text-[#0A192F] font-bold text-xs uppercase tracking-wider rounded-sm transition-all shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
            >
              <span>Explore Categories</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            <a
              href={SITE_CONFIG.cataloguePdfUrl}
              download="NEXARIS_Product_Catalogue.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-white/10 hover:bg-white/20 text-white font-semibold text-xs uppercase tracking-wider rounded-sm border border-white/30 transition-all backdrop-blur-xs"
            >
              <Download className="w-4 h-4 text-[#D4AF37]" />
              <span>Download Brochure</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

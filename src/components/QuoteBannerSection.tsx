import React from 'react';
import { Quote } from 'lucide-react';

export function QuoteBannerSection() {
  return (
    <section className="relative py-24 bg-[#0A192F] text-white overflow-hidden border-y border-[#1E293B]">
      {/* Background with textured photo overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/brand/spices_pulses_bowls.jpg"
          alt="Spices and Agri Background"
          className="w-full h-full object-cover object-center opacity-25 filter grayscale contrast-125"
        />
        <div className="absolute inset-0 bg-[#0A192F]/90" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <Quote className="w-12 h-12 text-[#D4AF37] mx-auto mb-6 opacity-80" />

        <blockquote className="font-serif font-bold text-xl sm:text-2xl md:text-3xl text-white uppercase tracking-tight leading-relaxed max-w-4xl mx-auto">
          “Good quality creates a loyal customer. And, loyal customers don't just come back, they recommend you, they spread a good word about you, and they become your backbone.”
        </blockquote>

        <div className="w-16 h-0.5 bg-[#D4AF37] mx-auto mt-8 mb-4" />

        <div className="text-xs font-mono uppercase tracking-widest text-[#D4AF37] font-semibold">
          NEXARIS FOODS & AGRI EXPORT — QUALITY CREED
        </div>
      </div>
    </section>
  );
}

import React from 'react';
import { ConnectedSection } from '../components/ConnectedSection';
import { CertificateGridSection } from '../components/CertificateGridSection';
import { SITE_CONFIG } from '../config/site';

export function ContactPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#FAF8F5]">
      {/* 1. Header Banner matching Screenshot 9 */}
      <section className="relative py-24 bg-[#0A192F] text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="/images/brand/hero_spices_pulses.jpg"
            alt="NEXARIS Contact Desk"
            className="w-full h-full object-cover opacity-20 filter contrast-125"
          />
          <div className="absolute inset-0 bg-[#0A192F]/85" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="text-xs font-mono uppercase tracking-widest text-[#D4AF37] font-bold block mb-3">
              COMMERCIAL & RETAIL ENQUIRIES
            </span>
            <h1 className="text-3xl sm:text-5xl font-serif font-bold text-white tracking-tight uppercase mb-4">
              WE ARE HERE FOR YOU
            </h1>
            <p className="text-base text-slate-300 font-sans leading-relaxed">
              We're here to help and answer any question you might have regarding retail distribution, supermarket packaging, or international container exports. We look forward to hearing from you.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Connected Section matching Screenshot 9 */}
      <ConnectedSection />

      {/* 3. Certificate Grid */}
      <CertificateGridSection />
    </div>
  );
}

import React from 'react';
import { Shield, Award, Users, CheckCircle, Globe2, Truck, Play } from 'lucide-react';
import { NumbersLedgerSection } from '../components/NumbersLedgerSection';
import { CertificateGridSection } from '../components/CertificateGridSection';
import { QuoteBannerSection } from '../components/QuoteBannerSection';
import { ConnectedSection } from '../components/ConnectedSection';
import { SITE_CONFIG } from '../config/site';

export function AboutPage() {
  const { founders } = SITE_CONFIG;

  return (
    <div className="flex flex-col min-h-screen bg-[#FAF8F5]">
      {/* 1. Header Banner matching Screenshot 4 */}
      <section className="relative py-24 bg-[#0A192F] text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="/images/brand/spices_pulses_bowls.jpg"
            alt="NEXARIS Agro Facilities"
            className="w-full h-full object-cover opacity-20 filter contrast-125"
          />
          <div className="absolute inset-0 bg-[#0A192F]/85" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="text-xs font-mono uppercase tracking-widest text-[#D4AF37] font-bold block mb-3">
              INSTITUTIONAL PROFILE
            </span>
            <h1 className="text-3xl sm:text-5xl font-serif font-bold text-white tracking-tight uppercase mb-4">
              ABOUT OUR COMPANY
            </h1>
            <p className="text-base text-slate-300 font-sans leading-relaxed">
              Established in Gujarat, India, NEXARIS has consistently aimed to provide quality products. From the beginning, our goal and vision have been clear, focusing on delivering uncompromised excellence in every product we offer across spices, pulses, and dry fruits.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Our History Split matching Screenshot 4 */}
      <section className="py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <span className="text-xs uppercase tracking-widest text-[#D4AF37] font-bold block mb-2 font-mono">
                FOUNDATION & GROWTH
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#0A192F] tracking-tight mb-6">
                OUR <span className="text-[#D4AF37]">HISTORY</span>
              </h2>

              <div className="space-y-4 text-slate-700 font-sans text-sm sm:text-base leading-relaxed">
                <p>
                  NEXARIS was founded with a clear vision: to bring farm-gate integrity, automated Sortex cleanliness, and direct value to both domestic consumers and overseas commodity importers.
                </p>
                <p>
                  Starting with select agricultural commodities in Saurashtra and Northern Gujarat, we swiftly grew to establish specialized processing facilities for whole seeds, essential dal varieties, and premium dry fruits. Our products garnered immediate acclaim not only within Gujarat but across India as a trusted standard.
                </p>
                <p>
                  Today, NEXARIS distributes consumer retail packs through established supermarket networks and dispatches 20ft/40ft container freight through Mundra and Kandla ports to international trade partners worldwide.
                </p>
              </div>
            </div>

            {/* Emblem Card matching Screenshot 4 */}
            <div className="flex items-center justify-center p-12 bg-gradient-to-br from-[#0A192F] to-[#1E293B] rounded-sm border-2 border-[#D4AF37]/40 shadow-xl text-center min-h-[360px]">
              <div className="space-y-4">
                <div className="w-20 h-20 rounded-full bg-[#1E293B] border-2 border-[#D4AF37] flex items-center justify-center mx-auto shadow-inner">
                  <span className="font-serif text-3xl font-black text-[#D4AF37]">N</span>
                </div>
                <h3 className="font-serif font-bold text-2xl text-white tracking-widest uppercase">
                  NEXARIS
                </h3>
                <div className="text-xs font-mono uppercase tracking-widest text-[#D4AF37] font-semibold">
                  FOODS & AGRI EXPORT PVT. LTD.
                </div>
                <p className="text-xs text-slate-400 max-w-xs mx-auto pt-2 border-t border-slate-700">
                  Headquartered in Gandhinagar, Gujarat, India with comprehensive agro processing capabilities.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Facility Photo & Global Footprint matching Screenshot 4 & 5 */}
      <section className="py-20 bg-[#FAF8F5] border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Facility image matching Screenshot 4 */}
            <div className="rounded-sm overflow-hidden shadow-xl border border-slate-200">
              <img
                src="/images/brand/processing_facility.jpg"
                alt="NEXARIS Gujarat Modern Agro Mill"
                className="w-full h-[380px] object-cover"
              />
              <div className="p-4 bg-white border-t border-slate-200 flex items-center justify-between text-xs">
                <span className="font-serif font-bold text-[#0A192F]">Gujarat Agro Processing Campus</span>
                <span className="text-[#D4AF37] font-mono font-bold">50 TONS / DAY</span>
              </div>
            </div>

            {/* Story Right matching Screenshot 4 */}
            <div>
              <span className="text-xs uppercase tracking-widest text-[#D4AF37] font-bold block mb-2 font-mono">
                REGIONAL & OVERSEAS REACH
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#0A192F] tracking-tight mb-6">
                ABOUT <span className="text-[#D4AF37]">NEXARIS EXPORT</span>
              </h2>

              <div className="space-y-4 text-slate-700 font-sans text-sm sm:text-base leading-relaxed">
                <p>
                  NEXARIS has proudly expanded its global footprint by exporting premium-quality spices, lentils, and dry fruits to the UAE, GCC, and European hubs. With rising demand for authentic Indian staples and pure food standards, we supply supermarkets, wholesalers, and food manufacturers.
                </p>
                <p>
                  Our products meet strict international quality criteria, ensuring freshness, zero adulteration, and rich aroma in every pack. Through reliable shipping lines operating from Mundra Port and Kandla, we maintain steady delivery timelines.
                </p>
              </div>

              {/* UAE & India Trade Badge matching Screenshot 5 */}
              <div className="mt-8 p-4 bg-white rounded border border-slate-200 flex items-center justify-around text-xs font-mono font-bold text-[#0A192F]">
                <div className="flex items-center gap-2">
                  <span>🇮🇳</span>
                  <span>INDIA PROCUREMENT & MILLING</span>
                </div>
                <span className="text-slate-300">|</span>
                <div className="flex items-center gap-2">
                  <span>🇦🇪</span>
                  <span>GCC EXPORT DESK</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Virtual Facility Tour Cards matching Screenshot 5 */}
      <section className="py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-xs uppercase tracking-widest text-slate-500 font-bold block mb-2 font-mono">
              TRANSPARENCY & QUALITY ASSURANCE
            </span>
            <h2 className="text-3xl font-serif font-bold text-[#0A192F] tracking-tight">
              INSIDE OUR <span className="text-[#D4AF37]">PROCESSING FACILITIES</span>
            </h2>
            <div className="w-16 h-0.5 bg-[#D4AF37] mx-auto mt-4" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Tour Card 1 */}
            <div className="relative rounded-sm overflow-hidden border border-slate-200 shadow-md group">
              <div className="relative aspect-[16/9] bg-slate-900">
                <img
                  src="/images/brand/processing_facility.jpg"
                  alt="Container Loading Facility"
                  className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-[#0A192F]/40 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-red-600 text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                    <Play className="w-7 h-7 fill-white ml-1" />
                  </div>
                </div>
                <div className="absolute top-3 left-3 bg-[#0A192F]/80 backdrop-blur-xs text-white text-xs px-3 py-1 rounded font-mono">
                  Loading Apron & Container Stuffing
                </div>
              </div>
              <div className="p-4 bg-[#FAF8F5]">
                <h4 className="font-serif font-bold text-sm text-[#0A192F] mb-1">
                  Container Staging & Palletization Bay
                </h4>
                <p className="text-xs text-slate-600">
                  Direct loading of 20ft and 40ft containers with fumigation, desiccants, and seal verification.
                </p>
              </div>
            </div>

            {/* Tour Card 2 */}
            <div className="relative rounded-sm overflow-hidden border border-slate-200 shadow-md group">
              <div className="relative aspect-[16/9] bg-slate-900">
                <img
                  src="/images/brand/spices_pulses_bowls.jpg"
                  alt="Optical Sortex Machine Line"
                  className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-[#0A192F]/40 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-red-600 text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                    <Play className="w-7 h-7 fill-white ml-1" />
                  </div>
                </div>
                <div className="absolute top-3 left-3 bg-[#0A192F]/80 backdrop-blur-xs text-white text-xs px-3 py-1 rounded font-mono">
                  Bühler Optical Sortex & De-stoning Line
                </div>
              </div>
              <div className="p-4 bg-[#FAF8F5]">
                <h4 className="font-serif font-bold text-sm text-[#0A192F] mb-1">
                  Sortex 99.5% Cleaning Line
                </h4>
                <p className="text-xs text-slate-600">
                  Multi-camera high speed optical sorting removing damaged grains, foreign seeds, and stones.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Quote Banner */}
      <QuoteBannerSection />

      {/* 6. Numbers Ledger */}
      <NumbersLedgerSection />

      {/* 7. Certificates Grid */}
      <CertificateGridSection />

      {/* 8. Connected Section */}
      <ConnectedSection />
    </div>
  );
}

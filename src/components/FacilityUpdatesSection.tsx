import React from 'react';
import { Building2, ShieldCheck, MapPin, Truck } from 'lucide-react';

export function FacilityUpdatesSection() {
  return (
    <section className="py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header matching Screenshot 2 & 3 */}
        <div className="text-center mb-16">
          <span className="text-xs uppercase tracking-widest text-slate-500 font-bold block mb-2 font-mono">
            MANUFACTURING & INFRASTRUCTURE
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#0A192F] tracking-tight">
            MEDIA & <span className="text-[#D4AF37]">UPDATE</span>
          </h2>
          <div className="w-16 h-0.5 bg-[#D4AF37] mx-auto mt-4" />
        </div>

        {/* 3-Column Split matching Screenshot 2 & 3 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          {/* Card 1: Processing Facility Left */}
          <div className="rounded-sm overflow-hidden border border-slate-200 shadow-md group">
            <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
              <img
                src="/images/brand/processing_facility.jpg"
                alt="NEXARIS Agro Processing Facility Gujarat"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A192F]/80 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-3 left-3 right-3 text-white">
                <span className="text-[10px] uppercase font-bold text-[#D4AF37] block">Plant 01 · Gujarat</span>
                <span className="font-serif font-bold text-sm">Automated Sortex & Milling Facility</span>
              </div>
            </div>
            <div className="p-4 bg-[#FAF8F5] text-xs text-slate-600">
              Equipped with Bühler optical colour sorters, cryogenic spice grinding, and destoning systems running up to 50 tons daily.
            </div>
          </div>

          {/* Card 2: Center Brand Emblem Card matching Screenshot 2 & 3 */}
          <div className="flex flex-col items-center justify-center p-8 bg-[#0A192F] text-white rounded-sm border-2 border-[#D4AF37]/40 shadow-xl text-center relative overflow-hidden h-full min-h-[300px]">
            <div className="w-16 h-16 rounded-full bg-[#1E293B] border border-[#D4AF37] flex items-center justify-center mb-4">
              <span className="font-serif text-2xl font-black text-[#D4AF37]">N</span>
            </div>
            <h3 className="font-serif font-bold text-xl text-white tracking-widest uppercase mb-1">
              NEXARIS
            </h3>
            <span className="text-xs uppercase tracking-widest text-[#D4AF37] font-semibold mb-6">
              FOODS & AGRI EXPORT
            </span>

            {/* Regional Corridors */}
            <div className="flex items-center justify-center gap-4 text-xs font-mono font-medium pt-4 border-t border-slate-800 w-full">
              <div className="flex items-center gap-1.5 bg-[#1E293B] px-3 py-1.5 rounded border border-slate-700">
                <span>🇮🇳</span>
                <span>INDIA HQ</span>
              </div>
              <div className="flex items-center gap-1.5 bg-[#1E293B] px-3 py-1.5 rounded border border-slate-700">
                <span>🇦🇪</span>
                <span>GCC HUB</span>
              </div>
            </div>

            <p className="text-[11px] text-slate-400 mt-4 leading-relaxed font-sans">
              Gandhinagar corporate headquarters with direct container dispatch to Jebel Ali, Singapore, and European gateways.
            </p>
          </div>

          {/* Card 3: Container Yard & Loading Apron Right */}
          <div className="rounded-sm overflow-hidden border border-slate-200 shadow-md group">
            <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
              <img
                src="/images/brand/processing_facility.jpg"
                alt="NEXARIS Logistics and Container Yard"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A192F]/80 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-3 left-3 right-3 text-white">
                <span className="text-[10px] uppercase font-bold text-[#D4AF37] block">Dispatch Terminal</span>
                <span className="font-serif font-bold text-sm">Container Stuffing & Port Transit</span>
              </div>
            </div>
            <div className="p-4 bg-[#FAF8F5] text-xs text-slate-600">
              Dedicated loading apron for 20ft and 40ft heavy cargo containers routed directly to Mundra and Kandla port terminals.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

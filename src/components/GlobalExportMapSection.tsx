import React from 'react';
import { Globe, Anchor, ShieldCheck, Ship, Plane, MapPin } from 'lucide-react';

export function GlobalExportMapSection() {
  return (
    <section id="global-network" className="py-16 sm:py-24 bg-[#0A192F] text-white border-y border-white/10 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="text-xs font-semibold tracking-wider uppercase text-[#D4AF37] flex items-center justify-center gap-2">
            <Globe className="w-4 h-4 text-[#D4AF37]" aria-hidden="true" />
            <span>GLOBAL COMMODITY CORRIDORS</span>
            <span aria-hidden="true" className="text-white/30">·</span>
            <span className="text-stone-300 font-normal">Export Desk Gandhinagar, Gujarat</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white tracking-tight">
            International Maritime Corridors &amp; Port Coordination
          </h2>

          <p className="text-sm sm:text-base text-stone-300 leading-relaxed">
            Coordinating direct origin export from Gujarat via Mundra Port and Deendayal Port (Kandla) to food manufacturers, retail brands, and wholesale distributors across key global trade destinations.
          </p>
        </div>

        {/* Global Map Carrier Card */}
        <div className="relative rounded-xl overflow-hidden border border-white/15 shadow-2xl bg-[#060D1A] group">
          <div className="aspect-16/9 sm:aspect-21/9 relative overflow-hidden">
            <img
              src="/images/commodities/nexaris_global_export_map_1792874713751.jpg"
              alt="NEXARIS B2B Global Trade & Export Network connecting India to 20+ Countries"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover group-hover:scale-101 transition-transform duration-500 ease-out"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B1730] via-transparent to-black/20 pointer-events-none" />
          </div>

          {/* Regional Hub Overlay Cards */}
          <div className="p-6 sm:p-8 bg-[#0B1730]/95 backdrop-blur-md border-t border-white/10 grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
            <div className="p-3.5 rounded bg-white/5 border border-white/10 space-y-1">
              <div className="flex items-center gap-2 text-[#C7A45B] font-bold text-sm font-display">
                <MapPin className="w-4 h-4 shrink-0" />
                <span>Middle East &amp; GCC</span>
              </div>
              <p className="text-[11px] text-[#94A3B8]">Dubai, Jebel Ali, Dammam, Riyadh, Bahrain</p>
            </div>

            <div className="p-3.5 rounded bg-white/5 border border-white/10 space-y-1">
              <div className="flex items-center gap-2 text-[#C7A45B] font-bold text-sm font-display">
                <MapPin className="w-4 h-4 shrink-0" />
                <span>Europe &amp; UK</span>
              </div>
              <p className="text-[11px] text-[#94A3B8]">London, Felixstowe, Hamburg, Rotterdam</p>
            </div>

            <div className="p-3.5 rounded bg-white/5 border border-white/10 space-y-1">
              <div className="flex items-center gap-2 text-[#C7A45B] font-bold text-sm font-display">
                <MapPin className="w-4 h-4 shrink-0" />
                <span>Americas</span>
              </div>
              <p className="text-[11px] text-[#94A3B8]">Los Angeles, NY/NJ, Toronto, Suriname</p>
            </div>

            <div className="p-3.5 rounded bg-white/5 border border-white/10 space-y-1">
              <div className="flex items-center gap-2 text-[#C7A45B] font-bold text-sm font-display">
                <MapPin className="w-4 h-4 shrink-0" />
                <span>Asia-Pacific</span>
              </div>
              <p className="text-[11px] text-[#94A3B8]">Singapore, Malaysia, Vietnam, Australia</p>
            </div>
          </div>
        </div>

        {/* Trade Execution Highlights Strip */}
        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4 text-xs text-[#94A3B8]">
          <div className="p-4 rounded-lg bg-white/5 border border-white/10 flex items-center gap-3">
            <Anchor className="w-6 h-6 text-[#D4AF37] shrink-0" />
            <div>
              <div className="font-bold text-white text-sm font-serif">Mundra &amp; Kandla</div>
              <div className="text-[11px] text-[#94A3B8]">Primary Origin Loading Ports (Gujarat)</div>
            </div>
          </div>

          <div className="p-4 rounded-lg bg-white/5 border border-white/10 flex items-center gap-3">
            <Ship className="w-6 h-6 text-[#C7A45B] shrink-0" />
            <div>
              <div className="font-bold text-white text-sm font-display">FOB &amp; CIF Terms</div>
              <div className="text-[11px] text-[#94A3B8]">Full Container Load (FCL)</div>
            </div>
          </div>

          <div className="p-4 rounded-lg bg-white/5 border border-white/10 flex items-center gap-3">
            <Plane className="w-6 h-6 text-[#C7A45B] shrink-0" />
            <div>
              <div className="font-bold text-white text-sm font-display">Express Sample Delivery</div>
              <div className="text-[11px] text-[#94A3B8]">Pre-shipment Lot Samples</div>
            </div>
          </div>

          <div className="p-4 rounded-lg bg-white/5 border border-white/10 flex items-center gap-3">
            <ShieldCheck className="w-6 h-6 text-emerald-400 shrink-0" />
            <div>
              <div className="font-bold text-white text-sm font-display">SGS &amp; Geo-Chem</div>
              <div className="text-[11px] text-[#94A3B8]">Independent Pre-shipment Audit</div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

import React from 'react';
import { ArrowRight, ShieldCheck, MapPin, Mail, Phone, Linkedin, ExternalLink } from 'lucide-react';
import { SITE_CONFIG, getTelLink, getMailtoLink, getWhatsAppUrl } from '../config/site';
import { useEnquiry } from '../context/EnquiryContext';

export function AboutPage() {
  const { openEnquiryModal } = useEnquiry();
  const { contact, founders } = SITE_CONFIG;

  return (
    <div className="bg-[#F8FAFC] text-[#0B1730]">
      {/* Hero Banner */}
      <section className="bg-[#070F20] text-white py-16 lg:py-20 border-b border-[#162444]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="text-xs font-bold uppercase tracking-widest text-[#C7A45B]">
            CORPORATE PROFILE
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold font-display tracking-tight leading-tight">
            NEXARIS — One Partner. Many Possibilities.
          </h1>
          <p className="text-sm sm:text-base text-[#94A3B8] max-w-3xl leading-relaxed">
            NEXARIS facilitates international B2B trade in premium Indian spices, graded oilseeds, and natural jaggery sweeteners (HS Code Chapter 17). Operating out of Gandhinagar, Gujarat, with ocean dispatch through Mundra Port &amp; Hazira Port.
          </p>
        </div>
      </section>

      {/* Core Philosophy & Gateway Ports */}
      <section className="py-16 bg-white border-b border-[#E2E8F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] space-y-2">
            <h3 className="text-lg font-bold font-display text-[#0B1730]">Direct Sourcing Belts</h3>
            <p className="text-xs text-[#64748B] leading-relaxed">
              Procuring directly from Western Indian agricultural centers (Gujarat &amp; Rajasthan farming belts) and verified sugarcane tracts for farmgate purity.
            </p>
          </div>

          <div className="p-6 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] space-y-2">
            <h3 className="text-lg font-bold font-display text-[#0B1730]">Gateway Infrastructure</h3>
            <p className="text-xs text-[#64748B] leading-relaxed">
              Positioned near Mundra Port &amp; Hazira Port for efficient ocean container loading, mechanized stuffing, and international bill of lading dispatch.
            </p>
          </div>

          <div className="p-6 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] space-y-2">
            <h3 className="text-lg font-bold font-display text-[#0B1730]">100% Quality Protocol</h3>
            <p className="text-xs text-[#64748B] leading-relaxed">
              Every shipment undergoes pre-loading lab testing, Sortex cleaning, and compliance verification with APEDA, Spices Board CRES, and FSSAI food export standards.
            </p>
          </div>
        </div>
      </section>

      {/* Founders & Leadership */}
      <section className="py-16 lg:py-20 bg-[#F5F7FA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="max-w-2xl">
            <div className="text-xs font-bold uppercase tracking-widest text-[#C7A45B]">
              LEADERSHIP
            </div>
            <h2 className="text-2xl sm:text-4xl font-bold font-display mt-1">
              The People Behind NEXARIS
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {founders.map((founder) => (
              <div
                key={founder.name}
                className="bg-white rounded-lg border border-[#E2E8F0] p-6 flex flex-col justify-between space-y-4 shadow-xs"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between pb-3 border-b border-[#F1F5F9]">
                    <div className="w-12 h-12 rounded bg-[#0B1730] text-[#C7A45B] flex items-center justify-center font-bold text-base font-display">
                      {founder.initials}
                    </div>
                    <a
                      href={founder.linkedIn}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 text-[#64748B] hover:text-[#0B1730]"
                    >
                      <Linkedin className="w-5 h-5" />
                    </a>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold font-display text-[#0B1730]">{founder.name}</h3>
                    <p className="text-xs font-bold text-[#C7A45B]">{founder.role}</p>
                  </div>

                  <p className="text-xs text-[#64748B] leading-relaxed">
                    {founder.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#E2E8F0] text-xs">
                  <a
                    href={`mailto:${founder.email}`}
                    className="font-mono text-[#0B1730] hover:text-[#C7A45B] font-medium"
                  >
                    {founder.email}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

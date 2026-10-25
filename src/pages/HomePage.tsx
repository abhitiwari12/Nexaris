import React from 'react';
import {
  ArrowRight,
  ArrowUpRight,
  Mail,
  Phone,
  MapPin,
  Linkedin,
  MessageCircle,
  ExternalLink,
} from 'lucide-react';
import { Link } from '../context/RouterContext';
import { useEnquiry } from '../context/EnquiryContext';
import { SITE_CONFIG, getTelLink, getMailtoLink, getWhatsAppUrl } from '../config/site';
import { CertificationsSection } from '../components/CertificationsSection';
import { DivisionImageGallery } from '../components/DivisionImageGallery';
import { ExportServicesSection } from '../components/ExportServicesSection';
import { ExportFaqSection } from '../components/ExportFaqSection';

export function HomePage() {
  const { openEnquiryModal } = useEnquiry();
  const { contact, founders } = SITE_CONFIG;
  const whatsappUrl = getWhatsAppUrl();

  return (
    <div className="bg-[#F5F7FA] text-[#0B1730]">
      {/* ========================================================
          HERO SECTION — INTERNATIONAL COMMODITY TRADING HOUSE
          ======================================================== */}
      <section className="relative bg-[#0B1730] text-white border-b border-[#162444] overflow-hidden">
        {/* Subtle radial background grid */}
        <div className="absolute inset-0 bg-[radial-gradient(#C7A45B_1px,transparent_1px)] [background-size:32px_32px] opacity-5 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 relative z-10">
          <div className="max-w-4xl space-y-6">
            
            {/* Header Eyebrow */}
            <div className="text-xs font-semibold tracking-wider uppercase text-[#C7A45B] flex flex-wrap items-center gap-2">
              <span>INTERNATIONAL MERCHANT EXPORTER &amp; SOURCING HOUSE</span>
              <span aria-hidden="true" className="text-[#64748B]">·</span>
              <span className="text-[#94A3B8] font-normal">Gujarat, India</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.12] font-display">
              Premier Indian Export &amp; Sourcing House.<br />
              <span className="text-[#C7A45B]">One Partner. Many Possibilities.</span>
            </h1>

            <p className="text-base sm:text-lg text-[#94A3B8] leading-relaxed max-w-3xl">
              Connecting international buyers, food processors, and industrial smelters with premium Indian spices, graded oilseeds, grains, and non-ferrous metal scrap. Delivering verified specifications, Sortex grading, OEM private labeling, and seamless container dispatch from Mundra Port &amp; Hazira Port.
            </p>

            {/* Primary Call to Actions */}
            <div className="pt-2 flex flex-wrap items-center gap-3.5">
              <Link
                href="/spices-oilseeds"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-xs font-semibold uppercase tracking-wider text-[#0B1730] bg-[#C7A45B] hover:bg-[#B89347] rounded-md transition-colors cursor-pointer shadow-xs min-h-[44px]"
              >
                <span>Explore Commodities Catalogue</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>

              <button
                type="button"
                onClick={() => openEnquiryModal()}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-xs font-semibold uppercase tracking-wider text-white border border-[#64748B]/60 hover:bg-white/10 rounded-md transition-colors cursor-pointer min-h-[44px]"
              >
                <span>Request Instant CIF / FOB Quote</span>
                <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>

            {/* B2B Proof & Scope Strip */}
            <div className="pt-8 border-t border-white/10 flex sm:grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 text-xs text-[#94A3B8] max-w-3xl overflow-x-auto snap-x no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0 pb-1">
              <div className="p-3 rounded bg-white/5 border border-white/10 min-w-[140px] sm:min-w-0 snap-start">
                <div className="font-bold text-white text-base font-display tabular-nums">50+ Ports</div>
                <div className="text-[11px] text-[#94A3B8] mt-0.5">Global Ocean Freight</div>
              </div>
              <div className="p-3 rounded bg-white/5 border border-white/10 min-w-[140px] sm:min-w-0 snap-start">
                <div className="font-bold text-white text-base font-display tabular-nums">100% Tested</div>
                <div className="text-[11px] text-[#94A3B8] mt-0.5">SGS / Pre-Shipment</div>
              </div>
              <div className="p-3 rounded bg-white/5 border border-white/10 min-w-[140px] sm:min-w-0 snap-start">
                <div className="font-bold text-white text-base font-display tabular-nums">25+ Grades</div>
                <div className="text-[11px] text-[#94A3B8] mt-0.5">Spices, Grains &amp; Metals</div>
              </div>
              <div className="p-3 rounded bg-white/5 border border-white/10 min-w-[140px] sm:min-w-0 snap-start">
                <div className="font-bold text-white text-base font-display shrink-0">Mundra Port</div>
                <div className="text-[11px] text-[#94A3B8] mt-0.5">Primary Gateway</div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================
          COMMODITY DIVISIONS (CATALOGUES & SPECIFICATIONS)
          ======================================================== */}
      <DivisionImageGallery />

      {/* ========================================================
          EXPORT SERVICES & SOURCING SOLUTIONS
          ======================================================== */}
      <ExportServicesSection />

      {/* ========================================================
          REGULATORY CERTIFICATIONS & COMPLIANCE
          ======================================================== */}
      <CertificationsSection />

      {/* ========================================================
          SECTION G — THE PEOPLE BEHIND NEXARIS (FOUNDERS)
          ======================================================== */}
      <section id="founders" className="py-20 lg:py-24 bg-[#F5F7FA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-10">
            <div className="text-xs font-semibold tracking-wider uppercase text-[#C7A45B] mb-2">
              LEADERSHIP
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#0B1730] font-display tracking-tight">
              The People Behind NEXARIS
            </h2>
            <p className="mt-3 text-sm sm:text-base text-[#64748B] leading-relaxed">
              Meet the partners bringing their individual expertise and responsibilities together to build NEXARIS.
            </p>
          </div>

          {/* Mobile Swipe Hint */}
          <div className="md:hidden flex items-center justify-between text-[11px] text-[#C7A45B] font-semibold mb-3 px-1">
            <span>Partners &amp; Leadership</span>
            <span>Swipe horizontally →</span>
          </div>

          <div className="flex md:grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 overflow-x-auto snap-x snap-mandatory no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0 pb-4">
            {founders.map((founder) => (
              <div
                key={founder.name}
                className="bg-white rounded-lg border border-[#E2E8F0] hover:border-[#C7A45B] transition-all duration-200 p-6 flex flex-col justify-between shadow-xs min-w-[85vw] sm:min-w-[300px] md:min-w-0 snap-start"
              >
                <div className="space-y-4">
                  {/* Monogram Avatar & LinkedIn Button */}
                  <div className="flex items-center justify-between pb-4 border-b border-[#F5F7FA]">
                    <div className="w-12 h-12 rounded-md bg-[#0B1730] text-[#C7A45B] flex items-center justify-center font-display font-bold text-base">
                      {founder.initials}
                    </div>

                    <a
                      href={founder.linkedIn}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2.5 text-[#64748B] hover:text-[#0B1730] hover:bg-[#F5F7FA] rounded-md transition-colors min-w-[40px] min-h-[40px] flex items-center justify-center"
                      aria-label={`View ${founder.name}'s LinkedIn profile`}
                      title="LinkedIn Profile (opens in a new tab)"
                    >
                      <Linkedin className="w-5 h-5 text-[#0B1730] hover:text-[#C7A45B] transition-colors" />
                    </a>
                  </div>

                  {/* Name and Role */}
                  <div>
                    <h3 className="text-lg font-bold text-[#0B1730] font-display">
                      {founder.name}
                    </h3>
                    <p className="text-xs font-semibold text-[#C7A45B] mt-1">
                      {founder.role}
                    </p>
                  </div>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed">
                    {founder.description}
                  </p>
                </div>

                {/* Direct Clickable Email Link */}
                <div className="mt-6 pt-4 border-t border-[#E2E8F0] flex items-center text-xs">
                  <a
                    href={`mailto:${founder.email}`}
                    className="font-mono text-[#0B1730] hover:text-[#C7A45B] font-medium transition-colors inline-flex items-center gap-1.5"
                  >
                    <Mail className="w-3.5 h-3.5 text-[#C7A45B]" aria-hidden="true" />
                    <span>{founder.email}</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================
          SECTION H — INTERNATIONAL BUYER FAQS
          ======================================================== */}
      <ExportFaqSection />

      {/* ========================================================
          SECTION I — BUYER AND SUPPLIER ENQUIRIES
          ======================================================== */}
      <section id="enquiry" className="py-20 lg:py-24 bg-white border-y border-[#E2E8F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <div className="text-xs font-semibold tracking-wider uppercase text-[#C7A45B] mb-2">
              TRADE ENQUIRIES
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#0B1730] font-display tracking-tight">
              Let's Explore an Opportunity Together.
            </h2>
            <p className="mt-3 text-sm sm:text-base text-[#64748B] leading-relaxed">
              Whether you are looking to source commodities or discuss a potential supply opportunity, connect with NEXARIS to start a conversation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            
            {/* For Buyers */}
            <div className="p-8 rounded-lg bg-[#F5F7FA] border border-[#E2E8F0] hover:border-[#C7A45B] transition-colors flex flex-col justify-between space-y-6">
              <div>
                <div className="w-10 h-10 rounded-md bg-[#0B1730] text-[#C7A45B] flex items-center justify-center font-bold text-sm mb-4 font-display">
                  B
                </div>
                <h3 className="text-xl font-bold text-[#0B1730] font-display">
                  For Buyers
                </h3>
                <p className="mt-2 text-sm text-[#64748B] leading-relaxed">
                  Discuss your commodity requirements and sourcing enquiry.
                </p>
              </div>

              <button
                type="button"
                onClick={() => openEnquiryModal(undefined, undefined, 'buyer')}
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 text-xs font-semibold uppercase tracking-wider text-white bg-[#0B1730] hover:bg-[#162444] rounded-md transition-colors cursor-pointer min-h-[44px]"
              >
                <span>Submit a Buyer Enquiry</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>

            {/* For Suppliers */}
            <div className="p-8 rounded-lg bg-[#F5F7FA] border border-[#E2E8F0] hover:border-[#C7A45B] transition-colors flex flex-col justify-between space-y-6">
              <div>
                <div className="w-10 h-10 rounded-md bg-[#0B1730] text-[#C7A45B] flex items-center justify-center font-bold text-sm mb-4 font-display">
                  S
                </div>
                <h3 className="text-xl font-bold text-[#0B1730] font-display">
                  For Suppliers
                </h3>
                <p className="mt-2 text-sm text-[#64748B] leading-relaxed">
                  Introduce your commodities and discuss potential trading opportunities.
                </p>
              </div>

              <button
                type="button"
                onClick={() => openEnquiryModal(undefined, undefined, 'supplier')}
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 text-xs font-semibold uppercase tracking-wider text-white bg-[#0B1730] hover:bg-[#162444] rounded-md transition-colors cursor-pointer min-h-[44px]"
              >
                <span>Submit a Supplier Enquiry</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================
          SECTION H — CONTACT DETAILS & TRADE DESK
          ======================================================== */}
      <section className="py-20 lg:py-24 bg-[#0B1730] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-6 space-y-4">
              <div className="text-xs font-semibold tracking-wider uppercase text-[#C7A45B]">
                DIRECT CONTACT
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold font-display text-white">
                NEXARIS Trade Desk
              </h2>
              <p className="text-sm sm:text-base text-[#94A3B8] leading-relaxed">
                Connect with our team directly for commodity trade opportunities, sourcing requests, or operational coordination.
              </p>
            </div>

            <div className="lg:col-span-6 bg-white/5 border border-white/10 rounded-lg p-6 sm:p-8 space-y-5 text-sm text-[#94A3B8]">
              <div className="flex items-start gap-4 pb-4 border-b border-white/10">
                <MapPin className="w-5 h-5 text-[#C7A45B] shrink-0 mt-0.5" aria-hidden="true" />
                <div>
                  <div className="text-xs uppercase tracking-wider text-[#94A3B8]/70 font-semibold">Location</div>
                  <div className="text-white font-medium mt-0.5">{contact.location}</div>
                </div>
              </div>

              <div className="flex items-start gap-4 pb-4 border-b border-white/10">
                <Mail className="w-5 h-5 text-[#C7A45B] shrink-0 mt-0.5" aria-hidden="true" />
                <div>
                  <div className="text-xs uppercase tracking-wider text-[#94A3B8]/70 font-semibold">Email</div>
                  <a
                    href={getMailtoLink()}
                    className="text-white hover:text-[#C7A45B] font-mono font-medium transition-colors mt-0.5 block break-all"
                  >
                    {contact.email}
                  </a>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pb-4 border-b border-white/10">
                <div className="flex items-start gap-4">
                  <Phone className="w-5 h-5 text-[#C7A45B] shrink-0 mt-0.5" aria-hidden="true" />
                  <div>
                    <div className="text-xs uppercase tracking-wider text-[#94A3B8]/70 font-semibold">Phone</div>
                    <a
                      href={getTelLink()}
                      className="text-white hover:text-[#C7A45B] font-medium transition-colors mt-0.5 block"
                    >
                      {contact.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <MessageCircle className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" aria-hidden="true" />
                  <div>
                    <div className="text-xs uppercase tracking-wider text-[#94A3B8]/70 font-semibold">WhatsApp</div>
                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white hover:text-emerald-300 font-medium transition-colors mt-0.5 block"
                    >
                      {contact.phone}
                    </a>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Linkedin className="w-5 h-5 text-[#C7A45B] shrink-0 mt-0.5" aria-hidden="true" />
                <div>
                  <div className="text-xs uppercase tracking-wider text-[#94A3B8]/70 font-semibold">Official LinkedIn</div>
                  <a
                    href={contact.companyLinkedIn}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#C7A45B] hover:text-white font-medium transition-colors inline-flex items-center gap-1.5 mt-0.5"
                  >
                    <span>Follow NEXARIS on LinkedIn</span>
                    <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                  </a>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}


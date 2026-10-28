import React from 'react';
import {
  ArrowRight,
  Mail,
  Phone,
  MapPin,
  Linkedin,
  MessageCircle,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  Anchor,
  Package,
  FileCheck2,
  FileDown,
} from 'lucide-react';
import { Link } from '../context/RouterContext';
import { useEnquiry } from '../context/EnquiryContext';
import { SITE_CONFIG, getTelLink, getMailtoLink, getWhatsAppUrl } from '../config/site';
import { CertificationsSection } from '../components/CertificationsSection';
import { DivisionImageGallery } from '../components/DivisionImageGallery';
import { RangeMatrixSection } from '../components/RangeMatrixSection';
import { WhiteLabelingSection } from '../components/WhiteLabelingSection';
import { ExportServicesSection } from '../components/ExportServicesSection';
import { ExportFaqSection } from '../components/ExportFaqSection';
import { GlobalTradeGlobe3D } from '../components/GlobalTradeGlobe3D';

export function HomePage() {
  const { openEnquiryModal } = useEnquiry();
  const { contact, founders, capabilities } = SITE_CONFIG;
  const whatsappUrl = getWhatsAppUrl();

  return (
    <div className="bg-[#FAF8F5] text-stone-900">
      {/* ========================================================
          HERO SECTION — INSTITUTIONAL B2B AGRI COMMODITY HOUSE
          ======================================================== */}
      <section className="relative bg-[#0A192F] text-white border-b border-white/10 overflow-hidden py-16 sm:py-20 lg:py-28">
        {/* Subtle geometric grid background */}
        <div className="absolute inset-0 bg-[radial-gradient(#D4AF37_1px,transparent_1px)] [background-size:36px_36px] opacity-10 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            
            {/* Tagline & Origin Kicker */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-bold tracking-widest uppercase text-[#D4AF37]">
              <span>GANDHINAGAR, GUJARAT, INDIA</span>
              <span aria-hidden="true" className="text-white/30">·</span>
              <span className="text-stone-300">NATURAL CANE SWEETENERS ORIGIN</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif font-black tracking-tight text-white leading-[1.08]">
              One Partner.<br />
              <span className="text-[#D4AF37]">Many Possibilities.</span>
            </h1>

            {/* Hero Subheadline */}
            <p className="text-base sm:text-lg lg:text-xl font-normal text-stone-300 leading-relaxed max-w-3xl mx-auto">
              B2B Sourcing &amp; Export Coordination for Certified Jaggery &amp; Natural Cane Sweeteners (HS Code Chapter 17).
            </p>

            {/* Verifiable Operational Protocols Strip */}
            <div className="py-4 text-xs text-stone-300 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 font-medium">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#D4AF37]" />
                Direct Sugarcane Harvest Sourcing
              </span>
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                Third-Party Lab Certification (SGS / Geo-Chem)
              </span>
              <span className="flex items-center gap-1.5">
                <Anchor className="w-4 h-4 text-[#D4AF37]" />
                FOB Mundra &amp; Kandla Port Coordination
              </span>
            </div>

            {/* CTAs */}
            <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/jaggery"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 text-xs font-bold uppercase tracking-wider text-[#0A192F] bg-[#D4AF37] hover:bg-[#C5A059] rounded-lg transition-all shadow-lg hover:shadow-xl cursor-pointer"
              >
                <span>Explore Jaggery Products</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
              <button
                type="button"
                onClick={() => openEnquiryModal(undefined, 'jaggery', 'buyer')}
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 text-xs font-bold uppercase tracking-wider text-white bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg transition-all shadow-md cursor-pointer"
              >
                <span>Submit Buyer RFQ</span>
                <ArrowRight className="w-4 h-4 text-[#D4AF37]" aria-hidden="true" />
              </button>
              <a
                href={SITE_CONFIG.cataloguePdfUrl}
                download="NEXARIS_Jaggery_Product_Catalogue.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-[#D4AF37] hover:text-white bg-white/5 hover:bg-white/15 border border-[#D4AF37]/40 rounded-lg transition-all shadow-xs cursor-pointer"
              >
                <FileDown className="w-4 h-4 text-[#D4AF37]" />
                <span>PDF Catalogue</span>
              </a>
              <Link
                href="/for-suppliers"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-stone-300 hover:text-white bg-transparent hover:bg-white/5 border border-stone-500/50 rounded-lg transition-all cursor-pointer"
              >
                <span>Sell Cane / Jaggery</span>
              </Link>
            </div>

            {/* B2B Scope & Protocol Indicators */}
            <div className="pt-10 border-t border-white/10 grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs text-stone-400 max-w-3xl mx-auto">
              <div className="space-y-1">
                <div className="font-serif font-bold text-white text-2xl tabular-nums">4 Export Grades</div>
                <div className="text-[10px] font-bold uppercase tracking-wider text-stone-400">HS Code Chapter 17</div>
              </div>
              <div className="space-y-1">
                <div className="font-serif font-bold text-white text-2xl">100% Sulphur-Free</div>
                <div className="text-[10px] font-bold uppercase tracking-wider text-stone-400">Zero Chemical Bleaching</div>
              </div>
              <div className="space-y-1">
                <div className="font-serif font-bold text-[#D4AF37] text-2xl">Mundra &amp; Kandla</div>
                <div className="text-[10px] font-bold uppercase tracking-wider text-stone-400">Container Port Logistics</div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================
          QUALITY & EXPORT COMPLIANCE STRIP (APEDA, SPICES BOARD, FSSAI)
          ======================================================== */}
      <section className="bg-white border-b border-stone-200 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-lg bg-[#0A192F] text-[#D4AF37] flex items-center justify-center shrink-0">
                <FileCheck2 className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-xs font-bold uppercase tracking-wider text-[#0A192F]">
                  Quality &amp; Statutory Export Alignment
                </h2>
                <p className="text-[11px] text-stone-500">
                  Operations structured in conformity with Indian statutory commodity export boards &amp; global standards
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs font-semibold text-stone-700">
              <span className="px-3 py-1.5 bg-stone-100 rounded-md border border-stone-200" title="Agricultural and Processed Food Products Export Development Authority">
                APEDA Aligned
              </span>
              <span className="px-3 py-1.5 bg-stone-100 rounded-md border border-stone-200" title="Food Safety and Standards Authority of India">
                FSSAI Standards
              </span>
              <span className="px-3 py-1.5 bg-stone-100 rounded-md border border-stone-200" title="Phytosanitary Quarantine Certification">
                Phytosanitary Certification
              </span>
              <span className="px-3 py-1.5 bg-stone-100 rounded-md border border-stone-200" title="Chamber of Commerce Origin Issuance">
                Certificate of Origin
              </span>
              <span className="px-3 py-1.5 bg-stone-100 rounded-md border border-stone-200" title="SGS / Geo-Chem Laboratory Certificate of Analysis">
                SGS / Geo-Chem COA
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          GLOBAL 3D SHIPPING GLOBE (SHIPPING WORLDWIDE)
          ======================================================== */}
      <GlobalTradeGlobe3D />

      {/* ========================================================
          OUR RANGE: COLOURS, FORMS & SPICED JAGGERY (PDF PAGE 2)
          ======================================================== */}
      <RangeMatrixSection />

      {/* ========================================================
          PRODUCT SHOWCASE GALLERY (SPECIFICATIONS & TDS)
          ======================================================== */}
      <DivisionImageGallery />

      {/* ========================================================
          CUSTOM PACKING & WHITE LABELING (PDF PAGE 4)
          ======================================================== */}
      <WhiteLabelingSection />

      {/* ========================================================
          VERIFIABLE OPERATIONAL CAPABILITIES
          ======================================================== */}
      <section className="py-16 sm:py-20 bg-white border-y border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <div className="text-xs font-bold uppercase tracking-wider text-[#C5A059] mb-2">
              VERIFIABLE CAPABILITIES
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#0A192F]">
              Direct Origin Sourcing &amp; Execution Protocols
            </h2>
            <p className="mt-2 text-sm text-stone-600 leading-relaxed">
              We focus on measurable, transparent trade execution across Gujarat's agricultural belts and Western Indian maritime ports.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {capabilities.map((cap, i) => (
              <div key={i} className="p-6 rounded-xl border border-stone-200 bg-[#FAF8F5] space-y-3">
                <div className="text-xs font-mono font-bold text-[#C5A059]">0{i + 1}.</div>
                <h3 className="text-base font-bold text-[#0A192F] font-serif">{cap.title}</h3>
                <p className="text-xs text-stone-600 leading-relaxed">{cap.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================
          EXPORT SERVICES & SOURCING SOLUTIONS
          ======================================================== */}
      <ExportServicesSection />

      {/* ========================================================
          REGULATORY CERTIFICATIONS & COMPLIANCE SECTION
          ======================================================== */}
      <CertificationsSection />

      {/* ========================================================
          LEADERSHIP TEAM — MANAGING PARTNERS
          ======================================================== */}
      <section id="founders" className="py-20 bg-[#FAF8F5] border-t border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <div className="text-xs font-bold tracking-wider uppercase text-[#C5A059] mb-2">
              LEADERSHIP &amp; MANAGEMENT
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#0A192F]">
              The Managing Partners Behind NEXARIS
            </h2>
            <p className="mt-3 text-sm sm:text-base text-stone-600 leading-relaxed">
              Meet the partners responsible for strategic direction, international business development, and on-ground agricultural procurement execution.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {founders.map((founder) => (
              <div
                key={founder.name}
                className="bg-white rounded-xl border border-stone-200 hover:border-[#C5A059] transition-all duration-200 p-6 flex flex-col justify-between shadow-xs hover:shadow-md"
              >
                <div className="space-y-4">
                  {/* Monogram Avatar & LinkedIn Button */}
                  <div className="flex items-center justify-between pb-4 border-b border-stone-100">
                    <div className="w-12 h-12 rounded-lg bg-[#0A192F] text-[#D4AF37] flex items-center justify-center font-serif font-bold text-base">
                      {founder.initials}
                    </div>

                    <a
                      href={founder.linkedIn}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 text-stone-500 hover:text-[#0A192F] hover:bg-stone-50 rounded-lg transition-colors"
                      aria-label={`View ${founder.name}'s LinkedIn profile`}
                      title="LinkedIn Profile"
                    >
                      <Linkedin className="w-5 h-5 text-[#0A192F] hover:text-[#C5A059] transition-colors" />
                    </a>
                  </div>

                  {/* Name and Role */}
                  <div>
                    <h3 className="text-lg font-serif font-bold text-[#0A192F]">
                      {founder.name}
                    </h3>
                    <p className="text-xs font-semibold text-[#C5A059] mt-0.5">
                      {founder.role}
                    </p>
                  </div>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                    {founder.description}
                  </p>
                </div>

                {/* Direct Clickable Email Link */}
                <div className="mt-6 pt-4 border-t border-stone-100 flex items-center text-xs">
                  <a
                    href={`mailto:${founder.email}`}
                    className="font-mono text-[#0A192F] hover:text-[#C5A059] font-medium transition-colors inline-flex items-center gap-1.5"
                  >
                    <Mail className="w-3.5 h-3.5 text-[#C5A059]" aria-hidden="true" />
                    <span>{founder.email}</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================
          INTERNATIONAL BUYER FAQS
          ======================================================== */}
      <ExportFaqSection />

      {/* ========================================================
          DUAL-TRACK CONVERSION FUNNEL (BUYERS & SUPPLIERS)
          ======================================================== */}
      <section id="enquiry" className="py-20 bg-white border-y border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <div className="text-xs font-bold tracking-wider uppercase text-[#C5A059] mb-2">
              COMMERCIAL TRADE DESK
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#0A192F]">
              Dual-Track Sourcing &amp; Procurement
            </h2>
            <p className="mt-3 text-sm sm:text-base text-stone-600 leading-relaxed">
              Whether you are an international buyer requesting container quotations for export-grade jaggery or a domestic sugarcane farmer/khandsari miller offering production lots, our Gandhinagar desk coordinates directly with you.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* For Buyers */}
            <div className="p-8 rounded-xl bg-[#FAF8F5] border border-stone-200 hover:border-[#C5A059] transition-colors flex flex-col justify-between space-y-6 shadow-xs">
              <div>
                <div className="w-10 h-10 rounded-lg bg-[#0A192F] text-[#D4AF37] flex items-center justify-center font-bold text-sm mb-4 font-serif">
                  B
                </div>
                <h3 className="text-xl font-serif font-bold text-[#0A192F]">
                  For International Buyers
                </h3>
                <p className="mt-2 text-xs sm:text-sm text-stone-600 leading-relaxed">
                  Request spot or contract FOB Mundra / CIF container pricing for Organic Jaggery Powder, Cubes, Blocks, and Cane Syrup with custom OEM retail packaging.
                </p>
              </div>

              <button
                type="button"
                onClick={() => openEnquiryModal(undefined, 'jaggery', 'buyer')}
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 text-xs font-bold uppercase tracking-wider text-[#0A192F] bg-[#D4AF37] hover:bg-[#C5A059] rounded-lg transition-colors cursor-pointer shadow-xs min-h-[44px]"
              >
                <span>Request Buyer Quotation (RFQ)</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>

            {/* For Suppliers */}
            <div className="p-8 rounded-xl bg-[#FAF8F5] border border-stone-200 hover:border-[#C5A059] transition-colors flex flex-col justify-between space-y-6 shadow-xs">
              <div>
                <div className="w-10 h-10 rounded-lg bg-[#0A192F] text-[#D4AF37] flex items-center justify-center font-bold text-sm mb-4 font-serif">
                  S
                </div>
                <h3 className="text-xl font-serif font-bold text-[#0A192F]">
                  For Sugarcane Farmers &amp; Millers
                </h3>
                <p className="mt-2 text-xs sm:text-sm text-stone-600 leading-relaxed">
                  Register available jaggery production lots, lot sizes in MT, sucrose/brix reports, and warehouse locations in Gujarat for direct export procurement.
                </p>
              </div>

              <Link
                href="/for-suppliers"
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 text-xs font-bold uppercase tracking-wider text-white bg-[#0A192F] hover:bg-[#10243D] rounded-lg transition-colors cursor-pointer shadow-xs min-h-[44px]"
              >
                <span>Sell to NEXARIS (Supplier Form)</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          REGISTERED OFFICE & DIRECT TRADE DESK
          ======================================================== */}
      <section className="py-16 sm:py-20 bg-[#0A192F] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            <div className="lg:col-span-5 space-y-4">
              <div className="text-xs font-bold uppercase tracking-wider text-[#C5A059]">
                REGISTERED OFFICE &amp; COMMERCIAL DESK
              </div>
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white">
                NEXARIS Commercial Desk
              </h2>
              <p className="text-sm text-stone-300 leading-relaxed">
                Connect with our commercial officers directly for container bookings, proforma invoices, sample dispatches, or mandi aggregations.
              </p>
            </div>

            <div className="lg:col-span-7 bg-white/5 border border-white/10 rounded-xl p-6 sm:p-8 space-y-5 text-sm text-stone-300">
              <div className="flex items-start gap-4 pb-4 border-b border-white/10">
                <MapPin className="w-5 h-5 text-[#C5A059] shrink-0 mt-0.5" aria-hidden="true" />
                <div>
                  <div className="text-xs uppercase tracking-wider text-stone-400 font-semibold">Registered Office</div>
                  <div className="text-white font-medium mt-0.5">{contact.registeredOffice}</div>
                </div>
              </div>

              <div className="flex items-start gap-4 pb-4 border-b border-white/10">
                <Mail className="w-5 h-5 text-[#C5A059] shrink-0 mt-0.5" aria-hidden="true" />
                <div>
                  <div className="text-xs uppercase tracking-wider text-stone-400 font-semibold">Official Business Email</div>
                  <a
                    href={getMailtoLink()}
                    className="text-white hover:text-[#C5A059] font-mono font-medium transition-colors mt-0.5 block break-all"
                  >
                    {contact.email}
                  </a>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pb-4 border-b border-white/10">
                <div className="flex items-start gap-4">
                  <Phone className="w-5 h-5 text-[#C5A059] shrink-0 mt-0.5" aria-hidden="true" />
                  <div>
                    <div className="text-xs uppercase tracking-wider text-stone-400 font-semibold">Trade Desk Telephone</div>
                    <div className="text-white font-mono font-medium mt-0.5">
                      <a href={`tel:${contact.phoneTel}`} className="hover:text-[#C5A059] block">
                        {contact.phone}
                      </a>
                      <a href="tel:+918511912115" className="hover:text-[#C5A059] block text-xs text-stone-300">
                        +91 85119 12115
                      </a>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <MessageCircle className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" aria-hidden="true" />
                  <div>
                    <div className="text-xs uppercase tracking-wider text-stone-400 font-semibold">WhatsApp Direct</div>
                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white hover:text-emerald-300 font-mono font-medium transition-colors mt-0.5 block"
                    >
                      {contact.phone}
                    </a>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Linkedin className="w-5 h-5 text-[#C5A059] shrink-0 mt-0.5" aria-hidden="true" />
                <div>
                  <div className="text-xs uppercase tracking-wider text-stone-400 font-semibold">Institutional LinkedIn</div>
                  <a
                    href={contact.companyLinkedIn}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#C5A059] hover:text-white font-medium transition-colors inline-flex items-center gap-1.5 mt-0.5 text-xs"
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

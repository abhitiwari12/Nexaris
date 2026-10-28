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
  FileDown,
  Package,
  Layers,
  Sparkles,
} from 'lucide-react';
import { Link } from '../context/RouterContext';
import { useEnquiry } from '../context/EnquiryContext';
import { SITE_CONFIG, getTelLink, getMailtoLink, getWhatsAppUrl } from '../config/site';
import { ALL_PRODUCTS } from '../data/products';
import { ProductCard } from '../components/ProductCard';

export function HomePage() {
  const { openEnquiryModal } = useEnquiry();
  const { contact } = SITE_CONFIG;
  const whatsappUrl = getWhatsAppUrl();

  return (
    <div className="bg-[#FAF8F5] text-stone-900">
      {/* ========================================================
          1. HERO — PURE SUGARCANE JAGGERY EXPORT HOUSE
          ======================================================== */}
      <section className="relative bg-[#0A192F] text-white border-b border-white/10 overflow-hidden py-14 sm:py-20 lg:py-24">
        <div className="absolute inset-0 bg-[radial-gradient(#D4AF37_1px,transparent_1px)] [background-size:32px_32px] opacity-10 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            
            {/* Left Column: Core Value Proposition */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Origin Kicker */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-bold tracking-widest uppercase text-[#D4AF37]">
                <span>GANDHINAGAR, GUJARAT, INDIA</span>
                <span aria-hidden="true" className="text-white/30">·</span>
                <span className="text-stone-300">PURE SUGARCANE ORIGIN</span>
              </div>

              {/* Main Headline */}
              <div className="space-y-2">
                <p className="text-xs sm:text-sm font-bold uppercase tracking-widest text-[#D4AF37]">
                  ONE PARTNER. MANY POSSIBILITIES.
                </p>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-black tracking-tight text-white leading-[1.1]">
                  Pure Sugarcane Jaggery Export House
                </h1>
              </div>

              {/* Concise Subheadline */}
              <p className="text-base sm:text-lg text-stone-300 leading-relaxed max-w-2xl">
                B2B sourcing &amp; container export coordination for 100% natural, chemical-free cane sweeteners (HS Chapter 17). Sourced directly across Gujarat and dispatched via Mundra and Kandla ports.
              </p>

              {/* 3 Essential Trust Points */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 py-2 text-xs">
                <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                  <div className="flex items-center gap-1.5 font-bold text-[#D4AF37] mb-0.5">
                    <CheckCircle2 className="w-4 h-4 text-[#D4AF37] shrink-0" />
                    <span>Sulphur-Free</span>
                  </div>
                  <p className="text-[11px] text-stone-400">Zero chemical bleaching or artificial clarifying agents</p>
                </div>

                <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                  <div className="flex items-center gap-1.5 font-bold text-emerald-400 mb-0.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Sucrose ≥ 80%</span>
                  </div>
                  <p className="text-[11px] text-stone-400">Moisture ≤ 3% (Powder) with SGS / Geo-Chem lab COA</p>
                </div>

                <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                  <div className="flex items-center gap-1.5 font-bold text-white mb-0.5">
                    <Anchor className="w-4 h-4 text-[#D4AF37] shrink-0" />
                    <span>Mundra &amp; Kandla</span>
                  </div>
                  <p className="text-[11px] text-stone-400">Direct maritime container loading &amp; customs clearance</p>
                </div>
              </div>

              {/* CTAs */}
              <div className="pt-2 flex flex-wrap items-center gap-3.5">
                <button
                  type="button"
                  onClick={() => openEnquiryModal(undefined, 'jaggery', 'buyer')}
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 text-xs font-bold uppercase tracking-wider text-[#0A192F] bg-[#D4AF37] hover:bg-[#C5A059] rounded-lg transition-all shadow-lg hover:shadow-xl cursor-pointer"
                >
                  <span>Submit Buyer RFQ</span>
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </button>

                <a
                  href={SITE_CONFIG.cataloguePdfUrl}
                  download="NEXARIS_Jaggery_Product_Catalogue.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-[#D4AF37] hover:text-white bg-white/5 hover:bg-white/15 border border-[#D4AF37]/40 rounded-lg transition-all shadow-xs cursor-pointer"
                >
                  <FileDown className="w-4 h-4 text-[#D4AF37]" />
                  <span>Download PDF Catalogue</span>
                </a>

                <Link
                  href="/for-suppliers"
                  className="inline-flex items-center justify-center gap-2 px-5 py-3.5 text-xs font-semibold text-stone-300 hover:text-white transition-colors"
                >
                  <span>Farmer / Miller Registration &rarr;</span>
                </Link>
              </div>

            </div>

            {/* Right Column: Authentic Catalogue Cover Photo */}
            <div className="lg:col-span-5">
              <div className="relative rounded-2xl overflow-hidden border border-white/15 shadow-2xl bg-stone-900 aspect-4/3">
                <img
                  src="/assets/catalogue_images/catalogue_cover_hero.png"
                  alt="NEXARIS Pure Sugarcane Jaggery Official Catalogue Cover"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A192F]/90 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-4 left-4 right-4 text-xs text-white bg-[#0A192F]/85 backdrop-blur-md p-3.5 rounded-xl border border-white/10 flex items-center justify-between">
                  <div>
                    <span className="font-bold text-[#D4AF37] block font-serif">Export Jaggery Dispatch Hub</span>
                    <span className="text-[11px] text-stone-300">
                      Gandhinagar, Gujarat, India · FOB Mundra &amp; Kandla
                    </span>
                  </div>
                  <span className="px-2 py-1 bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-[#D4AF37] rounded font-mono text-[10px] font-bold">
                    HS Ch. 17
                  </span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================
          2. QUALITY & STATUTORY EXPORT ALIGNMENT STRIP
          ======================================================== */}
      <section className="bg-white border-b border-stone-200 py-5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2.5">
              <ShieldCheck className="w-5 h-5 text-[#C5A059] shrink-0" />
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#0A192F]">
                  Export Compliance &amp; Standards
                </span>
                <span className="text-[11px] text-stone-500 ml-2 hidden sm:inline">
                  Aligned with Indian export bodies &amp; destination quarantine requirements
                </span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-stone-700">
              <span className="px-3 py-1 bg-stone-100 rounded border border-stone-200">APEDA Aligned</span>
              <span className="px-3 py-1 bg-stone-100 rounded border border-stone-200">FSSAI Certified</span>
              <span className="px-3 py-1 bg-stone-100 rounded border border-stone-200">FDA Registered</span>
              <span className="px-3 py-1 bg-stone-100 rounded border border-stone-200">Phytosanitary Certified</span>
              <span className="px-3 py-1 bg-stone-100 rounded border border-stone-200">SGS / Geo-Chem COA</span>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          3. CORE PRODUCT CATALOGUE (4 EXPORT GRADES)
          ======================================================== */}
      <section id="products" className="py-16 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-stone-200">
          <div>
            <div className="text-xs font-bold uppercase tracking-widest text-[#C5A059] mb-1">
              OFFICIAL CATALOGUE
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-[#0A192F]">
              Export Jaggery Products
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-stone-600">
              Technical specifications, certified test parameters, and packaging options for international buyers.
            </p>
          </div>

          <a
            href={SITE_CONFIG.cataloguePdfUrl}
            download="NEXARIS_Jaggery_Product_Catalogue.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold uppercase tracking-wider text-[#0A192F] bg-[#D4AF37] hover:bg-[#C5A059] rounded-lg transition-colors shrink-0 shadow-xs"
          >
            <FileDown className="w-4 h-4" />
            <span>Download PDF (5 Pages)</span>
          </a>
        </div>

        {/* 4 Clean Spec-First Product Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {ALL_PRODUCTS.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* ========================================================
          4. RANGE, COLOURS & PACKAGING SPECIFICATIONS (PDF PAGES 2, 3, 4)
          ======================================================== */}
      <section className="py-16 sm:py-20 bg-white border-y border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <div className="text-xs font-bold uppercase tracking-widest text-[#C5A059]">
              GRADING &amp; PACKAGING
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#0A192F]">
              3 Natural Colours × 3 Forms + Custom Packing
            </h2>
            <p className="text-xs sm:text-sm text-stone-600">
              Prepared from pure clarified cane juice without artificial coloring, chemical bleaching, or added sugar.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* 3 Natural Cane Colours with Catalogue Images */}
            <div className="p-6 sm:p-8 rounded-xl bg-[#FAF8F5] border border-stone-200 space-y-5">
              <h3 className="text-base font-serif font-bold text-[#0A192F] flex items-center gap-2">
                <Layers className="w-5 h-5 text-[#C5A059]" />
                <span>3 Natural Colour Grades</span>
              </h3>

              <div className="space-y-3">
                <div className="p-3 rounded-lg bg-white border border-stone-200 flex items-center gap-3.5">
                  <img
                    src="/assets/catalogue_images/catalogue_golden_yellow.png"
                    alt="Golden Yellow Jaggery"
                    className="w-14 h-14 rounded-lg object-cover border border-stone-200 shrink-0 bg-stone-50"
                  />
                  <div>
                    <h4 className="text-xs font-bold text-[#0A192F]">Golden Yellow</h4>
                    <p className="text-[11px] text-stone-600 mt-0.5">
                      Bright golden colour with a clean, mild sweetness. Subtle cane notes, ideal for tea, table dispensers &amp; everyday sweetening.
                    </p>
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-white border border-stone-200 flex items-center gap-3.5">
                  <img
                    src="/assets/catalogue_images/catalogue_light_brown.png"
                    alt="Light Brown Jaggery"
                    className="w-14 h-14 rounded-lg object-cover border border-stone-200 shrink-0 bg-stone-50"
                  />
                  <div>
                    <h4 className="text-xs font-bold text-[#0A192F]">Light Brown</h4>
                    <p className="text-[11px] text-stone-600 mt-0.5">
                      Soft light-brown shade with balanced caramel notes. Versatile for bakery, consumer retail pouches, and confectioneries.
                    </p>
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-white border border-stone-200 flex items-center gap-3.5">
                  <img
                    src="/assets/catalogue_images/catalogue_dark_brown.png"
                    alt="Dark Brown Jaggery"
                    className="w-14 h-14 rounded-lg object-cover border border-stone-200 shrink-0 bg-stone-50"
                  />
                  <div>
                    <h4 className="text-xs font-bold text-[#0A192F]">Dark Brown</h4>
                    <p className="text-[11px] text-stone-600 mt-0.5">
                      Deep, rich molasses profile with high natural mineral content (Iron, Calcium, Magnesium). Ideal for traditional recipes and health food processors.
                    </p>
                  </div>
                </div>
              </div>

              {/* Spiced Blends Strip */}
              <div className="pt-2 border-t border-stone-200">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#0A192F] block mb-1.5">
                  Handcrafted Spiced Jaggery Blends
                </span>
                <div className="flex flex-wrap gap-2 text-xs">
                  <span className="px-2.5 py-1 bg-white rounded border border-stone-200 text-stone-700">Ginger (Sonth)</span>
                  <span className="px-2.5 py-1 bg-white rounded border border-stone-200 text-stone-700">Cardamom (Elaichi)</span>
                  <span className="px-2.5 py-1 bg-white rounded border border-stone-200 text-stone-700">Fennel (Saunf)</span>
                  <span className="px-2.5 py-1 bg-white rounded border border-stone-200 text-stone-700">Sesame &amp; Peanuts</span>
                </div>
              </div>
            </div>

            {/* Packaging & White Labeling Summary */}
            <div className="p-6 sm:p-8 rounded-xl bg-[#FAF8F5] border border-stone-200 space-y-5">
              <h3 className="text-base font-serif font-bold text-[#0A192F] flex items-center gap-2">
                <Package className="w-5 h-5 text-[#C5A059]" />
                <span>Export Packaging &amp; White Labeling</span>
              </h3>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <div className="p-3 bg-white rounded-lg border border-stone-200 text-center">
                  <div className="font-serif font-bold text-lg text-[#0A192F]">250 g</div>
                  <div className="text-[10px] font-bold uppercase text-[#C5A059]">Retail</div>
                  <div className="text-[11px] text-stone-500 mt-1">Stand-up zip pouches</div>
                </div>

                <div className="p-3 bg-white rounded-lg border border-stone-200 text-center">
                  <div className="font-serif font-bold text-lg text-[#0A192F]">500 g</div>
                  <div className="text-[10px] font-bold uppercase text-[#C5A059]">Retail</div>
                  <div className="text-[11px] text-stone-500 mt-1">Pouches &amp; PET jars</div>
                </div>

                <div className="p-3 bg-white rounded-lg border border-stone-200 text-center">
                  <div className="font-serif font-bold text-lg text-[#0A192F]">1 kg</div>
                  <div className="text-[10px] font-bold uppercase text-[#C5A059]">Retail / Tub</div>
                  <div className="text-[11px] text-stone-500 mt-1">Family packs &amp; boxes</div>
                </div>

                <div className="p-3 bg-white rounded-lg border border-stone-200 text-center">
                  <div className="font-serif font-bold text-lg text-[#0A192F]">5 kg</div>
                  <div className="text-[10px] font-bold uppercase text-[#C5A059]">Bulk</div>
                  <div className="text-[11px] text-stone-500 mt-1">Poly-lined cartons</div>
                </div>

                <div className="p-3 bg-white rounded-lg border border-stone-200 text-center col-span-2 sm:col-span-2">
                  <div className="font-serif font-bold text-lg text-[#0A192F]">25 kg</div>
                  <div className="text-[10px] font-bold uppercase text-[#C5A059]">Export Bulk</div>
                  <div className="text-[11px] text-stone-500 mt-1">Heavy-duty poly-lined PP / Kraft master bags</div>
                </div>
              </div>

              {/* White Labeling Capabilities */}
              <div className="p-3.5 bg-white rounded-lg border border-stone-200 space-y-1.5 text-xs">
                <span className="font-bold text-[#0A192F] block">Custom Private Labeling (OEM)</span>
                <p className="text-stone-600 text-[11px] leading-relaxed">
                  We supply overseas supermarket chains and food brands with buyer-branded packaging, custom multi-lingual labeling, barcodes, and nutritional fact panels.
                </p>
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => openEnquiryModal(undefined, 'jaggery', 'buyer')}
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-[#0A192F] bg-[#D4AF37] hover:bg-[#C5A059] rounded-lg transition-colors cursor-pointer"
                >
                  <span>Request Custom Packaging Quote</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================
          5. DIRECT TRADE DESK & CONTACT (GANDHINAGAR ORIGIN)
          ======================================================== */}
      <section className="py-16 sm:py-20 bg-[#0A192F] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            <div className="lg:col-span-5 space-y-4">
              <div className="text-xs font-bold uppercase tracking-wider text-[#C5A059]">
                COMMERCIAL TRADE DESK
              </div>
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white">
                Connect with NEXARIS
              </h2>
              <p className="text-sm text-stone-300 leading-relaxed">
                Direct container quotations, sample dispatches, and proforma invoices for international buyers and food manufacturers.
              </p>

              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <button
                  type="button"
                  onClick={() => openEnquiryModal(undefined, 'jaggery', 'buyer')}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 text-xs font-bold uppercase tracking-wider text-[#0A192F] bg-[#D4AF37] hover:bg-[#C5A059] rounded-lg transition-colors cursor-pointer shadow-md"
                >
                  <span>Submit Buyer RFQ</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 text-xs font-bold uppercase tracking-wider text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg transition-colors shadow-md"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>WhatsApp Trade Desk</span>
                </a>
              </div>
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
                    <div className="text-xs uppercase tracking-wider text-stone-400 font-semibold">Direct Desk Telephone</div>
                    <div className="text-white font-mono font-medium mt-0.5 space-y-0.5">
                      <a href="tel:+918511912115" className="hover:text-[#C5A059] block">
                        +91 85119 12115
                      </a>
                      <a href={`tel:${contact.phoneTel}`} className="hover:text-[#C5A059] block text-xs text-stone-300">
                        {contact.phone}
                      </a>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <MessageCircle className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" aria-hidden="true" />
                  <div>
                    <div className="text-xs uppercase tracking-wider text-stone-400 font-semibold">WhatsApp Business</div>
                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white hover:text-emerald-300 font-mono font-medium transition-colors mt-0.5 block"
                    >
                      +91 85119 12115
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

